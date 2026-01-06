import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X, GripVertical, Upload, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';
import ImageUpload from '@/components/ui/image-upload';

const cardSchema = z.object({ _id: z.string().optional(), title: z.string().min(2), description: z.string().min(5), icon: z.string().optional(), display_order: z.number().optional() });
const pageSchema = z.object({
  heroSection: z.object({ title: z.string().min(5), subtitle: z.string().optional(), description: z.string().optional(), heroImage: z.string().optional() }),
  introduction: z.object({ heading: z.string().min(5), description: z.string().min(20) }),
  commitmentSection: z.object({ heading: z.string().min(5), description: z.string().min(10), approachHeading: z.string().optional(), approachText: z.string().optional() }),
  objectivesSection: z.object({ heading: z.string().min(3), cards: z.array(cardSchema) }),
  featuresSection: z.object({ heading: z.string().min(3), cards: z.array(cardSchema) }),
  imageSection1: z.object({ image: z.string().optional(), title: z.string().optional(), description: z.string().optional() }),
  impactSection: z.object({ heading: z.string().min(3), intro: z.string().optional(), cards: z.array(cardSchema) }),
  imageSection2: z.object({ image: z.string().optional(), title: z.string().optional(), description: z.string().optional() }),
  challengesSection: z.object({ heading: z.string().min(3), cards: z.array(cardSchema) }),
  ctaSection: z.object({ heading: z.string().min(3), description: z.string().optional(), supportText: z.string().optional(), supportLink: z.string().optional(), getInvolvedText: z.string().optional(), getInvolvedLink: z.string().optional() })
});

type PageData = z.infer<typeof pageSchema>;

