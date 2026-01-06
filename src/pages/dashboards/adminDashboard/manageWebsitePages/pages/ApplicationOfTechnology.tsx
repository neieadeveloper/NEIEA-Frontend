import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';

// TypeScript Interfaces
interface DigitalClassroomTool {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

interface OnboardingStep {
  _id?: string;
  step: number;
  title: string;
  description: string;
  display_order?: number;
}

interface DigitalTool {
  _id?: string;
  tool: string;
  purpose: string;
  display_order?: number;
}

interface AITool {
  _id?: string;
  tool: string;
  description: string;
  display_order?: number;
}

interface AppTechPageData {
  headerSection: {
    title: string;
    subtitle?: string;
    description?: string;
    heroImage?: string;
    heroVideoUrl?: string;
  };
  digitalClassroomSection: {
    title: string;
    description: string;
    image?: string;
    tools: DigitalClassroomTool[];
    summaryText?: string;
  };
  onboardingSection: {
    title: string;
    description: string;
    image?: string;
    steps: OnboardingStep[];
  };
  digitalToolboxSection: {
    title: string;
    description: string;
    tools: DigitalTool[];
    summaryText?: string;
  };
  hybridLearningSection: {
    title: string;
    description: string;
    onsiteTitle: string;
    onsiteDescription: string;
    remoteTitle: string;
    remoteDescription: string;
  };
  powerBackupSection: {
    title: string;
    description: string;
    solutions: string[];
    summaryText?: string;
  };
  aiIntegrationSection: {
    title: string;
    description: string;
    image?: string;
    tools: AITool[];
    summaryText?: string;
  };
  salesforceCRMSection: {
    title: string;
    description: string;
    features: { icon: string; title: string; description: string }[];
    summaryText?: string;
  };
  missionSection: {
    title: string;
    description: string;
  };
  callToActionSection: {
    title: string;
    description: string;
    contactEmail: string;
  };
}

const ApplicationOfTechnology = () => {
  const [activeSection, setActiveSection] = useState('header');
  const [appTechData, setAppTechData] = useState<AppTechPageData>({
    headerSection: {
      title: 'Application Of Technology',
      subtitle: 'Transforming Education Through Digital Innovation',
      description: 'Every NEIEA-powered classroom is carefully set up with the essentials for seamless online learning, ensuring every learner gets a consistent and enriching classroom experience.',
      heroImage: '/assets/images/applicationOfTech.png',
      heroVideoUrl: ''
    },
    digitalClassroomSection: {
      title: 'What Powers a NEIEA Digital Classroom?',
      description: 'Every NEIEA-powered classroom—whether onsite or remote—is carefully set up with the essentials for seamless online learning:',
      image: '/assets/images/applicationOfTech1.png',
      tools: [
        {
          _id: 'tool-1',
          icon: '💻',
          title: 'Laptops for teachers',
          description: 'to access resources, attend classes, and collaborate.'
        },
        {
          _id: 'tool-2',
          icon: '🖨️',
          title: 'Printers',
          description: 'to support offline learning through worksheets and handouts.'
        },
        {
          _id: 'tool-3',
          icon: '📺',
          title: 'LCD Screens',
          description: 'connected via HDMI Cable through Laptop\'s or via CPU for students that make Teaching facilitation, presentations and videos vibrant and engaging for large groups.'
        },
        {
          _id: 'tool-4',
          icon: '📹',
          title: 'Web Cameras & Microphones',
          description: 'to enable two-way interaction in live sessions.'
        },
        {
          _id: 'tool-5',
          icon: '🔊',
          title: 'Speakers',
          description: 'for crystal-clear audio in group or hybrid environments.'
        },
        {
          _id: 'tool-6',
          icon: '🔋',
          title: 'Power Backup (UPS, Inverters)',
          description: 'to protect classes from power outages and data loss.'
        },
        {
          _id: 'tool-7',
          icon: '🌐',
          title: 'High-Speed Internet',
          description: 'for uninterrupted video conferencing, assessments, and live engagement.'
        }
      ],
      summaryText: 'These tools ensure every learner, whether in a madrasa, an orphanage, or a remote rural center, gets a consistent and enriching classroom experience.'
    },
    onboardingSection: {
      title: 'The NEIEA Onboarding & Enrollment Process',
      description: 'Our outreach and implementation teams follow a structured 7-step process to bring new institutions into the NEIEA fold:',
      image: '/assets/images/applicationOfTech2.png',
      steps: [
        {
          _id: 'step-1',
          step: 1,
          title: 'Outreach Team Contact',
          description: 'Reaches out to madrasas, NGOs, orphanages, and under-resourced schools.'
        },
        {
          _id: 'step-2',
          step: 2,
          title: 'Explaining the Program',
          description: 'The NEIEA coordinator shares our digital learning model, resources, and support structure.'
        },
        {
          _id: 'step-3',
          step: 3,
          title: 'IT Infrastructure Check',
          description: 'Our IT team inspects the institution\'s readiness and recommends necessary upgrades.'
        },
        {
          _id: 'step-4',
          step: 4,
          title: 'Infrastructure Installation',
          description: 'Devices, internet, and power backups are set up based on NEIEA guidelines.'
        },
        {
          _id: 'step-5',
          step: 5,
          title: 'Student List Shared',
          description: 'The institution submits participating students to NEIEA\'s deputy supervisor.'
        },
        {
          _id: 'step-6',
          step: 6,
          title: 'Class Scheduling',
          description: 'Timetables are planned to align with the institution\'s existing schedule.'
        },
        {
          _id: 'step-7',
          step: 7,
          title: 'Baseline Assessment & Classes Begin',
          description: 'We assess student levels and launch full-fledged live online sessions.'
        }
      ]
    },
    digitalToolboxSection: {
      title: '🧰 NEIEA\'s Digital Toolbox',
      description: 'We use a combination of free, open-source, and cutting-edge digital tools to create an interactive and personalized learning experience:',
      tools: [
        { _id: 'dtool-1', tool: 'Google Classroom', purpose: 'Class assignments, announcements, and feedback' },
        { _id: 'dtool-2', tool: 'Google Docs/Slides', purpose: 'Real-time collaboration and visual teaching' },
        { _id: 'dtool-3', tool: 'Google Forms', purpose: 'Assessments and progress tracking' },
        { _id: 'dtool-4', tool: 'ChatGPT', purpose: 'AI-generated MCQs and content support' },
        { _id: 'dtool-5', tool: 'Google Gemini', purpose: 'Natural language-based teaching assistance' },
        { _id: 'dtool-6', tool: 'Canva', purpose: 'Visual content creation and worksheets' },
        { _id: 'dtool-7', tool: 'Gamma AI', purpose: 'Fast, beautiful slide decks and documents' },
        { _id: 'dtool-8', tool: 'AI Image/Video Generators', purpose: 'Creating custom visuals and multimedia content' }
      ],
      summaryText: 'This blended suite helps us bridge gaps between student needs and mentor delivery, especially in low-resource environments.'
    },
    hybridLearningSection: {
      title: '🔁 Hybrid Classrooms: Onsite + Online Learning',
      description: 'NEIEA\'s classrooms come in two formats:',
      onsiteTitle: 'Onsite Classrooms',
      onsiteDescription: 'We set up tech-enabled classrooms inside partner institutions. Students gather together, and mentors deliver live classes via LCD screen and webcam, supported by in-person facilitators.',
      remoteTitle: 'Individual Students via Google Meet',
      remoteDescription: 'Students in remote locations join directly from their homes or nearby centers. NEIEA ensures devices and internet support are provided, enabling smooth integration into the learning network.'
    },
    powerBackupSection: {
      title: '⚡ Always On: Power Backup for Continuity',
      description: 'Many of our centers face power outages. To ensure uninterrupted learning, NEIEA deploys:',
      solutions: [
        'Uninterruptible Power Supplies (UPS)',
        'Inverters',
        'Generators (where needed)'
      ],
      summaryText: 'This system protects our students from missing lessons, our mentors from disruptions, and our data from loss or corruption.'
    },
    aiIntegrationSection: {
      title: '🤖 Using AI to Elevate Learning',
      description: 'NEIEA has integrated Artificial Intelligence into both teaching and administration, using tools like:',
      image: '/assets/images/applicationOfTech3.png',
      tools: [
        {
          _id: 'aitool-1',
          tool: 'ChatGPT',
          description: 'for generating customized question papers and exercises.'
        },
        {
          _id: 'aitool-2',
          tool: 'Google Gemini',
          description: 'for explaining concepts or solving doubts.'
        },
        {
          _id: 'aitool-3',
          tool: 'AI Image Generators',
          description: 'to create illustrations for concepts like math shapes or science experiments.'
        },
        {
          _id: 'aitool-4',
          tool: 'AI Video Creators',
          description: 'to produce explainer videos and visual storytelling.'
        },
        {
          _id: 'aitool-5',
          tool: 'Gamma AI',
          description: 'for quick content generation (presentations, documents, proposals).'
        }
      ],
      summaryText: 'These tools save time, personalize content, and empower teachers to work smarter, not harder.'
    },
    salesforceCRMSection: {
      title: '🔗 Transparent Impact with Salesforce CRM',
      description: 'At NEIEA, we don\'t just teach—we build trust and community. We use Salesforce CRM to:',
      features: [
        {
          icon: '📊',
          title: 'Track Contributions',
          description: 'Track donor contributions and map them directly to student outcomes'
        },
        {
          icon: '🔄',
          title: 'Real-time Updates',
          description: 'Enable real-time updates for donors and parents'
        },
        {
          icon: '💬',
          title: 'Direct Communication',
          description: 'Foster direct communication (when needed) to keep all parties informed and involved'
        }
      ],
      summaryText: 'This transparency turns donors into lifelong supporters and parents into partners in their child\'s journey.'
    },
    missionSection: {
      title: '🌍 Our Mission: Empower Through Access',
      description: 'The future of education is not just digital—it\'s inclusive, adaptable, and rooted in real relationships. At NEIEA, we\'re not just bringing tech into the classroom—we\'re making sure that no child is left out of the digital revolution.'
    },
    callToActionSection: {
      title: '💬 Want to Partner with Us?',
      description: 'Are you an NGO, madrasa, or donor interested in supporting tech-enabled education?',
      contactEmail: 'info@neiea.org'
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Image upload states
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [uploadingOnboardingImage, setUploadingOnboardingImage] = useState(false);
  const [uploadingAIImage, setUploadingAIImage] = useState(false);
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  const onboardingImageInputRef = useRef<HTMLInputElement>(null);
  const aiImageInputRef = useRef<HTMLInputElement>(null);

  // Digital Classroom Tools management
  const [editingTool, setEditingTool] = useState<string | null>(null);
  const [isAddingTool, setIsAddingTool] = useState(false);
  const [toolForm, setToolForm] = useState<Partial<DigitalClassroomTool>>({});

  // Onboarding Steps management
  const [editingStep, setEditingStep] = useState<string | null>(null);
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [stepForm, setStepForm] = useState<Partial<OnboardingStep>>({});

  // Digital Toolbox management
  const [editingDigitalTool, setEditingDigitalTool] = useState<string | null>(null);
  const [isAddingDigitalTool, setIsAddingDigitalTool] = useState(false);
  const [digitalToolForm, setDigitalToolForm] = useState<Partial<DigitalTool>>({});

  // AI Tools management
  const [editingAITool, setEditingAITool] = useState<string | null>(null);
  const [isAddingAITool, setIsAddingAITool] = useState(false);
  const [aiToolForm, setAIToolForm] = useState<Partial<AITool>>({});

  // Load data
  useEffect(() => {
    loadAppTechData();
  }, []);

  const loadAppTechData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/application-of-technology-page');
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        
        // Ensure all items have IDs
        if (data.digitalClassroomSection?.tools) {
          data.digitalClassroomSection.tools = data.digitalClassroomSection.tools.map((tool: any, index: number) => ({
            ...tool,
            _id: tool._id || `tool-${Date.now()}-${index}`
          }));
        }
        
        if (data.onboardingSection?.steps) {
          data.onboardingSection.steps = data.onboardingSection.steps.map((step: any, index: number) => ({
            ...step,
            _id: step._id || `step-${Date.now()}-${index}`
          }));
        }
        
        if (data.digitalToolboxSection?.tools) {
          data.digitalToolboxSection.tools = data.digitalToolboxSection.tools.map((tool: any, index: number) => ({
            ...tool,
            _id: tool._id || `dtool-${Date.now()}-${index}`
          }));
        }
        
        if (data.aiIntegrationSection?.tools) {
          data.aiIntegrationSection.tools = data.aiIntegrationSection.tools.map((tool: any, index: number) => ({
            ...tool,
            _id: tool._id || `aitool-${Date.now()}-${index}`
          }));
        }
        
        setAppTechData(data);
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        console.log('No Application of Technology page found - will be created on first save');
        // Ensure initial state data also has IDs
        setAppTechData(prev => ({
          ...prev,
          digitalClassroomSection: {
            ...prev.digitalClassroomSection,
            tools: prev.digitalClassroomSection.tools.map((tool, index) => ({
              ...tool,
              _id: tool._id || `tool-${Date.now()}-${index}`
            }))
          },
          onboardingSection: {
            ...prev.onboardingSection,
            steps: prev.onboardingSection.steps.map((step, index) => ({
              ...step,
              _id: step._id || `step-${Date.now()}-${index}`
            }))
          },
          digitalToolboxSection: {
            ...prev.digitalToolboxSection,
            tools: prev.digitalToolboxSection.tools.map((tool, index) => ({
              ...tool,
              _id: tool._id || `dtool-${Date.now()}-${index}`
            }))
          },
          aiIntegrationSection: {
            ...prev.aiIntegrationSection,
            tools: prev.aiIntegrationSection.tools.map((tool, index) => ({
              ...tool,
              _id: tool._id || `aitool-${Date.now()}-${index}`
            }))
          }
        }));
      } else {
        toast.error(err.response?.data?.message || 'Failed to load page data');
      }
    } finally {
      setLoading(false);
    }
  };

  // ========================= IMAGE UPLOAD HANDLERS =========================

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    try {
      setUploadingHeroImage(true);
      const formData = new FormData();
      formData.append('heroImage', file);

      const response = await axiosInstance.post('/admin/application-of-technology-page/upload-hero-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setAppTechData(prev => ({
          ...prev,
          headerSection: {
            ...prev.headerSection,
            heroImage: response.data.data.imageUrl
          }
        }));
        toast.success('Hero image uploaded successfully!');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload hero image');
    } finally {
      setUploadingHeroImage(false);
      e.target.value = '';
    }
  };

  const handleOnboardingImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    try {
      setUploadingOnboardingImage(true);
      const formData = new FormData();
      formData.append('onboardingImage', file);

      const response = await axiosInstance.post('/admin/application-of-technology-page/upload-onboarding-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setAppTechData(prev => ({
          ...prev,
          onboardingSection: {
            ...prev.onboardingSection,
            image: response.data.data.imageUrl
          }
        }));
        toast.success('Onboarding image uploaded successfully!');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingOnboardingImage(false);
      e.target.value = '';
    }
  };

  const handleAIImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    try {
      setUploadingAIImage(true);
      const formData = new FormData();
      formData.append('aiImage', file);

      const response = await axiosInstance.post('/admin/application-of-technology-page/upload-ai-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setAppTechData(prev => ({
          ...prev,
          aiIntegrationSection: {
            ...prev.aiIntegrationSection,
            image: response.data.data.imageUrl
          }
        }));
        toast.success('AI image uploaded successfully!');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingAIImage(false);
      e.target.value = '';
    }
  };

  // ========================= SAVE HANDLER =========================

  const handleSaveAll = async () => {
    try {
      setSaving(true);

      // Helper function to remove temporary _id if it's not a valid MongoDB ObjectId
      const cleanId = (item: any) => {
        const { _id, ...rest } = item;
        // Only include _id if it's a valid MongoDB ObjectId (24 hex characters)
        if (_id && /^[a-f\d]{24}$/i.test(_id)) {
          return { _id, ...rest };
        }
        return rest;
      };

      const dataToSave = {
        ...appTechData,
        digitalClassroomSection: {
          ...appTechData.digitalClassroomSection,
          tools: appTechData.digitalClassroomSection.tools.map((tool, index) => ({
            ...cleanId(tool),
            display_order: index
          }))
        },
        onboardingSection: {
          ...appTechData.onboardingSection,
          steps: appTechData.onboardingSection.steps.map((step, index) => ({
            ...cleanId(step),
            display_order: index
          }))
        },
        digitalToolboxSection: {
          ...appTechData.digitalToolboxSection,
          tools: appTechData.digitalToolboxSection.tools.map((tool, index) => ({
            ...cleanId(tool),
            display_order: index
          }))
        },
        aiIntegrationSection: {
          ...appTechData.aiIntegrationSection,
          tools: appTechData.aiIntegrationSection.tools.map((tool, index) => ({
            ...cleanId(tool),
            display_order: index
          }))
        }
      };

      let response;
      try {
        response = await axiosInstance.put('/admin/application-of-technology-page', dataToSave);
      } catch (updateErr: any) {
        if (updateErr.response?.status === 404) {
          response = await axiosInstance.post('/admin/application-of-technology-page', dataToSave);
        } else {
          throw updateErr;
        }
      }

      if (response.data.success) {
        toast.success('Application of Technology page saved successfully!');
        loadAppTechData();
      }
    } catch (err: any) {
      console.error('Save error:', err);
      console.error('Error response:', err.response?.data);
      
      // Show detailed validation errors if available
      if (err.response?.data?.validationErrors && err.response.data.validationErrors.length > 0) {
        const errorMessages = err.response.data.validationErrors
          .map((e: any) => `${e.field}: ${e.message}`)
          .join('\n');
        toast.error(`Validation errors:\n${errorMessages}`, { duration: 5000 });
      } else {
        toast.error(err.response?.data?.message || 'Failed to save changes');
      }
    } finally {
      setSaving(false);
    }
  };

  // ========================= DIGITAL CLASSROOM TOOLS HANDLERS =========================

  const handleAddTool = () => {
    setIsAddingTool(true);
    setToolForm({ icon: '', title: '', description: '' });
  };

  const handleEditTool = (tool: DigitalClassroomTool) => {
    setEditingTool(tool._id || '');
    setToolForm(tool);
  };

  const handleSaveTool = () => {
    if (!toolForm.title?.trim()) {
      toast.error('Please enter a tool title');
      return;
    }

    if (editingTool) {
      setAppTechData(prev => ({
        ...prev,
        digitalClassroomSection: {
          ...prev.digitalClassroomSection,
          tools: prev.digitalClassroomSection.tools.map(tool =>
            tool._id === editingTool ? { ...tool, ...toolForm } : tool
          )
        }
      }));
      toast.success('Tool updated successfully');
    } else {
      const newTool = {
        ...toolForm,
        _id: Date.now().toString()
      } as DigitalClassroomTool;
      
      setAppTechData(prev => ({
        ...prev,
        digitalClassroomSection: {
          ...prev.digitalClassroomSection,
          tools: [...prev.digitalClassroomSection.tools, newTool]
        }
      }));
      toast.success('Tool added successfully');
    }

    setIsAddingTool(false);
    setEditingTool(null);
    setToolForm({});
  };

  const handleCancelTool = () => {
    setIsAddingTool(false);
    setEditingTool(null);
    setToolForm({});
  };

  const handleDeleteTool = (toolId: string) => {
    setAppTechData(prev => ({
      ...prev,
      digitalClassroomSection: {
        ...prev.digitalClassroomSection,
        tools: prev.digitalClassroomSection.tools.filter(tool => tool._id !== toolId)
      }
    }));
    toast.success('Tool deleted successfully');
  };

  // ========================= ONBOARDING STEPS HANDLERS =========================

  const handleAddStep = () => {
    setIsAddingStep(true);
    const nextStep = appTechData.onboardingSection.steps.length + 1;
    setStepForm({ step: nextStep, title: '', description: '' });
  };

  const handleEditStep = (step: OnboardingStep) => {
    setEditingStep(step._id || '');
    setStepForm(step);
  };

  const handleSaveStep = () => {
    if (!stepForm.title?.trim()) {
      toast.error('Please enter a step title');
      return;
    }

    if (editingStep) {
      setAppTechData(prev => ({
        ...prev,
        onboardingSection: {
          ...prev.onboardingSection,
          steps: prev.onboardingSection.steps.map(step =>
            step._id === editingStep ? { ...step, ...stepForm } : step
          )
        }
      }));
      toast.success('Step updated successfully');
    } else {
      const newStep = {
        ...stepForm,
        _id: Date.now().toString()
      } as OnboardingStep;
      
      setAppTechData(prev => ({
        ...prev,
        onboardingSection: {
          ...prev.onboardingSection,
          steps: [...prev.onboardingSection.steps, newStep]
        }
      }));
      toast.success('Step added successfully');
    }

    setIsAddingStep(false);
    setEditingStep(null);
    setStepForm({});
  };

  const handleCancelStep = () => {
    setIsAddingStep(false);
    setEditingStep(null);
    setStepForm({});
  };

  const handleDeleteStep = (stepId: string) => {
    setAppTechData(prev => ({
      ...prev,
      onboardingSection: {
        ...prev.onboardingSection,
        steps: prev.onboardingSection.steps.filter(step => step._id !== stepId)
      }
    }));
    toast.success('Step deleted successfully');
  };

  // ========================= DIGITAL TOOLBOX HANDLERS =========================

  const handleAddDigitalTool = () => {
    setIsAddingDigitalTool(true);
    setDigitalToolForm({ tool: '', purpose: '' });
  };

  const handleEditDigitalTool = (tool: DigitalTool) => {
    setEditingDigitalTool(tool._id || '');
    setDigitalToolForm(tool);
  };

  const handleSaveDigitalTool = () => {
    if (!digitalToolForm.tool?.trim()) {
      toast.error('Please enter a tool name');
      return;
    }

    if (editingDigitalTool) {
      setAppTechData(prev => ({
        ...prev,
        digitalToolboxSection: {
          ...prev.digitalToolboxSection,
          tools: prev.digitalToolboxSection.tools.map(tool =>
            tool._id === editingDigitalTool ? { ...tool, ...digitalToolForm } : tool
          )
        }
      }));
      toast.success('Tool updated successfully');
    } else {
      const newTool = {
        ...digitalToolForm,
        _id: Date.now().toString()
      } as DigitalTool;
      
      setAppTechData(prev => ({
        ...prev,
        digitalToolboxSection: {
          ...prev.digitalToolboxSection,
          tools: [...prev.digitalToolboxSection.tools, newTool]
        }
      }));
      toast.success('Tool added successfully');
    }

    setIsAddingDigitalTool(false);
    setEditingDigitalTool(null);
    setDigitalToolForm({});
  };

  const handleCancelDigitalTool = () => {
    setIsAddingDigitalTool(false);
    setEditingDigitalTool(null);
    setDigitalToolForm({});
  };

  const handleDeleteDigitalTool = (toolId: string) => {
    setAppTechData(prev => ({
      ...prev,
      digitalToolboxSection: {
        ...prev.digitalToolboxSection,
        tools: prev.digitalToolboxSection.tools.filter(tool => tool._id !== toolId)
      }
    }));
    toast.success('Tool deleted successfully');
  };

  // ========================= AI TOOLS HANDLERS =========================

  const handleAddAITool = () => {
    setIsAddingAITool(true);
    setAIToolForm({ tool: '', description: '' });
  };

  const handleEditAITool = (tool: AITool) => {
    setEditingAITool(tool._id || '');
    setAIToolForm(tool);
  };

  const handleSaveAITool = () => {
    if (!aiToolForm.tool?.trim()) {
      toast.error('Please enter a tool name');
      return;
    }

    if (editingAITool) {
      setAppTechData(prev => ({
        ...prev,
        aiIntegrationSection: {
          ...prev.aiIntegrationSection,
          tools: prev.aiIntegrationSection.tools.map(tool =>
            tool._id === editingAITool ? { ...tool, ...aiToolForm } : tool
          )
        }
      }));
      toast.success('AI tool updated successfully');
    } else {
      const newTool = {
        ...aiToolForm,
        _id: Date.now().toString()
      } as AITool;
      
      setAppTechData(prev => ({
        ...prev,
        aiIntegrationSection: {
          ...prev.aiIntegrationSection,
          tools: [...prev.aiIntegrationSection.tools, newTool]
        }
      }));
      toast.success('AI tool added successfully');
    }

    setIsAddingAITool(false);
    setEditingAITool(null);
    setAIToolForm({});
  };

  const handleCancelAITool = () => {
    setIsAddingAITool(false);
    setEditingAITool(null);
    setAIToolForm({});
  };

  const handleDeleteAITool = (toolId: string) => {
    setAppTechData(prev => ({
      ...prev,
      aiIntegrationSection: {
        ...prev.aiIntegrationSection,
        tools: prev.aiIntegrationSection.tools.filter(tool => tool._id !== toolId)
      }
    }));
    toast.success('AI tool deleted successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Application of Technology Page</h1>
        <Button 
          onClick={handleSaveAll} 
          disabled={saving}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { id: 'header', label: 'Header' },
          { id: 'digitalClassroom', label: 'Digital Classroom' },
          { id: 'onboarding', label: 'Onboarding Process' },
          { id: 'digitalToolbox', label: 'Digital Toolbox' },
          { id: 'hybridLearning', label: 'Hybrid Learning' },
          { id: 'powerBackup', label: 'Power Backup' },
          { id: 'aiIntegration', label: 'AI Integration' },
          // { id: 'salesforce', label: 'Salesforce CRM' },
          { id: 'mission', label: 'Mission' },
          { id: 'cta', label: 'Call to Action' }
        ].map(tab => (
          <Button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            variant={activeSection === tab.id ? 'default' : 'outline'}
            size="sm"
          >
            {tab.label}
          </Button>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
              <Input
                value={appTechData.headerSection.title}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, title: e.target.value }
                }))}
                placeholder="Enter page title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <Input
                value={appTechData.headerSection.subtitle || ''}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, subtitle: e.target.value }
                }))}
                placeholder="Enter subtitle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={appTechData.headerSection.description || ''}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, description: e.target.value }
                }))}
                placeholder="Enter description"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
              <div className="space-y-3">
                {appTechData.headerSection.heroImage && (
                  <div className="relative inline-block">
                    <img
                      src={appTechData.headerSection.heroImage}
                      alt="Hero"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
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

            {/* Hero Video URL Section */}
            <div className="border-t pt-6">
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
                value={appTechData.headerSection.heroVideoUrl || ''}
                onChange={(e) =>
                  setAppTechData((prev) => ({
                    ...prev,
                    headerSection: { ...prev.headerSection, heroVideoUrl: e.target.value },
                  }))
                }
                placeholder="e.g., https://www.youtube.com/embed/VIDEO_ID"
                className="mb-2"
              />
              {appTechData.headerSection.heroVideoUrl && (
                <Button
                  type="button"
                  onClick={() =>
                    setAppTechData((prev) => ({
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

      {/* Digital Classroom Section */}
      {activeSection === 'digitalClassroom' && (
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Digital Classroom Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <Input
                  value={appTechData.digitalClassroomSection.title}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    digitalClassroomSection: { ...prev.digitalClassroomSection, title: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea
                  value={appTechData.digitalClassroomSection.description}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    digitalClassroomSection: { ...prev.digitalClassroomSection, description: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
              {/* Section image upload intentionally hidden */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary Text</label>
                <Textarea
                  value={appTechData.digitalClassroomSection.summaryText || ''}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    digitalClassroomSection: { ...prev.digitalClassroomSection, summaryText: e.target.value }
                  }))}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Digital Classroom Tools List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Digital Classroom Tools</CardTitle>
                <Button onClick={handleAddTool} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tool
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {appTechData.digitalClassroomSection.tools.map((tool, index) => (
                <div key={tool._id || index} className="border rounded p-4 mb-3">
                  {editingTool === tool._id ? (
                    <div className="space-y-3">
                      <Input
                        placeholder="Icon (emoji)"
                        value={toolForm.icon || ''}
                        onChange={(e) => setToolForm({...toolForm, icon: e.target.value})}
                      />
                      <Input
                        placeholder="Tool title"
                        value={toolForm.title || ''}
                        onChange={(e) => setToolForm({...toolForm, title: e.target.value})}
                      />
                      <Textarea
                        placeholder="Tool description"
                        value={toolForm.description || ''}
                        onChange={(e) => setToolForm({...toolForm, description: e.target.value})}
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveTool} size="sm" className="bg-green-600">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancelTool} size="sm" variant="outline">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-2xl mb-2">{tool.icon}</div>
                        <h4 className="font-semibold">{tool.title}</h4>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleEditTool(tool)} size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => handleDeleteTool(tool._id || '')} size="sm" variant="outline">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isAddingTool && (
                <div className="border rounded p-4 bg-gray-50">
                  <h4 className="font-semibold mb-3">Add New Tool</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Icon (emoji)"
                      value={toolForm.icon || ''}
                      onChange={(e) => setToolForm({...toolForm, icon: e.target.value})}
                    />
                    <Input
                      placeholder="Tool title"
                      value={toolForm.title || ''}
                      onChange={(e) => setToolForm({...toolForm, title: e.target.value})}
                    />
                    <Textarea
                      placeholder="Tool description"
                      value={toolForm.description || ''}
                      onChange={(e) => setToolForm({...toolForm, description: e.target.value})}
                      rows={2}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveTool} size="sm" className="bg-green-600">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelTool} size="sm" variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Onboarding Section */}
      {activeSection === 'onboarding' && (
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Onboarding Process Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <Input
                  value={appTechData.onboardingSection.title}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    onboardingSection: { ...prev.onboardingSection, title: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea
                  value={appTechData.onboardingSection.description}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    onboardingSection: { ...prev.onboardingSection, description: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                <div className="space-y-3">
                  {appTechData.onboardingSection.image && (
                    <div className="relative inline-block">
                      <img
                        src={appTechData.onboardingSection.image}
                        alt="Onboarding"
                        className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={onboardingImageInputRef}
                      onChange={handleOnboardingImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => onboardingImageInputRef.current?.click()}
                      disabled={uploadingOnboardingImage}
                      variant="outline"
                      size="sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingOnboardingImage ? 'Uploading...' : 'Upload Image'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Onboarding Steps List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Onboarding Steps</CardTitle>
                <Button onClick={handleAddStep} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {appTechData.onboardingSection.steps.map((step, index) => (
                <div key={step._id || index} className="border rounded p-4 mb-3">
                  {editingStep === step._id ? (
                    <div className="space-y-3">
                      <Input
                        type="number"
                        placeholder="Step number"
                        value={stepForm.step || ''}
                        onChange={(e) => setStepForm({...stepForm, step: parseInt(e.target.value)})}
                      />
                      <Input
                        placeholder="Step title"
                        value={stepForm.title || ''}
                        onChange={(e) => setStepForm({...stepForm, title: e.target.value})}
                      />
                      <Textarea
                        placeholder="Step description"
                        value={stepForm.description || ''}
                        onChange={(e) => setStepForm({...stepForm, description: e.target.value})}
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveStep} size="sm" className="bg-green-600">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancelStep} size="sm" variant="outline">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="font-semibold">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleEditStep(step)} size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => handleDeleteStep(step._id || '')} size="sm" variant="outline">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isAddingStep && (
                <div className="border rounded p-4 bg-gray-50">
                  <h4 className="font-semibold mb-3">Add New Step</h4>
                  <div className="space-y-3">
                    <Input
                      type="number"
                      placeholder="Step number"
                      value={stepForm.step || ''}
                      onChange={(e) => setStepForm({...stepForm, step: parseInt(e.target.value)})}
                    />
                    <Input
                      placeholder="Step title"
                      value={stepForm.title || ''}
                      onChange={(e) => setStepForm({...stepForm, title: e.target.value})}
                    />
                    <Textarea
                      placeholder="Step description"
                      value={stepForm.description || ''}
                      onChange={(e) => setStepForm({...stepForm, description: e.target.value})}
                      rows={2}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveStep} size="sm" className="bg-green-600">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelStep} size="sm" variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Digital Toolbox Section */}
      {activeSection === 'digitalToolbox' && (
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Digital Toolbox Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <Input
                  value={appTechData.digitalToolboxSection.title}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    digitalToolboxSection: { ...prev.digitalToolboxSection, title: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea
                  value={appTechData.digitalToolboxSection.description}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    digitalToolboxSection: { ...prev.digitalToolboxSection, description: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary Text</label>
                <Textarea
                  value={appTechData.digitalToolboxSection.summaryText || ''}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    digitalToolboxSection: { ...prev.digitalToolboxSection, summaryText: e.target.value }
                  }))}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Digital Tools List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Digital Tools (Table)</CardTitle>
                <Button onClick={handleAddDigitalTool} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tool
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Tool</th>
                      <th className="p-2 text-left">Purpose</th>
                      <th className="p-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appTechData.digitalToolboxSection.tools.map((tool, index) => (
                      <tr key={tool._id || index} className="border-b">
                        {editingDigitalTool === tool._id ? (
                          <td colSpan={3} className="p-2">
                            <div className="space-y-2">
                              <Input
                                placeholder="Tool name"
                                value={digitalToolForm.tool || ''}
                                onChange={(e) => setDigitalToolForm({...digitalToolForm, tool: e.target.value})}
                              />
                              <Input
                                placeholder="Purpose"
                                value={digitalToolForm.purpose || ''}
                                onChange={(e) => setDigitalToolForm({...digitalToolForm, purpose: e.target.value})}
                              />
                              <div className="flex space-x-2">
                                <Button onClick={handleSaveDigitalTool} size="sm" className="bg-green-600">
                                  <Save className="w-4 h-4 mr-2" />
                                  Save
                                </Button>
                                <Button onClick={handleCancelDigitalTool} size="sm" variant="outline">
                                  <X className="w-4 h-4 mr-2" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </td>
                        ) : (
                          <>
                            <td className="p-2 font-medium">{tool.tool}</td>
                            <td className="p-2 text-gray-600">{tool.purpose}</td>
                            <td className="p-2 text-right">
                              <div className="flex justify-end space-x-2">
                                <Button onClick={() => handleEditDigitalTool(tool)} size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button onClick={() => handleDeleteDigitalTool(tool._id || '')} size="sm" variant="outline">
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </Button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {isAddingDigitalTool && (
                <div className="border rounded p-4 bg-gray-50 mt-4">
                  <h4 className="font-semibold mb-3">Add New Tool</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Tool name"
                      value={digitalToolForm.tool || ''}
                      onChange={(e) => setDigitalToolForm({...digitalToolForm, tool: e.target.value})}
                    />
                    <Input
                      placeholder="Purpose"
                      value={digitalToolForm.purpose || ''}
                      onChange={(e) => setDigitalToolForm({...digitalToolForm, purpose: e.target.value})}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveDigitalTool} size="sm" className="bg-green-600">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelDigitalTool} size="sm" variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hybrid Learning Section */}
      {activeSection === 'hybridLearning' && (
        <Card>
          <CardHeader>
            <CardTitle>Hybrid Learning Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <Input
                value={appTechData.hybridLearningSection.title}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  hybridLearningSection: { ...prev.hybridLearningSection, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={appTechData.hybridLearningSection.description}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  hybridLearningSection: { ...prev.hybridLearningSection, description: e.target.value }
                }))}
                rows={2}
              />
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Onsite Classrooms</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={appTechData.hybridLearningSection.onsiteTitle}
                    onChange={(e) => setAppTechData(prev => ({
                      ...prev,
                      hybridLearningSection: { ...prev.hybridLearningSection, onsiteTitle: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    value={appTechData.hybridLearningSection.onsiteDescription}
                    onChange={(e) => setAppTechData(prev => ({
                      ...prev,
                      hybridLearningSection: { ...prev.hybridLearningSection, onsiteDescription: e.target.value }
                    }))}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Remote Learning</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={appTechData.hybridLearningSection.remoteTitle}
                    onChange={(e) => setAppTechData(prev => ({
                      ...prev,
                      hybridLearningSection: { ...prev.hybridLearningSection, remoteTitle: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    value={appTechData.hybridLearningSection.remoteDescription}
                    onChange={(e) => setAppTechData(prev => ({
                      ...prev,
                      hybridLearningSection: { ...prev.hybridLearningSection, remoteDescription: e.target.value }
                    }))}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Power Backup Section */}
      {activeSection === 'powerBackup' && (
        <Card>
          <CardHeader>
            <CardTitle>Power Backup Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <Input
                value={appTechData.powerBackupSection.title}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  powerBackupSection: { ...prev.powerBackupSection, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={appTechData.powerBackupSection.description}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  powerBackupSection: { ...prev.powerBackupSection, description: e.target.value }
                }))}
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Solutions (One per line)</label>
              <Textarea
                value={appTechData.powerBackupSection.solutions.join('\n')}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  powerBackupSection: { 
                    ...prev.powerBackupSection, 
                    solutions: e.target.value.split('\n').filter(s => s.trim()) 
                  }
                }))}
                rows={4}
                placeholder="Enter each solution on a new line"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary Text</label>
              <Textarea
                value={appTechData.powerBackupSection.summaryText || ''}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  powerBackupSection: { ...prev.powerBackupSection, summaryText: e.target.value }
                }))}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Integration Section */}
      {activeSection === 'aiIntegration' && (
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>AI Integration Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <Input
                  value={appTechData.aiIntegrationSection.title}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    aiIntegrationSection: { ...prev.aiIntegrationSection, title: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea
                  value={appTechData.aiIntegrationSection.description}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    aiIntegrationSection: { ...prev.aiIntegrationSection, description: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                <div className="space-y-3">
                  {appTechData.aiIntegrationSection.image && (
                    <div className="relative inline-block">
                      <img
                        src={appTechData.aiIntegrationSection.image}
                        alt="AI Integration"
                        className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={aiImageInputRef}
                      onChange={handleAIImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => aiImageInputRef.current?.click()}
                      disabled={uploadingAIImage}
                      variant="outline"
                      size="sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingAIImage ? 'Uploading...' : 'Upload Image'}
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary Text</label>
                <Textarea
                  value={appTechData.aiIntegrationSection.summaryText || ''}
                  onChange={(e) => setAppTechData(prev => ({
                    ...prev,
                    aiIntegrationSection: { ...prev.aiIntegrationSection, summaryText: e.target.value }
                  }))}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Tools List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>AI Tools</CardTitle>
                <Button onClick={handleAddAITool} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add AI Tool
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {appTechData.aiIntegrationSection.tools.map((tool, index) => (
                <div key={tool._id || index} className="border rounded p-4 mb-3">
                  {editingAITool === tool._id ? (
                    <div className="space-y-3">
                      <Input
                        placeholder="Tool name"
                        value={aiToolForm.tool || ''}
                        onChange={(e) => setAIToolForm({...aiToolForm, tool: e.target.value})}
                      />
                      <Textarea
                        placeholder="Tool description"
                        value={aiToolForm.description || ''}
                        onChange={(e) => setAIToolForm({...aiToolForm, description: e.target.value})}
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveAITool} size="sm" className="bg-green-600">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancelAITool} size="sm" variant="outline">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex">
                        <div className="bg-blue-600 text-white rounded p-2 mr-3 flex-shrink-0">
                          🤖
                        </div>
                        <div>
                          <h4 className="font-semibold">{tool.tool}</h4>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleEditAITool(tool)} size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => handleDeleteAITool(tool._id || '')} size="sm" variant="outline">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isAddingAITool && (
                <div className="border rounded p-4 bg-gray-50">
                  <h4 className="font-semibold mb-3">Add New AI Tool</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Tool name"
                      value={aiToolForm.tool || ''}
                      onChange={(e) => setAIToolForm({...aiToolForm, tool: e.target.value})}
                    />
                    <Textarea
                      placeholder="Tool description"
                      value={aiToolForm.description || ''}
                      onChange={(e) => setAIToolForm({...aiToolForm, description: e.target.value})}
                      rows={2}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveAITool} size="sm" className="bg-green-600">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelAITool} size="sm" variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Salesforce CRM Section */}
      {activeSection === 'salesforce' && (
        <Card>
          <CardHeader>
            <CardTitle>Salesforce CRM Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <Input
                value={appTechData.salesforceCRMSection.title}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  salesforceCRMSection: { ...prev.salesforceCRMSection, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={appTechData.salesforceCRMSection.description}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  salesforceCRMSection: { ...prev.salesforceCRMSection, description: e.target.value }
                }))}
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary Text</label>
              <Textarea
                value={appTechData.salesforceCRMSection.summaryText || ''}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  salesforceCRMSection: { ...prev.salesforceCRMSection, summaryText: e.target.value }
                }))}
                rows={2}
              />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 italic">Note: CRM features are predefined (Track Contributions, Real-time Updates, Direct Communication)</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mission Section */}
      {activeSection === 'mission' && (
        <Card>
          <CardHeader>
            <CardTitle>Mission Statement Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <Input
                value={appTechData.missionSection.title}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  missionSection: { ...prev.missionSection, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={appTechData.missionSection.description}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  missionSection: { ...prev.missionSection, description: e.target.value }
                }))}
                rows={4}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <Input
                value={appTechData.callToActionSection.title}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={appTechData.callToActionSection.description}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, description: e.target.value }
                }))}
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <Input
                type="email"
                value={appTechData.callToActionSection.contactEmail}
                onChange={(e) => setAppTechData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, contactEmail: e.target.value }
                }))}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationOfTechnology;

