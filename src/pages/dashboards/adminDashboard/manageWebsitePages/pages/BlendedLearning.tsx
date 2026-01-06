import { useState, useEffect, useRef } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';

// Blended Learning Page Data Interface
interface BlendedLearningPageData {
  headerSection: {
    title: string;
    shortDescription: string;
    headerImage: string;
    headerVideoUrl?: string;
  };
  overviewSection: {
    title: string;
    description: string;
    supportingImage: string;
  };
}

const BlendedLearning = () => {
  const [activeSection, setActiveSection] = useState('header');
  const [blendedLearningData, setBlendedLearningData] = useState<BlendedLearningPageData>({
    headerSection: {
      title: 'Blended Learning Model',
      shortDescription: 'A hybrid educational approach harmonizing technology, pedagogy, and accessibility to deliver scalable, inclusive learning.',
      headerImage: '/assets/images/BlendedLearningModel/1.png',
      headerVideoUrl: ''
    },
    overviewSection: {
      title: "NEIEA's Blended Learning Model",
      description: "NEIEA's model is a symphony of disruption, harmonizing technology, pedagogy, and accessibility to orchestrate scalable change. Central to this is its hybrid blended learning framework, inspired by MIT's Massive Open Online Courses (MOOCs) but reimagined for the underserved.",
      supportingImage: '/assets/images/BlendedLearningModel/2.png'
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Image upload state
  const [uploadingHeaderImage, setUploadingHeaderImage] = useState(false);
  const [uploadingSupportingImage, setUploadingSupportingImage] = useState(false);
  const headerImageInputRef = useRef<HTMLInputElement>(null);
  const supportingImageInputRef = useRef<HTMLInputElement>(null);

  // Load blended learning data
  useEffect(() => {
    loadBlendedLearningData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBlendedLearningData = async () => {
    try {
      console.log('Loading blended learning data...');
      setLoading(true);
      
      const response = await axiosInstance.get('/admin/blended-learning-page');
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        // Convert paragraphs to description if it exists (backward compatibility)
        if (data.overviewSection.paragraphs && !data.overviewSection.description) {
          data.overviewSection.description = data.overviewSection.paragraphs.join('\n\n');
        }
        setBlendedLearningData(data);
        console.log('Blended learning data loaded successfully');
      } else {
        console.log('No blended learning page data found');
      }
    } catch (err: any) {
      console.error('Error loading blended learning data:', err);
      if (err.response?.status === 404) {
        console.log('No blended learning page found - will be created on first save');
      } else {
        toast.error(err.response?.data?.message || 'Failed to load blended learning page data');
      }
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const handleHeaderImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    try {
      setUploadingHeaderImage(true);
      const formData = new FormData();
      formData.append('headerImage', file);

      const response = await axiosInstance.post('/admin/blended-learning-page/upload-header-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setBlendedLearningData(prev => ({
          ...prev,
          headerSection: {
            ...prev.headerSection,
            headerImage: response.data.data.imageUrl
          }
        }));
        toast.success('Header image uploaded successfully! Click "Save All Changes" to save to database.');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload header image');
    } finally {
      setUploadingHeaderImage(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleSupportingImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    try {
      setUploadingSupportingImage(true);
      const formData = new FormData();
      formData.append('supportingImage', file);

      const response = await axiosInstance.post('/admin/blended-learning-page/upload-supporting-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setBlendedLearningData(prev => ({
          ...prev,
          overviewSection: {
            ...prev.overviewSection,
            supportingImage: response.data.data.imageUrl
          }
        }));
        toast.success('Supporting image uploaded successfully! Click "Save All Changes" to save to database.');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload supporting image');
    } finally {
      setUploadingSupportingImage(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleSaveAll = async () => {
    try {
      console.log('Saving blended learning page data:', blendedLearningData);
      setSaving(true);
      
      // Basic validation
      if (!blendedLearningData.headerSection.title || !blendedLearningData.headerSection.shortDescription) {
        toast.error('Please fill in all header section fields');
        setSaving(false);
        return;
      }

      if (!blendedLearningData.overviewSection.title || !blendedLearningData.overviewSection.description) {
        toast.error('Please fill in all overview section fields');
        setSaving(false);
        return;
      }
      
      let response;
      
      try {
        // Try to update first
        response = await axiosInstance.put('/admin/blended-learning-page', blendedLearningData);
      } catch (updateErr: any) {
        // If page doesn't exist (404), create it instead
        if (updateErr.response?.status === 404) {
          console.log('Blended learning page not found, creating new one...');
          response = await axiosInstance.post('/admin/blended-learning-page', blendedLearningData);
        } else {
          throw updateErr; // Re-throw if it's a different error
        }
      }
      
      if (response.data.success) {
        toast.success('Blended learning page saved successfully!');
        loadBlendedLearningData(); // Reload to get updated data
      } else {
        toast.error('Failed to save changes');
      }
    } catch (err: any) {
      console.error('Error saving blended learning data:', err);
      toast.error(err.response?.data?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blended Learning Management</h1>
          <p className="text-gray-600 mt-1">Manage the content for the Blended Learning page</p>
        </div>
        <Button 
          onClick={handleSaveAll} 
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      {/* Section Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        <button
          onClick={() => setActiveSection('header')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeSection === 'header'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Header Section
        </button>
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeSection === 'overview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview Section
        </button>
      </div>

      {/* Header Section */}
      {activeSection === 'header' && (
        <Card>
          <CardHeader>
            <CardTitle>Header Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <Input
                value={blendedLearningData.headerSection.title}
                onChange={(e) =>
                  setBlendedLearningData(prev => ({
                    ...prev,
                    headerSection: { ...prev.headerSection, title: e.target.value }
                  }))
                }
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <Textarea
                value={blendedLearningData.headerSection.shortDescription}
                onChange={(e) =>
                  setBlendedLearningData(prev => ({
                    ...prev,
                    headerSection: { ...prev.headerSection, shortDescription: e.target.value }
                  }))
                }
                placeholder="Enter short description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Header Image</label>
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
              
              {/* Image Preview */}
              {blendedLearningData.headerSection.headerImage ? (
                <div className="mb-4 relative group">
                  <img 
                    src={blendedLearningData.headerSection.headerImage} 
                    alt="Header preview" 
                    className="w-full h-64 object-contain rounded-lg border-2 border-gray-300 bg-gray-50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      Preview
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <p className="text-gray-500">No image uploaded yet</p>
                </div>
              )}
              
              {/* Upload Button */}
              <div className="flex items-center gap-4">
                <input
                  ref={headerImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleHeaderImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  disabled={uploadingHeaderImage}
                  onClick={() => headerImageInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {uploadingHeaderImage ? 'Uploading...' : blendedLearningData.headerSection.headerImage ? 'Change Image' : 'Upload Image'}
                </Button>
                
                {blendedLearningData.headerSection.headerImage && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setBlendedLearningData(prev => ({
                        ...prev,
                        headerSection: { ...prev.headerSection, headerImage: '' }
                      }));
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove Image
                  </Button>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Maximum file size: 2MB. Supported formats: JPG, PNG, GIF, WebP
              </p>
            </div>

            <div className="border-t pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Header Video URL (Optional)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                If provided, video will replace the header image. Supports: YouTube, Vimeo, or direct video links (MP4, WebM, etc.)
              </p>
              <Input
                type="url"
                value={blendedLearningData.headerSection.headerVideoUrl || ''}
                onChange={(e) =>
                  setBlendedLearningData(prev => ({
                    ...prev,
                    headerSection: { ...prev.headerSection, headerVideoUrl: e.target.value }
                  }))
                }
                placeholder="e.g., https://www.youtube.com/embed/VIDEO_ID or https://example.com/video.mp4"
              />
              {blendedLearningData.headerSection.headerVideoUrl && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setBlendedLearningData(prev => ({
                      ...prev,
                      headerSection: { ...prev.headerSection, headerVideoUrl: '' }
                    }));
                  }}
                  className="mt-3 text-red-600 hover:text-red-700"
                >
                  Remove Video Link
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <Card>
          <CardHeader>
            <CardTitle>Overview Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <Input
                value={blendedLearningData.overviewSection.title}
                onChange={(e) =>
                  setBlendedLearningData(prev => ({
                    ...prev,
                    overviewSection: { ...prev.overviewSection, title: e.target.value }
                  }))
                }
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={blendedLearningData.overviewSection.description}
                onChange={(e) =>
                  setBlendedLearningData(prev => ({
                    ...prev,
                    overviewSection: { ...prev.overviewSection, description: e.target.value }
                  }))
                }
                placeholder="Enter description"
                rows={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Image</label>
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px, Max 2MB, JPG/PNG/WebP format</p>
              
              {/* Image Preview */}
              {blendedLearningData.overviewSection.supportingImage ? (
                <div className="mb-4 relative group">
                  <img 
                    src={blendedLearningData.overviewSection.supportingImage} 
                    alt="Supporting preview" 
                    className="w-full h-64 object-contain rounded-lg border-2 border-gray-300 bg-gray-50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      Preview
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <p className="text-gray-500">No image uploaded yet</p>
                </div>
              )}
              
              {/* Upload Button */}
              <div className="flex items-center gap-4">
                <input
                  ref={supportingImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleSupportingImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  disabled={uploadingSupportingImage}
                  onClick={() => supportingImageInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {uploadingSupportingImage ? 'Uploading...' : blendedLearningData.overviewSection.supportingImage ? 'Change Image' : 'Upload Image'}
                </Button>
                
                {blendedLearningData.overviewSection.supportingImage && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setBlendedLearningData(prev => ({
                        ...prev,
                        overviewSection: { ...prev.overviewSection, supportingImage: '' }
                      }));
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove Image
                  </Button>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Maximum file size: 2MB. Supported formats: JPG, PNG, GIF, WebP
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlendedLearning;
