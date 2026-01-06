import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Upload, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';
import ImageUpload from '@/components/ui/image-upload';

// Schemas
const obeProgramSchema = z.object({ _id: z.string().optional(), level: z.string().min(1), equivalent: z.string().min(1), subjects: z.array(z.string().min(1)).min(1), icon: z.string().min(1).max(10), display_order: z.number().optional() });
const subjectSchema = z.object({ _id: z.string().optional(), name: z.string().min(1), display_order: z.number().optional() });
const galleryImageSchema = z.object({ _id: z.string().optional(), image: z.string().optional(), title: z.string().min(1), description: z.string().min(3), display_order: z.number().optional() });
const impactCardSchema = z.object({ _id: z.string().optional(), number: z.string().min(1), title: z.string().min(1), description: z.string().min(3), icon: z.string().min(1).max(10), display_order: z.number().optional() });

const pageSchema = z.object({
  heroSection: z.object({ title: z.string().min(5), subtitle: z.string().optional(), description: z.string().optional(), heroImage: z.string().optional() }),
  objectiveSection: z.object({ heading: z.string().min(3), description: z.string().min(10) }),
  featuredImageSection: z.object({ image: z.string().optional(), caption: z.string().optional() }),
  obeProgramSection: z.object({ heading: z.string().min(3), description: z.string().optional(), programs: z.array(obeProgramSchema).min(0) }),
  flexibleNote: z.object({ text: z.string().optional() }),
  secondaryProgramSection: z.object({ heading: z.string().min(3), description: z.string().optional(), subjects: z.array(subjectSchema).min(0), icon: z.string().optional() }),
  gallerySection: z.object({ heading: z.string().optional(), intro: z.string().optional(), images: z.array(galleryImageSchema).min(0) }),
  impactSection: z.object({ heading: z.string().optional(), intro: z.string().optional(), cards: z.array(impactCardSchema).min(0) }),
  secondImageSection: z.object({ image: z.string().optional(), title: z.string().optional(), description: z.string().optional() }),
});

type PageData = z.infer<typeof pageSchema>;

