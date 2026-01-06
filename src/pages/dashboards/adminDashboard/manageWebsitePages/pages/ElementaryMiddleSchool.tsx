import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, GraduationCap, Upload } from 'lucide-react';
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

const responseItemSchema = z.object({
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

const programItemSchema = z.object({
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

const testimonialItemSchema = z.object({
  _id: z.string().optional(),
  text: z.string()
    .min(10, 'Testimonial text must be at least 10 characters')
    .max(2000, 'Testimonial text must be less than 2000 characters'),
  author: z.string()
    .min(2, 'Author name must be at least 2 characters')
    .max(100, 'Author name must be less than 100 characters'),
  role: z.string()
    .min(3, 'Role must be at least 3 characters')
    .max(200, 'Role must be less than 200 characters'),
  avatar: z.string()
    .min(1, 'Avatar emoji is required')
    .max(10, 'Avatar should be 1-2 characters (emoji)'),
  display_order: z.number().optional()
});

const elementaryMiddleSchoolPageSchema = z.object({
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
  introduction: z.object({
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be less than 2000 characters')
  }),
  whyThisWorkMattersSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    nationalAssessmentData: z.object({
      heading: z.string().min(1, 'Heading is required').max(200),
      items: z.array(z.string()).min(1, 'At least one item is required')
    }),
    interventionStrategy: z.object({
      heading: z.string().min(1, 'Heading is required').max(200),
      description: z.string().min(10, 'Description is required').max(1000)
    })
  }),
  structuralChallengesSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    description: z.string()
      .min(10, 'Description must be at least 10 characters')
      .max(1000, 'Description must be less than 1000 characters'),
    challenges: z.array(challengeItemSchema)
      .min(1, 'At least one challenge is required')
      .max(20, 'Maximum 20 challenges allowed')
  }),
  neieaResponseSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    description: z.string()
      .min(10, 'Description must be at least 10 characters')
      .max(1000, 'Description must be less than 1000 characters'),
    responses: z.array(responseItemSchema)
      .min(1, 'At least one response is required')
      .max(20, 'Maximum 20 responses allowed')
  }),
  programsSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    description: z.string()
      .min(10, 'Description must be at least 10 characters')
      .max(1000, 'Description must be less than 1000 characters'),
    programs: z.array(programItemSchema)
      .min(1, 'At least one program is required')
      .max(20, 'Maximum 20 programs allowed')
  }),
  reachImpactSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    currentReach: z.object({
      image: z.string().optional(),
      title: z.string().min(1, 'Title is required').max(200),
      stats: z.string().min(1, 'Stats are required').max(200),
      description: z.string().min(10, 'Description is required').max(1000)
    }),
    caseStudy: z.object({
      icon: z.string().min(1, 'Icon is required').max(10),
      heading: z.string().min(1, 'Heading is required').max(200),
      description: z.string().min(10, 'Description is required').max(1000),
      solution: z.string().min(10, 'Solution is required').max(1000)
    })
  }),
  testimonialsSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    testimonials: z.array(testimonialItemSchema)
      .min(1, 'At least one testimonial is required')
      .max(20, 'Maximum 20 testimonials allowed')
  }),
  modeOfDeliverySection: z.object({
    image: z.string().optional(),
    heading: z.string()
      .min(5, 'Heading must be at least 5 characters')
      .max(200, 'Heading must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be less than 2000 characters'),
    highlightedText: z.string()
      .min(10, 'Highlighted text must be at least 10 characters')
      .max(1000, 'Highlighted text must be less than 1000 characters')
  })
});

