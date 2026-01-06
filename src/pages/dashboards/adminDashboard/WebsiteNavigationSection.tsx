import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { navigationPages } from "@/lib/navigationPages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const MAX_IMAGES = 3;
const MAX_SIZE_MB = 1;

interface CarouselImage {
  _id: string;
  url: string;
  heading?: string;
  subText?: string;
  ctaText?: string;
  ctaUrl?: string;
}

interface Carousel {
  _id: string;
  page: string;
  images: CarouselImage[];
  createdAt: string;
  updatedAt: string;
}

interface VideoCard {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
  page: string;
}

interface HeroSection {
  _id: string;
  h1: string;
  h2: string;
  page: string;
}

interface BulletPoint {
  _id: string;
  page: string;
  points: string[];
}

interface Testimonial {
  _id: string;
  name: string;
  message: string;
  page: string;
}

interface SectionContent {
  _id?: string;
  page: string;
  heading: string;
  subHeading?: string;
  body: string;
  orientation?: 'left' | 'right';
  imageUrl?: string;
}

interface Section {
  id: string;
  type: 'carousel' | 'video' | 'content';
  content: any;
}

const submenuToUrl: Record<string, string> = {
  "introduction": "/about/introduction",
  "blended-learning": "/about/blended-learning",
  "workshops": "/about/workshops",
  "vision-mission": "/about/vision-mission",
  "leadership": "/about/leadership",
  "advisory-board": "/about/advisory-board",
  "technologies": "/about/technologies",
  "eop": "/about/eop",
  "impact": "/about/impact",
  "testimonials": "/about/testimonials",
  "it-skills-training": "/our-projects/it-skills-training",
  "cluster-education": "/our-projects/cluster-education",
  "teachers-training": "/our-projects/teachers-training",
  "slum-children": "/our-projects/slum-children",
  "out-of-school": "/our-projects/out-of-school",
  "girls-education": "/our-projects/girls-education",
  "pedagogy-training": "/our-projects/pedagogy-training",
  "madarsa-education": "/our-projects/madarsa-education",
  "social-financial": "/our-projects/social-financial",
  "adult-education": "/our-projects/adult-education",
  "public-schools": "/our-projects/public-schools"
};

