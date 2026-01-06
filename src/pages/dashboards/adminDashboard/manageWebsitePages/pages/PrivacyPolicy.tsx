import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/image-upload';
import { Save, Upload, GripVertical, Edit, Trash2, X, Shield } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';
import { z } from 'zod';

const sectionSchema = z.object({
  _id: z.string().optional(),
  heading: z.string().min(3).max(200),
  subHeading: z.string().max(200).optional(),
  description: z.string().min(10).max(2000).optional(),
  display_order: z.number().optional()
});

const pageSchema = z.object({
  heroSection: z.object({
    title: z.string().min(3).max(200).optional(),
    subtitle: z.string().max(200).optional(),
    description: z.string().max(500).optional(),
    heroImage: z.string().optional()
  }),
  sections: z.array(sectionSchema).min(1)
});

interface SectionItem { _id?: string; heading: string; subHeading?: string; description?: string; display_order?: number }
interface PageData { heroSection?: { title?: string; subtitle?: string; description?: string; heroImage?: string }; sections: SectionItem[] }

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState<'hero' | 'sections'>('hero');
  const [pageData, setPageData] = useState<PageData>({
    heroSection: {
      title: 'Privacy Policy',
      subtitle: 'Transparency about how we handle your information',
      description: 'Learn what data we collect, how we use it, and your choices.'
    },
    sections: [
      { heading: 'Introduction', subHeading: 'Your privacy matters to us', description: 'This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using our website, you agree to the practices described here.' }
    ]
  });

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState('');
  const [uploadingHero, setUploadingHero] = useState(false);

  const [newItem, setNewItem] = useState<SectionItem>({ heading: '', subHeading: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => { loadPage(); }, []);

  const loadPage = async () => {
    try {
      const res = await axiosInstance.get('/admin/privacy-policy-page');
      if (res.data?.success && res.data.data) {
        const data = res.data.data as PageData;
        setPageData(data);
        setHeroPreview(data.heroSection?.heroImage || '');
      }
    } catch (e: any) {
      if (e.response?.status !== 404) toast.error(e.response?.data?.message || 'Failed to load page');
    }
  };

  const validateImage = (file: File) => {
    if (file.size > 2*1024*1024) { toast.error('Image must be <= 2MB'); return false; }
    const allowed = ['image/jpeg','image/png','image/webp','image/gif'];
    if (!allowed.includes(file.type)) { toast.error('Only JPEG/PNG/WebP/GIF allowed'); return false; }
    return true;
  };

  const uploadHero = async () => {
    if (!heroImageFile) return toast.error('Select an image');
    if (!validateImage(heroImageFile)) return;
    const fd = new FormData(); fd.append('heroImage', heroImageFile);
    setUploadingHero(true);
    try {
      const res = await axiosInstance.post('/admin/privacy-policy-page/upload-hero-image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setHeroPreview(res.data.data.image);
      setPageData(prev => ({ ...prev, heroSection: { ...(prev.heroSection||{}), heroImage: res.data.data.image } }));
      toast.success('Hero image updated');
    } catch (e: any) { toast.error(e.response?.data?.message || 'Upload failed'); } finally { setUploadingHero(false); }
  };

  const handleSaveAll = async () => {
    try {
      const dataToSave: PageData = {
        ...pageData,
        sections: pageData.sections.map((s, i) => ({ ...s, display_order: i }))
      };
      const parsed = pageSchema.safeParse(dataToSave);
      if (!parsed.success) { const e = parsed.error.errors[0]; toast.error(`Validation: ${e.path.join(' → ')}: ${e.message}`); return; }
      let res;
      try { res = await axiosInstance.put('/admin/privacy-policy-page', dataToSave); }
      catch (err: any) { if (err.response?.status === 404) res = await axiosInstance.post('/admin/privacy-policy-page', dataToSave); else throw err; }
      if (res.data.success) { toast.success('Page saved'); await loadPage(); } else toast.error('Failed to save');
    } catch (e: any) { toast.error(e.response?.data?.message || 'Failed to save'); }
  };

  const dragStart = (e: React.DragEvent, index: number) => { e.dataTransfer.setData('text/plain', index.toString()); (e.currentTarget as HTMLElement).style.opacity='0.5'; };
  const dragEnd = (e: React.DragEvent) => { (e.currentTarget as HTMLElement).style.opacity='1'; };
  const dragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const onDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault(); const dragIndex = parseInt(e.dataTransfer.getData('text/plain')); if (dragIndex===dropIndex) return;
    const arr = [...pageData.sections]; const item = arr[dragIndex]; arr.splice(dragIndex,1); arr.splice(dropIndex,0,item);
    setPageData(prev => ({ ...prev, sections: arr }));
    try { const payload = arr.map((it, idx)=>({ id: it._id!, display_order: idx })); await axiosInstance.post('/admin/privacy-policy-page/reorder', { items: payload }); toast.success('Order updated'); } catch { toast.error('Failed to update order'); await loadPage(); }
  };

  const saveItem = () => {
    const parsed = sectionSchema.safeParse(newItem); if (!parsed.success) { toast.error(parsed.error.errors[0].message); return; }
    if (editingId) {
      setPageData(prev => ({ ...prev, sections: prev.sections.map(s => s._id===editingId ? { ...s, ...newItem } : s) }));
      toast.success('Updated locally. Save All to persist.');
    } else {
      setPageData(prev => ({ ...prev, sections: [...prev.sections, { ...newItem }] }));
      toast.success('Added locally. Save All to persist.');
    }
    setEditingId(null); setNewItem({ heading:'', subHeading:'', description:'' });
  };

  const deleteItem = (id?: string) => {
    if (!confirm('Delete this section?')) return;
    setPageData(prev => ({ ...prev, sections: prev.sections.filter(s => s._id !== id) }));
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="w-8 h-8" />
            Manage Privacy Policy Page
          </h1>
          <p className="text-gray-600">Update all content for the privacy policy page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[
          { key: 'hero', label: 'Hero' },
          { key: 'sections', label: 'Sections' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key as any)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeSection === key ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeSection==='hero' && (
        <Card>
          <CardHeader><CardTitle>Hero</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Title" value={pageData.heroSection?.title || ''} onChange={(e)=>setPageData(prev=>({ ...prev, heroSection:{ ...(prev.heroSection||{}), title:e.target.value } }))} />
              <Input placeholder="Subtitle" value={pageData.heroSection?.subtitle || ''} onChange={(e)=>setPageData(prev=>({ ...prev, heroSection:{ ...(prev.heroSection||{}), subtitle:e.target.value } }))} />
            </div>
            <Textarea rows={3} placeholder="Short description" value={pageData.heroSection?.description || ''} onChange={(e)=>setPageData(prev=>({ ...prev, heroSection:{ ...(prev.heroSection||{}), description:e.target.value } }))} />
            <div className="grid gap-4 md:grid-cols-2 items-end">
              <div>
                <label className="block text-sm mb-2">Hero Image</label>
                <ImageUpload value={heroPreview} onChange={(file, preview)=>{ setHeroImageFile(file); setHeroPreview(preview); }} />
              </div>
              <div>
                <Button disabled={!heroImageFile||uploadingHero} onClick={uploadHero}><Upload className="w-4 h-4 mr-2"/>Upload</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection==='sections' && (
        <Card>
          <CardHeader><CardTitle>Policy Sections</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Heading" value={newItem.heading || ''} onChange={(e)=>setNewItem(prev=>({ ...prev, heading:e.target.value }))} />
              <Input placeholder="Sub Heading" value={newItem.subHeading || ''} onChange={(e)=>setNewItem(prev=>({ ...prev, subHeading:e.target.value }))} />
              <Textarea rows={4} placeholder="Description" value={newItem.description || ''} onChange={(e)=>setNewItem(prev=>({ ...prev, description:e.target.value }))} />
              <div className="flex gap-2">
                <Button onClick={saveItem}><Save className="w-4 h-4 mr-2"/>Save</Button>
                <Button variant="ghost" onClick={()=>{ setEditingId(null); setNewItem({ heading:'', subHeading:'', description:'' }); }}><X className="w-4 h-4 mr-2"/>Cancel</Button>
              </div>
            </div>

            <div className="space-y-2">
              {pageData.sections.map((s, idx)=>(
                <div key={s._id||idx} className="flex items-start gap-3 p-3 border rounded-md bg-white" draggable onDragStart={(e)=>dragStart(e, idx)} onDragOver={dragOver} onDragEnd={dragEnd} onDrop={(e)=>onDrop(e, idx)}>
                  <GripVertical className="w-4 h-4 mt-1 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium">{s.heading}</div>
                    {s.subHeading && (<div className="text-sm text-gray-600">{s.subHeading}</div>)}
                    {s.description && (<div className="text-sm text-gray-700 mt-1">{s.description}</div>)}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={()=>{ setEditingId(s._id||null); setNewItem({ heading:s.heading, subHeading:s.subHeading, description:s.description }); }}><Edit className="w-4 h-4"/></Button>
                    <Button size="sm" variant="destructive" onClick={()=>deleteItem(s._id)}><Trash2 className="w-4 h-4"/></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PrivacyPolicy;


