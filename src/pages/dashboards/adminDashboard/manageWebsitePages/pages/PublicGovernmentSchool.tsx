import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Upload, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';
import ImageUpload from '@/components/ui/image-upload';

// Zod Validation Schemas
const challengeItemSchema = z.object({
  _id: z.string().optional(),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  display_order: z.number().optional()
});

const modelItemSchema = z.object({
  _id: z.string().optional(),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  display_order: z.number().optional()
});

const caseStudyResultSchema = z.object({
  _id: z.string().optional(),
  icon: z.string()
    .max(10, 'Icon should be 1-2 characters (emoji)')
    .optional(),
  text: z.string()
    .min(10, 'Text must be at least 10 characters')
    .max(1000, 'Text must be less than 1000 characters'),
  display_order: z.number().optional()
});

const pilotGoalSchema = z.object({
  _id: z.string().optional(),
  text: z.string()
    .min(10, 'Text must be at least 10 characters')
    .max(1000, 'Text must be less than 1000 characters'),
  display_order: z.number().optional()
});

const whyPartnerItemSchema = z.object({
  _id: z.string().optional(),
  number: z.string()
    .max(10, 'Number should be 1-2 characters')
    .optional(),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  display_order: z.number().optional()
});

const callToActionItemSchema = z.object({
  _id: z.string().optional(),
  text: z.string()
    .min(10, 'Text must be at least 10 characters')
    .max(1000, 'Text must be less than 1000 characters'),
  display_order: z.number().optional()
});

const publicGovernmentSchoolPageSchema = z.object({
  heroSection: z.object({
    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title must be less than 200 characters'),
    subtitle: z.string()
      .max(200, 'Subtitle must be less than 200 characters')
      .optional(),
    description: z.string()
      .max(500, 'Description must be less than 500 characters')
      .optional(),
    heroImage: z.string().optional()
  }),
  introductionSection: z.object({
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be less than 2000 characters')
  }),
  blendedLearningSection: z.object({
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be less than 2000 characters'),
    image: z.string().optional()
  }),
  challengesSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    challenges: z.array(challengeItemSchema)
      .min(1, 'At least one challenge is required')
      .max(20, 'Maximum 20 challenges allowed')
  }),
  modelSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    introText: z.string()
      .max(1000, 'Intro text must be less than 1000 characters')
      .optional(),
    models: z.array(modelItemSchema)
      .min(1, 'At least one model is required')
      .max(20, 'Maximum 20 models allowed')
  }),
  caseStudySection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    description: z.string()
      .max(1000, 'Description must be less than 1000 characters')
      .optional(),
    results: z.array(caseStudyResultSchema)
      .min(1, 'At least one result is required')
      .max(20, 'Maximum 20 results allowed'),
    image: z.string().optional(),
    pdfUrl: z.string().optional()
  }),
  pilotProjectSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    description: z.string()
      .max(2000, 'Description must be less than 2000 characters')
      .optional(),
    proposalHeading: z.string()
      .max(200, 'Proposal heading must be less than 200 characters')
      .optional(),
    proposalDescription: z.string()
      .max(2000, 'Proposal description must be less than 2000 characters')
      .optional(),
    stats: z.object({
      targetSchools: z.string().max(200).optional(),
      studentsBenefiting: z.string().max(200).optional(),
      classSize: z.string().max(200).optional(),
      duration: z.string().max(200).optional()
    }).optional(),
    coordinatorInfo: z.string().max(1000).optional(),
    goals: z.array(pilotGoalSchema)
      .min(1, 'At least one goal is required')
      .max(20, 'Maximum 20 goals allowed')
  }),
  whyPartnerSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    reasons: z.array(whyPartnerItemSchema)
      .min(1, 'At least one reason is required')
      .max(20, 'Maximum 20 reasons allowed')
  }),
  callToActionSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    description: z.string()
      .max(2000, 'Description must be less than 2000 characters')
      .optional(),
    actionItems: z.array(callToActionItemSchema)
      .min(1, 'At least one action item is required')
      .max(20, 'Maximum 20 action items allowed'),
    closingText: z.string()
      .max(1000, 'Closing text must be less than 1000 characters')
      .optional(),
    quote: z.string()
      .max(500, 'Quote must be less than 500 characters')
      .optional()
  })
});

// Interfaces
interface ChallengeItem {
  _id?: string;
  title: string;
  description: string;
  display_order?: number;
}

interface ModelItem {
  _id?: string;
  title: string;
  description: string;
  display_order?: number;
}

interface CaseStudyResult {
  _id?: string;
  icon?: string;
  text: string;
  display_order?: number;
}

interface PilotGoal {
  _id?: string;
  text: string;
  display_order?: number;
}

interface WhyPartnerItem {
  _id?: string;
  number?: string;
  title: string;
  description: string;
  display_order?: number;
}

interface CallToActionItem {
  _id?: string;
  text: string;
  display_order?: number;
}

interface PublicGovernmentSchoolPageData {
  heroSection: {
    title: string;
    subtitle?: string;
    description?: string;
    heroImage?: string;
  };
  introductionSection: {
    heading: string;
    description: string;
  };
  blendedLearningSection: {
    heading: string;
    description: string;
    image?: string;
  };
  challengesSection: {
    heading: string;
    challenges: ChallengeItem[];
  };
  modelSection: {
    heading: string;
    introText?: string;
    models: ModelItem[];
  };
  caseStudySection: {
    heading: string;
    description?: string;
    results: CaseStudyResult[];
    image?: string;
    pdfUrl?: string;
  };
  pilotProjectSection: {
    heading: string;
    description?: string;
    proposalHeading?: string;
    proposalDescription?: string;
    stats?: {
      targetSchools?: string;
      studentsBenefiting?: string;
      classSize?: string;
      duration?: string;
    };
    coordinatorInfo?: string;
    goals: PilotGoal[];
  };
  whyPartnerSection: {
    heading: string;
    reasons: WhyPartnerItem[];
  };
  callToActionSection: {
    heading: string;
    description?: string;
    actionItems: CallToActionItem[];
    closingText?: string;
    quote?: string;
  };
}