// Interfaces
interface ChallengeItem {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

interface ResponseItem {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

interface ProgramItem {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

interface TestimonialItem {
  _id?: string;
  text: string;
  author: string;
  role: string;
  avatar: string;
  display_order?: number;
}

interface ElementaryMiddleSchoolPageData {
  heroSection: {
    title: string;
    subtitle?: string;
    description?: string;
    heroImage?: string;
  };
  introduction: {
    heading: string;
    description: string;
  };
  whyThisWorkMattersSection: {
    label?: string;
    heading: string;
    nationalAssessmentData: {
      heading: string;
      items: string[];
    };
    interventionStrategy: {
      heading: string;
      description: string;
    };
  };
  structuralChallengesSection: {
    label?: string;
    heading: string;
    description: string;
    challenges: ChallengeItem[];
  };
  neieaResponseSection: {
    label?: string;
    heading: string;
    description: string;
    responses: ResponseItem[];
  };
  programsSection: {
    label?: string;
    heading: string;
    description: string;
    programs: ProgramItem[];
  };
  reachImpactSection: {
    label?: string;
    heading: string;
    currentReach: {
      image?: string;
      title: string;
      stats: string;
      description: string;
    };
    caseStudy: {
      icon: string;
      heading: string;
      description: string;
      solution: string;
    };
  };
  testimonialsSection: {
    label?: string;
    heading: string;
    testimonials: TestimonialItem[];
  };
  modeOfDeliverySection: {
    image?: string;
    heading: string;
    description: string;
    highlightedText: string;
  };
}

const ElementaryMiddleSchool = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [pageData, setPageData] = useState<ElementaryMiddleSchoolPageData>({
    heroSection: {
      title: 'NEIEA – Elementary & Middle School Initiatives',
      subtitle: 'By Syed Danish Ali',
      description: 'Building Strong Foundations',
      heroImage: '/assets/images/ElementryEducation/image1.jpg'
    },
    introduction: {
      heading: 'Building Strong Foundations',
      description: 'NEIEA gives special emphasis to elementary and middle school education (Grades 1–8)...'
    },
    whyThisWorkMattersSection: {
      heading: 'Why This Work Matters',
      nationalAssessmentData: {
        heading: '📊 National Assessment Data',
        items: []
      },
      interventionStrategy: {
        heading: '🎯 Our Intervention Strategy',
        description: ''
      }
    },
    structuralChallengesSection: {
      heading: 'The Structural Challenges Students Face',
      description: 'Grades 1–8 constitute the largest segment of NEIEA\'s student community...',
      challenges: []
    },
    neieaResponseSection: {
      heading: 'NEIEA\'s Response',
      description: 'NEIEA tackles these systemic handicaps through a multi-layered strategy',
      responses: []
    },
    programsSection: {
      heading: 'Programs & Interventions',
      description: 'NEIEA supports partner schools and learning centres...',
      programs: []
    },
    reachImpactSection: {
      heading: 'Reach & Impact in Elementary and Middle Schools',
      currentReach: {
        title: 'Current Reach',
        stats: '18 Schools • 1,047 Students',
        description: ''
      },
      caseStudy: {
        icon: '🎯',
        heading: 'Karnataka Case Study',
        description: '',
        solution: ''
      }
    },
    testimonialsSection: {
      heading: 'Voices from the Classroom',
      testimonials: []
    },
    modeOfDeliverySection: {
      heading: 'Mode of Delivery',
      description: '',
      highlightedText: ''
    }
  });

  const [loading, setLoading] = useState(true);
  
  // Form states for various items
  const [editingChallenge, setEditingChallenge] = useState<string | null>(null);
  const [isAddingChallenge, setIsAddingChallenge] = useState(false);
  const [challengeForm, setChallengeForm] = useState({ icon: '', title: '', description: '' });
  
  const [editingResponse, setEditingResponse] = useState<string | null>(null);
  const [isAddingResponse, setIsAddingResponse] = useState(false);
  const [responseForm, setResponseForm] = useState({ icon: '', title: '', description: '' });
  
  const [editingProgram, setEditingProgram] = useState<string | null>(null);
  const [isAddingProgram, setIsAddingProgram] = useState(false);
  const [programForm, setProgramForm] = useState({ icon: '', title: '', description: '' });
  
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({ text: '', author: '', role: '', avatar: '' });
  
  const [newAssessmentItem, setNewAssessmentItem] = useState('');
  
  // Image upload states
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [reachImageFile, setReachImageFile] = useState<File | null>(null);
  const [reachImagePreview, setReachImagePreview] = useState<string>('');
  const [modeImageFile, setModeImageFile] = useState<File | null>(null);
  const [modeImagePreview, setModeImagePreview] = useState<string>('');
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [uploadingReachImage, setUploadingReachImage] = useState(false);
  const [uploadingModeImage, setUploadingModeImage] = useState(false);

