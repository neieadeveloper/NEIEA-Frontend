import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';
import ImageUpload from '@/components/ui/image-upload';

// Zod Validation Schemas
const programFeatureSchema = z.object({
  _id: z.string().optional(),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  level: z.string()
    .min(1, 'Level is required')
    .max(100, 'Level must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  modules: z.array(z.string())
    .min(1, 'At least one module is required')
    .max(20, 'Maximum 20 modules allowed'),
  outcome: z.string()
    .min(5, 'Outcome must be at least 5 characters')
    .max(200, 'Outcome must be less than 200 characters'),
  display_order: z.number().optional()
});

const challengeItemSchema = z.object({
  _id: z.string().optional(),
  icon: z.string()
    .min(1, 'Icon is required')
    .max(10, 'Icon should be 1-2 characters (emoji)'),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  display_order: z.number().optional()
});

const partnershipSchema = z.object({
  _id: z.string().optional(),
  icon: z.string()
    .min(1, 'Icon is required')
    .max(10, 'Icon should be 1-2 characters (emoji)'),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  tags: z.array(z.string())
    .min(1, 'At least one tag is required')
    .max(10, 'Maximum 10 tags allowed'),
  display_order: z.number().optional()
});

const successOutcomeSchema = z.object({
  _id: z.string().optional(),
  icon: z.string()
    .min(1, 'Icon is required')
    .max(10, 'Icon should be 1-2 characters (emoji)'),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  display_order: z.number().optional()
});

const approachItemSchema = z.object({
  _id: z.string().optional(),
  icon: z.string()
    .min(1, 'Icon is required')
    .max(10, 'Icon should be 1-2 characters (emoji)'),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  display_order: z.number().optional()
});

const slumChildrenPageSchema = z.object({
  introduction: z.object({
    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title must be less than 200 characters'),
    subtitle: z.string()
      .min(5, 'Subtitle must be at least 5 characters')
      .max(200, 'Subtitle must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be less than 2000 characters'),
    heroImage: z.string().optional()
  }),
  programFeaturesSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    features: z.array(programFeatureSchema)
      .min(1, 'At least one feature is required')
      .max(20, 'Maximum 20 features allowed')
  }),
  challengesSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    challenges: z.array(challengeItemSchema)
      .min(1, 'At least one challenge is required')
      .max(20, 'Maximum 20 challenges allowed')
  }),
  partnershipSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    partnerships: z.array(partnershipSchema)
      .min(1, 'At least one partnership is required')
      .max(20, 'Maximum 20 partnerships allowed')
  }),
  successOutcomesSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    outcomes: z.array(successOutcomeSchema)
      .min(1, 'At least one outcome is required')
      .max(20, 'Maximum 20 outcomes allowed')
  }),
  approachSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    items: z.array(approachItemSchema)
      .min(1, 'At least one item is required')
      .max(20, 'Maximum 20 items allowed')
  }),
  missionStatement: z.object({
    text: z.string()
      .min(20, 'Mission statement must be at least 20 characters')
      .max(2000, 'Mission statement must be less than 2000 characters')
  }),
  callToActionSection: z.object({
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    description: z.string()
      .min(10, 'Description must be at least 10 characters')
      .max(1000, 'Description must be less than 1000 characters'),
    contactLink: z.string().optional(),
    donateLink: z.string().optional()
  })
});

// Interfaces
interface ProgramFeature {
  _id?: string;
  title: string;
  level: string;
  description: string;
  modules: string[];
  outcome: string;
  display_order?: number;
}

