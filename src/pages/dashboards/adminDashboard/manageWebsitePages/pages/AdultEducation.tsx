import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Upload, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import ImageUpload from '@/components/ui/image-upload';
import { z } from 'zod';

// Zod Schemas
const featureSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, 'Title is required').max(200),
  description: z.string().min(10, 'Description is required').max(1000),
  display_order: z.number().optional(),
});

const focusAreaSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, 'Title is required').max(200),
  skills: z.array(z.string().min(3)).min(1, 'At least one skill'),
  outcome: z.string().min(5, 'Outcome is required').max(1000),
  display_order: z.number().optional(),
});

const pageSchema = z.object({
  introduction: z.object({
    title: z.string().min(5).max(200),
    subtitle: z.string().max(200).optional(),
    description: z.string().min(10).max(1000),
    heroImage: z.string().optional(),
    content: z.string().min(10),
  }),
  whyItMatters: z.object({
    title: z.string().min(5).max(200),
    image: z.string().optional(),
    content: z.string().min(10),
  }),
  learningModel: z.object({
    title: z.string().min(5).max(200),
    description: z.string().min(10),
    features: z.array(featureSchema).min(1, 'At least one feature'),
  }),
  focusAreas: z.object({
    title: z.string().min(5).max(200),
    areas: z.array(focusAreaSchema).min(1, 'At least one focus area'),
  }),
  whyNeiea: z.object({
    title: z.string().min(5).max(200),
    benefits: z.array(z.string().min(3)).min(1, 'At least one benefit'),
  }),
  movement: z.object({
    title: z.string().min(5).max(200),
    content: z.string().min(10),
    callToAction: z.string().min(10),
  }),
});

// Types
interface Feature { _id?: string; title: string; description: string; display_order?: number }
interface FocusArea { _id?: string; title: string; skills: string[]; outcome: string; display_order?: number }
interface AdultEducationPageData {
  introduction: { title: string; subtitle?: string; description: string; heroImage?: string; content: string };
  whyItMatters: { title: string; image?: string; content: string };
  learningModel: { title: string; description: string; features: Feature[] };
  focusAreas: { title: string; areas: FocusArea[] };
  whyNeiea: { title: string; benefits: string[] };
  movement: { title: string; content: string; callToAction: string };
}