  // Load page data
  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/elementary-middle-school-page');
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        setPageData(data);
        setHeroImagePreview(data.heroSection?.heroImage || '');
        setReachImagePreview(data.reachImpactSection?.currentReach?.image || '');
        setModeImagePreview(data.modeOfDeliverySection?.image || '');
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        console.log('No page found - will be created on first save');
      } else {
        toast.error(err.response?.data?.message || 'Failed to load page data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      // Add display_order to arrays based on their position
      const dataToSave = {
        ...pageData,
        structuralChallengesSection: {
          ...pageData.structuralChallengesSection,
          challenges: pageData.structuralChallengesSection.challenges.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        neieaResponseSection: {
          ...pageData.neieaResponseSection,
          responses: pageData.neieaResponseSection.responses.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        programsSection: {
          ...pageData.programsSection,
          programs: pageData.programsSection.programs.map((item, index) => ({
            ...item,
            display_order: index
          }))
        },
        testimonialsSection: {
          ...pageData.testimonialsSection,
          testimonials: pageData.testimonialsSection.testimonials.map((item, index) => ({
            ...item,
            display_order: index
          }))
        }
      };

      // Validate using Zod
      const validationResult = elementaryMiddleSchoolPageSchema.safeParse(dataToSave);
      
      if (!validationResult.success) {
        const errors = validationResult.error.errors;
        const firstError = errors[0];
        const errorPath = firstError.path.join(' → ');
        toast.error(`Validation Error: ${errorPath ? errorPath + ': ' : ''}${firstError.message}`);
        return;
      }

      let response;
      try {
        response = await axiosInstance.put('/admin/elementary-middle-school-page', dataToSave);
      } catch (updateErr: any) {
        if (updateErr.response?.status === 404) {
          response = await axiosInstance.post('/admin/elementary-middle-school-page', dataToSave);
        } else {
          throw updateErr;
        }
      }

      if (response.data.success) {
        toast.success('Page saved successfully!');
        loadPageData();
      } else {
        toast.error('Failed to save changes');
      }
    } catch (err: any) {
      console.error('Error saving page data:', err);
      toast.error(err.response?.data?.message || 'Failed to save changes');
    }
  };

  // Challenge Functions
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
      const errors = validationResult.error.errors;
      toast.error(`Validation Error: ${errors[0].message}`);
      return;
    }

    if (editingChallenge) {
      setPageData(prev => ({
        ...prev,
        structuralChallengesSection: {
          ...prev.structuralChallengesSection,
          challenges: prev.structuralChallengesSection.challenges.map(c =>
            c._id === editingChallenge ? { ...c, ...challengeForm } : c
          )
        }
      }));
      toast.success('Challenge updated locally. Click "Save All Changes" to save to database.');
    } else {
      setPageData(prev => ({
        ...prev,
        structuralChallengesSection: {
          ...prev.structuralChallengesSection,
          challenges: [...prev.structuralChallengesSection.challenges, { ...challengeForm }]
        }
      }));
      toast.success('Challenge added locally. Click "Save All Changes" to save to database.');
    }

    setEditingChallenge(null);
    setIsAddingChallenge(false);
    setChallengeForm({ icon: '', title: '', description: '' });
  };

  const handleDeleteChallenge = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      setPageData(prev => ({
        ...prev,
        structuralChallengesSection: {
          ...prev.structuralChallengesSection,
          challenges: prev.structuralChallengesSection.challenges.filter(c => c._id !== id)
        }
      }));
      toast.success('Challenge deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  const handleCancelChallenge = () => {
    setEditingChallenge(null);
    setIsAddingChallenge(false);
    setChallengeForm({ icon: '', title: '', description: '' });
  };

  // Response Functions (same pattern as challenges)
  const handleAddResponse = () => {
    setIsAddingResponse(true);
    setResponseForm({ icon: '', title: '', description: '' });
  };

  const handleEditResponse = (response: ResponseItem) => {
    setEditingResponse(response._id || null);
    setResponseForm({
      icon: response.icon,
      title: response.title,
      description: response.description
    });
  };

  const handleSaveResponse = () => {
    const validationResult = responseItemSchema.safeParse(responseForm);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      toast.error(`Validation Error: ${errors[0].message}`);
      return;
    }

    if (editingResponse) {
      setPageData(prev => ({
        ...prev,
        neieaResponseSection: {
          ...prev.neieaResponseSection,
          responses: prev.neieaResponseSection.responses.map(r =>
            r._id === editingResponse ? { ...r, ...responseForm } : r
          )
        }
      }));
      toast.success('Response updated locally. Click "Save All Changes" to save to database.');
    } else {
      setPageData(prev => ({
        ...prev,
        neieaResponseSection: {
          ...prev.neieaResponseSection,
          responses: [...prev.neieaResponseSection.responses, { ...responseForm }]
        }
      }));
      toast.success('Response added locally. Click "Save All Changes" to save to database.');
    }

    setEditingResponse(null);
    setIsAddingResponse(false);
    setResponseForm({ icon: '', title: '', description: '' });
  };

  const handleDeleteResponse = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this response?')) {
      setPageData(prev => ({
        ...prev,
        neieaResponseSection: {
          ...prev.neieaResponseSection,
          responses: prev.neieaResponseSection.responses.filter(r => r._id !== id)
        }
      }));
      toast.success('Response deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  const handleCancelResponse = () => {
    setEditingResponse(null);
    setIsAddingResponse(false);
    setResponseForm({ icon: '', title: '', description: '' });
  };

  // Program Functions (same pattern)
  const handleAddProgram = () => {
    setIsAddingProgram(true);
    setProgramForm({ icon: '', title: '', description: '' });
  };

  const handleEditProgram = (program: ProgramItem) => {
    setEditingProgram(program._id || null);
    setProgramForm({
      icon: program.icon,
      title: program.title,
      description: program.description
    });
  };

  const handleSaveProgram = () => {
    const validationResult = programItemSchema.safeParse(programForm);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      toast.error(`Validation Error: ${errors[0].message}`);
      return;
    }

    if (editingProgram) {
      setPageData(prev => ({
        ...prev,
        programsSection: {
          ...prev.programsSection,
          programs: prev.programsSection.programs.map(p =>
            p._id === editingProgram ? { ...p, ...programForm } : p
          )
        }
      }));
      toast.success('Program updated locally. Click "Save All Changes" to save to database.');
    } else {
      setPageData(prev => ({
        ...prev,
        programsSection: {
          ...prev.programsSection,
          programs: [...prev.programsSection.programs, { ...programForm }]
        }
      }));
      toast.success('Program added locally. Click "Save All Changes" to save to database.');
    }

