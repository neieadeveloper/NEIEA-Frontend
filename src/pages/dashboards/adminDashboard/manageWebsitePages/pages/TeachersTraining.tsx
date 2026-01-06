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

const itemSchema = z.object({ _id: z.string().optional(), title: z.string().min(2), description: z.string().min(5).optional(), icon: z.string().optional(), duration: z.string().optional(), level: z.string().optional(), modules: z.array(z.string().min(1)).optional(), features: z.array(z.string().min(1)).optional(), display_order: z.number().optional() });
const pageSchema = z.object({
  heroSection: z.object({ title: z.string().min(5), subtitle: z.string().optional(), description: z.string().optional(), heroImage: z.string().optional(), videoLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')) }),
  missionSection: z.object({ heading: z.string().min(5), description: z.string().min(10) }),
  trainingPathwaysSection: z.object({ heading: z.string().min(3), intro: z.string().optional(), items: z.array(itemSchema) }),
  coreComponentsSection: z.object({ heading: z.string().min(3), intro: z.string().optional(), items: z.array(itemSchema) }),
  skillsGainedSection: z.object({ heading: z.string().min(3), intro: z.string().optional(), items: z.array(itemSchema) }),
  whyChooseUsSection: z.object({ heading: z.string().min(3), intro: z.string().optional(), items: z.array(itemSchema) }),
  imageSection: z.object({ image: z.string().optional(), title: z.string().optional(), description: z.string().optional() }),
  ctaSection: z.object({ heading: z.string().min(3), description: z.string().optional() })
});

type PageData = z.infer<typeof pageSchema>;

const TeachersTraining = () => {
  const [active, setActive] = useState('hero');
  const [pageData, setPageData] = useState<PageData>({
    heroSection: {
      title: 'NEIEA Teacher Training Program',
      subtitle: 'Building Educators. Shaping Futures.',
      description:
        'At NEIEA, we believe that the foundation of quality education lies in empowered teachers. Our Teacher Training Program is designed to equip educators with the skills, confidence, and digital readiness needed to create impactful and engaging learning experiences.',
      heroImage: "/assets/images/Teacher's Training Picture.jpg",
      videoLink: '',
    },
    missionSection: {
      heading: 'Transforming Education Through Empowered Teachers',
      description:
        "Teacher training at NEIEA is not just a process—it's a transformation. We nurture innovators in education who are ready to inspire, guide, and shape the next generation of learners with confidence, skills, and digital readiness.",
    },
    trainingPathwaysSection: {
      heading: 'Comprehensive Training Programs',
      intro: 'Multiple pathways designed to meet diverse educational needs and career stages',
      items: [
        {
          title: 'Training for NEIEA Teachers',
          duration: '3-12 months',
          level: 'New Teachers',
          description:
            'Every new teacher undergoes a structured induction program with comprehensive training in our methodology.',
          modules: [
            'Discourse Oriented Pedagogy (DOP)',
            'Digital Readiness with Google Workspace',
            'Mentorship with Senior Teachers',
            'Supervised Teaching Practice',
          ],
          outcome: 'Progress to become Mentor Teachers',
          icon: '👩‍🏫',
        },
        {
          title: 'Training for Partner Institutions',
          duration: 'Ongoing',
          level: 'Partner Schools',
          description:
            'NEIEA partners with schools and organizations to build teaching capacity, ensuring consistent pedagogy and quality.',
          modules: [
            'NEIEA Pedagogy Training',
            'Technology Integration',
            'Academic Quality Standards',
            'Classroom Management',
          ],
          outcome: 'Enhanced teaching capacity across partner institutions',
          icon: '🏫',
        },
        {
          title: 'Training for Classroom Coordinators',
          duration: 'Progressive',
          level: 'Support Staff',
          description:
            'Coordinators support Mentor Teachers and manage daily operations, growing from basic assistance to teaching responsibilities.',
          modules: [
            'Observation of Mentor Teachers',
            'Daily Guided Tasks',
            'Material Distribution',
            'Ongoing Mentorship',
          ],
          outcome: 'Development into effective teaching assistants',
          icon: '🤝',
        },
        {
          title: 'Training for Non-Profit & External Groups',
          duration: 'Customized',
          level: 'External Partners',
          description:
            "Several non-profits, teachers' unions, and private organizations partner with NEIEA to access our training expertise.",
          modules: [
            'Quality Teaching Practices',
            'NEIEA Methodology',
            'Professional Development',
            'Community Outreach',
          ],
          outcome: 'Extended quality teaching practices to broader community',
          icon: '🌍',
        },
        {
          title: 'Remote Training Programs',
          duration: 'Flexible',
          level: 'All Educators',
          description:
            'Geography should never be a barrier to growth. Online training sessions accessible via laptops, tablets, or smartphones.',
          modules: ['Online Workshops', 'Digital Accessibility', 'Remote Mentorship', 'Virtual Professional Development'],
          outcome: 'Truly accessible professional development worldwide',
          icon: '💻',
        },
      ],
    },
    coreComponentsSection: {
      heading: 'Essential Training Modules',
      intro:
        'Our training blends pedagogy, technology, and communication to prepare educators for modern classrooms',
      items: [
        {
          title: 'Discourse Oriented Pedagogy',
          duration: '2 weeks',
          description:
            'Interactive teaching methods designed to engage learners deeply and promote critical thinking.',
          icon: '🎯',
          features: [
            'Student-Centered Learning',
            'Critical Thinking Development',
            'Interactive Discussions',
            'Practical Application',
          ],
        },
        {
          title: 'Technology Training',
          duration: '2 weeks',
          description:
            "Mastery of Google Workspace, digital tools, and apps that power NEIEA's blended model.",
          icon: '💻',
          features: [
            'Google Workspace',
            'Digital Classroom Management',
            'Online Assessment Tools',
            'Educational Apps',
          ],
        },
        {
          title: 'English Proficiency & Confidence',
          duration: '2 months',
          description:
            'Enhancing language fluency and communication skills for effective teaching.',
          icon: '🗣️',
          features: [
            'Communication Skills',
            'Presentation Techniques',
            'Language Fluency',
            'Confidence Building',
          ],
        },
      ],
    },
    skillsGainedSection: {
      heading: 'Skills & Tools Teachers Gain',
      intro:
        'By the end of the program, teachers are equipped with comprehensive skills and tools',
      items: [
        {
          title: 'Student-centered Pedagogy & Classroom Management',
          description:
            'Advanced strategies for engaging students and managing diverse classroom environments effectively.',
          icon: '👥',
        },
        {
          title: 'Digital Tools Proficiency',
          description:
            'Google Classroom, Docs, Meet, MS Word, Excel, Canva, and AI teaching aids mastery.',
          icon: '🛠️',
        },
        {
          title: 'English Communication & Instruction Confidence',
          description:
            'Enhanced language fluency and confidence in delivering instruction effectively.',
          icon: '💬',
        },
        {
          title: 'Practical Experience Through Mentorship',
          description:
            'Hands-on learning through observation, mentorship, and supervised practice sessions.',
          icon: '🎓',
        },
      ],
    },
    whyChooseUsSection: {
      heading: 'Why NEIEA Teacher Training?',
      intro: 'Discover what makes our training program unique and effective',
      items: [
        { title: 'Comprehensive', description: 'Covers pedagogy, technology, and communication', icon: '📚' },
        { title: 'Practical', description: 'Hands-on experience through observation and guided teaching', icon: '🛠️' },
        { title: 'Inclusive', description: 'Open to staff, partners, coordinators, nonprofits, and independent educators', icon: '🤝' },
        { title: 'Flexible', description: 'Available both onsite and remotely', icon: '🌐' },
      ],
    },
    imageSection: {
      image: "/assets/images/Teacher's Training Picture.jpg",
      title: 'Empowering Educators Worldwide',
      description:
        "At NEIEA, we don't just train teachers—we nurture innovators in education who are ready to inspire, guide, and shape the next generation of learners with confidence, skills, and digital readiness.",
    },
    ctaSection: {
      heading: '✨ Join the NEIEA Teacher Training Program',
      description:
        'Empower yourself with the skills, tools, and confidence to transform education. Become part of a community dedicated to shaping the future of learning.',
    },
  });

  const [loading, setLoading] = useState(true);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [imageSectionFile, setImageSectionFile] = useState<File | null>(null);
  const [imageSectionPreview, setImageSectionPreview] = useState<string>('');
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingImageSec, setUploadingImageSec] = useState(false);

  useEffect(()=>{ load(); },[]);

  const load = async () => {
    try {
      setLoading(true);
      const r = await axiosInstance.get('/admin/teachers-training-page');
      if (r.data?.success && r.data.data) {
        const d = r.data.data as PageData;
        setPageData(d);
        setHeroImagePreview(d.heroSection?.heroImage||'');
        setImageSectionPreview(d.imageSection?.image||'');
      }
    } catch (e:any) { if (e.response?.status !== 404) toast.error(e.response?.data?.message||'Failed to load'); } finally { setLoading(false); }
  };

  const reorder = async (section:'trainingPathways'|'coreComponents'|'skills'|'whyChooseUs', arr:any[]) => {
    try { await axiosInstance.post('/admin/teachers-training-page/reorder', { section, items: arr.map((x:any,i:number)=>({ id:x._id, display_order:i })) }); toast.success('Order updated'); }
    catch { toast.error('Failed to update order'); load(); }
  };

  const swap = (a:any[], from:number, to:number)=>{ const arr=[...a]; const [m]=arr.splice(from,1); arr.splice(to,0,m); return arr; };

  const saveAll = async () => {
    const d: PageData = {
      ...pageData,
      trainingPathwaysSection: { ...pageData.trainingPathwaysSection, items: pageData.trainingPathwaysSection.items.map((x,i)=>({ ...x, display_order:i })) },
      coreComponentsSection: { ...pageData.coreComponentsSection, items: pageData.coreComponentsSection.items.map((x,i)=>({ ...x, display_order:i })) },
      skillsGainedSection: { ...pageData.skillsGainedSection, items: pageData.skillsGainedSection.items.map((x,i)=>({ ...x, display_order:i })) },
      whyChooseUsSection: { ...pageData.whyChooseUsSection, items: pageData.whyChooseUsSection.items.map((x,i)=>({ ...x, display_order:i })) },
    };
    const check = pageSchema.safeParse(d);
    if (!check.success){ const e = check.error.errors[0]; toast.error(`Validation Error: ${e.path.join(' → ')} - ${e.message}`); return; }
    try {
      let res; try { res = await axiosInstance.put('/admin/teachers-training-page', d); } catch (err:any) { if (err.response?.status === 404) res = await axiosInstance.post('/admin/teachers-training-page', d); else throw err; }
      if (res.data?.success){ toast.success('Saved'); load(); } else toast.error('Failed to save');
    } catch (e:any){ toast.error(e.response?.data?.message||'Failed to save'); }
  };

  const uploadHero = async ()=>{
    if (!heroImageFile) return toast.error('Select an image');
    const fd = new FormData(); fd.append('heroImage', heroImageFile); setUploadingHero(true);
    try { const r = await axiosInstance.post('/admin/teachers-training-page/upload-hero-image', fd, { headers:{'Content-Type':'multipart/form-data'} }); if (r.data?.success){ const url=r.data.data.image; setPageData(p=>({...p, heroSection:{...p.heroSection, heroImage:url}})); setHeroImagePreview(url); setHeroImageFile(null); toast.success('Hero image uploaded'); } }
    catch (e:any){ toast.error(e.response?.data?.message||'Upload failed'); } finally { setUploadingHero(false); }
  };
  const uploadImageSection = async ()=>{
    if (!imageSectionFile) return toast.error('Select an image');
    const fd = new FormData(); fd.append('image', imageSectionFile); setUploadingImageSec(true);
    try { const r = await axiosInstance.post('/admin/teachers-training-page/upload-image-section', fd, { headers:{'Content-Type':'multipart/form-data'} }); if (r.data?.success){ const url=r.data.data.image; setPageData(p=>({...p, imageSection:{...p.imageSection, image:url}})); setImageSectionPreview(url); setImageSectionFile(null); toast.success('Image uploaded'); } }
    catch (e:any){ toast.error(e.response?.data?.message||'Upload failed'); } finally { setUploadingImageSec(false); }
  };

  if (loading) return (<div className="p-6"><div className="flex items-center justify-center h-64"><div className="text-gray-700 text-lg">Loading Teachers Training Page Management...</div></div></div>);

  const renderList = (label:string, sectionKey: keyof Pick<PageData,'trainingPathwaysSection'|'coreComponentsSection'|'skillsGainedSection'|'whyChooseUsSection'>, withModulesOrFeatures: 'modules'|'features'|'both'|'none', reorderKey: 'trainingPathways'|'coreComponents'|'skills'|'whyChooseUs') => {
    const sec = pageData[sectionKey];
    const items = (sec as any).items as any[];
    return (
      <div className="space-y-6">
        <Card><CardHeader><CardTitle>{label}</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Heading *</label><Input value={(sec as any).heading} onChange={(e)=>setPageData((p:any)=>({ ...p, [sectionKey]: { ...(p as any)[sectionKey], heading:e.target.value } }))} /></div><div><label className="block text-sm font-medium mb-1">Intro</label><Textarea value={(sec as any).intro||''} onChange={(e)=>setPageData((p:any)=>({ ...p, [sectionKey]: { ...(p as any)[sectionKey], intro:e.target.value } }))} rows={3} /></div></CardContent></Card>
        <div className="flex justify-between items-center"><div><h3 className="text-lg font-semibold">Items</h3><p className="text-gray-600 mt-1">Drag and drop to reorder</p></div><Button onClick={()=>setPageData((p:any)=>({ ...p, [sectionKey]: { ...(p as any)[sectionKey], items:[...items, { title:'', description:'', icon:'⭐' }] } }))} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Add Item</Button></div>
        <div className="space-y-3">{items.map((c:any,idx:number)=>(<Card key={c._id||idx} className={`p-4 ${dragIndex===idx?'opacity-50':''}`} draggable onDragStart={()=>setDragIndex(idx)} onDragOver={(e)=>e.preventDefault()} onDragEnd={()=>setDragIndex(null)} onDrop={async (e)=>{ e.preventDefault(); if (dragIndex!==null && dragIndex!==idx){ const arr=swap(items, dragIndex, idx); setPageData((p:any)=>({ ...p, [sectionKey]: { ...(p as any)[sectionKey], items:arr } })); await reorder(reorderKey, arr as any[]); setDragIndex(null);} }}><CardContent className="p-0"><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="block text-sm font-medium mb-1">Title *</label><Input value={c.title} onChange={(e)=>setPageData((p:any)=>{ const arr=[...items]; arr[idx]={...arr[idx], title:e.target.value}; return { ...p, [sectionKey]: { ...(p as any)[sectionKey], items:arr } }; })} /></div><div><label className="block text-sm font-medium mb-1">Icon</label><Input value={c.icon||''} onChange={(e)=>setPageData((p:any)=>{ const arr=[...items]; arr[idx]={...arr[idx], icon:e.target.value}; return { ...p, [sectionKey]: { ...(p as any)[sectionKey], items:arr } }; })} /></div><div><label className="block text-sm font-medium mb-1">Duration</label><Input value={c.duration||''} onChange={(e)=>setPageData((p:any)=>{ const arr=[...items]; arr[idx]={...arr[idx], duration:e.target.value}; return { ...p, [sectionKey]: { ...(p as any)[sectionKey], items:arr } }; })} /></div><div><label className="block text-sm font-medium mb-1">Level</label><Input value={c.level||''} onChange={(e)=>setPageData((p:any)=>{ const arr=[...items]; arr[idx]={...arr[idx], level:e.target.value}; return { ...p, [sectionKey]: { ...(p as any)[sectionKey], items:arr } }; })} /></div></div><div><label className="block text-sm font-medium mb-1">Description</label><Textarea value={c.description||''} onChange={(e)=>setPageData((p:any)=>{ const arr=[...items]; arr[idx]={...arr[idx], description:e.target.value}; return { ...p, [sectionKey]: { ...(p as any)[sectionKey], items:arr } }; })} rows={3} /></div>{(withModulesOrFeatures==='modules'||withModulesOrFeatures==='both') && (<div><label className="block text-sm font-medium mb-1">Modules (comma separated)</label><Input value={(c.modules||[]).join(', ')} onChange={(e)=>setPageData((p:any)=>{ const arr=[...items]; arr[idx]={...arr[idx], modules:e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean)}; return { ...p, [sectionKey]: { ...(p as any)[sectionKey], items:arr } }; })} /></div>)}{(withModulesOrFeatures==='features'||withModulesOrFeatures==='both') && (<div><label className="block text-sm font-medium mb-1">Features (comma separated)</label><Input value={(c.features||[]).join(', ')} onChange={(e)=>setPageData((p:any)=>{ const arr=[...items]; arr[idx]={...arr[idx], features:e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean)}; return { ...p, [sectionKey]: { ...(p as any)[sectionKey], items:arr } }; })} /></div>)}<div className="flex gap-2 mt-3"><Button size="sm" variant="outline" onClick={()=>setPageData((p:any)=>{ const arr=[...items]; arr.splice(idx,1); return { ...p, [sectionKey]: { ...(p as any)[sectionKey], items:arr } }; })} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button></div></CardContent></Card>))}</div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2"><GraduationCap className="w-8 h-8" />Manage Teachers Training Page</h1>
          <p className="text-gray-600">Update content for the Teachers Training page</p>
        </div>
        <Button onClick={saveAll} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />Save All Changes</Button>
      </div>

      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[{id:'hero',label:'Hero'},{id:'mission',label:'Mission'},{id:'pathways',label:'Training Pathways'},{id:'core',label:'Core Components'},{id:'skills',label:'Skills Gained'},{id:'why',label:'Why Choose Us'},{id:'image',label:'Image Section'},{id:'cta',label:'CTA'}].map(s=>(
          <button key={s.id} onClick={()=>setActive(s.id)} className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${active===s.id ? 'bg-white text-blue-600 shadow-sm':'text-gray-600 hover:text-gray-900'}`}>{s.label}</button>
        ))}
      </div>

      {active==='hero' && (<Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Title *</label><Input value={pageData.heroSection.title} onChange={(e)=>setPageData(p=>({...p, heroSection:{...p.heroSection, title:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Subtitle</label><Input value={pageData.heroSection.subtitle||''} onChange={(e)=>setPageData(p=>({...p, heroSection:{...p.heroSection, subtitle:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Description</label><Input value={pageData.heroSection.description||''} onChange={(e)=>setPageData(p=>({...p, heroSection:{...p.heroSection, description:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Hero Image</label><p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p><ImageUpload value={heroImagePreview} onChange={(f,url)=>{ setHeroImageFile(f); setHeroImagePreview(url); }} previewSize="hero" previewShape="rectangular" />{heroImageFile && (<Button onClick={uploadHero} disabled={uploadingHero} className="mt-2 bg-blue-600 hover:bg-blue-700"><Upload className="w-4 h-4 mr-2" />{uploadingHero?'Uploading...':'Upload Image'}</Button>)}</div><div><label className="block text-sm font-medium mb-1">Video Link (Optional)</label><p className="text-xs text-gray-500 mb-2">Enter a YouTube or Vimeo video URL to display over the hero image</p><Input type="url" value={pageData.heroSection.videoLink||''} onChange={(e)=>setPageData(p=>({...p, heroSection:{...p.heroSection, videoLink:e.target.value}}))} placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..." /></div></CardContent></Card>)}

      {active==='mission' && (<Card><CardHeader><CardTitle>Mission Statement</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Heading *</label><Input value={pageData.missionSection.heading} onChange={(e)=>setPageData(p=>({...p, missionSection:{...p.missionSection, heading:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Description *</label><Textarea value={pageData.missionSection.description} onChange={(e)=>setPageData(p=>({...p, missionSection:{...p.missionSection, description:e.target.value}}))} rows={6} /></div></CardContent></Card>)}

      {active==='pathways' && renderList('Training Pathways', 'trainingPathwaysSection', 'modules', 'trainingPathways')}
      {active==='core' && renderList('Core Components', 'coreComponentsSection', 'features', 'coreComponents')}
      {active==='skills' && renderList('Skills Gained', 'skillsGainedSection', 'none', 'skills')}
      {active==='why' && renderList('Why Choose Us', 'whyChooseUsSection', 'none', 'whyChooseUs')}

      {active==='image' && (<Card><CardHeader><CardTitle>Image Section</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Title</label><Input value={pageData.imageSection.title||''} onChange={(e)=>setPageData(p=>({...p, imageSection:{...p.imageSection, title:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Description</label><Textarea value={pageData.imageSection.description||''} onChange={(e)=>setPageData(p=>({...p, imageSection:{...p.imageSection, description:e.target.value}}))} rows={4} /></div><div><label className="block text-sm font-medium mb-1">Image</label><p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p><ImageUpload value={imageSectionPreview} onChange={(f,url)=>{ setImageSectionFile(f); setImageSectionPreview(url); }} previewSize="lg" previewShape="rectangular" />{imageSectionFile && (<Button onClick={uploadImageSection} disabled={uploadingImageSec} className="mt-2 bg-blue-600 hover:bg-blue-700"><Upload className="w-4 h-4 mr-2" />{uploadingImageSec?'Uploading...':'Upload Image'}</Button>)}</div></CardContent></Card>)}

      {active==='cta' && (<Card><CardHeader><CardTitle>Final Call to Action</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Heading *</label><Input value={pageData.ctaSection.heading} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, heading:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Description</label><Textarea value={pageData.ctaSection.description||''} onChange={(e)=>setPageData(p=>({...p, ctaSection:{...p.ctaSection, description:e.target.value}}))} rows={5} /></div></CardContent></Card>)}
    </div>
  );
};

export default TeachersTraining;