const Madrasa = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [pageData, setPageData] = useState<PageData>({
    heroSection: { title: "Madarsa Education: NEIEA's Vision for a Holistic Future", subtitle: 'Bridging Worlds: Tradition with Innovation', description: 'For centuries, Madaris have been pillars of learning in India...', heroImage: '/assets/images/Madrasa/madarsa2.jpeg' },
    introduction: { heading: 'Pillars of Learning, Centers of Knowledge', description: 'For centuries, Madaris have been pillars...' },
    commitmentSection: { heading: "NEIEA's Commitment to Madarsa Education", description: 'NEIEA is addressing this challenge...', approachHeading: 'Our Approach', approachText: 'NEIEA is dedicated to modernizing Madrasa education...' },
    objectivesSection: { heading: 'Key Objectives', cards: [] },
    featuresSection: { heading: "Salient Features of NEIEA's Program", cards: [] },
    imageSection1: { image: '/assets/images/Madrasa/madarsa3.jpeg', title: 'NEIEA Madrasa Education Program in Action', description: 'Students engaging in modern subjects...' },
    impactSection: { heading: 'Transformative Impact', intro: 'Since its launch...', cards: [] },
    imageSection2: { image: '/assets/images/Madrasa/madarsa5.jpeg', title: 'Bridging Traditional and Modern Education', description: 'Students in Madaris now have access...' },
    challengesSection: { heading: 'Addressing Challenges', cards: [] },
    ctaSection: { heading: 'Join the Movement for Inclusive Education', description: "NEIEA's pioneering work is a testament...", supportText: '🤝 Support Our Mission', supportLink: '/donate', getInvolvedText: '📞 Get Involved', getInvolvedLink: '/about-us/contact' }
  });
  const [loading, setLoading] = useState(true);

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [image1File, setImage1File] = useState<File | null>(null);
  const [image1Preview, setImage1Preview] = useState<string>('');
  const [image2File, setImage2File] = useState<File | null>(null);
  const [image2Preview, setImage2Preview] = useState<string>('');
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingImg1, setUploadingImg1] = useState(false);
  const [uploadingImg2, setUploadingImg2] = useState(false);

  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(()=>{ loadPageData(); },[]);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/madrasa-page');
      if (res.data?.success && res.data.data) {
        const data = res.data.data as PageData;
        setPageData(data);
        setHeroImagePreview(data.heroSection?.heroImage||'');
        setImage1Preview(data.imageSection1?.image||'');
        setImage2Preview(data.imageSection2?.image||'');
      }
    } catch (e:any) {
      if (e.response?.status !== 404) toast.error(e.response?.data?.message||'Failed to load page');
    } finally { setLoading(false); }
  };

  const handleSaveAll = async () => {
    const dataToSave: PageData = {
      ...pageData,
      objectivesSection: { ...pageData.objectivesSection, cards: pageData.objectivesSection.cards.map((c,i)=>({ ...c, display_order:i })) },
      featuresSection: { ...pageData.featuresSection, cards: pageData.featuresSection.cards.map((c,i)=>({ ...c, display_order:i })) },
      impactSection: { ...pageData.impactSection, cards: pageData.impactSection.cards.map((c,i)=>({ ...c, display_order:i })) },
      challengesSection: { ...pageData.challengesSection, cards: pageData.challengesSection.cards.map((c,i)=>({ ...c, display_order:i })) },
    };
    const check = pageSchema.safeParse(dataToSave);
    if (!check.success) { const e = check.error.errors[0]; toast.error(`Validation Error: ${e.path.join(' → ')} - ${e.message}`); return; }
    try {
      let res; try { res = await axiosInstance.put('/admin/madrasa-page', dataToSave); } catch (err:any) {
        if (err.response?.status === 404) res = await axiosInstance.post('/admin/madrasa-page', dataToSave); else throw err;
      }
      if (res.data?.success) { toast.success('Page saved successfully'); loadPageData(); } else toast.error('Failed to save changes');
    } catch (e:any) { toast.error(e.response?.data?.message||'Failed to save changes'); }
  };

  const reorder = async (section:'objectives'|'features'|'impact'|'challenges', arr:any[]) => {
    try { await axiosInstance.post('/admin/madrasa-page/reorder', { section, items: arr.map((x:any,i:number)=>({ id:x._id, display_order:i })) }); toast.success('Order updated'); }
    catch { toast.error('Failed to update order'); loadPageData(); }
  };

  const onDragStart = (e:React.DragEvent, i:number)=>{ setDragIndex(i); };
  const onDragOver = (e:React.DragEvent)=>{ e.preventDefault(); };
  const onDragEnd = ()=>{ setDragIndex(null); };
  const swap = (arr:any[], from:number, to:number)=>{ const a=[...arr]; const [m]=a.splice(from,1); a.splice(to,0,m); return a; };

  const uploadHero = async ()=>{
    if (!heroImageFile) return toast.error('Select an image');
    const fd = new FormData(); fd.append('heroImage', heroImageFile); setUploadingHero(true);
    try { const r = await axiosInstance.post('/admin/madrasa-page/upload-hero-image', fd, { headers:{'Content-Type':'multipart/form-data'} }); if (r.data?.success){ const url=r.data.data.image; setPageData(p=>({...p, heroSection:{...p.heroSection, heroImage:url}})); setHeroImagePreview(url); setHeroImageFile(null); toast.success('Hero image uploaded'); } }
    catch (e:any){ toast.error(e.response?.data?.message||'Upload failed'); } finally { setUploadingHero(false); }
  };
  const uploadImg1 = async ()=>{
    if (!image1File) return toast.error('Select an image');
    const fd = new FormData(); fd.append('image1', image1File); setUploadingImg1(true);
    try { const r = await axiosInstance.post('/admin/madrasa-page/upload-image1', fd, { headers:{'Content-Type':'multipart/form-data'} }); if (r.data?.success){ const url=r.data.data.image; setPageData(p=>({...p, imageSection1:{...p.imageSection1, image:url}})); setImage1Preview(url); setImage1File(null); toast.success('Image uploaded'); } }
    catch (e:any){ toast.error(e.response?.data?.message||'Upload failed'); } finally { setUploadingImg1(false); }
  };
  const uploadImg2 = async ()=>{
    if (!image2File) return toast.error('Select an image');
    const fd = new FormData(); fd.append('image2', image2File); setUploadingImg2(true);
    try { const r = await axiosInstance.post('/admin/madrasa-page/upload-image2', fd, { headers:{'Content-Type':'multipart/form-data'} }); if (r.data?.success){ const url=r.data.data.image; setPageData(p=>({...p, imageSection2:{...p.imageSection2, image:url}})); setImage2Preview(url); setImage2File(null); toast.success('Image uploaded'); } }
    catch (e:any){ toast.error(e.response?.data?.message||'Upload failed'); } finally { setUploadingImg2(false); }
  };

  if (loading) return (<div className="p-6"><div className="flex items-center justify-center h-64"><div className="text-gray-700 text-lg">Loading Madrasa Page Management...</div></div></div>);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2"><GraduationCap className="w-8 h-8" />Manage Madrasa Page</h1>
          <p className="text-gray-600">Update content for the Madrasa page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />Save All Changes</Button>
      </div>

      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[{id:'hero',label:'Hero'},{id:'intro',label:'Introduction'},{id:'commit',label:'Commitment & Approach'},{id:'objectives',label:'Objectives'},{id:'features',label:'Features'},{id:'image1',label:'Image 1'},{id:'impact',label:'Impact'},{id:'image2',label:'Image 2'},{id:'challenges',label:'Challenges'},{id:'cta',label:'CTA'}].map(s=>(
          <button key={s.id} onClick={()=>setActiveSection(s.id)} className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${activeSection===s.id ? 'bg-white text-blue-600 shadow-sm':'text-gray-600 hover:text-gray-900'}`}>{s.label}</button>
        ))}
      </div>

      {activeSection==='hero' && (
        <Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><Input value={pageData.heroSection.title} onChange={(e)=>setPageData(p=>({...p, heroSection:{...p.heroSection, title:e.target.value}}))} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label><Input value={pageData.heroSection.subtitle||''} onChange={(e)=>setPageData(p=>({...p, heroSection:{...p.heroSection, subtitle:e.target.value}}))} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><Input value={pageData.heroSection.description||''} onChange={(e)=>setPageData(p=>({...p, heroSection:{...p.heroSection, description:e.target.value}}))} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label><p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p><ImageUpload value={heroImagePreview} onChange={(f,url)=>{ setHeroImageFile(f); setHeroImagePreview(url); }} previewSize="hero" previewShape="rectangular" />{heroImageFile && (<Button onClick={uploadHero} disabled={uploadingHero} className="mt-2 bg-blue-600 hover:bg-blue-700"><Upload className="w-4 h-4 mr-2" />{uploadingHero?'Uploading...':'Upload Image'}</Button>)}</div>
        </CardContent></Card>
      )}

      {activeSection==='intro' && (
        <Card><CardHeader><CardTitle>Introduction</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Heading *</label><Input value={pageData.introduction.heading} onChange={(e)=>setPageData(p=>({...p, introduction:{...p.introduction, heading:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Description *</label><Textarea value={pageData.introduction.description} onChange={(e)=>setPageData(p=>({...p, introduction:{...p.introduction, description:e.target.value}}))} rows={6} /></div></CardContent></Card>
      )}

      {activeSection==='commit' && (
        <Card><CardHeader><CardTitle>Commitment & Approach</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Heading *</label><Input value={pageData.commitmentSection.heading} onChange={(e)=>setPageData(p=>({...p, commitmentSection:{...p.commitmentSection, heading:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Description *</label><Textarea value={pageData.commitmentSection.description} onChange={(e)=>setPageData(p=>({...p, commitmentSection:{...p.commitmentSection, description:e.target.value}}))} rows={5} /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Approach Heading</label><Input value={pageData.commitmentSection.approachHeading||''} onChange={(e)=>setPageData(p=>({...p, commitmentSection:{...p.commitmentSection, approachHeading:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Approach Text</label><Textarea value={pageData.commitmentSection.approachText||''} onChange={(e)=>setPageData(p=>({...p, commitmentSection:{...p.commitmentSection, approachText:e.target.value}}))} rows={5} /></div></div></CardContent></Card>
      )}

      {activeSection==='objectives' && (
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>Objectives</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Section Heading *</label><Input value={pageData.objectivesSection.heading} onChange={(e)=>setPageData(p=>({...p, objectivesSection:{...p.objectivesSection, heading:e.target.value}}))} /></div></CardContent></Card>
          <div className="flex justify-between items-center"><div><h3 className="text-lg font-semibold">Cards</h3><p className="text-gray-600 mt-1">Drag and drop to reorder cards</p></div><Button onClick={()=>setPageData(p=>({...p, objectivesSection:{...p.objectivesSection, cards:[...p.objectivesSection.cards, { title:'', description:'', icon:'🌟' }]}}))} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Add Card</Button></div>
          <div className="space-y-3">{pageData.objectivesSection.cards.map((c,idx)=>(<Card key={(c as any)._id||idx} className={`p-4 ${dragIndex===idx?'opacity-50':''}`} draggable onDragStart={(e)=>onDragStart(e,idx)} onDragOver={onDragOver} onDragEnd={onDragEnd} onDrop={async (e)=>{ e.preventDefault(); if (dragIndex!==null && dragIndex!==idx){ const arr=swap(pageData.objectivesSection.cards, dragIndex, idx); setPageData(p=>({...p, objectivesSection:{...p.objectivesSection, cards:arr}})); await reorder('objectives', arr as any[]); setDragIndex(null);} }}><CardContent className="p-0"><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="block text-sm font-medium mb-1">Title *</label><Input value={c.title} onChange={(e)=>setPageData(p=>{ const a=[...p.objectivesSection.cards]; a[idx]={...a[idx], title:e.target.value}; return {...p, objectivesSection:{...p.objectivesSection, cards:a}}; })} /></div><div><label className="block text-sm font-medium mb-1">Icon</label><Input value={c.icon||''} onChange={(e)=>setPageData(p=>{ const a=[...p.objectivesSection.cards]; a[idx]={...a[idx], icon:e.target.value}; return {...p, objectivesSection:{...p.objectivesSection, cards:a}}; })} /></div></div><div><label className="block text-sm font-medium mb-1">Description *</label><Textarea value={c.description} onChange={(e)=>setPageData(p=>{ const a=[...p.objectivesSection.cards]; a[idx]={...a[idx], description:e.target.value}; return {...p, objectivesSection:{...p.objectivesSection, cards:a}}; })} rows={3} /></div><div className="flex gap-2 mt-3"><Button size="sm" variant="outline" onClick={()=>setPageData(p=>{ const a=[...p.objectivesSection.cards]; a.splice(idx,1); return {...p, objectivesSection:{...p.objectivesSection, cards:a}}; })} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button></div></CardContent></Card>))}</div>
        </div>
      )}

      {activeSection==='features' && (
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>Features</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Section Heading *</label><Input value={pageData.featuresSection.heading} onChange={(e)=>setPageData(p=>({...p, featuresSection:{...p.featuresSection, heading:e.target.value}}))} /></div></CardContent></Card>
          <div className="flex justify-between items-center"><div><h3 className="text-lg font-semibold">Cards</h3><p className="text-gray-600 mt-1">Drag and drop to reorder cards</p></div><Button onClick={()=>setPageData(p=>({...p, featuresSection:{...p.featuresSection, cards:[...p.featuresSection.cards, { title:'', description:'', icon:'💻' }]}}))} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Add Card</Button></div>
          <div className="space-y-3">{pageData.featuresSection.cards.map((c,idx)=>(<Card key={(c as any)._id||idx} className={`p-4 ${dragIndex===idx?'opacity-50':''}`} draggable onDragStart={(e)=>onDragStart(e,idx)} onDragOver={onDragOver} onDragEnd={onDragEnd} onDrop={async (e)=>{ e.preventDefault(); if (dragIndex!==null && dragIndex!==idx){ const arr=swap(pageData.featuresSection.cards, dragIndex, idx); setPageData(p=>({...p, featuresSection:{...p.featuresSection, cards:arr}})); await reorder('features', arr as any[]); setDragIndex(null);} }}><CardContent className="p-0"><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="block text-sm font-medium mb-1">Title *</label><Input value={c.title} onChange={(e)=>setPageData(p=>{ const a=[...p.featuresSection.cards]; a[idx]={...a[idx], title:e.target.value}; return {...p, featuresSection:{...p.featuresSection, cards:a}}; })} /></div><div><label className="block text-sm font-medium mb-1">Icon</label><Input value={c.icon||''} onChange={(e)=>setPageData(p=>{ const a=[...p.featuresSection.cards]; a[idx]={...a[idx], icon:e.target.value}; return {...p, featuresSection:{...p.featuresSection, cards:a}}; })} /></div></div><div><label className="block text-sm font-medium mb-1">Description *</label><Textarea value={c.description} onChange={(e)=>setPageData(p=>{ const a=[...p.featuresSection.cards]; a[idx]={...a[idx], description:e.target.value}; return {...p, featuresSection:{...p.featuresSection, cards:a}}; })} rows={3} /></div><div className="flex gap-2 mt-3"><Button size="sm" variant="outline" onClick={()=>setPageData(p=>{ const a=[...p.featuresSection.cards]; a.splice(idx,1); return {...p, featuresSection:{...p.featuresSection, cards:a}}; })} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button></div></CardContent></Card>))}</div>
        </div>
      )}

      {activeSection==='image1' && (
        <Card><CardHeader><CardTitle>Image Section 1</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Title</label><Input value={pageData.imageSection1.title||''} onChange={(e)=>setPageData(p=>({...p, imageSection1:{...p.imageSection1, title:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Description</label><Textarea value={pageData.imageSection1.description||''} onChange={(e)=>setPageData(p=>({...p, imageSection1:{...p.imageSection1, description:e.target.value}}))} rows={4} /></div><div><label className="block text-sm font-medium mb-1">Image</label><p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p><ImageUpload value={image1Preview} onChange={(f,url)=>{ setImage1File(f); setImage1Preview(url); }} previewSize="lg" previewShape="rectangular" />{image1File && (<Button onClick={uploadImg1} disabled={uploadingImg1} className="mt-2 bg-blue-600 hover:bg-blue-700"><Upload className="w-4 h-4 mr-2" />{uploadingImg1?'Uploading...':'Upload Image'}</Button>)}</div></CardContent></Card>
      )}

      {activeSection==='impact' && (
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>Impact</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Heading *</label><Input value={pageData.impactSection.heading} onChange={(e)=>setPageData(p=>({...p, impactSection:{...p.impactSection, heading:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Intro</label><Textarea value={pageData.impactSection.intro||''} onChange={(e)=>setPageData(p=>({...p, impactSection:{...p.impactSection, intro:e.target.value}}))} rows={3} /></div></CardContent></Card>
          <div className="flex justify-between items-center"><div><h3 className="text-lg font-semibold">Cards</h3><p className="text-gray-600 mt-1">Drag and drop to reorder cards</p></div><Button onClick={()=>setPageData(p=>({...p, impactSection:{...p.impactSection, cards:[...p.impactSection.cards, { title:'', description:'', icon:'🏆' }]}}))} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Add Card</Button></div>
          <div className="space-y-3">{pageData.impactSection.cards.map((c,idx)=>(<Card key={(c as any)._id||idx} className={`p-4 ${dragIndex===idx?'opacity-50':''}`} draggable onDragStart={(e)=>onDragStart(e,idx)} onDragOver={onDragOver} onDragEnd={onDragEnd} onDrop={async (e)=>{ e.preventDefault(); if (dragIndex!==null && dragIndex!==idx){ const arr=swap(pageData.impactSection.cards, dragIndex, idx); setPageData(p=>({...p, impactSection:{...p.impactSection, cards:arr}})); await reorder('impact', arr as any[]); setDragIndex(null);} }}><CardContent className="p-0"><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="block text-sm font-medium mb-1">Title *</label><Input value={c.title} onChange={(e)=>setPageData(p=>{ const a=[...p.impactSection.cards]; a[idx]={...a[idx], title:e.target.value}; return {...p, impactSection:{...p.impactSection, cards:a}}; })} /></div><div><label className="block text-sm font-medium mb-1">Icon</label><Input value={c.icon||''} onChange={(e)=>setPageData(p=>{ const a=[...p.impactSection.cards]; a[idx]={...a[idx], icon:e.target.value}; return {...p, impactSection:{...p.impactSection, cards:a}}; })} /></div></div><div><label className="block text-sm font-medium mb-1">Description *</label><Textarea value={c.description} onChange={(e)=>setPageData(p=>{ const a=[...p.impactSection.cards]; a[idx]={...a[idx], description:e.target.value}; return {...p, impactSection:{...p.impactSection, cards:a}}; })} rows={3} /></div><div className="flex gap-2 mt-3"><Button size="sm" variant="outline" onClick={()=>setPageData(p=>{ const a=[...p.impactSection.cards]; a.splice(idx,1); return {...p, impactSection:{...p.impactSection, cards:a}}; })} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button></div></CardContent></Card>))}</div>
        </div>
      )}

      {activeSection==='image2' && (
        <Card><CardHeader><CardTitle>Image Section 2</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Title</label><Input value={pageData.imageSection2.title||''} onChange={(e)=>setPageData(p=>({...p, imageSection2:{...p.imageSection2, title:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Description</label><Textarea value={pageData.imageSection2.description||''} onChange={(e)=>setPageData(p=>({...p, imageSection2:{...p.imageSection2, description:e.target.value}}))} rows={4} /></div><div><label className="block text-sm font-medium mb-1">Image</label><p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p><ImageUpload value={image2Preview} onChange={(f,url)=>{ setImage2File(f); setImage2Preview(url); }} previewSize="lg" previewShape="rectangular" />{image2File && (<Button onClick={uploadImg2} disabled={uploadingImg2} className="mt-2 bg-blue-600 hover:bg-blue-700"><Upload className="w-4 h-4 mr-2" />{uploadingImg2?'Uploading...':'Upload Image'}</Button>)}</div></CardContent></Card>
      )}

      {activeSection==='challenges' && (
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>Challenges</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Section Heading *</label><Input value={pageData.challengesSection.heading} onChange={(e)=>setPageData(p=>({...p, challengesSection:{...p.challengesSection, heading:e.target.value}}))} /></div></CardContent></Card>
          <div className="flex justify-between items-center"><div><h3 className="text-lg font-semibold">Cards</h3><p className="text-gray-600 mt-1">Drag and drop to reorder cards</p></div><Button onClick={()=>setPageData(p=>({...p, challengesSection:{...p.challengesSection, cards:[...p.challengesSection.cards, { title:'', description:'', icon:'⚠️' }]}}))} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Add Card</Button></div>
          <div className="space-y-3">{pageData.challengesSection.cards.map((c,idx)=>(<Card key={(c as any)._id||idx} className={`p-4 ${dragIndex===idx?'opacity-50':''}`} draggable onDragStart={(e)=>onDragStart(e,idx)} onDragOver={onDragOver} onDragEnd={onDragEnd} onDrop={async (e)=>{ e.preventDefault(); if (dragIndex!==null && dragIndex!==idx){ const arr=swap(pageData.challengesSection.cards, dragIndex, idx); setPageData(p=>({...p, challengesSection:{...p.challengesSection, cards:arr}})); await reorder('challenges', arr as any[]); setDragIndex(null);} }}><CardContent className="p-0"><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="block text-sm font-medium mb-1">Title *</label><Input value={c.title} onChange={(e)=>setPageData(p=>{ const a=[...p.challengesSection.cards]; a[idx]={...a[idx], title:e.target.value}; return {...p, challengesSection:{...p.challengesSection, cards:a}}; })} /></div><div><label className="block text-sm font-medium mb-1">Icon</label><Input value={c.icon||''} onChange={(e)=>setPageData(p=>{ const a=[...p.challengesSection.cards]; a[idx]={...a[idx], icon:e.target.value}; return {...p, challengesSection:{...p.challengesSection, cards:a}}; })} /></div></div><div><label className="block text-sm font-medium mb-1">Description *</label><Textarea value={c.description} onChange={(e)=>setPageData(p=>{ const a=[...p.challengesSection.cards]; a[idx]={...a[idx], description:e.target.value}; return {...p, challengesSection:{...p.challengesSection, cards:a}}; })} rows={3} /></div><div className="flex gap-2 mt-3"><Button size="sm" variant="outline" onClick={()=>setPageData(p=>{ const a=[...p.challengesSection.cards]; a.splice(idx,1); return {...p, challengesSection:{...p.challengesSection, cards:a}}; })} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button></div></CardContent></Card>))}</div>
        </div>
      )}

      {activeSection==='cta' && (
        <Card><CardHeader><CardTitle>Final Call to Action</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Heading *</label><Input value={pageData.ctaSection.heading} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, heading:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Description</label><Textarea value={pageData.ctaSection.description||''} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, description:e.target.value}}))} rows={5} /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Support Button Text</label><Input value={pageData.ctaSection.supportText||''} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, supportText:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Support Button Link</label><Input value={pageData.ctaSection.supportLink||''} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, supportLink:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Get Involved Button Text</label><Input value={pageData.ctaSection.getInvolvedText||''} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, getInvolvedText:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Get Involved Button Link</label><Input value={pageData.ctaSection.getInvolvedLink||''} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, getInvolvedLink:e.target.value}}))} /></div></div></CardContent></Card>
      )}
    </div>
  );
};

export default Madrasa;