interface ChallengeItem {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

interface Partnership {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  display_order?: number;
}

interface SuccessOutcome {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

interface ApproachItem {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

interface SlumChildrenPageData {
  introduction: {
    title: string;
    subtitle: string;
    description: string;
    heroImage?: string;
  };
  programFeaturesSection: {
    heading: string;
    features: ProgramFeature[];
  };
  challengesSection: {
    heading: string;
    challenges: ChallengeItem[];
  };
  partnershipSection: {
    heading: string;
    partnerships: Partnership[];
  };
  successOutcomesSection: {
    heading: string;
    outcomes: SuccessOutcome[];
  };
  approachSection: {
    heading: string;
    items: ApproachItem[];
  };
  missionStatement: {
    text: string;
  };
  callToActionSection: {
    heading: string;
    description: string;
    contactLink?: string;
    donateLink?: string;
  };
}

const SlumChildren = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [pageData, setPageData] = useState<SlumChildrenPageData>({
    introduction: {
      title: 'Education for Slum Children',
      subtitle: 'Breaking the Cycle of Poverty Through Education',
      description: 'NEIEA\'s specialized programs for slum children focus on making education accessible, relevant, and transformative for children living in urban slums and marginalized communities.',
      heroImage: ''
    },
    programFeaturesSection: {
      heading: 'Our Slum Children Education Programs',
      features: []
    },
    challengesSection: {
      heading: 'Challenges We Address',
      challenges: []
    },
    partnershipSection: {
      heading: 'Partnership Impact',
      partnerships: []
    },
    successOutcomesSection: {
      heading: 'Success Outcomes',
      outcomes: []
    },
    approachSection: {
      heading: 'Why Our Approach Works',
      items: []
    },
    missionStatement: {
      text: 'We believe that no child should be denied education because of their economic circumstances. Every child in every slum deserves the opportunity to learn, grow, and transform their future.'
    },
    callToActionSection: {
      heading: '✨ Support Education for Slum Children',
      description: 'Join us in breaking the cycle of poverty through education. Your support can transform the lives of children in slum communities and give them hope for a better future.',
      contactLink: '/about-us/contact',
      donateLink: '/donate'
    }
  });

  const [loading, setLoading] = useState(true);
  
  // Feature states
  const [editingFeature, setEditingFeature] = useState<string | null>(null);
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [featureForm, setFeatureForm] = useState({
    title: '',
    level: '',
    description: '',
    modules: [] as string[],
    outcome: ''
  });
  const [newModule, setNewModule] = useState('');

  // Challenge states
  const [editingChallenge, setEditingChallenge] = useState<string | null>(null);
  const [isAddingChallenge, setIsAddingChallenge] = useState(false);
  const [challengeForm, setChallengeForm] = useState({ icon: '', title: '', description: '' });

  // Partnership states
  const [editingPartnership, setEditingPartnership] = useState<string | null>(null);
  const [isAddingPartnership, setIsAddingPartnership] = useState(false);
  const [partnershipForm, setPartnershipForm] = useState({
    icon: '',
    title: '',
    description: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');

  // Outcome states
  const [editingOutcome, setEditingOutcome] = useState<string | null>(null);
  const [isAddingOutcome, setIsAddingOutcome] = useState(false);
  const [outcomeForm, setOutcomeForm] = useState({ icon: '', title: '', description: '' });

  // Approach states
  const [editingApproach, setEditingApproach] = useState<string | null>(null);
  const [isAddingApproach, setIsAddingApproach] = useState(false);
  const [approachForm, setApproachForm] = useState({ icon: '', title: '', description: '' });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Hero image upload states
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/slum-children-page');
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        setPageData(data);
        setHeroImagePreview(data.introduction?.heroImage || '');
      }
    } catch (err: any) {
      console.error('Error loading slum children page:', err);
      if (err.response?.status !== 404) {
        toast.error(err.response?.data?.message || 'Failed to load page data');
      }
    } finally {
      setLoading(false);
    }
  };

  // Hero Image Upload Function
  const handleHeroImageUpload = async () => {
    if (!heroImageFile) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (2MB limit)
    if (heroImageFile.size > 2000000) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(heroImageFile.type)) {
      toast.error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images only.');
      return;
    }

