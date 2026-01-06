import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';

// Zod Validation Schemas
const contentBlockSchema = z.object({
  _id: z.string().optional(),
  order: z.number().int().min(1),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters')
});

const exploreNetworkItemSchema = z.object({
  _id: z.string().optional(),
  icon: z.string().min(1, 'Icon is required'),
  heading: z.string()
    .min(3, 'Heading must be at least 3 characters')
    .max(100, 'Heading must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  buttonText: z.string()
    .min(2, 'Button text must be at least 2 characters')
    .max(50, 'Button text must be less than 50 characters'),
  link: z.string()
    .min(1, 'Link is required')
    .max(200, 'Link must be less than 200 characters'),
  display_order: z.number().optional()
});

const partneringInstitutionPageSchema = z.object({
  headerSection: z.object({
    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title must be less than 200 characters'),
    subtitle: z.string()
      .min(5, 'Subtitle must be at least 5 characters')
      .max(300, 'Subtitle must be less than 300 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(1000, 'Description must be less than 1000 characters')
  }),
  overviewSection: z.object({
    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be less than 2000 characters')
  }),
  partnershipModelSection: z.object({
    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title must be less than 200 characters'),
    contentBlocks: z.array(contentBlockSchema)
      .min(1, 'At least one content block is required')
      .max(10, 'Maximum 10 content blocks allowed')
  }),
  exploreNetworkSection: z.object({
    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title must be less than 200 characters'),
    items: z.array(exploreNetworkItemSchema)
      .min(1, 'At least one item is required')
      .max(10, 'Maximum 10 items allowed')
  }),
  callToActionSection: z.object({
    text: z.string()
      .min(5, 'Text must be at least 5 characters')
      .max(200, 'Text must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(1000, 'Description must be less than 1000 characters'),
    primaryButtonText: z.string()
      .min(2, 'Button text must be at least 2 characters')
      .max(50, 'Button text must be less than 50 characters'),
    primaryButtonLink: z.string()
      .min(1, 'Link is required')
      .max(200, 'Link must be less than 200 characters'),
    secondaryButtonText: z.string()
      .max(50, 'Button text must be less than 50 characters')
      .optional(),
    secondaryButtonLink: z.string()
      .max(200, 'Link must be less than 200 characters')
      .optional()
  })
});

// Data Interface
interface ContentBlock {
  _id?: string;
  order: number;
  title: string;
  description: string;
}

interface ExploreNetworkItem {
  _id?: string;
  icon: string;
  heading: string;
  description: string;
  buttonText: string;
  link: string;
  display_order?: number;
}

interface PartneringInstitutionPageData {
  headerSection: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl?: string;
    heroVideoUrl?: string;
  };
  overviewSection: {
    title: string;
    description: string;
  };
  partnershipModelSection: {
    title: string;
    contentBlocks: ContentBlock[];
  };
  exploreNetworkSection: {
    title: string;
    items: ExploreNetworkItem[];
  };
  callToActionSection: {
    text: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
}

const PartneringInstitutions = () => {
  const [activeSection, setActiveSection] = useState('header');
  const [pageData, setPageData] = useState<PartneringInstitutionPageData>({
    headerSection: {
      title: 'Partnering with Educational Institutions',
      subtitle: 'Collective Working Through Partnerships',
      description: 'NEIEA adheres to the notion that transformative progression is only possible through collective, not singular, effort.',
      heroVideoUrl: ''
    },
    overviewSection: {
      title: 'Partnering with Educational Institutions – Overview',
      description: 'NEIEA adheres to the notion that transformative progression is only possible through a collective, and not a singular, effort. It implements the policy of collective working through multiple strategic approaches.'
    },
    partnershipModelSection: {
      title: 'Our Partnership Model',
      contentBlocks: [
        {
          order: 1,
          title: 'Partnership Relationship with Educational Institutions',
          description: 'NEIEA builds partnerships with educational institutions that seek to provide good quality education for their youth. There is a clear-cut division of work between NEIEA and its Partners. The Partnering institution helps enroll the students and takes care of their safety, establishing the building infrastructure and IT-enabled classroom. NEIEA\'s role is to develop course content for multiple subjects using Discourse Oriented Pedagogy, develop worksheets, and deliver LIVE classes on a regular basis.'
        },
        {
          order: 2,
          title: 'Affordable Service Model',
          description: 'NEIEA charges a very nominal amount for its services from the Partner, making quality education accessible and affordable for institutions.'
        },
        {
          order: 3,
          title: 'Parental Engagement and Progress Monitoring',
          description: 'NEIEA coordinates with the Partnering institution in reaching out to the Parents of its students, showing them monthly progress reports and building parental involvement and support in the teaching process. It also takes the help of a teacher provided by the Partner. This teacher is the class monitor or class coordinator who is entrusted with maintaining class decorum and following the instructions of the Mentor Teacher.'
        },
        {
          order: 4,
          title: 'Institutional Capacity Building',
          description: 'NEIEA builds institutional capacity of the Partnering institution by training its teachers in Pedagogy, Technology, Classroom Management, and English Proficiency.'
        }
      ]
    },
    exploreNetworkSection: {
      title: 'Explore Our Partnership Network',
      items: [
        {
          icon: '🤝',
          heading: 'Join NEIEA as a Partner',
          description: 'Become part of our educational transformation network and help us reach more students with quality education.',
          buttonText: 'Learn More',
          link: '/partners/join'
        },
        {
          icon: '🏫',
          heading: 'Partnering Institutions',
          description: 'Discover the educational institutions that are already part of our partnership network and their success stories.',
          buttonText: 'Explore',
          link: '/partners/institutions'
        },
        {
          icon: '🌍',
          heading: 'Global Partners',
          description: 'Meet our international partners who are helping us expand quality education across borders and cultures.',
          buttonText: 'View Partners',
          link: '/partners/global'
        }
      ]
    },
    callToActionSection: {
      text: 'Ready to Transform Education Together?',
      description: 'Join our network of educational partners and be part of the collective effort to provide quality education to students across India and beyond.',
      primaryButtonText: 'Become a Partner',
      primaryButtonLink: '/partners/join',
      secondaryButtonText: 'Contact Us',
      secondaryButtonLink: '/about-us/contact'
    }
  });

  const [loading, setLoading] = useState(true);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [blockForm, setBlockForm] = useState({ order: 1, title: '', description: '' });

  const [editingNetworkItem, setEditingNetworkItem] = useState<string | null>(null);
  const [isAddingNetworkItem, setIsAddingNetworkItem] = useState(false);
  const [networkItemForm, setNetworkItemForm] = useState({
    icon: '', heading: '', description: '', buttonText: '', link: ''
  });

  // Image upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load page data
  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/partnering-institution-page/admin');
      
      if (response.data.success && response.data.data) {
        setPageData(response.data.data);
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        console.log('No page data found - will be created on first save');
      } else {
        toast.error(err.response?.data?.message || 'Failed to load page data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('headerImage', file);

      const response = await axiosInstance.post('/partnering-institution-page/admin/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setPageData(prev => ({
          ...prev,
          headerSection: {
            ...prev.headerSection,
            imageUrl: response.data.data.imageUrl
          }
        }));
        toast.success('Image uploaded successfully! Click "Save All Changes" to save to database.');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleSaveAll = async () => {
    try {
      const dataToSave = {
        ...pageData,
        partnershipModelSection: {
          ...pageData.partnershipModelSection,
          contentBlocks: pageData.partnershipModelSection.contentBlocks.map((block, index) => ({
            ...block,
            order: index + 1
          }))
        },
        exploreNetworkSection: {
          ...pageData.exploreNetworkSection,
          items: pageData.exploreNetworkSection.items.map((item, index) => ({
            ...item,
            display_order: index
          }))
        }
      };
      
      // Validate
      const validationResult = partneringInstitutionPageSchema.safeParse(dataToSave);
      
      if (!validationResult.success) {
        const errors = validationResult.error.errors;
        const firstError = errors[0];
        const errorPath = firstError.path.join(' → ');
        toast.error(`Validation Error: ${errorPath ? errorPath + ': ' : ''}${firstError.message}`);
        return;
      }
      
      let response;
      
      try {
        response = await axiosInstance.put('/partnering-institution-page/admin', dataToSave);
      } catch (updateErr: any) {
        if (updateErr.response?.status === 404) {
          response = await axiosInstance.post('/partnering-institution-page/admin', dataToSave);
        } else {
          throw updateErr;
        }
      }
      
      if (response.data.success) {
        toast.success('Page saved successfully!');
        loadPageData();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save changes');
    }
  };

  // Content Block Functions
  const handleAddBlock = () => {
    setIsAddingBlock(true);
    const nextOrder = pageData.partnershipModelSection.contentBlocks.length + 1;
    setBlockForm({ order: nextOrder, title: '', description: '' });
  };

  const handleEditBlock = (block: ContentBlock, index: number) => {
    setEditingBlock(block._id || `temp-${index}`);
    setBlockForm({
      order: block.order,
      title: block.title,
      description: block.description
    });
  };

  const handleSaveBlock = () => {
    const validationResult = contentBlockSchema.safeParse(blockForm);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(`Validation Error: ${firstError.message}`);
      return;
    }

    if (editingBlock) {
      setPageData(prev => ({
        ...prev,
        partnershipModelSection: {
          ...prev.partnershipModelSection,
          contentBlocks: prev.partnershipModelSection.contentBlocks.map((b, idx) => {
            const blockId = b._id || `temp-${idx}`;
            return blockId === editingBlock ? { ...b, ...blockForm } : b;
          })
        }
      }));
      toast.success('Block updated locally. Click "Save All Changes" to save to database.');
    } else {
      setPageData(prev => ({
        ...prev,
        partnershipModelSection: {
          ...prev.partnershipModelSection,
          contentBlocks: [...prev.partnershipModelSection.contentBlocks, { ...blockForm }]
        }
      }));
      toast.success('Block added locally. Click "Save All Changes" to save to database.');
    }

    setEditingBlock(null);
    setIsAddingBlock(false);
    setBlockForm({ order: 1, title: '', description: '' });
  };

  const handleDeleteBlock = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this block?')) {
      setPageData(prev => ({
        ...prev,
        partnershipModelSection: {
          ...prev.partnershipModelSection,
          contentBlocks: prev.partnershipModelSection.contentBlocks.filter(b => b._id !== id)
        }
      }));
      toast.success('Block deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  // Network Item Functions
  const handleAddNetworkItem = () => {
    setIsAddingNetworkItem(true);
    setNetworkItemForm({ icon: '', heading: '', description: '', buttonText: '', link: '' });
  };

  const handleEditNetworkItem = (item: ExploreNetworkItem) => {
    setEditingNetworkItem(item._id || null);
    setNetworkItemForm({
      icon: item.icon,
      heading: item.heading,
      description: item.description,
      buttonText: item.buttonText,
      link: item.link
    });
  };

  const handleSaveNetworkItem = () => {
    const validationResult = exploreNetworkItemSchema.safeParse(networkItemForm);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(`Validation Error: ${firstError.message}`);
      return;
    }

    if (editingNetworkItem) {
      setPageData(prev => ({
        ...prev,
        exploreNetworkSection: {
          ...prev.exploreNetworkSection,
          items: prev.exploreNetworkSection.items.map(i =>
            i._id === editingNetworkItem ? { ...i, ...networkItemForm } : i
          )
        }
      }));
      toast.success('Item updated locally. Click "Save All Changes" to save to database.');
    } else {
      setPageData(prev => ({
        ...prev,
        exploreNetworkSection: {
          ...prev.exploreNetworkSection,
          items: [...prev.exploreNetworkSection.items, { ...networkItemForm }]
        }
      }));
      toast.success('Item added locally. Click "Save All Changes" to save to database.');
    }

    setEditingNetworkItem(null);
    setIsAddingNetworkItem(false);
    setNetworkItemForm({ icon: '', heading: '', description: '', buttonText: '', link: '' });
  };

  const handleDeleteNetworkItem = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setPageData(prev => ({
        ...prev,
        exploreNetworkSection: {
          ...prev.exploreNetworkSection,
          items: prev.exploreNetworkSection.items.filter(i => i._id !== id)
        }
      }));
      toast.success('Item deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  // Drag and Drop for Blocks
  const handleBlockDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleBlockDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
  };

  const handleBlockDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleBlockDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const blocks = [...pageData.partnershipModelSection.contentBlocks];
      const draggedItem = blocks[dragIndex];
      blocks.splice(dragIndex, 1);
      blocks.splice(dropIndex, 0, draggedItem);

      setPageData(prev => ({
        ...prev,
        partnershipModelSection: {
          ...prev.partnershipModelSection,
          contentBlocks: blocks
        }
      }));
      toast.success('Block order updated. Click "Save All Changes" to save to database.');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-700 text-lg">Loading Partnering Institutions Page Management...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Building2 className="w-8 h-8" />
            Manage Partnering Institutions Page
          </h1>
          <p className="text-gray-600">Update all content for the partnering institutions page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {['header', 'overview', 'partnership', 'explore', 'cta'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeSection === section
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Header Section */}
      {activeSection === 'header' && (
        <Card>
          <CardHeader>
            <CardTitle>Header Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <Input
                value={pageData.headerSection.title}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, title: e.target.value }
                }))}
                placeholder="Enter header title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <Input
                value={pageData.headerSection.subtitle}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, subtitle: e.target.value }
                }))}
                placeholder="Enter header subtitle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={pageData.headerSection.description}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, description: e.target.value }
                }))}
                placeholder="Enter header description"
                rows={4}
              />
            </div>
            
            {/* Image Upload Section */}
            <div className="border-t pt-4 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Header Image</label>
              
              {/* Image Preview */}
              {pageData.headerSection.imageUrl ? (
                <div className="mb-4 relative group">
                  <img 
                    src={pageData.headerSection.imageUrl} 
                    alt="Header preview" 
                    className="w-full h-64 object-contain rounded-lg border-2 border-gray-300 bg-gray-50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      Preview
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <p className="text-gray-500">No image uploaded yet</p>
                </div>
              )}
              
              {/* Upload Button */}
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
              <div className="flex items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  disabled={uploadingImage}
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {uploadingImage ? 'Uploading...' : pageData.headerSection.imageUrl ? 'Change Image' : 'Upload Image'}
                </Button>
                
                {pageData.headerSection.imageUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setPageData(prev => ({
                        ...prev,
                        headerSection: { ...prev.headerSection, imageUrl: undefined }
                      }));
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove Image
                  </Button>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Maximum file size: 2MB. Supported formats: JPG, PNG, GIF, WebP
              </p>
            </div>

            {/* Hero Video URL Section */}
            <div className="border-t pt-6 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Video URL (Optional)</label>
              <p className="text-xs text-gray-500 mb-3">
                If provided, video will replace the hero image. Supports YouTube, Vimeo, and direct video links.
                <br />
                Examples:
                <br />• YouTube: https://www.youtube.com/embed/VIDEO_ID
                <br />• Vimeo: https://vimeo.com/VIDEO_ID
                <br />• Direct: https://example.com/video.mp4
              </p>
              <Input
                type="url"
                value={pageData.headerSection.heroVideoUrl || ''}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    headerSection: { ...prev.headerSection, heroVideoUrl: e.target.value },
                  }))
                }
                placeholder="e.g., https://www.youtube.com/embed/VIDEO_ID"
                className="mb-2"
              />
              {pageData.headerSection.heroVideoUrl && (
                <Button
                  type="button"
                  onClick={() =>
                    setPageData((prev) => ({
                      ...prev,
                      headerSection: { ...prev.headerSection, heroVideoUrl: '' },
                    }))
                  }
                  variant="outline"
                  size="sm"
                >
                  Remove Video Link
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <Card>
          <CardHeader>
            <CardTitle>Overview Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <Input
                value={pageData.overviewSection.title}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  overviewSection: { ...prev.overviewSection, title: e.target.value }
                }))}
                placeholder="Enter overview title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={pageData.overviewSection.description}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  overviewSection: { ...prev.overviewSection, description: e.target.value }
                }))}
                placeholder="Enter overview description"
                rows={6}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Partnership Model Section */}
      {activeSection === 'partnership' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Partnership Model Section</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder content blocks</p>
            </div>
            <Button onClick={handleAddBlock} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Content Block
            </Button>
          </div>

          {/* Section Heading */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <Input
                value={pageData.partnershipModelSection.title}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  partnershipModelSection: { ...prev.partnershipModelSection, title: e.target.value }
                }))}
                placeholder="Enter section title"
              />
            </CardContent>
          </Card>

          {/* Add/Edit Block Form */}
          {(isAddingBlock || editingBlock) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingBlock ? 'Edit Content Block' : 'Add New Content Block'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order *</label>
                  <Input
                    type="number"
                    value={blockForm.order}
                    onChange={(e) => setBlockForm({...blockForm, order: parseInt(e.target.value) || 1})}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <Input
                    value={blockForm.title}
                    onChange={(e) => setBlockForm({...blockForm, title: e.target.value})}
                    placeholder="Enter block title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <Textarea
                    value={blockForm.description}
                    onChange={(e) => setBlockForm({...blockForm, description: e.target.value})}
                    placeholder="Enter block description"
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveBlock} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingBlock ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={() => {
                    setEditingBlock(null);
                    setIsAddingBlock(false);
                    setBlockForm({ order: 1, title: '', description: '' });
                  }} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Blocks List */}
          <div className="space-y-4">
            {pageData.partnershipModelSection.contentBlocks.map((block, index) => (
              <Card
                key={block._id || index}
                className="hover:shadow-lg transition-shadow cursor-move"
                draggable
                onDragStart={(e) => handleBlockDragStart(e, index)}
                onDragEnd={handleBlockDragEnd}
                onDragOver={handleBlockDragOver}
                onDrop={(e) => handleBlockDrop(e, index)}
              >
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
                  <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
                  <div className="text-xs text-gray-500 font-medium">#{index + 1}</div>
                </div>

                <CardContent className="p-4 pt-8">
                  <div className="mb-3 text-sm font-medium text-gray-500">Block #{block.order}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{block.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{block.description}</p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditBlock(block, index)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteBlock(block._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Explore Network Section */}
      {activeSection === 'explore' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Explore Network Section</h2>
            <Button onClick={handleAddNetworkItem} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Network Item
            </Button>
          </div>

          {/* Section Heading */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <Input
                value={pageData.exploreNetworkSection.title}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  exploreNetworkSection: { ...prev.exploreNetworkSection, title: e.target.value }
                }))}
                placeholder="Enter section title"
              />
            </CardContent>
          </Card>

          {/* Add/Edit Network Item Form */}
          {(isAddingNetworkItem || editingNetworkItem) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingNetworkItem ? 'Edit Network Item' : 'Add New Network Item'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji) *</label>
                    <Input
                      value={networkItemForm.icon}
                      onChange={(e) => setNetworkItemForm({...networkItemForm, icon: e.target.value})}
                      placeholder="Enter emoji (e.g., 🤝)"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Heading *</label>
                    <Input
                      value={networkItemForm.heading}
                      onChange={(e) => setNetworkItemForm({...networkItemForm, heading: e.target.value})}
                      placeholder="Enter heading"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <Textarea
                    value={networkItemForm.description}
                    onChange={(e) => setNetworkItemForm({...networkItemForm, description: e.target.value})}
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Button Text *</label>
                    <Input
                      value={networkItemForm.buttonText}
                      onChange={(e) => setNetworkItemForm({...networkItemForm, buttonText: e.target.value})}
                      placeholder="Enter button text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link *</label>
                    <Input
                      value={networkItemForm.link}
                      onChange={(e) => setNetworkItemForm({...networkItemForm, link: e.target.value})}
                      placeholder="Enter link (e.g., /partners/join)"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveNetworkItem} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingNetworkItem ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={() => {
                    setEditingNetworkItem(null);
                    setIsAddingNetworkItem(false);
                    setNetworkItemForm({ icon: '', heading: '', description: '', buttonText: '', link: '' });
                  }} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Network Items List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageData.exploreNetworkSection.items.map((item, index) => (
              <Card key={item._id || index}>
                <CardContent className="p-4">
                  <div className="text-4xl mb-3 text-center">{item.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">{item.heading}</h3>
                  <p className="text-sm text-gray-600 mb-4 text-center">{item.description}</p>
                  <div className="text-center text-blue-600 font-medium mb-4">{item.buttonText}</div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditNetworkItem(item)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteNetworkItem(item._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action Section */}
      {activeSection === 'cta' && (
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading Text</label>
              <Input
                value={pageData.callToActionSection.text}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, text: e.target.value }
                }))}
                placeholder="Enter heading text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={pageData.callToActionSection.description}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, description: e.target.value }
                }))}
                placeholder="Enter description"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
                <Input
                  value={pageData.callToActionSection.primaryButtonText}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    callToActionSection: { ...prev.callToActionSection, primaryButtonText: e.target.value }
                  }))}
                  placeholder="Enter button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Link</label>
                <Input
                  value={pageData.callToActionSection.primaryButtonLink}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    callToActionSection: { ...prev.callToActionSection, primaryButtonLink: e.target.value }
                  }))}
                  placeholder="Enter link"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text (Optional)</label>
                <Input
                  value={pageData.callToActionSection.secondaryButtonText || ''}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    callToActionSection: { ...prev.callToActionSection, secondaryButtonText: e.target.value }
                  }))}
                  placeholder="Enter button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link (Optional)</label>
                <Input
                  value={pageData.callToActionSection.secondaryButtonLink || ''}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    callToActionSection: { ...prev.callToActionSection, secondaryButtonLink: e.target.value }
                  }))}
                  placeholder="Enter link"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PartneringInstitutions;
