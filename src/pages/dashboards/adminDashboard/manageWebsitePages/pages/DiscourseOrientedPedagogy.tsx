import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, BookOpen, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';

// Zod Validation Schemas (Lenient - No strict validation for features and resources)
const keyFeatureSchema = z.object({
  _id: z.string().optional(),
  icon: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  image: z.string().optional(),
  display_order: z.number().optional()
});

const additionalResourceSchema = z.object({
  _id: z.string().optional(),
  icon: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  backgroundColor: z.string().optional(),
  display_order: z.number().optional()
});

const dopPageSchema = z.object({
  headerSection: z.object({
    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title must be less than 200 characters'),
    subtitle: z.string().optional(),
    shortDescription: z.string()
      .min(20, 'Short description must be at least 20 characters')
      .max(500, 'Short description must be less than 500 characters'),
    heroImage: z.string().optional(),
    heroVideoUrl: z.string().optional()
  }),
  introductionSection: z.object({
    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(3000, 'Description must be less than 3000 characters'),
    image: z.string().optional()
  }),
  founderSection: z.object({
    name: z.string()
      .min(3, 'Name must be at least 3 characters')
      .max(100, 'Name must be less than 100 characters'),
    title: z.string()
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must be less than 100 characters'),
    quote: z.string()
      .min(20, 'Quote must be at least 20 characters')
      .max(1000, 'Quote must be less than 1000 characters'),
    image: z.string().optional()
  }),
  keyFeaturesSection: z.object({
    title: z.string().optional(),
    features: z.array(keyFeatureSchema).optional()
  }),
  additionalResourcesSection: z.object({
    title: z.string().optional(),
    resources: z.array(additionalResourceSchema).optional()
  }),
  callToActionSection: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    primaryButtonText: z.string().optional(),
    primaryButtonLink: z.string().optional(),
    secondaryButtonText: z.string().optional(),
    secondaryButtonLink: z.string().optional()
  })
});

// TypeScript Interfaces
interface KeyFeature {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  subtitle?: string;
  image?: string;
  display_order?: number;
}

interface AdditionalResource {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
  backgroundColor?: string;
  display_order?: number;
}