const OutOfSchoolDropout = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [pageData, setPageData] = useState<PageData>({
    heroSection: { title: 'Education for OUT OF SCHOOL AND DROPOUT Children through NIOS', subtitle: 'National Institute of Open Schooling', description: 'To provide a second chance at formal education...', heroImage: '/assets/images/OutOfSchools/image1.png' },
    objectiveSection: { heading: '🎯 Our Objective', description: 'To provide a second chance at formal education for dropout children...' },
    featuredImageSection: { image: '/assets/images/OutOfSchools/image1.png', caption: 'NIOS learners from AL Furqaan Madarsa...' },
    obeProgramSection: { heading: 'NIOS Open Basic Education (OBE) Program', description: 'The OBE Program is implemented across three levels...', programs: [] },
    flexibleNote: { text: 'These courses are designed with flexibility...' },
    secondaryProgramSection: { heading: '🎓 NIOS Secondary Education Program', description: 'For learners aiming to complete their 10th Grade...', subjects: [], icon: '🎓' },
    gallerySection: { heading: 'NIOS Learning in Action', intro: 'Witness the transformation...', images: [] },
    impactSection: { heading: '🌟 Impact', intro: 'In the last academic year, NEIEA is proud to report the following outcomes', cards: [] },
    secondImageSection: { image: '/assets/images/OutOfSchools/image2.png', title: 'NIOS 10th grade learners from Thanal MLC Bangalore', description: 'Supporting learners...' },
  });
  const [loading, setLoading] = useState(true);

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>('');
  const [secondImageFile, setSecondImageFile] = useState<File | null>(null);
  const [secondImagePreview, setSecondImagePreview] = useState<string>('');
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingSecond, setUploadingSecond] = useState(false);
  const [uploadingGalleryImages, setUploadingGalleryImages] = useState<{ [key: number]: boolean }>({});

  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => { loadPageData(); }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/out-of-school-dropout-page');
      if (res.data?.success && res.data.data) {
        const data = res.data.data as PageData;
        setPageData(data);
        setHeroImagePreview(data.heroSection?.heroImage || '');
        setFeaturedImagePreview(data.featuredImageSection?.image || '');
        setSecondImagePreview(data.secondImageSection?.image || '');
      }
    } catch (e:any) {
      if (e.response?.status !== 404) toast.error(e.response?.data?.message || 'Failed to load page data');
    } finally { setLoading(false); }
  };

  const handleSaveAll = async () => {
    const dataToSave: PageData = {
      ...pageData,
      obeProgramSection: { ...pageData.obeProgramSection, programs: pageData.obeProgramSection.programs.map((p, i) => ({ ...p, display_order: i })) },
      secondaryProgramSection: { ...pageData.secondaryProgramSection, subjects: pageData.secondaryProgramSection.subjects.map((s, i) => ({ ...s, display_order: i })) },
      gallerySection: { ...pageData.gallerySection, images: pageData.gallerySection.images.map((img, i) => ({ ...img, display_order: i })) },
      impactSection: { ...pageData.impactSection, cards: pageData.impactSection.cards.map((c, i) => ({ ...c, display_order: i })) },
    };
    const check = pageSchema.safeParse(dataToSave);
    if (!check.success) { const e = check.error.errors[0]; toast.error(`Validation Error: ${e.path.join(' → ')} - ${e.message}`); return; }
    try {
      let res;
      try { res = await axiosInstance.put('/admin/out-of-school-dropout-page', dataToSave); }
      catch (err:any) { if (err.response?.status === 404) res = await axiosInstance.post('/admin/out-of-school-dropout-page', dataToSave); else throw err; }
      if (res.data?.success) { toast.success('Page saved successfully'); loadPageData(); } else toast.error('Failed to save changes');
    } catch (e:any) { toast.error(e.response?.data?.message || 'Failed to save changes'); }
  };

  const reorder = async (section: 'obePrograms'|'secondarySubjects'|'galleryImages'|'impactCards', arr: any[]) => {
    try { await axiosInstance.post('/admin/out-of-school-dropout-page/reorder', { section, items: arr.map((x:any, i:number)=>({ id: x._id, display_order: i })) }); toast.success('Order updated'); }
    catch { toast.error('Failed to update order'); loadPageData(); }
  };

  const onDragStart = (e: React.DragEvent, index:number) => { setDragIndex(index); e.dataTransfer.effectAllowed='move'; };
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const onDragEnd = () => { setDragIndex(null); };

  const swap = (arr:any[], from:number, to:number) => { const a=[...arr]; const [m]=a.splice(from,1); a.splice(to,0,m); return a; };

  // Image uploads
  const uploadHero = async () => {
    if (!heroImageFile) return toast.error('Select an image');
    const fd = new FormData(); fd.append('heroImage', heroImageFile);
    setUploadingHero(true);
    try { const res = await axiosInstance.post('/admin/out-of-school-dropout-page/upload-hero-image', fd, { headers:{'Content-Type':'multipart/form-data'} }); if (res.data?.success){ const url=res.data.data.image; setPageData(prev=>({...prev, heroSection:{...prev.heroSection, heroImage:url}})); setHeroImagePreview(url); setHeroImageFile(null); toast.success('Hero image uploaded'); } }
    catch (e:any){ toast.error(e.response?.data?.message||'Upload failed'); }
    finally { setUploadingHero(false); }
  };
  const uploadFeatured = async () => {
    if (!featuredImageFile) return toast.error('Select an image');
    const fd = new FormData(); fd.append('featuredImage', featuredImageFile);
    setUploadingFeatured(true);
    try { const res = await axiosInstance.post('/admin/out-of-school-dropout-page/upload-featured-image', fd, { headers:{'Content-Type':'multipart/form-data'} }); if (res.data?.success){ const url=res.data.data.image; setPageData(prev=>({...prev, featuredImageSection:{...prev.featuredImageSection, image:url}})); setFeaturedImagePreview(url); setFeaturedImageFile(null); toast.success('Featured image uploaded'); } }
    catch (e:any){ toast.error(e.response?.data?.message||'Upload failed'); }
    finally { setUploadingFeatured(false); }
  };
  const uploadSecond = async () => {
    if (!secondImageFile) return toast.error('Select an image');
    const fd = new FormData(); fd.append('secondImage', secondImageFile);
    setUploadingSecond(true);
    try { const res = await axiosInstance.post('/admin/out-of-school-dropout-page/upload-second-image', fd, { headers:{'Content-Type':'multipart/form-data'} }); if (res.data?.success){ const url=res.data.data.image; setPageData(prev=>({...prev, secondImageSection:{...prev.secondImageSection, image:url}})); setSecondImagePreview(url); setSecondImageFile(null); toast.success('Image uploaded'); } }
    catch (e:any){ toast.error(e.response?.data?.message||'Upload failed'); }
    finally { setUploadingSecond(false); }
  };

  if (loading) return (<div className="p-6"><div className="flex items-center justify-center h-64"><div className="text-gray-700 text-lg">Loading Out Of School / Dropout Page Management...</div></div></div>);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2"><GraduationCap className="w-8 h-8" />Manage Out Of School / Dropout Page</h1>
          <p className="text-gray-600">Update all content for the Out Of School / Dropout page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />Save All Changes</Button>
      </div>

      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[{id:'hero',label:'Hero'}, {id:'objective',label:'Objective'}, {id:'featured',label:'Featured Image'}, {id:'obe',label:'OBE Program'}, {id:'flex',label:'Flexible Note'}, {id:'secondary',label:'Secondary Program'}, {id:'gallery',label:'Program Highlights'}, {id:'impact',label:'Impact'}, {id:'second',label:'Second Image'}].map(s => (
          <button key={s.id} onClick={()=>setActiveSection(s.id)} className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${activeSection===s.id ? 'bg-white text-blue-600 shadow-sm':'text-gray-600 hover:text-gray-900'}`}>{s.label}</button>
        ))}
      </div>

      {activeSection==='hero' && (
        <Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><Input value={pageData.heroSection.title} onChange={(e)=>setPageData(prev=>({...prev, heroSection:{...prev.heroSection, title:e.target.value}}))} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label><Input value={pageData.heroSection.subtitle||''} onChange={(e)=>setPageData(prev=>({...prev, heroSection:{...prev.heroSection, subtitle:e.target.value}}))} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><Input value={pageData.heroSection.description||''} onChange={(e)=>setPageData(prev=>({...prev, heroSection:{...prev.heroSection, description:e.target.value}}))} /></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
            <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
            <ImageUpload value={heroImagePreview} onChange={(file, url)=>{ setHeroImageFile(file); setHeroImagePreview(url); }} previewSize="hero" previewShape="rectangular" />
            {heroImageFile && (<Button onClick={uploadHero} disabled={uploadingHero} className="mt-2 bg-blue-600 hover:bg-blue-700"><Upload className="w-4 h-4 mr-2" />{uploadingHero?'Uploading...':'Upload Image'}</Button>)}
          </div>
        </CardContent></Card>
      )}

      {activeSection==='objective' && (
        <Card><CardHeader><CardTitle>Objective Section</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Heading *</label><Input value={pageData.objectiveSection.heading} onChange={(e)=>setPageData(prev=>({...prev, objectiveSection:{...prev.objectiveSection, heading:e.target.value}}))} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><Textarea value={pageData.objectiveSection.description} onChange={(e)=>setPageData(prev=>({...prev, objectiveSection:{...prev.objectiveSection, description:e.target.value}}))} rows={6} /></div>
        </CardContent></Card>
      )}

      {activeSection==='featured' && (
        <Card><CardHeader><CardTitle>Featured Image Section</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Caption</label><Textarea value={pageData.featuredImageSection.caption||''} onChange={(e)=>setPageData(prev=>({...prev, featuredImageSection:{...prev.featuredImageSection, caption:e.target.value}}))} rows={3} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label><p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p><ImageUpload value={featuredImagePreview} onChange={(file,url)=>{ setFeaturedImageFile(file); setFeaturedImagePreview(url); }} previewSize="lg" previewShape="rectangular" />{featuredImageFile && (<Button onClick={uploadFeatured} disabled={uploadingFeatured} className="mt-2 bg-blue-600 hover:bg-blue-700"><Upload className="w-4 h-4 mr-2" />{uploadingFeatured?'Uploading...':'Upload Image'}</Button>)}</div>
        </CardContent></Card>
      )}

      {activeSection==='obe' && (
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>OBE Program Section</CardTitle></CardHeader><CardContent className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Heading *</label><Input value={pageData.obeProgramSection.heading} onChange={(e)=>setPageData(prev=>({...prev, obeProgramSection:{...prev.obeProgramSection, heading:e.target.value}}))} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><Textarea value={pageData.obeProgramSection.description||''} onChange={(e)=>setPageData(prev=>({...prev, obeProgramSection:{...prev.obeProgramSection, description:e.target.value}}))} rows={3} /></div>
          </CardContent></Card>

          <div className="flex justify-between items-center mb-2">
            <div><h3 className="text-lg font-semibold">Programs</h3><p className="text-gray-600 mt-1">Drag and drop to reorder programs</p></div>
            <Button onClick={()=>setPageData(prev=>({...prev, obeProgramSection:{...prev.obeProgramSection, programs:[...prev.obeProgramSection.programs, { level:'', equivalent:'', subjects:[], icon:'🔹' }]}}))} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Add Program</Button>
          </div>

          <div className="space-y-3">
            {pageData.obeProgramSection.programs.map((prog, idx)=>(
              <Card key={(prog as any)._id||idx} className={`p-4 ${dragIndex===idx?'opacity-50':''}`} draggable onDragStart={(e)=>onDragStart(e,idx)} onDragOver={onDragOver} onDragEnd={onDragEnd} onDrop={async (e)=>{ e.preventDefault(); if (dragIndex!==null && dragIndex!==idx){ const arr=swap(pageData.obeProgramSection.programs, dragIndex, idx); setPageData(prev=>({...prev, obeProgramSection:{...prev.obeProgramSection, programs:arr}})); await reorder('obePrograms', arr as any[]); setDragIndex(null);} }}>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div><label className="block text-sm font-medium mb-1">Level *</label><Input value={prog.level} onChange={(e)=>setPageData(prev=>{ const a=[...prev.obeProgramSection.programs]; a[idx]={...a[idx], level:e.target.value}; return {...prev, obeProgramSection:{...prev.obeProgramSection, programs:a}}; })} /></div>
                    <div><label className="block text-sm font-medium mb-1">Equivalent *</label><Input value={prog.equivalent} onChange={(e)=>setPageData(prev=>{ const a=[...prev.obeProgramSection.programs]; a[idx]={...a[idx], equivalent:e.target.value}; return {...prev, obeProgramSection:{...prev.obeProgramSection, programs:a}}; })} /></div>
                    <div><label className="block text-sm font-medium mb-1">Icon</label><Input value={prog.icon} onChange={(e)=>setPageData(prev=>{ const a=[...prev.obeProgramSection.programs]; a[idx]={...a[idx], icon:e.target.value}; return {...prev, obeProgramSection:{...prev.obeProgramSection, programs:a}}; })} /></div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subjects (comma separated)</label>
                      <Input value={(prog.subjects||[]).join(', ')} onChange={(e)=>setPageData(prev=>{ const a=[...prev.obeProgramSection.programs]; a[idx]={...a[idx], subjects:e.target.value.split(',').map(s=>s.trim()).filter(Boolean)}; return {...prev, obeProgramSection:{...prev.obeProgramSection, programs:a}}; })} />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={()=>setPageData(prev=>{ const a=[...prev.obeProgramSection.programs]; a.splice(idx,1); return {...prev, obeProgramSection:{...prev.obeProgramSection, programs:a}}; })} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSection==='flex' && (
        <Card><CardHeader><CardTitle>Flexible Learning Note</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Text</label><Textarea value={pageData.flexibleNote.text||''} onChange={(e)=>setPageData(prev=>({...prev, flexibleNote:{ text:e.target.value }}))} rows={4} /></div></CardContent></Card>
      )}

      {activeSection==='secondary' && (
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>Secondary Program Section</CardTitle></CardHeader><CardContent className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Heading *</label><Input value={pageData.secondaryProgramSection.heading} onChange={(e)=>setPageData(prev=>({...prev, secondaryProgramSection:{...prev.secondaryProgramSection, heading:e.target.value}}))} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><Textarea value={pageData.secondaryProgramSection.description||''} onChange={(e)=>setPageData(prev=>({...prev, secondaryProgramSection:{...prev.secondaryProgramSection, description:e.target.value}}))} rows={3} /></div>
          </CardContent></Card>
          <div className="flex justify-between items-center mb-2"><div><h3 className="text-lg font-semibold">Subjects</h3><p className="text-gray-600 mt-1">Drag and drop to reorder subjects</p></div><Button onClick={()=>setPageData(prev=>({...prev, secondaryProgramSection:{...prev.secondaryProgramSection, subjects:[...prev.secondaryProgramSection.subjects, { name:'' }]}}))} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Add Subject</Button></div>
          <div className="space-y-3">
            {pageData.secondaryProgramSection.subjects.map((subj, idx)=>(
              <Card key={(subj as any)._id||idx} className={`p-4 ${dragIndex===idx?'opacity-50':''}`} draggable onDragStart={(e)=>onDragStart(e,idx)} onDragOver={onDragOver} onDragEnd={onDragEnd} onDrop={async (e)=>{ e.preventDefault(); if (dragIndex!==null && dragIndex!==idx){ const arr=swap(pageData.secondaryProgramSection.subjects, dragIndex, idx); setPageData(prev=>({...prev, secondaryProgramSection:{...prev.secondaryProgramSection, subjects:arr}})); await reorder('secondarySubjects', arr as any[]); setDragIndex(null);} }}>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div><label className="block text-sm font-medium mb-1">Name *</label><Input value={subj.name} onChange={(e)=>setPageData(prev=>{ const a=[...prev.secondaryProgramSection.subjects]; a[idx]={...a[idx], name:e.target.value}; return {...prev, secondaryProgramSection:{...prev.secondaryProgramSection, subjects:a}}; })} /></div>
                  </div>
                  <div className="flex gap-2 mt-3"><Button size="sm" variant="outline" onClick={()=>setPageData(prev=>{ const a=[...prev.secondaryProgramSection.subjects]; a.splice(idx,1); return {...prev, secondaryProgramSection:{...prev.secondaryProgramSection, subjects:a}}; })} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSection==='gallery' && (
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>Program Highlights Gallery</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Heading</label><Input value={pageData.gallerySection.heading||''} onChange={(e)=>setPageData(prev=>({...prev, gallerySection:{...prev.gallerySection, heading:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Intro</label><Textarea value={pageData.gallerySection.intro||''} onChange={(e)=>setPageData(prev=>({...prev, gallerySection:{...prev.gallerySection, intro:e.target.value}}))} rows={3} /></div></CardContent></Card>
          <div className="flex justify-between items-center mb-2"><div><h3 className="text-lg font-semibold">Images</h3><p className="text-gray-600 mt-1">Drag and drop to reorder images</p></div><Button onClick={()=>setPageData(prev=>({...prev, gallerySection:{...prev.gallerySection, images:[...prev.gallerySection.images, { title:'', description:'' }]}}))} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Add Image</Button></div>
          <div className="space-y-3">
            {pageData.gallerySection.images.map((img, idx)=>(
              <Card key={(img as any)._id||idx} className={`p-4 ${dragIndex===idx?'opacity-50':''}`} draggable onDragStart={(e)=>onDragStart(e,idx)} onDragOver={onDragOver} onDragEnd={onDragEnd} onDrop={async (e)=>{ e.preventDefault(); if (dragIndex!==null && dragIndex!==idx){ const arr=swap(pageData.gallerySection.images, dragIndex, idx); setPageData(prev=>({...prev, gallerySection:{...prev.gallerySection, images:arr}})); await reorder('galleryImages', arr as any[]); setDragIndex(null);} }}>
                <CardContent className="p-0 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div><label className="block text-sm font-medium mb-1">Title *</label><Input value={img.title} onChange={(e)=>setPageData(prev=>{ const a=[...prev.gallerySection.images]; a[idx]={...a[idx], title:e.target.value}; return {...prev, gallerySection:{...prev.gallerySection, images:a}}; })} /></div>
                    <div><label className="block text-sm font-medium mb-1">Description *</label><Textarea value={img.description||''} onChange={(e)=>setPageData(prev=>{ const a=[...prev.gallerySection.images]; a[idx]={...a[idx], description:e.target.value}; return {...prev, gallerySection:{...prev.gallerySection, images:a}}; })} rows={3} /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1200x800px, Max 2MB, JPG/PNG/WebP format</p>
                    <ImageUpload value={(img as any).image||''} onChange={async (file, previewUrl)=>{ 
                      if (!file) {
                        // If file is cleared, remove image from the item
                        const a=[...pageData.gallerySection.images]; 
                        a[idx]={...a[idx], image:''}; 
                        setPageData(prev=>({...prev, gallerySection:{...prev.gallerySection, images:a}})); 
                        return;
                      }
                      if (file.size>2000000) { 
                        toast.error('Image size must be less than 2MB'); 
                        return; 
                      }
                      // Get old image URL before uploading new one
                      const oldImageUrl = (img as any).image || '';
                      
                      // Upload to S3
                      setUploadingGalleryImages(prev => ({ ...prev, [idx]: true }));
                      try {
                        const formData = new FormData();
                        formData.append('galleryImage', file);
                        // Send old image URL so backend can delete it
                        if (oldImageUrl) {
                          formData.append('oldImageUrl', oldImageUrl);
                        }
                        const res = await axiosInstance.post('/admin/out-of-school-dropout-page/upload-gallery-image', formData, {
                          headers: { 'Content-Type': 'multipart/form-data' }
                        });
                        if (res.data?.success) {
                          const imageUrl = res.data.data.image;
                          const a=[...pageData.gallerySection.images]; 
                          a[idx]={...a[idx], image:imageUrl}; 
                          setPageData(prev=>({...prev, gallerySection:{...prev.gallerySection, images:a}})); 
                          toast.success('Image uploaded successfully');
                        } else {
                          toast.error('Failed to upload image');
                        }
                      } catch (e:any) {
                        console.error('Error uploading gallery image:', e);
                        toast.error(e.response?.data?.message || 'Failed to upload image');
                      } finally {
                        setUploadingGalleryImages(prev => ({ ...prev, [idx]: false }));
                      }
                    }} previewSize="lg" previewShape="rectangular" />
                    {uploadingGalleryImages[idx] && (
                      <p className="text-xs text-blue-600 mt-1">Uploading image...</p>
                    )}
                  </div>
                  <div className="flex gap-2"><Button size="sm" variant="outline" onClick={()=>setPageData(prev=>{ const a=[...prev.gallerySection.images]; a.splice(idx,1); return {...prev, gallerySection:{...prev.gallerySection, images:a}}; })} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSection==='impact' && (
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>Impact Section</CardTitle></CardHeader><CardContent className="space-y-4"><div><label className="block text-sm font-medium mb-1">Heading</label><Input value={pageData.impactSection.heading||''} onChange={(e)=>setPageData(prev=>({...prev, impactSection:{...prev.impactSection, heading:e.target.value}}))} /></div><div><label className="block text-sm font-medium mb-1">Intro</label><Textarea value={pageData.impactSection.intro||''} onChange={(e)=>setPageData(prev=>({...prev, impactSection:{...prev.impactSection, intro:e.target.value}}))} rows={3} /></div></CardContent></Card>
          <div className="flex justify-between items-center mb-2"><div><h3 className="text-lg font-semibold">Impact Cards</h3><p className="text-gray-600 mt-1">Drag and drop to reorder cards</p></div><Button onClick={()=>setPageData(prev=>({...prev, impactSection:{...prev.impactSection, cards:[...prev.impactSection.cards, { number:'', title:'', description:'', icon:'🌟' }]}}))} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Add Card</Button></div>
          <div className="space-y-3">
            {pageData.impactSection.cards.map((card, idx)=>(
              <Card key={(card as any)._id||idx} className={`p-4 ${dragIndex===idx?'opacity-50':''}`} draggable onDragStart={(e)=>onDragStart(e,idx)} onDragOver={onDragOver} onDragEnd={onDragEnd} onDrop={async (e)=>{ e.preventDefault(); if (dragIndex!==null && dragIndex!==idx){ const arr=swap(pageData.impactSection.cards, dragIndex, idx); setPageData(prev=>({...prev, impactSection:{...prev.impactSection, cards:arr}})); await reorder('impactCards', arr as any[]); setDragIndex(null);} }}>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div><label className="block text-sm font-medium mb-1">Number *</label><Input value={card.number} onChange={(e)=>setPageData(prev=>{ const a=[...prev.impactSection.cards]; a[idx]={...a[idx], number:e.target.value}; return {...prev, impactSection:{...prev.impactSection, cards:a}}; })} /></div>
                    <div><label className="block text-sm font-medium mb-1">Title *</label><Input value={card.title} onChange={(e)=>setPageData(prev=>{ const a=[...prev.impactSection.cards]; a[idx]={...a[idx], title:e.target.value}; return {...prev, impactSection:{...prev.impactSection, cards:a}}; })} /></div>
                    <div><label className="block text-sm font-medium mb-1">Icon</label><Input value={card.icon} onChange={(e)=>setPageData(prev=>{ const a=[...prev.impactSection.cards]; a[idx]={...a[idx], icon:e.target.value}; return {...prev, impactSection:{...prev.impactSection, cards:a}}; })} /></div>
                    <div><label className="block text-sm font-medium mb-1">Description *</label><Textarea value={card.description} onChange={(e)=>setPageData(prev=>{ const a=[...prev.impactSection.cards]; a[idx]={...a[idx], description:e.target.value}; return {...prev, impactSection:{...prev.impactSection, cards:a}}; })} rows={3} /></div>
                  </div>
                  <div className="flex gap-2 mt-3"><Button size="sm" variant="outline" onClick={()=>setPageData(prev=>{ const a=[...prev.impactSection.cards]; a.splice(idx,1); return {...prev, impactSection:{...prev.impactSection, cards:a}}; })} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSection==='second' && (
        <Card><CardHeader><CardTitle>Second Image Section</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Title</label><Input value={pageData.secondImageSection.title||''} onChange={(e)=>setPageData(prev=>({...prev, secondImageSection:{...prev.secondImageSection, title:e.target.value}}))} /></div>
          <div><label className="block text-sm font-medium mb-1">Description</label><Textarea value={pageData.secondImageSection.description||''} onChange={(e)=>setPageData(prev=>({...prev, secondImageSection:{...prev.secondImageSection, description:e.target.value}}))} rows={4} /></div>
          <div><label className="block text-sm font-medium mb-1">Image</label><p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p><ImageUpload value={secondImagePreview} onChange={(file,url)=>{ setSecondImageFile(file); setSecondImagePreview(url); }} previewSize="lg" previewShape="rectangular" />{secondImageFile && (<Button onClick={uploadSecond} disabled={uploadingSecond} className="mt-2 bg-blue-600 hover:bg-blue-700"><Upload className="w-4 h-4 mr-2" />{uploadingSecond?'Uploading...':'Upload Image'}</Button>)}</div>
        </CardContent></Card>
      )}
    </div>
  );
};

export default OutOfSchoolDropout;


