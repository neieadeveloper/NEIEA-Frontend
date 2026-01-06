import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { technicalSkillTrainingAdminApi, type TSTItem, type TSTPage } from '@/lib/technicalSkillTrainingApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/image-upload';
import { toast } from '@/hooks/use-toast';
import { Save, Trash2, GripVertical, Plus, Upload } from 'lucide-react';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const heroSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
});

const introSchema = z.object({
  heading: z.string().min(1, 'Heading is required'),
  description: z.string().min(1, 'Description is required'),
});

const toolsSchema = z.object({
  heading: z.string().optional(),
  tools: z.array(z.string().min(1, 'Tool cannot be empty')).min(1, 'At least one tool is required'),
});

type SectionKey = 'targetGroups' | 'learningModes' | 'impactAreas' | 'testimonials';

const TechnicalSkillTraining = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [pageData, setPageData] = useState<TSTPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [uploadingHero, setUploadingHero] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ heroSection: z.infer<typeof heroSchema>; introduction: z.infer<typeof introSchema>; toolsSection: z.infer<typeof toolsSchema>; }>(
    { resolver: zodResolver(z.object({ heroSection: heroSchema, introduction: introSchema, toolsSection: toolsSchema })) }
  );

  const loadPage = async () => {
    setLoading(true);
    try {
      const data = await technicalSkillTrainingAdminApi.get();
      if (data) {
        setPageData(data);
        reset({
          heroSection: { title: data.heroSection?.title || '', subtitle: data.heroSection?.subtitle || '', description: data.heroSection?.description || '' },
          introduction: { heading: data.introduction?.heading || '', description: data.introduction?.description || '' },
          toolsSection: { heading: data.toolsSection?.heading || '', tools: data.toolsSection?.tools || [] },
        });
        setHeroPreview(data.heroSection?.heroImage || null);
      } else {
        const defaults: TSTPage = {
          heroSection: { title: 'Technical Skills Training', subtitle: 'Empowering communities with essential digital skills', description: 'Bridging the digital divide through comprehensive IT literacy programs' },
          introduction: { heading: 'The Digital Divide Challenge', description: 'In today\'s digital world, basic IT literacy is essential. NEIEA provides inclusive, structured training for underserved communities.' },
          toolsSection: { heading: 'Tools & Technologies Covered', tools: ['Google Docs','Google Sheets','Google Slides','Google Forms','Google Meet','Google Classroom','Microsoft Word','Microsoft Excel','Microsoft PowerPoint','Canva'] },
          targetGroupsSection: { heading: 'Our Target Communities', items: [
            { title: 'Teachers and Educators', description: 'Transitioning to digital platforms', icon: '👩‍🏫' },
            { title: 'NIOS Students', description: 'Preparing under non-mainstream boards', icon: '📚' },
            { title: 'Women & Homemakers', description: 'Seeking digital independence', icon: '👩‍💻' },
            { title: 'Community Workers', description: 'NGO staff enhancing digital skills', icon: '🤝' },
            { title: 'Youth & Volunteers', description: 'Eager to develop essential skills', icon: '🌟' },
          ] },
          learningModesSection: { heading: 'Flexible Learning Options', items: [
            { title: 'Remote Learning using Smart Phone', description: 'Attend live online classes from home with a smartphone and internet', icon: '📱' },
            { title: 'Community Center Computer Lab', description: 'Partner community centers provide labs for enrolled students', icon: '🏢' },
            { title: 'Blended Learning Model', description: 'On-site support with live sessions by NEIEA mentors', icon: '🎓' },
          ] },
          impactAreasSection: { heading: 'Areas of Change', items: [
            { title: "Women's Digital Empowerment", description: 'Confidence using digital tools for education and opportunities', icon: '💪' },
            { title: 'Digital Literacy', description: 'MS Office, Google tools, and practical digital skills', icon: '💻' },
            { title: 'Teacher Training', description: 'Integrating digital tools to make learning engaging', icon: '🎯' },
            { title: 'Community Empowerment', description: 'Knowledge sharing and improved access drive change', icon: '🌍' },
          ] },
          testimonialsSection: { heading: 'What Our Learners Say', items: [
            { text: "Yes it's good. I have learnt so many new things. This program helped me a lot.", author: 'Hazeera Khanam', role: 'NEIEA Learner' },
            { text: 'Wonderful training center. Very useful training. Got many things to learn. Thanks', author: 'Mohan', role: 'Program Participant' },
            { text: 'Exceptional coaching and unwavering support made a lasting impact on my growth.', author: 'Y.MD.HABEEBULLAH ROOMY', role: 'Mentorship Program Graduate' },
          ] },
        } as any;
        setPageData(defaults);
        reset({
          heroSection: defaults.heroSection,
          introduction: defaults.introduction,
          toolsSection: defaults.toolsSection,
        });
        setHeroPreview(null);
      }
    } catch (e) {
      const defaults: TSTPage = {
        heroSection: { title: 'Technical Skills Training', subtitle: 'Empowering communities with essential digital skills', description: 'Bridging the digital divide through comprehensive IT literacy programs' },
        introduction: { heading: 'The Digital Divide Challenge', description: 'In today\'s digital world, basic IT literacy is essential. NEIEA provides inclusive, structured training for underserved communities.' },
        solutionSection: { heading: 'Our Solution', description: '' },
        toolsSection: { heading: 'Tools & Technologies Covered', tools: ['Google Docs','Google Sheets','Google Slides','Google Forms','Google Meet','Google Classroom','Microsoft Word','Microsoft Excel','Microsoft PowerPoint','Canva'] },
        targetGroupsSection: { heading: 'Our Target Communities', groups: [
          { title: 'Teachers and Educators', description: 'Transitioning to digital platforms', icon: '👩‍🏫' },
          { title: 'NIOS Students', description: 'Preparing under non-mainstream boards', icon: '📚' },
          { title: 'Women & Homemakers', description: 'Seeking digital independence', icon: '👩‍💻' },
          { title: 'Community Workers', description: 'NGO staff enhancing digital skills', icon: '🤝' },
          { title: 'Youth & Volunteers', description: 'Eager to develop essential skills', icon: '🌟' },
        ] },
        learningModesSection: { heading: 'Flexible Learning Options', description: '', modes: [
          { title: 'Remote Learning using Smart Phone', description: 'Attend live online classes from home with a smartphone and internet', icon: '📱' },
          { title: 'Community Center Computer Lab', description: 'Partner community centers provide labs for enrolled students', icon: '🏢' },
          { title: 'Blended Learning Model', description: 'On-site support with live sessions by NEIEA mentors', icon: '🎓' },
        ] },
        impactAreasSection: { heading: 'Areas of Change', description: '', areas: [
          { title: "Women's Digital Empowerment", description: 'Confidence using digital tools for education and opportunities', icon: '💪' },
          { title: 'Digital Literacy', description: 'MS Office, Google tools, and practical digital skills', icon: '💻' },
          { title: 'Teacher Training', description: 'Integrating digital tools to make learning engaging', icon: '🎯' },
          { title: 'Community Empowerment', description: 'Knowledge sharing and improved access drive change', icon: '🌍' },
        ] },
        testimonialsSection: { heading: 'What Our Learners Say', description: '', testimonials: [
          { text: "Yes it's good. I have learnt so many new things. This program helped me a lot.", author: 'Hazeera Khanam', role: 'NEIEA Learner' },
          { text: 'Wonderful training center. Very useful training. Got many things to learn. Thanks', author: 'Mohan', role: 'Program Participant' },
          { text: 'Exceptional coaching and unwavering support made a lasting impact on my growth.', author: 'Y.MD.HABEEBULLAH ROOMY', role: 'Mentorship Program Graduate' },
        ] },
      } as any;
      setPageData(defaults);
      reset({
        heroSection: defaults.heroSection,
        introduction: defaults.introduction,
        toolsSection: defaults.toolsSection,
      });
      setHeroPreview(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPage(); }, []);

  const onSaveAll = async (values: any) => {
    try {
      const payload: TSTPage = {
        heroSection: values.heroSection,
        introduction: values.introduction,
        toolsSection: {
          heading: values.toolsSection?.heading || pageData?.toolsSection?.heading || '',
          tools: pageData?.toolsSection?.tools || []
        },
        solutionSection: pageData?.solutionSection || { heading: 'Our Solution', description: '' },
        targetGroupsSection: pageData?.targetGroupsSection || { heading: '', groups: [] },
        learningModesSection: pageData?.learningModesSection || { heading: '', modes: [] },
        impactAreasSection: pageData?.impactAreasSection || { heading: '', areas: [] },
        testimonialsSection: pageData?.testimonialsSection || { heading: '', testimonials: [] },
      } as any;
      const hasPage = !!pageData?._id;
      const saved = hasPage ? await technicalSkillTrainingAdminApi.update(payload) : await technicalSkillTrainingAdminApi.create(payload);
      setPageData(saved);
      toast({ title: 'Saved successfully' });
      await loadPage(); // Reload to get updated data
    } catch (err: any) {
      toast({ title: 'Failed to save', description: err.response?.data?.message || 'Error', variant: 'destructive' });
      await loadPage();
    }
  };

  const uploadHeroImage = async () => {
    if (!heroImageFile) {
      toast({ title: 'Select an image first', variant: 'destructive' });
      return;
    }
    if (heroImageFile.size > MAX_IMAGE_SIZE) {
      toast({ title: 'Image too large', description: 'Max 2MB', variant: 'destructive' });
      return;
    }
    setUploadingHero(true);
    try {
      const uploadedData = await technicalSkillTrainingAdminApi.uploadHeroImage(heroImageFile);
      if (uploadedData && uploadedData.heroSection?.heroImage) {
        // Update preview with S3 URL
        setHeroPreview(uploadedData.heroSection.heroImage);
        // Update page data with full response
        setPageData(uploadedData);
        setHeroImageFile(null); // Clear file after successful upload
        toast({ title: 'Hero image uploaded successfully' });
        // Reload to ensure everything is in sync
        await loadPage();
      } else {
        // Fallback to reload if response format is unexpected
        await loadPage();
        toast({ title: 'Hero image uploaded' });
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      toast({ title: 'Upload failed', description: err.response?.data?.message || err.message || 'Error', variant: 'destructive' });
      await loadPage();
    } finally {
      setUploadingHero(false);
    }
  };

  const onDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };
  const onDragEnd = (e: React.DragEvent) => { (e.currentTarget as HTMLElement).style.opacity = '1'; };
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const doReorder = async (section: SectionKey, items: any[]) => {
    try {
      await technicalSkillTrainingAdminApi.reorder(section, items.map((it, idx) => ({ id: it._id!, display_order: idx + 1 })));
      toast({ title: 'Order updated' });
    } catch {
      toast({ title: 'Failed to update order', variant: 'destructive' });
      await loadPage();
    }
  };

  const renderList = (section: SectionKey, list: TSTItem[], setList: (items: TSTItem[]) => void, extraFields?: ('image'|'icon')[]) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((item, index) => (
            <div key={item._id || index}
              className="p-4 border rounded-md bg-white relative"
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDrop={async (e) => {
                e.preventDefault();
                const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                if (dragIndex === index) return;
                const newArr = [...list];
                const moved = newArr.splice(dragIndex, 1)[0];
                newArr.splice(index, 0, moved);
                setList(newArr);
                await doReorder(section, newArr);
              }}
            >
              <div className="flex items-start gap-2 mb-2">
                <GripVertical className="w-5 h-5 text-gray-400 cursor-move mt-1" />
                <div className="flex-1 space-y-2">
                  <Input placeholder="Title" value={item.title} onChange={(e) => {
                    const newArr = [...list];
                    newArr[index] = { ...newArr[index], title: e.target.value };
                    setList(newArr);
                  }} />
                  <Textarea placeholder="Description" rows={3} value={item.description || ''} onChange={(e) => {
                    const newArr = [...list];
                    newArr[index] = { ...newArr[index], description: e.target.value };
                    setList(newArr);
                  }} />
                  {extraFields?.includes('icon') && (
                    <Input placeholder="Icon (emoji)" value={item.icon || ''} onChange={(e) => {
                      const newArr = [...list];
                      newArr[index] = { ...newArr[index], icon: e.target.value };
                      setList(newArr);
                    }} />
                  )}
                  
                  {extraFields?.includes('image') && (
                    <div className="space-y-2">
                      <label className="block text-sm">Image</label>
                      <p className="text-xs text-gray-500">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                      {item._id ? (
                        <div className="space-y-2">
                          <ImageUpload 
                            value={item.image || ''} 
                            onChange={async (file, _preview) => {
                              if (!file) return;
                              if (file.size > MAX_IMAGE_SIZE) { 
                                toast({ title: 'Image too large', description: 'Max 2MB', variant: 'destructive' }); 
                                return; 
                              }
                              try {
                                await technicalSkillTrainingAdminApi.uploadLearningModeImage(item._id!, file);
                                toast({ title: 'Image uploaded successfully' });
                                await loadPage();
                              } catch (err: any) {
                                toast({ title: 'Upload failed', description: err.response?.data?.message || 'Error', variant: 'destructive' });
                              }
                            }} 
                            previewSize="hero"
                            previewShape="rectangular"
                          />
                        </div>
                      ) : (
                        <div className="p-4 border border-amber-200 bg-amber-50 rounded-md">
                          <p className="text-xs text-amber-600">Save the item first to upload an image</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this item?')) {
                    const newArr = list.filter((_, i) => i !== index);
                    setList(newArr);
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => {
            const newItem: TSTItem = { title: 'New Item', description: '', display_order: list.length + 1 };
            setList([...(list || []), newItem]);
          }}
          className="w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Technical Skill Training Page</h1>
          <p className="text-gray-600">Update all content for the technical skill training page</p>
        </div>
        <Button onClick={handleSubmit(onSaveAll)} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" /> Save All Changes
        </Button>
      </div>

      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {['hero', 'introduction', 'solution', 'tools', 'target-groups', 'learning-modes', 'impact-areas', 'testimonials'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeSection === section ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {activeSection === 'hero' && (
        <Card>
          <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Input placeholder="Title" {...register('heroSection.title')} />
                {errors.heroSection?.title && <p className="text-red-500 text-sm">{errors.heroSection.title.message as any}</p>}
                <Input placeholder="Subtitle" {...register('heroSection.subtitle')} />
                <Textarea placeholder="Description" {...register('heroSection.description')} />
              </div>
              <div className="space-y-2">
                <label className="block text-sm mb-2">Hero Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
                <ImageUpload 
                  value={heroPreview || ''} 
                  onChange={(file, preview) => {
                    setHeroImageFile(file);
                    if (preview) setHeroPreview(preview);
                  }} 
                  previewSize="hero"
                  previewShape="rectangular"
                />
                <Button 
                  disabled={!heroImageFile || uploadingHero} 
                  onClick={uploadHeroImage}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2"/>
                  {uploadingHero ? 'Uploading...' : 'Upload Image'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'introduction' && (
        <Card>
          <CardHeader><CardTitle>Introduction</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Heading" {...register('introduction.heading')} />
            {errors.introduction?.heading && <p className="text-red-500 text-sm">{errors.introduction.heading.message as any}</p>}
            <Textarea placeholder="Description" {...register('introduction.description')} />
            {errors.introduction?.description && <p className="text-red-500 text-sm">{errors.introduction.description.message as any}</p>}
          </CardContent>
        </Card>
      )}

      {activeSection === 'tools' && (
        <Card>
          <CardHeader><CardTitle>Tools & Technologies</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Heading" {...register('toolsSection.heading')} />
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {(pageData?.toolsSection?.tools || []).map((tool, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input value={tool} onChange={(e) => {
                      const tools = [...(pageData?.toolsSection?.tools || [])];
                      tools[idx] = e.target.value;
                      setPageData(prev => prev ? ({ ...prev, toolsSection: { heading: prev.toolsSection?.heading, tools } }) as any : prev);
                    }} />
                    <Button variant="destructive" onClick={() => {
                      const tools = (pageData?.toolsSection?.tools || []).filter((_, i) => i !== idx);
                      setPageData(prev => prev ? ({ ...prev, toolsSection: { heading: prev.toolsSection?.heading, tools } }) as any : prev);
                    }}>Remove</Button>
                  </div>
                ))}
              </div>
              <Button onClick={() => {
                const tools = [ ...(pageData?.toolsSection?.tools || []), '' ];
                setPageData(prev => prev ? ({ ...prev, toolsSection: { heading: prev.toolsSection?.heading, tools } }) as any : prev);
              }}>Add Tool</Button>
          </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'solution' && (
        <Card>
          <CardHeader><CardTitle>Our Solution</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Heading" value={pageData?.solutionSection?.heading || ''} onChange={(e) => setPageData(prev => prev ? ({ ...prev, solutionSection: { ...(prev.solutionSection || {}), heading: e.target.value } }) as any : prev)} />
            <Textarea placeholder="Description" value={pageData?.solutionSection?.description || ''} onChange={(e) => setPageData(prev => prev ? ({ ...prev, solutionSection: { ...(prev.solutionSection || {}), description: e.target.value } }) as any : prev)} />
          </CardContent>
        </Card>
      )}

      {activeSection === 'target-groups' && (
        <Card>
          <CardHeader><CardTitle>Target Groups</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Section heading" value={pageData?.targetGroupsSection?.heading || ''} onChange={(e) => setPageData(prev => prev ? ({ ...prev, targetGroupsSection: { ...(prev.targetGroupsSection || {}), heading: e.target.value } }) as any : prev)} />
            {renderList('targetGroups', (pageData?.targetGroupsSection?.groups as TSTItem[]) || [], (items) => setPageData(prev => prev ? ({ ...prev, targetGroupsSection: { heading: prev.targetGroupsSection?.heading, groups: items } }) as any : prev), ['icon'])}
          </CardContent>
        </Card>
      )}

      {activeSection === 'learning-modes' && (
        <Card>
          <CardHeader><CardTitle>Learning Modes</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Section heading" value={pageData?.learningModesSection?.heading || ''} onChange={(e) => setPageData(prev => prev ? ({ ...prev, learningModesSection: { ...(prev.learningModesSection || {}), heading: e.target.value } }) as any : prev)} />
            <Textarea placeholder="Section description" rows={3} value={pageData?.learningModesSection?.description || ''} onChange={(e) => setPageData(prev => prev ? ({ ...prev, learningModesSection: { ...(prev.learningModesSection || {}), description: e.target.value } }) as any : prev)} />
            {renderList('learningModes', (pageData?.learningModesSection?.modes as TSTItem[]) || [], (items) => setPageData(prev => prev ? ({ ...prev, learningModesSection: { heading: prev.learningModesSection?.heading, description: prev.learningModesSection?.description, modes: items } }) as any : prev), ['icon'])}
          </CardContent>
        </Card>
      )}

      {activeSection === 'impact-areas' && (
        <Card>
          <CardHeader><CardTitle>Impact Areas</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Section heading" value={pageData?.impactAreasSection?.heading || ''} onChange={(e) => setPageData(prev => prev ? ({ ...prev, impactAreasSection: { ...(prev.impactAreasSection || {}), heading: e.target.value } }) as any : prev)} />
            <Textarea placeholder="Section description" rows={3} value={pageData?.impactAreasSection?.description || ''} onChange={(e) => setPageData(prev => prev ? ({ ...prev, impactAreasSection: { ...(prev.impactAreasSection || {}), description: e.target.value } }) as any : prev)} />
            {renderList('impactAreas', (pageData?.impactAreasSection?.areas as TSTItem[]) || [], (items) => setPageData(prev => prev ? ({ ...prev, impactAreasSection: { heading: prev.impactAreasSection?.heading, description: prev.impactAreasSection?.description, areas: items } }) as any : prev), ['icon'])}
          </CardContent>
        </Card>
      )}

      {activeSection === 'testimonials' && (
        <Card>
          <CardHeader><CardTitle>Testimonials</CardTitle></CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input placeholder="Section heading" value={pageData?.testimonialsSection?.heading || ''} onChange={(e) => setPageData(prev => prev ? ({ ...prev, testimonialsSection: { ...(prev.testimonialsSection || {}), heading: e.target.value } }) as any : prev)} />
              <Textarea placeholder="Section description" rows={3} className="mt-2" value={pageData?.testimonialsSection?.description || ''} onChange={(e) => setPageData(prev => prev ? ({ ...prev, testimonialsSection: { ...(prev.testimonialsSection || {}), description: e.target.value } }) as any : prev)} />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(pageData?.testimonialsSection?.testimonials || []).map((testimonial: any, index: number) => (
                  <div key={testimonial._id || index}
                    className="p-4 border rounded-md bg-white relative"
                    draggable
                    onDragStart={(e) => onDragStart(e, index)}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                    onDrop={async (e) => {
                      e.preventDefault();
                      const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                      if (dragIndex === index) return;
                      const testimonials = [...(pageData?.testimonialsSection?.testimonials || [])];
                      const moved = testimonials.splice(dragIndex, 1)[0];
                      testimonials.splice(index, 0, moved);
                      setPageData(prev => prev ? ({ ...prev, testimonialsSection: { ...(prev.testimonialsSection || {}), testimonials } }) as any : prev);
                      await doReorder('testimonials', testimonials);
                    }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-move mt-1" />
                      <div className="flex-1 space-y-2">
                        <Textarea placeholder="Testimonial text" rows={3} value={testimonial.text || ''} onChange={(e) => {
                          const testimonials = [...(pageData?.testimonialsSection?.testimonials || [])];
                          testimonials[index] = { ...testimonials[index], text: e.target.value };
                          setPageData(prev => prev ? ({ ...prev, testimonialsSection: { ...(prev.testimonialsSection || {}), testimonials } }) as any : prev);
                        }} />
                        <Input placeholder="Author name" value={testimonial.author || ''} onChange={(e) => {
                          const testimonials = [...(pageData?.testimonialsSection?.testimonials || [])];
                          testimonials[index] = { ...testimonials[index], author: e.target.value };
                          setPageData(prev => prev ? ({ ...prev, testimonialsSection: { ...(prev.testimonialsSection || {}), testimonials } }) as any : prev);
                        }} />
                        <Input placeholder="Author role" value={testimonial.role || ''} onChange={(e) => {
                          const testimonials = [...(pageData?.testimonialsSection?.testimonials || [])];
                          testimonials[index] = { ...testimonials[index], role: e.target.value };
                          setPageData(prev => prev ? ({ ...prev, testimonialsSection: { ...(prev.testimonialsSection || {}), testimonials } }) as any : prev);
                        }} />
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this testimonial?')) {
                          const testimonials = (pageData?.testimonialsSection?.testimonials || []).filter((_: any, i: number) => i !== index);
                          setPageData(prev => prev ? ({ ...prev, testimonialsSection: { ...(prev.testimonialsSection || {}), testimonials } }) as any : prev);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  const testimonials = [...(pageData?.testimonialsSection?.testimonials || []), { text: '', author: '', role: '' }];
                  setPageData(prev => prev ? ({ ...prev, testimonialsSection: { ...(prev.testimonialsSection || {}), testimonials } }) as any : prev);
                }}
                className="w-full md:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TechnicalSkillTraining;