const PublicGovernmentSchool = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [pageData, setPageData] = useState<PublicGovernmentSchoolPageData>({
    heroSection: {
      title: "Strengthening India's Public School System through NEIEA's Blended Learning Model",
      subtitle: 'Public (Government) School Support',
      description: "NEIEA offers a proven, scalable, and affordable solution that directly addresses systemic challenges in public schools and complements government efforts.",
      heroImage: '/assets/images/PublicGovSchool/1.png'
    },
    introductionSection: {
      heading: 'Introduction',
      description: "India's public (government) schools are the backbone of education for millions of children. Yet, systemic challenges—teacher shortages, outdated pedagogy, weak foundations in English and Math, and limited access to modern technology—continue to hold back student learning outcomes. The New Equitable and Innovative Educational Association (NEIEA) offers a proven, scalable, and affordable solution that directly addresses these issues and complements government efforts."
    },
    blendedLearningSection: {
      heading: 'Our Blended Learning Model',
      description: "NEIEA's innovative Blended Learning Model combines live online teaching with on-site facilitation, ensuring high-quality instruction while strengthening teacher capacity. With successful pilots in Karnataka, NEIEA demonstrates how public–civil society partnerships can transform classrooms, empower teachers, and build confident learners.",
      image: '/assets/images/PublicGovSchool/3.png'
    },
    challengesSection: {
      heading: 'The Challenge in Public Schools',
      challenges: []
    },
    modelSection: {
      heading: "NEIEA's Model of Working",
      introText: "NEIEA has built a model that aligns directly with the priorities of NEP 2020 and the needs of government schools:",
      models: []
    },
    caseStudySection: {
      heading: 'Case Study: NEIEA & Government Schools in Karnataka',
      description: "NEIEA has already partnered with government schools in Karnataka, focusing on English and Math. Results show:",
      results: [],
      image: '/assets/images/PublicGovSchool/2.png',
      pdfUrl: ''
    },
    pilotProjectSection: {
      heading: 'Pilot Project: Maulana Azad Model Schools',
      description: 'The Department of Minority Welfare established 250 Maulana Azad Model Schools across Karnataka to provide English-medium education for minority students. Despite a progressive vision, systemic handicaps—including abrupt language transitions, rote pedagogy, and teacher shortages—have limited success.',
      proposalHeading: "NEIEA's Proposal",
      proposalDescription: 'NEIEA proposes a three-month pilot program in 12 Maulana Azad Schools (Grades 6, 7, and 10), focusing on English and Mathematics.',
      stats: {
        targetSchools: '12 (4 per grade level)',
        studentsBenefiting: '720',
        classSize: '60 students per class',
        duration: '12 weeks'
      },
      coordinatorInfo: 'On-site Coordinators: Each school to nominate 2 coordinators, trained for 15 days prior to launch',
      goals: []
    },
    whyPartnerSection: {
      heading: 'Why Policymakers Should Partner with NEIEA',
      reasons: []
    },
    callToActionSection: {
      heading: 'A Call to Action',
      description: "The challenges facing India's government schools are immense, but they are not insurmountable. NEIEA has developed a model that is both practical and transformative, already showing measurable results. By partnering with NEIEA, policymakers can:",
      actionItems: [],
      closingText: 'We invite the Department of Education and State Governments to collaborate with NEIEA in scaling this model across India\'s public school system. Together, we can ensure that every child learns, grows, and succeeds.',
      quote: 'When a child learns, a community rises.'
    }
  });

  const [loading, setLoading] = useState(true);
  
  // Challenge states
  const [editingChallenge, setEditingChallenge] = useState<string | null>(null);
  const [isAddingChallenge, setIsAddingChallenge] = useState(false);
  const [challengeForm, setChallengeForm] = useState({ title: '', description: '' });

  // Model states
  const [editingModel, setEditingModel] = useState<string | null>(null);
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [modelForm, setModelForm] = useState({ title: '', description: '' });

  // Case Study Result states
  const [editingResult, setEditingResult] = useState<string | null>(null);
  const [isAddingResult, setIsAddingResult] = useState(false);
  const [resultForm, setResultForm] = useState({ icon: '', text: '' });

  // Pilot Goal states
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [goalForm, setGoalForm] = useState({ text: '' });

  // Why Partner states
  const [editingReason, setEditingReason] = useState<string | null>(null);
  const [isAddingReason, setIsAddingReason] = useState(false);
  const [reasonForm, setReasonForm] = useState({ number: '', title: '', description: '' });

  // Call to Action states
  const [editingActionItem, setEditingActionItem] = useState<string | null>(null);
  const [isAddingActionItem, setIsAddingActionItem] = useState(false);
  const [actionItemForm, setActionItemForm] = useState({ text: '' });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Image upload states
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [blendedImageFile, setBlendedImageFile] = useState<File | null>(null);
  const [blendedImagePreview, setBlendedImagePreview] = useState<string>('');
  const [caseStudyImageFile, setCaseStudyImageFile] = useState<File | null>(null);
  const [caseStudyImagePreview, setCaseStudyImagePreview] = useState<string>('');
  const [caseStudyPDFFile, setCaseStudyPDFFile] = useState<File | null>(null);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [uploadingBlendedImage, setUploadingBlendedImage] = useState(false);
  const [uploadingCaseStudyImage, setUploadingCaseStudyImage] = useState(false);
  const [uploadingCaseStudyPDF, setUploadingCaseStudyPDF] = useState(false);

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/public-government-school-page');
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        setPageData(data);
        setHeroImagePreview(data.heroSection?.heroImage || '');
        setBlendedImagePreview(data.blendedLearningSection?.image || '');
        setCaseStudyImagePreview(data.caseStudySection?.image || '');
      }
    } catch (err: any) {
      console.error('Error loading public government school page:', err);
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

    if (heroImageFile.size > 2000000) {
      toast.error('Image size must be less than 2MB');
      return;
    }

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
        '/admin/public-government-school-page/upload-hero-image',
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
          heroSection: {
            ...prev.heroSection,
            heroImage: response.data.data.image
          }
        }));
        setHeroImagePreview(response.data.data.image);
        setHeroImageFile(null);
        toast.success('Hero image uploaded successfully!');
      }
    } catch (err: any) {
      console.error('Error uploading hero image:', err);
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingHeroImage(false);
    }
  };

  // Blended Learning Image Upload Function
  const handleBlendedImageUpload = async () => {
    if (!blendedImageFile) {
      toast.error('Please select an image file');
      return;
    }

    if (blendedImageFile.size > 2000000) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(blendedImageFile.type)) {
      toast.error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images only.');
      return;
    }

    try {
      setUploadingBlendedImage(true);
      const formData = new FormData();
      formData.append('blendedImage', blendedImageFile);

      const response = await axiosInstance.post(
        '/admin/public-government-school-page/upload-blended-image',
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
          blendedLearningSection: {
            ...prev.blendedLearningSection,
            image: response.data.data.image
          }
        }));
        setBlendedImagePreview(response.data.data.image);
        setBlendedImageFile(null);
        toast.success('Blended learning image uploaded successfully!');
      }
    } catch (err: any) {
      console.error('Error uploading blended learning image:', err);
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingBlendedImage(false);
    }
  };

  // Case Study Image Upload Function
  const handleCaseStudyImageUpload = async () => {
    if (!caseStudyImageFile) {
      toast.error('Please select an image file');
      return;
    }

    if (caseStudyImageFile.size > 2000000) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(caseStudyImageFile.type)) {
      toast.error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images only.');
      return;
    }

    try {
      setUploadingCaseStudyImage(true);
      const formData = new FormData();
      formData.append('caseStudyImage', caseStudyImageFile);

      const response = await axiosInstance.post(
        '/admin/public-government-school-page/upload-case-study-image',
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
          caseStudySection: {
            ...prev.caseStudySection,
            image: response.data.data.image
          }
        }));
        setCaseStudyImagePreview(response.data.data.image);
        setCaseStudyImageFile(null);
        toast.success('Case study image uploaded successfully!');
      }
    } catch (err: any) {
      console.error('Error uploading case study image:', err);
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingCaseStudyImage(false);
    }
  };

  // Case Study PDF Upload Function
  const handleCaseStudyPDFUpload = async () => {
    if (!caseStudyPDFFile) {
      toast.error('Please select a PDF file');
      return;
    }

    if (caseStudyPDFFile.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    // Validate file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (caseStudyPDFFile.size > maxSize) {
      toast.error('File size must be less than 10MB');
      setCaseStudyPDFFile(null);
      return;
    }

    try {
      setUploadingCaseStudyPDF(true);
      const formData = new FormData();
      formData.append('caseStudyPDF', caseStudyPDFFile);

      const response = await axiosInstance.post(
        '/admin/public-government-school-page/upload-case-study-pdf',
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
          caseStudySection: {
            ...prev.caseStudySection,
            pdfUrl: response.data.data.pdfUrl
          }
        }));
        setCaseStudyPDFFile(null);
        toast.success('Case study PDF uploaded successfully!');
      }
    } catch (err: any) {
      console.error('Error uploading case study PDF:', err);
      toast.error(err.response?.data?.message || 'Failed to upload PDF');
    } finally {
      setUploadingCaseStudyPDF(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      const dataToSave = {
        ...pageData,
        challengesSection: {
          ...pageData.challengesSection,
          challenges: pageData.challengesSection.challenges.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        modelSection: {
          ...pageData.modelSection,
          models: pageData.modelSection.models.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        caseStudySection: {
          ...pageData.caseStudySection,
          results: pageData.caseStudySection.results.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        pilotProjectSection: {
          ...pageData.pilotProjectSection,
          goals: pageData.pilotProjectSection.goals.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        whyPartnerSection: {
          ...pageData.whyPartnerSection,
          reasons: pageData.whyPartnerSection.reasons.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        callToActionSection: {
          ...pageData.callToActionSection,
          actionItems: pageData.callToActionSection.actionItems.map((item, index) => ({
            ...item,
            display_order: index
          }))
        }
      };

      const validationResult = publicGovernmentSchoolPageSchema.safeParse(dataToSave);
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast.error(`Validation Error: ${firstError.path.join(' → ')} - ${firstError.message}`);
        return;
      }

      let response;
      try {
        response = await axiosInstance.put('/admin/public-government-school-page', dataToSave);
      } catch (updateErr: any) {
        if (updateErr.response?.status === 404) {
          response = await axiosInstance.post('/admin/public-government-school-page', dataToSave);
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
    section: 'challenges' | 'models' | 'caseStudyResults' | 'pilotGoals' | 'whyPartner' | 'actionItems',
    fromIndex: number,
    toIndex: number
  ) => {
    let newArray: any[];
    
    if (section === 'challenges') {
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
    } else if (section === 'models') {
      const array = [...pageData.modelSection.models];
      const [moved] = array.splice(fromIndex, 1);
      array.splice(toIndex, 0, moved);
      newArray = array;
      setPageData(prev => ({
        ...prev,
        modelSection: {
          ...prev.modelSection,
          models: array
        }
      }));
    } else if (section === 'caseStudyResults') {
      const array = [...pageData.caseStudySection.results];
      const [moved] = array.splice(fromIndex, 1);
      array.splice(toIndex, 0, moved);
      newArray = array;
      setPageData(prev => ({
        ...prev,
        caseStudySection: {
          ...prev.caseStudySection,
          results: array
        }
      }));
    } else if (section === 'pilotGoals') {
      const array = [...pageData.pilotProjectSection.goals];
      const [moved] = array.splice(fromIndex, 1);
      array.splice(toIndex, 0, moved);
      newArray = array;
      setPageData(prev => ({
        ...prev,
        pilotProjectSection: {
          ...prev.pilotProjectSection,
          goals: array
        }
      }));
    } else if (section === 'whyPartner') {
      const array = [...pageData.whyPartnerSection.reasons];
      const [moved] = array.splice(fromIndex, 1);
      array.splice(toIndex, 0, moved);
      newArray = array;
      setPageData(prev => ({
        ...prev,
        whyPartnerSection: {
          ...prev.whyPartnerSection,
          reasons: array
        }
      }));
    } else if (section === 'actionItems') {
      const array = [...pageData.callToActionSection.actionItems];
      const [moved] = array.splice(fromIndex, 1);
      array.splice(toIndex, 0, moved);
      newArray = array;
      setPageData(prev => ({
        ...prev,
        callToActionSection: {
          ...prev.callToActionSection,
          actionItems: array
        }
      }));
    } else {
      return;
    }

    const itemsWithOrder = newArray.map((item, index) => ({
      id: item._id,
      display_order: index
    }));

    try {
      await axiosInstance.post('/admin/public-government-school-page/reorder', {
        section,
        items: itemsWithOrder
      });
      toast.success('Items reordered successfully!');
    } catch (err: any) {
      console.error('Error reordering:', err);
      toast.error('Failed to reorder items');
      loadPageData();
    }
  };

  // Challenge handlers
  const handleAddChallenge = () => {
    setIsAddingChallenge(true);
    setChallengeForm({ title: '', description: '' });
  };

  const handleEditChallenge = (challenge: ChallengeItem) => {
    setEditingChallenge(challenge._id!);
    setChallengeForm({ title: challenge.title, description: challenge.description });
  };

  const handleSaveChallenge = () => {
    if (!challengeForm.title.trim() || !challengeForm.description.trim()) {
      toast.error('Please fill all required fields');
      return;
    }

    if (isAddingChallenge) {
      const newChallenge: ChallengeItem = {
        ...challengeForm,
        _id: `temp-${Date.now()}`
      };
      setPageData(prev => ({
        ...prev,
        challengesSection: {
          ...prev.challengesSection,
          challenges: [...prev.challengesSection.challenges, newChallenge]
        }
      }));
      toast.success('Challenge added successfully!');
    } else {
      setPageData(prev => ({
        ...prev,
        challengesSection: {
          ...prev.challengesSection,
          challenges: prev.challengesSection.challenges.map(c =>
            c._id === editingChallenge ? { ...c, ...challengeForm } : c
          )
        }
      }));
      toast.success('Challenge updated successfully!');
    }

    setIsAddingChallenge(false);
    setEditingChallenge(null);
    setChallengeForm({ title: '', description: '' });
  };

  const handleDeleteChallenge = (id: string) => {
    setPageData(prev => ({
      ...prev,
      challengesSection: {
        ...prev.challengesSection,
        challenges: prev.challengesSection.challenges.filter(c => c._id !== id)
      }
    }));
    toast.success('Challenge deleted successfully!');
  };

  // Model handlers
  const handleAddModel = () => {
    setIsAddingModel(true);
    setModelForm({ title: '', description: '' });
  };

  const handleEditModel = (model: ModelItem) => {
    setEditingModel(model._id!);
    setModelForm({ title: model.title, description: model.description });
  };

  const handleSaveModel = () => {
    if (!modelForm.title.trim() || !modelForm.description.trim()) {
      toast.error('Please fill all required fields');
      return;
    }

    if (isAddingModel) {
      const newModel: ModelItem = {
        ...modelForm,
        _id: `temp-${Date.now()}`
      };
      setPageData(prev => ({
        ...prev,
        modelSection: {
          ...prev.modelSection,
          models: [...prev.modelSection.models, newModel]
        }
      }));
      toast.success('Model added successfully!');
    } else {
      setPageData(prev => ({
        ...prev,
        modelSection: {
          ...prev.modelSection,
          models: prev.modelSection.models.map(m =>
            m._id === editingModel ? { ...m, ...modelForm } : m
          )
        }
      }));
      toast.success('Model updated successfully!');
    }

    setIsAddingModel(false);
    setEditingModel(null);
    setModelForm({ title: '', description: '' });
  };

  const handleDeleteModel = (id: string) => {
    setPageData(prev => ({
      ...prev,
      modelSection: {
        ...prev.modelSection,
        models: prev.modelSection.models.filter(m => m._id !== id)
      }
    }));
    toast.success('Model deleted successfully!');
  };

  // Case Study Result handlers
  const handleAddResult = () => {
    setIsAddingResult(true);
    setResultForm({ icon: '', text: '' });
  };

  const handleEditResult = (result: CaseStudyResult) => {
    setEditingResult(result._id!);
    setResultForm({ icon: result.icon || '', text: result.text });
  };

  const handleSaveResult = () => {
    if (!resultForm.text.trim()) {
      toast.error('Please fill all required fields');
      return;
    }

    if (isAddingResult) {
      const newResult: CaseStudyResult = {
        ...resultForm,
        _id: `temp-${Date.now()}`
      };
      setPageData(prev => ({
        ...prev,
        caseStudySection: {
          ...prev.caseStudySection,
          results: [...prev.caseStudySection.results, newResult]
        }
      }));
      toast.success('Result added successfully!');
    } else {
      setPageData(prev => ({
        ...prev,
        caseStudySection: {
          ...prev.caseStudySection,
          results: prev.caseStudySection.results.map(r =>
            r._id === editingResult ? { ...r, ...resultForm } : r
          )
        }
      }));
      toast.success('Result updated successfully!');
    }

    setIsAddingResult(false);
    setEditingResult(null);
    setResultForm({ icon: '', text: '' });
  };

  const handleDeleteResult = (id: string) => {
    setPageData(prev => ({
      ...prev,
      caseStudySection: {
        ...prev.caseStudySection,
        results: prev.caseStudySection.results.filter(r => r._id !== id)
      }
    }));
    toast.success('Result deleted successfully!');
  };

  // Pilot Goal handlers
  const handleAddGoal = () => {
    setIsAddingGoal(true);
    setGoalForm({ text: '' });
  };

  const handleEditGoal = (goal: PilotGoal) => {
    setEditingGoal(goal._id!);
    setGoalForm({ text: goal.text });
  };

  const handleSaveGoal = () => {
    if (!goalForm.text.trim()) {
      toast.error('Please fill all required fields');
      return;
    }

    if (isAddingGoal) {
      const newGoal: PilotGoal = {
        ...goalForm,
        _id: `temp-${Date.now()}`
      };
      setPageData(prev => ({
        ...prev,
        pilotProjectSection: {
          ...prev.pilotProjectSection,
          goals: [...prev.pilotProjectSection.goals, newGoal]
        }
      }));
      toast.success('Goal added successfully!');
    } else {
      setPageData(prev => ({
        ...prev,
        pilotProjectSection: {
          ...prev.pilotProjectSection,
          goals: prev.pilotProjectSection.goals.map(g =>
            g._id === editingGoal ? { ...g, ...goalForm } : g
          )
        }
      }));
      toast.success('Goal updated successfully!');
    }

    setIsAddingGoal(false);
    setEditingGoal(null);
    setGoalForm({ text: '' });
  };

  const handleDeleteGoal = (id: string) => {
    setPageData(prev => ({
      ...prev,
      pilotProjectSection: {
        ...prev.pilotProjectSection,
        goals: prev.pilotProjectSection.goals.filter(g => g._id !== id)
      }
    }));
    toast.success('Goal deleted successfully!');
  };

  // Why Partner handlers
  const handleAddReason = () => {
    setIsAddingReason(true);
    setReasonForm({ number: '', title: '', description: '' });
  };

  const handleEditReason = (reason: WhyPartnerItem) => {
    setEditingReason(reason._id!);
    setReasonForm({ number: reason.number || '', title: reason.title, description: reason.description });
  };

  const handleSaveReason = () => {
    if (!reasonForm.title.trim() || !reasonForm.description.trim()) {
      toast.error('Please fill all required fields');
      return;
    }

    if (isAddingReason) {
      const newReason: WhyPartnerItem = {
        ...reasonForm,
        _id: `temp-${Date.now()}`
      };
      setPageData(prev => ({
        ...prev,
        whyPartnerSection: {
          ...prev.whyPartnerSection,
          reasons: [...prev.whyPartnerSection.reasons, newReason]
        }
      }));
      toast.success('Reason added successfully!');
    } else {
      setPageData(prev => ({
        ...prev,
        whyPartnerSection: {
          ...prev.whyPartnerSection,
          reasons: prev.whyPartnerSection.reasons.map(r =>
            r._id === editingReason ? { ...r, ...reasonForm } : r
          )
        }
      }));
      toast.success('Reason updated successfully!');
    }

    setIsAddingReason(false);
    setEditingReason(null);
    setReasonForm({ number: '', title: '', description: '' });
  };

  const handleDeleteReason = (id: string) => {
    setPageData(prev => ({
      ...prev,
      whyPartnerSection: {
        ...prev.whyPartnerSection,
        reasons: prev.whyPartnerSection.reasons.filter(r => r._id !== id)
      }
    }));
    toast.success('Reason deleted successfully!');
  };

  // Call to Action handlers
  const handleAddActionItem = () => {
    setIsAddingActionItem(true);
    setActionItemForm({ text: '' });
  };

  const handleEditActionItem = (item: CallToActionItem) => {
    setEditingActionItem(item._id!);
    setActionItemForm({ text: item.text });
  };

  const handleSaveActionItem = () => {
    if (!actionItemForm.text.trim()) {
      toast.error('Please fill all required fields');
      return;
    }

    if (isAddingActionItem) {
      const newItem: CallToActionItem = {
        ...actionItemForm,
        _id: `temp-${Date.now()}`
      };
      setPageData(prev => ({
        ...prev,
        callToActionSection: {
          ...prev.callToActionSection,
          actionItems: [...prev.callToActionSection.actionItems, newItem]
        }
      }));
      toast.success('Action item added successfully!');
    } else {
      setPageData(prev => ({
        ...prev,
        callToActionSection: {
          ...prev.callToActionSection,
          actionItems: prev.callToActionSection.actionItems.map(a =>
            a._id === editingActionItem ? { ...a, ...actionItemForm } : a
          )
        }
      }));
      toast.success('Action item updated successfully!');
    }

    setIsAddingActionItem(false);
    setEditingActionItem(null);
    setActionItemForm({ text: '' });
  };

  const handleDeleteActionItem = (id: string) => {
    setPageData(prev => ({
      ...prev,
      callToActionSection: {
        ...prev.callToActionSection,
        actionItems: prev.callToActionSection.actionItems.filter(a => a._id !== id)
      }
    }));
    toast.success('Action item deleted successfully!');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <School className="w-8 h-8" />
            Manage Public Government School Page
          </h1>
          <p className="text-gray-600">Update all content for the public government school page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[
          { id: 'hero', label: 'Hero' },
          { id: 'introduction', label: 'Introduction' },
          { id: 'blended-learning', label: 'Blended Learning' },
          { id: 'challenges', label: 'Challenges' },
          { id: 'model', label: "NEIEA's Model" },
          { id: 'case-study', label: 'Case Study' },
          { id: 'pilot-project', label: 'Pilot Project' },
          { id: 'why-partner', label: 'Why Partner' },
          { id: 'call-to-action', label: 'Call to Action' }
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

      {/* Hero Section */}
      {activeSection === 'hero' && (
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <Input
                value={pageData.heroSection.title}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  heroSection: { ...prev.heroSection, title: e.target.value }
                }))}
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <Input
                value={pageData.heroSection.subtitle || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  heroSection: { ...prev.heroSection, subtitle: e.target.value }
                }))}
                placeholder="Enter subtitle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={pageData.heroSection.description || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  heroSection: { ...prev.heroSection, description: e.target.value }
                }))}
                placeholder="Enter description"
                rows={3}
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
                    if (file.size > 2000000) {
                      toast.error('Image size must be less than 2MB');
                      return;
                    }
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

      {/* Introduction Section */}
      {activeSection === 'introduction' && (
        <Card>
          <CardHeader>
            <CardTitle>Introduction Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading *
              </label>
              <Input
                value={pageData.introductionSection.heading}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  introductionSection: { ...prev.introductionSection, heading: e.target.value }
                }))}
                placeholder="Enter introduction heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <Textarea
                value={pageData.introductionSection.description}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  introductionSection: { ...prev.introductionSection, description: e.target.value }
                }))}
                placeholder="Enter introduction description"
                rows={6}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blended Learning Section */}
      {activeSection === 'blended-learning' && (
        <Card>
          <CardHeader>
            <CardTitle>Blended Learning Model Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading *
              </label>
              <Input
                value={pageData.blendedLearningSection.heading}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  blendedLearningSection: { ...prev.blendedLearningSection, heading: e.target.value }
                }))}
                placeholder="Enter heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <Textarea
                value={pageData.blendedLearningSection.description}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  blendedLearningSection: { ...prev.blendedLearningSection, description: e.target.value }
                }))}
                placeholder="Enter description"
                rows={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <p className="text-xs text-gray-500 mb-2">Recommended: 800x600px or similar aspect ratio, Max 2MB</p>
              <ImageUpload
                value={blendedImagePreview}
                onChange={(file, previewUrl) => {
                  if (file) {
                    if (file.size > 2000000) {
                      toast.error('Image size must be less than 2MB');
                      return;
                    }
                    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
                    if (!allowedTypes.includes(file.type)) {
                      toast.error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images only.');
                      return;
                    }
                  }
                  setBlendedImageFile(file);
                  setBlendedImagePreview(previewUrl);
                }}
                placeholder="Upload blended learning image"
                required={false}
                previewSize="hero"
                previewShape='rectangular'
              />
              {blendedImageFile && (
                <Button
                  onClick={handleBlendedImageUpload}
                  disabled={uploadingBlendedImage}
                  className="mt-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingBlendedImage ? 'Uploading...' : 'Upload Image'}
                </Button>
              )}
              {!blendedImageFile && blendedImagePreview && (
                <p className="mt-2 text-sm text-gray-600">
                  Current image is saved. Upload a new image to replace it.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Challenges Section */}
      {activeSection === 'challenges' && (
        <Card>
          <CardHeader>
            <CardTitle>Challenges Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading *
              </label>
              <Input
                value={pageData.challengesSection.heading}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  challengesSection: { ...prev.challengesSection, heading: e.target.value }
                }))}
                placeholder="Enter section heading"
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
                      <label className="block text-sm font-medium mb-2">Title *</label>
                      <Input
                        value={challengeForm.title}
                        onChange={(e) => setChallengeForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description *</label>
                      <Textarea
                        value={challengeForm.description}
                        onChange={(e) => setChallengeForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveChallenge} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        {isAddingChallenge ? 'Add' : 'Update'}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAddingChallenge(false);
                          setEditingChallenge(null);
                          setChallengeForm({ title: '', description: '' });
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-2">
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
                            onClick={() => handleDeleteChallenge(challenge._id!)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                    </div>
                  </div>
                ))}
                {pageData.challengesSection.challenges.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No challenges added yet. Click "Add Challenge" to get started.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Model Section */}
      {activeSection === 'model' && (
        <Card>
          <CardHeader>
            <CardTitle>NEIEA's Model Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading *
              </label>
              <Input
                value={pageData.modelSection.heading}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  modelSection: { ...prev.modelSection, heading: e.target.value }
                }))}
                placeholder="Enter section heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Intro Text
              </label>
              <Textarea
                value={pageData.modelSection.introText || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  modelSection: { ...prev.modelSection, introText: e.target.value }
                }))}
                placeholder="Enter intro text"
                rows={3}
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Models</h3>
                {!isAddingModel && !editingModel && (
                  <Button onClick={handleAddModel} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Model
                  </Button>
                )}
              </div>

              {(isAddingModel || editingModel) && (
                <Card className="mb-4 p-4 border-2 border-blue-500">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title *</label>
                      <Input
                        value={modelForm.title}
                        onChange={(e) => setModelForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description *</label>
                      <Textarea
                        value={modelForm.description}
                        onChange={(e) => setModelForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveModel} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        {isAddingModel ? 'Add' : 'Update'}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAddingModel(false);
                          setEditingModel(null);
                          setModelForm({ title: '', description: '' });
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-2">
                {pageData.modelSection.models.map((model, index) => (
                  <div
                    key={model._id || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderArray('models', draggedIndex, index);
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
                        <h4 className="font-semibold">{model.title}</h4>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditModel(model)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteModel(model._id!)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{model.description}</p>
                    </div>
                  </div>
                ))}
                {pageData.modelSection.models.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No models added yet. Click "Add Model" to get started.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Case Study Section */}
      {activeSection === 'case-study' && (
        <Card>
          <CardHeader>
            <CardTitle>Case Study Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading *
              </label>
              <Input
                value={pageData.caseStudySection.heading}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  caseStudySection: { ...prev.caseStudySection, heading: e.target.value }
                }))}
                placeholder="Enter section heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={pageData.caseStudySection.description || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  caseStudySection: { ...prev.caseStudySection, description: e.target.value }
                }))}
                placeholder="Enter description"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Case Study Image
              </label>
              <p className="text-xs text-gray-500 mb-2">Recommended: 800x600px or similar aspect ratio, Max 2MB</p>
              <ImageUpload
                value={caseStudyImagePreview}
                onChange={(file, previewUrl) => {
                  if (file) {
                    if (file.size > 2000000) {
                      toast.error('Image size must be less than 2MB');
                      return;
                    }
                    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
                    if (!allowedTypes.includes(file.type)) {
                      toast.error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images only.');
                      return;
                    }
                  }
                  setCaseStudyImageFile(file);
                  setCaseStudyImagePreview(previewUrl);
                }}
                placeholder="Upload case study image"
                required={false}
                previewSize="hero"
                previewShape='rectangular'
              />
              {caseStudyImageFile && (
                <Button
                  onClick={handleCaseStudyImageUpload}
                  disabled={uploadingCaseStudyImage}
                  className="mt-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingCaseStudyImage ? 'Uploading...' : 'Upload Image'}
                </Button>
              )}
              {!caseStudyImageFile && caseStudyImagePreview && (
                <p className="mt-2 text-sm text-gray-600">
                  Current image is saved. Upload a new image to replace it.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Case Study PDF
              </label>
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Maximum file size: 10MB, PDF format only</p>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.type !== 'application/pdf') {
                      toast.error('Please upload a PDF file');
                      e.target.value = '';
                      return;
                    }
                    const maxSize = 10 * 1024 * 1024; // 10MB
                    if (file.size > maxSize) {
                      toast.error('File size must be less than 10MB');
                      e.target.value = '';
                      return;
                    }
                    setCaseStudyPDFFile(file);
                  } else {
                    setCaseStudyPDFFile(null);
                  }
                }}
                className="mb-2"
              />
              {caseStudyPDFFile && (
                <Button
                  onClick={handleCaseStudyPDFUpload}
                  disabled={uploadingCaseStudyPDF}
                  className="mt-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingCaseStudyPDF ? 'Uploading...' : 'Upload PDF'}
                </Button>
              )}
              {!caseStudyPDFFile && pageData.caseStudySection?.pdfUrl && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-700">
                    PDF is uploaded: <a href={pageData.caseStudySection.pdfUrl} target="_blank" rel="noopener noreferrer" className="underline">View PDF</a>
                  </p>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Results</h3>
                {!isAddingResult && !editingResult && (
                  <Button onClick={handleAddResult} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Result
                  </Button>
                )}
              </div>

              {(isAddingResult || editingResult) && (
                <Card className="mb-4 p-4 border-2 border-blue-500">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                      <Input
                        value={resultForm.icon}
                        onChange={(e) => setResultForm(prev => ({ ...prev, icon: e.target.value }))}
                        placeholder="Enter emoji (optional)"
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Text *</label>
                      <Textarea
                        value={resultForm.text}
                        onChange={(e) => setResultForm(prev => ({ ...prev, text: e.target.value }))}
                        rows={3}
                        placeholder="Enter result text"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveResult} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        {isAddingResult ? 'Add' : 'Update'}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAddingResult(false);
                          setEditingResult(null);
                          setResultForm({ icon: '', text: '' });
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-2">
                {pageData.caseStudySection.results.map((result, index) => (
                  <div
                    key={result._id || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderArray('caseStudyResults', draggedIndex, index);
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
                        <div className="flex items-center gap-2">
                          {result.icon && <span className="text-2xl">{result.icon}</span>}
                          <p className="text-sm text-gray-700">{result.text}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditResult(result)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteResult(result._id!)}
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
                {pageData.caseStudySection.results.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No results added yet. Click "Add Result" to get started.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pilot Project Section */}
      {activeSection === 'pilot-project' && (
        <Card>
          <CardHeader>
            <CardTitle>Pilot Project Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading *
              </label>
              <Input
                value={pageData.pilotProjectSection.heading}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  pilotProjectSection: { ...prev.pilotProjectSection, heading: e.target.value }
                }))}
                placeholder="Enter section heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={pageData.pilotProjectSection.description || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  pilotProjectSection: { ...prev.pilotProjectSection, description: e.target.value }
                }))}
                placeholder="Enter description"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proposal Heading
              </label>
              <Input
                value={pageData.pilotProjectSection.proposalHeading || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  pilotProjectSection: { ...prev.pilotProjectSection, proposalHeading: e.target.value }
                }))}
                placeholder="Enter proposal heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proposal Description
              </label>
              <Textarea
                value={pageData.pilotProjectSection.proposalDescription || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  pilotProjectSection: { ...prev.pilotProjectSection, proposalDescription: e.target.value }
                }))}
                placeholder="Enter proposal description"
                rows={3}
              />
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Schools
                  </label>
                  <Input
                    value={pageData.pilotProjectSection.stats?.targetSchools || ''}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      pilotProjectSection: {
                        ...prev.pilotProjectSection,
                        stats: {
                          ...prev.pilotProjectSection.stats,
                          targetSchools: e.target.value
                        }
                      }
                    }))}
                    placeholder="e.g., 12 (4 per grade level)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Students Benefiting
                  </label>
                  <Input
                    value={pageData.pilotProjectSection.stats?.studentsBenefiting || ''}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      pilotProjectSection: {
                        ...prev.pilotProjectSection,
                        stats: {
                          ...prev.pilotProjectSection.stats,
                          studentsBenefiting: e.target.value
                        }
                      }
                    }))}
                    placeholder="e.g., 720"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Size
                  </label>
                  <Input
                    value={pageData.pilotProjectSection.stats?.classSize || ''}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      pilotProjectSection: {
                        ...prev.pilotProjectSection,
                        stats: {
                          ...prev.pilotProjectSection.stats,
                          classSize: e.target.value
                        }
                      }
                    }))}
                    placeholder="e.g., 60 students per class"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <Input
                    value={pageData.pilotProjectSection.stats?.duration || ''}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      pilotProjectSection: {
                        ...prev.pilotProjectSection,
                        stats: {
                          ...prev.pilotProjectSection.stats,
                          duration: e.target.value
                        }
                      }
                    }))}
                    placeholder="e.g., 12 weeks"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coordinator Info
              </label>
              <Textarea
                value={pageData.pilotProjectSection.coordinatorInfo || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  pilotProjectSection: { ...prev.pilotProjectSection, coordinatorInfo: e.target.value }
                }))}
                placeholder="Enter coordinator information"
                rows={2}
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Pilot Goals</h3>
                {!isAddingGoal && !editingGoal && (
                  <Button onClick={handleAddGoal} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Goal
                  </Button>
                )}
              </div>

              {(isAddingGoal || editingGoal) && (
                <Card className="mb-4 p-4 border-2 border-blue-500">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Text *</label>
                      <Textarea
                        value={goalForm.text}
                        onChange={(e) => setGoalForm(prev => ({ ...prev, text: e.target.value }))}
                        rows={2}
                        placeholder="Enter goal text"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveGoal} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        {isAddingGoal ? 'Add' : 'Update'}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAddingGoal(false);
                          setEditingGoal(null);
                          setGoalForm({ text: '' });
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-2">
                {pageData.pilotProjectSection.goals.map((goal, index) => (
                  <div
                    key={goal._id || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderArray('pilotGoals', draggedIndex, index);
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
                        <p className="text-sm text-gray-700">{goal.text}</p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditGoal(goal)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteGoal(goal._id!)}
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
                {pageData.pilotProjectSection.goals.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No goals added yet. Click "Add Goal" to get started.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Why Partner Section */}
      {activeSection === 'why-partner' && (
        <Card>
          <CardHeader>
            <CardTitle>Why Partner Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading *
              </label>
              <Input
                value={pageData.whyPartnerSection.heading}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  whyPartnerSection: { ...prev.whyPartnerSection, heading: e.target.value }
                }))}
                placeholder="Enter section heading"
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Reasons</h3>
                {!isAddingReason && !editingReason && (
                  <Button onClick={handleAddReason} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Reason
                  </Button>
                )}
              </div>

              {(isAddingReason || editingReason) && (
                <Card className="mb-4 p-4 border-2 border-blue-500">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Number (Optional)</label>
                      <Input
                        value={reasonForm.number}
                        onChange={(e) => setReasonForm(prev => ({ ...prev, number: e.target.value }))}
                        placeholder="Enter number (e.g., 1, 2, 3)"
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title *</label>
                      <Input
                        value={reasonForm.title}
                        onChange={(e) => setReasonForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description *</label>
                      <Textarea
                        value={reasonForm.description}
                        onChange={(e) => setReasonForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        placeholder="Enter description"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveReason} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        {isAddingReason ? 'Add' : 'Update'}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAddingReason(false);
                          setEditingReason(null);
                          setReasonForm({ number: '', title: '', description: '' });
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-2">
                {pageData.whyPartnerSection.reasons.map((reason, index) => (
                  <div
                    key={reason._id || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderArray('whyPartner', draggedIndex, index);
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
                          {reason.number && <span className="text-lg font-bold mr-2">{reason.number}</span>}
                          <h4 className="font-semibold inline">{reason.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{reason.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditReason(reason)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteReason(reason._id!)}
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
                {pageData.whyPartnerSection.reasons.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No reasons added yet. Click "Add Reason" to get started.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to Action Section */}
      {activeSection === 'call-to-action' && (
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading *
              </label>
              <Input
                value={pageData.callToActionSection.heading}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, heading: e.target.value }
                }))}
                placeholder="Enter section heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={pageData.callToActionSection.description || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, description: e.target.value }
                }))}
                placeholder="Enter description"
                rows={4}
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Action Items</h3>
                {!isAddingActionItem && !editingActionItem && (
                  <Button onClick={handleAddActionItem} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Action Item
                  </Button>
                )}
              </div>

              {(isAddingActionItem || editingActionItem) && (
                <Card className="mb-4 p-4 border-2 border-blue-500">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Text *</label>
                      <Textarea
                        value={actionItemForm.text}
                        onChange={(e) => setActionItemForm(prev => ({ ...prev, text: e.target.value }))}
                        rows={2}
                        placeholder="Enter action item text"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveActionItem} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        {isAddingActionItem ? 'Add' : 'Update'}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAddingActionItem(false);
                          setEditingActionItem(null);
                          setActionItemForm({ text: '' });
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-2">
                {pageData.callToActionSection.actionItems.map((item, index) => (
                  <div
                    key={item._id || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderArray('actionItems', draggedIndex, index);
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
                        <p className="text-sm text-gray-700">{item.text}</p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditActionItem(item)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteActionItem(item._id!)}
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
                {pageData.callToActionSection.actionItems.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No action items added yet. Click "Add Action Item" to get started.</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Closing Text
              </label>
              <Textarea
                value={pageData.callToActionSection.closingText || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, closingText: e.target.value }
                }))}
                placeholder="Enter closing text"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quote
              </label>
              <Input
                value={pageData.callToActionSection.quote || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, quote: e.target.value }
                }))}
                placeholder="Enter quote"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PublicGovernmentSchool;