const WebsiteNavigationSection = () => {
  const [activePage, setActivePage] = useState(navigationPages[0].key);
  const [activeSubmenu, setActiveSubmenu] = useState(navigationPages[0].submenus[0]?.key);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [previewMode, setPreviewMode] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [existingCarousel, setExistingCarousel] = useState<Carousel | null>(null);
  const [loadingCarousel, setLoadingCarousel] = useState(false);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [videoCards, setVideoCards] = useState<VideoCard[]>([]);
  const [loadingVideoCards, setLoadingVideoCards] = useState(false);
  const [videoCardForm, setVideoCardForm] = useState<Partial<VideoCard>>({});
  const [editingVideoCardId, setEditingVideoCardId] = useState<string | null>(null);
  const [videoCardUploading, setVideoCardUploading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [heroSection, setHeroSection] = useState<HeroSection | null>(null);
  const [loadingHero, setLoadingHero] = useState(false);
  const [heroForm, setHeroForm] = useState<Partial<HeroSection>>({});
  const [heroUploading, setHeroUploading] = useState(false);
  const [bulletPoints, setBulletPoints] = useState<BulletPoint | null>(null);
  const [loadingBulletPoints, setLoadingBulletPoints] = useState(false);
  const [bulletPointForm, setBulletPointForm] = useState<string>("");
  const [bulletPointUploading, setBulletPointUploading] = useState(false);
  const [editingBulletIndex, setEditingBulletIndex] = useState<number | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({});
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialUploading, setTestimonialUploading] = useState(false);
  const [sectionContent, setSectionContent] = useState<SectionContent>({
    page: "",
    heading: "",
    subHeading: "",
    body: "",
    imageUrl: undefined,
    orientation: 'left',
  });
  const [loadingSectionContent, setLoadingSectionContent] = useState(false);
  const [savedSections, setSavedSections] = useState<SectionContent[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [sectionImageFile, setSectionImageFile] = useState<File | null>(null);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const contentImageRef = useRef<HTMLInputElement | null>(null);

  const currentPage = navigationPages.find((page) => page.key === activePage);
  const currentSubmenu = currentPage?.submenus.find((sm) => sm.key === activeSubmenu);

  const getDefaultContent = (type: Section['type']) => {
    switch (type) {
      case 'carousel':
        return { images: [] };
      case 'video':
        return { videos: [] };
      case 'content':
        return { page: '', heading: '', subHeading: '', body: '', imageUrl: undefined, orientation: 'left' };
      default:
        return {};
    }
  };

  const addSection = (type: Section['type'], content: any = getDefaultContent(type)) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      content,
    };
    setSections((prevSections) => [...prevSections, newSection]);
  };

  const deleteSection = (id: string) => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== id));
  };

  const editSection = (id: string, newContent: any) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error("Each image must be less than 1MB.");
        return;
      }
    }
    if (carouselImages.length + files.length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }
    setCarouselImages((prev) => [...prev, ...files].slice(0, MAX_IMAGES));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (idx: number) => {
    setCarouselImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleContentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error("Image must be less than 1MB.");
      return;
    }
    setSectionImageFile(file);
    setSectionContent((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    if (formErrors.image) {
      setFormErrors(prev => ({ ...prev, image: "" }));
    }
    if (contentImageRef.current) contentImageRef.current.value = "";
  };

  const handleRemoveContentImage = () => {
    setSectionImageFile(null);
    setSectionContent((prev) => ({ ...prev, imageUrl: undefined }));
  };

  const handleSectionContentInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateSectionContent = () => {
    const errors: { [key: string]: string } = {};
    if (!sectionContent.heading?.trim()) {
      errors.heading = "Heading is required";
    } else if (sectionContent.heading.trim().length < 3) {
      errors.heading = "Heading must be at least 3 characters";
    }
    if (!sectionContent.body?.trim()) {
      errors.body = "Body content is required";
    } else if (sectionContent.body.trim().length < 10) {
      errors.body = "Body content must be at least 10 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchExistingCarousel = async () => {
    if (!activeSubmenu) return;
    setLoadingCarousel(true);
    try {
      const response = await axiosInstance.get(`/carousel/${activeSubmenu}`);
      if (response.data.success && response.data.data) {
        setExistingCarousel(response.data.data);
      } else {
        setExistingCarousel(null);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setExistingCarousel(null);
      } else {
        console.error("Failed to fetch carousel:", error);
        setExistingCarousel(null);
      }
    } finally {
      setLoadingCarousel(false);
    }
  };

  const fetchVideoCards = async () => {
    if (!activeSubmenu) return;
    setLoadingVideoCards(true);
    try {
      const res = await axiosInstance.get(`/video-cards/${activeSubmenu}`);
      if (res.data.success && res.data.data) {
        setVideoCards(res.data.data);
      } else {
        setVideoCards([]);
      }
    } catch (err) {
      setVideoCards([]);
    } finally {
      setLoadingVideoCards(false);
    }
  };

  const fetchHeroSection = async () => {
    if (!activeSubmenu) return;
    setLoadingHero(true);
    try {
      const res = await axiosInstance.get(`/hero-section/${activeSubmenu}`);
      if (res.data.success && res.data.data && res.data.data.length > 0) {
        const heroData = res.data.data[0];
        setHeroSection(heroData);
        setHeroForm(heroData);
      } else {
        setHeroSection(null);
        setHeroForm({});
      }
    } catch (err) {
      setHeroSection(null);
      setHeroForm({});
    } finally {
      setLoadingHero(false);
    }
  };

  const fetchBulletPoints = async () => {
    if (!activeSubmenu) return;
    setLoadingBulletPoints(true);
    try {
      const res = await axiosInstance.get(`/bullet-points/${activeSubmenu}`);
      if (res.data.success && res.data.data && res.data.data.length > 0) {
        const bulletData = res.data.data[0];
        setBulletPoints(bulletData);
      } else {
        setBulletPoints(null);
      }
    } catch (err) {
      setBulletPoints(null);
    } finally {
      setLoadingBulletPoints(false);
    }
  };

  const fetchTestimonials = async () => {
    if (!activeSubmenu) return;
    setLoadingTestimonials(true);
    try {
      const res = await axiosInstance.get(`/testimonials/${activeSubmenu}`);
      if (res.data.success && res.data.data) {
        setTestimonials(res.data.data);
      } else {
        setTestimonials([]);
      }
    } catch (err) {
      setTestimonials([]);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  const fetchSectionContent = async () => {
    if (!activeSubmenu) {
      console.warn("No active submenu selected for fetching sections");
      return;
    }
    setLoadingSectionContent(true);
    try {
      const res = await axiosInstance.get(`/sections/${activeSubmenu}`);
      if (res.data.success && res.data.data) {
        setSavedSections(res.data.data);
        setSections((prevSections) => {
          const newSections = [...prevSections];
          res.data.data.forEach((section: SectionContent) => {
            const existingSection = newSections.find(s => s.id === section._id);
            if (!existingSection) {
              newSections.push({
                id: section._id || `fetched-${Date.now()}`,
                type: 'content' as const,
                content: section,
              });
            }
          });
          return newSections;
        });
        console.log(`Fetched ${res.data.data.length} sections for ${activeSubmenu}`);
      } else {
        console.log("No sections found for this submenu");
        setSavedSections([]);
      }
    } catch (err: any) {
      console.error("Failed to fetch section content:", err);
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to fetch sections.";
      if (err?.response?.status !== 404) {
        toast.error(errorMessage);
      }
      setSavedSections([]);
    } finally {
      setLoadingSectionContent(false);
    }
  };

  const saveSectionContent = async () => {
    if (!activeSubmenu) {
      toast.error("No active submenu selected.");
      return;
    }
    if (!validateSectionContent()) {
      toast.error("Please fix the validation errors before saving.");
      return;
    }
    setLoadingSectionContent(true);
    try {
      const formData = new FormData();
      formData.append("page", activeSubmenu);
      formData.append("heading", sectionContent.heading.trim());
      formData.append("subHeading", (sectionContent.subHeading || "").trim());
      formData.append("body", sectionContent.body.trim());
      formData.append("orientation", sectionContent.orientation || 'left');
      if (sectionImageFile) {
        formData.append("image", sectionImageFile);
      }
      const res = await axiosInstance.post(`/admin/sections`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        toast.success("Section content saved successfully!");
        const newSection: Section = {
          id: res.data.data._id,
          type: 'content' as const,
          content: res.data.data,
        };
        setSavedSections((prev) => [res.data.data, ...prev]);
        setSections((prevSections) => [...prevSections, newSection]);
        setSectionContent({
          page: activeSubmenu || "",
          heading: "",
          subHeading: "",
          body: "",
          imageUrl: undefined,
          orientation: 'left',
        });
        setSectionImageFile(null);
        setEditingSectionId(null);
        setFormErrors({});
      }
    } catch (err: any) {
      console.error("Save section error:", err);
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to save section content.";
      toast.error(errorMessage);
    } finally {
      setLoadingSectionContent(false);
    }
  };

  const updateSectionContent = async (sectionId: string, content: SectionContent) => {
    if (!activeSubmenu) {
      toast.error("No active submenu selected.");
      return;
    }
    if (!validateSectionContent()) {
      toast.error("Please fix the validation errors before updating.");
      return;
    }
    setLoadingSectionContent(true);
    try {
      const formData = new FormData();
      formData.append("page", activeSubmenu);
      formData.append("heading", content.heading.trim());
      formData.append("subHeading", (content.subHeading || "").trim());
      formData.append("body", content.body.trim());
      formData.append("orientation", content.orientation || 'left');
      if (sectionImageFile) {
        formData.append("image", sectionImageFile);
      }
      const res = await axiosInstance.put(`/admin/sections/${sectionId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        toast.success("Section content updated successfully!");
        setSections((prevSections) =>
          prevSections.map((section) =>
            section.id === sectionId
              ? { ...section, content: res.data.data }
              : section
          )
        );
        setSavedSections((prev) =>
          prev.map((section) =>
            section._id === sectionId ? res.data.data : section
          )
        );
        setSectionContent({
          page: activeSubmenu || "",
          heading: "",
          subHeading: "",
          body: "",
          imageUrl: undefined,
          orientation: 'left',
        });
        setSectionImageFile(null);
        setEditingSectionId(null);
      }
    } catch (err: any) {
      console.error("Update section error:", err);
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to update section content.";
      toast.error(errorMessage);
    } finally {
      setLoadingSectionContent(false);
    }
  };

  const deleteSectionContent = async (sectionId: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;
    try {
      const res = await axiosInstance.delete(`/admin/sections/${sectionId}`);
      if (res.data.success) {
        toast.success("Section deleted successfully!");
        setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
        setSavedSections((prev) => prev.filter((section) => section._id !== sectionId));
      }
    } catch (err: any) {
      console.error("Delete section error:", err);
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to delete section.";
      toast.error(errorMessage);
    }
  };

  const handleVideoCardInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, files } = e.target as HTMLInputElement;

  if (name === 'thumbnail' && files && files.length > 0) {
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed for thumbnail.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Thumbnail must be less than ${MAX_SIZE_MB}MB.`);
      return;
    }
    setThumbnailFile(file);
    setVideoCardForm((prev) => ({ ...prev, thumbnail: URL.createObjectURL(file) }));
  } else {
    setVideoCardForm((prev) => ({ ...prev, [name]: value }));
  }
};

// Function to handle removing the thumbnail
const handleRemoveThumbnail = () => {
  setThumbnailFile(null);
  setVideoCardForm((prev) => ({ ...prev, thumbnail: "" }));
};

// Update the handleVideoCardSubmit function to handle the thumbnail correctly
const handleVideoCardSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!videoCardForm.title?.trim() || !videoCardForm.description?.trim() ||
    !videoCardForm.duration?.trim() || !videoCardForm.videoUrl?.trim()) {
    toast.error("Please fill in all required fields.");
    return;
  }

  if (!activeSubmenu) {
    toast.error("No active submenu selected.");
    return;
  }

  setVideoCardUploading(true);

  try {
    const formData = new FormData();
    formData.append("title", videoCardForm.title.trim());
    formData.append("description", videoCardForm.description.trim());
    formData.append("duration", videoCardForm.duration.trim());
    formData.append("videoUrl", videoCardForm.videoUrl.trim());
    formData.append("page", activeSubmenu);

    // Only append the thumbnail file if it exists and is new
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    if (editingVideoCardId) {
      await axiosInstance.put(`/admin/video-cards/${editingVideoCardId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Video card updated!");
    } else {
      await axiosInstance.post(`/admin/video-cards`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Video card added!");
    }

    setVideoCardForm({});
    setThumbnailFile(null);
    setEditingVideoCardId(null);
    fetchVideoCards();
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Failed to save video card.");
  } finally {
    setVideoCardUploading(false);
  }
};

  const handleEditVideoCard = (card: VideoCard) => {
    setVideoCardForm(card);
    setEditingVideoCardId(card._id);
  };

  const handleDeleteVideoCard = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video card?")) return;
    try {
      await axiosInstance.delete(`/admin/video-cards/${id}`);
      toast.success("Video card deleted!");
      fetchVideoCards();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete video card.");
    }
  };

  const handleHeroInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHeroForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroForm.h1?.trim() || !heroForm.h2?.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!activeSubmenu) {
      toast.error("No active submenu selected.");
      return;
    }
    setHeroUploading(true);
    try {
      const payload = {
        h1: heroForm.h1.trim(),
        h2: heroForm.h2.trim(),
        page: activeSubmenu,
      };
      if (heroSection) {
        await axiosInstance.put(`/admin/hero-section/${heroSection._id}`, payload);
        toast.success("Hero section updated!");
      } else {
        await axiosInstance.post(`/admin/hero-section`, payload);
        toast.success("Hero section added!");
      }
      fetchHeroSection();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save hero section.");
    } finally {
      setHeroUploading(false);
    }
  };

  const handleBulletPointInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBulletPointForm(value);
  };

  const handleBulletPointSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletPointForm.trim()) {
      toast.error("Please enter bullet point text.");
      return;
    }
    if (!activeSubmenu) {
      toast.error("No active submenu selected.");
      return;
    }
    setBulletPointUploading(true);
    try {
      const currentPoints = bulletPoints?.points || [];
      let newPoints: string[];
      if (editingBulletIndex !== null) {
        newPoints = [...currentPoints];
        newPoints[editingBulletIndex] = bulletPointForm.trim();
      } else {
        newPoints = [...currentPoints, bulletPointForm.trim()];
      }
      const payload = {
        points: newPoints,
        page: activeSubmenu,
      };
      if (bulletPoints) {
        await axiosInstance.put(`/admin/bullet-points/${bulletPoints._id}`, payload);
        toast.success(editingBulletIndex !== null ? "Bullet point updated!" : "Bullet point added!");
      } else {
        await axiosInstance.post(`/admin/bullet-points`, payload);
        toast.success("Bullet point added!");
      }
      setBulletPointForm("");
      setEditingBulletIndex(null);
      fetchBulletPoints();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save bullet point.");
    } finally {
      setBulletPointUploading(false);
    }
  };

  const handleEditBulletPoint = (index: number) => {
    if (bulletPoints?.points[index]) {
      setBulletPointForm(bulletPoints.points[index]);
      setEditingBulletIndex(index);
    }
  };

  const handleDeleteBulletPoint = async (index: number) => {
    if (!bulletPoints) return;
    if (!confirm("Are you sure you want to delete this bullet point?")) return;
    try {
      const newPoints = bulletPoints.points.filter((_, i) => i !== index);
      const payload = {
        points: newPoints,
        page: activeSubmenu,
      };
      await axiosInstance.put(`/admin/bullet-points/${bulletPoints._id}`, payload);
      toast.success("Bullet point deleted!");
      fetchBulletPoints();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete bullet point.");
    }
  };

  const handleTestimonialInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestimonialForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name?.trim() || !testimonialForm.message?.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!activeSubmenu) {
      toast.error("No active submenu selected.");
      return;
    }
    setTestimonialUploading(true);
    try {
      const payload = {
        name: testimonialForm.name.trim(),
        message: testimonialForm.message.trim(),
        page: activeSubmenu,
      };
      if (editingTestimonialId) {
        await axiosInstance.put(`/admin/testimonials/${editingTestimonialId}`, payload);
        toast.success("Testimonial updated!");
      } else {
        await axiosInstance.post(`/admin/testimonials`, payload);
        toast.success("Testimonial added!");
      }
      setTestimonialForm({});
      setEditingTestimonialId(null);
      fetchTestimonials();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save testimonial.");
    } finally {
      setTestimonialUploading(false);
    }
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setTestimonialForm(testimonial);
    setEditingTestimonialId(testimonial._id);
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await axiosInstance.delete(`/admin/testimonials/${id}`);
      toast.success("Testimonial deleted!");
      fetchTestimonials();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete testimonial.");
    }
  };

  const handleSaveOrUpdateSection = async () => {
    if (editingSectionId) {
      await updateSectionContent(editingSectionId, sectionContent);
    } else {
      await saveSectionContent();
    }
  };

  useEffect(() => {
    if (activeSubmenu) {
      setSections([]);
      setSectionContent(prev => ({ ...prev, page: activeSubmenu }));
      setEditingSectionId(null);
      setFormErrors({});
      fetchExistingCarousel();
      fetchVideoCards();
      fetchHeroSection();
      fetchBulletPoints();
      fetchTestimonials();
      fetchSectionContent();
      setActiveTab("content");
    }
  }, [activeSubmenu]);

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'content':
        return (
          <div key={section.id} className="relative h-96 mb-8">
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-between px-8">
              {section.content.orientation === 'left' && (
                <>
                  <div className="text-white max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">{section.content.heading || "Section Heading"}</h1>
                    {section.content.subHeading && (
                      <h2 className="text-2xl mb-4">{section.content.subHeading}</h2>
                    )}
                    <p className="text-lg">{section.content.body || "Section body text goes here"}</p>
                  </div>
                  {section.content.imageUrl && (
                    <div className="max-w-md">
                      <img
                        src={section.content.imageUrl}
                        alt="Section Image"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </>
              )}
              {section.content.orientation === 'right' && (
                <>
                  {section.content.imageUrl && (
                    <div className="max-w-md">
                      <img
                        src={section.content.imageUrl}
                        alt="Section Image"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="text-white max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">{section.content.heading || "Section Heading"}</h1>
                    {section.content.subHeading && (
                      <h2 className="text-2xl mb-4">{section.content.subHeading}</h2>
                    )}
                    <p className="text-lg">{section.content.body || "Section body text goes here"}</p>
                  </div>
                </>
              )}
            </div>
            {!previewMode && (
              <Button
                variant="outline"
                onClick={() => deleteSection(section.id)}
                className="absolute top-4 right-4 text-red-600 border-red-200 hover:bg-red-50"
              >
                Delete Section
              </Button>
            )}
          </div>
        );
      case 'carousel':
        return (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Image Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.content.images.map((image: CarouselImage, index: number) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={image.url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  {image.heading && (
                    <div className="p-4">
                      <h3 className="font-semibold">{image.heading}</h3>
                      {image.subText && <p className="text-sm text-gray-600 mt-1">{image.subText}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {!previewMode && (
              <Button
                variant="outline"
                onClick={() => deleteSection(section.id)}
                className="mt-4 text-red-600 border-red-200 hover:bg-red-50"
              >
                Delete Carousel
              </Button>
            )}
          </div>
        );
      case 'video':
        return (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Featured Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.content.videos.map((video: VideoCard, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Duration: {video.duration}</span>
                      <Button variant="outline" size="sm">
                        <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">Watch</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!previewMode && (
              <Button
                variant="outline"
                onClick={() => deleteSection(section.id)}
                className="mt-4 text-red-600 border-red-200 hover:bg-red-50"
              >
                Delete Video Section
              </Button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleCarouselSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (carouselImages.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }
    if (!activeSubmenu) {
      toast.error("No active submenu selected.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("page", activeSubmenu);
      carouselImages.forEach((img) => formData.append("images", img));
      await axiosInstance.post("/admin/carousel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Carousel images uploaded successfully!");
      setCarouselImages([]);
      fetchExistingCarousel();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to upload images.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-0 mx-4 my-4">
        <div />
        <button
          className="px-4 py-2 bg-ngo-color1 text-white rounded hover:bg-ngo-color5 font-semibold shadow"
          onClick={() => setPreviewMode(true)}
          disabled={!activeSubmenu || !submenuToUrl[activeSubmenu]}
        >
          Preview
        </button>
      </div>

      {previewMode && (
        <div className="fixed inset-0 z-50 bg-black/70 flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl h-[80vh] flex flex-col relative">
            <button
              className="absolute top-4 right-0 px-4 py-2 bg-ngo-color1 text-white rounded hover:bg-ngo-color5 font-semibold shadow"
              onClick={() => setPreviewMode(false)}
            >
              Close Preview
            </button>
            <iframe
              src={submenuToUrl[activeSubmenu] || "/"}
              title="Preview"
              className="flex-1 w-full rounded-b-lg border-0"
              style={{ minHeight: "70vh", minWidth: "80vw" }}
            />
          </div>
        </div>
      )}

      <nav className="flex gap-6 border-b border-gray-200 mb-6 relative shadow-lg">
        {navigationPages.map((page) => (
          <div
            key={page.key}
            className="relative"
            onMouseEnter={() => setSubmenuOpen(page.key)}
            onMouseLeave={() => setSubmenuOpen(null)}
          >
            <button
              className={`px-4 py-2 font-semibold text-base transition rounded-t-md focus:outline-none ${activePage === page.key ? "bg-ngo-color6 text-ngo-color1" : "hover:bg-ngo-color2/20 text-ngo-color1"
                }`}
              onClick={() => {
                setActivePage(page.key);
                setActiveSubmenu(page.submenus[0]?.key);
              }}
            >
              {page.label}
            </button>
            {submenuOpen === page.key && (
              <div className="absolute left-0 top-full bg-white border rounded-b-md shadow-lg min-w-[220px] z-10">
                {page.submenus.map((submenu) => (
                  <button
                    key={submenu.key}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-ngo-color6/10 ${activeSubmenu === submenu.key ? "bg-ngo-color6/20 font-semibold" : ""
                      }`}
                    onClick={() => {
                      setActivePage(page.key);
                      setActiveSubmenu(submenu.key);
                      setSubmenuOpen(null);
                    }}
                  >
                    {submenu.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <Card className="border-0 rounded-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">{currentSubmenu?.label || "Select a section"}</CardTitle>
          <p className="text-muted-foreground">
            Manage content dynamic content for this page.
          </p>
        </CardHeader>
        <CardContent>
          {(() => {
            switch (activeSubmenu) {
              case "introduction":
              case "vision-mission":
              case "leadership":
              case "advisory-board":
              case "blended-learning":
              case "workshops":
              case "technologies":
              case "eop":
              case "impact":
              case "testimonials":
              case "it-skills-training":
              case "cluster-education":
              case "teachers-training":
              case "slum-children":
              case "out-of-school":
              case "girls-education":
              case "pedagogy-training":
              case "madarsa-education":
              case "social-financial":
              case "adult-education":
              case "public-schools":
                return (
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="carousel">Top Images Section (Carousel)</TabsTrigger>
                      <TabsTrigger value="content">Middle Section Content</TabsTrigger>
                      <TabsTrigger value="videos">Bottom Video Cards Section</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content">
                      <Card>
                        <CardHeader>
                          <CardTitle>Section Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label htmlFor="heading" className="block text-sm font-medium">
                                  Heading *
                                </label>
                                <input
                                  id="heading"
                                  name="heading"
                                  type="text"
                                  placeholder="Enter section heading"
                                  value={sectionContent.heading}
                                  onChange={handleSectionContentInput}
                                  className={`border rounded px-3 py-2 w-full ${formErrors.heading ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {formErrors.heading && (
                                  <p className="text-red-500 text-xs">{formErrors.heading}</p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="subHeading" className="block text-sm font-medium">
                                  Subheading (optional)
                                </label>
                                <input
                                  id="subHeading"
                                  name="subHeading"
                                  type="text"
                                  placeholder="Enter subheading"
                                  value={sectionContent.subHeading}
                                  onChange={handleSectionContentInput}
                                  className={`border rounded px-3 py-2 w-full ${formErrors.subHeading ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {formErrors.subHeading && (
                                  <p className="text-red-500 text-xs">{formErrors.subHeading}</p>
                                )}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="body" className="block text-sm font-medium">
                                Body *
                              </label>
                              <textarea
                                id="body"
                                name="body"
                                placeholder="Enter body text"
                                value={sectionContent.body}
                                onChange={handleSectionContentInput}
                                className={`border rounded px-3 py-2 w-full min-h-[100px] ${formErrors.body ? 'border-red-500' : 'border-gray-300'}`}
                              />
                              {formErrors.body && (
                                <p className="text-red-500 text-xs">{formErrors.body}</p>
                              )}
                            </div>
                            <div className="space-y-2 w-full">
                              <label htmlFor="orientation" className="block text-sm font-medium">
                                Orientation
                              </label>
                              <select
                                id="orientation"
                                name="orientation"
                                value={sectionContent.orientation}
                                onChange={handleSectionContentInput}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ngo-color6 focus:border-ngo-color6"
                              >
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="content-image" className="block text-sm font-medium">
                                Section Image (optional)
                              </label>
                              <input
                                id="content-image"
                                type="file"
                                accept="image/*"
                                ref={contentImageRef}
                                onChange={handleContentImageChange}
                                className={`block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ngo-color6 file:text-white hover:file:bg-ngo-color5 ${formErrors.image ? 'border-red-500' : ''}`}
                              />
                              <div className="text-xs text-gray-500">
                                Max {MAX_SIZE_MB}MB. Recommended: 660x380px
                              </div>
                              {formErrors.image && (
                                <p className="text-red-500 text-xs">{formErrors.image}</p>
                              )}
                              {sectionContent.imageUrl && (
                                <div className="mt-2 relative group">
                                  <img
                                    src={sectionContent.imageUrl}
                                    alt="Section preview"
                                    className="w-32 h-24 object-cover border rounded shadow-sm"
                                  />
                                  <button
                                    type="button"
                                    onClick={handleRemoveContentImage}
                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                                    title="Remove"
                                  >
                                    ×
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={handleSaveOrUpdateSection}
                                className="bg-ngo-color6 hover:bg-ngo-color5"
                                disabled={loadingSectionContent}
                              >
                                {loadingSectionContent ? "Saving..." : (editingSectionId ? "Update Section Content" : "Save Section Content")}
                              </Button>
                              {editingSectionId && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    setSectionContent({
                                      page: activeSubmenu || "",
                                      heading: "",
                                      subHeading: "",
                                      body: "",
                                      imageUrl: undefined,
                                      orientation: 'left',
                                    });
                                    setSectionImageFile(null);
                                    setEditingSectionId(null);
                                    setFormErrors({});
                                  }}
                                >
                                  Cancel Edit
                                </Button>
                              )}
                            </div>
                          </div>
                          {savedSections.length > 0 && (
                            <div className="mt-8">
                              <Separator />
                              <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-4">Created Sections ({savedSections.length})</h3>
                                <div className="space-y-4">
                                  {savedSections
                                    .slice()
                                    .reverse()
                                    .map((section, index) => (
                                      <div key={section._id} className="border rounded-lg p-4 bg-gray-50 relative">
                                        <button
                                          onClick={() => deleteSectionContent(section._id!)}
                                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                                          title="Remove section"
                                        >
                                          ×
                                        </button>
                                        <div className="flex justify-between items-start mb-3 pr-8">
                                          <h4 className="font-semibold text-lg">Section {savedSections.length - index}</h4>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                              setSectionContent(section);
                                              setSectionImageFile(null);
                                              setEditingSectionId(section._id!);
                                              document.getElementById('heading')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                          >
                                            Edit
                                          </Button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div>
                                            <h5 className="font-medium text-gray-700 mb-2">Content Preview:</h5>
                                            <div className="space-y-2">
                                              {section.heading && (
                                                <div>
                                                  <span className="text-sm font-medium text-gray-600">Heading:</span>
                                                  <p className="text-sm">{section.heading}</p>
                                                </div>
                                              )}
                                              {section.subHeading && (
                                                <div>
                                                  <span className="text-sm font-medium text-gray-600">Subheading:</span>
                                                  <p className="text-sm">{section.subHeading}</p>
                                                </div>
                                              )}
                                              {section.body && (
                                                <div>
                                                  <span className="text-sm font-medium text-gray-600">Body:</span>
                                                  <p className="text-sm line-clamp-3">{section.body}</p>
                                                </div>
                                              )}
                                              <div>
                                                <span className="text-sm font-medium text-gray-600">Orientation:</span>
                                                <p className="text-sm capitalize">{section.orientation || 'left'}</p>
                                              </div>
                                            </div>
                                          </div>
                                          {section.imageUrl && (
                                            <div>
                                              <h5 className="font-medium text-gray-700 mb-2">Image:</h5>
                                              <img
                                                src={section.imageUrl}
                                                alt="Section preview"
                                                className="w-full h-32 object-cover rounded border"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="carousel">
                      <Card>
                        <CardHeader>
                          <CardTitle>Carousel Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {loadingCarousel ? (
                            <div className="flex items-center justify-center py-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ngo-color6"></div>
                            </div>
                          ) : existingCarousel ? (
                            <div className="mb-6">
                              <h3 className="text-md font-medium mb-3 text-gray-700">Current Carousel Images</h3>
                              {existingCarousel.images && existingCarousel.images.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {(existingCarousel.images || []).map((image, idx) => (
                                    <div key={image._id} className="relative group bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                      <img
                                        src={image.url}
                                        alt={`Carousel ${idx + 1}`}
                                        className="w-full h-48 object-cover"
                                      />
                                      <div className="p-3">
                                        <div className="text-sm text-gray-600">
                                          Image {idx + 1} of {existingCarousel.images?.length || 0}
                                        </div>
                                        {image.heading && (
                                          <div className="text-xs text-gray-500 mt-1 truncate">
                                            Heading: {image.heading}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                                  <div className="text-gray-500 mb-2">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                  <p className="text-gray-600 font-medium">No images present in the carousel yet</p>
                                  <p className="text-gray-500 text-sm">Upload images to populate the carousel for this page</p>
                                </div>
                              )}
                              <div className="text-sm text-gray-500 mt-2">
                                Last updated: {existingCarousel.updatedAt ? new Date(existingCarousel.updatedAt).toLocaleDateString() : 'N/A'}
                              </div>
                            </div>
                          ) : (
                            <div className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                              <div className="text-gray-500 mb-2">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <p className="text-gray-600 font-medium">No carousel images found</p>
                              <p className="text-gray-500 text-sm">Upload images to create a carousel for this page</p>
                            </div>
                          )}
                          <Separator />
                          <div className="space-y-4">
                            <h3 className="text-md font-medium">
                              {existingCarousel ? "Add More Images" : "Upload Carousel Images"}
                            </h3>
                            <form onSubmit={handleCarouselSubmit} encType="multipart/form-data" className="space-y-4">
                              <div className="space-y-2">
                                <label htmlFor="carousel-images" className="block text-sm font-medium">
                                  Select Images
                                </label>
                                <input
                                  id="carousel-images"
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  ref={fileInputRef}
                                  onChange={handleImageChange}
                                  disabled={carouselImages.length >= MAX_IMAGES || uploading}
                                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ngo-color6 file:text-white hover:file:bg-ngo-color5"
                                />
                                <div className="text-xs text-gray-500">
                                  Recommended size: <span className="font-medium">23:9 aspect ratio, at least 1840x720px</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  Max {MAX_IMAGES} images, {MAX_SIZE_MB}MB each. Current: {carouselImages.length}/{MAX_IMAGES}
                                </div>
                                <div className="text-xs text-gray-500">
                                  <span className="font-bold">Note for Carousel Image Upload:</span>
                                  <ul className="list-disc pl-4">
                                    <li>You can upload up to 3 images for the carousel section.</li>
                                    <li>You may add 1, 2, or all 3 images at once during the first upload.</li>
                                    <li>If you want to update the carousel images later, you must re-upload all 3 images together.</li>
                                    <li>Even if you want to change only 1 or 2 images, you still need to upload the remaining existing images again.</li>
                                    <li>If you upload only 1 or 2 images during update, the previous images will be replaced and only the newly uploaded ones will be shown.</li>
                                  </ul>
                                </div>
                              </div>
                              {carouselImages.length > 0 && (
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">Selected Images Preview</label>
                                  <div className="flex gap-4 flex-wrap">
                                    {carouselImages.map((img, idx) => (
                                      <div key={idx} className="relative group">
                                        <img
                                          src={URL.createObjectURL(img)}
                                          alt={`preview-${idx}`}
                                          className="w-32 h-20 object-cover border rounded shadow-sm"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveImage(idx)}
                                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                                          title="Remove"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <Button
                                type="submit"
                                disabled={uploading || carouselImages.length === 0}
                                className="bg-ngo-color6 hover:bg-ngo-color5"
                              >
                                {uploading ? (
                                  <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Uploading...
                                  </div>
                                ) : (
                                  "Upload Carousel Images"
                                )}
                              </Button>
                            </form>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="videos">
                      <Card>
                        <CardHeader>
                          <CardTitle>Video Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-md font-medium">
                              {editingVideoCardId ? "Edit Video Card" : "Add New Video Card"}
                            </h3>
                            <form onSubmit={handleVideoCardSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-medium">Title</label>
                                <input
                                  id="title"
                                  name="title"
                                  type="text"
                                  placeholder="Video title"
                                  value={videoCardForm.title || ""}
                                  onChange={handleVideoCardInput}
                                  className="border rounded px-3 py-2 w-full"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="duration" className="block text-sm font-medium">Duration</label>
                                <input
                                  id="duration"
                                  name="duration"
                                  type="text"
                                  placeholder="e.g., 5:32"
                                  value={videoCardForm.duration || ""}
                                  onChange={handleVideoCardInput}
                                  className="border rounded px-3 py-2 w-full"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="thumbnail" className="block text-sm font-medium">Thumbnail</label>
                                <input
                                  id="thumbnail"
                                  name="thumbnail"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleVideoCardInput}
                                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ngo-color6 file:text-white hover:file:bg-ngo-color5"
                                />
                                <div className="text-xs text-gray-500">
                                  Max {MAX_SIZE_MB}MB. Only image files are allowed.
                                </div>
                                {videoCardForm.thumbnail && (
                                  <div className="mt-2 relative group">
                                    <img
                                      src={videoCardForm.thumbnail}
                                      alt="Thumbnail preview"
                                      className="w-32 h-24 object-cover border rounded shadow-sm"
                                    />
                                    {/* <button
                                      type="button"
                                      onClick={handleRemoveThumbnail}
                                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                                      title="Remove"
                                    >
                                      ×
                                    </button> */}
                                  </div>
                                )}
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="videoUrl" className="block text-sm font-medium">Video URL</label>
                                <input
                                  id="videoUrl"
                                  name="videoUrl"
                                  type="url"
                                  placeholder="https://example.com/video"
                                  value={videoCardForm.videoUrl || ""}
                                  onChange={handleVideoCardInput}
                                  className="border rounded px-3 py-2 w-full"
                                  required
                                />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                                <textarea
                                  id="description"
                                  name="description"
                                  placeholder="Video description"
                                  value={videoCardForm.description || ""}
                                  onChange={handleVideoCardInput}
                                  className="border rounded px-3 py-2 w-full min-h-[100px]"
                                  required
                                />
                              </div>
                              <div className="flex gap-3 md:col-span-2">
                                <Button
                                  type="submit"
                                  className="bg-ngo-color6 hover:bg-ngo-color5"
                                  disabled={videoCardUploading}
                                >
                                  {editingVideoCardId ? (videoCardUploading ? "Updating..." : "Update Video Card") : (videoCardUploading ? "Adding..." : "Add Video Card")}
                                </Button>
                                {editingVideoCardId && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                      setVideoCardForm({});
                                      setThumbnailFile(null);
                                      setEditingVideoCardId(null);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </form>
                          </div>
                          {/* Rest of the code remains the same */}
                          <Separator />
                          <div className="space-y-4">
                            <h3 className="text-md font-medium">Current Video Cards</h3>
                            {loadingVideoCards ? (
                              <div className="text-center py-8 text-gray-500">Loading video cards...</div>
                            ) : videoCards.length === 0 ? (
                              <div className="text-center py-8 text-gray-500">No video cards found for this page.</div>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {videoCards.map((card) => (
                                  <div key={card._id} className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2">
                                    <img
                                      src={card.thumbnail}
                                      alt={card.title}
                                      className="w-full h-40 object-cover rounded mb-2"
                                    />
                                    <div className="font-semibold text-lg text-ngo-color6">{card.title}</div>
                                    <div className="text-sm text-gray-600 mb-1 line-clamp-2">{card.description}</div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <span>Duration: {card.duration}</span>
                                      <a href={card.videoUrl} target="_blank" rel="noopener noreferrer" className="text-ngo-color4 underline ml-auto">
                                        Watch
                                      </a>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <Button
                                        size="sm"
                                        onClick={() => handleEditVideoCard(card)}
                                        className="bg-ngo-color6 hover:bg-ngo-color5"
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDeleteVideoCard(card._id)}
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                );
              default:
                return (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Content management for <b>{currentSubmenu?.label}</b> coming soon...</p>
                  </div>
                );
            }
          })()}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteNavigationSection;