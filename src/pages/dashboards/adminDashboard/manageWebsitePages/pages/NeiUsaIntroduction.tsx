import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';
import ImageUpload from '@/components/ui/image-upload';
import { CharacterCounter } from '@/components/ui/character-counter';

// Zod Validation Schemas
const whoWeServeItemSchema = z.object({
  _id: z.string().optional(),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  display_order: z.number().optional()
});

const whatWeOfferItemSchema = z.object({
  _id: z.string().optional(),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  display_order: z.number().optional()
});

const neiUsaIntroductionPageSchema = z.object({
  heroSection: z.object({
    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title must be less than 200 characters'),
    subtitle: z.string()
      .max(200, 'Subtitle must be less than 200 characters')
      .optional(),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(1000, 'Description must be less than 1000 characters')
  }),
  aboutSection: z.object({
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be less than 2000 characters'),
    image: z.string().optional()
  }),
  visionSection: z.object({
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be less than 2000 characters'),
    icon: z.string()
      .max(10, 'Icon should be 1-2 characters (emoji)')
      .optional()
  }),
  missionSection: z.object({
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    missionItems: z.array(z.string())
      .min(1, 'At least one mission item is required')
      .max(20, 'Maximum 20 mission items allowed'),
    icon: z.string()
      .max(10, 'Icon should be 1-2 characters (emoji)')
      .optional()
  }),
  whoWeServeSection: z.object({
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    description: z.string()
      .max(500, 'Description must be less than 500 characters')
      .optional(),
    image: z.string().optional(),
    items: z.array(whoWeServeItemSchema)
      .min(1, 'At least one item is required')
      .max(20, 'Maximum 20 items allowed')
  }),
  whatWeOfferSection: z.object({
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    image: z.string().optional(),
    items: z.array(whatWeOfferItemSchema)
      .min(1, 'At least one item is required')
      .max(20, 'Maximum 20 items allowed')
  }),
  joinUsSection: z.object({
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(1000, 'Description must be less than 1000 characters'),
    buttonText: z.string()
      .max(50, 'Button text must be less than 50 characters')
      .optional(),
    buttonLink: z.string()
      .url('Must be a valid URL')
      .optional()
      .or(z.literal(''))
  })
});

type WhoWeServeItem = z.infer<typeof whoWeServeItemSchema>;
type WhatWeOfferItem = z.infer<typeof whatWeOfferItemSchema>;
type NeiUsaIntroductionPage = z.infer<typeof neiUsaIntroductionPageSchema>;

