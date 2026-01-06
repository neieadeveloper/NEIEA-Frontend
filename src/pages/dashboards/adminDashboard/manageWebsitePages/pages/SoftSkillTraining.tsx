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

// Validation schemas
const emojiMax = 10;
const listItemSchema = z.object({
  _id: z.string().optional(),
  icon: z.string().min(1, 'Icon is required').max(emojiMax, 'Use an emoji or short icon'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  display_order: z.number().optional()
});

const pageSchema = z.object({
  heroSection: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200),
    subtitle: z.string().max(200).optional(),
    description: z.string().max(500).optional(),
    heroImage: z.string().optional()
  }),
  introduction: z.object({
    heading: z.string().min(5).max(200),
    description: z.string().min(20).max(2000)
  }),
  keyBenefitsSection: z.object({
    heading: z.string().min(3).max(200),
    description: z.string().max(500).optional(),
    benefits: z.array(listItemSchema).min(1, 'Add at least one benefit')
  }),
  programHighlightsSection: z.object({
    heading: z.string().min(3).max(200),
    description: z.string().max(500).optional(),
    highlights: z.array(listItemSchema).min(1, 'Add at least one highlight')
  })
});

interface ListItem { _id?: string; icon: string; title: string; description: string; display_order?: number; }
interface PageData {
  heroSection: { title: string; subtitle?: string; description?: string; heroImage?: string };
  introduction: { heading: string; description: string };
  keyBenefitsSection: { heading: string; description?: string; benefits: ListItem[] };
  programHighlightsSection: { heading: string; description?: string; highlights: ListItem[] };
}