    try {
      setUploadingHeroImage(true);
      const formData = new FormData();
      formData.append('heroImage', heroImageFile);

      const response = await axiosInstance.post(
        '/admin/slum-children-page/upload-hero-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setPageData(prev => ({
          ...prev,
          introduction: {
            ...prev.introduction,
            heroImage: response.data.data.image
          }
        }));
        setHeroImagePreview(response.data.data.image);
        setHeroImageFile(null);
        toast.success('Hero image uploaded successfully!');
      }
    } catch (err: any) {
      console.error('Error uploading hero image:', err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err.message?.includes('File too large')) {
        toast.error('Image size must be less than 2MB');
      } else {
        toast.error('Failed to upload image');
      }
    } finally {
      setUploadingHeroImage(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      // Add display_order based on array position
      const dataToSave = {
        ...pageData,
        programFeaturesSection: {
          ...pageData.programFeaturesSection,
          features: pageData.programFeaturesSection.features.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        challengesSection: {
          ...pageData.challengesSection,
          challenges: pageData.challengesSection.challenges.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        partnershipSection: {
          ...pageData.partnershipSection,
          partnerships: pageData.partnershipSection.partnerships.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        successOutcomesSection: {
          ...pageData.successOutcomesSection,
          outcomes: pageData.successOutcomesSection.outcomes.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        approachSection: {
          ...pageData.approachSection,
          items: pageData.approachSection.items.map((item, index) => ({
            ...item,
            display_order: index
          }))
        }
      };

      // Validate
      const validationResult = slumChildrenPageSchema.safeParse(dataToSave);
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast.error(`Validation Error: ${firstError.path.join(' → ')} - ${firstError.message}`);
        return;
      }

      let response;
      try {
        response = await axiosInstance.put('/admin/slum-children-page', dataToSave);
      } catch (updateErr: any) {
        if (updateErr.response?.status === 404) {
          response = await axiosInstance.post('/admin/slum-children-page', dataToSave);
        } else {
          throw updateErr;
        }
      }

      if (response.data.success) {
        toast.success('Page saved successfully!');
        loadPageData();
      }
    } catch (err: any) {
      console.error('Error saving page:', err);
      toast.error(err.response?.data?.message || 'Failed to save changes');
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const reorderArray = async (
    section: 'features' | 'challenges' | 'partnerships' | 'outcomes' | 'approach',
    fromIndex: number,
    toIndex: number
  ) => {
    let newArray: any[];
    
    // Get current array and reorder
    if (section === 'features') {
      const array = [...pageData.programFeaturesSection.features];
      const [moved] = array.splice(fromIndex, 1);
      array.splice(toIndex, 0, moved);
      newArray = array;
      setPageData(prev => ({
        ...prev,
        programFeaturesSection: {
          ...prev.programFeaturesSection,
          features: array
        }
      }));
    } else if (section === 'challenges') {
      const array = [...pageData.challengesSection.challenges];
      const [moved] = array.splice(fromIndex, 1);
      array.splice(toIndex, 0, moved);
      newArray = array;
      setPageData(prev => ({
        ...prev,
        challengesSection: {
          ...prev.challengesSection,
          challenges: array
        }
      }));
    } else if (section === 'partnerships') {
      const array = [...pageData.partnershipSection.partnerships];
      const [moved] = array.splice(fromIndex, 1);
      array.splice(toIndex, 0, moved);
      newArray = array;
      setPageData(prev => ({
        ...prev,
        partnershipSection: {
          ...prev.partnershipSection,
          partnerships: array
        }
      }));
    } else if (section === 'outcomes') {
      const array = [...pageData.successOutcomesSection.outcomes];
      const [moved] = array.splice(fromIndex, 1);
      array.splice(toIndex, 0, moved);
      newArray = array;
      setPageData(prev => ({
        ...prev,
        successOutcomesSection: {
          ...prev.successOutcomesSection,
          outcomes: array
        }
      }));
    } else if (section === 'approach') {
      const array = [...pageData.approachSection.items];
      const [moved] = array.splice(fromIndex, 1);
      array.splice(toIndex, 0, moved);
      newArray = array;
      setPageData(prev => ({
        ...prev,
        approachSection: {
          ...prev.approachSection,
          items: array
        }
      }));
    } else {
      return;
    }

    // Update via API
    const itemsWithOrder = newArray.map((item, index) => ({
      id: item._id,
      display_order: index
    }));

    try {
      await axiosInstance.post('/admin/slum-children-page/reorder', {
        section,
        items: itemsWithOrder
      });
      toast.success('Items reordered successfully!');
    } catch (err: any) {
      console.error('Error reordering:', err);
      toast.error('Failed to reorder items');
      loadPageData(); // Revert on error
    }
  };

  // Feature handlers
  const handleAddFeature = () => {
    setIsAddingFeature(true);
    setFeatureForm({ title: '', level: '', description: '', modules: [], outcome: '' });
    setNewModule('');
  };

  const handleEditFeature = (feature: ProgramFeature) => {
    setEditingFeature(feature._id || null);
    setFeatureForm({
      title: feature.title,
      level: feature.level,
      description: feature.description,
      modules: [...feature.modules],
      outcome: feature.outcome
    });
    setNewModule('');
  };

  const handleSaveFeature = () => {
    const validationResult = programFeatureSchema.safeParse(featureForm);
    if (!validationResult.success) {
      toast.error(`Validation Error: ${validationResult.error.errors[0].message}`);
      return;
    }

    if (editingFeature) {
      const updatedFeatures = pageData.programFeaturesSection.features.map(f =>
        f._id === editingFeature ? { ...featureForm, _id: editingFeature } : f
      );
      setPageData(prev => ({
        ...prev,
        programFeaturesSection: { ...prev.programFeaturesSection, features: updatedFeatures }
      }));
      setEditingFeature(null);
    } else {
      setPageData(prev => ({
        ...prev,
        programFeaturesSection: {
          ...prev.programFeaturesSection,
          features: [...prev.programFeaturesSection.features, { ...featureForm }]
        }
      }));
      setIsAddingFeature(false);
    }
    setFeatureForm({ title: '', level: '', description: '', modules: [], outcome: '' });
    setNewModule('');
  };

  const handleCancelFeature = () => {
    setEditingFeature(null);
    setIsAddingFeature(false);
    setFeatureForm({ title: '', level: '', description: '', modules: [], outcome: '' });
    setNewModule('');
  };

  const handleDeleteFeature = (id: string | undefined) => {
    if (!id) return;
    setPageData(prev => ({
      ...prev,
      programFeaturesSection: {
        ...prev.programFeaturesSection,
        features: prev.programFeaturesSection.features.filter(f => f._id !== id)
      }
    }));
  };

  const handleAddModule = () => {
    if (newModule.trim()) {
      setFeatureForm(prev => ({
        ...prev,
        modules: [...prev.modules, newModule.trim()]
      }));
      setNewModule('');
    }
  };

  const handleRemoveModule = (index: number) => {
    setFeatureForm(prev => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index)
    }));
  };

  // Challenge handlers (similar pattern)
  const handleAddChallenge = () => {
    setIsAddingChallenge(true);
    setChallengeForm({ icon: '', title: '', description: '' });
  };

  const handleEditChallenge = (challenge: ChallengeItem) => {
    setEditingChallenge(challenge._id || null);
    setChallengeForm({
      icon: challenge.icon,
      title: challenge.title,
      description: challenge.description
    });
  };

  const handleSaveChallenge = () => {
    const validationResult = challengeItemSchema.safeParse(challengeForm);
    if (!validationResult.success) {
      toast.error(`Validation Error: ${validationResult.error.errors[0].message}`);
      return;
    }

    if (editingChallenge) {
      const updatedChallenges = pageData.challengesSection.challenges.map(c =>
        c._id === editingChallenge ? { ...challengeForm, _id: editingChallenge } : c
      );
      setPageData(prev => ({
        ...prev,
        challengesSection: { ...prev.challengesSection, challenges: updatedChallenges }
      }));
      setEditingChallenge(null);
    } else {
      setPageData(prev => ({
        ...prev,
        challengesSection: {
          ...prev.challengesSection,
          challenges: [...prev.challengesSection.challenges, { ...challengeForm }]
        }
      }));
      setIsAddingChallenge(false);
    }
    setChallengeForm({ icon: '', title: '', description: '' });
  };

  const handleCancelChallenge = () => {
    setEditingChallenge(null);
    setIsAddingChallenge(false);
    setChallengeForm({ icon: '', title: '', description: '' });
  };

  const handleDeleteChallenge = (id: string | undefined) => {
    if (!id) return;
    setPageData(prev => ({
      ...prev,
      challengesSection: {
        ...prev.challengesSection,
        challenges: prev.challengesSection.challenges.filter(c => c._id !== id)
      }
    }));
  };

  // Partnership handlers
  const handleAddPartnership = () => {
    setIsAddingPartnership(true);
    setPartnershipForm({ icon: '', title: '', description: '', tags: [] });
    setNewTag('');
  };

  const handleEditPartnership = (partnership: Partnership) => {
    setEditingPartnership(partnership._id || null);
    setPartnershipForm({
      icon: partnership.icon,
      title: partnership.title,
      description: partnership.description,
      tags: [...partnership.tags]
    });
    setNewTag('');
  };

  const handleSavePartnership = () => {
    const validationResult = partnershipSchema.safeParse(partnershipForm);
    if (!validationResult.success) {
      toast.error(`Validation Error: ${validationResult.error.errors[0].message}`);
      return;
    }

    if (editingPartnership) {
      const updatedPartnerships = pageData.partnershipSection.partnerships.map(p =>
        p._id === editingPartnership ? { ...partnershipForm, _id: editingPartnership } : p
      );
      setPageData(prev => ({
        ...prev,
        partnershipSection: { ...prev.partnershipSection, partnerships: updatedPartnerships }
      }));
      setEditingPartnership(null);
    } else {
      setPageData(prev => ({
        ...prev,
        partnershipSection: {
          ...prev.partnershipSection,
          partnerships: [...prev.partnershipSection.partnerships, { ...partnershipForm }]
        }
      }));
      setIsAddingPartnership(false);
    }
    setPartnershipForm({ icon: '', title: '', description: '', tags: [] });
    setNewTag('');
  };

  const handleCancelPartnership = () => {
    setEditingPartnership(null);
    setIsAddingPartnership(false);
    setPartnershipForm({ icon: '', title: '', description: '', tags: [] });
    setNewTag('');
  };

  const handleDeletePartnership = (id: string | undefined) => {
    if (!id) return;
    setPageData(prev => ({
      ...prev,
      partnershipSection: {
        ...prev.partnershipSection,
        partnerships: prev.partnershipSection.partnerships.filter(p => p._id !== id)
      }
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setPartnershipForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setPartnershipForm(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  // Outcome handlers (similar to challenge)
  const handleAddOutcome = () => {
    setIsAddingOutcome(true);
    setOutcomeForm({ icon: '', title: '', description: '' });
  };

  const handleEditOutcome = (outcome: SuccessOutcome) => {
    setEditingOutcome(outcome._id || null);
    setOutcomeForm({
      icon: outcome.icon,
      title: outcome.title,
      description: outcome.description
    });
  };

  const handleSaveOutcome = () => {
    const validationResult = successOutcomeSchema.safeParse(outcomeForm);
    if (!validationResult.success) {
      toast.error(`Validation Error: ${validationResult.error.errors[0].message}`);
      return;
    }

    if (editingOutcome) {
      const updatedOutcomes = pageData.successOutcomesSection.outcomes.map(o =>
        o._id === editingOutcome ? { ...outcomeForm, _id: editingOutcome } : o
      );
      setPageData(prev => ({
        ...prev,
        successOutcomesSection: { ...prev.successOutcomesSection, outcomes: updatedOutcomes }
      }));
      setEditingOutcome(null);
    } else {
      setPageData(prev => ({
        ...prev,
        successOutcomesSection: {
          ...prev.successOutcomesSection,
          outcomes: [...prev.successOutcomesSection.outcomes, { ...outcomeForm }]
        }
      }));
      setIsAddingOutcome(false);
    }
    setOutcomeForm({ icon: '', title: '', description: '' });
  };

  const handleCancelOutcome = () => {
    setEditingOutcome(null);
    setIsAddingOutcome(false);
    setOutcomeForm({ icon: '', title: '', description: '' });
  };

  const handleDeleteOutcome = (id: string | undefined) => {
    if (!id) return;
    setPageData(prev => ({
      ...prev,
      successOutcomesSection: {
        ...prev.successOutcomesSection,
        outcomes: prev.successOutcomesSection.outcomes.filter(o => o._id !== id)
      }
    }));
  };

  // Approach handlers (similar to challenge)
  const handleAddApproach = () => {
    setIsAddingApproach(true);
    setApproachForm({ icon: '', title: '', description: '' });
  };

  const handleEditApproach = (item: ApproachItem) => {
    setEditingApproach(item._id || null);
    setApproachForm({
      icon: item.icon,
      title: item.title,
      description: item.description
    });
  };

  const handleSaveApproach = () => {
    const validationResult = approachItemSchema.safeParse(approachForm);
    if (!validationResult.success) {
      toast.error(`Validation Error: ${validationResult.error.errors[0].message}`);
      return;
    }

    if (editingApproach) {
      const updatedItems = pageData.approachSection.items.map(i =>
        i._id === editingApproach ? { ...approachForm, _id: editingApproach } : i
      );
      setPageData(prev => ({
        ...prev,
        approachSection: { ...prev.approachSection, items: updatedItems }
      }));
      setEditingApproach(null);
    } else {
      setPageData(prev => ({
        ...prev,
        approachSection: {
          ...prev.approachSection,
          items: [...prev.approachSection.items, { ...approachForm }]
        }
      }));
      setIsAddingApproach(false);
    }
    setApproachForm({ icon: '', title: '', description: '' });
  };

  const handleCancelApproach = () => {
    setEditingApproach(null);
    setIsAddingApproach(false);
    setApproachForm({ icon: '', title: '', description: '' });
  };

  const handleDeleteApproach = (id: string | undefined) => {
    if (!id) return;
    setPageData(prev => ({
      ...prev,
      approachSection: {
        ...prev.approachSection,
        items: prev.approachSection.items.filter(i => i._id !== id)
      }
    }));
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Slum Children Page Management</h1>
        <Button onClick={handleSaveAll} className="bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[
          { id: 'introduction', label: 'Introduction' },
          { id: 'program-features', label: 'Program Features' },
          { id: 'challenges', label: 'Challenges' },
          { id: 'partnerships', label: 'Partnerships' },
          { id: 'outcomes', label: 'Success Outcomes' },
          { id: 'approach', label: 'Why Our Approach Works' },
          { id: 'mission', label: 'Mission Statement' },
          { id: 'cta', label: 'Call to Action' }
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

      {/* Introduction Section */}
      {activeSection === 'introduction' && (
        <Card>
          <CardHeader>
            <CardTitle>Introduction Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={pageData.introduction.title}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    introduction: { ...prev.introduction, title: e.target.value }
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <Input
                value={pageData.introduction.subtitle}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    introduction: { ...prev.introduction, subtitle: e.target.value }
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={pageData.introduction.description}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    introduction: { ...prev.introduction, description: e.target.value }
                  }))
                }
                rows={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Image
              </label>
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
              <ImageUpload
                value={heroImagePreview}
                onChange={(file, previewUrl) => {
                  if (file) {
                    // Validate file size (2MB limit)
                    if (file.size > 2000000) {
                      toast.error('Image size must be less than 2MB');
                      return;
                    }
                    // Validate file type
                    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
                    if (!allowedTypes.includes(file.type)) {
                      toast.error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images only.');
                      return;
                    }
                  }
                  setHeroImageFile(file);
                  setHeroImagePreview(previewUrl);
                }}
                placeholder="Upload hero image"
                required={false}
                previewSize="hero"
                previewShape="rectangular"
              />
              {heroImageFile && (
                <Button
                  onClick={handleHeroImageUpload}
                  disabled={uploadingHeroImage}
                  className="mt-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingHeroImage ? 'Uploading...' : 'Upload Image'}
                </Button>
              )}
              {!heroImageFile && heroImagePreview && (
                <p className="mt-2 text-sm text-gray-600">
                  Current image is saved. Upload a new image to replace it.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Program Features Section */}
      {activeSection === 'program-features' && (
        <Card>
          <CardHeader>
            <CardTitle>Program Features Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Heading</label>
              <Input
                value={pageData.programFeaturesSection.heading}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    programFeaturesSection: {
                      ...prev.programFeaturesSection,
                      heading: e.target.value
                    }
                  }))
                }
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Features</h3>
                {!isAddingFeature && !editingFeature && (
                  <Button onClick={handleAddFeature} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                )}
              </div>

              {(isAddingFeature || editingFeature) && (
                <Card className="mb-4 p-4 border-2 border-blue-500">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={featureForm.title}
                        onChange={(e) => setFeatureForm((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Level</label>
                      <Input
                        value={featureForm.level}
                        onChange={(e) => setFeatureForm((prev) => ({ ...prev, level: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={featureForm.description}
                        onChange={(e) => setFeatureForm((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Modules</label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={newModule}
                          onChange={(e) => setNewModule(e.target.value)}
                          placeholder="Enter module name"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddModule();
                            }
                          }}
                        />
                        <Button onClick={handleAddModule} size="sm" type="button">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {featureForm.modules.map((module, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {module}
                            <button
                              onClick={() => handleRemoveModule(index)}
                              className="hover:text-blue-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Outcome</label>
                      <Input
                        value={featureForm.outcome}
                        onChange={(e) => setFeatureForm((prev) => ({ ...prev, outcome: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveFeature} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button onClick={handleCancelFeature} size="sm" variant="outline">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                {pageData.programFeaturesSection.features.map((feature, index) => (
                  <div
                    key={feature._id || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderArray('features', draggedIndex, index);
                        setDraggedIndex(null);
                      }
                    }}
                    className={`p-4 border rounded-lg flex items-start gap-3 ${
                      draggedIndex === index ? 'opacity-50' : ''
                    }`}
                  >
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-move mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.level}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditFeature(feature)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteFeature(feature._id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{feature.description}</p>
                      <div className="text-sm">
                        <strong>Modules:</strong>{' '}
                        {feature.modules.join(', ')}
                      </div>
                      <div className="text-sm mt-1">
                        <strong>Outcome:</strong> {feature.outcome}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Challenges Section - Similar pattern to features but simpler */}
      {activeSection === 'challenges' && (
        <Card>
          <CardHeader>
            <CardTitle>Challenges Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Heading</label>
              <Input
                value={pageData.challengesSection.heading}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    challengesSection: {
                      ...prev.challengesSection,
                      heading: e.target.value
                    }
                  }))
                }
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Challenges</h3>
                {!isAddingChallenge && !editingChallenge && (
                  <Button onClick={handleAddChallenge} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Challenge
                  </Button>
                )}
              </div>

              {(isAddingChallenge || editingChallenge) && (
                <Card className="mb-4 p-4 border-2 border-blue-500">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                      <Input
                        value={challengeForm.icon}
                        onChange={(e) => setChallengeForm((prev) => ({ ...prev, icon: e.target.value }))}
                        placeholder="🏚️"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={challengeForm.title}
                        onChange={(e) => setChallengeForm((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={challengeForm.description}
                        onChange={(e) => setChallengeForm((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveChallenge} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button onClick={handleCancelChallenge} size="sm" variant="outline">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                {pageData.challengesSection.challenges.map((challenge, index) => (
                  <div
                    key={challenge._id || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderArray('challenges', draggedIndex, index);
                        setDraggedIndex(null);
                      }
                    }}
                    className={`p-4 border rounded-lg flex items-start gap-3 ${
                      draggedIndex === index ? 'opacity-50' : ''
                    }`}
                  >
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-move mt-1" />
                    <div className="text-2xl">{challenge.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{challenge.title}</h4>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditChallenge(challenge)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteChallenge(challenge._id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{challenge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Partnerships Section */}
      {activeSection === 'partnerships' && (
        <Card>
          <CardHeader>
            <CardTitle>Partnerships Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Heading</label>
              <Input
                value={pageData.partnershipSection.heading}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    partnershipSection: {
                      ...prev.partnershipSection,
                      heading: e.target.value
                    }
                  }))
                }
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Partnerships</h3>
                {!isAddingPartnership && !editingPartnership && (
                  <Button onClick={handleAddPartnership} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Partnership
                  </Button>
                )}
              </div>

              {(isAddingPartnership || editingPartnership) && (
                <Card className="mb-4 p-4 border-2 border-blue-500">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                      <Input
                        value={partnershipForm.icon}
                        onChange={(e) => setPartnershipForm((prev) => ({ ...prev, icon: e.target.value }))}
                        placeholder="🤝"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={partnershipForm.title}
                        onChange={(e) => setPartnershipForm((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={partnershipForm.description}
                        onChange={(e) => setPartnershipForm((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags</label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Enter tag"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                        />
                        <Button onClick={handleAddTag} size="sm" type="button">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {partnershipForm.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              onClick={() => handleRemoveTag(index)}
                              className="hover:text-blue-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSavePartnership} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button onClick={handleCancelPartnership} size="sm" variant="outline">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                {pageData.partnershipSection.partnerships.map((partnership, index) => (
                  <div
                    key={partnership._id || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderArray('partnerships', draggedIndex, index);
                        setDraggedIndex(null);
                      }
                    }}
                    className={`p-4 border rounded-lg flex items-start gap-3 ${
                      draggedIndex === index ? 'opacity-50' : ''
                    }`}
                  >
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-move mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{partnership.icon}</span>
                            <h4 className="font-semibold">{partnership.title}</h4>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{partnership.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {partnership.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditPartnership(partnership)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeletePartnership(partnership._id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Outcomes Section */}
      {activeSection === 'outcomes' && (
        <Card>
          <CardHeader>
            <CardTitle>Success Outcomes Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Heading</label>
              <Input
                value={pageData.successOutcomesSection.heading}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    successOutcomesSection: {
                      ...prev.successOutcomesSection,
                      heading: e.target.value
                    }
                  }))
                }
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Outcomes</h3>
                {!isAddingOutcome && !editingOutcome && (
                  <Button onClick={handleAddOutcome} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Outcome
                  </Button>
                )}
              </div>

              {(isAddingOutcome || editingOutcome) && (
                <Card className="mb-4 p-4 border-2 border-blue-500">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                      <Input
                        value={outcomeForm.icon}
                        onChange={(e) => setOutcomeForm((prev) => ({ ...prev, icon: e.target.value }))}
                        placeholder="✅"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={outcomeForm.title}
                        onChange={(e) => setOutcomeForm((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={outcomeForm.description}
                        onChange={(e) => setOutcomeForm((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveOutcome} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button onClick={handleCancelOutcome} size="sm" variant="outline">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                {pageData.successOutcomesSection.outcomes.map((outcome, index) => (
                  <div
                    key={outcome._id || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderArray('outcomes', draggedIndex, index);
                        setDraggedIndex(null);
                      }
                    }}
                    className={`p-4 border rounded-lg flex items-start gap-3 ${
                      draggedIndex === index ? 'opacity-50' : ''
                    }`}
                  >
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-move mt-1" />
                    <div className="text-2xl">{outcome.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{outcome.title}</h4>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditOutcome(outcome)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteOutcome(outcome._id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{outcome.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Approach Section */}
      {activeSection === 'approach' && (
        <Card>
          <CardHeader>
            <CardTitle>Why Our Approach Works Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Heading</label>
              <Input
                value={pageData.approachSection.heading}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    approachSection: {
                      ...prev.approachSection,
                      heading: e.target.value
                    }
                  }))
                }
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Approach Items</h3>
                {!isAddingApproach && !editingApproach && (
                  <Button onClick={handleAddApproach} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                )}
              </div>

              {(isAddingApproach || editingApproach) && (
                <Card className="mb-4 p-4 border-2 border-blue-500">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                      <Input
                        value={approachForm.icon}
                        onChange={(e) => setApproachForm((prev) => ({ ...prev, icon: e.target.value }))}
                        placeholder="🎯"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={approachForm.title}
                        onChange={(e) => setApproachForm((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={approachForm.description}
                        onChange={(e) => setApproachForm((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveApproach} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button onClick={handleCancelApproach} size="sm" variant="outline">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                {pageData.approachSection.items.map((item, index) => (
                  <div
                    key={item._id || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderArray('approach', draggedIndex, index);
                        setDraggedIndex(null);
                      }
                    }}
                    className={`p-4 border rounded-lg flex items-start gap-3 ${
                      draggedIndex === index ? 'opacity-50' : ''
                    }`}
                  >
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-move mt-1" />
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{item.title}</h4>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditApproach(item)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteApproach(item._id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mission Statement Section */}
      {activeSection === 'mission' && (
        <Card>
          <CardHeader>
            <CardTitle>Mission Statement Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mission Statement Text</label>
              <Textarea
                value={pageData.missionStatement.text}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    missionStatement: { ...prev.missionStatement, text: e.target.value }
                  }))
                }
                rows={5}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to Action Section */}
      {activeSection === 'cta' && (
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Heading</label>
              <Input
                value={pageData.callToActionSection.heading}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    callToActionSection: {
                      ...prev.callToActionSection,
                      heading: e.target.value
                    }
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={pageData.callToActionSection.description}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    callToActionSection: {
                      ...prev.callToActionSection,
                      description: e.target.value
                    }
                  }))
                }
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Link</label>
              <Input
                value={pageData.callToActionSection.contactLink || ''}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    callToActionSection: {
                      ...prev.callToActionSection,
                      contactLink: e.target.value
                    }
                  }))
                }
                placeholder="/about-us/contact"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Donate Link</label>
              <Input
                value={pageData.callToActionSection.donateLink || ''}
                onChange={(e) =>
                  setPageData((prev) => ({
                    ...prev,
                    callToActionSection: {
                      ...prev.callToActionSection,
                      donateLink: e.target.value
                    }
                  }))
                }
                placeholder="/donate"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SlumChildren;

