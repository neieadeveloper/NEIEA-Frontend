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

// Zod Schemas
const initiativeSchema = z.object({
  _id: z.string().optional(),
  icon: z.string().min(1, 'Icon is required').max(10, 'Icon should be 1-2 characters (emoji)'),
  title: z.string().min(3).max(200),
  partner: z.string().min(2).max(200),
  location: z.string().min(2).max(200),
  startDate: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  achievements: z.array(z.string().min(3)).min(0).max(20),
  display_order: z.number().optional(),
});

const partnerOrgSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2).max(200),
  display_order: z.number().optional(),
});

const partnerStateSchema = z.object({
  _id: z.string().optional(),
  state: z.string().min(2).max(100),
  partners: z.array(partnerOrgSchema).min(0).max(100),
  display_order: z.number().optional(),
});

const futureVisionCardSchema = z.object({
  _id: z.string().optional(),
  icon: z.string().max(10).optional(),
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  display_order: z.number().optional(),
});

const girlsEducationPageSchema = z.object({
  heroSection: z.object({
    title: z.string().min(5).max(200),
    subtitle: z.string().max(200).optional(),
    description: z.string().max(500).optional(),
    heroImage: z.string().optional(),
    videoLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  }),
  visionAndPhilosophySection: z.object({
    heading: z.string().min(5).max(200),
    description: z.string().min(20).max(2000),
    philosophyHeading: z.string().max(200).optional(),
    philosophyDescription: z.string().max(2000).optional(),
  }),
  initiativesSection: z.object({
    label: z.string().optional(),
    heading: z.string().min(5).max(200),
    description: z.string().max(500).optional(),
    initiatives: z.array(initiativeSchema).min(0).max(50),
  }),
  impactSection: z.object({
    label: z.string().optional(),
    heading: z.string().min(5).max(200),
    totalImpact: z.object({
      image: z.string().optional(),
      title: z.string().min(1).max(200),
      stats: z.string().min(1).max(200),
      description: z.string().min(10).max(1000),
    }),
    partnerOrganizationsByState: z.array(partnerStateSchema).min(0).max(50),
  }),
  lookingForwardSection: z.object({
    label: z.string().optional(),
    heading: z.string().min(5).max(200),
    futureVisionCards: z.array(futureVisionCardSchema).min(0).max(20),
  }),
  scalableModelSection: z.object({
    heading: z.string().min(5).max(200),
    highlightedText: z.string().min(10).max(1000),
  }),
  joinMovementSection: z.object({
    heading: z.string().min(5).max(200),
    description: z.string().min(10).max(2000),
    supportButtonText: z.string().optional(),
    supportButtonLink: z.string().optional(),
    getInvolvedButtonText: z.string().optional(),
    getInvolvedButtonLink: z.string().optional(),
  }),
});

// Types
type Initiative = z.infer<typeof initiativeSchema>;
type PartnerOrg = z.infer<typeof partnerOrgSchema>;
type PartnerState = z.infer<typeof partnerStateSchema>;
type FutureVisionCard = z.infer<typeof futureVisionCardSchema>;
type GirlsEducationPageData = z.infer<typeof girlsEducationPageSchema>;

