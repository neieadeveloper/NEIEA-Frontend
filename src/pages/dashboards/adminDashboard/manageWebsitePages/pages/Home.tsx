import { useState, useEffect, ChangeEvent } from 'react';
import { Plus, Trash2, Save, Home as HomeIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';
import ImageUpload from '@/components/ui/image-upload';
import MultipleImageUpload from '@/components/ui/multiple-image-upload';
import { CharacterCounter } from '@/components/ui/character-counter';

const DEFAULT_QUOTE_ICON = '/assets/images/Quotes4.png';

// Helper function to validate URLs and relative paths
const validateUrlOrPath = (val: string) => {
  // Accept both relative paths and full URLs
  if (val.startsWith('/') || val.startsWith('./') || val.startsWith('../')) {
    return true; // Relative path
  }
  try {
    new URL(val);
    return true; // Valid URL
  } catch {
    return false; // Invalid URL
  }
};

const isAllowedEmbedUrl = (val: string) => {
  try {
    const parsed = new URL(val);
    return [
      'youtube.com',
      'youtu.be',
      'facebook.com',
      'fb.com',
      'instagram.com',
      'instagr.am',
    ].some((domain) => parsed.hostname.includes(domain));
  } catch (err) {
    return false;
  }
};

const getEmbedUrlHelp = (type: string) => {
  switch (type) {
    case 'youtube':
      return 'YouTube: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID or https://www.youtube.com/embed/VIDEO_ID';
    case 'facebook':
      return 'Facebook: https://www.facebook.com/PROFILE/posts/POST_ID or any Facebook post URL';
    case 'instagram':
      return 'Instagram: https://www.instagram.com/p/POST_ID or any Instagram post/reel URL';
    default:
      return '';
  }
};

// Zod Validation Schemas
const bannerSlideSchema = z.object({
  _id: z.string().optional(),
  image: z.string()
    .min(1, 'Image URL is required')
    .refine(validateUrlOrPath, 'Please enter a valid image URL or path'),
  alt: z.string()
    .min(3, 'Alt text must be at least 3 characters')
    .max(100, 'Alt text must be less than 100 characters'),
  headingText: z.string()
    .max(200, 'Heading text must be less than 200 characters')
    .optional(),
  subHeadingText: z.string()
    .max(500, 'Sub-heading text must be less than 500 characters')
    .optional(),
  textPosition: z.enum(['left', 'center', 'right']).optional(),
  textColor: z.string()
    .regex(/^#[0-9A-F]{6}$/i, 'Please enter a valid hex color')
    .optional(),
  backgroundOverlay: z.string().optional(),
  textOverlayActive: z.boolean().optional(),
  display_order: z.number().optional()
});

const statisticsItemSchema = z.object({
  _id: z.string().optional(),
  label: z.string()
    .min(3, 'Label must be at least 3 characters')
    .max(50, 'Label must be less than 50 characters'),
  value: z.number()
    .min(0, 'Value must be a positive number'),
  suffix: z.string().max(10, 'Suffix must be less than 10 characters').optional(),
  display_order: z.number().optional()
});

const testimonialItemSchema = z.object({
  _id: z.string().optional(),
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  location: z.string()
    .max(100, 'Location must be less than 100 characters')
    .optional(),
  testimonial: z.string()
    .min(20, 'Testimonial must be at least 20 characters')
    .max(1000, 'Testimonial must be less than 1000 characters'),
  image: z.string().optional(),
  quoteIcon: z.string().min(1, 'Quote icon is required').optional(),
  isVideo: z.boolean().optional(),
  videoUrl: z.string().optional().refine((val) => {
    if (!val || val.trim() === '') return true; // Optional field
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, 'Please enter a valid video URL'),
  display_order: z.number().optional()
}).refine((data) => {
  // If it's not a video, image is required
  if (!data.isVideo && (!data.image || data.image.trim() === '')) {
    return false;
  }
  // If it's a video, videoUrl is required
  if (data.isVideo && (!data.videoUrl || data.videoUrl.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: "For image testimonials, image URL is required. For video testimonials, video URL is required.",
  path: ["image"]
});

const homePageSchema = z.object({
  banner: z.object({
    slides: z.array(bannerSlideSchema)
      .min(1, 'At least one banner slide is required')
      .max(10, 'Maximum 10 slides allowed')
  }),
  ourMission: z.object({
    mission: z.object({
      heading: z.string()
        .min(5, 'Mission heading must be at least 5 characters')
        .max(200, 'Mission heading must be less than 200 characters'),
      description: z.string()
        .min(20, 'Mission description must be at least 20 characters')
        .max(1000, 'Mission description must be less than 1000 characters'),
      image: z.string()
        .min(1, 'Mission image URL is required')
        .refine(validateUrlOrPath, 'Please enter a valid image URL or path')
    }),
    vision: z.object({
      heading: z.string()
        .min(5, 'Vision heading must be at least 5 characters')
        .max(200, 'Vision heading must be less than 200 characters'),
      description: z.string()
        .min(20, 'Vision description must be at least 20 characters')
        .max(1000, 'Vision description must be less than 1000 characters')
    }),
    leadership: z.object({
      heading: z.string()
        .min(5, 'Leadership heading must be at least 5 characters')
        .max(200, 'Leadership heading must be less than 200 characters'),
      description: z.string()
        .min(20, 'Leadership description must be at least 20 characters')
        .max(1000, 'Leadership description must be less than 1000 characters'),
      image: z.string()
        .min(1, 'Leadership image URL is required')
        .refine(validateUrlOrPath, 'Please enter a valid image URL or path'),
      leaderName: z.string()
        .min(3, 'Leader name must be at least 3 characters')
        .max(100, 'Leader name must be less than 100 characters'),
      leaderTitle: z.string()
        .min(3, 'Leader title must be at least 3 characters')
        .max(100, 'Leader title must be less than 100 characters')
    })
  }),
  innovationSection: z.object({
    title: z.string()
      .min(5, 'Innovation section title must be at least 5 characters')
      .max(200, 'Innovation section title must be less than 200 characters'),
    description: z.string()
      .min(20, 'Innovation section description must be at least 20 characters')
      .max(2000, 'Innovation section description must be less than 2000 characters'),
    image: z.string()
      .min(1, 'Innovation image URL is required')
      .refine(validateUrlOrPath, 'Please enter a valid image URL or path'),
    buttonText: z.string()
      .min(3, 'Button text must be at least 3 characters')
      .max(50, 'Button text must be less than 50 characters'),
    buttonLink: z.string()
      .min(1, 'Button link is required')
      .url('Please enter a valid link URL')
  }),
  globalPrograms: z.object({
    title1: z.string()
      .min(5, 'Global programs title 1 must be at least 5 characters')
      .max(200, 'Global programs title 1 must be less than 200 characters'),
    description1: z.string()
      .min(20, 'Global programs description 1 must be at least 20 characters')
      .max(2000, 'Global programs description 1 must be less than 2000 characters'),
    title2: z.string()
      .min(5, 'Global programs title 2 must be at least 5 characters')
      .max(200, 'Global programs title 2 must be less than 200 characters'),
    description2: z.string()
      .min(20, 'Global programs description 2 must be at least 20 characters')
      .max(2000, 'Global programs description 2 must be less than 2000 characters'),
    image: z.string()
      .min(1, 'Global programs image URL is required')
      .refine(validateUrlOrPath, 'Please enter a valid image URL or path'),
    buttonText: z.string()
      .min(3, 'Button text must be at least 3 characters')
      .max(50, 'Button text must be less than 50 characters'),
    buttonLink: z.string()
      .min(1, 'Button link is required')
      .url('Please enter a valid link URL')
  }),
  statistics: z.object({
    heading: z.string()
      .min(5, 'Statistics heading must be at least 5 characters')
      .max(200, 'Statistics heading must be less than 200 characters'),
    backgroundImage: z.string().trim().optional(),
    statistics: z.array(statisticsItemSchema)
      .min(1, 'At least one statistic is required')
      .max(10, 'Maximum 10 statistics allowed')
  }),
  testimonials: z.object({
    heading: z.string()
      .min(3, 'Testimonials heading must be at least 3 characters')
      .max(200, 'Testimonials heading must be less than 200 characters'),
    testimonials: z.array(testimonialItemSchema)
      .min(1, 'At least one testimonial is required')
      .max(20, 'Maximum 20 testimonials allowed')
  })
});

// Homepage Data Interface
interface BannerSlide {
  _id?: string;
  image: string;
  alt: string;
  headingText?: string;
  subHeadingText?: string;
  textPosition?: 'left' | 'center' | 'right';
  textColor?: string;
  backgroundOverlay?: string;
  textOverlayActive?: boolean;
  display_order?: number;
}

interface StatisticsItem {
  _id?: string;
  label: string;
  value: number;
  suffix?: string;
  display_order?: number;
}

interface TestimonialItem {
  _id?: string;
  name: string;
  location?: string;
  testimonial: string;
  image: string;
  quoteIcon?: string;
  isVideo?: boolean;
  videoUrl?: string;
  display_order?: number;
}

interface HomePageData {
  banner: {
    slides: BannerSlide[];
  };
  ourMission: {
    mission: {
      heading: string;
      description: string;
      image: string;
    };
    vision: {
      heading: string;
      description: string;
    };
    leadership: {
      heading: string;
      description: string;
      image: string;
      leaderName: string;
      leaderTitle: string;
    };
  };
  innovationSection: {
    title: string;
    description: string;
    image: string;
    buttonText: string;
    buttonLink: string;
  };
  globalPrograms: {
    title1: string;
    description1: string;
    title2: string;
    description2: string;
    image: string;
    buttonText: string;
    buttonLink: string;
  };
  statistics: {
    heading: string;
    backgroundImage?: string;
    statistics: StatisticsItem[];
  };
  testimonials: {
    heading: string;
    testimonials: TestimonialItem[];
  };
}

type SocialEmbedType = 'youtube' | 'facebook' | 'instagram';

interface SocialEmbedItem {
  _id?: string;
  type: SocialEmbedType;
  url: string;
  position?: number;
  isActive: boolean;
  createdAt?: string;
}

const Home = () => {
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('banner');
  const [isUploadingStatisticsBackground, setIsUploadingStatisticsBackground] = useState(false);
  
  // Image upload states
  const [bannerImageFiles, setBannerImageFiles] = useState<File[]>([]);
  const [isUploadingBannerSlides, setIsUploadingBannerSlides] = useState(false);
  const [missionImageFile, setMissionImageFile] = useState<File | null>(null);
  const [missionImagePreview, setMissionImagePreview] = useState<string>('');
  const [isUploadingMissionImage, setIsUploadingMissionImage] = useState(false);
  const [leadershipImageFile, setLeadershipImageFile] = useState<File | null>(null);
  const [leadershipImagePreview, setLeadershipImagePreview] = useState<string>('');
  const [isUploadingLeadershipImage, setIsUploadingLeadershipImage] = useState(false);
  const [innovationImageFile, setInnovationImageFile] = useState<File | null>(null);
  const [innovationImagePreview, setInnovationImagePreview] = useState<string>('');
  const [isUploadingInnovationImage, setIsUploadingInnovationImage] = useState(false);
  const [globalProgramsImageFile, setGlobalProgramsImageFile] = useState<File | null>(null);
  const [globalProgramsImagePreview, setGlobalProgramsImagePreview] = useState<string>('');
  const [isUploadingGlobalProgramsImage, setIsUploadingGlobalProgramsImage] = useState(false);
  const [testimonialImageFiles, setTestimonialImageFiles] = useState<{ [key: number]: File }>({});
  const [testimonialImagePreviews, setTestimonialImagePreviews] = useState<{ [key: number]: string }>({});
  const [isUploadingTestimonialImages, setIsUploadingTestimonialImages] = useState<{ [key: number]: boolean }>({});
  const [socialEmbeds, setSocialEmbeds] = useState<SocialEmbedItem[]>([]);
  const [isLoadingSocialEmbeds, setIsLoadingSocialEmbeds] = useState(false);
  const [isSavingSocialEmbed, setIsSavingSocialEmbed] = useState(false);
  const [editingSocialEmbedId, setEditingSocialEmbedId] = useState<string | null>(null);
  const [socialEmbedForm, setSocialEmbedForm] = useState<Omit<SocialEmbedItem, '_id' | 'createdAt'>>({
    type: 'youtube',
    url: '',
    position: 0,
    isActive: true,
  });

  // Helpers for overlay parsing/building
  const getOverlayParts = (overlay?: string) => {
    const match = overlay?.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9]*\.?[0-9]+)\s*\)/i);
    const r = match ? Number(match[1]) : 0;
    const g = match ? Number(match[2]) : 0;
    const b = match ? Number(match[3]) : 0;
    const aRaw = match ? Number(match[4]) : 0.45;
    const a = Number.isFinite(aRaw) ? Math.min(Math.max(aRaw, 0), 1) : 0.45;
    return { r, g, b, opacity: a };
  };

  const buildOverlay = (overlay: string | undefined, opacity: number) => {
    const { r, g, b } = getOverlayParts(overlay);
    const safeOpacity = Number.isFinite(opacity) ? Math.min(Math.max(opacity, 0), 1) : 0.45;
    return `rgba(${r}, ${g}, ${b}, ${safeOpacity.toFixed(2)})`;
  };

  // Initialize default data structure
  const defaultHomePageData: HomePageData = {
    banner: {
      slides: [
        {
          image: '/assets/images/newSliderImage.png',
          alt: 'Philanthropy Summit',
          display_order: 0
        }
      ]
    },
    ourMission: {
      mission: {
        heading: 'Our Mission',
        description: 'We are dedicated to ensuring that there is no loss of potential and wastage of a child\'s life, due to inequities in education.',
        image: '/assets/images/homegroup.png'
      },
      vision: {
        heading: 'Our Vision',
        description: 'To create a society that upholds the sanctity of every human life, rejects all forms of discrimination, and aspires to build a peaceful, compassionate, and sustainable world.'
      },
      leadership: {
        heading: 'Meet Our Leadership',
        description: 'Visionary leaders dedicated to transforming education and empowering communities',
        image: '/assets/images/leader4.png',
        leaderName: 'Javeed Mirza',
        leaderTitle: 'Founder & President'
      }
    },
    innovationSection: {
      title: 'Innovation',
      description: 'NEIEA has developed innovative approaches to advance its Vision and Mission. These include: a Blended Learning Model that integrates online teaching with onsite learning through advanced technology and pedagogy; a Partnering Model that fosters collective growth; a Flexible Learning System offering live sessions 16 hours a day, 7 days a week; and a Low-Cost and Free Education Model that makes quality education accessible and affordable for all.',
      image: '/assets/images/innovation__1_-removebg-preview.png',
      buttonText: 'Learn more',
      buttonLink: '/about-us/working-model/blended-learning/application-of-technology'
    },
    globalPrograms: {
      title1: 'Collective Working Through Partnerships',
      description1: 'NEIEA\'s partnership model is rooted in collective effort. Partner institutions provide infrastructure, student safety, and classroom coordination, while NEIEA delivers high-quality content, innovative pedagogy, and live teaching. Together, they actively involve parents in the learning process, ensuring stronger student outcomes. NEIEA also enhances the capacity of partner institutions by training their teachers in pedagogy, technology, classroom management, and English proficiency.',
      title2: 'Open-Source Approach:',
      description2: 'NEIEA makes its content materials freely available to all institutions that wish to adopt and benefit from its model, reinforcing its commitment to equitable and collaborative education.',
      image: '/assets/images/HomImages/HomePartnership.png',
      buttonText: 'Learn more',
      buttonLink: '/partners/institutions'
    },
    statistics: {
      heading: 'IMPACT & ACHIEVEMENTS',
      backgroundImage: '/assets/images/Stats_Background.jpg',
      statistics: [
        {
          label: 'Online Courses',
          value: 16,
          suffix: '+',
          display_order: 0
        },
        {
          label: 'Live Online Classes',
          value: 68,
          suffix: '+',
          display_order: 1
        },
        {
          label: 'Partnerships',
          value: 87,
          suffix: '+',
          display_order: 2
        },
        {
          label: 'Teachers Trained',
          value: 2197,
          suffix: '+',
          display_order: 3
        },
        {
          label: 'Learner Empowered',
          value: 18942,
          suffix: '+',
          display_order: 4
        },
        {
          label: 'Indirectly Empowered',
          value: 500000,
          suffix: '+',
          display_order: 5
        }
      ]
    },
    testimonials: {
      heading: 'Testimonials',
      testimonials: [
        {
          name: 'Jaswinder Kaur',
          location: '',
          testimonial: 'As a 59-year-old from Nagpur, I\'m thrilled to have discovered NEIEA. Thanks to Niloufer Ma\'am\'s excellent teaching and patience, I\'ve been able to overcome my doubts and learn effectively. Online classes have made it easy for me to pursue my education, and I\'m so grateful for this opportunity. NEIEA has shown me that age is no barrier to learning, and I can\'t wait to continue my studies. Thank you, NEIEA!',
          image: '/assets/images/kaur1.jpeg',
          quoteIcon: DEFAULT_QUOTE_ICON,
          isVideo: false,
          display_order: 0
        },
        {
          name: 'Mohan',
          location: 'Hyderabad, Telangana',
          testimonial: 'I had to leave my education earlier due to personal reasons, but thanks to NEIEA\'s free online classes, I\'ve been able to continue learning in new ways. The Microsoft Office course for beginners has been a huge help, especially for my business. I can now create advertisements, keep records, and manage my tasks much more efficiently. I\'m really impressed with the quality of the classes, and I\'m grateful for the opportunity to learn and grow again. NEIEA\'s support has truly made a difference in my life.',
          image: '/assets/images/HomImages/MohanImageHome.png',
          quoteIcon: DEFAULT_QUOTE_ICON,
          isVideo: false,
          display_order: 1
        },
        {
          name: 'Md Wais Raza',
          location: 'Bihar, India',
          testimonial: 'I am thrilled to share my experience with the NEIEA English proficiency course that is completely free of cost! Actually, I have completed my matriculation from English medium school but even then I used to hesitate before speaking English with others I wanted to speak fluent and flawless English....',
          image: '/assets/images/waise12.png',
          quoteIcon: DEFAULT_QUOTE_ICON,
          isVideo: false,
          display_order: 2
        },
        {
          name: 'Malik Khan',
          location: 'Karnataka India',
          testimonial: 'I took an online course in NEIEA which is regarding spoken English and I was blown away by how much I learned. The instructor was engaging and knowledgeable, and the course material was presented in a clear and concise way ....',
          image: '/assets/images/malik khan .png',
          quoteIcon: DEFAULT_QUOTE_ICON,
          isVideo: false,
          display_order: 3
        },
        {
          name: 'Mr. Kodandram Reddy',
          location: 'MLC, Telangana',
          testimonial: 'A sincere message of gratitude and appreciation from our community members, acknowledging NEIEA\'s dedication to providing quality education and making a positive impact in people\'s lives.',
          image: '',
          quoteIcon: DEFAULT_QUOTE_ICON,
          isVideo: true,
          videoUrl: 'https://www.youtube.com/embed/bqnhdq5MqkA',
          display_order: 4
        }
      ]
    }
  };

  useEffect(() => {
    fetchHomePageData();
    fetchSocialEmbeds();
  }, []);

  const fetchHomePageData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/admin/homepage');
      
      if (response.data.success) {
        const data = response.data.data as Partial<HomePageData>;
        const serverStatistics = data.statistics?.statistics;
        const serverBackground = data.statistics?.backgroundImage;
        const serverTestimonials = data.testimonials?.testimonials;

        const normalizedData: HomePageData = {
          ...defaultHomePageData,
          ...data,
          statistics: {
            ...defaultHomePageData.statistics,
            ...(data.statistics || {}),
            heading: data.statistics?.heading || defaultHomePageData.statistics.heading,
            statistics: Array.isArray(serverStatistics)
              ? serverStatistics
              : defaultHomePageData.statistics.statistics,
            backgroundImage:
              serverBackground && serverBackground.trim() !== ''
                ? serverBackground
                : defaultHomePageData.statistics.backgroundImage,
          },
          testimonials: {
            ...defaultHomePageData.testimonials,
            ...(data.testimonials || {}),
            heading: data.testimonials?.heading || defaultHomePageData.testimonials.heading,
            testimonials: Array.isArray(serverTestimonials) && serverTestimonials.length > 0
              ? serverTestimonials.map((item, index) => ({
                  ...item,
                  display_order: typeof item.display_order === 'number' ? item.display_order : index,
                  quoteIcon: item.quoteIcon && item.quoteIcon.trim() !== ''
                    ? item.quoteIcon
                    : DEFAULT_QUOTE_ICON
                }))
              : defaultHomePageData.testimonials.testimonials,
          }
        };

        setHomePageData(normalizedData);
      } else {
        // If no data exists, use default data
        setHomePageData(defaultHomePageData);
      }
    } catch (error: any) {
      console.error('Error fetching homepage data:', error);
      if (error.response?.status === 404) {
        // No homepage data exists yet, use default
        setHomePageData(defaultHomePageData);
      } else {
        toast.error('Failed to fetch homepage data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSocialEmbeds = async () => {
    try {
      setIsLoadingSocialEmbeds(true);
      const response = await axiosInstance.get('/admin/social-embeds', {
        params: { page: 'home', isActive: 'all' },
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        const sorted = [...response.data.data].sort((a: SocialEmbedItem, b: SocialEmbedItem) => {
          const posA = typeof a.position === 'number' ? a.position : 0;
          const posB = typeof b.position === 'number' ? b.position : 0;
          return posA - posB;
        });
        setSocialEmbeds(sorted);
        if (!editingSocialEmbedId) {
          setSocialEmbedForm((prev) => ({ ...prev, position: sorted.length }));
        }
      }
    } catch (error) {
      console.error('Error fetching social embeds:', error);
      toast.error('Failed to load social embeds');
    } finally {
      setIsLoadingSocialEmbeds(false);
    }
  };

  const resetSocialEmbedForm = () => {
    setEditingSocialEmbedId(null);
    setSocialEmbedForm({
      type: 'youtube',
      url: '',
      position: socialEmbeds.length,
      isActive: true,
    });
  };

  const handleSaveSocialEmbed = async () => {
    if (!socialEmbedForm.url.trim()) {
      toast.error('Embed URL is required');
      return;
    }

    if (!isAllowedEmbedUrl(socialEmbedForm.url.trim())) {
      toast.error('Only YouTube, Facebook, or Instagram URLs are allowed');
      return;
    }

    try {
      setIsSavingSocialEmbed(true);
      const payload = {
        ...socialEmbedForm,
        position: Number.isFinite(Number(socialEmbedForm.position))
          ? Number(socialEmbedForm.position)
          : 0,
      };

      if (editingSocialEmbedId) {
        await axiosInstance.put(`/admin/social-embeds/${editingSocialEmbedId}`,
          payload);
        toast.success('Social embed updated');
      } else {
        await axiosInstance.post('/admin/social-embeds', payload);
        toast.success('Social embed added');
      }

      await fetchSocialEmbeds();
      resetSocialEmbedForm();
    } catch (error: any) {
      console.error('Error saving social embed:', error);
      toast.error(error.response?.data?.message || 'Failed to save social embed');
    } finally {
      setIsSavingSocialEmbed(false);
    }
  };

  const handleEditSocialEmbed = (embed: SocialEmbedItem) => {
    setEditingSocialEmbedId(embed._id || null);
    setSocialEmbedForm({
      type: embed.type,
      url: embed.url,
      position: typeof embed.position === 'number' ? embed.position : 0,
      isActive: embed.isActive,
    });
  };

  const handleToggleSocialEmbed = async (embed: SocialEmbedItem) => {
    if (!embed._id) return;
    try {
      await axiosInstance.patch(`/admin/social-embeds/${embed._id}/status`, {
        isActive: !embed.isActive,
      });
      await fetchSocialEmbeds();
    } catch (error) {
      console.error('Error toggling social embed status:', error);
      toast.error('Failed to update embed status');
    }
  };

  const handleDeleteSocialEmbed = async (embed: SocialEmbedItem) => {
    if (!embed._id) return;
    try {
      await axiosInstance.delete(`/admin/social-embeds/${embed._id}`);
      toast.success('Embed deleted');
      if (editingSocialEmbedId === embed._id) {
        resetSocialEmbedForm();
      }
      await fetchSocialEmbeds();
    } catch (error) {
      console.error('Error deleting social embed:', error);
      toast.error('Failed to delete embed');
    }
  };

  const saveHomePageData = async () => {
    if (!homePageData) return;

    try {
      setIsSaving(true);
      
      // Validate data
      const validatedData = homePageSchema.parse(homePageData);

      const normalizedTestimonials = validatedData.testimonials.testimonials.map((item, index) => ({
        ...item,
        display_order: typeof item.display_order === 'number' ? item.display_order : index,
        quoteIcon: item.quoteIcon && item.quoteIcon.trim() !== ''
          ? item.quoteIcon
          : DEFAULT_QUOTE_ICON
      }));

      const payload = {
        ...validatedData,
        testimonials: {
          ...validatedData.testimonials,
          testimonials: normalizedTestimonials
        }
      };
      
      // Send each section individually
      const sectionPromises = [
        // Update banner
        axiosInstance.put('/admin/homepage/banner', validatedData.banner),
        
        // Update our mission
        axiosInstance.put('/admin/homepage/our-mission', validatedData.ourMission),
        
        // Update innovation section
        axiosInstance.put('/admin/homepage/innovation-section', validatedData.innovationSection),
        
        // Update global programs
        axiosInstance.put('/admin/homepage/global-programs', validatedData.globalPrograms),
        
        // Update statistics
        axiosInstance.put('/admin/homepage/statistics', validatedData.statistics),
        
        // Update testimonials
        axiosInstance.put('/admin/homepage/testimonials', payload.testimonials)
      ];
      
      // Wait for all section updates to complete
      await Promise.all(sectionPromises);
      
      toast.success('Homepage updated successfully!');
    } catch (error: any) {
      console.error('Error saving homepage data:', error);
      if (error.name === 'ZodError') {
        // toast.error('Please fix validation errors before saving');
        error.errors.forEach((err: any) => {
            
          toast.error(`${err.path.join(' ')} is ${err.message}`);
        });
      } else {
        toast.error(`Failed to save homepage data: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatisticsBackgroundUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploadingStatisticsBackground(true);

      const response = await axiosInstance.post(
        '/admin/homepage/statistics/background-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const imageUrl = response.data?.data?.imageUrl;

      if (imageUrl) {
        setHomePageData(prev => prev ? {
          ...prev,
          statistics: {
            ...prev.statistics,
            backgroundImage: imageUrl
          }
        } : prev);

        toast.success('Statistics background image uploaded successfully');
      } else {
        toast.error('Failed to upload statistics background image');
      }
    } catch (error: any) {
      console.error('Error uploading statistics background image:', error);
      toast.error(error.response?.data?.message || 'Failed to upload statistics background image');
    } finally {
      setIsUploadingStatisticsBackground(false);
      event.target.value = '';
    }
  };

  // Banner Slides Upload Handler
  const handleBannerSlidesUpload = async (files: File[]) => {
    if (files.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setIsUploadingBannerSlides(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      const response = await axiosInstance.post(
        '/admin/homepage/banner/upload',
        formData,
        {
          headers: { 
            'Content-Type': 'multipart/form-data' 
          },
        }
      );

      if (response.data.success) {
        toast.success('Banner slides uploaded successfully!');
        setBannerImageFiles([]);
        await fetchHomePageData(); // Reload data
      }
    } catch (error: any) {
      console.error('Error uploading banner slides:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        url: error?.config?.url
      });
      
      if (error?.response?.status === 404) {
        toast.error('Route not found. Please ensure the backend server is running and the route is registered.');
      } else {
        toast.error(error?.response?.data?.message || 'Failed to upload banner slides');
      }
    } finally {
      setIsUploadingBannerSlides(false);
    }
  };

  // Our Mission Image Upload Handler
  const handleMissionImageUpload = async () => {
    if (!missionImageFile) {
      toast.error('Please select an image');
      return;
    }

    setIsUploadingMissionImage(true);
    try {
      const formData = new FormData();
      formData.append('image', missionImageFile);

      const response = await axiosInstance.post(
        '/admin/homepage/our-mission/upload-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        const imageUrl = response.data.data.imageUrl;
        updateNestedSectionData('ourMission', 'mission', 'image', imageUrl);
        setMissionImagePreview(imageUrl);
        toast.success('Mission image uploaded successfully!');
        setMissionImageFile(null);
      }
    } catch (error: any) {
      console.error('Error uploading mission image:', error);
      toast.error(error?.response?.data?.message || 'Failed to upload mission image');
    } finally {
      setIsUploadingMissionImage(false);
    }
  };

  // Leadership Image Upload Handler
  const handleLeadershipImageUpload = async () => {
    if (!leadershipImageFile) {
      toast.error('Please select an image');
      return;
    }

    setIsUploadingLeadershipImage(true);
    try {
      const formData = new FormData();
      formData.append('image', leadershipImageFile);

      const response = await axiosInstance.post(
        '/admin/homepage/our-mission/leadership/upload-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        const imageUrl = response.data.data.imageUrl;
        updateNestedSectionData('ourMission', 'leadership', 'image', imageUrl);
        setLeadershipImagePreview(imageUrl);
        toast.success('Leadership image uploaded successfully!');
        setLeadershipImageFile(null);
      }
    } catch (error: any) {
      console.error('Error uploading leadership image:', error);
      toast.error(error?.response?.data?.message || 'Failed to upload leadership image');
    } finally {
      setIsUploadingLeadershipImage(false);
    }
  };

  // Innovation Image Upload Handler
  const handleInnovationImageUpload = async () => {
    if (!innovationImageFile) {
      toast.error('Please select an image');
      return;
    }

    setIsUploadingInnovationImage(true);
    try {
      const formData = new FormData();
      formData.append('image', innovationImageFile);

      const response = await axiosInstance.post(
        '/admin/homepage/innovation-section/upload-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        const imageUrl = response.data.data.imageUrl;
        updateSectionData('innovationSection', 'image', imageUrl);
        setInnovationImagePreview(imageUrl);
        toast.success('Innovation image uploaded successfully!');
        setInnovationImageFile(null);
      }
    } catch (error: any) {
      console.error('Error uploading innovation image:', error);
      toast.error(error?.response?.data?.message || 'Failed to upload innovation image');
    } finally {
      setIsUploadingInnovationImage(false);
    }
  };

  // Global Programs Image Upload Handler
  const handleGlobalProgramsImageUpload = async () => {
    if (!globalProgramsImageFile) {
      toast.error('Please select an image');
      return;
    }

    setIsUploadingGlobalProgramsImage(true);
    try {
      const formData = new FormData();
      formData.append('image', globalProgramsImageFile);

      const response = await axiosInstance.post(
        '/admin/homepage/global-programs/upload-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        const imageUrl = response.data.data.imageUrl;
        updateSectionData('globalPrograms', 'image', imageUrl);
        setGlobalProgramsImagePreview(imageUrl);
        toast.success('Global Programs image uploaded successfully!');
        setGlobalProgramsImageFile(null);
      }
    } catch (error: any) {
      console.error('Error uploading global programs image:', error);
      toast.error(error?.response?.data?.message || 'Failed to upload global programs image');
    } finally {
      setIsUploadingGlobalProgramsImage(false);
    }
  };

  // Testimonial Image Upload Handler
  const handleTestimonialImageUpload = async (index: number) => {
    const file = testimonialImageFiles[index];
    if (!file) {
      toast.error('Please select an image');
      return;
    }

    setIsUploadingTestimonialImages(prev => ({ ...prev, [index]: true }));
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axiosInstance.post(
        '/admin/homepage/testimonials/upload-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        const imageUrl = response.data.data.imageUrl;
        updateTestimonial(index, 'image', imageUrl);
        setTestimonialImagePreviews(prev => ({ ...prev, [index]: imageUrl }));
        setTestimonialImageFiles(prev => {
          const newFiles: { [key: number]: File } = { ...prev };
          delete newFiles[index];
          return newFiles;
        });
        toast.success('Testimonial image uploaded successfully!');
      }
    } catch (error: any) {
      console.error('Error uploading testimonial image:', error);
      toast.error(error?.response?.data?.message || 'Failed to upload testimonial image');
    } finally {
      setIsUploadingTestimonialImages(prev => ({ ...prev, [index]: false }));
    }
  };

  const addBannerSlide = () => {
    if (!homePageData) return;
    
    const newSlide: BannerSlide = {
      image: '',
      alt: '',
      headingText: '',
      subHeadingText: '',
      textPosition: 'center',
      textColor: '#ffffff',
      backgroundOverlay: 'rgba(0, 0, 0, 0.4)',
      textOverlayActive: true,
      display_order: homePageData.banner.slides.length
    };
    
    setHomePageData({
      ...homePageData,
      banner: {
        ...homePageData.banner,
        slides: [...homePageData.banner.slides, newSlide]
      }
    });
  };

  const updateBannerSlide = (index: number, field: keyof BannerSlide, value: string | number | boolean | undefined) => {
    if (!homePageData) return;
    
    const updatedSlides = [...homePageData.banner.slides];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    
    setHomePageData({
      ...homePageData,
      banner: {
        ...homePageData.banner,
        slides: updatedSlides
      }
    });
  };

  const removeBannerSlide = (index: number) => {
    if (!homePageData) return;
    
    const updatedSlides = homePageData.banner.slides.filter((_, i) => i !== index);
    
    setHomePageData({
      ...homePageData,
      banner: {
        ...homePageData.banner,
        slides: updatedSlides
      }
    });
  };

  const updateSectionData = (section: string, field: string, value: string) => {
    if (!homePageData) return;
    
    setHomePageData({
      ...homePageData,
      [section]: {
        ...homePageData[section as keyof HomePageData],
        [field]: value
      }
    });
  };

  const updateNestedSectionData = (section: string, subsection: string, field: string, value: string) => {
    if (!homePageData) return;
    
    setHomePageData({
      ...homePageData,
      [section]: {
        ...homePageData[section as keyof HomePageData],
        [subsection]: {
          ...(homePageData[section as keyof HomePageData] as any)[subsection],
          [field]: value
        }
      }
    });
  };

  const addStatistic = () => {
    if (!homePageData) return;
    
    const newStatistic: StatisticsItem = {
      label: '',
      value: 0,
      suffix: '',
      display_order: homePageData.statistics.statistics.length
    };
    
    setHomePageData({
      ...homePageData,
      statistics: {
        ...homePageData.statistics,
        statistics: [...homePageData.statistics.statistics, newStatistic]
      }
    });
  };

  const updateStatistic = (index: number, field: keyof StatisticsItem, value: string | number) => {
    if (!homePageData) return;
    
    const updatedStatistics = [...homePageData.statistics.statistics];
    updatedStatistics[index] = { ...updatedStatistics[index], [field]: value };
    
    setHomePageData({
      ...homePageData,
      statistics: {
        ...homePageData.statistics,
        statistics: updatedStatistics
      }
    });
  };

  const removeStatistic = (index: number) => {
    if (!homePageData) return;
    
    const updatedStatistics = homePageData.statistics.statistics.filter((_, i) => i !== index);
    
    setHomePageData({
      ...homePageData,
      statistics: {
        ...homePageData.statistics,
        statistics: updatedStatistics
      }
    });
  };

  const updateTestimonialsHeading = (value: string) => {
    if (!homePageData) return;

    setHomePageData({
      ...homePageData,
      testimonials: {
        ...homePageData.testimonials,
        heading: value,
      },
    });
  };

  const addTestimonial = () => {
    if (!homePageData) return;
    
    const newTestimonial: TestimonialItem = {
      name: '',
      location: '',
      testimonial: '',
      image: '',
      quoteIcon: DEFAULT_QUOTE_ICON,
      isVideo: false,
      display_order: homePageData.testimonials.testimonials.length
    };
    
    setHomePageData({
      ...homePageData,
      testimonials: {
        ...homePageData.testimonials,
        testimonials: [...homePageData.testimonials.testimonials, newTestimonial]
      }
    });
  };

  const updateTestimonial = (index: number, field: keyof TestimonialItem, value: string | boolean | number) => {
    if (!homePageData) return;
    
    const updatedTestimonials = [...homePageData.testimonials.testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    
    setHomePageData({
      ...homePageData,
      testimonials: {
        ...homePageData.testimonials,
        testimonials: updatedTestimonials
      }
    });
  };

  const removeTestimonial = (index: number) => {
    if (!homePageData) return;
    
    const updatedTestimonials = homePageData.testimonials.testimonials.filter((_, i) => i !== index);
    
    setHomePageData({
      ...homePageData,
      testimonials: {
        ...homePageData.testimonials,
        testimonials: updatedTestimonials
      }
    });
  };

  const sections = [
    { id: 'banner', name: 'Banner' },
    { id: 'ourMission', name: 'Our Mission' },
    { id: 'socialEmbeds', name: 'Social Media Embeds' },
    { id: 'innovationSection', name: 'Innovation' },
    { id: 'globalPrograms', name: 'Global Programs' },
    { id: 'statistics', name: 'Statistics' },
    { id: 'testimonials', name: 'Testimonials' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!homePageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Homepage Data Found</h2>
          <p className="text-gray-600 mb-4">Click the button below to initialize with default data.</p>
          <Button onClick={() => setHomePageData(defaultHomePageData)}>
            Initialize Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <HomeIcon className="w-8 h-8" />
            Manage Homepage
          </h1>
          <p className="text-gray-600">Update all content for the homepage sections</p>
        </div>
        <Button onClick={saveHomePageData} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Banner Section */}
        {activeSection === 'banner' && (
          <Card>
            <CardHeader>
              <CardTitle>Banner Section</CardTitle>
            </CardHeader>
                <CardContent className="space-y-6">
                  {/* Instruction Guide */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-blue-900 mb-2">📋 Instructions for Uploading Banner Slides:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                      <li>You can upload up to <strong>6 images</strong> for the banner carousel</li>
                      <li>Each image should be less than <strong>2MB</strong> in size</li>
                      <li>Supported formats: <strong>JPG, PNG, WebP, GIF</strong></li>
                      <li>Recommended image dimensions: <strong>1920x800px</strong> for best display quality</li>
                      <li>Images should be in landscape orientation for optimal viewing</li>
                      <li>Select multiple images at once using the upload component below</li>
                      <li>Review the preview before uploading to ensure correct images are selected</li>
                      <li>Uploading new images will <strong>replace all existing banner slides</strong></li>
                      <li>Use compressed images for better performance</li>
                    </ul>
                  </div>

                  {/* Upload Banner Slides */}
                  <div className="border-b pb-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Upload Banner Slide Images</h3>
                    <MultipleImageUpload
                      value={homePageData.banner.slides.map(slide => slide.image)}
                      onChange={(files) => {
                        setBannerImageFiles(files);
                      }}
                      maxImages={6}
                      placeholder="Upload banner slide images (up to 6)"
                    />
                    {bannerImageFiles.length > 0 && (
                      <Button
                        onClick={() => handleBannerSlidesUpload(bannerImageFiles)}
                        disabled={isUploadingBannerSlides}
                        className="mt-4 bg-blue-600 hover:bg-blue-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploadingBannerSlides ? 'Uploading...' : 'Upload Banner Slides'}
                      </Button>
                    )}
                  </div>

                  {/* Banner Text Overlays */}
                  <div className="border-b pb-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Hero Text Overlays</h3>
                    <p className="text-sm text-gray-600 mb-4">Manage heading and subheading text overlays for each carousel slide</p>
                    
                    {homePageData.banner.slides.length === 0 ? (
                      <p className="text-gray-500 italic">Upload banner slides first to manage text overlays</p>
                    ) : (
                      <div className="space-y-6">
                        {homePageData.banner.slides.map((slide, index) => (
                          <Card key={index} className="p-4 bg-gray-50">
                            <div className="mb-4 flex gap-4">
                              <div className="flex flex-col items-start">
                                <h4 className="font-semibold text-gray-900">Slide {index + 1}</h4>
                                {slide.image && (
                                  <img
                                    src={slide.image}
                                    alt={slide.alt || 'Banner preview'}
                                    className="w-36 h-24 object-cover rounded mt-2"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                )}
                                <div className="w-full mt-3">
                                  <label className="block text-sm font-medium mb-1 text-gray-700">Alt Text</label>
                                  <Input
                                    value={slide.alt || ''}
                                    onChange={(e) => updateBannerSlide(index, 'alt', e.target.value)}
                                    placeholder="Enter alt text"
                                  />
                                </div>
                              </div>

                              <div className="flex-1 space-y-4">
                                {/* Active Toggle */}
                                <div className="flex items-center justify-between bg-white p-3 rounded border">
                                  <label className="text-sm font-medium text-gray-700">Show text overlay on this slide</label>
                                  <input
                                    type="checkbox"
                                    checked={slide.textOverlayActive ?? true}
                                    onChange={(e) => updateBannerSlide(index, 'textOverlayActive', e.target.checked)}
                                    className="w-4 h-4 cursor-pointer"
                                  />
                                </div>

                                {/* Text Overlay Fields (Conditional) */}
                                {(slide.textOverlayActive ?? true) && (
                                  <>
                                    {/* Heading / Sub-heading */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Heading Text</label>
                                        <Input
                                          value={slide.headingText || ''}
                                          onChange={(e) => updateBannerSlide(index, 'headingText', e.target.value)}
                                          placeholder="Enter heading"
                                          maxLength={200}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Sub Heading Text</label>
                                        <Input
                                          value={slide.subHeadingText || ''}
                                          onChange={(e) => updateBannerSlide(index, 'subHeadingText', e.target.value)}
                                          placeholder="Enter sub heading"
                                          maxLength={500}
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                      {/* Text Alignment */}
                                      <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Text Alignment</label>
                                        <select
                                          value={slide.textPosition || 'center'}
                                          onChange={(e) => updateBannerSlide(index, 'textPosition', e.target.value as BannerSlide['textPosition'])}
                                          className="w-full border rounded px-3 py-2 text-sm"
                                        >
                                          <option value="left">Left</option>
                                          <option value="center">Center</option>
                                          <option value="right">Right</option>
                                        </select>
                                      </div>

                                      {/* Text Color */}
                                      <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Text Color</label>
                                        <div className="flex gap-2 items-center">
                                          <input
                                            type="color"
                                            value={slide.textColor || '#ffffff'}
                                            onChange={(e) => updateBannerSlide(index, 'textColor', e.target.value)}
                                            className="w-12 h-10 rounded cursor-pointer border"
                                          />
                                          <Input
                                            value={slide.textColor || '#ffffff'}
                                            onChange={(e) => updateBannerSlide(index, 'textColor', e.target.value)}
                                            placeholder="#FFFFFF"
                                            className="flex-1"
                                          />
                                        </div>
                                      </div>

                                      {/* Overlay Opacity Slider */}
                                      <div>
                                        {(() => {
                                          const { opacity } = getOverlayParts(slide.backgroundOverlay);
                                          const displayOpacity = opacity ?? 0.45;
                                          return (
                                            <div>
                                              <div className="flex items-center justify-between mb-1">
                                                <label className="text-sm font-medium text-gray-700">Overlay Opacity ({displayOpacity.toFixed(2)})</label>
                                              </div>
                                              <input
                                                type="range"
                                                min={0}
                                                max={1}
                                                step={0.01}
                                                value={displayOpacity}
                                                onChange={(e) => {
                                                  const newOpacity = Number(e.target.value);
                                                  const newOverlay = buildOverlay(slide.backgroundOverlay, newOpacity);
                                                  updateBannerSlide(index, 'backgroundOverlay', newOverlay);
                                                }}
                                                className="w-full"
                                              />
                                              <p className="text-xs text-gray-500 mt-1">Controls background overlay behind text for readability (image stays unchanged).</p>
                                            </div>
                                          );
                                        })()}
                                      </div>
                                    </div>

                                    {/* Preview */}
                                    {slide.image && (
                                      <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Live Preview</label>
                                        <div
                                          className="relative w-full h-48 rounded-lg overflow-hidden"
                                          style={{
                                            backgroundImage: `url(${slide.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                          }}
                                        >
                                          <div
                                            className="absolute inset-0 flex items-center"
                                            style={{
                                              textAlign: (slide.textPosition || 'center') as any,
                                              justifyContent:
                                                slide.textPosition === 'left'
                                                  ? 'flex-start'
                                                  : slide.textPosition === 'right'
                                                    ? 'flex-end'
                                                    : 'center',
                                              padding: '24px'
                                            }}
                                          >
                                            <div
                                              style={{
                                                color: slide.textColor || '#ffffff',
                                                textAlign: (slide.textPosition || 'center') as any,
                                                backgroundColor: slide.backgroundOverlay || 'rgba(0, 0, 0, 0.45)',
                                                padding: '14px 18px',
                                                borderRadius: '12px',
                                                boxShadow: '0 6px 18px rgba(0,0,0,0.25)'
                                              }}
                                            >
                                              {slide.headingText && (
                                                <h1 className="text-2xl font-bold mb-2">
                                                  {slide.headingText}
                                                </h1>
                                              )}
                                              {slide.subHeadingText && (
                                                <h2 className="text-lg">
                                                  {slide.subHeadingText}
                                                </h2>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Current Banner Slides</h3>
                    <Button onClick={addBannerSlide} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Slide
                    </Button>
                  </div> */}
                  
                  {/* {homePageData.banner.slides.map((slide, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Alt Text</label>
                          <Input
                            value={slide.alt}
                            onChange={(e) => updateBannerSlide(index, 'alt', e.target.value)}
                            placeholder="Enter alt text"
                          />
                        </div>
                        
                        Image Preview
                        {slide.image && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Image Preview</label>
                            <div className="border rounded-lg p-2 bg-gray-50">
                              <img
                                src={slide.image}
                                alt={slide.alt || 'Banner preview'}
                                className="w-full h-48 object-contain rounded"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (nextElement) {
                                    nextElement.style.display = 'block';
                                  }
                                }}
                              />
                              <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500" style={{ display: 'none' }}>
                                Failed to load image
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeBannerSlide(index)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))} */}
                </CardContent>
              </Card>
            )}

        {/* Our Mission Section */}
        {activeSection === 'ourMission' && (
          <Card>
            <CardHeader>
              <CardTitle>Our Mission Section</CardTitle>
            </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mission */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Mission</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Heading</label>
                        <Input
                          value={homePageData.ourMission.mission.heading}
                            onChange={(e) => updateNestedSectionData('ourMission', 'mission', 'heading', e.target.value)}
                          placeholder="Enter mission heading"
                        />
                        <CharacterCounter current={homePageData.ourMission.mission.heading.length} max={200} min={5} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea
                          value={homePageData.ourMission.mission.description}
                            onChange={(e) => updateNestedSectionData('ourMission', 'mission', 'description', e.target.value)}
                          placeholder="Enter mission description"
                          rows={4}
                        />
                        <CharacterCounter current={homePageData.ourMission.mission.description.length} max={1000} min={20} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Upload Mission Image</label>
                        <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                        <ImageUpload
                          value={missionImagePreview || homePageData.ourMission.mission.image}
                          onChange={(file, previewUrl) => {
                            setMissionImageFile(file);
                            setMissionImagePreview(previewUrl);
                          }}
                          placeholder="Upload mission section image"
                          previewSize="lg"
                          previewShape="rectangular"
                        />
                        {missionImageFile && (
                          <Button
                            onClick={handleMissionImageUpload}
                            disabled={isUploadingMissionImage}
                            className="mt-4 bg-green-600 hover:bg-green-700"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {isUploadingMissionImage ? 'Uploading...' : 'Upload Image'}
                          </Button>
                        )}
                        <p className="text-xs text-gray-500 mt-2">Recommended: 800x600px, Max 2MB, JPG/PNG/WebP/GIF</p>
                        {/* Image Preview */}
                        {/* {homePageData.ourMission.mission.image && !missionImageFile && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Current Image</label>
                            <div className="border rounded-lg p-2 bg-gray-50">
                              <img
                                src={homePageData.ourMission.mission.image}
                                alt="Mission preview"
                                className="w-full h-48 object-contain rounded"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (nextElement) {
                                    nextElement.style.display = 'block';
                                  }
                                }}
                              />
                              <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500" style={{ display: 'none' }}>
                                Failed to load image
                              </div>
                            </div>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>

                  {/* Vision */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Vision</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Heading</label>
                        <Input
                          value={homePageData.ourMission.vision.heading}
                            onChange={(e) => updateNestedSectionData('ourMission', 'vision', 'heading', e.target.value)}
                          placeholder="Enter vision heading"
                        />
                        <CharacterCounter current={homePageData.ourMission.vision.heading.length} max={200} min={5} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea
                          value={homePageData.ourMission.vision.description}
                            onChange={(e) => updateNestedSectionData('ourMission', 'vision', 'description', e.target.value)}
                          placeholder="Enter vision description"
                          rows={4}
                        />
                        <CharacterCounter current={homePageData.ourMission.vision.description.length} max={1000} min={20} />
                      </div>
                    </div>
                  </div>

                  {/* Leadership */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Leadership</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Heading</label>
                        <Input
                          value={homePageData.ourMission.leadership.heading}
                            onChange={(e) => updateNestedSectionData('ourMission', 'leadership', 'heading', e.target.value)}
                          placeholder="Enter leadership heading"
                        />
                        <CharacterCounter current={homePageData.ourMission.leadership.heading.length} max={200} min={5} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea
                          value={homePageData.ourMission.leadership.description}
                            onChange={(e) => updateNestedSectionData('ourMission', 'leadership', 'description', e.target.value)}
                          placeholder="Enter leadership description"
                          rows={3}
                        />
                        <CharacterCounter current={homePageData.ourMission.leadership.description.length} max={1000} min={20} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Leader Name</label>
                          <Input
                            value={homePageData.ourMission.leadership.leaderName}
                            onChange={(e) => updateNestedSectionData('ourMission', 'leadership', 'leaderName', e.target.value)}
                            placeholder="Enter leader name"
                          />
                          <CharacterCounter current={homePageData.ourMission.leadership.leaderName.length} max={100} min={3} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Leader Title</label>
                          <Input
                            value={homePageData.ourMission.leadership.leaderTitle}
                            onChange={(e) => updateNestedSectionData('ourMission', 'leadership', 'leaderTitle', e.target.value)}
                            placeholder="Enter leader title"
                          />
                          <CharacterCounter current={homePageData.ourMission.leadership.leaderTitle.length} max={100} min={3} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Upload Leadership Image</label>
                        <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                        <ImageUpload
                          value={leadershipImagePreview || homePageData.ourMission.leadership.image || ''}
                          onChange={(file, previewUrl) => {
                            setLeadershipImageFile(file);
                            setLeadershipImagePreview(previewUrl);
                          }}
                          placeholder="Upload leadership section image"
                          previewSize="lg"
                          previewShape="rectangular"
                        />
                        {leadershipImageFile && (
                          <Button
                            onClick={handleLeadershipImageUpload}
                            disabled={isUploadingLeadershipImage}
                            className="mt-4 bg-green-600 hover:bg-green-700"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {isUploadingLeadershipImage ? 'Uploading...' : 'Upload Image'}
                          </Button>
                        )}
                        <p className="text-xs text-gray-500 mt-2">Recommended: 800x600px, Max 2MB, JPG/PNG/WebP/GIF</p>
                        {/* Image Preview */}
                        {/* {homePageData.ourMission.leadership.image && !leadershipImageFile && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Current Image</label>
                            <div className="border rounded-lg p-2 bg-gray-50">
                              <img
                                src={homePageData.ourMission.leadership.image}
                                alt="Leadership preview"
                                className="w-full h-48 object-contain rounded"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (nextElement) {
                                    nextElement.style.display = 'block';
                                  }
                                }}
                              />
                              <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500" style={{ display: 'none' }}>
                                Failed to load image
                              </div>
                            </div>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

        {/* Social Media Embeds */}
        {activeSection === 'socialEmbeds' && (
          <Card>
            <CardHeader>
              <CardTitle>Social Media Embeds</CardTitle>
              <p className="text-sm text-gray-500">Supported platforms: YouTube, Facebook, Instagram. Provide direct post/video URLs.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Platform</label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        value={socialEmbedForm.type}
                        onChange={(e) => setSocialEmbedForm((prev) => ({ ...prev, type: e.target.value as SocialEmbedType }))}
                      >
                        <option value="youtube">YouTube</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Position (for ordering)</label>
                      <Input
                        type="number"
                        min={0}
                        value={socialEmbedForm.position ?? 0}
                        onChange={(e) => setSocialEmbedForm((prev) => ({ ...prev, position: Number(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Embed URL</label>
                    <Input
                      placeholder="https://www.youtube.com/embed/VIDEO_ID"
                      value={socialEmbedForm.url}
                      onChange={(e) => setSocialEmbedForm((prev) => ({ ...prev, url: e.target.value }))}
                    />
                    <p className="text-xs text-gray-500 mt-2">{getEmbedUrlHelp(socialEmbedForm.type)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      id="social-embed-active"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={socialEmbedForm.isActive}
                      onChange={(e) => setSocialEmbedForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                    />
                    <label htmlFor="social-embed-active" className="text-sm text-gray-700">Enable embed</label>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleSaveSocialEmbed} disabled={isSavingSocialEmbed}>
                      {isSavingSocialEmbed ? 'Saving...' : editingSocialEmbedId ? 'Update Embed' : 'Add Embed'}
                    </Button>
                    {editingSocialEmbedId && (
                      <Button variant="outline" type="button" onClick={resetSocialEmbedForm}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-semibold">Existing Embeds</h3>
                    {isLoadingSocialEmbeds && <span className="text-xs text-gray-500">Loading...</span>}
                  </div>
                  {socialEmbeds.length === 0 && !isLoadingSocialEmbeds && (
                    <div className="border rounded-md p-3 text-sm text-gray-600">No embeds added yet.</div>
                  )}
                  <div className="space-y-3">
                    {socialEmbeds.map((embed) => (
                      <div key={embed._id || embed.url} className="border rounded-md p-3 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold capitalize">{embed.type}</p>
                            <p className="text-xs text-gray-600 break-all">{embed.url}</p>
                            <p className="text-xs text-gray-500">Position: {typeof embed.position === 'number' ? embed.position : 0}</p>
                            <p className="text-xs text-gray-500">Status: {embed.isActive ? 'Active' : 'Disabled'}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditSocialEmbed(embed)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant={embed.isActive ? 'destructive' : 'outline'}
                              onClick={() => handleToggleSocialEmbed(embed)}
                            >
                              {embed.isActive ? 'Disable' : 'Enable'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteSocialEmbed(embed)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Innovation Section */}
        {activeSection === 'innovationSection' && (
          <Card>
            <CardHeader>
              <CardTitle>Innovation Section</CardTitle>
            </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                      value={homePageData.innovationSection?.title}
                      onChange={(e) => updateSectionData('innovationSection', 'title', e.target.value)}
                      placeholder="Enter innovation section title"
                    />
                    <CharacterCounter current={(homePageData.innovationSection?.title || '').length} max={200} min={5} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea
                      value={homePageData.innovationSection?.description}
                      onChange={(e) => updateSectionData('innovationSection', 'description', e.target.value)}
                      placeholder="Enter innovation section description"
                      rows={6}
                    />
                    <CharacterCounter current={(homePageData.innovationSection?.description || '').length} max={2000} min={20} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Innovation Image</label>
                    <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                    <ImageUpload
                      value={innovationImagePreview || homePageData.innovationSection?.image || ''}
                      onChange={(file, previewUrl) => {
                        setInnovationImageFile(file);
                        setInnovationImagePreview(previewUrl);
                      }}
                      placeholder="Upload innovation section image"
                      previewSize="lg"
                      previewShape="rectangular"
                    />
                    {innovationImageFile && (
                      <Button
                        onClick={handleInnovationImageUpload}
                        disabled={isUploadingInnovationImage}
                        className="mt-4 bg-purple-600 hover:bg-purple-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploadingInnovationImage ? 'Uploading...' : 'Upload Image'}
                      </Button>
                    )}
                    <p className="text-xs text-gray-500 mt-2">Recommended: 800x600px, Max 2MB, JPG/PNG/WebP/GIF</p>
                    {/* Image Preview */}
                    {/* {homePageData.innovationSection?.image && !innovationImageFile && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2">Current Image</label>
                        <div className="border rounded-lg p-2 bg-gray-50">
                          <img
                            src={homePageData.innovationSection?.image}
                            alt="Innovation preview"
                            className="w-full h-48 object-contain rounded"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                              if (nextElement) {
                                nextElement.style.display = 'block';
                              }
                            }}
                          />
                          <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500" style={{ display: 'none' }}>
                            Failed to load image
                          </div>
                        </div>
                      </div>
                    )} */}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Button Text</label>
                      <Input
                        value={homePageData.innovationSection?.buttonText}
                        onChange={(e) => updateSectionData('innovationSection', 'buttonText', e.target.value)}
                        placeholder="Enter button text"
                      />
                      <CharacterCounter current={(homePageData.innovationSection?.buttonText || '').length} max={50} min={3} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Button Link</label>
                      <Input
                        value={homePageData.innovationSection?.buttonLink}
                        onChange={(e) => updateSectionData('innovationSection', 'buttonLink', e.target.value)}
                        placeholder="Enter button link URL"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

        {/* Global Programs Section */}
        {activeSection === 'globalPrograms' && (
          <Card>
            <CardHeader>
              <CardTitle>Global Programs Section</CardTitle>
            </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title 1</label>
                    <Input
                      value={homePageData.globalPrograms.title1}
                      onChange={(e) => updateSectionData('globalPrograms', 'title1', e.target.value)}
                      placeholder="Enter global programs title 1"
                    />
                    <CharacterCounter current={homePageData.globalPrograms.title1.length} max={200} min={5} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description 1</label>
                    <Textarea
                      value={homePageData.globalPrograms.description1}
                      onChange={(e) => updateSectionData('globalPrograms', 'description1', e.target.value)}
                      placeholder="Enter global programs description 1"
                      rows={6}
                    />
                    <CharacterCounter current={homePageData.globalPrograms.description1.length} max={2000} min={20} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Title 2</label>
                    <Input
                      value={homePageData.globalPrograms.title2}
                      onChange={(e) => updateSectionData('globalPrograms', 'title2', e.target.value)}
                      placeholder="Enter global programs title 2"
                    />
                    <CharacterCounter current={homePageData.globalPrograms.title2.length} max={200} min={5} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description 2</label>
                    <Textarea
                      value={homePageData.globalPrograms.description2}
                      onChange={(e) => updateSectionData('globalPrograms', 'description2', e.target.value)}
                      placeholder="Enter global programs description 2"
                      rows={6}
                    />
                    <CharacterCounter current={homePageData.globalPrograms.description2.length} max={2000} min={20} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Global Programs Image</label>
                    <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
                    <ImageUpload
                      value={globalProgramsImagePreview || homePageData.globalPrograms.image || ''}
                      onChange={(file, previewUrl) => {
                        setGlobalProgramsImageFile(file);
                        setGlobalProgramsImagePreview(previewUrl);
                      }}
                      placeholder="Upload global programs section image"
                      previewSize="lg"
                      previewShape="rectangular"
                    />
                    {globalProgramsImageFile && (
                      <Button
                        onClick={handleGlobalProgramsImageUpload}
                        disabled={isUploadingGlobalProgramsImage}
                        className="mt-4 bg-orange-600 hover:bg-orange-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploadingGlobalProgramsImage ? 'Uploading...' : 'Upload Image'}
                      </Button>
                    )}
                    <p className="text-xs text-gray-500 mt-2">Recommended: 800x600px, Max 2MB, JPG/PNG/WebP/GIF</p>
                    {/* Image Preview */}
                    {/* {homePageData.globalPrograms.image && !globalProgramsImageFile && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2">Current Image</label>
                        <div className="border rounded-lg p-2 bg-gray-50">
                          <img
                            src={homePageData.globalPrograms.image}
                            alt="Global Programs preview"
                            className="w-full h-48 object-contain rounded"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                              if (nextElement) {
                                nextElement.style.display = 'block';
                              }
                            }}
                          />
                          <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500" style={{ display: 'none' }}>
                            Failed to load image
                          </div>
                        </div>
                      </div>
                    )} */}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Button Text</label>
                      <Input
                        value={homePageData.globalPrograms.buttonText}
                        onChange={(e) => updateSectionData('globalPrograms', 'buttonText', e.target.value)}
                        placeholder="Enter button text"
                      />
                      <CharacterCounter current={homePageData.globalPrograms.buttonText.length} max={50} min={3} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Button Link</label>
                      <Input
                        value={homePageData.globalPrograms.buttonLink}
                        onChange={(e) => updateSectionData('globalPrograms', 'buttonLink', e.target.value)}
                        placeholder="Enter button link URL"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

        {/* Statistics Section */}
        {activeSection === 'statistics' && (
          <Card>
            <CardHeader>
              <CardTitle>Statistics Section</CardTitle>
            </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Heading</label>
                    <Input
                      value={homePageData.statistics.heading}
                      onChange={(e) => updateSectionData('statistics', 'heading', e.target.value)}
                      placeholder="Enter statistics heading"
                    />
                    <CharacterCounter current={homePageData.statistics.heading.length} max={200} min={5} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Background Image URL</label>
                      <Input
                        value={homePageData.statistics.backgroundImage || ''}
                        onChange={(e) => updateSectionData('statistics', 'backgroundImage', e.target.value)}
                        placeholder="Enter background image URL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Upload Background Image</label>
                      <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x1080px, Max 2MB, JPG/PNG/WebP format</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleStatisticsBackgroundUpload}
                        disabled={isUploadingStatisticsBackground}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
                      />
                      {isUploadingStatisticsBackground && (
                        <p className="text-xs text-gray-500 mt-1">Uploading background image...</p>
                      )}
                    </div>
                  </div>

                  {homePageData.statistics.backgroundImage && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Background Preview</label>
                      <div className="border rounded-lg p-2 bg-gray-50">
                        <img
                          src={homePageData.statistics.backgroundImage}
                          alt="Statistics background preview"
                          className="w-full h-48 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = 'flex';
                            }
                          }}
                        />
                        <div
                          className="w-full h-48 bg-gray-200 rounded items-center justify-center text-gray-500"
                          style={{ display: 'none' }}
                        >
                          Failed to load image
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Statistics</h3>
                    <Button onClick={addStatistic} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Statistic
                    </Button>
                  </div>
                  
                  {homePageData.statistics.statistics.map((statistic, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Label</label>
                          <Input
                            value={statistic.label}
                            onChange={(e) => updateStatistic(index, 'label', e.target.value)}
                            placeholder="Enter statistic label"
                          />
                          <CharacterCounter current={statistic.label.length} max={50} min={3} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Value</label>
                          <Input
                            type="number"
                            value={statistic.value}
                            onChange={(e) => updateStatistic(index, 'value', parseInt(e.target.value) || 0)}
                            placeholder="Enter statistic value"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Suffix (Optional)</label>
                          <Input
                            value={statistic.suffix || ''}
                            onChange={(e) => updateStatistic(index, 'suffix', e.target.value)}
                            placeholder="e.g., +, %, etc."
                          />
                          <CharacterCounter current={(statistic.suffix || '').length} max={10} />
                        </div>
                        <div className="md:col-span-3 flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeStatistic(index)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}

        {/* Testimonials Section */}
        {activeSection === 'testimonials' && (
          <Card>
            <CardHeader>
              <CardTitle>Testimonials Section</CardTitle>
            </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Section Heading</label>
                    <Input
                      value={homePageData.testimonials.heading}
                      onChange={(e) => updateTestimonialsHeading(e.target.value)}
                      placeholder="Enter testimonials section heading"
                    />
                    <CharacterCounter current={homePageData.testimonials.heading.length} max={200} min={3} />
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Testimonials</h3>
                    <Button onClick={addTestimonial} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Testimonial
                    </Button>
                  </div>
                  
                  {homePageData.testimonials.testimonials.map((testimonial, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <Input
                              value={testimonial.name}
                              onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                              placeholder="Enter testimonial name"
                            />
                            <CharacterCounter current={testimonial.name.length} max={100} min={3} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Location (Optional)</label>
                            <Input
                              value={testimonial.location || ''}
                              onChange={(e) => updateTestimonial(index, 'location', e.target.value)}
                              placeholder="Enter location"
                            />
                            <CharacterCounter current={(testimonial.location || '').length} max={100} />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Testimonial Text</label>
                          <Textarea
                            value={testimonial.testimonial}
                            onChange={(e) => updateTestimonial(index, 'testimonial', e.target.value)}
                            placeholder="Enter testimonial text"
                            rows={4}
                          />
                          <CharacterCounter current={testimonial.testimonial.length} max={1000} min={20} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {!testimonial.isVideo && (
                            <div>
                              <label className="block text-sm font-medium mb-2">Upload Testimonial Image</label>
                              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 400x400px (square), Max 2MB, JPG/PNG/WebP format</p>
                              <ImageUpload
                                value={testimonialImagePreviews[index] || testimonial.image || ''}
                                onChange={(file, previewUrl) => {
                                  if (file) {
                                    setTestimonialImageFiles(prev => ({ ...prev, [index]: file }));
                                    setTestimonialImagePreviews(prev => ({ ...prev, [index]: previewUrl }));
                                  } else {
                                    setTestimonialImageFiles(prev => {
                                      const newFiles: { [key: number]: File } = { ...prev };
                                      delete newFiles[index];
                                      return newFiles;
                                    });
                                    setTestimonialImagePreviews(prev => {
                                      const newPreviews: { [key: number]: string } = { ...prev };
                                      delete newPreviews[index];
                                      return newPreviews;
                                    });
                                  }
                                }}
                                placeholder="Upload testimonial image"
                                previewSize="md"
                                previewShape="circle"
                              />
                              {testimonialImageFiles[index] && (
                                <Button
                                  onClick={() => handleTestimonialImageUpload(index)}
                                  disabled={isUploadingTestimonialImages[index]}
                                  className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                                  size="sm"
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  {isUploadingTestimonialImages[index] ? 'Uploading...' : 'Upload Image'}
                                </Button>
                              )}
                              <p className="text-xs text-gray-500 mt-2">Recommended: 400x400px (square), Max 2MB, JPG/PNG/WebP/GIF</p>
                              {/* Image Preview */}
                              {/* {testimonial.image && !testimonialImageFiles[index] && (
                                <div className="mt-4">
                                  <label className="block text-sm font-medium mb-2">Current Image</label>
                                  <div className="border rounded-lg p-2 bg-gray-50">
                                    <img
                                      src={testimonial.image}
                                      alt={`${testimonial.name} preview`}
                                      className="w-full h-32 object-contain rounded"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                        if (nextElement) {
                                          nextElement.style.display = 'block';
                                        }
                                      }}
                                    />
                                    <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500" style={{ display: 'none' }}>
                                      Failed to load image
                                    </div>
                                  </div>
                                </div>
                              )} */}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={testimonial.isVideo || false}
                              onChange={(e) => updateTestimonial(index, 'isVideo', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-sm font-medium">Is Video Testimonial</span>
                          </label>
                        </div>
                        
                        {testimonial.isVideo && (
                          <div>
                            <label className="block text-sm font-medium mb-1">Video URL</label>
                            <Input
                              value={testimonial.videoUrl || ''}
                              onChange={(e) => updateTestimonial(index, 'videoUrl', e.target.value)}
                              placeholder="Enter YouTube embed URL"
                            />
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeTestimonial(index)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}
      </div>
    </div>
  );
};

export default Home;