const SoftSkillTraining = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const getDemoPageData = (): PageData => ({
    heroSection: {
      title: 'Soft Skill Training Program',
      subtitle: 'Empowering Through Communication Excellence',
      description: 'Affordable and flexible training designed for students, teachers, job seekers, and marginalized communities',
      heroImage: ''
    },
    introduction: {
      heading: 'Transform Your Communication Skills',
      description: 'NEIEA offers an affordable and flexible Soft Skills Training Program designed for students, teachers, job seekers, and marginalized communities. The program enhances English communication, workplace readiness, and confidence for academic, professional, and personal growth.'
    },
    keyBenefitsSection: {
      heading: 'What You\'ll Gain',
      description: 'Comprehensive skill development for personal and professional growth',
      benefits: [
        { icon: '🗣️', title: 'Improve Spoken English Fluency', description: 'Through practice-based sessions' },
        { icon: '✍️', title: 'Gain Professional Writing Skills', description: 'For reports, emails, and resumes' },
        { icon: '💼', title: 'Prepare for Interviews', description: 'And strengthen workplace readiness' },
        { icon: '🎤', title: 'Master Presentation Skills', description: 'And public speaking techniques' },
        { icon: '🤝', title: 'Build Teamwork Skills', description: 'And collaboration skills for career success' }
      ]
    },
    programHighlightsSection: {
      heading: 'Why Choose Our Program',
      description: 'Innovative learning approach designed for maximum impact',
      highlights: [
        { icon: '🎭', title: 'Interactive Online Sessions', description: 'With role-plays and activities' },
        { icon: '⏰', title: 'Flexible Learning', description: 'Anytime, anywhere' },
        { icon: '💰', title: 'Low-cost & Inclusive', description: 'Ensuring wider access' },
        { icon: '🌍', title: 'Practical Applications', description: 'Real-world applications with lasting impact' }
      ]
    }
  });

  const [pageData, setPageData] = useState<PageData>(getDemoPageData());

  // Local form states
  const [editingBenefit, setEditingBenefit] = useState<string | null>(null);
  const [isAddingBenefit, setIsAddingBenefit] = useState(false);
  const [benefitForm, setBenefitForm] = useState({ icon: '', title: '', description: '' });

  const [editingHighlight, setEditingHighlight] = useState<string | null>(null);
  const [isAddingHighlight, setIsAddingHighlight] = useState(false);
  const [highlightForm, setHighlightForm] = useState({ icon: '', title: '', description: '' });

  // Images
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/soft-skill-training-page');
      if (res.data.success && res.data.data) {
        const data = res.data.data as PageData;
        setPageData(data);
        setHeroImagePreview(data.heroSection?.heroImage || '');
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        // Prefill demo data on first-time setup
        const demo = getDemoPageData();
        setPageData(demo);
        setHeroImagePreview(demo.heroSection.heroImage || '');
        toast.info('Prefilled demo content. Click "Save All Changes" to create the page.');
      } else {
        toast.error(err.response?.data?.message || 'Failed to load page');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      const dataToSave: PageData = {
        ...pageData,
        keyBenefitsSection: {
          ...pageData.keyBenefitsSection,
          benefits: pageData.keyBenefitsSection.benefits.map((b, i) => ({ ...b, display_order: i }))
        },
        programHighlightsSection: {
          ...pageData.programHighlightsSection,
          highlights: pageData.programHighlightsSection.highlights.map((h, i) => ({ ...h, display_order: i }))
        }
      };

      const validation = pageSchema.safeParse(dataToSave);
      if (!validation.success) {
        const e = validation.error.errors[0];
        toast.error(`Validation Error: ${e.path.join(' → ')} - ${e.message}`);
        return;
      }

      let response;
      try {
        response = await axiosInstance.put('/admin/soft-skill-training-page', dataToSave);
      } catch (updateErr: any) {
        if (updateErr.response?.status === 404) {
          response = await axiosInstance.post('/admin/soft-skill-training-page', dataToSave);
        } else {
          throw updateErr;
        }
      }
      if (response.data.success) {
        toast.success('Page saved successfully');
        loadPage();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save changes');
    }
  };

  // Upload hero image
  const handleHeroImageUpload = async () => {
    if (!heroImageFile) return toast.error('Please select an image file');
    if (heroImageFile.size > 2000000) return toast.error('Image size must be less than 2MB');
    const allowed = ['image/jpeg','image/jpg','image/png','image/webp','image/gif'];
    if (!allowed.includes(heroImageFile.type)) return toast.error('Invalid file type');
    try {
      setUploadingHeroImage(true);
      const formData = new FormData();
      formData.append('heroImage', heroImageFile);
      const res = await axiosInstance.post('/admin/soft-skill-training-page/upload-hero-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data.success) {
        setPageData(prev => ({ ...prev, heroSection: { ...prev.heroSection, heroImage: res.data.data.image } }));
        setHeroImagePreview(res.data.data.image);
        setHeroImageFile(null);
        toast.success('Hero image uploaded');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingHeroImage(false);
    }
  };

  // Benefit handlers
  const handleAddBenefit = () => { setIsAddingBenefit(true); setBenefitForm({ icon: '', title: '', description: '' }); };
  const handleEditBenefit = (item: ListItem) => { setEditingBenefit(item._id || null); setBenefitForm({ icon: item.icon, title: item.title, description: item.description }); };
  const handleSaveBenefit = () => {
    const v = listItemSchema.safeParse(benefitForm);
    if (!v.success) return toast.error(v.error.errors[0].message);
    if (editingBenefit) {
      setPageData(prev => ({
        ...prev,
        keyBenefitsSection: { ...prev.keyBenefitsSection, benefits: prev.keyBenefitsSection.benefits.map(b => b._id === editingBenefit ? { ...b, ...benefitForm } : b) }
      }));
    } else {
      setPageData(prev => ({ ...prev, keyBenefitsSection: { ...prev.keyBenefitsSection, benefits: [...prev.keyBenefitsSection.benefits, { ...benefitForm }] } }));
      setIsAddingBenefit(false);
    }
    setEditingBenefit(null); setBenefitForm({ icon: '', title: '', description: '' });
    toast.success('Saved locally. Click "Save All Changes" to persist.');
  };
  const handleCancelBenefit = () => { setEditingBenefit(null); setIsAddingBenefit(false); setBenefitForm({ icon: '', title: '', description: '' }); };
  const handleDeleteBenefit = (id?: string) => {
    if (!id || !window.confirm('Delete this benefit?')) return;
    setPageData(prev => ({ ...prev, keyBenefitsSection: { ...prev.keyBenefitsSection, benefits: prev.keyBenefitsSection.benefits.filter(b => b._id !== id) } }));
  };

  // Highlight handlers
  const handleAddHighlight = () => { setIsAddingHighlight(true); setHighlightForm({ icon: '', title: '', description: '' }); };
  const handleEditHighlight = (item: ListItem) => { setEditingHighlight(item._id || null); setHighlightForm({ icon: item.icon, title: item.title, description: item.description }); };
  const handleSaveHighlight = () => {
    const v = listItemSchema.safeParse(highlightForm);
    if (!v.success) return toast.error(v.error.errors[0].message);
    if (editingHighlight) {
      setPageData(prev => ({ ...prev, programHighlightsSection: { ...prev.programHighlightsSection, highlights: prev.programHighlightsSection.highlights.map(h => h._id === editingHighlight ? { ...h, ...highlightForm } : h) } }));
    } else {
      setPageData(prev => ({ ...prev, programHighlightsSection: { ...prev.programHighlightsSection, highlights: [...prev.programHighlightsSection.highlights, { ...highlightForm }] } }));
      setIsAddingHighlight(false);
    }
    setEditingHighlight(null); setHighlightForm({ icon: '', title: '', description: '' });
    toast.success('Saved locally. Click "Save All Changes" to persist.');
  };
  const handleCancelHighlight = () => { setEditingHighlight(null); setIsAddingHighlight(false); setHighlightForm({ icon: '', title: '', description: '' }); };
  const handleDeleteHighlight = (id?: string) => {
    if (!id || !window.confirm('Delete this highlight?')) return;
    setPageData(prev => ({ ...prev, programHighlightsSection: { ...prev.programHighlightsSection, highlights: prev.programHighlightsSection.highlights.filter(h => h._id !== id) } }));
  };

  // DnD
  const handleDragStart = (e: React.DragEvent, index: number) => { e.dataTransfer.setData('text/plain', index.toString()); (e.currentTarget as HTMLElement).style.opacity = '0.5'; };
  const handleDragEnd = (e: React.DragEvent) => { (e.currentTarget as HTMLElement).style.opacity = '1'; };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const reorderAndSave = async (type: 'benefits' | 'highlights', list: ListItem[]) => {
    try {
      const payload = list.map((item, index) => ({ id: item._id!, display_order: index + 1 }));
      await axiosInstance.post('/admin/soft-skill-training-page/reorder', { section: type, items: payload });
      toast.success('Order updated');
    } catch {
      toast.error('Failed to update order');
      loadPage();
    }
  };

  const handleBenefitDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault(); const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex) return;
    const arr = [...pageData.keyBenefitsSection.benefits];
    const item = arr[dragIndex]; arr.splice(dragIndex, 1); arr.splice(dropIndex, 0, item);
    setPageData(prev => ({ ...prev, keyBenefitsSection: { ...prev.keyBenefitsSection, benefits: arr } }));
    reorderAndSave('benefits', arr);
  };

  const handleHighlightDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault(); const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex) return;
    const arr = [...pageData.programHighlightsSection.highlights];
    const item = arr[dragIndex]; arr.splice(dragIndex, 1); arr.splice(dropIndex, 0, item);
    setPageData(prev => ({ ...prev, programHighlightsSection: { ...prev.programHighlightsSection, highlights: arr } }));
    reorderAndSave('highlights', arr);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-700 text-lg">Loading Soft Skill Training Page Management...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <GraduationCap className="w-8 h-8" />
            Manage Soft Skill Training Page
          </h1>
          <p className="text-gray-600">Update content for the soft skill training page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {['hero','introduction','benefits','highlights'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${activeSection === section ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {activeSection === 'hero' && (
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <Input value={pageData.heroSection.title} onChange={(e) => setPageData(prev => ({ ...prev, heroSection: { ...prev.heroSection, title: e.target.value } }))} placeholder="Enter hero title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <Input value={pageData.heroSection.subtitle || ''} onChange={(e) => setPageData(prev => ({ ...prev, heroSection: { ...prev.heroSection, subtitle: e.target.value } }))} placeholder="Enter subtitle" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Input value={pageData.heroSection.description || ''} onChange={(e) => setPageData(prev => ({ ...prev, heroSection: { ...prev.heroSection, description: e.target.value } }))} placeholder="Enter description" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
              <p className="text-xs text-gray-500 mb-2">Max 2MB. JPEG/PNG/WebP/GIF</p>
              <ImageUpload
                value={heroImagePreview}
                onChange={(file, previewUrl) => { if (file && file.size > 2000000) { toast.error('Image size must be less than 2MB'); return; } setHeroImageFile(file); setHeroImagePreview(previewUrl); }}
                required={false}
                previewSize="hero"
                previewShape="rectangular"
                placeholder="Upload hero image"
              />
              {heroImageFile && (
                <Button onClick={handleHeroImageUpload} disabled={uploadingHeroImage} className="mt-2 bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingHeroImage ? 'Uploading...' : 'Upload Image'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'introduction' && (
        <Card>
          <CardHeader>
            <CardTitle>Introduction Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading *</label>
              <Input value={pageData.introduction.heading} onChange={(e) => setPageData(prev => ({ ...prev, introduction: { ...prev.introduction, heading: e.target.value } }))} placeholder="Enter heading" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <Textarea value={pageData.introduction.description} onChange={(e) => setPageData(prev => ({ ...prev, introduction: { ...prev.introduction, description: e.target.value } }))} rows={6} placeholder="Enter introduction" />
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'benefits' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Key Benefits</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder</p>
            </div>
            <Button onClick={handleAddBenefit} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Benefit
            </Button>
          </div>

          {(isAddingBenefit || editingBenefit) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingBenefit ? 'Edit Benefit' : 'Add New Benefit'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji) *</label>
                    <Input value={benefitForm.icon} onChange={(e)=>setBenefitForm(prev=>({...prev, icon: e.target.value}))} maxLength={emojiMax} placeholder="🗣️" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <Input value={benefitForm.title} onChange={(e)=>setBenefitForm(prev=>({...prev, title: e.target.value}))} placeholder="Benefit title" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <Textarea value={benefitForm.description} onChange={(e)=>setBenefitForm(prev=>({...prev, description: e.target.value}))} rows={4} placeholder="Benefit description" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveBenefit} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />{editingBenefit ? 'Update' : 'Save'}</Button>
                  <Button onClick={handleCancelBenefit} variant="outline"><X className="w-4 h-4 mr-2" />Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.keyBenefitsSection.benefits.map((b, index) => (
              <Card key={b._id || index} className="hover:shadow-lg transition-shadow cursor-move relative" draggable onDragStart={(e)=>handleDragStart(e,index)} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDrop={(e)=>handleBenefitDrop(e,index)}>
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center">
                    <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
                    <div className="text-xs text-gray-500 font-medium">#{index + 1}</div>
                  </div>
                </div>
                <CardContent className="p-4 pt-8">
                  <div className="text-4xl mb-3">{b.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{b.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={()=>handleEditBenefit(b)}><Edit className="w-3 h-3 mr-1" />Edit</Button>
                    <Button size="sm" variant="outline" onClick={()=>handleDeleteBenefit(b._id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'highlights' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Program Highlights</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder</p>
            </div>
            <Button onClick={handleAddHighlight} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Highlight
            </Button>
          </div>

          {(isAddingHighlight || editingHighlight) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingHighlight ? 'Edit Highlight' : 'Add New Highlight'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji) *</label>
                    <Input value={highlightForm.icon} onChange={(e)=>setHighlightForm(prev=>({...prev, icon: e.target.value}))} maxLength={emojiMax} placeholder="🎭" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <Input value={highlightForm.title} onChange={(e)=>setHighlightForm(prev=>({...prev, title: e.target.value}))} placeholder="Highlight title" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <Textarea value={highlightForm.description} onChange={(e)=>setHighlightForm(prev=>({...prev, description: e.target.value}))} rows={4} placeholder="Highlight description" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveHighlight} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />{editingHighlight ? 'Update' : 'Save'}</Button>
                  <Button onClick={handleCancelHighlight} variant="outline"><X className="w-4 h-4 mr-2" />Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.programHighlightsSection.highlights.map((h, index) => (
              <Card key={h._id || index} className="hover:shadow-lg transition-shadow cursor-move relative" draggable onDragStart={(e)=>handleDragStart(e,index)} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDrop={(e)=>handleHighlightDrop(e,index)}>
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center">
                    <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
                    <div className="text-xs text-gray-500 font-medium">#{index + 1}</div>
                  </div>
                </div>
                <CardContent className="p-4 pt-8">
                  <div className="text-4xl mb-3">{h.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{h.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{h.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={()=>handleEditHighlight(h)}><Edit className="w-3 h-3 mr-1" />Edit</Button>
                    <Button size="sm" variant="outline" onClick={()=>handleDeleteHighlight(h._id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftSkillTraining;


