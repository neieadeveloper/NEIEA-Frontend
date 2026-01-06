import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Users, UserCheck, Briefcase, Eye, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ImageUpload from '@/components/ui/image-upload';
import axiosInstance from '@/lib/axiosInstance';
import { DEFAULT_LEADERSHIP_HERO, LeadershipHeroSection, LeadershipMember, leadershipApi, reorderLeadership } from '@/lib/leadershipApi';
import BioPreview from '../components/Bio';

const Leadership = () => {
  const [activeTab, setActiveTab] = useState<'directors' | 'advisors' | 'staff'>('directors');
  const [members, setMembers] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [viewingBio, setViewingBio] = useState<LeadershipMember | null>(null);

  // Hero Section State
  const [heroSection, setHeroSection] = useState<LeadershipHeroSection>(DEFAULT_LEADERSHIP_HERO);
  const [heroLoading, setHeroLoading] = useState(true);
  const [savingHero, setSavingHero] = useState(false);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);

  // Form State
  const [memberForm, setMemberForm] = useState({
    name: '',
    title: '',
    description: '',
    image: '',
    hasImage: true,
    category: 'directors' as 'directors' | 'advisors' | 'staff'
  });
  const [memberImageFile, setMemberImageFile] = useState<File | null>(null);

  // Ref for edit form to scroll into view
  const editFormRef = useRef<HTMLDivElement>(null);

  // Function to decode HTML entities
  const decodeHtmlEntities = (text: string) => {
    if (!text) return text;
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Load data on component mount
  useEffect(() => {
    loadMembers();
    loadHeroSection();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leadershipApi.getAll();
      console.log('API Response:', data); // Debug log
      setMembers(data);
    } catch (err) {
      setError('Failed to load leadership members');
      console.error('Error loading leadership members:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadHeroSection = async () => {
    try {
      setHeroLoading(true);
      const response = await axiosInstance.get('/admin/leadership-page');

      if (response.data.success && response.data.data) {
        const hero = response.data.data.heroSection || DEFAULT_LEADERSHIP_HERO;
        setHeroSection({
          title: decodeHtmlEntities(hero.title) || DEFAULT_LEADERSHIP_HERO.title,
          description: decodeHtmlEntities(hero.description) || DEFAULT_LEADERSHIP_HERO.description,
          heroImage: hero.heroImage || DEFAULT_LEADERSHIP_HERO.heroImage
        });
      } else {
        setHeroSection(DEFAULT_LEADERSHIP_HERO);
      }

      setHeroImageFile(null);
      setHeroImagePreview(null);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setHeroSection(DEFAULT_LEADERSHIP_HERO);
      } else {
        console.error('Error loading leadership hero section:', err);
        toast.error(err?.response?.data?.message || 'Failed to load hero section');
      }
    } finally {
      setHeroLoading(false);
    }
  };

  const handleSaveHeroSection = async () => {
    if (!heroSection.title.trim() || !heroSection.description.trim()) {
      toast.error('Hero title and description are required');
      return;
    }

    try {
      setSavingHero(true);

      const payload = {
        heroSection: {
          title: heroSection.title.trim(),
          description: heroSection.description.trim(),
          heroImage: heroSection.heroImage || DEFAULT_LEADERSHIP_HERO.heroImage
        }
      };

      try {
        await axiosInstance.put('/admin/leadership-page', payload);
        toast.success('Hero section updated successfully');
      } catch (err: any) {
        if (err?.response?.status === 404) {
          await axiosInstance.post('/admin/leadership-page', payload);
          toast.success('Hero section created successfully');
        } else {
          throw err;
        }
      }

      await loadHeroSection();
    } catch (err: any) {
      console.error('Error saving leadership hero section:', err);
      toast.error(err?.response?.data?.message || 'Failed to save hero section');
    } finally {
      setSavingHero(false);
    }
  };

  const handleHeroImageUpload = async () => {
    if (!heroImageFile) {
      toast.error('Please select an image file');
      return;
    }

    try {
      setUploadingHeroImage(true);
      const formData = new FormData();
      formData.append('image', heroImageFile);

      const response = await axiosInstance.post(
        '/admin/leadership-page/upload-hero-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        const imageUrl = response.data?.data?.heroSection?.heroImage || response.data?.data?.image;
        if (imageUrl) {
          setHeroSection(prev => ({
            ...prev,
            heroImage: imageUrl
          }));
        }
        setHeroImageFile(null);
        setHeroImagePreview(null);
        toast.success('Hero image uploaded successfully');
      }
    } catch (err: any) {
      console.error('Error uploading hero image:', err);
      toast.error(err?.response?.data?.message || 'Failed to upload hero image');
    } finally {
      setUploadingHeroImage(false);
    }
  };

  const getCurrentMembers = () => {
    if (!members || !Array.isArray(members)) {
      console.log('No members or not array:', members); // Debug log
      return [];
    }
    const filtered = members.filter(member => member.category === activeTab);
    console.log('Filtered members for', activeTab, ':', filtered); // Debug log
    return filtered;
  };

  // Member Management Functions
  const handleAddMember = () => {
    setIsAddingMember(true);
    setMemberForm({ name: '', title: '', description: '', image: '', hasImage: true, category: activeTab });
    setMemberImageFile(null);
    
    // Scroll to edit form
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleEditMember = (member: LeadershipMember) => {
    setEditingMember(member._id!);
    setMemberForm({
      name: member.name,
      title: member.title,
      description: member.description,
      image: member.image,
      hasImage: member.hasImage ?? true,
      category: member.category
    });
    setMemberImageFile(null); // Reset file when editing existing member
    
    // Scroll to edit form
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSaveMember = async () => {
    if (!memberForm.name || !memberForm.title) {
      toast.error('Name and title are required');
      return;
    }

    const hasExistingImage = Boolean(editingMember && memberForm.image);
    const hasNewImage = Boolean(memberImageFile);
    if (!hasExistingImage && !hasNewImage) {
      toast.error('Profile image is required. Please upload an image before saving.');
      return;
    }

    try {
      if (editingMember) {
        await leadershipApi.update(editingMember, memberForm, memberImageFile || undefined);
        toast.success('Leadership member updated successfully');
      } else {
        await leadershipApi.create(memberForm, memberImageFile || undefined);
        toast.success('Leadership member added successfully');
      }
      await loadMembers(); // Reload data
      handleCancelMember();
    } catch (err) {
      toast.error('Failed to save leadership member');
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this leadership member?')) {
      try {
        await leadershipApi.delete(id);
        toast.success('Leadership member deleted successfully');
        await loadMembers(); // Reload data
      } catch (err) {
        toast.error('Failed to delete leadership member');
      }
    }
  };

  const handleCancelMember = () => {
    setEditingMember(null);
    setIsAddingMember(false);
    setMemberForm({ name: '', title: '', description: '', image: '', hasImage: true, category: activeTab });
    setMemberImageFile(null);
  };

  const handleViewBio = (member: LeadershipMember) => {
    setViewingBio(member);
  };

  const handleCloseBio = () => {
    setViewingBio(null);
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

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex !== dropIndex) {
      const currentMembers = getCurrentMembers();
      const newArray = [...currentMembers];
      const draggedItem = newArray[dragIndex];
      newArray.splice(dragIndex, 1);
      newArray.splice(dropIndex, 0, draggedItem);
      
      // Update the members state
      const updatedMembers = members && Array.isArray(members) ? members.map(member => {
        const newIndex = newArray.findIndex(m => m._id === member._id);
        if (newIndex !== -1) {
          return { ...member, display_order: newIndex + 1 };
        }
        return member;
      }) : [];
      
      setMembers(updatedMembers);
      
      // Save new order to backend
      try {
        const reorderData = newArray.map((item, index) => ({
          id: item._id!,
          display_order: index + 1
        }));
        
        await reorderLeadership({ type: 'leadership', items: reorderData });
        toast.success('Leadership member order updated');
      } catch (err) {
        toast.error('Failed to update order');
        await loadMembers(); // Revert on error
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'directors':
        return <Users className="w-4 h-4" />;
      case 'advisors':
        return <UserCheck className="w-4 h-4" />;
      case 'staff':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'directors':
        return 'Directors';
      case 'advisors':
        return 'Advisors';
      case 'staff':
        return 'Staff';
      default:
        return 'Members';
    }
  };

  // Loading and error states
  if (loading && heroLoading) {
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
          <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Leadership Members</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Leadership</h1>
        <p className="text-gray-600">Manage leadership members for the website</p>
      </div>

      {/* Hero Section Management */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {heroLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hero Title *
                </label>
                <Input
                  value={heroSection.title}
                  onChange={(e) => setHeroSection(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter hero title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hero Description *
                </label>
                <Textarea
                  value={heroSection.description}
                  onChange={(e) => setHeroSection(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter hero description"
                  rows={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hero Image
                </label>
                <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
                <ImageUpload
                  value={heroImagePreview || heroSection.heroImage || ''}
                  onChange={(file, previewUrl) => {
                    setHeroImageFile(file);
                    setHeroImagePreview(file ? previewUrl : null);
                  }}
                  placeholder="Upload hero image"
                  previewSize="hero"
                  previewShape="rectangular"
                  showPreview
                />
                <p className="text-xs text-gray-500 mt-2">
                  Select a wide image for the hero section. Click &ldquo;Upload Image&rdquo; after choosing a file to update it on the website.
                </p>
                {heroImageFile && (
                  <Button
                    onClick={handleHeroImageUpload}
                    disabled={uploadingHeroImage}
                    className="mt-3 bg-blue-600 hover:bg-blue-700"
                  >
                    {uploadingHeroImage ? 'Uploading...' : 'Upload Image'}
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleSaveHeroSection}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={savingHero}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {savingHero ? 'Saving...' : 'Save Hero Section'}
                </Button>
                <Button
                  onClick={loadHeroSection}
                  variant="outline"
                  disabled={heroLoading || savingHero || uploadingHeroImage}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Ordering Instructions */}
      {/* <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <GripVertical className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Easy Reordering</h3>
            <p className="text-sm text-blue-800">
              Simply drag and drop leadership members to reorder them! Click and hold the grip handle (⋮⋮) on the left, 
              then drag the member to your desired position. The order you set here will be the same order displayed on the website.
            </p>
          </div>
        </div>
      </div> */}

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {(['directors', 'advisors', 'staff'] as const).map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
              activeTab === category 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {getCategoryIcon(category)}
            {getCategoryLabel(category)} ({members && Array.isArray(members) ? members.filter(m => m.category === category).length : 0})
          </button>
        ))}
      </div>

      {/* Current Tab Content */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {getCategoryLabel(activeTab)}
          </h2>
          <Button onClick={handleAddMember} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Member
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(isAddingMember || editingMember) && (
          <Card ref={editFormRef} className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingMember ? 'Edit Leadership Member' : 'Add New Leadership Member'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <Input
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                    placeholder="Enter member's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title/Position *
                  </label>
                  <Input
                    value={memberForm.title}
                    onChange={(e) => setMemberForm({...memberForm, title: e.target.value})}
                    placeholder="e.g., Director, Advisor, Manager"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={memberForm.category}
                    onChange={(e) => setMemberForm({...memberForm, category: e.target.value as 'directors' | 'advisors' | 'staff'})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="directors">Directors</option>
                    <option value="advisors">Advisors</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 400x400px (square), Max 2MB, JPG/PNG/WebP format</p>
                  <ImageUpload
                    value={memberForm.image}
                    onChange={(file, previewUrl) => {
                      setMemberImageFile(file);
                      setMemberForm(prev => ({...prev, image: previewUrl}));
                    }}
                    placeholder="Upload leadership member image"
                    required={true}
                    previewSize="md"
                    previewShape="square"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description/Bio
                </label>
                <Textarea
                  value={memberForm.description}
                  onChange={(e) => setMemberForm({...memberForm, description: e.target.value})}
                  placeholder="Enter member's description or bio..."
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSaveMember} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {editingMember ? 'Update' : 'Save'}
                </Button>
                <Button onClick={handleCancelMember} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Members List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentMembers().map((member, index) => (
            <Card 
              key={member._id} 
              className="hover:shadow-lg transition-shadow cursor-move relative"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
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
                    src={member.image}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/defaultProfile2.jpg';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{decodeHtmlEntities(member.name)}</h3>
                    <p className="text-sm text-gray-600">{decodeHtmlEntities(member.title)}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {decodeHtmlEntities(member.description)}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getCategoryIcon(member.category)}
                    {getCategoryLabel(member.category)}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditMember(member)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  {/* <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewBio(member)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View Bio
                  </Button> */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteMember(member._id!)}
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

        {/* Empty State */}
        {getCurrentMembers().length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              {getCategoryIcon(activeTab)}
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No {getCategoryLabel(activeTab).toLowerCase()} found</h3>
            <p className="text-gray-600 mb-6">Start by adding a new {getCategoryLabel(activeTab).toLowerCase().slice(0, -1)} to this category.</p>
            <Button onClick={handleAddMember} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add First Member
            </Button>
          </div>
        )}
      </div>

      {/* Bio Preview Modal */}
      {viewingBio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2">
          <div className="bg-white rounded-lg w-full h-full max-w-none max-h-none overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800">Bio Preview: {viewingBio.name}</h3>
              <Button onClick={handleCloseBio} variant="outline" size="sm" className="hover:bg-gray-100">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-80px)]">
              <BioPreview member={viewingBio} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leadership;
