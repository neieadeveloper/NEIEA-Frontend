import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

const MAX_IMAGES = 6;
const MAX_SIZE_MB = 2;

// Interfaces for different section types
interface HeroImage {
  _id?: string;
  name: string;
  url: string;
  alt: string;
  position?: string;
}

interface VisionMissionContent {
  _id?: string;
  section: 'vision' | 'mission';
  title: string;
  content: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

interface LeadershipContent {
  _id?: string;
  title: string;
  subtitle: string;
  name: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
}

interface InnovationContent {
  _id?: string;
  title: string;
  content: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
}

interface PartnershipContent {
  _id?: string;
  title: string;
  content: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
}

interface Statistic {
  _id?: string;
  number: string;
  label: string;
  color: string;
  order: number;
}

interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

const ManageLandingPages = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [loading, setLoading] = useState(false);
  
  // Hero Section State
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [heroImageFiles, setHeroImageFiles] = useState<File[]>([]);
  
  // Vision Mission State
  const [visionContent, setVisionContent] = useState<VisionMissionContent>({
    section: 'vision',
    title: '',
    content: '',
    imageUrl: '',
    buttonText: '',
    buttonUrl: ''
  });
  const [missionContent, setMissionContent] = useState<VisionMissionContent>({
    section: 'mission',
    title: '',
    content: '',
    imageUrl: '',
    buttonText: '',
    buttonUrl: ''
  });
  
  // Leadership State
  const [leadershipContent, setLeadershipContent] = useState<LeadershipContent>({
    title: '',
    subtitle: '',
    name: '',
    description: '',
    imageUrl: '',
    buttonText: '',
    buttonUrl: ''
  });
  
  // Innovation State
  const [innovationContent, setInnovationContent] = useState<InnovationContent>({
    title: '',
    content: '',
    imageUrl: '',
    buttonText: '',
    buttonUrl: ''
  });
  
  // Partnership State
  const [partnershipContent, setPartnershipContent] = useState<PartnershipContent>({
    title: '',
    content: '',
    imageUrl: '',
    buttonText: '',
    buttonUrl: ''
  });
  
  // Statistics State
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [newStatistic, setNewStatistic] = useState<Omit<Statistic, '_id'>>({
    number: '',
    label: '',
    color: 'blue',
    order: 0
  });
  
  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, '_id'>>({
    name: '',
    role: '',
    content: '',
    rating: 5
  });


  // Load all content on component mount
  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadHeroImages(),
        loadVisionMissionContent(),
        loadLeadershipContent(),
        loadInnovationContent(),
        loadPartnershipContent(),
        loadStatistics(),
        loadTestimonials()
      ]);
    } catch (error) {
      console.error('Error loading content:', error);
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  // Hero Images Management
  const loadHeroImages = async () => {
    try {
      const response = await axiosInstance.get('/admin/home/hero-images');
      if (response.data.success) {
        setHeroImages(response.data.data);
      }
    } catch (error) {
      console.error('Error loading hero images:', error);
    }
  };

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`Each image must be less than ${MAX_SIZE_MB}MB.`);
        return;
      }
    }
    if (heroImageFiles.length + files.length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }
    setHeroImageFiles((prev) => [...prev, ...files].slice(0, MAX_IMAGES));
  };

  const saveHeroImages = async () => {
    if (heroImageFiles.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }
    
    setLoading(true);
    try {
      const formData = new FormData();
      heroImageFiles.forEach((file, index) => {
        formData.append('images', file);
        formData.append(`names`, `hero-${index + 1}`);
      });
      
      const response = await axiosInstance.post('/admin/home/hero-images', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (response.data.success) {
        toast.success("Hero images saved successfully!");
        setHeroImageFiles([]);
        loadHeroImages();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save hero images.");
    } finally {
      setLoading(false);
    }
  };

  // Vision Mission Management
  const loadVisionMissionContent = async () => {
    try {
      const [visionRes, missionRes] = await Promise.all([
        axiosInstance.get('/admin/home/vision'),
        axiosInstance.get('/admin/home/mission')
      ]);
      
      if (visionRes.data.success) {
        setVisionContent(visionRes.data.data);
      }
      if (missionRes.data.success) {
        setMissionContent(missionRes.data.data);
      }
    } catch (error) {
      console.error('Error loading vision/mission content:', error);
    }
  };

  const saveVisionMissionContent = async (content: VisionMissionContent) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/admin/home/${content.section}`, content);
      if (response.data.success) {
        toast.success(`${content.section.charAt(0).toUpperCase() + content.section.slice(1)} content saved successfully!`);
        loadVisionMissionContent();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || `Failed to save ${content.section} content.`);
    } finally {
      setLoading(false);
    }
  };

  // Leadership Management
  const loadLeadershipContent = async () => {
    try {
      const response = await axiosInstance.get('/admin/home/leadership');
      if (response.data.success) {
        setLeadershipContent(response.data.data);
      }
    } catch (error) {
      console.error('Error loading leadership content:', error);
    }
  };

  const saveLeadershipContent = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/admin/home/leadership', leadershipContent);
      if (response.data.success) {
        toast.success("Leadership content saved successfully!");
        loadLeadershipContent();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save leadership content.");
    } finally {
      setLoading(false);
    }
  };

  // Innovation Management
  const loadInnovationContent = async () => {
    try {
      const response = await axiosInstance.get('/admin/home/innovation');
      if (response.data.success) {
        setInnovationContent(response.data.data);
      }
    } catch (error) {
      console.error('Error loading innovation content:', error);
    }
  };

  const saveInnovationContent = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/admin/home/innovation', innovationContent);
      if (response.data.success) {
        toast.success("Innovation content saved successfully!");
        loadInnovationContent();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save innovation content.");
    } finally {
      setLoading(false);
    }
  };

  // Partnership Management
  const loadPartnershipContent = async () => {
    try {
      const response = await axiosInstance.get('/admin/home/partnership');
      if (response.data.success) {
        setPartnershipContent(response.data.data);
      }
    } catch (error) {
      console.error('Error loading partnership content:', error);
    }
  };

  const savePartnershipContent = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/admin/home/partnership', partnershipContent);
      if (response.data.success) {
        toast.success("Partnership content saved successfully!");
        loadPartnershipContent();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save partnership content.");
    } finally {
      setLoading(false);
    }
  };

  // Statistics Management
  const loadStatistics = async () => {
    try {
      const response = await axiosInstance.get('/admin/home/statistics');
      if (response.data.success) {
        setStatistics(response.data.data);
      }
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const addStatistic = async () => {
    if (!newStatistic.number || !newStatistic.label) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axiosInstance.post('/admin/home/statistics', newStatistic);
      if (response.data.success) {
        toast.success("Statistic added successfully!");
        setNewStatistic({ number: '', label: '', color: 'blue', order: statistics.length });
        loadStatistics();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add statistic.");
    } finally {
      setLoading(false);
    }
  };

  const deleteStatistic = async (id: string) => {
    if (!confirm("Are you sure you want to delete this statistic?")) return;
    
    try {
      const response = await axiosInstance.delete(`/admin/home/statistics/${id}`);
      if (response.data.success) {
        toast.success("Statistic deleted successfully!");
        loadStatistics();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete statistic.");
    }
  };

  // Testimonials Management
  const loadTestimonials = async () => {
    try {
      const response = await axiosInstance.get('/admin/home/testimonials');
      if (response.data.success) {
        setTestimonials(response.data.data);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const addTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.content) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axiosInstance.post('/admin/home/testimonials', newTestimonial);
      if (response.data.success) {
        toast.success("Testimonial added successfully!");
        setNewTestimonial({ name: '', role: '', content: '', rating: 5 });
        loadTestimonials();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add testimonial.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
    try {
      const response = await axiosInstance.delete(`/admin/home/testimonials/${id}`);
      if (response.data.success) {
        toast.success("Testimonial deleted successfully!");
        loadTestimonials();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete testimonial.");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Landing Pages</h1>
        <p className="text-gray-600 mt-2">Dynamically manage all sections of your landing pages</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="hero">Hero Carousel</TabsTrigger>
          <TabsTrigger value="vision">Vision</TabsTrigger>
          <TabsTrigger value="mission">Mission</TabsTrigger>
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
          <TabsTrigger value="innovation">Innovation</TabsTrigger>
          <TabsTrigger value="partnership">Partnership</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        {/* Hero Carousel Tab */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Carousel Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Upload Hero Images</h3>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleHeroImageChange}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                <p className="text-sm text-gray-500">
                  Max {MAX_IMAGES} images, {MAX_SIZE_MB}MB each. Current: {heroImageFiles.length}/{MAX_IMAGES}
                </p>
                
                {heroImageFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {heroImageFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setHeroImageFiles(prev => prev.filter((_, i) => i !== index))}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button
                  onClick={saveHeroImages}
                  disabled={loading || heroImageFiles.length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? "Saving..." : "Save Hero Images"}
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Hero Images</h3>
                {heroImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {heroImages.map((image, index) => (
                      <div key={image._id || index} className="relative">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No hero images uploaded yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vision Tab */}
        <TabsContent value="vision">
          <Card>
            <CardHeader>
              <CardTitle>Vision Section Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={visionContent.title}
                      onChange={(e) => setVisionContent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter vision title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      value={visionContent.content}
                      onChange={(e) => setVisionContent(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                      placeholder="Enter vision content"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Button Text</label>
                    <input
                      type="text"
                      value={visionContent.buttonText || ''}
                      onChange={(e) => setVisionContent(prev => ({ ...prev, buttonText: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter button text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Button URL</label>
                    <input
                      type="url"
                      value={visionContent.buttonUrl || ''}
                      onChange={(e) => setVisionContent(prev => ({ ...prev, buttonUrl: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter button URL"
                    />
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => saveVisionMissionContent(visionContent)}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Save Vision Content"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mission Tab */}
        <TabsContent value="mission">
          <Card>
            <CardHeader>
              <CardTitle>Mission Section Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={missionContent.title}
                      onChange={(e) => setMissionContent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter mission title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      value={missionContent.content}
                      onChange={(e) => setMissionContent(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                      placeholder="Enter mission content"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Button Text</label>
                    <input
                      type="text"
                      value={missionContent.buttonText || ''}
                      onChange={(e) => setMissionContent(prev => ({ ...prev, buttonText: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter button text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Button URL</label>
                    <input
                      type="url"
                      value={missionContent.buttonUrl || ''}
                      onChange={(e) => setMissionContent(prev => ({ ...prev, buttonUrl: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter button URL"
                    />
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => saveVisionMissionContent(missionContent)}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Save Mission Content"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leadership Tab */}
        <TabsContent value="leadership">
          <Card>
            <CardHeader>
              <CardTitle>Leadership Section Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Section Title</label>
                    <input
                      type="text"
                      value={leadershipContent.title}
                      onChange={(e) => setLeadershipContent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter section title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={leadershipContent.subtitle}
                      onChange={(e) => setLeadershipContent(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter subtitle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Leader Name</label>
                    <input
                      type="text"
                      value={leadershipContent.name}
                      onChange={(e) => setLeadershipContent(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter leader name"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={leadershipContent.description}
                      onChange={(e) => setLeadershipContent(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                      placeholder="Enter leader description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Button Text</label>
                    <input
                      type="text"
                      value={leadershipContent.buttonText}
                      onChange={(e) => setLeadershipContent(prev => ({ ...prev, buttonText: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter button text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Button URL</label>
                    <input
                      type="url"
                      value={leadershipContent.buttonUrl}
                      onChange={(e) => setLeadershipContent(prev => ({ ...prev, buttonUrl: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter button URL"
                    />
                  </div>
                </div>
              </div>
              
              <Button
                onClick={saveLeadershipContent}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Save Leadership Content"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Innovation Tab */}
        <TabsContent value="innovation">
          <Card>
            <CardHeader>
              <CardTitle>Innovation Section Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={innovationContent.title}
                      onChange={(e) => setInnovationContent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter innovation title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      value={innovationContent.content}
                      onChange={(e) => setInnovationContent(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                      placeholder="Enter innovation content"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Button Text</label>
                    <input
                      type="text"
                      value={innovationContent.buttonText}
                      onChange={(e) => setInnovationContent(prev => ({ ...prev, buttonText: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter button text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Button URL</label>
                    <input
                      type="url"
                      value={innovationContent.buttonUrl}
                      onChange={(e) => setInnovationContent(prev => ({ ...prev, buttonUrl: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter button URL"
                    />
                  </div>
                </div>
              </div>
              
              <Button
                onClick={saveInnovationContent}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Save Innovation Content"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Partnership Tab */}
        <TabsContent value="partnership">
          <Card>
            <CardHeader>
              <CardTitle>Partnership Section Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={partnershipContent.title}
                      onChange={(e) => setPartnershipContent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter partnership title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      value={partnershipContent.content}
                      onChange={(e) => setPartnershipContent(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                      placeholder="Enter partnership content"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Button Text</label>
                    <input
                      type="text"
                      value={partnershipContent.buttonText}
                      onChange={(e) => setPartnershipContent(prev => ({ ...prev, buttonText: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter button text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Button URL</label>
                    <input
                      type="url"
                      value={partnershipContent.buttonUrl}
                      onChange={(e) => setPartnershipContent(prev => ({ ...prev, buttonUrl: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter button URL"
                    />
                  </div>
                </div>
              </div>
              
              <Button
                onClick={savePartnershipContent}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Save Partnership Content"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Statistics Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Add New Statistic</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Number</label>
                    <input
                      type="text"
                      value={newStatistic.number}
                      onChange={(e) => setNewStatistic(prev => ({ ...prev, number: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 16+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Label</label>
                    <input
                      type="text"
                      value={newStatistic.label}
                      onChange={(e) => setNewStatistic(prev => ({ ...prev, label: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Online Courses"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Color</label>
                    <select
                      value={newStatistic.color}
                      onChange={(e) => setNewStatistic(prev => ({ ...prev, color: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                      <option value="red">Red</option>
                      <option value="yellow">Yellow</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={addStatistic}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? "Adding..." : "Add Statistic"}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Statistics</h3>
                {statistics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statistics.map((stat) => (
                      <div key={stat._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className={`text-2xl font-bold text-${stat.color}-600`}>
                              {stat.number}
                            </div>
                            <div className="text-gray-600">{stat.label}</div>
                          </div>
                          <button
                            onClick={() => deleteStatistic(stat._id!)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No statistics added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Add New Testimonial</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <input
                      type="text"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter role"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      value={newTestimonial.content}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                      placeholder="Enter testimonial content"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <select
                      value={newTestimonial.rating}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={1}>1 Star</option>
                      <option value={2}>2 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={addTestimonial}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? "Adding..." : "Add Testimonial"}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Testimonials</h3>
                {testimonials.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {testimonials.map((testimonial) => (
                      <div key={testimonial._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm text-gray-600">{testimonial.role}</div>
                          </div>
                          <button
                            onClick={() => deleteTestimonial(testimonial._id!)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                        <div className="text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-700 italic">
                          "{testimonial.content}"
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No testimonials added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageLandingPages;
