import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, Upload, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';
import ImageUpload from '@/components/ui/image-upload';

const pointSchema = z.object({ _id: z.string().optional(), title: z.string().min(2), description: z.string().min(5), display_order: z.number().optional() });
const pageSchema = z.object({
  heroSection: z.object({ title: z.string().min(5), headerImage: z.string().optional() }),
  introSection: z.object({ paragraph1: z.string().min(10), paragraph2: z.string().min(10) }),
  whySupportSection: z.object({ heading: z.string().min(3), points: z.array(pointSchema) }),
  waysToHelpSection: z.object({ heading: z.string().min(3), points: z.array(pointSchema) }),
  ctaSection: z.object({ statement: z.string().min(5), donateLinkText: z.string().min(2), donateLink: z.string().min(1), contactEmail: z.string().email() })
});

type PageData = z.infer<typeof pageSchema>;

const BeAPartner = () => {
  const [pageData, setPageData] = useState<PageData>({
    heroSection: { title: '"Turn Dreams Into Reality—Give the Gift of Education."' },
    introSection: {
      paragraph1: 'Every child deserves the chance to dream, to learn, and to build a brighter future. Yet for millions of children living in slums and marginalized communities, education remains out of reach. At NEIEA, we are changing this reality—making quality education accessible, affordable, and life-changing.',
      paragraph2: 'By becoming a Supporter of NEIEA, you are not just giving; you are opening doors of opportunity and hope for children who need it the most.'
    },
    whySupportSection: {
      heading: 'Why Your Support Matters',
      points: [
        { title: 'Give the Gift of Learning', description: 'Your contribution helps a child discover the joy of education.' },
        { title: 'Strengthen Families & Communities', description: 'Knowledge empowers families, creates dignity, and builds stronger communities.' },
        { title: 'Shape a Better Tomorrow', description: 'Sustained support ensures that the impact of today lasts for generations.' }
      ]
    },
    waysToHelpSection: {
      heading: 'Ways to Make a Difference',
      points: [
        { title: 'Sponsor a Child', description: "Provide learning materials, classes, and mentorship that can change a child's life." },
        { title: 'Sponsor a Program', description: 'Support targeted educational initiatives that uplift entire communities.' },
        { title: 'General Support', description: 'Help us expand our reach and continue building a movement for inclusive education.' }
      ]
    },
    ctaSection: {
      statement: 'Together, we can turn education into a right for every child—not a privilege for a few.',
      donateLinkText: 'Click here to become a Supporter',
      donateLink: '/donate',
      contactEmail: 'info@neiea.org'
    }
  });
  const [loading, setLoading] = useState(true);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [headerImageFile, setHeaderImageFile] = useState<File | null>(null);
  const [headerImagePreview, setHeaderImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [active, setActive] = useState<'intro'|'why'|'ways'|'cta'>('intro');

  useEffect(()=>{ load(); },[]);

  const load = async () => {
    try { setLoading(true); const r = await axiosInstance.get('/admin/be-a-partner-page'); if (r.data?.success && r.data.data){ const d=r.data.data as PageData; setPageData(d); setHeaderImagePreview(d.heroSection?.headerImage||''); } }
    catch(e:any){ if (e.response?.status !== 404) toast.error(e.response?.data?.message||'Failed to load'); }
    finally { setLoading(false); }
  };

  const saveAll = async () => {
    const d: PageData = {
      ...pageData,
      whySupportSection: { ...pageData.whySupportSection, points: pageData.whySupportSection.points.map((p,i)=>({ ...p, display_order:i })) },
      waysToHelpSection: { ...pageData.waysToHelpSection, points: pageData.waysToHelpSection.points.map((p,i)=>({ ...p, display_order:i })) }
    };
    const check = pageSchema.safeParse(d);
    if (!check.success){ const e = check.error.errors[0]; toast.error(`Validation Error: ${e.path.join(' → ')} - ${e.message}`); return; }
    try { let res; try { res = await axiosInstance.put('/admin/be-a-partner-page', d); } catch(err:any){ if (err.response?.status===404) res = await axiosInstance.post('/admin/be-a-partner-page', d); else throw err; } if (res.data?.success){ toast.success('Saved'); load(); } else toast.error('Failed to save'); }
    catch(e:any){ toast.error(e.response?.data?.message||'Failed to save'); }
  };

  const reorder = async (section:'why'|'ways', arr:any[]) => {
    try { await axiosInstance.post('/admin/be-a-partner-page/reorder', { section, items: arr.map((x:any,i:number)=>({ id:x._id, display_order:i })) }); toast.success('Order updated'); }
    catch { toast.error('Failed to update order'); load(); }
  };

  const uploadHeader = async () => {
    if (!headerImageFile) return toast.error('Select an image');
    const fd = new FormData(); fd.append('headerImage', headerImageFile); setUploading(true);
    try { const r = await axiosInstance.post('/admin/be-a-partner-page/upload-header-image', fd, { headers:{'Content-Type':'multipart/form-data'} }); if (r.data?.success){ const url=r.data.data.image; setPageData(p=>({...p, heroSection:{...p.heroSection, headerImage:url}})); setHeaderImagePreview(url); setHeaderImageFile(null); toast.success('Header image uploaded'); } }
    catch (e:any){ toast.error(e.response?.data?.message||'Upload failed'); } finally { setUploading(false); }
  };

  if (loading) return (<div className="p-6"><div className="flex items-center justify-center h-64"><div className="text-gray-700 text-lg">Loading Be A Partner Page Management...</div></div></div>);

  const renderPoints = (label:string, key: 'whySupportSection'|'waysToHelpSection', reorderKey:'why'|'ways') => {
    const sec = pageData[key]; const points = sec.points as any[];
    return (
      <div className="space-y-6">
        <Card><CardHeader><CardTitle>{label}</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Heading *</label><Input value={sec.heading} onChange={(e)=>setPageData(p=>({ ...p, [key]: { ...(p as any)[key], heading:e.target.value } as any }))} /></div></CardContent></Card>
        <div className="flex justify-between items-center"><div><h3 className="text-lg font-semibold">Points</h3><p className="text-gray-600 mt-1">Drag and drop to reorder</p></div><Button onClick={()=>setPageData(p=>({ ...p, [key]: { ...(p as any)[key], points:[...points, { title:'', description:'' }] } as any }))} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Add Point</Button></div>
        <div className="space-y-3">{points.map((pt:any, idx:number)=>(
          <Card key={pt._id||idx} className={`p-4 ${dragIndex===idx?'opacity-50':''}`} draggable onDragStart={()=>setDragIndex(idx)} onDragOver={(e)=>e.preventDefault()} onDragEnd={()=>setDragIndex(null)} onDrop={async (e)=>{ e.preventDefault(); if (dragIndex!==null && dragIndex!==idx){ const arr=[...points]; const [m]=arr.splice(dragIndex,1); arr.splice(idx,0,m); setPageData(p=>({ ...p, [key]: { ...(p as any)[key], points:arr } as any })); await reorder(reorderKey, arr as any[]); setDragIndex(null);} }}>
            <CardContent className="p-0 space-y-3">
              <div><label className="block text-sm font-medium mb-1">Title *</label><Input value={pt.title} onChange={(e)=>setPageData(p=>{ const arr=[...points]; arr[idx]={...arr[idx], title:e.target.value}; return { ...p, [key]: { ...(p as any)[key], points:arr } as any }; })} /></div>
              <div><label className="block text-sm font-medium mb-1">Description *</label><Textarea value={pt.description} onChange={(e)=>setPageData(p=>{ const arr=[...points]; arr[idx]={...arr[idx], description:e.target.value}; return { ...p, [key]: { ...(p as any)[key], points:arr } as any }; })} rows={3} /></div>
              <div className="flex gap-2"><Button size="sm" variant="outline" onClick={()=>setPageData(p=>{ const arr=[...points]; arr.splice(idx,1); return { ...p, [key]: { ...(p as any)[key], points:arr } as any }; })} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button></div>
            </CardContent>
          </Card>
        ))}</div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2"><GraduationCap className="w-8 h-8" />Manage Be A Partner Page</h1>
          <p className="text-gray-600">Update content for the Be A Partner page</p>
        </div>
        <Button onClick={saveAll} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />Save All Changes</Button>
      </div>
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[{id:'intro',label:'Introduction'},{id:'why',label:'Why Support'},{id:'ways',label:'Ways to Help'},{id:'cta',label:'CTA'}].map(s=> (
          <button key={s.id} onClick={()=>setActive(s.id as any)} className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${active===s.id ? 'bg-white text-blue-600 shadow-sm':'text-gray-600 hover:text-gray-900'}`}>{s.label}</button>
        ))}
      </div>

      {active==='intro' && (
        <Card className="mb-6"><CardHeader><CardTitle>Introduction</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Title *</label><Input value={pageData.heroSection.title} onChange={(e)=>setPageData(p=>({...p, heroSection:{...p.heroSection, title:e.target.value}}))} /></div>
          <div><label className="block text-sm font-medium mb-1">Paragraph 1 *</label><Textarea value={pageData.introSection.paragraph1} onChange={(e)=>setPageData(p=>({...p, introSection:{...p.introSection, paragraph1:e.target.value}}))} rows={4} /></div>
          <div><label className="block text-sm font-medium mb-1">Paragraph 2 *</label><Textarea value={pageData.introSection.paragraph2} onChange={(e)=>setPageData(p=>({...p, introSection:{...p.introSection, paragraph2:e.target.value}}))} rows={4} /></div>
        </CardContent></Card>
      )}

      {active==='why' && renderPoints('Why Your Support Matters', 'whySupportSection', 'why')}
      {active==='ways' && renderPoints('Ways to Make a Difference', 'waysToHelpSection', 'ways')}

      {active==='cta' && (
        <Card className="mb-6"><CardHeader><CardTitle>Call to Action</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Statement *</label><Textarea value={pageData.ctaSection.statement} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, statement:e.target.value}}))} rows={3} /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Donate Button Text *</label><Input value={pageData.ctaSection.donateLinkText} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, donateLinkText:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Donate Link *</label><Input value={pageData.ctaSection.donateLink} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, donateLink:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Contact Email *</label><Input value={pageData.ctaSection.contactEmail} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, contactEmail:e.target.value}}))} /></div></div></CardContent></Card>
      )}
    </div>
  );
};

export default BeAPartner;


