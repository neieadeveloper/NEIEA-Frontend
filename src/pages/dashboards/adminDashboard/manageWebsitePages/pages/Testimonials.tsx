import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ImageUpload from '@/components/ui/image-upload';
import { 
  cardTestimonialsApi, 
  videoTestimonialsApi, 
  featuredStoriesApi,
  reorderTestimonials,
  CardTestimonial, 
  VideoTestimonial,
  FeaturedStory
} from '@/lib/testimonialsApi';
import { CharacterCounter } from '@/components/ui/character-counter';

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState('card');
  const [cardTestimonials, setCardTestimonials] = useState<CardTestimonial[]>([]);
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>([]);
  const [featuredStories, setFeaturedStories] = useState<FeaturedStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editingVideo, setEditingVideo] = useState<string | null>(null);
  const [editingStory, setEditingStory] = useState<string | null>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [isAddingStory, setIsAddingStory] = useState(false);

  // Card Testimonial Form State
  const [cardForm, setCardForm] = useState({
    name: '',
    role: '',
    location: '',
    image: '',
    content: ''
  });
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);

  // Refs for edit forms to scroll into view
  const cardEditFormRef = useRef<HTMLDivElement>(null);
  const videoEditFormRef = useRef<HTMLDivElement>(null);
  const storyEditFormRef = useRef<HTMLDivElement>(null);

  // Video Testimonial Form State
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    type: '',
    duration: '',
    videoUrl: '',
    videoType: 'Video' as 'Video' | 'Short', // New: Video type dropdown
    videoTag: '', // New: Video tag text
    rating: 0 // New: Rating out of 5
  });

  // Featured Story Form State
  const [storyForm, setStoryForm] = useState({
    heading: '',
    subHeading: '',
    story: ''
  });

  // Load data on component mount
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const [cards, videos, stories] = await Promise.all([
        cardTestimonialsApi.getAll(),
        videoTestimonialsApi.getAll(),
        featuredStoriesApi.getAll()
      ]);
      
      // Sort by display_order
      setCardTestimonials(cards.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
      setVideoTestimonials(videos.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
      setFeaturedStories(stories.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
    } catch (err) {
      setError('Failed to load testimonials');
      toast.error('Failed to load testimonials');
      console.error('Error loading testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  // Card Testimonial Functions
  const handleAddCard = () => {
    setIsAddingCard(true);
    setCardForm({ name: '', role: '', location: '', image: '', content: '' });
    setCardImageFile(null);
    
    // Scroll to edit form
    setTimeout(() => {
      cardEditFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleEditCard = (testimonial: CardTestimonial) => {
    setEditingCard(testimonial._id!);
    setCardForm({
      name: testimonial.name,
      role: testimonial.role,
      location: testimonial.location,
      image: testimonial.image,
      content: testimonial.content
    });
    setCardImageFile(null); // Reset file when editing existing testimonial
    
    // Scroll to edit form
    setTimeout(() => {
      cardEditFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSaveCard = async () => {
    if (!cardForm.name || !cardForm.content) {
      toast.error('Name and testimonial content are required');
      return;
    }

    if (!cardForm.image) {
      toast.error('Profile image is required');
      return;
    }

    try {
      if (editingCard) {
        await cardTestimonialsApi.update(editingCard, cardForm, cardImageFile || undefined);
        toast.success('Testimonial updated successfully');
      } else {
        await cardTestimonialsApi.create(cardForm, cardImageFile || undefined);
        toast.success('Testimonial added successfully');
      }
      await loadTestimonials(); // Reload data
      handleCancelCard();
    } catch (err) {
      toast.error('Failed to save testimonial');
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await cardTestimonialsApi.delete(id);
        toast.success('Testimonial deleted successfully');
        await loadTestimonials(); // Reload data
      } catch (err) {
        toast.error('Failed to delete testimonial');
      }
    }
  };

  const handleCancelCard = () => {
    setEditingCard(null);
    setIsAddingCard(false);
    setCardForm({ name: '', role: '', location: '', image: '', content: '' });
    setCardImageFile(null);
  };

  // Card Testimonial Drag and Drop Functions
  const handleCardDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleCardDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
  };

  const handleCardDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCardDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex !== dropIndex) {
      const newArray = [...cardTestimonials];
      const draggedItem = newArray[dragIndex];
      newArray.splice(dragIndex, 1);
      newArray.splice(dropIndex, 0, draggedItem);
      
      setCardTestimonials(newArray);
      
      // Save new order to backend
      try {
        const reorderData = newArray.map((item, index) => ({
          id: item._id!,
          display_order: index + 1
        }));
        
        await reorderTestimonials({ type: 'cards', items: reorderData });
        toast.success('Testimonial order updated');
      } catch (err) {
        toast.error('Failed to update order');
        await loadTestimonials(); // Revert on error
      }
    }
  };

  // Video Testimonial Functions
  const handleAddVideo = () => {
    setIsAddingVideo(true);
    setVideoForm({ 
      title: '', 
      description: '', 
      type: '', 
      duration: '', 
      videoUrl: '',
      videoType: 'Video',
      videoTag: '',
      rating: 0
    });
    
    // Scroll to edit form
    setTimeout(() => {
      videoEditFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleEditVideo = (testimonial: VideoTestimonial) => {
    setEditingVideo(testimonial._id!);
    setVideoForm({
      title: testimonial.title,
      description: testimonial.description,
      type: testimonial.type,
      duration: testimonial.duration,
      videoUrl: testimonial.videoUrl,
      videoType: testimonial.videoType || 'Video',
      videoTag: testimonial.videoTag || '',
      rating: testimonial.rating || 0
    });
    
    // Scroll to edit form
    setTimeout(() => {
      videoEditFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSaveVideo = async () => {
    if (!videoForm.title || !videoForm.videoUrl) {
      toast.error('Title and video URL are required');
      return;
    }

    try {
      if (editingVideo) {
        await videoTestimonialsApi.update(editingVideo, videoForm);
        toast.success('Video testimonial updated successfully');
      } else {
        await videoTestimonialsApi.create(videoForm);
        toast.success('Video testimonial added successfully');
      }
      await loadTestimonials(); // Reload data
      handleCancelVideo();
    } catch (err) {
      toast.error('Failed to save video testimonial');
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video testimonial?')) {
      try {
        await videoTestimonialsApi.delete(id);
        toast.success('Video testimonial deleted successfully');
        await loadTestimonials(); // Reload data
      } catch (err) {
        toast.error('Failed to delete video testimonial');
      }
    }
  };

  const handleCancelVideo = () => {
    setEditingVideo(null);
    setIsAddingVideo(false);
    setVideoForm({ 
      title: '', 
      description: '', 
      type: '', 
      duration: '', 
      videoUrl: '',
      videoType: 'Video',
      videoTag: '',
      rating: 0
    });
  };

  // Video Testimonial Drag and Drop Functions
  const handleVideoDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleVideoDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
  };

  const handleVideoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleVideoDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex !== dropIndex) {
      const newArray = [...videoTestimonials];
      const draggedItem = newArray[dragIndex];
      newArray.splice(dragIndex, 1);
      newArray.splice(dropIndex, 0, draggedItem);
      
      setVideoTestimonials(newArray);
      
      // Save new order to backend
      try {
        const reorderData = newArray.map((item, index) => ({
          id: item._id!,
          display_order: index + 1
        }));
        
        await reorderTestimonials({ type: 'videos', items: reorderData });
        toast.success('Video testimonial order updated');
      } catch (err) {
        toast.error('Failed to update order');
        await loadTestimonials(); // Revert on error
      }
    }
  };

  const extractVideoId = (url: string) => {
    if (url.includes('shorts')) {
      return url.split('/shorts/')[1];
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('v=')) {
      return url.split('v=')[1]?.split('&')[0];
    }
    return '';
  };

  // Featured Story Functions
  const handleAddStory = () => {
    setIsAddingStory(true);
    setStoryForm({ heading: '', subHeading: '', story: '' });
    
    // Scroll to edit form
    setTimeout(() => {
      storyEditFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleEditStory = (story: FeaturedStory) => {
    setEditingStory(story._id!);
    setStoryForm({
      heading: story.heading,
      subHeading: story.subHeading,
      story: story.story
    });
    
    // Scroll to edit form
    setTimeout(() => {
      storyEditFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSaveStory = async () => {
    if (!storyForm.heading || !storyForm.subHeading || !storyForm.story) {
      toast.error('Heading, subHeading, and story are required');
      return;
    }

    if (storyForm.heading.length > 200) {
      toast.error('Heading must be less than 200 characters');
      return;
    }

    if (storyForm.subHeading.length > 300) {
      toast.error('SubHeading must be less than 300 characters');
      return;
    }

    if (storyForm.story.length > 5000) {
      toast.error('Story must be less than 5000 characters');
      return;
    }

    try {
      if (editingStory) {
        await featuredStoriesApi.update(editingStory, storyForm);
        toast.success('Featured story updated successfully');
      } else {
        await featuredStoriesApi.create(storyForm);
        toast.success('Featured story added successfully');
      }
      await loadTestimonials(); // Reload data
      handleCancelStory();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to save featured story');
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this featured story?')) {
      try {
        await featuredStoriesApi.delete(id);
        toast.success('Featured story deleted successfully');
        await loadTestimonials(); // Reload data
      } catch (err) {
        toast.error('Failed to delete featured story');
      }
    }
  };

  const handleCancelStory = () => {
    setEditingStory(null);
    setIsAddingStory(false);
    setStoryForm({ heading: '', subHeading: '', story: '' });
  };

  // Add loading and error states to your JSX
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Testimonials</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Testimonials</h1>
        <p className="text-gray-600">Manage card testimonials and video testimonials for the website</p>
      </div>

      {/* Ordering Instructions */}
      {/* <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <GripVertical className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Easy Reordering</h3>
            <p className="text-sm text-blue-800">
              Simply drag and drop testimonials to reorder them! Click and hold the grip handle (⋮⋮) on the left, 
              then drag the testimonial to your desired position. The order you set here will be the same order displayed on the website.
            </p>
          </div>
        </div>
      </div> */}

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('card')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'card' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Card Testimonials ({cardTestimonials.length})
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'video' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Video Testimonials ({videoTestimonials.length})
        </button>
        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'stories' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Featured Stories ({featuredStories.length})
        </button>
      </div>

      {/* Card Testimonials Tab */}
      {activeTab === 'card' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Card Testimonials</h2>
            <Button onClick={handleAddCard} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Testimonial
            </Button>
          </div>

          {/* Add/Edit Form */}
          {(isAddingCard || editingCard) && (
            <Card ref={cardEditFormRef} className="mb-6">
              <CardHeader>
                <CardTitle>{editingCard ? 'Edit Testimonial' : 'Add New Testimonial'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <Input
                      value={cardForm.name}
                      onChange={(e) => setCardForm({...cardForm, name: e.target.value})}
                      placeholder="Enter person's name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role/Title
                    </label>
                    <Input
                      value={cardForm.role}
                      onChange={(e) => setCardForm({...cardForm, role: e.target.value})}
                      placeholder="e.g., Student, Teacher, Parent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <Input
                      value={cardForm.location}
                      onChange={(e) => setCardForm({...cardForm, location: e.target.value})}
                      placeholder="e.g., Mumbai, Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Image *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 400x400px (square), Max 2MB, JPG/PNG/WebP format</p>
                    <ImageUpload
                      value={cardForm.image}
                      onChange={(file, previewUrl) => {
                        setCardImageFile(file);
                        setCardForm({...cardForm, image: previewUrl});
                      }}
                      placeholder="Upload testimonial image"
                      required={true}
                      previewSize="md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonial Content *
                  </label>
                  <p className="text-xs mb-2 font-semibold text-red-600">
                    Ensure the text length is between 400 and 600 characters.
                  </p>
                  <Textarea
                    value={cardForm.content}
                    onChange={(e) => setCardForm({...cardForm, content: e.target.value})}
                    placeholder="Enter the testimonial text..."
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveCard} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingCard ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelCard} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Card Testimonials List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardTestimonials.map((testimonial, index) => (
              <Card 
                key={testimonial._id} 
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleCardDragStart(e, index)}
                onDragEnd={handleCardDragEnd}
                onDragOver={handleCardDragOver}
                onDrop={(e) => handleCardDrop(e, index)}
              >
                {/* Drag Handle */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center">
                    <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
                    <div className="text-xs text-gray-500 font-medium">
                      #{index + 1}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4 pt-8">
                  <div className="flex items-center mb-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/defaultProfile2.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditCard(testimonial)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCard(testimonial._id!)}
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

      {/* Video Testimonials Tab */}
      {activeTab === 'video' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Video Testimonials</h2>
            <Button onClick={handleAddVideo} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Video
            </Button>
          </div>

          {/* Add/Edit Form */}
          {(isAddingVideo || editingVideo) && (
            <Card ref={videoEditFormRef} className="mb-6">
              <CardHeader>
                <CardTitle>{editingVideo ? 'Edit Video Testimonial' : 'Add New Video Testimonial'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video Title *
                    </label>
                    <Input
                      value={videoForm.title}
                      onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                      placeholder="Enter video title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video Type *
                    </label>
                    <select
                      value={videoForm.videoType}
                      onChange={(e) => setVideoForm({...videoForm, videoType: e.target.value as 'Video' | 'Short'})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Video">Video</option>
                      <option value="Short">Short</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video Tag
                    </label>
                    <Input
                      value={videoForm.videoTag}
                      onChange={(e) => setVideoForm({...videoForm, videoTag: e.target.value})}
                      placeholder="e.g., Success Story, Inspiring Journey"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating (0-5)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      step="0.5"
                      value={videoForm.rating}
                      onChange={(e) => setVideoForm({...videoForm, rating: parseFloat(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <Input
                      value={videoForm.duration}
                      onChange={(e) => setVideoForm({...videoForm, duration: e.target.value})}
                      placeholder="e.g., 5 min, 30 sec"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      YouTube URL *
                    </label>
                    <Input
                      value={videoForm.videoUrl}
                      onChange={(e) => setVideoForm({...videoForm, videoUrl: e.target.value})}
                      placeholder="https://youtu.be/VIDEO_ID"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    value={videoForm.description}
                    onChange={(e) => setVideoForm({...videoForm, description: e.target.value})}
                    placeholder="Enter video description..."
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveVideo} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingVideo ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelVideo} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Video Testimonials List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoTestimonials.map((video, index) => (
              <Card 
                key={video._id} 
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleVideoDragStart(e, index)}
                onDragEnd={handleVideoDragEnd}
                onDragOver={handleVideoDragOver}
                onDrop={(e) => handleVideoDrop(e, index)}
              >
                {/* Drag Handle */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center">
                    <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
                    <div className="text-xs text-gray-500 font-medium">
                      #{index + 1}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 pt-8">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${extractVideoId(video.videoUrl)}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{video.title}</h3>
                    <div className="flex gap-2">
                      {video.videoTag && (
                        <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                          {video.videoTag}
                        </Badge>
                      )}
                      <Badge variant="secondary">{video.videoType || video.type}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                  {/* Rating Display */}
                  {video.rating && video.rating > 0 && (
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              video.rating && video.rating >= i + 1
                                ? 'text-yellow-400 fill-current'
                                : video.rating && video.rating > i && video.rating < i + 1
                                ? 'text-yellow-400 fill-current opacity-50'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({video.rating.toFixed(1)}/5)
                      </span>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditVideo(video)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteVideo(video._id!)}
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

      {/* Featured Stories Tab */}
      {activeTab === 'stories' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Featured Stories</h2>
            <Button onClick={handleAddStory} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Story
            </Button>
          </div>

          {/* Add/Edit Form */}
          {(isAddingStory || editingStory) && (
            <Card ref={storyEditFormRef} className="mb-6">
              <CardHeader>
                <CardTitle>{editingStory ? 'Edit Featured Story' : 'Add New Featured Story'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading *
                  </label>
                  <Input
                    value={storyForm.heading}
                    onChange={(e) => setStoryForm({...storyForm, heading: e.target.value})}
                    placeholder="Enter story heading"
                    maxLength={200}
                  />
                  <CharacterCounter current={storyForm.heading.length} max={200} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SubHeading *
                  </label>
                  <Input
                    value={storyForm.subHeading}
                    onChange={(e) => setStoryForm({...storyForm, subHeading: e.target.value})}
                    placeholder="Enter story subheading"
                    maxLength={300}
                  />
                  <CharacterCounter current={storyForm.subHeading.length} max={300} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Story *
                  </label>
                  <Textarea
                    value={storyForm.story}
                    onChange={(e) => setStoryForm({...storyForm, story: e.target.value})}
                    placeholder="Enter the full story..."
                    rows={8}
                    maxLength={5000}
                  />
                  <CharacterCounter current={storyForm.story.length} max={5000} />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveStory} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingStory ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelStory} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Featured Stories List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <Card key={story._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {story.heading}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {story.subHeading}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-4">
                      {story.story}
                    </p>
                  </div>
                  <div className="flex space-x-2 pt-4 border-t">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditStory(story)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteStory(story._id!)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {featuredStories.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No featured stories yet. Click "Add New Story" to create one.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
