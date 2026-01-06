import { useEffect, useRef, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { partnersJoinAdminApi, PartnersJoinPage } from '@/lib/partnersJoinApi';
import { toast } from 'sonner';

const defaultState: PartnersJoinPage = {
  headerSection: {
    title: 'Join NEIEA as a Partner',
    subtitle: 'Collaborate to build a transformative future in education',
    imageUrl: '/assets/images/JoinNeieaAsPartner/1.png',
    videoLink: '',
  },
  overviewSection: {
    introductionParagraph:
      'At NEIEA, we believe education is a shared responsibility—and collaboration is the key to making it accessible to all. Our partnership model is built on working hand in hand with educational institutions and community centers that face challenges in delivering quality learning.',
    scalableModel: {
      title: 'A Scalable Model for Quality Learning',
      description:
        "NEIEA signs formal agreements with partner institutions, defining mutual responsibilities to ensure accountability and success. With just a one-time investment of Rs. 1.3 lakhs (~$1500), a standard classroom can be converted into a digital classroom, ready to host NEIEA's programs.",
    },
    lowCostModelParagraph:
      'The cost of running our model is remarkably low: Rs. 500 ($6) per child per month, or Rs. 5,000 ($60) per class of 25 students per month. For this small investment, NEIEA provides expert-led teaching in English, Math, and Science, helping students pass standardized exams and unlocking opportunities that were once out of reach.',
    communityPartnerships: {
      title: 'Partnerships That Empower Communities',
      description1:
        'Beyond schools, NEIEA partners with marginalized communities—empowering adults, women, and farmers by transforming community centers into digital learning hubs. These hubs provide education, skills training, and opportunities at a very low cost, strengthening communities and fueling growth.',
      description2:
        "We also work with institutions and centers focused on youth empowerment. Through our Blended Learning Model, using 3D and augmented learning technologies, NEIEA offers technical and vocational training that is job-oriented and industry-relevant. This is complemented with soft skills development, ensuring young learners are well-prepared for meaningful employment and brighter futures.",
    },
    globalCollaborations: {
      title: 'Global Collaborations for Greater Impact',
      description:
        'Our vision is global, and so are our partnerships. NEIEA collaborates with international organizations that share our mission: Global Schools Initiative advancing Sustainable Development Goals (SDGs) in education, Aflatoun delivering financial literacy programs to learners of all ages, and J-PAL bringing evidence-based learning expertise into our programs.',
    },
    transparencyParagraph:
      'By building strong relationships with trusts, foundations, and philanthropic families, NEIEA ensures that every rupee or dollar is spent wisely. We commit that 95% of all grants and funds received go directly to program implementation, documented with full transparency and accountability to international standards.',
  },
  whyCollaborateSection: {
    title: 'Why Collaborate with NEIEA?',
    points: [
      {
        title: 'Transform Access to Education',
        description: 'Open your doors to NEIEA programs and give underserved learners the same opportunities as privileged students.',
        display_order: 1,
      },
      {
        title: 'Multiply Your Impact',
        description: 'Every partnership expands the reach of education—turning one classroom, one center, or one institution into a hub of change.',
        display_order: 2,
      },
      {
        title: 'Empower the Marginalized',
        description: 'From children in slums to women, farmers, and youth, your collaboration ensures access to education and skills that change lives.',
        display_order: 3,
      },
      {
        title: 'Be Part of a Global Movement',
        description: 'Partner with NEIEA and join a worldwide mission for equitable learning, aligned with SDGs and global best practices.',
        display_order: 4,
      },
      {
        title: 'Invest Where It Matters Most',
        description: "With NEIEA's low-cost model, your contribution creates maximum impact—directly reaching learners who need it most.",
        display_order: 5,
      },
    ],
  },
  howYouCanPartnerSection: {
    title: 'How You Can Partner with NEIEA',
    modes: [
      {
        title: 'Host NEIEA Digital Classrooms',
        description: 'Convert existing classrooms or spaces into technology-enabled hubs for core academic and vocational programs.',
        display_order: 1,
      },
      {
        title: 'Co-Design Programs',
        description: 'Collaborate with us to create workshops, teacher training, and community learning activities tailored to your needs.',
        display_order: 2,
      },
      {
        title: 'Empower Communities Together',
        description: "Transform community centers into spaces for adult literacy, women's empowerment, and farmer education.",
        display_order: 3,
      },
      {
        title: 'Strengthen Youth Futures',
        description: 'Partner on technical and vocational training using blended learning, 3D tools, and soft skills for employability.',
        display_order: 4,
      },
      {
        title: 'Build Long-Term Collaborations',
        description: 'Establish sustained partnerships that expand access year after year, positioning your institution as a leader in inclusive education.',
        display_order: 5,
      },
    ],
  },
  partneringWithCharitiesSection: {
    title: 'Partnering with Charities, Trusts, and Foundations',
    paragraphs: [
      'Behind every success story in education, there is often a quiet generosity. At NEIEA, we invite charitable trusts, philanthropic families, and foundations to become that hand of hope for thousands of learners waiting for their chance.',
      "Your support does more than fund programming. It changes lives: A single donation can transform a classroom into a digital learning hub, reaching dozens of children every day. A modest grant can cover months of high-quality teaching in English, Math, and Science for entire classes of marginalized students. A sustained partnership can enable youth vocational training and women's empowerment programs that ripple across communities for generations.",
      "NEIEA pledges to honor your trust with the highest standards of transparency, accountability, and ethical practice. We commit that 95% of all grants and donations go directly to program delivery—bringing education, skills, and dignity to those who need it most. Charities and trusts have always been the bridge between compassion and change. With your support, NEIEA can take education to the forgotten corners of our world.",
    ],
    imageUrl: '',
  },
  callToActionSection: {
    title: 'Ready to Partner with NEIEA?',
    subtitle: 'Together, we can transform education and empower communities across the globe.',
    buttonText: 'Contact Us',
    buttonLink: '/about-us/contact',
  },
};

const PartnersJoin = () => {
  const [activeSection, setActiveSection] = useState('header');
  const [data, setData] = useState<PartnersJoinPage>(defaultState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingHeader, setUploadingHeader] = useState(false);
  const [uploadingSymbolic, setUploadingSymbolic] = useState(false);
  const headerInputRef = useRef<HTMLInputElement>(null);
  const symbolicInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await partnersJoinAdminApi.get();
        if (res) setData(res);
      } catch (e: any) {
        if (e?.response?.status !== 404) {
          toast.error(e?.response?.data?.message || 'Failed to load page');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveAll = async () => {
    try {
      setSaving(true);
      const res = await partnersJoinAdminApi.update(data);
      setData(res);
      toast.success('Saved successfully');
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const onHeaderFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingHeader(true);
      const url = await partnersJoinAdminApi.uploadHeaderImage(file);
      setData(prev => ({ ...prev, headerSection: { ...prev.headerSection, imageUrl: url } }));
      toast.success('Header image uploaded');
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Upload failed');
    } finally {
      setUploadingHeader(false);
      e.target.value = '';
    }
  }

  const onSymbolicFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingSymbolic(true);
      const url = await partnersJoinAdminApi.uploadSymbolicImage(file);
      setData(prev => ({ ...prev, partneringWithCharitiesSection: { ...prev.partneringWithCharitiesSection, imageUrl: url } }));
      toast.success('Symbolic image uploaded');
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Upload failed');
    } finally {
      setUploadingSymbolic(false);
      e.target.value = '';
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partners Join Management</h1>
          <p className="text-gray-600 mt-1">Manage the content for the Join NEIEA as a Partner page</p>
        </div>
        <Button onClick={saveAll} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
          {saving ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>) : (<><Save className="mr-2 h-4 w-4" />Save All Changes</>)}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {[
          { key: 'header', label: 'Header Section' },
          { key: 'overview', label: 'Overview Section' },
          { key: 'cta', label: 'Call To Action' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`px-6 py-3 font-medium text-sm transition-colors ${activeSection === tab.key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Header Section */}
      {activeSection === 'header' && (
        <Card>
          <CardHeader><CardTitle>Header Section</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <Input value={data.headerSection.title} onChange={(e)=>setData({...data, headerSection:{...data.headerSection, title:e.target.value}})} placeholder="Title" />
            <Textarea value={data.headerSection.subtitle} onChange={(e)=>setData({...data, headerSection:{...data.headerSection, subtitle:e.target.value}})} placeholder="Subtitle" rows={3} />
            <div>
              {data.headerSection.imageUrl ? (
                <img src={data.headerSection.imageUrl} alt="header" className="w-full h-64 object-contain rounded-lg border-2 border-gray-300 bg-gray-50 mb-3" />
              ) : (
                <div className="mb-3 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50"><p className="text-gray-500">No image uploaded yet</p></div>
              )}
              <input ref={headerInputRef} onChange={onHeaderFile} type="file" accept="image/*" className="hidden" />
              <Button type="button" disabled={uploadingHeader} onClick={()=> headerInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700">
                {uploadingHeader ? 'Uploading...' : data.headerSection.imageUrl ? 'Change Image' : 'Upload Image'}
              </Button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video Link (Optional)</label>
              <p className="text-xs text-gray-500 mb-2">Enter a YouTube or Vimeo video URL to display over the hero image</p>
              <Input
                type="url"
                value={data.headerSection.videoLink || ''}
                onChange={(e) => setData({...data, headerSection: {...data.headerSection, videoLink: e.target.value}})}
                placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <Card>
          <CardHeader><CardTitle>Overview Section</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <Textarea value={data.overviewSection.introductionParagraph} onChange={(e)=>setData({...data, overviewSection:{...data.overviewSection, introductionParagraph:e.target.value}})} placeholder="Introduction Paragraph" />
            <Input value={data.overviewSection.scalableModel.title} onChange={(e)=>setData({...data, overviewSection:{...data.overviewSection, scalableModel:{...data.overviewSection.scalableModel, title:e.target.value}}})} placeholder="Scalable Model Title" />
            <Textarea value={data.overviewSection.scalableModel.description} onChange={(e)=>setData({...data, overviewSection:{...data.overviewSection, scalableModel:{...data.overviewSection.scalableModel, description:e.target.value}}})} placeholder="Scalable Model Description" />
            <Textarea value={data.overviewSection.lowCostModelParagraph} onChange={(e)=>setData({...data, overviewSection:{...data.overviewSection, lowCostModelParagraph:e.target.value}})} placeholder="Low Cost Model Paragraph" />
            <Input value={data.overviewSection.communityPartnerships.title} onChange={(e)=>setData({...data, overviewSection:{...data.overviewSection, communityPartnerships:{...data.overviewSection.communityPartnerships, title:e.target.value}}})} placeholder="Community Partnerships Title" />
            <Textarea value={data.overviewSection.communityPartnerships.description1} onChange={(e)=>setData({...data, overviewSection:{...data.overviewSection, communityPartnerships:{...data.overviewSection.communityPartnerships, description1:e.target.value}}})} placeholder="Community Partnerships Paragraph 1" />
            <Textarea value={data.overviewSection.communityPartnerships.description2} onChange={(e)=>setData({...data, overviewSection:{...data.overviewSection, communityPartnerships:{...data.overviewSection.communityPartnerships, description2:e.target.value}}})} placeholder="Community Partnerships Paragraph 2" />
            <Input value={data.overviewSection.globalCollaborations.title} onChange={(e)=>setData({...data, overviewSection:{...data.overviewSection, globalCollaborations:{...data.overviewSection.globalCollaborations, title:e.target.value}}})} placeholder="Global Collaborations Title" />
            <Textarea value={data.overviewSection.globalCollaborations.description} onChange={(e)=>setData({...data, overviewSection:{...data.overviewSection, globalCollaborations:{...data.overviewSection.globalCollaborations, description:e.target.value}}})} placeholder="Global Collaborations Description" />
            <Textarea value={data.overviewSection.transparencyParagraph} onChange={(e)=>setData({...data, overviewSection:{...data.overviewSection, transparencyParagraph:e.target.value}})} placeholder="Transparency & Accountability Paragraph" />

            {/* Why Collaborate (moved under Overview) */}
            <div className="pt-2 border-t">
              <h3 className="text-lg font-semibold mb-2">Why Collaborate Section</h3>
              <Input value={data.whyCollaborateSection.title} onChange={(e)=>setData({...data, whyCollaborateSection:{...data.whyCollaborateSection, title:e.target.value}})} placeholder="Section Title" />
              <div className="mt-3 space-y-3">
                {data.whyCollaborateSection.points.map((p, i)=> (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <Input value={p.title} onChange={(e)=>{ const copy=[...data.whyCollaborateSection.points]; copy[i]={...copy[i], title:e.target.value}; setData({...data, whyCollaborateSection:{...data.whyCollaborateSection, points:copy}}); }} placeholder="Point Title" />
                    <Input type="number" value={p.display_order || 0} onChange={(e)=>{ const copy=[...data.whyCollaborateSection.points]; copy[i]={...copy[i], display_order:Number(e.target.value)}; setData({...data, whyCollaborateSection:{...data.whyCollaborateSection, points:copy}}); }} placeholder="Display Order" />
                    <Textarea value={p.description} onChange={(e)=>{ const copy=[...data.whyCollaborateSection.points]; copy[i]={...copy[i], description:e.target.value}; setData({...data, whyCollaborateSection:{...data.whyCollaborateSection, points:copy}}); }} placeholder="Point Description" />
                  </div>
                ))}
                {/* Removed Add Point button as requested */}
              </div>
            </div>

            {/* How You Can Partner (moved under Overview) */}
            <div className="pt-2 border-t">
              <h3 className="text-lg font-semibold mb-2">How You Can Partner Section</h3>
              <Input value={data.howYouCanPartnerSection.title} onChange={(e)=>setData({...data, howYouCanPartnerSection:{...data.howYouCanPartnerSection, title:e.target.value}})} placeholder="Section Title" />
              <div className="mt-3 space-y-3">
                {data.howYouCanPartnerSection.modes.map((m, i)=> (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <Input value={m.title} onChange={(e)=>{ const copy=[...data.howYouCanPartnerSection.modes]; copy[i]={...copy[i], title:e.target.value}; setData({...data, howYouCanPartnerSection:{...data.howYouCanPartnerSection, modes:copy}}); }} placeholder="Mode Title" />
                    <Input type="number" value={m.display_order || 0} onChange={(e)=>{ const copy=[...data.howYouCanPartnerSection.modes]; copy[i]={...copy[i], display_order:Number(e.target.value)}; setData({...data, howYouCanPartnerSection:{...data.howYouCanPartnerSection, modes:copy}}); }} placeholder="Display Order" />
                    <Textarea value={m.description} onChange={(e)=>{ const copy=[...data.howYouCanPartnerSection.modes]; copy[i]={...copy[i], description:e.target.value}; setData({...data, howYouCanPartnerSection:{...data.howYouCanPartnerSection, modes:copy}}); }} placeholder="Mode Description" />
                  </div>
                ))}
                {/* Removed Add Mode button as requested */}
              </div>
            </div>

            {/* Charities Section (moved under Overview) */}
            <div className="pt-2 border-t">
              <h3 className="text-lg font-semibold mb-2">Partnering with Charities, Trusts, and Foundations</h3>
              <Input value={data.partneringWithCharitiesSection.title} onChange={(e)=>setData({...data, partneringWithCharitiesSection:{...data.partneringWithCharitiesSection, title:e.target.value}})} placeholder="Section Title" />
              <div className="mt-3 space-y-3">
                {data.partneringWithCharitiesSection.paragraphs.map((p, i)=> (
                  <Textarea key={i} value={p} onChange={(e)=>{ const copy=[...data.partneringWithCharitiesSection.paragraphs]; copy[i]=e.target.value; setData({...data, partneringWithCharitiesSection:{...data.partneringWithCharitiesSection, paragraphs:copy}}); }} placeholder={`Paragraph ${i+1}`} />
                ))}
                {/* Removed Add Paragraph button as requested */}
              </div>
              <div className="mt-3">
                {data.partneringWithCharitiesSection.imageUrl && (
                  <img src={data.partneringWithCharitiesSection.imageUrl} alt="symbolic" className="w-full h-64 object-contain rounded-lg border-2 border-gray-300 bg-gray-50 mb-3" />
                )}
                <input ref={symbolicInputRef} onChange={onSymbolicFile} type="file" accept="image/*" className="hidden" />
                {/* Removed Upload Image button as requested */}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      

      {/* CTA */}
      {activeSection === 'cta' && (
        <Card>
          <CardHeader><CardTitle>Call To Action Section</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Input value={data.callToActionSection.title} onChange={(e)=>setData({...data, callToActionSection:{...data.callToActionSection, title:e.target.value}})} placeholder="Title" />
            <Input value={data.callToActionSection.subtitle} onChange={(e)=>setData({...data, callToActionSection:{...data.callToActionSection, subtitle:e.target.value}})} placeholder="Subtitle" />
            <Input value={data.callToActionSection.buttonText} onChange={(e)=>setData({...data, callToActionSection:{...data.callToActionSection, buttonText:e.target.value}})} placeholder="Button Text" />
            <Input value={data.callToActionSection.buttonLink} onChange={(e)=>setData({...data, callToActionSection:{...data.callToActionSection, buttonLink:e.target.value}})} placeholder="Button Link" />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PartnersJoin;