const AdultEducation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [pageData, setPageData] = useState<AdultEducationPageData>({
    introduction: {
      title: 'Adult Literacy at NEIEA: Transforming Lives Through Learning',
      subtitle: "It's Never Too Late to Learn",
      description: 'At NEIEA, we believe learning has no age limit. Our Adult Literacy Programs are designed to help learners grow in education, work, and everyday life.',
      heroImage: '/assets/images/AdultEducation/2.png',
      content: 'At the <strong>New Equitable and Innovative Educational Association (NEIEA)</strong>, we believe learning has no age limit. For many marginalized adults, the opportunity to read, write, or build essential life skills was never given. Our <strong>Adult Literacy Programs</strong> are designed to change that—helping learners grow in education, work, and everyday life. Literacy for adults is not just about letters; it is about confidence, independence, and dignity.'
    },
    whyItMatters: {
      title: 'Why Adult Literacy Matters',
      image: '/assets/images/AdultEducation/1.png',
      content: "Illiteracy keeps adults trapped in cycles of poverty and exclusion. Without basic literacy, individuals often struggle to find employment, manage healthcare, or support their children's schooling. At NEIEA, we see adult literacy as a path to renewal—empowering individuals while uplifting entire families and communities."
    },
    learningModel: {
      title: 'Our Innovative Blended Learning Model',
      description: "NEIEA's <strong>blended learning approach</strong> makes education flexible, affordable, and accessible:",
      features: [
        { title: 'Digital Learning Made Simple', description: 'Learners use smartphones or digital hubs to access beginner-friendly modules.' },
        { title: 'Community Support', description: 'On-site mentors provide encouragement and hands-on guidance.' },
        { title: 'Culturally Relevant & Practical', description: 'Lessons connect directly with everyday needs—whether reading medicine labels, managing digital payments, or communicating in English.' }
      ]
    },
    focusAreas: {
      title: 'Focus Areas of Adult Literacy at NEIEA',
      areas: [
        {
          title: 'Adult English Literacy',
          skills: [
            'Learn to read and write simple English',
            'Speak and understand basic conversations',
            'Practice listening and responding in daily situations',
            'Build a foundation for advanced English learning'
          ],
          outcome: 'Adults gain confidence to communicate at home, work, and in the community.'
        },
        {
          title: 'Adult Digital Literacy',
          skills: [
            'Use Microsoft Word, Excel, PowerPoint',
            'Work with Google Docs, Sheets, Slides, Forms, and Classroom',
            'Create designs with Canva',
            'Explore AI tools like ChatGPT'
          ],
          outcome: 'Learners master practical digital skills for jobs, education, and daily life.'
        },
        {
          title: 'Adult Financial Literacy',
          skills: [
            'Basics of saving, budgeting, and banking',
            'Safe use of digital payments and UPI',
            'Manage personal and household finances',
            'Introduction to entrepreneurship'
          ],
          outcome: 'Adults achieve financial independence and plan for a secure future.'
        }
      ]
    },
    whyNeiea: {
      title: 'Why NEIEA?',
      benefits: [
        'Beginner-friendly, step-by-step learning',
        'Flexible online classes accessible from home',
        'Affordable and inclusive, especially for underserved communities',
        'Supportive environment with real-life applications'
      ]
    },
    movement: {
      title: 'A Movement of Renewal',
      content: 'For NEIEA, adult literacy is not a remedial effort—it is a <strong>movement of renewal and equity</strong>. Every adult who learns to read, write, or manage technology not only transforms their own life but also inspires their children and strengthens their community.',
      callToAction: 'When an adult learns, an entire community rises. Together—with the support of charities, trusts, and partners—we can ensure that <strong>no adult is left behind in the journey of learning</strong>.'
    },
  });
  const [loading, setLoading] = useState(true);

  // Image upload state
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState('');
  const [whyImageFile, setWhyImageFile] = useState<File | null>(null);
  const [whyImagePreview, setWhyImagePreview] = useState('');
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingWhy, setUploadingWhy] = useState(false);

  // Local forms
  const [newFeature, setNewFeature] = useState({ title: '', description: '' });
  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null);
  const [showFeatureForm, setShowFeatureForm] = useState(false);
  const [newFocusArea, setNewFocusArea] = useState({ title: '', skills: [''], outcome: '' });
  const [editingFocusAreaId, setEditingFocusAreaId] = useState<string | null>(null);
  const [showFocusAreaForm, setShowFocusAreaForm] = useState(false);
  const [newBenefit, setNewBenefit] = useState('');

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/adult-education-page');
      if (res.data.success && res.data.data) {
        const data = res.data.data as AdultEducationPageData;
        setPageData(data);
        setHeroImagePreview(data.introduction?.heroImage || '');
        setWhyImagePreview(data.whyItMatters?.image || '');
      }
    } catch (err: any) {
      if (err.response?.status !== 404) {
        toast.error(err.response?.data?.message || 'Failed to load page');
      }
    } finally {
      setLoading(false);
    }
  };

  const validateImage = (file: File) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) { toast.error('Image must be 2MB or less'); return false; }
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) { toast.error('Only JPEG/PNG/WebP/GIF allowed'); return false; }
    return true;
  };

  const uploadHeroImage = async () => {
    if (!heroImageFile) { toast.error('Select an image first'); return; }
    if (!validateImage(heroImageFile)) return;
    const fd = new FormData();
    fd.append('heroImage', heroImageFile);
    setUploadingHero(true);
    try {
      const res = await axiosInstance.post('/admin/adult-education-page/upload-hero-image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data.success && res.data.data?.image) {
        const newImageUrl = res.data.data.image;
        setPageData(prev => ({ ...prev, introduction: { ...prev.introduction, heroImage: newImageUrl } }));
        setHeroImagePreview(newImageUrl);
        setHeroImageFile(null); // Clear file after successful upload
        toast.success('Hero image uploaded successfully');
      } else {
        toast.error('Upload failed: Invalid response');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally { setUploadingHero(false); }
  };

  const uploadWhyImage = async () => {
    if (!whyImageFile) { toast.error('Select an image first'); return; }
    if (!validateImage(whyImageFile)) return;
    const fd = new FormData();
    fd.append('whyImage', whyImageFile);
    setUploadingWhy(true);
    try {
      const res = await axiosInstance.post('/admin/adult-education-page/upload-why-image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data.success && res.data.data?.image) {
        const newImageUrl = res.data.data.image;
        setPageData(prev => ({ ...prev, whyItMatters: { ...prev.whyItMatters, image: newImageUrl } }));
        setWhyImagePreview(newImageUrl);
        setWhyImageFile(null); // Clear file after successful upload
        toast.success('Section image uploaded successfully');
      } else {
        toast.error('Upload failed: Invalid response');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally { setUploadingWhy(false); }
  };

  const handleSaveAll = async () => {
    try {
      const dataToSave: AdultEducationPageData = {
        ...pageData,
        learningModel: {
          ...pageData.learningModel,
          features: pageData.learningModel.features.map((f, i) => ({ ...f, display_order: i }))
        },
        focusAreas: {
          ...pageData.focusAreas,
          areas: pageData.focusAreas.areas.map((a, i) => ({ ...a, display_order: i }))
        }
      };

      const parsed = pageSchema.safeParse(dataToSave);
      if (!parsed.success) {
        const e = parsed.error.errors[0];
        toast.error(`Validation: ${e.path.join(' → ')}: ${e.message}`);
        return;
      }

      let res;
      try { res = await axiosInstance.put('/admin/adult-education-page', dataToSave); }
      catch (e: any) {
        if (e.response?.status === 404) { res = await axiosInstance.post('/admin/adult-education-page', dataToSave); }
        else throw e;
      }
      if (res.data.success) { toast.success('Page saved'); await loadPage(); }
      else { toast.error('Failed to save'); }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save');
    }
  };

  // Drag-and-drop for Features
  const handleFeatureDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };
  const handleFeatureDragEnd = (e: React.DragEvent) => { (e.currentTarget as HTMLElement).style.opacity = '1'; };
  const handleFeatureDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const handleFeatureDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex) return;
    const newArr = [...pageData.learningModel.features];
    const dragged = newArr[dragIndex];
    newArr.splice(dragIndex, 1);
    newArr.splice(dropIndex, 0, dragged);
    setPageData(prev => ({ ...prev, learningModel: { ...prev.learningModel, features: newArr } }));
    try {
      const payload = newArr.map((it, idx) => ({ id: it._id!, display_order: idx }));
      await axiosInstance.post('/admin/adult-education-page/reorder', { section: 'features', items: payload });
      toast.success('Features order updated');
    } catch { toast.error('Failed to update order'); await loadPage(); }
  };

  // Drag-and-drop for Focus Areas
  const handleAreaDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };
  const handleAreaDragEnd = (e: React.DragEvent) => { (e.currentTarget as HTMLElement).style.opacity = '1'; };
  const handleAreaDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const handleAreaDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex) return;
    const newArr = [...pageData.focusAreas.areas];
    const dragged = newArr[dragIndex];
    newArr.splice(dragIndex, 1);
    newArr.splice(dropIndex, 0, dragged);
    setPageData(prev => ({ ...prev, focusAreas: { ...prev.focusAreas, areas: newArr } }));
    try {
      const payload = newArr.map((it, idx) => ({ id: it._id!, display_order: idx }));
      await axiosInstance.post('/admin/adult-education-page/reorder', { section: 'areas', items: payload });
      toast.success('Focus areas order updated');
    } catch { toast.error('Failed to update order'); await loadPage(); }
  };

  // CRUD helpers
  const saveFeature = () => {
    // Trim whitespace from inputs
    const trimmedFeature = {
      title: newFeature.title.trim(),
      description: newFeature.description.trim()
    };
    
    const parsed = featureSchema.safeParse(trimmedFeature);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      let errorMessage = firstError.message;
      // Provide more specific error messages
      if (firstError.path.includes('title')) {
        if (trimmedFeature.title.length < 3) {
          errorMessage = 'Title must be at least 3 characters';
        }
      } else if (firstError.path.includes('description')) {
        if (trimmedFeature.description.length < 10) {
          errorMessage = 'Description must be at least 10 characters';
        } else if (!trimmedFeature.description) {
          errorMessage = 'Description is required';
        }
      }
      toast.error(errorMessage);
      return;
    }
    
    if (editingFeatureId) {
      setPageData(prev => ({ ...prev, learningModel: { ...prev.learningModel, features: prev.learningModel.features.map(f => f._id === editingFeatureId ? { ...f, ...trimmedFeature } : f) } }));
      toast.success('Feature updated locally. Save All to persist.');
    } else {
      setPageData(prev => ({ ...prev, learningModel: { ...prev.learningModel, features: [...prev.learningModel.features, { ...trimmedFeature }] } }));
      toast.success('Feature added locally. Save All to persist.');
    }
    setEditingFeatureId(null);
    setNewFeature({ title: '', description: '' });
    setShowFeatureForm(false);
  };

  const deleteFeature = (id?: string) => {
    if (!confirm('Delete this feature?')) return;
    setPageData(prev => ({ ...prev, learningModel: { ...prev.learningModel, features: prev.learningModel.features.filter(f => f._id !== id) } }));
  };

  const saveArea = () => {
    const parsed = focusAreaSchema.safeParse(newFocusArea);
    if (!parsed.success) { toast.error(parsed.error.errors[0].message); return; }
    if (editingFocusAreaId) {
      setPageData(prev => ({ ...prev, focusAreas: { ...prev.focusAreas, areas: prev.focusAreas.areas.map(a => a._id === editingFocusAreaId ? { ...a, ...newFocusArea } : a) } }));
      toast.success('Area updated locally. Save All to persist.');
    } else {
      setPageData(prev => ({ ...prev, focusAreas: { ...prev.focusAreas, areas: [...prev.focusAreas.areas, { ...newFocusArea }] } }));
      toast.success('Area added locally. Save All to persist.');
    }
    setEditingFocusAreaId(null);
    setNewFocusArea({ title: '', skills: [''], outcome: '' });
    setShowFocusAreaForm(false);
  };

  const deleteArea = (id?: string) => {
    if (!confirm('Delete this area?')) return;
    setPageData(prev => ({ ...prev, focusAreas: { ...prev.focusAreas, areas: prev.focusAreas.areas.filter(a => a._id !== id) } }));
  };

  const addBenefit = () => {
    const v = newBenefit.trim(); if (!v) { toast.error('Benefit text required'); return; }
    setPageData(prev => ({ ...prev, whyNeiea: { ...prev.whyNeiea, benefits: [...prev.whyNeiea.benefits, v] } }));
    setNewBenefit('');
  };
  const deleteBenefit = (idx: number) => {
    setPageData(prev => ({ ...prev, whyNeiea: { ...prev.whyNeiea, benefits: prev.whyNeiea.benefits.filter((_, i) => i !== idx) } }));
  };

  if (loading) return <div className="p-6"><div className="flex items-center justify-center h-64"><div className="text-gray-700 text-lg">Loading Adult Education Page Management...</div></div></div>;

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Manage Adult Education Page
          </h1>
          <p className="text-gray-600">Update all content for the adult education page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[
          { id: 'hero', label: 'Introduction' },
          { id: 'why', label: 'Why It Matters' },
          { id: 'model', label: 'Learning Model' },
          { id: 'focus', label: 'Focus Areas' },
          { id: 'whyneiea', label: 'Why NEIEA' },
          { id: 'movement', label: 'Movement' }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {activeSection === 'hero' && (
        <Card>
          <CardHeader><CardTitle>Introduction</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <Input value={pageData.introduction.title} onChange={(e) => setPageData(prev => ({ ...prev, introduction: { ...prev.introduction, title: e.target.value } }))} />
              </div>
              <div>
                <label className="block text-sm mb-1">Subtitle</label>
                <Input value={pageData.introduction.subtitle || ''} onChange={(e) => setPageData(prev => ({ ...prev, introduction: { ...prev.introduction, subtitle: e.target.value } }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Short Description</label>
              <Textarea rows={3} value={pageData.introduction.description} onChange={(e) => setPageData(prev => ({ ...prev, introduction: { ...prev.introduction, description: e.target.value } }))} />
            </div>
            <div>
              <label className="block text-sm mb-1">Content (HTML allowed)</label>
              <Textarea rows={6} value={pageData.introduction.content} onChange={(e) => setPageData(prev => ({ ...prev, introduction: { ...prev.introduction, content: e.target.value } }))} />
            </div>
            <div className="grid gap-4 md:grid-cols-2 items-end">
              <div>
                <label className="block text-sm mb-2">Hero Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
                <ImageUpload 
                  value={heroImagePreview} 
                  onChange={(file, preview) => {
                    setHeroImageFile(file);
                    if (preview) setHeroImagePreview(preview);
                  }} 
                  previewSize="hero"
                  previewShape="rectangular"
                />
              </div>
              <div>
                <Button disabled={uploadingHero || !heroImageFile} onClick={uploadHeroImage}><Upload className="w-4 h-4 mr-2"/>Upload</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'why' && (
        <Card>
          <CardHeader><CardTitle>Why Adult Literacy Matters</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <Input value={pageData.whyItMatters.title} onChange={(e) => setPageData(prev => ({ ...prev, whyItMatters: { ...prev.whyItMatters, title: e.target.value } }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Content</label>
              <Textarea rows={5} value={pageData.whyItMatters.content} onChange={(e) => setPageData(prev => ({ ...prev, whyItMatters: { ...prev.whyItMatters, content: e.target.value } }))} />
            </div>
            <div className="grid gap-4 md:grid-cols-2 items-end">
              <div>
                <label className="block text-sm mb-2">Section Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                <ImageUpload 
                  value={whyImagePreview} 
                  onChange={(file, preview) => {
                    setWhyImageFile(file);
                    if (preview) setWhyImagePreview(preview);
                  }} 
                  previewSize="hero"
                  previewShape="rectangular"
                />
              </div>
              <div>
                <Button disabled={uploadingWhy || !whyImageFile} onClick={uploadWhyImage}><Upload className="w-4 h-4 mr-2"/>Upload</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'model' && (
        <Card>
          <CardHeader><CardTitle>Learning Model</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <Input value={pageData.learningModel.title} onChange={(e) => setPageData(prev => ({ ...prev, learningModel: { ...prev.learningModel, title: e.target.value } }))} />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <Textarea rows={3} value={pageData.learningModel.description} onChange={(e) => setPageData(prev => ({ ...prev, learningModel: { ...prev.learningModel, description: e.target.value } }))} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <h4 className="font-semibold">Features</h4>
              <Button 
                variant="outline" 
                onClick={() => { 
                  setEditingFeatureId(null); 
                  setNewFeature({ title: '', description: '' });
                  setShowFeatureForm(true);
                }}
                disabled={showFeatureForm && editingFeatureId === null}
              >
                <Plus className="w-4 h-4 mr-2"/>
                Add Feature
              </Button>
            </div>

            {/* Add/Edit Feature */}
            {(showFeatureForm || editingFeatureId) && (
              <div className="grid gap-3 md:grid-cols-2 border-t pt-4 mt-4">
                <Input placeholder="Feature title" value={newFeature.title} onChange={(e) => setNewFeature(prev => ({ ...prev, title: e.target.value }))} />
                <Textarea rows={3} placeholder="Feature description (min 10 characters)" value={newFeature.description} onChange={(e) => setNewFeature(prev => ({ ...prev, description: e.target.value }))} />
                <div className="flex gap-2 md:col-span-2">
                  <Button onClick={saveFeature}><Save className="w-4 h-4 mr-2"/>Save</Button>
                  <Button variant="ghost" onClick={() => { 
                    setEditingFeatureId(null); 
                    setNewFeature({ title: '', description: '' });
                    setShowFeatureForm(false);
                  }}><X className="w-4 h-4 mr-2"/>Cancel</Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {pageData.learningModel.features.map((f, idx) => (
                <div key={f._id || idx}
                  className="flex items-start gap-3 p-3 border rounded-md bg-white"
                  draggable
                  onDragStart={(e) => handleFeatureDragStart(e, idx)}
                  onDragOver={handleFeatureDragOver}
                  onDragEnd={handleFeatureDragEnd}
                  onDrop={(e) => handleFeatureDrop(e, idx)}
                >
                  <GripVertical className="w-4 h-4 mt-1 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium">{f.title}</div>
                    <div className="text-sm text-gray-600">{f.description}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { 
                      setEditingFeatureId(f._id || null); 
                      setNewFeature({ title: f.title, description: f.description });
                      setShowFeatureForm(true);
                    }}><Edit className="w-4 h-4"/></Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteFeature(f._id)}><Trash2 className="w-4 h-4"/></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'focus' && (
        <Card>
          <CardHeader><CardTitle>Focus Areas</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <Input value={pageData.focusAreas.title} onChange={(e) => setPageData(prev => ({ ...prev, focusAreas: { ...prev.focusAreas, title: e.target.value } }))} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <h4 className="font-semibold">Areas</h4>
              <Button 
                variant="outline" 
                onClick={() => { 
                  setEditingFocusAreaId(null); 
                  setNewFocusArea({ title: '', skills: [''], outcome: '' });
                  setShowFocusAreaForm(true);
                }}
                disabled={showFocusAreaForm && editingFocusAreaId === null}
              >
                <Plus className="w-4 h-4 mr-2"/>
                Add Area
              </Button>
            </div>

            {/* Add/Edit Area */}
            {(showFocusAreaForm || editingFocusAreaId) && (
              <div className="space-y-2 border-t pt-4 mt-4">
                <Input placeholder="Area title" value={newFocusArea.title} onChange={(e) => setNewFocusArea(prev => ({ ...prev, title: e.target.value }))} />
                <div className="space-y-2">
                  {(newFocusArea.skills || []).map((s, i) => (
                    <div className="flex gap-2" key={i}>
                      <Input placeholder={`Skill ${i + 1}`} value={s} onChange={(e) => setNewFocusArea(prev => ({ ...prev, skills: prev.skills.map((v, idx) => idx === i ? e.target.value : v) }))} />
                      <Button variant="outline" onClick={() => setNewFocusArea(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }))}><X className="w-4 h-4"/></Button>
                    </div>
                  ))}
                  <Button variant="secondary" onClick={() => setNewFocusArea(prev => ({ ...prev, skills: [...prev.skills, ''] }))}><Plus className="w-4 h-4 mr-1"/>Add Skill</Button>
                </div>
                <Textarea placeholder="Outcome" rows={3} value={newFocusArea.outcome} onChange={(e) => setNewFocusArea(prev => ({ ...prev, outcome: e.target.value }))} />
                <div className="flex gap-2">
                  <Button onClick={saveArea}><Save className="w-4 h-4 mr-2"/>Save</Button>
                  <Button variant="ghost" onClick={() => { 
                    setEditingFocusAreaId(null); 
                    setNewFocusArea({ title: '', skills: [''], outcome: '' });
                    setShowFocusAreaForm(false);
                  }}><X className="w-4 h-4 mr-2"/>Cancel</Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {pageData.focusAreas.areas.map((a, idx) => (
                <div key={a._id || idx}
                  className="flex items-start gap-3 p-3 border rounded-md bg-white"
                  draggable
                  onDragStart={(e) => handleAreaDragStart(e, idx)}
                  onDragOver={handleAreaDragOver}
                  onDragEnd={handleAreaDragEnd}
                  onDrop={(e) => handleAreaDrop(e, idx)}
                >
                  <GripVertical className="w-4 h-4 mt-1 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium">{a.title}</div>
                    <ul className="text-sm text-gray-600 list-disc ml-4">
                      {a.skills.map((s, i) => (<li key={i}>{s}</li>))}
                    </ul>
                    <div className="text-sm text-gray-700 mt-1"><strong>Outcome:</strong> {a.outcome}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { 
                      setEditingFocusAreaId(a._id || null); 
                      setNewFocusArea({ title: a.title, skills: [...a.skills], outcome: a.outcome });
                      setShowFocusAreaForm(true);
                    }}><Edit className="w-4 h-4"/></Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteArea(a._id)}><Trash2 className="w-4 h-4"/></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'whyneiea' && (
        <Card>
          <CardHeader><CardTitle>Why NEIEA</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <Input value={pageData.whyNeiea.title} onChange={(e) => setPageData(prev => ({ ...prev, whyNeiea: { ...prev.whyNeiea, title: e.target.value } }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Benefits</label>
              <div className="flex gap-2">
                <Input placeholder="Benefit" value={newBenefit} onChange={(e) => setNewBenefit(e.target.value)} />
                <Button variant="outline" onClick={addBenefit}><Plus className="w-4 h-4 mr-1"/>Add</Button>
              </div>
              <div className="mt-3 space-y-2">
                {pageData.whyNeiea.benefits.map((b, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: b }} />
                    <Button size="sm" variant="destructive" onClick={() => deleteBenefit(i)}><Trash2 className="w-4 h-4"/></Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'movement' && (
        <Card>
          <CardHeader><CardTitle>Movement of Renewal</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <Input value={pageData.movement.title} onChange={(e) => setPageData(prev => ({ ...prev, movement: { ...prev.movement, title: e.target.value } }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Content</label>
              <Textarea rows={5} value={pageData.movement.content} onChange={(e) => setPageData(prev => ({ ...prev, movement: { ...prev.movement, content: e.target.value } }))} />
            </div>
            <div>
              <label className="block text-sm mb-1">Call to Action</label>
              <Textarea rows={4} value={pageData.movement.callToAction} onChange={(e) => setPageData(prev => ({ ...prev, movement: { ...prev.movement, callToAction: e.target.value } }))} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdultEducation;