interface DOPPageData {
  headerSection: {
    title: string;
    subtitle?: string;
    shortDescription: string;
    heroImage?: string;
    heroVideoUrl?: string;
  };
  introductionSection: {
    title: string;
    description: string;
    image?: string;
  };
  founderSection: {
    name: string;
    title: string;
    quote: string;
    image?: string;
  };
  keyFeaturesSection: {
    title: string;
    features: KeyFeature[];
  };
  additionalResourcesSection: {
    title: string;
    resources: AdditionalResource[];
  };
  callToActionSection: {
    title: string;
    description: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
}

const DiscourseOrientedPedagogy = () => {
  const [activeSection, setActiveSection] = useState('header');
  const [dopData, setDopData] = useState<DOPPageData>({
    headerSection: {
      title: 'Discourse-Oriented Pedagogy (DOP)',
      subtitle: 'By Syed Danish Ali',
      shortDescription: 'A transformative approach to learning developed by Dr. K. N. Anandan - Empowering learners through communication, creativity, and critical thinking.',
      heroImage: '/assets/images/DOP_Images/Picture7.png',
      heroVideoUrl: ''
    },
    introductionSection: {
      title: 'Introduction to Discourse-Oriented Pedagogy (DOP)',
      description: 'DOP is a progressive, learner-centred teaching model aimed at enhancing the educational experience by emphasising the importance of discourse as a dynamic tool for critical thinking and self-expression across all subjects.\n\nUnlike traditional methods that often prioritise rote memorisation of facts or formulas, DOP encourages students to engage with the subject matter in meaningful ways. This engagement includes expressing their ideas and opinions clearly, engaging in scientific argumentation, participating in mathematical problem-solving discussions, and debating historical themes.\n\nUltimately, DOP equips learners with essential communication skills that are vital for success both in academic settings and in everyday interactions. Developed by Dr. K. N. Anandan, one of the co-founders of NEIEA, this transformative approach to learning fosters deeper understanding, critical thinking and collaboration among students.',
      image: '/assets/images/DOP_Images/Picture8.png'
    },
    founderSection: {
      name: 'Dr. K.N. Anandan',
      title: 'Co-Founder & Educational Visionary',
      quote: 'I feel sad and even annoyed when I hear teachers and parents complaining about the poor performance standards of students in English. \'This is unfair,\' I would say to myself. \'Have we ever asked those kids to communicate their ideas? No. All that we have done is teach them bits and fragments of English in terms of discrete sounds, words and sentences.',
      image: '/assets/images/DOP_Images/Picture2.png'
    },
    keyFeaturesSection: {
      title: 'Key Features of DOP',
      features: [
        {
          icon: '🌍',
          title: 'Real-World Triggers',
          description: 'DOP uses images, videos, texts, situations, or objects related to the real world to spark curiosity and initiate discussion related to the curriculum. These triggers help students connect learning to everyday life, making classroom interaction more meaningful and engaging.',
          subtitle: 'Lessons begin with relatable prompts—images, videos, questions, headlines—that stimulate thinking.',
          image: '/assets/images/DOP_Images/Picture1.png'
        },
        {
          icon: '🧠',
          title: 'Critical Thinking',
          description: 'DOP promotes critical thinking by encouraging students to analyse and express their ideas rather than just memorise and regurgitate textbook answers. Students are provided with real-life scenarios and open-ended questions to think critically and express their viewpoints.',
          subtitle: 'Here is an example demonstrating how students engage in debates sparked by the mentor teacher, encouraging critical thinking rather than rote memorisation of answers.',
          image: '/assets/images/DOP_Images/Picture2.png'
        },
        {
          icon: '🤝',
          title: 'Collaborative Learning',
          description: 'In DOP, students learn by thinking, speaking, and problem-solving together. Through group discussions, pair work, and shared tasks, learners co-construct answers, listen to diverse viewpoints, and strengthen both communication and critical thinking skills.',
          subtitle: '',
          image: '/assets/images/DOP_Images/Picture3.png'
        },
        {
          icon: '🔗',
          title: 'Integrated Skills',
          description: 'DOP promotes the natural integration of listening, speaking, reading, and writing. Rather than teaching these skills in isolation, DOP engages learners in real-life tasks that develop language holistically, supporting deeper understanding and long-term retention.',
          subtitle: 'Listening, speaking, reading, and writing are taught together for deeper learning.',
          image: '/assets/images/DOP_Images/Picture4.png'
        },
        {
          icon: '🌐',
          title: 'Multilingual Scaffolding',
          description: 'DOP recognises learners\' home languages as a valuable resource. By allowing strategic use of mother tongues alongside English, teachers create a supportive bridge that helps students grasp complex ideas and gain confidence in expressing themselves in a new language.',
          subtitle: '',
          image: '/assets/images/DOP_Images/Picture5.png'
        },
        {
          icon: '🪞',
          title: 'Critical Reflection',
          description: 'DOP creates space for learners to reflect on their thought processes, learning choices, and peer interactions through classroom feedback, mentor guidance, and peer suggestions. This encourages them to develop self-awareness, take ownership of their learning, and grow into independent, reflective thinkers.',
          subtitle: '',
          image: '/assets/images/DOP_Images/Picture6.png'
        }
      ]
    },
    additionalResourcesSection: {
      title: 'Additional Resources',
      resources: [
        {
          icon: '🚀',
          title: 'Why DOP is Disruptive',
          description: 'Discover how DOP transforms traditional education through innovative, transformative, and futuristic approaches.',
          ctaText: 'Learn More',
          ctaLink: '#',
          backgroundColor: '#06038F'
        },
        {
          icon: '💬',
          title: 'Generating Discourse',
          description: 'Learn practical strategies for generating meaningful discourse in English courses and language learning.',
          ctaText: 'Explore Methods',
          ctaLink: '#',
          backgroundColor: '#28a745'
        },
        {
          icon: '📚',
          title: 'Modular Transaction',
          description: 'Access comprehensive modular transaction modules designed for effective DOP implementation.',
          ctaText: 'View Modules',
          ctaLink: '#',
          backgroundColor: '#fd7e14'
        }
      ]
    },
    callToActionSection: {
      title: 'Ready to Transform Education with DOP?',
      description: 'Discover how Discourse-Oriented Pedagogy can revolutionize your teaching approach and empower students with critical thinking and communication skills.',
      primaryButtonText: 'Get Started with DOP',
      primaryButtonLink: '/about-us/contact',
      secondaryButtonText: 'Watch Demo Videos',
      secondaryButtonLink: '#'
    }
  });

  const [loading, setLoading] = useState(true);
  const [editingFeature, setEditingFeature] = useState<string | null>(null);
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [featureForm, setFeatureForm] = useState<Partial<KeyFeature>>({ icon: '', title: '', description: '', subtitle: '', image: '' });
  
  const [editingResource, setEditingResource] = useState<string | null>(null);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [resourceForm, setResourceForm] = useState<Partial<AdditionalResource>>({ icon: '', title: '', description: '', ctaText: '', ctaLink: '', backgroundColor: '#06038F' });
  
  // Image upload state
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [uploadingIntroImage, setUploadingIntroImage] = useState(false);
  const [uploadingFounderImage, setUploadingFounderImage] = useState(false);
  const [uploadingFeatureImage, setUploadingFeatureImage] = useState<string | null>(null); // Stores feature _id being uploaded
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  const introImageInputRef = useRef<HTMLInputElement>(null);
  const founderImageInputRef = useRef<HTMLInputElement>(null);
  const featureImageInputRef = useRef<HTMLInputElement>(null);

  // Load DOP data
  useEffect(() => {
    console.log('DOP component mounted, loading data...');
    loadDOPData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDOPData = async () => {
    try {
      console.log('Loading DOP data...');
      setLoading(true);
      
      const response = await axiosInstance.get('/admin/discourse-oriented-pedagogy-page');
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        
        // Auto-assign display_order if needed
        if (data.keyFeaturesSection?.features) {
          const needsOrderFix = data.keyFeaturesSection.features.some(
            (feature: KeyFeature) => feature.display_order === undefined || feature.display_order === 0
          );
          
          if (needsOrderFix) {
            data.keyFeaturesSection.features = data.keyFeaturesSection.features.map((feature: KeyFeature, index: number) => ({
              ...feature,
              display_order: index
            }));
          }
        }

        if (data.additionalResourcesSection?.resources) {
          const needsOrderFix = data.additionalResourcesSection.resources.some(
            (resource: AdditionalResource) => resource.display_order === undefined || resource.display_order === 0
          );
          
          if (needsOrderFix) {
            data.additionalResourcesSection.resources = data.additionalResourcesSection.resources.map((resource: AdditionalResource, index: number) => ({
              ...resource,
              display_order: index
            }));
          }
        }
        
        setDopData(data);
        console.log('DOP data loaded successfully');
      } else {
        console.log('No DOP page data found');
      }
    } catch (err: any) {
      console.error('Error loading DOP data:', err);
      if (err.response?.status === 404) {
        console.log('No DOP page found - will be created on first save');
      } else {
        toast.error(err.response?.data?.message || 'Failed to load DOP page data');
      }
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  // ========================= IMAGE UPLOAD HANDLERS =========================
  
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setUploadingHeroImage(true);
      const formData = new FormData();
      formData.append('heroImage', file);

      const response = await axiosInstance.post('/admin/discourse-oriented-pedagogy-page/upload-hero-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setDopData(prev => ({
          ...prev,
          headerSection: {
            ...prev.headerSection,
            heroImage: response.data.data.imageUrl
          }
        }));
        toast.success('Hero image uploaded successfully! Click "Save All Changes" to save to database.');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload hero image');
    } finally {
      setUploadingHeroImage(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleIntroductionImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setUploadingIntroImage(true);
      const formData = new FormData();
      formData.append('introductionImage', file);

      const response = await axiosInstance.post('/admin/discourse-oriented-pedagogy-page/upload-introduction-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setDopData(prev => ({
          ...prev,
          introductionSection: {
            ...prev.introductionSection,
            image: response.data.data.imageUrl
          }
        }));
        toast.success('Introduction image uploaded successfully! Click "Save All Changes" to save to database.');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload introduction image');
    } finally {
      setUploadingIntroImage(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleFounderImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setUploadingFounderImage(true);
      const formData = new FormData();
      formData.append('founderImage', file);

      const response = await axiosInstance.post('/admin/discourse-oriented-pedagogy-page/upload-founder-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setDopData(prev => ({
          ...prev,
          founderSection: {
            ...prev.founderSection,
            image: response.data.data.imageUrl
          }
        }));
        toast.success('Founder image uploaded successfully! Click "Save All Changes" to save to database.');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload founder image');
    } finally {
      setUploadingFounderImage(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleFeatureImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, featureId: string) => {
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
      setUploadingFeatureImage(featureId);
      const formData = new FormData();
      formData.append('featureImage', file);

      const response = await axiosInstance.post('/admin/discourse-oriented-pedagogy-page/upload-feature-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        // Update the specific feature's image
        setDopData(prev => ({
          ...prev,
          keyFeaturesSection: {
            ...prev.keyFeaturesSection,
            features: (prev.keyFeaturesSection.features || []).map(feature =>
              feature._id === featureId
                ? { ...feature, image: response.data.data.imageUrl }
                : feature
            )
          }
        }));
        
        // If editing in the form, update the form as well
        if (editingFeature === featureId || isAddingFeature) {
          setFeatureForm(prev => ({
            ...prev,
            image: response.data.data.imageUrl
          }));
        }
        
        toast.success('Feature image uploaded successfully! Click "Save All Changes" to save to database.');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload feature image');
    } finally {
      setUploadingFeatureImage(null);
      // Reset input
      e.target.value = '';
    }
  };

  // ========================= CRUD HANDLERS =========================

  const handleSaveAll = async () => {
    try {
      console.log('Saving DOP page data:', dopData);
      console.log('Resources before save:', dopData.additionalResourcesSection.resources);
      
      // Add display_order to features and resources (lenient - no required fields)
      const dataToSave = {
        ...dopData,
        keyFeaturesSection: {
          ...dopData.keyFeaturesSection,
          features: (dopData.keyFeaturesSection.features || []).map((feature, index) => ({
            ...feature,
            display_order: index
          }))
        },
        additionalResourcesSection: {
          ...dopData.additionalResourcesSection,
          resources: (dopData.additionalResourcesSection.resources || []).map((resource, index) => ({
            ...resource,
            display_order: index
          }))
        }
      };
      
      // Validate the data (lenient validation - only checking structure)
      const validationResult = dopPageSchema.safeParse(dataToSave);
      
      if (!validationResult.success) {
        const errors = validationResult.error.errors;
        console.error('Validation errors:', errors);
        
        const firstError = errors[0];
        const errorPath = firstError.path.join(' → ');
        toast.error(`Validation Error: ${errorPath ? errorPath + ': ' : ''}${firstError.message}`);
        
        errors.forEach((error) => {
          console.error(`${error.path.join('.')}: ${error.message}`);
        });
        
        return;
      }
      
      let response;
      
      try {
        response = await axiosInstance.put('/admin/discourse-oriented-pedagogy-page', dataToSave);
      } catch (updateErr: any) {
        if (updateErr.response?.status === 404) {
          console.log('DOP page not found, creating new one...');
          response = await axiosInstance.post('/admin/discourse-oriented-pedagogy-page', dataToSave);
        } else {
          throw updateErr;
        }
      }
      
      if (response.data.success) {
        toast.success('DOP page saved successfully!');
        loadDOPData();
      } else {
        toast.error('Failed to save changes');
      }
    } catch (err: any) {
      console.error('Error saving DOP data:', err);
      toast.error(err.response?.data?.message || 'Failed to save changes');
    }
  };

  // Feature Functions
  const handleAddFeature = () => {
    setIsAddingFeature(true);
    setFeatureForm({ icon: '', title: '', description: '', subtitle: '', image: '' });
  };

  const handleEditFeature = (feature: KeyFeature) => {
    setEditingFeature(feature._id || null);
    setFeatureForm({
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      subtitle: feature.subtitle || '',
      image: feature.image || ''
    });
  };

  const handleSaveFeature = () => {
    // No validation - allow any input
    if (editingFeature) {
      setDopData(prev => ({
        ...prev,
        keyFeaturesSection: {
          ...prev.keyFeaturesSection,
          features: prev.keyFeaturesSection.features.map(f =>
            f._id === editingFeature ? { ...f, ...featureForm } : f
          )
        }
      }));
      toast.success('Feature updated locally. Click "Save All Changes" to save to database.');
    } else {
      setDopData(prev => ({
        ...prev,
        keyFeaturesSection: {
          ...prev.keyFeaturesSection,
          features: [...prev.keyFeaturesSection.features, { ...featureForm } as KeyFeature]
        }
      }));
      toast.success('Feature added locally. Click "Save All Changes" to save to database.');
    }

    setEditingFeature(null);
    setIsAddingFeature(false);
    setFeatureForm({ icon: '', title: '', description: '', subtitle: '', image: '' });
  };

  const handleDeleteFeature = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      setDopData(prev => ({
        ...prev,
        keyFeaturesSection: {
          ...prev.keyFeaturesSection,
          features: prev.keyFeaturesSection.features.filter(f => f._id !== id)
        }
      }));
      toast.success('Feature deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  const handleCancelFeature = () => {
    setEditingFeature(null);
    setIsAddingFeature(false);
    setFeatureForm({ icon: '', title: '', description: '', subtitle: '', image: '' });
  };

  // Resource Functions
  const handleAddResource = () => {
    setIsAddingResource(true);
    setResourceForm({ icon: '', title: '', description: '', ctaText: '', ctaLink: '', backgroundColor: '#06038F' });
  };

  const handleEditResource = (resource: AdditionalResource) => {
    setEditingResource(resource._id || null);
    setResourceForm({
      icon: resource.icon,
      title: resource.title,
      description: resource.description,
      ctaText: resource.ctaText,
      ctaLink: resource.ctaLink || '',
      backgroundColor: resource.backgroundColor || '#06038F'
    });
  };

  const handleSaveResource = () => {
    // No validation - allow any input
    if (editingResource) {
      setDopData(prev => ({
        ...prev,
        additionalResourcesSection: {
          ...prev.additionalResourcesSection,
          resources: prev.additionalResourcesSection.resources.map(r =>
            r._id === editingResource ? { ...r, ...resourceForm } : r
          )
        }
      }));
      toast.success('Resource updated locally. Click "Save All Changes" to save to database.');
    } else {
      setDopData(prev => ({
        ...prev,
        additionalResourcesSection: {
          ...prev.additionalResourcesSection,
          resources: [...prev.additionalResourcesSection.resources, { ...resourceForm } as AdditionalResource]
        }
      }));
      toast.success('Resource added locally. Click "Save All Changes" to save to database.');
    }

    setEditingResource(null);
    setIsAddingResource(false);
    setResourceForm({ icon: '', title: '', description: '', ctaText: '', ctaLink: '', backgroundColor: '#06038F' });
  };

  const handleDeleteResource = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setDopData(prev => ({
        ...prev,
        additionalResourcesSection: {
          ...prev.additionalResourcesSection,
          resources: prev.additionalResourcesSection.resources.filter(r => r._id !== id)
        }
      }));
      toast.success('Resource deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  const handleCancelResource = () => {
    setEditingResource(null);
    setIsAddingResource(false);
    setResourceForm({ icon: '', title: '', description: '', ctaText: '', ctaLink: '', backgroundColor: '#06038F' });
  };

  // Drag and Drop for Features
  const handleFeatureDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleFeatureDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
  };

  const handleFeatureDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFeatureDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const features = [...dopData.keyFeaturesSection.features];
      const draggedItem = features[dragIndex];
      features.splice(dragIndex, 1);
      features.splice(dropIndex, 0, draggedItem);

      setDopData(prev => ({
        ...prev,
        keyFeaturesSection: {
          ...prev.keyFeaturesSection,
          features
        }
      }));
      toast.success('Feature order updated. Click "Save All Changes" to save to database.');
    }
  };

  // Drag and Drop for Resources
  const handleResourceDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleResourceDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
  };

  const handleResourceDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleResourceDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const resources = [...dopData.additionalResourcesSection.resources];
      const draggedItem = resources[dragIndex];
      resources.splice(dragIndex, 1);
      resources.splice(dropIndex, 0, draggedItem);

      setDopData(prev => ({
        ...prev,
        additionalResourcesSection: {
          ...prev.additionalResourcesSection,
          resources
        }
      }));
      toast.success('Resource order updated. Click "Save All Changes" to save to database.');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-700 text-lg">Loading DOP Page Management...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Manage Discourse Oriented Pedagogy Page
          </h1>
          <p className="text-gray-600">Update all content for the DOP page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {['header', 'introduction', 'founder', 'features', 'resources', 'cta'].map((section) => (
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Page Title
              </label>
              <Input
                value={dopData.headerSection.title}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, title: e.target.value }
                }))}
                placeholder="Enter page title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <Input
                value={dopData.headerSection.subtitle || ''}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, subtitle: e.target.value }
                }))}
                placeholder="Enter subtitle (e.g., By Author Name)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <Textarea
                value={dopData.headerSection.shortDescription}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, shortDescription: e.target.value }
                }))}
                placeholder="Enter short description"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Image
              </label>
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
              <div className="space-y-3">
                {/* Current Image Preview */}
                {dopData.headerSection.heroImage && (
                  <div className="relative inline-block">
                    <img
                      src={dopData.headerSection.heroImage}
                      alt="Hero Image"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                
                {/* Upload Button */}
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={heroImageInputRef}
                    onChange={handleHeroImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => heroImageInputRef.current?.click()}
                    disabled={uploadingHeroImage}
                    variant="outline"
                    size="sm"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingHeroImage ? 'Uploading...' : 'Upload New Image'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Video URL (Optional)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                If provided, video will replace the hero image. Supports: YouTube, Vimeo, or direct video links (MP4, WebM, etc.)
              </p>
              <Input
                type="url"
                value={dopData.headerSection.heroVideoUrl || ''}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, heroVideoUrl: e.target.value }
                }))}
                placeholder="e.g., https://www.youtube.com/embed/VIDEO_ID or https://example.com/video.mp4"
              />
              {dopData.headerSection.heroVideoUrl && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDopData(prev => ({
                      ...prev,
                      headerSection: { ...prev.headerSection, heroVideoUrl: '' }
                    }));
                  }}
                  className="mt-3 text-red-600 hover:text-red-700"
                  size="sm"
                >
                  Remove Video Link
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Introduction Section */}
      {activeSection === 'introduction' && (
        <Card>
          <CardHeader>
            <CardTitle>Introduction Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <Input
                value={dopData.introductionSection.title}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  introductionSection: { ...prev.introductionSection, title: e.target.value }
                }))}
                placeholder="Enter section title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={dopData.introductionSection.description}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  introductionSection: { ...prev.introductionSection, description: e.target.value }
                }))}
                placeholder="Enter introduction description"
                rows={8}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Introduction Image (Optional)
              </label>
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
              <div className="space-y-3">
                {/* Current Image Preview */}
                {dopData.introductionSection.image && (
                  <div className="relative inline-block">
                    <img
                      src={dopData.introductionSection.image}
                      alt="Introduction"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                
                {/* Upload Button */}
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={introImageInputRef}
                    onChange={handleIntroductionImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => introImageInputRef.current?.click()}
                    disabled={uploadingIntroImage}
                    variant="outline"
                    size="sm"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingIntroImage ? 'Uploading...' : 'Upload New Image'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Founder Section */}
      {activeSection === 'founder' && (
        <Card>
          <CardHeader>
            <CardTitle>Founder Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  value={dopData.founderSection.name}
                  onChange={(e) => setDopData(prev => ({
                    ...prev,
                    founderSection: { ...prev.founderSection, name: e.target.value }
                  }))}
                  placeholder="Enter founder name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  value={dopData.founderSection.title}
                  onChange={(e) => setDopData(prev => ({
                    ...prev,
                    founderSection: { ...prev.founderSection, title: e.target.value }
                  }))}
                  placeholder="Enter title (e.g., Co-Founder)"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quote
              </label>
              <Textarea
                value={dopData.founderSection.quote}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  founderSection: { ...prev.founderSection, quote: e.target.value }
                }))}
                placeholder="Enter founder quote"
                rows={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Founder Image (Optional)
              </label>
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 400x400px (square), Max 2MB, JPG/PNG/WebP format</p>
              <div className="space-y-3">
                {/* Current Image Preview */}
                {dopData.founderSection.image && (
                  <div className="relative inline-block">
                    <img
                      src={dopData.founderSection.image}
                      alt="Founder"
                      className="w-32 h-32 object-cover rounded-full border-2 border-gray-200"
                    />
                  </div>
                )}
                
                {/* Upload Button */}
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={founderImageInputRef}
                    onChange={handleFounderImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => founderImageInputRef.current?.click()}
                    disabled={uploadingFounderImage}
                    variant="outline"
                    size="sm"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingFounderImage ? 'Uploading...' : 'Upload New Image'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Features Section */}
      {activeSection === 'features' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Key Features</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder features</p>
            </div>
            <Button onClick={handleAddFeature} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </div>

          {/* Section Title */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <Input
                value={dopData.keyFeaturesSection.title}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  keyFeaturesSection: { ...prev.keyFeaturesSection, title: e.target.value }
                }))}
                placeholder="Enter section title"
              />
            </CardContent>
          </Card>

          {/* Add/Edit Form */}
          {(isAddingFeature || editingFeature) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingFeature ? 'Edit Feature' : 'Add New Feature'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji) *
                    </label>
                    <Input
                      value={featureForm.icon || ''}
                      onChange={(e) => setFeatureForm({...featureForm, icon: e.target.value})}
                      placeholder="Enter emoji (e.g., 🌍)"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input
                      value={featureForm.title || ''}
                      onChange={(e) => setFeatureForm({...featureForm, title: e.target.value})}
                      placeholder="Enter feature title"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    value={featureForm.description || ''}
                    onChange={(e) => setFeatureForm({...featureForm, description: e.target.value})}
                    placeholder="Enter feature description"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle (Optional)
                  </label>
                  <Textarea
                    value={featureForm.subtitle || ''}
                    onChange={(e) => setFeatureForm({...featureForm, subtitle: e.target.value})}
                    placeholder="Enter subtitle or additional note"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feature Image (Optional)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                  <div className="space-y-3">
                    {/* Current Image Preview */}
                    {featureForm.image && (
                      <div className="relative inline-block">
                        <img
                          src={featureForm.image}
                          alt="Feature preview"
                          className="w-full max-w-sm h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                    
                    {/* Upload Button */}
                    {editingFeature && (
                      <div className="flex gap-2">
                        <input
                          type="file"
                          ref={featureImageInputRef}
                          onChange={(e) => handleFeatureImageUpload(e, editingFeature)}
                          accept="image/*"
                          className="hidden"
                        />
                        <Button
                          type="button"
                          onClick={() => featureImageInputRef.current?.click()}
                          disabled={uploadingFeatureImage === editingFeature}
                          variant="outline"
                          size="sm"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {uploadingFeatureImage === editingFeature ? 'Uploading...' : 'Upload Image'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveFeature} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingFeature ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelFeature} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features List */}
          <div className="grid grid-cols-1 gap-4">
            {dopData.keyFeaturesSection.features.map((feature, index) => (
              <Card
                key={feature._id || index}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleFeatureDragStart(e, index)}
                onDragEnd={handleFeatureDragEnd}
                onDragOver={handleFeatureDragOver}
                onDrop={(e) => handleFeatureDrop(e, index)}
              >
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center">
                    <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
                    <div className="text-xs text-gray-500 font-medium">
                      #{index + 1}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 pt-8">
                  <div className="flex items-start">
                    <div className="text-3xl mr-3">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                      {feature.subtitle && (
                        <p className="text-xs text-gray-500 italic mb-2">{feature.subtitle}</p>
                      )}
                      {feature.image && (
                        <div className="mb-2">
                          <img src={feature.image} alt={feature.title} className="max-h-20 rounded" />
                        </div>
                      )}
                      <div className="flex space-x-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditFeature(feature)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteFeature(feature._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Additional Resources Section */}
      {activeSection === 'resources' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Additional Resources</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder resources</p>
            </div>
            <Button onClick={handleAddResource} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </div>

          {/* Section Title */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <Input
                value={dopData.additionalResourcesSection.title}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  additionalResourcesSection: { ...prev.additionalResourcesSection, title: e.target.value }
                }))}
                placeholder="Enter section title"
              />
            </CardContent>
          </Card>

          {/* Add/Edit Form */}
          {(isAddingResource || editingResource) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingResource ? 'Edit Resource' : 'Add New Resource'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji) *
                    </label>
                    <Input
                      value={resourceForm.icon || ''}
                      onChange={(e) => setResourceForm({...resourceForm, icon: e.target.value})}
                      placeholder="Enter emoji (e.g., 🚀)"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input
                      value={resourceForm.title || ''}
                      onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})}
                      placeholder="Enter resource title"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    value={resourceForm.description || ''}
                    onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                    placeholder="Enter resource description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CTA Button Text *
                    </label>
                    <Input
                      value={resourceForm.ctaText || ''}
                      onChange={(e) => setResourceForm({...resourceForm, ctaText: e.target.value})}
                      placeholder="Enter button text (e.g., Learn More)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CTA Button Link
                    </label>
                    <Input
                      value={resourceForm.ctaLink || ''}
                      onChange={(e) => setResourceForm({...resourceForm, ctaLink: e.target.value})}
                      placeholder="Enter link URL (e.g., #)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color (Hex)
                  </label>
                  <Input
                    value={resourceForm.backgroundColor || ''}
                    onChange={(e) => setResourceForm({...resourceForm, backgroundColor: e.target.value})}
                    placeholder="Enter color (e.g., #06038F)"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveResource} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingResource ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelResource} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resources List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dopData.additionalResourcesSection.resources.map((resource, index) => (
              <Card
                key={resource._id || index}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleResourceDragStart(e, index)}
                onDragEnd={handleResourceDragEnd}
                onDragOver={handleResourceDragOver}
                onDrop={(e) => handleResourceDrop(e, index)}
              >
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center">
                    <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
                    <div className="text-xs text-gray-500 font-medium">
                      #{index + 1}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 pt-8 text-center">
                  <div 
                    className="text-3xl mb-3 w-14 h-14 rounded-full flex items-center justify-center mx-auto"
                    style={{ backgroundColor: resource.backgroundColor || '#06038F', color: 'white' }}
                  >
                    {resource.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                  <p className="text-xs text-blue-600 font-medium mb-3">{resource.ctaText} →</p>
                  <div className="flex space-x-2 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditResource(resource)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteResource(resource._id)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                value={dopData.callToActionSection.title}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, title: e.target.value }
                }))}
                placeholder="Enter CTA title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={dopData.callToActionSection.description}
                onChange={(e) => setDopData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, description: e.target.value }
                }))}
                placeholder="Enter CTA description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Button Text
                </label>
                <Input
                  value={dopData.callToActionSection.primaryButtonText || ''}
                  onChange={(e) => setDopData(prev => ({
                    ...prev,
                    callToActionSection: { ...prev.callToActionSection, primaryButtonText: e.target.value }
                  }))}
                  placeholder="Enter primary button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Button Link
                </label>
                <Input
                  value={dopData.callToActionSection.primaryButtonLink || ''}
                  onChange={(e) => setDopData(prev => ({
                    ...prev,
                    callToActionSection: { ...prev.callToActionSection, primaryButtonLink: e.target.value }
                  }))}
                  placeholder="Enter primary button URL"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Button Text
                </label>
                <Input
                  value={dopData.callToActionSection.secondaryButtonText || ''}
                  onChange={(e) => setDopData(prev => ({
                    ...prev,
                    callToActionSection: { ...prev.callToActionSection, secondaryButtonText: e.target.value }
                  }))}
                  placeholder="Enter secondary button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Button Link
                </label>
                <Input
                  value={dopData.callToActionSection.secondaryButtonLink || ''}
                  onChange={(e) => setDopData(prev => ({
                    ...prev,
                    callToActionSection: { ...prev.callToActionSection, secondaryButtonLink: e.target.value }
                  }))}
                  placeholder="Enter secondary button URL"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiscourseOrientedPedagogy;

