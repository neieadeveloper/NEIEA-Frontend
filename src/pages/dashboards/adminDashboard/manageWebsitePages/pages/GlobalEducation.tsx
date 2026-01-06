import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Save, X, Edit, Trash2, GripVertical, Upload, Globe } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';
import ImageUpload from '@/components/ui/image-upload';
import { toast } from 'sonner';
import { z } from 'zod';

// Zod Schemas
const iconCardSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  icon: z.string().min(1).max(10).optional(),
  display_order: z.number().optional(),
});

const pageSchema = z.object({
  heroSection: z.object({
    title: z.string().min(3).max(200).optional(),
    subtitle: z.string().max(200).optional(),
    description: z.string().max(500).optional(),
    heroImage: z.string().optional()
  }),
  introduction: z.object({
    heading: z.string().min(5).max(200),
    description: z.string().min(20).max(2000)
  }),
  missionSection: z.object({
    heading: z.string().min(5).max(200),
    description: z.string().min(20).max(2000),
    image: z.string().optional()
  }),
  sdgSection: z.object({
    heading: z.string().min(5).max(200),
    description: z.string().min(20).max(2000)
  }),
  sdgFocusSection: z.object({
    heading: z.string().min(5).max(200),
    description: z.string().min(20).max(2000),
    contributions: z.array(iconCardSchema).min(1)
  }),
  equityImpactSection: z.object({
    heading: z.string().min(5).max(200),
    paragraphs: z.array(z.string().min(10)).min(1),
    image: z.string().optional()
  }),
  bannerImage: z.string().optional(),
  valuesIntroSection: z.object({
    heading: z.string().min(5).max(200),
    description: z.string().min(10)
  }),
  valuesList: z.array(iconCardSchema).min(1),
  valuesSummary: z.string().min(10)
});

// Types
interface IconCard { _id?: string; title: string; description: string; icon?: string; display_order?: number }
interface PageData {
  heroSection?: { title?: string; subtitle?: string; description?: string; heroImage?: string };
  introduction: { heading: string; description: string };
  missionSection: { heading: string; description: string; image?: string };
  sdgSection: { heading: string; description: string };
  sdgFocusSection: { heading: string; description: string; contributions: IconCard[] };
  equityImpactSection: { heading: string; paragraphs: string[]; image?: string };
  bannerImage?: string;
  valuesIntroSection: { heading: string; description: string };
  valuesList: IconCard[];
  valuesSummary: string;
}

const GlobalEducation = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [pageData, setPageData] = useState<PageData>({
    heroSection: {
      title: 'Global Education',
      subtitle: 'Empowering Communities Through Quality Education',
      description: "NEIEA's commitment to providing inclusive, equitable education that transforms lives and builds sustainable communities worldwide.",
      heroImage: ''
    },
    introduction: {
      heading: 'Transforming Lives Through Global Education',
      description: 'The New Equitable and Innovative Educational Association (NEIEA) envisions a society where quality education empowers individuals to drive positive changes for human welfare, sustainability, and progress. Our global education mission focuses on breaking barriers, bridging gaps, and building inclusive learning communities that serve marginalized populations worldwide.'
    },
    missionSection: {
      heading: "NEIEA's Global Education Mission",
      description: "NEIEA's mission is to provide high-quality, innovative education to all, with a special focus on marginalized communities worldwide. Our inclusive approach ensures that education reaches those typically left behind in mainstream systems—girls, slum-dwelling children, dropouts, Madrasa students, and learners in underserved communities. Through free online courses and modern pedagogies like Discourse Oriented Pedagogy (DOP), we foster critical thinking, collaboration, and problem-solving skills essential for global citizenship.",
      image: '/assets/images/GlobalEducation/image2.jpg'
    },
    sdgSection: {
      heading: "Sustainable Development Goals: NEIEA's Commitment to Quality Education for All",
      description: 'The United Nations Sustainable Development Goals (SDGs) provide a global blueprint to create a more equitable, sustainable, and prosperous world by 2030. Among the 17 goals, SDG 4 — to "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all" — resonates deeply with NEIEA\'s mission and work.'
    },
    sdgFocusSection: {
      heading: "NEIEA's Focus on SDG 4",
      description: "NEIEA wholeheartedly aligns with SDG 4 by delivering inclusive, quality education, especially to those typically left behind in mainstream education systems—girls, slum-dwelling children, dropouts, Madrasa students, and learners in underserved public and private schools. NEIEA's key contributions include:",
      contributions: [
        { title: 'Free, high-quality online education', description: 'Offered through 17 diverse courses in English, mathematics, science, IT skills, financial literacy and NIOS subjects.', icon: '📚' },
        { title: 'Robust reach across India', description: "Over 17,500 learners enrolled, with 58% girls, showing NEIEA's strong commitment to gender equity in education.", icon: '🇮🇳' },
        { title: 'Empowering marginalized groups', description: 'Via collaborations with organizations like Umeed (Aligarh) and MV Foundation (Hyderabad), ensuring education reaches children in slums and homeless/destitute girls.', icon: '🌟' }
      ]
    },
    equityImpactSection: {
      heading: 'Equity, Transparency, and Sustainable Impact',
      paragraphs: [
        'NEIEA ensures equity by making all its educational offerings low-cost/free—removing financial barriers that prevent marginalized children from accessing learning.',
        'NEIEA practices transparency and accountability, earning certifications like 80G and operating under public accountability frameworks—including the Darpan ID—reinforcing trust and engagement within communities.'
      ],
      image: '/assets/images/GlobalEducation/image4.jpg'
    },
    bannerImage: '/assets/images/GlobalEducation/imagels.jpg',
    valuesIntroSection: {
      heading: 'Integrating Values in Education',
      description: "NEIEA's approach to global education is rooted in strong values that ensure holistic development and meaningful impact."
    },
    valuesList: [
      { title: 'Holistic Learning Approach', description: 'NEIEA does not restrict education to academic achievement alone; it emphasizes moral, social, and emotional growth. Learners are encouraged to develop empathy, respect, and responsibility alongside literacy and numeracy.', icon: '🌱' },
      { title: 'Equity and Inclusivity as Core Values', description: 'By offering low cost/free education to underserved communities and low-budget institutions, NEIEA ensures that education is accessible to all, reflecting the values of justice, equality, and fairness.', icon: '⚖️' },
      { title: 'Discourse-Oriented Pedagogy (DOP)', description: 'Developed by co-founder Dr. K. N. Anandan, this pedagogy nurtures dialogue, collaboration, and critical thinking, promoting respect for diverse voices and perspectives—a core principle of value-based education.', icon: '💬' },
      { title: 'Teacher Empowerment with Values at the Center', description: "NEIEA's teacher training programs focus on building not only academic and technological skills but also values like inclusivity, empathy, and reflective practice. Teachers become role models who can transmit these values to students.", icon: '👨‍🏫' },
      { title: 'Community Building & Social Responsibility', description: "NEIEA's initiatives—whether in madrasas, schools, or foundations—emphasize social cohesion, respect for cultural diversity, and active citizenship. Learners are guided to see education as a tool for serving society, not just personal growth.", icon: '🤝' },
      { title: 'Integration of Life Skills & Soft Skills', description: 'Through English communication, soft skills, and career planning programs, NEIEA equips learners with integrity, confidence, and collaboration skills, helping them lead value-driven personal and professional lives.', icon: '💪' }
    ],
    valuesSummary: '✨ In short, NEIEA is deeply connected with value-based education because it places human values—equity, inclusivity, empathy, respect, and responsibility—at the heart of its mission. It blends modern skills with timeless values, ensuring that learners become not only competent but also compassionate citizens.'
  });

  // Images
  const [missionImageFile, setMissionImageFile] = useState<File | null>(null);
  const [missionPreview, setMissionPreview] = useState('');
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState('');
  const [equityImageFile, setEquityImageFile] = useState<File | null>(null);
  const [equityPreview, setEquityPreview] = useState('');
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState('');
  const [uploadingMission, setUploadingMission] = useState(false);
  const [uploadingEquity, setUploadingEquity] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);

  // Local forms
  const [newContribution, setNewContribution] = useState({ title: '', description: '', icon: '' });
  const [editingContributionId, setEditingContributionId] = useState<string | null>(null);
  const [showContributionForm, setShowContributionForm] = useState(false);
  const [newValue, setNewValue] = useState({ title: '', description: '', icon: '' });
  const [editingValueId, setEditingValueId] = useState<string | null>(null);
  const [showValueForm, setShowValueForm] = useState(false);

  useEffect(() => { loadPage(); }, []);

  const loadPage = async () => {
    try {
      const res = await axiosInstance.get('/admin/global-education-page');
      if (res.data?.success && res.data.data) {
        const data = res.data.data as PageData;
        setPageData(data);
        setHeroPreview(data.heroSection?.heroImage || '');
        setMissionPreview(data.missionSection?.image || '');
        setEquityPreview(data.equityImpactSection?.image || '');
        setBannerPreview(data.bannerImage || '');
      }
    } catch (e: any) {
      if (e.response?.status !== 404) toast.error(e.response?.data?.message || 'Failed to load page');
    }
  };

  const uploadHero = async () => {
    if (!heroImageFile) return toast.error('Select an image');
    if (!validateImage(heroImageFile)) return;
    const fd = new FormData(); fd.append('heroImage', heroImageFile);
    setUploadingHero(true);
    try {
      const res = await axiosInstance.post('/admin/global-education-page/upload-hero-image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setHeroPreview(res.data.data.image);
      setPageData(prev => ({ ...prev, heroSection: { ...(prev.heroSection||{}), heroImage: res.data.data.image } }));
      toast.success('Hero image updated');
    } catch (e: any) { toast.error(e.response?.data?.message || 'Upload failed'); } finally { setUploadingHero(false); }
  };

  const validateImage = (file: File, max = 2 * 1024 * 1024) => {
    if (file.size > max) { toast.error(`Image must be <= ${Math.floor(max/1024/1024)}MB`); return false; }
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) { toast.error('Only JPEG/PNG/WebP/GIF allowed'); return false; }
    return true;
  };

  const uploadMission = async () => {
    if (!missionImageFile) return toast.error('Select an image');
    if (!validateImage(missionImageFile)) return;
    const fd = new FormData(); fd.append('missionImage', missionImageFile);
    setUploadingMission(true);
    try {
      const res = await axiosInstance.post('/admin/global-education-page/upload-mission-image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMissionPreview(res.data.data.image);
      setPageData(prev => ({ ...prev, missionSection: { ...prev.missionSection, image: res.data.data.image } }));
      toast.success('Mission image updated');
    } catch (e: any) { toast.error(e.response?.data?.message || 'Upload failed'); } finally { setUploadingMission(false); }
  };

  const uploadEquity = async () => {
    if (!equityImageFile) return toast.error('Select an image');
    if (!validateImage(equityImageFile)) return;
    const fd = new FormData(); fd.append('equityImage', equityImageFile);
    setUploadingEquity(true);
    try {
      const res = await axiosInstance.post('/admin/global-education-page/upload-equity-image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setEquityPreview(res.data.data.image);
      setPageData(prev => ({ ...prev, equityImpactSection: { ...prev.equityImpactSection, image: res.data.data.image } }));
      toast.success('Equity image updated');
    } catch (e: any) { toast.error(e.response?.data?.message || 'Upload failed'); } finally { setUploadingEquity(false); }
  };

  const uploadBanner = async () => {
    if (!bannerImageFile) return toast.error('Select an image');
    if (!validateImage(bannerImageFile, 3*1024*1024)) return;
    const fd = new FormData(); fd.append('bannerImage', bannerImageFile);
    setUploadingBanner(true);
    try {
      const res = await axiosInstance.post('/admin/global-education-page/upload-banner-image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setBannerPreview(res.data.data.image);
      setPageData(prev => ({ ...prev, bannerImage: res.data.data.image }));
      toast.success('Banner image updated');
    } catch (e: any) { toast.error(e.response?.data?.message || 'Upload failed'); } finally { setUploadingBanner(false); }
  };

  const handleSaveAll = async () => {
    try {
      const dataToSave: PageData = {
        ...pageData,
        sdgFocusSection: {
          ...pageData.sdgFocusSection,
          contributions: pageData.sdgFocusSection.contributions.map((c, i) => ({ ...c, display_order: i }))
        },
        valuesList: pageData.valuesList.map((v, i) => ({ ...v, display_order: i }))
      };
      const parsed = pageSchema.safeParse(dataToSave);
      if (!parsed.success) { const e = parsed.error.errors[0]; toast.error(`Validation: ${e.path.join(' → ')}: ${e.message}`); return; }
      let res;
      try { res = await axiosInstance.put('/admin/global-education-page', dataToSave); }
      catch (err: any) { if (err.response?.status === 404) res = await axiosInstance.post('/admin/global-education-page', dataToSave); else throw err; }
      if (res.data.success) { toast.success('Page saved'); await loadPage(); } else toast.error('Failed to save');
    } catch (e: any) { toast.error(e.response?.data?.message || 'Failed to save'); }
  };

  // DnD Contributions
  const onContribDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault(); const dragIndex = parseInt(e.dataTransfer.getData('text/plain')); if (dragIndex===dropIndex) return;
    const arr = [...pageData.sdgFocusSection.contributions]; const item = arr[dragIndex]; arr.splice(dragIndex,1); arr.splice(dropIndex,0,item);
    setPageData(prev => ({ ...prev, sdgFocusSection: { ...prev.sdgFocusSection, contributions: arr } }));
    try { const payload = arr.map((it, idx) => ({ id: it._id!, display_order: idx })); await axiosInstance.post('/admin/global-education-page/reorder', { section:'contributions', items: payload }); toast.success('Order updated'); } catch { toast.error('Failed to update order'); await loadPage(); }
  };

  // DnD Values
  const onValueDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault(); const dragIndex = parseInt(e.dataTransfer.getData('text/plain')); if (dragIndex===dropIndex) return;
    const arr = [...pageData.valuesList]; const item = arr[dragIndex]; arr.splice(dragIndex,1); arr.splice(dropIndex,0,item);
    setPageData(prev => ({ ...prev, valuesList: arr }));
    try { const payload = arr.map((it, idx) => ({ id: it._id!, display_order: idx })); await axiosInstance.post('/admin/global-education-page/reorder', { section:'values', items: payload }); toast.success('Order updated'); } catch { toast.error('Failed to update order'); await loadPage(); }
  };

  const saveContribution = () => {
    const parsed = iconCardSchema.safeParse(newContribution); if (!parsed.success) { toast.error(parsed.error.errors[0].message); return; }
    if (editingContributionId) {
      setPageData(prev => ({ ...prev, sdgFocusSection: { ...prev.sdgFocusSection, contributions: prev.sdgFocusSection.contributions.map(c => c._id===editingContributionId ? { ...c, ...newContribution } : c) } }));
      toast.success('Updated locally. Save All to persist.');
    } else {
      setPageData(prev => ({ ...prev, sdgFocusSection: { ...prev.sdgFocusSection, contributions: [...prev.sdgFocusSection.contributions, { ...newContribution }] } }));
      toast.success('Added locally. Save All to persist.');
    }
    setEditingContributionId(null);
    setNewContribution({ title:'', description:'', icon:'' });
    setShowContributionForm(false);
  };

  const deleteContribution = (id?: string) => {
    if (!confirm('Delete this card?')) return;
    setPageData(prev => ({ ...prev, sdgFocusSection: { ...prev.sdgFocusSection, contributions: prev.sdgFocusSection.contributions.filter(c => c._id !== id) } }));
  };

  const saveValueItem = () => {
    const parsed = iconCardSchema.safeParse(newValue); if (!parsed.success) { toast.error(parsed.error.errors[0].message); return; }
    if (editingValueId) {
      setPageData(prev => ({ ...prev, valuesList: prev.valuesList.map(v => v._id===editingValueId ? { ...v, ...newValue } : v) }));
      toast.success('Updated locally. Save All to persist.');
    } else {
      setPageData(prev => ({ ...prev, valuesList: [...prev.valuesList, { ...newValue }] }));
      toast.success('Added locally. Save All to persist.');
    }
    setEditingValueId(null);
    setNewValue({ title:'', description:'', icon:'' });
    setShowValueForm(false);
  };

  const deleteValueItem = (id?: string) => {
    if (!confirm('Delete this item?')) return;
    setPageData(prev => ({ ...prev, valuesList: prev.valuesList.filter(v => v._id !== id) }));
  };

  const dragStart = (e: React.DragEvent, index: number) => { e.dataTransfer.setData('text/plain', index.toString()); (e.currentTarget as HTMLElement).style.opacity='0.5'; };
  const dragEnd = (e: React.DragEvent) => { (e.currentTarget as HTMLElement).style.opacity='1'; };
  const dragOver = (e: React.DragEvent) => { e.preventDefault(); };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Globe className="w-8 h-8" />
            Manage Global Education Page
          </h1>
          <p className="text-gray-600">Update all content for the global education page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[
          { key: 'hero', label: 'Hero' },
          { key: 'intro', label: 'Introduction' },
          { key: 'mission', label: 'Mission' },
          { key: 'sdg', label: 'SDG' },
          { key: 'focus', label: 'SDG Focus' },
          { key: 'equity', label: 'Equity & Impact' },
          { key: 'banner', label: 'Banner Image' },
          { key: 'values', label: 'Values' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeSection === key ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeSection==='hero' && (
        <Card>
          <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Title" value={pageData.heroSection?.title || ''} onChange={(e)=>setPageData(prev=>({ ...prev, heroSection:{ ...(prev.heroSection||{}), title:e.target.value } }))} />
              <Input placeholder="Subtitle" value={pageData.heroSection?.subtitle || ''} onChange={(e)=>setPageData(prev=>({ ...prev, heroSection:{ ...(prev.heroSection||{}), subtitle:e.target.value } }))} />
            </div>
            <Textarea rows={3} placeholder="Short description" value={pageData.heroSection?.description || ''} onChange={(e)=>setPageData(prev=>({ ...prev, heroSection:{ ...(prev.heroSection||{}), description:e.target.value } }))} />
            <div className="grid gap-4 md:grid-cols-2 items-end">
              <div>
                <label className="block text-sm mb-2">Hero Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
                <ImageUpload value={heroPreview} onChange={(file, preview)=>{ setHeroImageFile(file); setHeroPreview(preview); }} />
              </div>
              <div>
                <Button disabled={!heroImageFile||uploadingHero} onClick={uploadHero}><Upload className="w-4 h-4 mr-2"/>Upload</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection==='intro' && (
        <Card>
          <CardHeader><CardTitle>Introduction</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input value={pageData.introduction.heading} onChange={(e)=>setPageData(prev=>({ ...prev, introduction:{ ...prev.introduction, heading:e.target.value }}))} placeholder="Heading" />
            <Textarea rows={4} value={pageData.introduction.description} onChange={(e)=>setPageData(prev=>({ ...prev, introduction:{ ...prev.introduction, description:e.target.value }}))} placeholder="Description" />
          </CardContent>
        </Card>
      )}

      {activeSection==='mission' && (
        <Card>
          <CardHeader><CardTitle>Global Education Mission</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input value={pageData.missionSection.heading} onChange={(e)=>setPageData(prev=>({ ...prev, missionSection:{ ...prev.missionSection, heading:e.target.value }}))} placeholder="Heading" />
            <Textarea rows={5} value={pageData.missionSection.description} onChange={(e)=>setPageData(prev=>({ ...prev, missionSection:{ ...prev.missionSection, description:e.target.value }}))} placeholder="Description" />
            <div className="grid gap-4 md:grid-cols-2 items-end">
              <div>
                <label className="block text-sm mb-2">Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                <ImageUpload value={missionPreview} onChange={(file, preview)=>{ setMissionImageFile(file); setMissionPreview(preview); }} />
              </div>
              <div>
                <Button disabled={!missionImageFile||uploadingMission} onClick={uploadMission}><Upload className="w-4 h-4 mr-2"/>Upload</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection==='sdg' && (
        <Card>
          <CardHeader><CardTitle>SDG Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input value={pageData.sdgSection.heading} onChange={(e)=>setPageData(prev=>({ ...prev, sdgSection:{ ...prev.sdgSection, heading:e.target.value }}))} placeholder="Heading" />
            <Textarea rows={5} value={pageData.sdgSection.description} onChange={(e)=>setPageData(prev=>({ ...prev, sdgSection:{ ...prev.sdgSection, description:e.target.value }}))} placeholder="Description" />
          </CardContent>
        </Card>
      )}

      {activeSection==='focus' && (
        <Card>
          <CardHeader><CardTitle>SDG Focus</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input value={pageData.sdgFocusSection.heading} onChange={(e)=>setPageData(prev=>({ ...prev, sdgFocusSection:{ ...prev.sdgFocusSection, heading:e.target.value }}))} placeholder="Heading" />
            <Textarea rows={4} value={pageData.sdgFocusSection.description} onChange={(e)=>setPageData(prev=>({ ...prev, sdgFocusSection:{ ...prev.sdgFocusSection, description:e.target.value }}))} placeholder="Description" />

            <div className="flex items-center justify-between mt-4">
              <h4 className="font-semibold">Contributions</h4>
              <Button 
                variant="outline" 
                onClick={()=>{ 
                  setEditingContributionId(null); 
                  setNewContribution({ title:'', description:'', icon:'' });
                  setShowContributionForm(true);
                }}
                disabled={showContributionForm && editingContributionId === null}
              >
                <Plus className="w-4 h-4 mr-2"/>
                Add Contribution
              </Button>
            </div>
            {(showContributionForm || editingContributionId) && (
              <div className="grid gap-3 md:grid-cols-2 border-t pt-4 mt-4">
                <Input placeholder="Title" value={newContribution.title} onChange={(e)=>setNewContribution(prev=>({ ...prev, title:e.target.value }))} />
                <Input placeholder="Icon (emoji)" value={newContribution.icon} onChange={(e)=>setNewContribution(prev=>({ ...prev, icon:e.target.value }))} />
                <Textarea rows={3} placeholder="Description" value={newContribution.description} onChange={(e)=>setNewContribution(prev=>({ ...prev, description:e.target.value }))} />
                <div className="flex gap-2 md:col-span-2">
                  <Button onClick={saveContribution}><Save className="w-4 h-4 mr-2"/>Save</Button>
                  <Button variant="ghost" onClick={()=>{ 
                    setEditingContributionId(null); 
                    setNewContribution({ title:'', description:'', icon:'' });
                    setShowContributionForm(false);
                  }}><X className="w-4 h-4 mr-2"/>Cancel</Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {pageData.sdgFocusSection.contributions.map((c, idx)=>(
                <div key={c._id||idx} className="flex items-start gap-3 p-3 border rounded-md bg-white" draggable onDragStart={(e)=>dragStart(e, idx)} onDragOver={dragOver} onDragEnd={dragEnd} onDrop={(e)=>onContribDrop(e, idx)}>
                  <GripVertical className="w-4 h-4 mt-1 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium">{c.title}</div>
                    <div className="text-sm text-gray-600">{c.description}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={()=>{ 
                      setEditingContributionId(c._id||null); 
                      setNewContribution({ title:c.title, description:c.description, icon:c.icon||'' });
                      setShowContributionForm(true);
                    }}><Edit className="w-4 h-4"/></Button>
                    <Button size="sm" variant="destructive" onClick={()=>deleteContribution(c._id)}><Trash2 className="w-4 h-4"/></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection==='equity' && (
        <Card>
          <CardHeader><CardTitle>Equity, Transparency, and Sustainable Impact</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input value={pageData.equityImpactSection.heading} onChange={(e)=>setPageData(prev=>({ ...prev, equityImpactSection:{ ...prev.equityImpactSection, heading:e.target.value }}))} placeholder="Heading" />
            {(pageData.equityImpactSection.paragraphs||[]).map((p, i)=>(
              <div className="flex gap-2" key={i}>
                <Textarea rows={3} value={p} onChange={(e)=>setPageData(prev=>({ ...prev, equityImpactSection:{ ...prev.equityImpactSection, paragraphs: prev.equityImpactSection.paragraphs.map((v,idx)=>idx===i?e.target.value:v) }}))} />
                <Button variant="outline" onClick={()=>setPageData(prev=>({ ...prev, equityImpactSection:{ ...prev.equityImpactSection, paragraphs: prev.equityImpactSection.paragraphs.filter((_,idx)=>idx!==i) }}))}><X className="w-4 h-4"/></Button>
              </div>
            ))}
            <Button variant="secondary" onClick={()=>setPageData(prev=>({ ...prev, equityImpactSection:{ ...prev.equityImpactSection, paragraphs:[...prev.equityImpactSection.paragraphs,''] }}))}><Plus className="w-4 h-4 mr-1"/>Add Paragraph</Button>

            <div className="grid gap-4 md:grid-cols-2 items-end">
              <div>
                <label className="block text-sm mb-2">Image</label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                <ImageUpload value={equityPreview} onChange={(file, preview)=>{ setEquityImageFile(file); setEquityPreview(preview); }} />
              </div>
              <div>
                <Button disabled={!equityImageFile||uploadingEquity} onClick={uploadEquity}><Upload className="w-4 h-4 mr-2"/>Upload</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection==='banner' && (
        <Card>
          <CardHeader><CardTitle>Banner Image</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 items-end">
            <div>
              <label className="block text-sm mb-2">Banner Image</label>
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
              <ImageUpload value={bannerPreview} onChange={(file, preview)=>{ setBannerImageFile(file); setBannerPreview(preview); }} />
            </div>
            <div>
              <Button disabled={!bannerImageFile||uploadingBanner} onClick={uploadBanner}><Upload className="w-4 h-4 mr-2"/>Upload</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection==='values' && (
        <Card>
          <CardHeader><CardTitle>Values</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input value={pageData.valuesIntroSection.heading} onChange={(e)=>setPageData(prev=>({ ...prev, valuesIntroSection:{ ...prev.valuesIntroSection, heading:e.target.value }}))} placeholder="Heading" />
            <Textarea rows={4} value={pageData.valuesIntroSection.description} onChange={(e)=>setPageData(prev=>({ ...prev, valuesIntroSection:{ ...prev.valuesIntroSection, description:e.target.value }}))} placeholder="Description" />

            <div className="flex items-center justify-between mt-4">
              <h4 className="font-semibold">Value Items</h4>
              <Button 
                variant="outline" 
                onClick={()=>{ 
                  setEditingValueId(null); 
                  setNewValue({ title:'', description:'', icon:'' });
                  setShowValueForm(true);
                }}
                disabled={showValueForm && editingValueId === null}
              >
                <Plus className="w-4 h-4 mr-2"/>
                Add Value Item
              </Button>
            </div>
            {(showValueForm || editingValueId) && (
              <div className="grid gap-3 md:grid-cols-2 border-t pt-4 mt-4">
                <Input placeholder="Title" value={newValue.title} onChange={(e)=>setNewValue(prev=>({ ...prev, title:e.target.value }))} />
                <Input placeholder="Icon (emoji)" value={newValue.icon} onChange={(e)=>setNewValue(prev=>({ ...prev, icon:e.target.value }))} />
                <Textarea rows={3} placeholder="Description" value={newValue.description} onChange={(e)=>setNewValue(prev=>({ ...prev, description:e.target.value }))} />
                <div className="flex gap-2 md:col-span-2">
                  <Button onClick={saveValueItem}><Save className="w-4 h-4 mr-2"/>Save</Button>
                  <Button variant="ghost" onClick={()=>{ 
                    setEditingValueId(null); 
                    setNewValue({ title:'', description:'', icon:'' });
                    setShowValueForm(false);
                  }}><X className="w-4 h-4 mr-2"/>Cancel</Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {pageData.valuesList.map((v, idx)=>(
                <div key={v._id||idx} className="flex items-start gap-3 p-3 border rounded-md bg-white" draggable onDragStart={(e)=>dragStart(e, idx)} onDragOver={dragOver} onDragEnd={dragEnd} onDrop={(e)=>onValueDrop(e, idx)}>
                  <GripVertical className="w-4 h-4 mt-1 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium">{v.title}</div>
                    <div className="text-sm text-gray-600">{v.description}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={()=>{ 
                      setEditingValueId(v._id||null); 
                      setNewValue({ title:v.title, description:v.description, icon:v.icon||'' });
                      setShowValueForm(true);
                    }}><Edit className="w-4 h-4"/></Button>
                    <Button size="sm" variant="destructive" onClick={()=>deleteValueItem(v._id)}><Trash2 className="w-4 h-4"/></Button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm mb-1">Values Summary</label>
              <Textarea rows={4} value={pageData.valuesSummary} onChange={(e)=>setPageData(prev=>({ ...prev, valuesSummary:e.target.value }))} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GlobalEducation;