    setEditingProgram(null);
    setIsAddingProgram(false);
    setProgramForm({ icon: '', title: '', description: '' });
  };

  const handleDeleteProgram = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPageData(prev => ({
        ...prev,
        programsSection: {
          ...prev.programsSection,
          programs: prev.programsSection.programs.filter(p => p._id !== id)
        }
      }));
      toast.success('Program deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  const handleCancelProgram = () => {
    setEditingProgram(null);
    setIsAddingProgram(false);
    setProgramForm({ icon: '', title: '', description: '' });
  };

  // Testimonial Functions
  const handleAddTestimonial = () => {
    setIsAddingTestimonial(true);
    setTestimonialForm({ text: '', author: '', role: '', avatar: '' });
  };

  const handleEditTestimonial = (testimonial: TestimonialItem) => {
    setEditingTestimonial(testimonial._id || null);
    setTestimonialForm({
      text: testimonial.text,
      author: testimonial.author,
      role: testimonial.role,
      avatar: testimonial.avatar
    });
  };

  const handleSaveTestimonial = () => {
    const validationResult = testimonialItemSchema.safeParse(testimonialForm);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      toast.error(`Validation Error: ${errors[0].message}`);
      return;
    }

    if (editingTestimonial) {
      setPageData(prev => ({
        ...prev,
        testimonialsSection: {
          ...prev.testimonialsSection,
          testimonials: prev.testimonialsSection.testimonials.map(t =>
            t._id === editingTestimonial ? { ...t, ...testimonialForm } : t
          )
        }
      }));
      toast.success('Testimonial updated locally. Click "Save All Changes" to save to database.');
    } else {
      setPageData(prev => ({
        ...prev,
        testimonialsSection: {
          ...prev.testimonialsSection,
          testimonials: [...prev.testimonialsSection.testimonials, { ...testimonialForm }]
        }
      }));
      toast.success('Testimonial added locally. Click "Save All Changes" to save to database.');
    }

    setEditingTestimonial(null);
    setIsAddingTestimonial(false);
    setTestimonialForm({ text: '', author: '', role: '', avatar: '' });
  };

  const handleDeleteTestimonial = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setPageData(prev => ({
        ...prev,
        testimonialsSection: {
          ...prev.testimonialsSection,
          testimonials: prev.testimonialsSection.testimonials.filter(t => t._id !== id)
        }
      }));
      toast.success('Testimonial deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  const handleCancelTestimonial = () => {
    setEditingTestimonial(null);
    setIsAddingTestimonial(false);
    setTestimonialForm({ text: '', author: '', role: '', avatar: '' });
  };

  // Assessment Item Functions
  const handleAddAssessmentItem = () => {
    const trimmedItem = newAssessmentItem.trim();
    
    if (!trimmedItem) {
      toast.error('Item text is required');
      return;
    }

    if (trimmedItem.length < 5) {
      toast.error('Item text must be at least 5 characters');
      return;
    }

    if (trimmedItem.length > 500) {
      toast.error('Item text must be less than 500 characters');
      return;
    }

    setPageData(prev => ({
      ...prev,
      whyThisWorkMattersSection: {
        ...prev.whyThisWorkMattersSection,
        nationalAssessmentData: {
          ...prev.whyThisWorkMattersSection.nationalAssessmentData,
          items: [...prev.whyThisWorkMattersSection.nationalAssessmentData.items, trimmedItem]
        }
      }
    }));
    setNewAssessmentItem('');
    toast.success('Assessment item added locally. Click "Save All Changes" to save to database.');
  };

  const handleDeleteAssessmentItem = (index: number) => {
    setPageData(prev => ({
      ...prev,
      whyThisWorkMattersSection: {
        ...prev.whyThisWorkMattersSection,
        nationalAssessmentData: {
          ...prev.whyThisWorkMattersSection.nationalAssessmentData,
          items: prev.whyThisWorkMattersSection.nationalAssessmentData.items.filter((_, i) => i !== index)
        }
      }
    }));
    toast.success('Assessment item removed locally. Click "Save All Changes" to save to database.');
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

  const handleChallengeDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const challenges = [...pageData.structuralChallengesSection.challenges];
      const draggedItem = challenges[dragIndex];
      challenges.splice(dragIndex, 1);
      challenges.splice(dropIndex, 0, draggedItem);

      setPageData(prev => ({
        ...prev,
        structuralChallengesSection: {
          ...prev.structuralChallengesSection,
          challenges
        }
      }));

      // Update order via API
      try {
        const reorderData = challenges.map((item, index) => ({
          id: item._id!,
          display_order: index + 1
        }));
        
        await axiosInstance.post('/admin/elementary-middle-school-page/reorder', {
          section: 'challenges',
          items: reorderData
        });
        toast.success('Challenge order updated');
      } catch (err) {
        toast.error('Failed to update order');
        loadPageData(); // Revert on error
      }
    }
  };

  const handleResponseDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const responses = [...pageData.neieaResponseSection.responses];
      const draggedItem = responses[dragIndex];
      responses.splice(dragIndex, 1);
      responses.splice(dropIndex, 0, draggedItem);

      setPageData(prev => ({
        ...prev,
        neieaResponseSection: {
          ...prev.neieaResponseSection,
          responses
        }
      }));

      try {
        const reorderData = responses.map((item, index) => ({
          id: item._id!,
          display_order: index + 1
        }));
        
        await axiosInstance.post('/admin/elementary-middle-school-page/reorder', {
          section: 'responses',
          items: reorderData
        });
        toast.success('Response order updated');
      } catch (err) {
        toast.error('Failed to update order');
        loadPageData();
      }
    }
  };

  const handleProgramDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const programs = [...pageData.programsSection.programs];
      const draggedItem = programs[dragIndex];
      programs.splice(dragIndex, 1);
      programs.splice(dropIndex, 0, draggedItem);

      setPageData(prev => ({
        ...prev,
        programsSection: {
          ...prev.programsSection,
          programs
        }
      }));

      try {
        const reorderData = programs.map((item, index) => ({
          id: item._id!,
          display_order: index + 1
        }));
        
        await axiosInstance.post('/admin/elementary-middle-school-page/reorder', {
          section: 'programs',
          items: reorderData
        });
        toast.success('Program order updated');
      } catch (err) {
        toast.error('Failed to update order');
        loadPageData();
      }
    }
  };

  const handleTestimonialDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const testimonials = [...pageData.testimonialsSection.testimonials];
      const draggedItem = testimonials[dragIndex];
      testimonials.splice(dragIndex, 1);
      testimonials.splice(dropIndex, 0, draggedItem);

      setPageData(prev => ({
        ...prev,
        testimonialsSection: {
          ...prev.testimonialsSection,
          testimonials
        }
      }));

      try {
        const reorderData = testimonials.map((item, index) => ({
          id: item._id!,
          display_order: index + 1
        }));
        
        await axiosInstance.post('/admin/elementary-middle-school-page/reorder', {
          section: 'testimonials',
          items: reorderData
        });
        toast.success('Testimonial order updated');
      } catch (err) {
        toast.error('Failed to update order');
        loadPageData();
      }
    }
  };

  // Image Upload Functions
  const handleHeroImageUpload = async () => {
    if (!heroImageFile) {
      toast.error('Please select an image file');
      return;
    }

    try {
      setUploadingHeroImage(true);
      const formData = new FormData();
      formData.append('heroImage', heroImageFile);

      const response = await axiosInstance.post(
        '/admin/elementary-middle-school-page/upload-hero-image',
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
        toast.success('Hero image uploaded successfully');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload hero image');
    } finally {
      setUploadingHeroImage(false);
    }
  };

  const handleReachImageUpload = async () => {
    if (!reachImageFile) {
      toast.error('Please select an image file');
      return;
    }

    try {
      setUploadingReachImage(true);
      const formData = new FormData();
      formData.append('reachImage', reachImageFile);

      const response = await axiosInstance.post(
        '/admin/elementary-middle-school-page/upload-reach-image',
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
          reachImpactSection: {
            ...prev.reachImpactSection,
            currentReach: {
              ...prev.reachImpactSection.currentReach,
              image: response.data.data.image
            }
          }
        }));
        setReachImagePreview(response.data.data.image);
        setReachImageFile(null);
        toast.success('Reach image uploaded successfully!');
      }
    } catch (err: any) {
      console.error('Error uploading reach image:', err);
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingReachImage(false);
    }
  };

  const handleModeImageUpload = async () => {
    if (!modeImageFile) {
      toast.error('Please select an image file');
      return;
    }

    try {
      setUploadingModeImage(true);
      const formData = new FormData();
      formData.append('modeImage', modeImageFile);

      const response = await axiosInstance.post(
        '/admin/elementary-middle-school-page/upload-mode-image',
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
          modeOfDeliverySection: {
            ...prev.modeOfDeliverySection,
            image: response.data.data.image
          }
        }));
        setModeImagePreview(response.data.data.image);
        setModeImageFile(null);
        toast.success('Mode of delivery image uploaded successfully!');
      }
    } catch (err: any) {
      console.error('Error uploading mode image:', err);
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingModeImage(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-700 text-lg">Loading Elementary Middle School Page Management...</div>
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
            Manage Elementary Middle School Page
          </h1>
          <p className="text-gray-600">Update all content for the elementary middle school page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {['hero', 'introduction', 'why-this-work', 'challenges', 'responses', 'programs', 'reach-impact', 'testimonials', 'mode-delivery'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeSection === section
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
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
                value={pageData?.heroSection?.title}
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
                value={pageData?.heroSection?.subtitle || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  heroSection: { ...prev.heroSection, subtitle: e.target.value }
                }))}
                placeholder="Enter subtitle (e.g., By Author Name)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description/Tagline
              </label>
              <Input
                value={pageData.heroSection?.description || ''}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  heroSection: { ...prev.heroSection, description: e.target.value }
                }))}
                placeholder="Enter description or tagline"
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
                value={pageData.introduction.heading}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  introduction: { ...prev.introduction, heading: e.target.value }
                }))}
                placeholder="Enter introduction heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <Textarea
                value={pageData.introduction.description}
                onChange={(e) => setPageData(prev => ({
                  ...prev,
                  introduction: { ...prev.introduction, description: e.target.value }
                }))}
                placeholder="Enter introduction description"
                rows={6}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Why This Work Matters Section */}
      {activeSection === 'why-this-work' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why This Work Matters Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Heading *
                </label>
                <Input
                  value={pageData.whyThisWorkMattersSection.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    whyThisWorkMattersSection: { ...prev.whyThisWorkMattersSection, heading: e.target.value }
                  }))}
                  placeholder="Enter section heading"
                />
              </div>

              {/* National Assessment Data */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  National Assessment Data Heading *
                </label>
                <Input
                  value={pageData.whyThisWorkMattersSection.nationalAssessmentData.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    whyThisWorkMattersSection: {
                      ...prev.whyThisWorkMattersSection,
                      nationalAssessmentData: {
                        ...prev.whyThisWorkMattersSection.nationalAssessmentData,
                        heading: e.target.value
                      }
                    }
                  }))}
                  placeholder="Enter heading"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Items *
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newAssessmentItem}
                    onChange={(e) => setNewAssessmentItem(e.target.value)}
                    placeholder="Enter new assessment item"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAssessmentItem()}
                  />
                  <Button onClick={handleAddAssessmentItem} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {pageData.whyThisWorkMattersSection.nationalAssessmentData.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-blue-50 p-3 rounded border">
                      <span className="flex-1">{item}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAssessmentItem(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intervention Strategy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intervention Strategy Heading *
                </label>
                <Input
                  value={pageData.whyThisWorkMattersSection.interventionStrategy.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    whyThisWorkMattersSection: {
                      ...prev.whyThisWorkMattersSection,
                      interventionStrategy: {
                        ...prev.whyThisWorkMattersSection.interventionStrategy,
                        heading: e.target.value
                      }
                    }
                  }))}
                  placeholder="Enter heading"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intervention Strategy Description *
                </label>
                <Textarea
                  value={pageData.whyThisWorkMattersSection.interventionStrategy.description}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    whyThisWorkMattersSection: {
                      ...prev.whyThisWorkMattersSection,
                      interventionStrategy: {
                        ...prev.whyThisWorkMattersSection.interventionStrategy,
                        description: e.target.value
                      }
                    }
                  }))}
                  placeholder="Enter description"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Challenges Section - Continue with similar pattern for other sections... */}
      {activeSection === 'challenges' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Structural Challenges</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder challenges</p>
            </div>
            <Button onClick={handleAddChallenge} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Challenge
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Label (Optional)
                  </label>
                  <Input
                    value={pageData.structuralChallengesSection.label || ''}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      structuralChallengesSection: { ...prev.structuralChallengesSection, label: e.target.value }
                    }))}
                    placeholder="Enter section label"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Heading *
                  </label>
                  <Input
                    value={pageData.structuralChallengesSection.heading}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      structuralChallengesSection: { ...prev.structuralChallengesSection, heading: e.target.value }
                    }))}
                    placeholder="Enter section heading"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Description
                  </label>
                  <Textarea
                    value={pageData.structuralChallengesSection.description}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      structuralChallengesSection: { ...prev.structuralChallengesSection, description: e.target.value }
                    }))}
                    placeholder="Enter section description"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Form */}
          {(isAddingChallenge || editingChallenge) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingChallenge ? 'Edit Challenge' : 'Add New Challenge'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji) *
                    </label>
                    <Input
                      value={challengeForm.icon}
                      onChange={(e) => setChallengeForm({...challengeForm, icon: e.target.value})}
                      placeholder="Enter emoji (e.g., 👨‍👩‍👧‍👦)"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input
                      value={challengeForm.title}
                      onChange={(e) => setChallengeForm({...challengeForm, title: e.target.value})}
                      placeholder="Enter challenge title"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    value={challengeForm.description}
                    onChange={(e) => setChallengeForm({...challengeForm, description: e.target.value})}
                    placeholder="Enter challenge description"
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveChallenge} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingChallenge ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelChallenge} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Challenges List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.structuralChallengesSection.challenges.map((challenge, index) => (
              <Card
                key={challenge._id || index}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleChallengeDrop(e, index)}
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
                  <div className="text-4xl mb-3">{challenge.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditChallenge(challenge)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteChallenge(challenge._id)}
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

      {/* Responses Section */}
      {activeSection === 'responses' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">NEIEA's Response</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder responses</p>
            </div>
            <Button onClick={handleAddResponse} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Response
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Heading *
                  </label>
                  <Input
                    value={pageData.neieaResponseSection.heading}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      neieaResponseSection: { ...prev.neieaResponseSection, heading: e.target.value }
                    }))}
                    placeholder="Enter section heading"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Description
                  </label>
                  <Textarea
                    value={pageData.neieaResponseSection.description}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      neieaResponseSection: { ...prev.neieaResponseSection, description: e.target.value }
                    }))}
                    placeholder="Enter section description"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {(isAddingResponse || editingResponse) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingResponse ? 'Edit Response' : 'Add New Response'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji) *
                    </label>
                    <Input
                      value={responseForm.icon}
                      onChange={(e) => setResponseForm({...responseForm, icon: e.target.value})}
                      placeholder="Enter emoji"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input
                      value={responseForm.title}
                      onChange={(e) => setResponseForm({...responseForm, title: e.target.value})}
                      placeholder="Enter response title"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    value={responseForm.description}
                    onChange={(e) => setResponseForm({...responseForm, description: e.target.value})}
                    placeholder="Enter response description"
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveResponse} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingResponse ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelResponse} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.neieaResponseSection.responses.map((response, index) => (
              <Card
                key={response._id || index}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleResponseDrop(e, index)}
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
                  <div className="text-center">
                    <div className="text-5xl mb-3">{response.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{response.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{response.description}</p>
                    <div className="flex space-x-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditResponse(response)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteResponse(response._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Programs Section */}
      {activeSection === 'programs' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Programs & Interventions</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder programs</p>
            </div>
            <Button onClick={handleAddProgram} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Program
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Heading *
                  </label>
                  <Input
                    value={pageData.programsSection.heading}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      programsSection: { ...prev.programsSection, heading: e.target.value }
                    }))}
                    placeholder="Enter section heading"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Description
                  </label>
                  <Textarea
                    value={pageData.programsSection.description}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      programsSection: { ...prev.programsSection, description: e.target.value }
                    }))}
                    placeholder="Enter section description"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {(isAddingProgram || editingProgram) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingProgram ? 'Edit Program' : 'Add New Program'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji) *
                    </label>
                    <Input
                      value={programForm.icon}
                      onChange={(e) => setProgramForm({...programForm, icon: e.target.value})}
                      placeholder="Enter emoji"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input
                      value={programForm.title}
                      onChange={(e) => setProgramForm({...programForm, title: e.target.value})}
                      placeholder="Enter program title"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    value={programForm.description}
                    onChange={(e) => setProgramForm({...programForm, description: e.target.value})}
                    placeholder="Enter program description"
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveProgram} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingProgram ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelProgram} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.programsSection.programs.map((program, index) => (
              <Card
                key={program._id || index}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleProgramDrop(e, index)}
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
                  <div className="text-center">
                    <div className="text-5xl mb-3">{program.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                    <div className="flex space-x-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProgram(program)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProgram(program._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Reach & Impact Section */}
      {activeSection === 'reach-impact' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reach & Impact Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Heading *
                </label>
                <Input
                  value={pageData.reachImpactSection.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    reachImpactSection: { ...prev.reachImpactSection, heading: e.target.value }
                  }))}
                  placeholder="Enter section heading"
                />
              </div>

              {/* Current Reach */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Current Reach</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reach Image
                    </label>
                    <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                    <ImageUpload
                      value={reachImagePreview}
                      onChange={(file, previewUrl) => {
                        setReachImageFile(file);
                        setReachImagePreview(previewUrl);
                      }}
                      placeholder="Upload reach image"
                      required={false}
                      previewSize="lg"
                    />
                    {reachImageFile && (
                      <Button
                        onClick={handleReachImageUpload}
                        disabled={uploadingReachImage}
                        className="mt-2 bg-blue-600 hover:bg-blue-700"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadingReachImage ? 'Uploading...' : 'Upload Image'}
                      </Button>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input
                      value={pageData.reachImpactSection.currentReach.title}
                      onChange={(e) => setPageData(prev => ({
                        ...prev,
                        reachImpactSection: {
                          ...prev.reachImpactSection,
                          currentReach: {
                            ...prev.reachImpactSection.currentReach,
                            title: e.target.value
                          }
                        }
                      }))}
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stats *
                    </label>
                    <Input
                      value={pageData.reachImpactSection.currentReach.stats}
                      onChange={(e) => setPageData(prev => ({
                        ...prev,
                        reachImpactSection: {
                          ...prev.reachImpactSection,
                          currentReach: {
                            ...prev.reachImpactSection.currentReach,
                            stats: e.target.value
                          }
                        }
                      }))}
                      placeholder="e.g., 18 Schools • 1,047 Students"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <Textarea
                      value={pageData.reachImpactSection.currentReach.description}
                      onChange={(e) => setPageData(prev => ({
                        ...prev,
                        reachImpactSection: {
                          ...prev.reachImpactSection,
                          currentReach: {
                            ...prev.reachImpactSection.currentReach,
                            description: e.target.value
                          }
                        }
                      }))}
                      placeholder="Enter description"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Case Study */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Case Study</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji) *
                    </label>
                    <Input
                      value={pageData.reachImpactSection.caseStudy.icon}
                      onChange={(e) => setPageData(prev => ({
                        ...prev,
                        reachImpactSection: {
                          ...prev.reachImpactSection,
                          caseStudy: {
                            ...prev.reachImpactSection.caseStudy,
                            icon: e.target.value
                          }
                        }
                      }))}
                      placeholder="Enter emoji"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading *
                    </label>
                    <Input
                      value={pageData.reachImpactSection.caseStudy.heading}
                      onChange={(e) => setPageData(prev => ({
                        ...prev,
                        reachImpactSection: {
                          ...prev.reachImpactSection,
                          caseStudy: {
                            ...prev.reachImpactSection.caseStudy,
                            heading: e.target.value
                          }
                        }
                      }))}
                      placeholder="Enter heading"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <Textarea
                      value={pageData.reachImpactSection.caseStudy.description}
                      onChange={(e) => setPageData(prev => ({
                        ...prev,
                        reachImpactSection: {
                          ...prev.reachImpactSection,
                          caseStudy: {
                            ...prev.reachImpactSection.caseStudy,
                            description: e.target.value
                          }
                        }
                      }))}
                      placeholder="Enter description"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Solution *
                    </label>
                    <Textarea
                      value={pageData.reachImpactSection.caseStudy.solution}
                      onChange={(e) => setPageData(prev => ({
                        ...prev,
                        reachImpactSection: {
                          ...prev.reachImpactSection,
                          caseStudy: {
                            ...prev.reachImpactSection.caseStudy,
                            solution: e.target.value
                          }
                        }
                      }))}
                      placeholder="Enter solution"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Testimonials Section */}
      {activeSection === 'testimonials' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Testimonials</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder testimonials</p>
            </div>
            <Button onClick={handleAddTestimonial} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Heading *
                  </label>
                  <Input
                    value={pageData.testimonialsSection.heading}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      testimonialsSection: { ...prev.testimonialsSection, heading: e.target.value }
                    }))}
                    placeholder="Enter section heading"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {(isAddingTestimonial || editingTestimonial) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonial Text *
                  </label>
                  <Textarea
                    value={testimonialForm.text}
                    onChange={(e) => setTestimonialForm({...testimonialForm, text: e.target.value})}
                    placeholder="Enter testimonial text"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author Name *
                    </label>
                    <Input
                      value={testimonialForm.author}
                      onChange={(e) => setTestimonialForm({...testimonialForm, author: e.target.value})}
                      placeholder="Enter author name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role/Location *
                    </label>
                    <Input
                      value={testimonialForm.role}
                      onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})}
                      placeholder="Enter role/location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar (Emoji) *
                    </label>
                    <Input
                      value={testimonialForm.avatar}
                      onChange={(e) => setTestimonialForm({...testimonialForm, avatar: e.target.value})}
                      placeholder="Enter emoji"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveTestimonial} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingTestimonial ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelTestimonial} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.testimonialsSection.testimonials.map((testimonial, index) => (
              <Card
                key={testimonial._id || index}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleTestimonialDrop(e, index)}
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
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">{testimonial.avatar}</div>
                  </div>
                  <blockquote className="text-center mb-4 italic text-gray-700">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-center">
                    <h6 className="font-semibold text-gray-900 mb-1">{testimonial.author}</h6>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <div className="flex space-x-2 mt-4 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditTestimonial(testimonial)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTestimonial(testimonial._id)}
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

      {/* Mode of Delivery Section */}
      {activeSection === 'mode-delivery' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mode of Delivery Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode of Delivery Image
                </label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                <ImageUpload
                  value={modeImagePreview}
                  onChange={(file, previewUrl) => {
                    setModeImageFile(file);
                    setModeImagePreview(previewUrl);
                  }}
                  placeholder="Upload mode of delivery image"
                  required={false}
                  previewSize="lg"
                />
                {modeImageFile && (
                  <Button
                    onClick={handleModeImageUpload}
                    disabled={uploadingModeImage}
                    className="mt-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingModeImage ? 'Uploading...' : 'Upload Image'}
                  </Button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading *
                </label>
                <Input
                  value={pageData.modeOfDeliverySection.heading}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    modeOfDeliverySection: { ...prev.modeOfDeliverySection, heading: e.target.value }
                  }))}
                  placeholder="Enter heading"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <Textarea
                  value={pageData.modeOfDeliverySection.description}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    modeOfDeliverySection: { ...prev.modeOfDeliverySection, description: e.target.value }
                  }))}
                  placeholder="Enter description"
                  rows={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Highlighted Text *
                </label>
                <Textarea
                  value={pageData.modeOfDeliverySection.highlightedText}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    modeOfDeliverySection: { ...prev.modeOfDeliverySection, highlightedText: e.target.value }
                  }))}
                  placeholder="Enter highlighted text"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
};

export default ElementaryMiddleSchool;