const NeiUsaIntroduction = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [pageData, setPageData] = useState<NeiUsaIntroductionPage>({
    heroSection: {
      title: '',
      subtitle: '',
      description: ''
    },
    aboutSection: {
      heading: '',
      description: '',
      image: ''
    },
    visionSection: {
      heading: '',
      description: '',
      icon: '👁️'
    },
    missionSection: {
      heading: '',
      missionItems: [],
      icon: '🎯'
    },
    whoWeServeSection: {
      heading: '',
      description: '',
      image: '',
      items: []
    },
    whatWeOfferSection: {
      heading: '',
      image: '',
      items: []
    },
    joinUsSection: {
      heading: '',
      description: '',
      buttonText: 'Get Involved',
      buttonLink: ''
    }
  });

  // Image upload states
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
  const [whoWeServeImageFile, setWhoWeServeImageFile] = useState<File | null>(null);
  const [whatWeOfferImageFile, setWhatWeOfferImageFile] = useState<File | null>(null);

  // Editing states
  const [editingWhoWeServeItem, setEditingWhoWeServeItem] = useState<string | null>(null);
  const [editingWhatWeOfferItem, setEditingWhatWeOfferItem] = useState<string | null>(null);
  const [editingMissionItem, setEditingMissionItem] = useState<number | null>(null);
  
  // Form states for items
  const [whoWeServeForm, setWhoWeServeForm] = useState({ title: '', description: '' });
  const [whatWeOfferForm, setWhatWeOfferForm] = useState({ title: '', description: '' });
  const [missionItemForm, setMissionItemForm] = useState('');

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/admin/nei-usa-introduction-page');
      if (response.data && response.data.pageData) {
        setPageData(response.data.pageData);
      }
    } catch (err: any) {
      console.error('Error loading page data:', err);
      setError(err.response?.data?.message || 'Failed to load page data');
      toast.error('Failed to load page data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Clean demo IDs from items before saving (so backend creates new items)
      const cleanedData = {
        ...pageData,
        whoWeServeSection: {
          ...pageData.whoWeServeSection,
          items: pageData.whoWeServeSection.items.map(item => {
            const { _id, ...rest } = item;
            // Remove demo IDs - backend will create new items
            if (_id && _id.toString().startsWith('demo-')) {
              return { ...rest, display_order: item.display_order || 0 };
            }
            return item;
          })
        },
        whatWeOfferSection: {
          ...pageData.whatWeOfferSection,
          items: pageData.whatWeOfferSection.items.map(item => {
            const { _id, ...rest } = item;
            // Remove demo IDs - backend will create new items
            if (_id && _id.toString().startsWith('demo-')) {
              return { ...rest, display_order: item.display_order || 0 };
            }
            return item;
          })
        }
      };

      // Validate data
      const validatedData = neiUsaIntroductionPageSchema.parse(cleanedData);
      
      setSaving(true);
      await axiosInstance.put('/admin/nei-usa-introduction-page', validatedData);
      
      toast.success('Page updated successfully');
      await loadPageData();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        toast.error('Validation error: ' + err.errors[0].message);
      } else {
        console.error('Error saving page:', err);
        toast.error(err.response?.data?.message || 'Failed to save page');
      }
    } finally {
      setSaving(false);
    }
  };

  // Image Upload Functions
  const handleAboutImageUpload = async () => {
    if (!aboutImageFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', aboutImageFile);

      const response = await axiosInstance.post(
        '/admin/nei-usa-introduction-page/upload-about-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setPageData(prev => ({
        ...prev,
        aboutSection: {
          ...prev.aboutSection,
          image: response.data.imageUrl
        }
      }));

      setAboutImageFile(null);
      toast.success('Image uploaded successfully');
    } catch (err: any) {
      console.error('Error uploading image:', err);
      toast.error(err.response?.data?.message || 'Failed to upload image');
    }
  };

  const handleWhoWeServeImageUpload = async () => {
    if (!whoWeServeImageFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', whoWeServeImageFile);

      const response = await axiosInstance.post(
        '/admin/nei-usa-introduction-page/upload-who-we-serve-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setPageData(prev => ({
        ...prev,
        whoWeServeSection: {
          ...prev.whoWeServeSection,
          image: response.data.imageUrl
        }
      }));

      setWhoWeServeImageFile(null);
      toast.success('Image uploaded successfully');
    } catch (err: any) {
      console.error('Error uploading image:', err);
      toast.error(err.response?.data?.message || 'Failed to upload image');
    }
  };

  const handleWhatWeOfferImageUpload = async () => {
    if (!whatWeOfferImageFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', whatWeOfferImageFile);

      const response = await axiosInstance.post(
        '/admin/nei-usa-introduction-page/upload-what-we-offer-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setPageData(prev => ({
        ...prev,
        whatWeOfferSection: {
          ...prev.whatWeOfferSection,
          image: response.data.imageUrl
        }
      }));

      setWhatWeOfferImageFile(null);
      toast.success('Image uploaded successfully');
    } catch (err: any) {
      console.error('Error uploading image:', err);
      toast.error(err.response?.data?.message || 'Failed to upload image');
    }
  };

  // Who We Serve Item Functions
  const handleAddWhoWeServeItem = () => {
    setEditingWhoWeServeItem('new');
    setWhoWeServeForm({ title: '', description: '' });
  };

  const handleEditWhoWeServeItem = (item: WhoWeServeItem) => {
    setEditingWhoWeServeItem(item._id || 'new');
    setWhoWeServeForm({ title: item.title, description: item.description });
  };

  const handleSaveWhoWeServeItem = async () => {
    try {
      const validatedItem = whoWeServeItemSchema.parse(whoWeServeForm);
      const isEditing = editingWhoWeServeItem && editingWhoWeServeItem !== 'new';
      
      if (isEditing) {
        const updatedItems = pageData.whoWeServeSection.items.map(item =>
          item._id === editingWhoWeServeItem ? { ...item, ...validatedItem } : item
        );
        setPageData(prev => ({
          ...prev,
          whoWeServeSection: {
            ...prev.whoWeServeSection,
            items: updatedItems
          }
        }));
      } else {
        const newItem: WhoWeServeItem = {
          ...validatedItem,
          display_order: pageData.whoWeServeSection.items.length + 1
        };
        setPageData(prev => ({
          ...prev,
          whoWeServeSection: {
            ...prev.whoWeServeSection,
            items: [...prev.whoWeServeSection.items, newItem]
          }
        }));
      }

      setEditingWhoWeServeItem(null);
      setWhoWeServeForm({ title: '', description: '' });
      await handleSave();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        toast.error('Validation error: ' + err.errors[0].message);
      } else {
        toast.error('Failed to save item');
      }
    }
  };

  const handleDeleteWhoWeServeItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const updatedItems = pageData.whoWeServeSection.items.filter(item => item._id !== itemId);
      setPageData(prev => ({
        ...prev,
        whoWeServeSection: {
          ...prev.whoWeServeSection,
          items: updatedItems
        }
      }));
      await handleSave();
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  // What We Offer Item Functions
  const handleAddWhatWeOfferItem = () => {
    setEditingWhatWeOfferItem('new');
    setWhatWeOfferForm({ title: '', description: '' });
  };

  const handleEditWhatWeOfferItem = (item: WhatWeOfferItem) => {
    setEditingWhatWeOfferItem(item._id || 'new');
    setWhatWeOfferForm({ title: item.title, description: item.description });
  };

  const handleSaveWhatWeOfferItem = async () => {
    try {
      const validatedItem = whatWeOfferItemSchema.parse(whatWeOfferForm);
      const isEditing = editingWhatWeOfferItem && editingWhatWeOfferItem !== 'new';
      
      if (isEditing) {
        const updatedItems = pageData.whatWeOfferSection.items.map(item =>
          item._id === editingWhatWeOfferItem ? { ...item, ...validatedItem } : item
        );
        setPageData(prev => ({
          ...prev,
          whatWeOfferSection: {
            ...prev.whatWeOfferSection,
            items: updatedItems
          }
        }));
      } else {
        const newItem: WhatWeOfferItem = {
          ...validatedItem,
          display_order: pageData.whatWeOfferSection.items.length + 1
        };
        setPageData(prev => ({
          ...prev,
          whatWeOfferSection: {
            ...prev.whatWeOfferSection,
            items: [...prev.whatWeOfferSection.items, newItem]
          }
        }));
      }

      setEditingWhatWeOfferItem(null);
      setWhatWeOfferForm({ title: '', description: '' });
      await handleSave();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        toast.error('Validation error: ' + err.errors[0].message);
      } else {
        toast.error('Failed to save item');
      }
    }
  };

  const handleDeleteWhatWeOfferItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const updatedItems = pageData.whatWeOfferSection.items.filter(item => item._id !== itemId);
      setPageData(prev => ({
        ...prev,
        whatWeOfferSection: {
          ...prev.whatWeOfferSection,
          items: updatedItems
        }
      }));
      await handleSave();
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  // Mission Item Functions
  const handleAddMissionItem = () => {
    setEditingMissionItem(-1);
    setMissionItemForm('');
  };

  const handleEditMissionItem = (index: number) => {
    setEditingMissionItem(index);
    setMissionItemForm(pageData.missionSection.missionItems[index] || '');
  };

  const handleSaveMissionItem = async () => {
    if (!missionItemForm.trim()) {
      toast.error('Mission item cannot be empty');
      return;
    }

    try {
      if (editingMissionItem === -1) {
        // Adding new
        setPageData(prev => ({
          ...prev,
          missionSection: {
            ...prev.missionSection,
            missionItems: [...prev.missionSection.missionItems, missionItemForm]
          }
        }));
      } else if (editingMissionItem !== null) {
        // Editing existing
        const updatedItems = [...pageData.missionSection.missionItems];
        updatedItems[editingMissionItem] = missionItemForm;
        setPageData(prev => ({
          ...prev,
          missionSection: {
            ...prev.missionSection,
            missionItems: updatedItems
          }
        }));
      }
      setEditingMissionItem(null);
      setMissionItemForm('');
      await handleSave();
    } catch (err) {
      toast.error('Failed to save mission item');
    }
  };

  const handleDeleteMissionItem = async (index: number) => {
    if (!confirm('Are you sure you want to delete this mission item?')) return;

    try {
      const updatedItems = pageData.missionSection.missionItems.filter((_, i) => i !== index);
      setPageData(prev => ({
        ...prev,
        missionSection: {
          ...prev.missionSection,
          missionItems: updatedItems
        }
      }));
      await handleSave();
    } catch (err) {
      toast.error('Failed to delete mission item');
    }
  };

  // Drag and Drop Functions
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleWhoWeServeDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const items = [...pageData.whoWeServeSection.items];
      const draggedItem = items[dragIndex];
      items.splice(dragIndex, 1);
      items.splice(dropIndex, 0, draggedItem);

      setPageData(prev => ({
        ...prev,
        whoWeServeSection: {
          ...prev.whoWeServeSection,
          items
        }
      }));

      // Update display_order locally for demo items
      const updatedItems = items.map((item, index) => ({
        ...item,
        display_order: index + 1
      }));
      
      setPageData(prev => ({
        ...prev,
        whoWeServeSection: {
          ...prev.whoWeServeSection,
          items: updatedItems
        }
      }));

      // Only call API if items have real MongoDB IDs (not demo IDs)
      const hasRealIds = items.some(item => item._id && !item._id.toString().startsWith('demo-'));
      
      if (hasRealIds) {
        try {
          const reorderData = items
            .filter(item => item._id && !item._id.toString().startsWith('demo-'))
            .map((item, index) => ({
              id: item._id,
              display_order: index + 1
            }));

          if (reorderData.length > 0) {
            await axiosInstance.post('/admin/nei-usa-introduction-page/reorder', {
              section: 'whoWeServe',
              items: reorderData
            });
            toast.success('Item order updated');
            await loadPageData();
          }
        } catch (err) {
          toast.error('Failed to update order. Changes saved locally.');
        }
      } else {
        toast.success('Order updated. Remember to save your changes.');
      }
    }
  };

  const handleWhatWeOfferDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const items = [...pageData.whatWeOfferSection.items];
      const draggedItem = items[dragIndex];
      items.splice(dragIndex, 1);
      items.splice(dropIndex, 0, draggedItem);

      setPageData(prev => ({
        ...prev,
        whatWeOfferSection: {
          ...prev.whatWeOfferSection,
          items
        }
      }));

      // Update display_order locally for demo items
      const updatedItems = items.map((item, index) => ({
        ...item,
        display_order: index + 1
      }));
      
      setPageData(prev => ({
        ...prev,
        whatWeOfferSection: {
          ...prev.whatWeOfferSection,
          items: updatedItems
        }
      }));

      // Only call API if items have real MongoDB IDs (not demo IDs)
      const hasRealIds = items.some(item => item._id && !item._id.toString().startsWith('demo-'));
      
      if (hasRealIds) {
        try {
          const reorderData = items
            .filter(item => item._id && !item._id.toString().startsWith('demo-'))
            .map((item, index) => ({
              id: item._id,
              display_order: index + 1
            }));

          if (reorderData.length > 0) {
            await axiosInstance.post('/admin/nei-usa-introduction-page/reorder', {
              section: 'whatWeOffer',
              items: reorderData
            });
            toast.success('Item order updated');
            await loadPageData();
          }
        } catch (err) {
          toast.error('Failed to update order. Changes saved locally.');
        }
      } else {
        toast.success('Order updated. Remember to save your changes.');
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Page</div>
          <p className="text-gray-600">{error}</p>
          <Button onClick={loadPageData} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">NEI USA Introduction Page</h2>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="vision">Vision</TabsTrigger>
          <TabsTrigger value="mission">Mission</TabsTrigger>
          <TabsTrigger value="who-we-serve">Who We Serve</TabsTrigger>
          <TabsTrigger value="what-we-offer">What We Offer</TabsTrigger>
          <TabsTrigger value="join-us">Join Us</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={pageData.heroSection.title}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    heroSection: { ...prev.heroSection, title: e.target.value }
                  }))}
                  placeholder="New Educational Initiative Corp"
                />
                <CharacterCounter current={pageData.heroSection.title.length} max={200} min={5} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <Input
                  value={pageData.heroSection.subtitle || ''}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    heroSection: { ...prev.heroSection, subtitle: e.target.value }
                  }))}
                  placeholder="Making Quality Education Accessible to All"
                />
                <CharacterCounter current={(pageData.heroSection.subtitle || '').length} max={200} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={pageData.heroSection.description}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    heroSection: { ...prev.heroSection, description: e.target.value }
                  }))}
                  placeholder="A non-profit organization committed to making quality education accessible to all..."
                  rows={4}
                />
                <CharacterCounter current={pageData.heroSection.description.length} max={1000} min={20} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Section */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Heading</label>
                <Input
                  value={pageData.aboutSection.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, heading: e.target.value }
                  }))}
                  placeholder="About NEIUSA"
                />
                <CharacterCounter current={pageData.aboutSection.heading.length} max={200} min={5} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={pageData.aboutSection.description}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, description: e.target.value }
                  }))}
                  placeholder="Description about NEIUSA..."
                  rows={6}
                />
                <CharacterCounter current={pageData.aboutSection.description.length} max={2000} min={20} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                {pageData.aboutSection.image && (
                  <img 
                    src={pageData.aboutSection.image} 
                    alt="About" 
                    className="w-full max-w-md h-48 object-cover rounded mb-2"
                  />
                )}
                <ImageUpload
                  value={pageData.aboutSection.image}
                  onChange={(file, previewUrl) => {
                    if (file) {
                      setAboutImageFile(file);
                    }
                  }}
                  placeholder="Upload about section image"
                  required={false}
                  previewSize="lg"
                  previewShape="rectangular"
                />
                {aboutImageFile && (
                  <div className="mt-2 flex gap-2">
                    <Button onClick={handleAboutImageUpload} size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                    <Button onClick={() => setAboutImageFile(null)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vision Section */}
        <TabsContent value="vision">
          <Card>
            <CardHeader>
              <CardTitle>Vision Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Heading</label>
                <Input
                  value={pageData.visionSection.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    visionSection: { ...prev.visionSection, heading: e.target.value }
                  }))}
                  placeholder="Our Vision"
                />
                <CharacterCounter current={pageData.visionSection.heading.length} max={200} min={5} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                <Input
                  value={pageData.visionSection.icon || ''}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    visionSection: { ...prev.visionSection, icon: e.target.value }
                  }))}
                  placeholder="👁️"
                  maxLength={10}
                />
                <CharacterCounter current={(pageData.visionSection.icon || '').length} max={10} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={pageData.visionSection.description}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    visionSection: { ...prev.visionSection, description: e.target.value }
                  }))}
                  placeholder="Vision description..."
                  rows={4}
                />
                <CharacterCounter current={pageData.visionSection.description.length} max={2000} min={20} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mission Section */}
        <TabsContent value="mission">
          <Card>
            <CardHeader>
              <CardTitle>Mission Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Heading</label>
                <Input
                  value={pageData.missionSection.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    missionSection: { ...prev.missionSection, heading: e.target.value }
                  }))}
                  placeholder="Our Mission"
                />
                <CharacterCounter current={pageData.missionSection.heading.length} max={200} min={5} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                <Input
                  value={pageData.missionSection.icon || ''}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    missionSection: { ...prev.missionSection, icon: e.target.value }
                  }))}
                  placeholder="🎯"
                  maxLength={10}
                />
                <CharacterCounter current={(pageData.missionSection.icon || '').length} max={10} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mission Items</label>
                <div className="space-y-2">
                  {pageData.missionSection.missionItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 border rounded">
                      {editingMissionItem === index ? (
                        <>
                          <Textarea
                            value={missionItemForm}
                            onChange={(e) => setMissionItemForm(e.target.value)}
                            className="flex-1"
                            rows={2}
                          />
                          <Button onClick={handleSaveMissionItem} size="sm">
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => { setEditingMissionItem(null); setMissionItemForm(''); }} size="sm" variant="outline">
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="flex-1">{item}</p>
                          <Button onClick={() => handleEditMissionItem(index)} size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => handleDeleteMissionItem(index)} size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                  {editingMissionItem === -1 ? (
                    <div className="flex gap-2 p-3 border rounded">
                      <Textarea
                        value={missionItemForm}
                        onChange={(e) => setMissionItemForm(e.target.value)}
                        className="flex-1"
                        placeholder="Enter mission item..."
                        rows={2}
                      />
                      <Button onClick={handleSaveMissionItem} size="sm">
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => { setEditingMissionItem(null); setMissionItemForm(''); }} size="sm" variant="outline">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={handleAddMissionItem} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Mission Item
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Who We Serve Section */}
        <TabsContent value="who-we-serve">
          <Card>
            <CardHeader>
              <CardTitle>Who We Serve Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Heading</label>
                <Input
                  value={pageData.whoWeServeSection.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    whoWeServeSection: { ...prev.whoWeServeSection, heading: e.target.value }
                  }))}
                  placeholder="Who We Serve"
                />
                <CharacterCounter current={pageData.whoWeServeSection.heading.length} max={200} min={5} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={pageData.whoWeServeSection.description || ''}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    whoWeServeSection: { ...prev.whoWeServeSection, description: e.target.value }
                  }))}
                  placeholder="Description..."
                  rows={3}
                />
                <CharacterCounter current={(pageData.whoWeServeSection.description || '').length} max={500} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                {pageData.whoWeServeSection.image && (
                  <img 
                    src={pageData.whoWeServeSection.image} 
                    alt="Who We Serve" 
                    className="w-full max-w-md h-48 object-cover rounded mb-2"
                  />
                )}
                <ImageUpload
                  value={pageData.whoWeServeSection.image}
                  onChange={(file, previewUrl) => {
                    if (file) {
                      setWhoWeServeImageFile(file);
                    }
                  }}
                  placeholder="Upload who we serve section image"
                  required={false}
                  previewSize="lg"
                  previewShape="rectangular"
                />
                {whoWeServeImageFile && (
                  <div className="mt-2 flex gap-2">
                    <Button onClick={handleWhoWeServeImageUpload} size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                    <Button onClick={() => setWhoWeServeImageFile(null)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Items</label>
                <div className="space-y-2">
                  {pageData.whoWeServeSection.items.map((item, index) => (
                    <div
                      key={item._id || index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleWhoWeServeDrop(e, index)}
                      className="flex items-start gap-2 p-3 border rounded cursor-move hover:bg-gray-50"
                    >
                      <GripVertical className="w-5 h-5 text-gray-400 mt-1" />
                      {editingWhoWeServeItem === item._id ? (
                        <div className="flex-1 space-y-2">
                          <Input
                            value={whoWeServeForm.title}
                            onChange={(e) => setWhoWeServeForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Title"
                          />
                          <CharacterCounter current={whoWeServeForm.title.length} max={200} min={3} />
                          <Textarea
                            value={whoWeServeForm.description}
                            onChange={(e) => setWhoWeServeForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Description"
                            rows={2}
                          />
                          <CharacterCounter current={whoWeServeForm.description.length} max={1000} min={10} />
                          <div className="flex gap-2">
                            <Button onClick={handleSaveWhoWeServeItem} size="sm">
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => { setEditingWhoWeServeItem(null); setWhoWeServeForm({ title: '', description: '' }); }} size="sm" variant="outline">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <Button onClick={() => handleEditWhoWeServeItem(item)} size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => item._id && handleDeleteWhoWeServeItem(item._id)} size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                  {editingWhoWeServeItem === 'new' ? (
                    <div className="p-3 border rounded space-y-2">
                      <Input
                        value={whoWeServeForm.title}
                        onChange={(e) => setWhoWeServeForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Title"
                      />
                      <CharacterCounter current={whoWeServeForm.title.length} max={200} min={3} />
                      <Textarea
                        value={whoWeServeForm.description}
                        onChange={(e) => setWhoWeServeForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Description"
                        rows={2}
                      />
                      <CharacterCounter current={whoWeServeForm.description.length} max={1000} min={10} />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveWhoWeServeItem} size="sm">
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => { setEditingWhoWeServeItem(null); setWhoWeServeForm({ title: '', description: '' }); }} size="sm" variant="outline">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={handleAddWhoWeServeItem} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* What We Offer Section */}
        <TabsContent value="what-we-offer">
          <Card>
            <CardHeader>
              <CardTitle>What We Offer Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Heading</label>
                <Input
                  value={pageData.whatWeOfferSection.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    whatWeOfferSection: { ...prev.whatWeOfferSection, heading: e.target.value }
                  }))}
                  placeholder="What We Offer"
                />
                <CharacterCounter current={pageData.whatWeOfferSection.heading.length} max={200} min={5} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                {pageData.whatWeOfferSection.image && (
                  <img 
                    src={pageData.whatWeOfferSection.image} 
                    alt="What We Offer" 
                    className="w-full max-w-md h-48 object-cover rounded mb-2"
                  />
                )}
                <ImageUpload
                  value={pageData.whatWeOfferSection.image}
                  onChange={(file, previewUrl) => {
                    if (file) {
                      setWhatWeOfferImageFile(file);
                    }
                  }}
                  placeholder="Upload what we offer section image"
                  required={false}
                  previewSize="lg"
                  previewShape="rectangular"
                />
                {whatWeOfferImageFile && (
                  <div className="mt-2 flex gap-2">
                    <Button onClick={handleWhatWeOfferImageUpload} size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                    <Button onClick={() => setWhatWeOfferImageFile(null)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Items</label>
                <div className="space-y-2">
                  {pageData.whatWeOfferSection.items.map((item, index) => (
                    <div
                      key={item._id || index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleWhatWeOfferDrop(e, index)}
                      className="flex items-start gap-2 p-3 border rounded cursor-move hover:bg-gray-50"
                    >
                      <GripVertical className="w-5 h-5 text-gray-400 mt-1" />
                      {editingWhatWeOfferItem === item._id ? (
                        <div className="flex-1 space-y-2">
                          <Input
                            value={whatWeOfferForm.title}
                            onChange={(e) => setWhatWeOfferForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Title"
                          />
                          <CharacterCounter current={whatWeOfferForm.title.length} max={200} min={3} />
                          <Textarea
                            value={whatWeOfferForm.description}
                            onChange={(e) => setWhatWeOfferForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Description"
                            rows={2}
                          />
                          <CharacterCounter current={whatWeOfferForm.description.length} max={1000} min={10} />
                          <div className="flex gap-2">
                            <Button onClick={handleSaveWhatWeOfferItem} size="sm">
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => { setEditingWhatWeOfferItem(null); setWhatWeOfferForm({ title: '', description: '' }); }} size="sm" variant="outline">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <Button onClick={() => handleEditWhatWeOfferItem(item)} size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => item._id && handleDeleteWhatWeOfferItem(item._id)} size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                  {editingWhatWeOfferItem === 'new' ? (
                    <div className="p-3 border rounded space-y-2">
                      <Input
                        value={whatWeOfferForm.title}
                        onChange={(e) => setWhatWeOfferForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Title"
                      />
                      <CharacterCounter current={whatWeOfferForm.title.length} max={200} min={3} />
                      <Textarea
                        value={whatWeOfferForm.description}
                        onChange={(e) => setWhatWeOfferForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Description"
                        rows={2}
                      />
                      <CharacterCounter current={whatWeOfferForm.description.length} max={1000} min={10} />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveWhatWeOfferItem} size="sm">
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => { setEditingWhatWeOfferItem(null); setWhatWeOfferForm({ title: '', description: '' }); }} size="sm" variant="outline">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={handleAddWhatWeOfferItem} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Join Us Section */}
        <TabsContent value="join-us">
          <Card>
            <CardHeader>
              <CardTitle>Join Us Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Heading</label>
                <Input
                  value={pageData.joinUsSection.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    joinUsSection: { ...prev.joinUsSection, heading: e.target.value }
                  }))}
                  placeholder="Join Us"
                />
                <CharacterCounter current={pageData.joinUsSection.heading.length} max={200} min={5} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={pageData.joinUsSection.description}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    joinUsSection: { ...prev.joinUsSection, description: e.target.value }
                  }))}
                  placeholder="Join us description..."
                  rows={4}
                />
                <CharacterCounter current={pageData.joinUsSection.description.length} max={1000} min={20} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <Input
                  value={pageData.joinUsSection.buttonText || ''}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    joinUsSection: { ...prev.joinUsSection, buttonText: e.target.value }
                  }))}
                  placeholder="Get Involved"
                />
                <CharacterCounter current={(pageData.joinUsSection.buttonText || '').length} max={50} min={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Button Link</label>
                <Input
                  value={pageData.joinUsSection.buttonLink || ''}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    joinUsSection: { ...prev.joinUsSection, buttonLink: e.target.value }
                  }))}
                  placeholder="https://neiusa.org/"
                  type="url"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeiUsaIntroduction;