const GirlsEducation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [pageData, setPageData] = useState<GirlsEducationPageData>({
    heroSection: {
      title: "Empowering Generations: NEIEA's Commitment to Girls' Education",
      subtitle: 'Educate a girl, empower a generation',
      description: 'At NEIEA, we firmly believe that educating girls is the bedrock of building a just, inclusive, and progressive society',
      heroImage: '/assets/images/GirlsEducation/image1.png',
      videoLink: '',
    },
    visionAndPhilosophySection: {
      heading: 'Our Vision and Approach',
      description:
        'At the New Equitable and Innovative Educational Association (NEIEA), we firmly believe that educating girls is the bedrock of building a just, inclusive, and progressive society. In communities where socio-economic barriers and cultural norms limit access to quality schooling, NEIEA serves as a catalyst for change.',
      philosophyHeading: 'Our Philosophy',
      philosophyDescription:
        "Our philosophy is simple yet profound: educate a girl, empower a generation. We are dedicated to ensuring every girl, regardless of her background, has access to high-quality, relevant, and empowering education.",
    },
    initiativesSection: {
      label: 'Our Initiatives',
      heading: 'On-the-Ground Initiatives',
      description: 'Targeted programs addressing specific community needs',
      initiatives: [],
    },
    impactSection: {
      label: 'Our Impact',
      heading: "Nationwide Girls' Education Impact",
      totalImpact: {
        title: 'Total Impact',
        stats: '0 Girls & Women Educated',
        description: 'Since our inception, NEIEA has created meaningful impact through collaborations with numerous girl-focused organizations across several Indian states.',
      },
      partnerOrganizationsByState: [],
    },
    lookingForwardSection: {
      label: 'Future Vision',
      heading: 'Looking Forward',
      futureVisionCards: [],
    },
    scalableModelSection: {
      heading: 'Scalable & Sustainable Model',
      highlightedText:
        "Our model is scalable, sustainable, and deeply rooted in community participation, ensuring long-term impact and growth in girls' education initiatives.",
    },
    joinMovementSection: {
      heading: 'Join the Movement',
      description:
        "At NEIEA, we don't just educate girls—we shape futures. Together with our partners and supporters, we envision a world where every girl can dream freely, learn confidently, and lead boldly.",
      supportButtonText: "💝 Support Girls' Education",
      supportButtonLink: '/donate',
      getInvolvedButtonText: '📞 Get Involved',
      getInvolvedButtonLink: '/about-us/contact',
    },
  });

  const [loading, setLoading] = useState(true);

  // Local form states
  const [editingInitiative, setEditingInitiative] = useState<string | null>(null);
  const [isAddingInitiative, setIsAddingInitiative] = useState(false);
  const [initiativeForm, setInitiativeForm] = useState<Initiative>({
    icon: '',
    title: '',
    partner: '',
    location: '',
    startDate: '',
    description: '',
    achievements: [],
  } as Initiative);
  const [newAchievement, setNewAchievement] = useState('');

  const [editingState, setEditingState] = useState<string | null>(null);
  const [isAddingState, setIsAddingState] = useState(false);
  const [partnerStateForm, setPartnerStateForm] = useState<PartnerState>({
    state: '',
    partners: [],
  } as PartnerState);
  const [newPartnerName, setNewPartnerName] = useState('');
  const [selectedStateIndex, setSelectedStateIndex] = useState<number | null>(null);

  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [futureCardForm, setFutureCardForm] = useState<FutureVisionCard>({ icon: '', title: '', description: '' } as FutureVisionCard);

  // Images
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [impactImageFile, setImpactImageFile] = useState<File | null>(null);
  const [impactImagePreview, setImpactImagePreview] = useState<string>('');
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [uploadingImpactImage, setUploadingImpactImage] = useState(false);

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/girls-education-page');
      if (response.data?.success && response.data.data) {
        const data = response.data.data as GirlsEducationPageData;
        setPageData(data);
        setHeroImagePreview(data.heroSection?.heroImage || '');
        setImpactImagePreview(data.impactSection?.totalImpact?.image || '');
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        // First time creation - allow user to save
      } else {
        toast.error(err.response?.data?.message || 'Failed to load page data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      // add display_order based on position
      const dataToSave: GirlsEducationPageData = {
        ...pageData,
        initiativesSection: {
          ...pageData.initiativesSection,
          initiatives: pageData.initiativesSection.initiatives.map((it, idx) => ({ ...it, display_order: idx }))
        },
        impactSection: {
          ...pageData.impactSection,
          partnerOrganizationsByState: pageData.impactSection.partnerOrganizationsByState.map((st, sidx) => ({
            ...st,
            display_order: sidx,
            partners: (st.partners || []).map((p, pidx) => ({ ...p, display_order: pidx }))
          }))
        },
        lookingForwardSection: {
          ...pageData.lookingForwardSection,
          futureVisionCards: pageData.lookingForwardSection.futureVisionCards.map((c, idx) => ({ ...c, display_order: idx }))
        }
      };

      const validation = girlsEducationPageSchema.safeParse(dataToSave);
      if (!validation.success) {
        const e = validation.error.errors[0];
        toast.error(`Validation Error: ${e.path.join(' → ')} - ${e.message}`);
        return;
      }

      let res;
      try {
        res = await axiosInstance.put('/admin/girls-education-page', dataToSave);
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await axiosInstance.post('/admin/girls-education-page', dataToSave);
        } else {
          throw err;
        }
      }

      if (res.data?.success) {
        toast.success('Page saved successfully');
        loadPageData();
      } else {
        toast.error('Failed to save changes');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save changes');
    }
  };

  // Drag-n-drop helpers
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

  const reorderWithApi = async (section: 'initiatives' | 'partnerStates' | 'partnerOrganizations' | 'futureVisionCards', items: any[]) => {
    try {
      await axiosInstance.post('/admin/girls-education-page/reorder', {
        section,
        items,
      });
      toast.success('Order updated');
    } catch {
      toast.error('Failed to update order');
      loadPageData();
    }
  };

  const handleInitiativeDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex) return;
    const initiatives = [...pageData.initiativesSection.initiatives];
    const moved = initiatives.splice(dragIndex, 1)[0];
    initiatives.splice(dropIndex, 0, moved);
    setPageData(prev => ({ ...prev, initiativesSection: { ...prev.initiativesSection, initiatives } }));
    await reorderWithApi('initiatives', initiatives.map((it, idx) => ({ id: (it as any)._id, display_order: idx })));
  };

  const handlePartnerStateDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex) return;
    const states = [...pageData.impactSection.partnerOrganizationsByState];
    const moved = states.splice(dragIndex, 1)[0];
    states.splice(dropIndex, 0, moved);
    setPageData(prev => ({ ...prev, impactSection: { ...prev.impactSection, partnerOrganizationsByState: states } }));
    await reorderWithApi('partnerStates', states.map((st, idx) => ({ id: (st as any)._id, display_order: idx })));
  };

  const handlePartnerDrop = async (stateIndex: number, e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex) return;
    const states = [...pageData.impactSection.partnerOrganizationsByState];
    const partners = [...(states[stateIndex].partners || [])];
    const moved = partners.splice(dragIndex, 1)[0];
    partners.splice(dropIndex, 0, moved);
    states[stateIndex] = { ...states[stateIndex], partners };
    setPageData(prev => ({ ...prev, impactSection: { ...prev.impactSection, partnerOrganizationsByState: states } }));
    await reorderWithApi('partnerOrganizations', partners.map((p, idx) => ({ id: (p as any)._id, display_order: idx, stateId: (states[stateIndex] as any)._id })));
  };

  const handleFutureCardDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex) return;
    const cards = [...pageData.lookingForwardSection.futureVisionCards];
    const moved = cards.splice(dragIndex, 1)[0];
    cards.splice(dropIndex, 0, moved);
    setPageData(prev => ({ ...prev, lookingForwardSection: { ...prev.lookingForwardSection, futureVisionCards: cards } }));
    await reorderWithApi('futureVisionCards', cards.map((c, idx) => ({ id: (c as any)._id, display_order: idx })));
  };

  // Initiative CRUD helpers
  const handleAddInitiative = () => {
    setIsAddingInitiative(true);
    setInitiativeForm({ icon: '', title: '', partner: '', location: '', startDate: '', description: '', achievements: [] } as Initiative);
  };
  const handleEditInitiative = (it: Initiative) => {
    setEditingInitiative(it._id || null);
    setInitiativeForm({ ...it });
    setNewAchievement('');
  };
  const handleSaveInitiative = () => {
    const validation = initiativeSchema.safeParse(initiativeForm);
    if (!validation.success) {
      toast.error(`Validation Error: ${validation.error.errors[0].message}`);
      return;
    }
    if (editingInitiative) {
      setPageData(prev => ({
        ...prev,
        initiativesSection: {
          ...prev.initiativesSection,
          initiatives: prev.initiativesSection.initiatives.map(it => ((it as any)._id === editingInitiative ? { ...initiativeForm } : it)),
        },
      }));
      toast.success('Initiative updated locally. Click "Save All Changes" to save to database.');
    } else {
      setPageData(prev => ({
        ...prev,
        initiativesSection: {
          ...prev.initiativesSection,
          initiatives: [...prev.initiativesSection.initiatives, { ...initiativeForm }],
        },
      }));
      toast.success('Initiative added locally. Click "Save All Changes" to save to database.');
    }
    setEditingInitiative(null);
    setIsAddingInitiative(false);
    setInitiativeForm({ icon: '', title: '', partner: '', location: '', startDate: '', description: '', achievements: [] } as Initiative);
  };
  const handleDeleteInitiative = (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this initiative?')) return;
    setPageData(prev => ({
      ...prev,
      initiativesSection: { ...prev.initiativesSection, initiatives: prev.initiativesSection.initiatives.filter(it => (it as any)._id !== id) },
    }));
  };
  const addAchievement = () => {
    const t = newAchievement.trim();
    if (!t) return;
    setInitiativeForm(prev => ({ ...prev, achievements: [...(prev.achievements || []), t] }));
    setNewAchievement('');
  };
  const removeAchievement = (idx: number) => {
    setInitiativeForm(prev => ({ ...prev, achievements: (prev.achievements || []).filter((_, i) => i !== idx) }));
  };

  // Partner states and partners
  const handleAddState = () => {
    setIsAddingState(true);
    setPartnerStateForm({ state: '', partners: [] } as PartnerState);
    setSelectedStateIndex(null);
  };
  const handleEditState = (st: PartnerState, index: number) => {
    setEditingState(st._id || null);
    setPartnerStateForm({ ...st });
    setSelectedStateIndex(index);
  };
  const handleSaveState = () => {
    const validation = partnerStateSchema.safeParse(partnerStateForm);
    if (!validation.success) {
      toast.error(`Validation Error: ${validation.error.errors[0].message}`);
      return;
    }
    if (editingState !== null) {
      setPageData(prev => ({
        ...prev,
        impactSection: {
          ...prev.impactSection,
          partnerOrganizationsByState: prev.impactSection.partnerOrganizationsByState.map((s, i) => (i === selectedStateIndex ? { ...partnerStateForm } : s)),
        },
      }));
    } else {
      setPageData(prev => ({
        ...prev,
        impactSection: { ...prev.impactSection, partnerOrganizationsByState: [...prev.impactSection.partnerOrganizationsByState, { ...partnerStateForm }] },
      }));
    }
    setIsAddingState(false);
    setEditingState(null);
    setSelectedStateIndex(null);
    setPartnerStateForm({ state: '', partners: [] } as PartnerState);
  };
  const handleDeleteState = (index: number) => {
    if (!confirm('Delete this state?')) return;
    setPageData(prev => ({
      ...prev,
      impactSection: { ...prev.impactSection, partnerOrganizationsByState: prev.impactSection.partnerOrganizationsByState.filter((_, i) => i !== index) },
    }));
  };
  const addPartnerToState = () => {
    const name = newPartnerName.trim();
    if (!name) return;
    // Always update the form's partners; this works for both add and edit flows
    setPartnerStateForm(prev => ({
      ...prev,
      partners: [...(prev.partners || []), { name } as PartnerOrg],
    }));
    setNewPartnerName('');
  };
  const removePartnerFromState = (stateIdx: number, partnerIdx: number) => {
    setPageData(prev => {
      const states = [...prev.impactSection.partnerOrganizationsByState];
      const state = states[stateIdx];
      states[stateIdx] = { ...state, partners: (state.partners || []).filter((_, i) => i !== partnerIdx) };
      return { ...prev, impactSection: { ...prev.impactSection, partnerOrganizationsByState: states } };
    });
  };

  // Future vision
  const handleAddCard = () => {
    setIsAddingCard(true);
    setFutureCardForm({ icon: '', title: '', description: '' } as FutureVisionCard);
  };
  const handleEditCard = (c: FutureVisionCard) => {
    setEditingCard(c._id || null);
    setFutureCardForm({ ...c });
  };
  const handleSaveCard = () => {
    const validation = futureVisionCardSchema.safeParse(futureCardForm);
    if (!validation.success) {
      toast.error(`Validation Error: ${validation.error.errors[0].message}`);
      return;
    }
    if (editingCard) {
      setPageData(prev => ({
        ...prev,
        lookingForwardSection: {
          ...prev.lookingForwardSection,
          futureVisionCards: prev.lookingForwardSection.futureVisionCards.map(c => ((c as any)._id === editingCard ? { ...futureCardForm } : c)),
        },
      }));
    } else {
      setPageData(prev => ({
        ...prev,
        lookingForwardSection: { ...prev.lookingForwardSection, futureVisionCards: [...prev.lookingForwardSection.futureVisionCards, { ...futureCardForm }] },
      }));
    }
    setIsAddingCard(false);
    setEditingCard(null);
    setFutureCardForm({ icon: '', title: '', description: '' } as FutureVisionCard);
  };
  const handleDeleteCard = (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this card?')) return;
    setPageData(prev => ({
      ...prev,
      lookingForwardSection: { ...prev.lookingForwardSection, futureVisionCards: prev.lookingForwardSection.futureVisionCards.filter(c => (c as any)._id !== id) },
    }));
  };

  // Image uploads
  const handleHeroImageUpload = async () => {
    if (!heroImageFile) return toast.error('Please select an image file');
    try {
      setUploadingHeroImage(true);
      const formData = new FormData();
      formData.append('heroImage', heroImageFile);
      const res = await axiosInstance.post('/admin/girls-education-page/upload-hero-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data?.success) {
        const url = res.data.data.image;
        setPageData(prev => ({ ...prev, heroSection: { ...prev.heroSection, heroImage: url } }));
        setHeroImagePreview(url);
        setHeroImageFile(null);
        toast.success('Hero image uploaded successfully');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingHeroImage(false);
    }
  };

  const handleImpactImageUpload = async () => {
    if (!impactImageFile) return toast.error('Please select an image file');
    try {
      setUploadingImpactImage(true);
      const formData = new FormData();
      formData.append('impactImage', impactImageFile);
      const res = await axiosInstance.post('/admin/girls-education-page/upload-impact-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data?.success) {
        const url = res.data.data.image;
        setPageData(prev => ({ ...prev, impactSection: { ...prev.impactSection, totalImpact: { ...prev.impactSection.totalImpact, image: url } } }));
        setImpactImagePreview(url);
        setImpactImageFile(null);
        toast.success('Impact image uploaded successfully');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingImpactImage(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-700 text-lg">Loading Girls Education Page Management...</div>
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
            Manage Girls Education Page
          </h1>
          <p className="text-gray-600">Update content for the Girls Education page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {['hero', 'vision', 'initiatives', 'impact', 'future', 'model', 'join'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeSection === section ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section === 'hero' && 'Hero'}
            {section === 'vision' && 'Vision & Philosophy'}
            {section === 'initiatives' && 'Initiatives'}
            {section === 'impact' && 'Impact & Partners'}
            {section === 'future' && 'Looking Forward'}
            {section === 'model' && 'Scalable Model'}
            {section === 'join' && 'Join Movement'}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <Input
                value={pageData.heroSection.title}
                onChange={(e) => setPageData(prev => ({ ...prev, heroSection: { ...prev.heroSection, title: e.target.value } }))}
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <Input
                value={pageData.heroSection.subtitle || ''}
                onChange={(e) => setPageData(prev => ({ ...prev, heroSection: { ...prev.heroSection, subtitle: e.target.value } }))}
                placeholder="Enter subtitle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description/Tagline</label>
              <Input
                value={pageData.heroSection.description || ''}
                onChange={(e) => setPageData(prev => ({ ...prev, heroSection: { ...prev.heroSection, description: e.target.value } }))}
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
              <ImageUpload
                value={heroImagePreview}
                onChange={(file, url) => { setHeroImageFile(file); setHeroImagePreview(url); }}
                previewSize="hero"
                previewShape="rectangular"
              />
              {heroImageFile && (
                <Button onClick={handleHeroImageUpload} disabled={uploadingHeroImage} className="mt-2 bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" /> {uploadingHeroImage ? 'Uploading...' : 'Upload Image'}
                </Button>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video Link (Optional)</label>
              <p className="text-xs text-gray-500 mb-2">Enter a YouTube or Vimeo video URL to display over the hero image</p>
              <Input
                type="url"
                value={pageData.heroSection.videoLink || ''}
                onChange={(e) => setPageData(prev => ({ ...prev, heroSection: { ...prev.heroSection, videoLink: e.target.value } }))}
                placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vision & Philosophy Section */}
      {activeSection === 'vision' && (
        <Card>
          <CardHeader>
            <CardTitle>Vision & Philosophy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading *</label>
              <Input
                value={pageData.visionAndPhilosophySection.heading}
                onChange={(e) => setPageData(prev => ({ ...prev, visionAndPhilosophySection: { ...prev.visionAndPhilosophySection, heading: e.target.value } }))}
                placeholder="Enter heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <Textarea
                value={pageData.visionAndPhilosophySection.description}
                onChange={(e) => setPageData(prev => ({ ...prev, visionAndPhilosophySection: { ...prev.visionAndPhilosophySection, description: e.target.value } }))}
                placeholder="Enter description"
                rows={6}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Philosophy Heading</label>
                <Input
                  value={pageData.visionAndPhilosophySection.philosophyHeading || ''}
                  onChange={(e) => setPageData(prev => ({ ...prev, visionAndPhilosophySection: { ...prev.visionAndPhilosophySection, philosophyHeading: e.target.value } }))}
                  placeholder="Enter philosophy heading"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Philosophy Description</label>
                <Textarea
                  value={pageData.visionAndPhilosophySection.philosophyDescription || ''}
                  onChange={(e) => setPageData(prev => ({ ...prev, visionAndPhilosophySection: { ...prev.visionAndPhilosophySection, philosophyDescription: e.target.value } }))}
                  placeholder="Enter philosophy description"
                  rows={6}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Initiatives Section */}
      {activeSection === 'initiatives' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">On-the-Ground Initiatives</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder initiatives</p>
            </div>
            <Button onClick={handleAddInitiative} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" /> Add Initiative
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Label (Optional)</label>
                  <Input
                    value={pageData.initiativesSection.label || ''}
                    onChange={(e) => setPageData(prev => ({ ...prev, initiativesSection: { ...prev.initiativesSection, label: e.target.value } }))}
                    placeholder="Enter section label"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading *</label>
                  <Input
                    value={pageData.initiativesSection.heading}
                    onChange={(e) => setPageData(prev => ({ ...prev, initiativesSection: { ...prev.initiativesSection, heading: e.target.value } }))}
                    placeholder="Enter section heading"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                  <Textarea
                    value={pageData.initiativesSection.description || ''}
                    onChange={(e) => setPageData(prev => ({ ...prev, initiativesSection: { ...prev.initiativesSection, description: e.target.value } }))}
                    placeholder="Enter section description"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {(isAddingInitiative || editingInitiative) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingInitiative ? 'Edit Initiative' : 'Add New Initiative'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji) *</label>
                    <Input value={initiativeForm.icon} onChange={(e) => setInitiativeForm({ ...initiativeForm, icon: e.target.value })} placeholder="🏠" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <Input value={initiativeForm.title} onChange={(e) => setInitiativeForm({ ...initiativeForm, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partner *</label>
                    <Input value={initiativeForm.partner} onChange={(e) => setInitiativeForm({ ...initiativeForm, partner: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <Input value={initiativeForm.location} onChange={(e) => setInitiativeForm({ ...initiativeForm, location: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                    <Input value={initiativeForm.startDate} onChange={(e) => setInitiativeForm({ ...initiativeForm, startDate: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <Textarea value={initiativeForm.description} onChange={(e) => setInitiativeForm({ ...initiativeForm, description: e.target.value })} rows={4} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                  <div className="flex gap-2 mb-2">
                    <Input value={newAchievement} onChange={(e) => setNewAchievement(e.target.value)} placeholder="Enter achievement" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAchievement(); } }} />
                    <Button type="button" onClick={addAchievement} size="sm"><Plus className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(initiativeForm.achievements || []).map((ach, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {ach}
                        <button onClick={() => removeAchievement(idx)} className="hover:text-blue-600"><X className="h-3 w-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveInitiative} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />{editingInitiative ? 'Update' : 'Save'}</Button>
                  <Button onClick={() => { setIsAddingInitiative(false); setEditingInitiative(null); }} variant="outline"><X className="w-4 h-4 mr-2" />Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.initiativesSection.initiatives.map((it, index) => (
              <Card key={(it as any)._id || index}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleInitiativeDrop(e, index)}
              >
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <div className="text-xs text-gray-500 font-medium">#{index + 1}</div>
                  </div>
                </div>
                <CardContent className="p-4 pt-8">
                  <div className="text-4xl mb-3">{it.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{it.title}</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong>Partner:</strong> {it.partner}</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Location:</strong> {it.location}</p>
                  <p className="text-sm text-gray-600 mb-4"><strong>Started:</strong> {it.startDate}</p>
                  <p className="text-sm text-gray-700 mb-4">{it.description}</p>
                  {!!(it.achievements || []).length && (
                    <div className="mb-2">
                      <h6 className="text-sm font-semibold mb-1">Key Achievements:</h6>
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        {(it.achievements || []).map((a, i) => (<li key={i}>{a}</li>))}
                      </ul>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditInitiative(it as any)}><Edit className="w-3 h-3 mr-1" />Edit</Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteInitiative((it as any)._id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Impact & Partners Section */}
      {activeSection === 'impact' && (
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Impact Overview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading *</label>
                <Input value={pageData.impactSection.heading} onChange={(e) => setPageData(prev => ({ ...prev, impactSection: { ...prev.impactSection, heading: e.target.value } }))} />
              </div>
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-semibold">Total Impact</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Impact Image</label>
                  <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                  <ImageUpload value={impactImagePreview} onChange={(file, url) => { setImpactImageFile(file); setImpactImagePreview(url); }} previewSize="lg" previewShape='rectangular' />
                  {impactImageFile && (
                    <Button onClick={handleImpactImageUpload} disabled={uploadingImpactImage} className="mt-2 bg-blue-600 hover:bg-blue-700">
                      <Upload className="w-4 h-4 mr-2" /> {uploadingImpactImage ? 'Uploading...' : 'Upload Image'}
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <Input value={pageData.impactSection.totalImpact.title} onChange={(e) => setPageData(prev => ({ ...prev, impactSection: { ...prev.impactSection, totalImpact: { ...prev.impactSection.totalImpact, title: e.target.value } } }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stats *</label>
                    <Input value={pageData.impactSection.totalImpact.stats} onChange={(e) => setPageData(prev => ({ ...prev, impactSection: { ...prev.impactSection, totalImpact: { ...prev.impactSection.totalImpact, stats: e.target.value } } }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <Textarea value={pageData.impactSection.totalImpact.description} onChange={(e) => setPageData(prev => ({ ...prev, impactSection: { ...prev.impactSection, totalImpact: { ...prev.impactSection.totalImpact, description: e.target.value } } }))} rows={4} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Partner Organizations by State</h3>
              <p className="text-gray-600 mt-1">Drag and drop to reorder states and partners</p>
            </div>
            <Button onClick={handleAddState} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" /> Add State</Button>
          </div>

          {(isAddingState || editingState) && (
            <Card className="mb-6">
              <CardHeader><CardTitle>{editingState ? 'Edit State' : 'Add New State'}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <Input value={partnerStateForm.state} onChange={(e) => setPartnerStateForm({ ...partnerStateForm, state: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partners</label>
                  <div className="flex gap-2 mb-2">
                    <Input value={newPartnerName} onChange={(e) => setNewPartnerName(e.target.value)} placeholder="Partner name" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPartnerToState(); } }} />
                    <Button type="button" onClick={addPartnerToState} size="sm"><Plus className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(partnerStateForm.partners || []).map((p, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {p.name}
                        <button onClick={() => setPartnerStateForm(prev => ({ ...prev, partners: (prev.partners || []).filter((_, i) => i !== idx) }))} className="hover:text-blue-600"><X className="h-3 w-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveState} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />{editingState ? 'Update' : 'Save'}</Button>
                  <Button onClick={() => { setIsAddingState(false); setEditingState(null); setSelectedStateIndex(null); }} variant="outline"><X className="w-4 h-4 mr-2" />Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {pageData.impactSection.partnerOrganizationsByState.map((st, sidx) => (
              <Card key={(st as any)._id || sidx}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleDragStart(e, sidx)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handlePartnerStateDrop(e, sidx)}
              >
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center"><GripVertical className="w-4 h-4 text-gray-400" /><div className="text-xs text-gray-500 font-medium">#{sidx + 1}</div></div>
                </div>
                <CardContent className="p-4 pt-8">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">{st.state}</h4>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditState(st as any, sidx)}><Edit className="w-3 h-3 mr-1" />Edit</Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteState(sidx)} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(st.partners || []).map((p, pidx) => (
                      <div key={(p as any)._id || pidx}
                        className="px-3 py-2 bg-gray-50 border rounded flex items-center gap-2 cursor-move"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', pidx.toString())}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handlePartnerDrop(sidx, e, pidx)}
                      >
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-800">{p.name}</span>
                        <button onClick={() => removePartnerFromState(sidx, pidx)} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Looking Forward Section */}
      {activeSection === 'future' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Looking Forward</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder cards</p>
            </div>
            <Button onClick={handleAddCard} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" /> Add Card</Button>
          </div>

          {(isAddingCard || editingCard) && (
            <Card className="mb-6">
              <CardHeader><CardTitle>{editingCard ? 'Edit Card' : 'Add New Card'}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Optional)</label>
                    <Input value={futureCardForm.icon || ''} onChange={(e) => setFutureCardForm({ ...futureCardForm, icon: e.target.value })} placeholder="🏫" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <Input value={futureCardForm.title} onChange={(e) => setFutureCardForm({ ...futureCardForm, title: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <Textarea value={futureCardForm.description} onChange={(e) => setFutureCardForm({ ...futureCardForm, description: e.target.value })} rows={4} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveCard} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />{editingCard ? 'Update' : 'Save'}</Button>
                  <Button onClick={() => { setIsAddingCard(false); setEditingCard(null); }} variant="outline"><X className="w-4 h-4 mr-2" />Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageData.lookingForwardSection.futureVisionCards.map((c, idx) => (
              <Card key={(c as any)._id || idx}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleFutureCardDrop(e, idx)}
              >
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center"><GripVertical className="w-4 h-4 text-gray-400" /><div className="text-xs text-gray-500 font-medium">#{idx + 1}</div></div>
                </div>
                <CardContent className="p-4 pt-8 text-center">
                  {c.icon && <div className="text-5xl mb-3">{c.icon}</div>}
                  <h3 className="font-semibold text-gray-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-700 mb-4">{c.description}</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline" onClick={() => handleEditCard(c as any)}><Edit className="w-3 h-3 mr-1" />Edit</Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteCard((c as any)._id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Scalable Model Section */}
      {activeSection === 'model' && (
        <Card>
          <CardHeader><CardTitle>Scalable & Sustainable Model</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading *</label>
              <Input value={pageData.scalableModelSection.heading} onChange={(e) => setPageData(prev => ({ ...prev, scalableModelSection: { ...prev.scalableModelSection, heading: e.target.value } }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Highlighted Text *</label>
              <Textarea value={pageData.scalableModelSection.highlightedText} onChange={(e) => setPageData(prev => ({ ...prev, scalableModelSection: { ...prev.scalableModelSection, highlightedText: e.target.value } }))} rows={6} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Join Movement Section */}
      {activeSection === 'join' && (
        <Card>
          <CardHeader><CardTitle>Join the Movement</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading *</label>
              <Input value={pageData.joinMovementSection.heading} onChange={(e) => setPageData(prev => ({ ...prev, joinMovementSection: { ...prev.joinMovementSection, heading: e.target.value } }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <Textarea value={pageData.joinMovementSection.description} onChange={(e) => setPageData(prev => ({ ...prev, joinMovementSection: { ...prev.joinMovementSection, description: e.target.value } }))} rows={6} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Button Text</label>
                <Input value={pageData.joinMovementSection.supportButtonText || ''} onChange={(e) => setPageData(prev => ({ ...prev, joinMovementSection: { ...prev.joinMovementSection, supportButtonText: e.target.value } }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Button Link</label>
                <Input value={pageData.joinMovementSection.supportButtonLink || ''} onChange={(e) => setPageData(prev => ({ ...prev, joinMovementSection: { ...prev.joinMovementSection, supportButtonLink: e.target.value } }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Get Involved Button Text</label>
                <Input value={pageData.joinMovementSection.getInvolvedButtonText || ''} onChange={(e) => setPageData(prev => ({ ...prev, joinMovementSection: { ...prev.joinMovementSection, getInvolvedButtonText: e.target.value } }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Get Involved Button Link</label>
                <Input value={pageData.joinMovementSection.getInvolvedButtonLink || ''} onChange={(e) => setPageData(prev => ({ ...prev, joinMovementSection: { ...prev.joinMovementSection, getInvolvedButtonLink: e.target.value } }))} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GirlsEducation;


