import { useState, useEffect } from 'react';
import { Save, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';

// Zod Validation Schemas
const visionMissionSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
});

const registrationSectionSchema = z.object({
  heading: z.string()
    .min(3, 'Heading must be at least 3 characters')
    .max(100, 'Heading must be less than 100 characters'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  image: z.string()
    .min(1, 'Image is required')
    .url('Must be a valid URL')
});

const introductionPageSchema = z.object({
  visionMissionSection: z.object({
    vision: visionMissionSchema,
    mission: visionMissionSchema
  }),
  registrationSection: registrationSectionSchema.optional()
});

// Introduction Page Data Interface
interface IntroductionPageData {
  visionMissionSection: {
    vision: {
      title: string;
      description: string;
    };
    mission: {
      title: string;
      description: string;
    };
  };
  registrationSection?: {
    heading: string;
    description: string;
    image: string;
  };
}

const Introduction = () => {
  const [activeSection, setActiveSection] = useState('vision-mission');
  const [introductionData, setIntroductionData] = useState<IntroductionPageData>({
    visionMissionSection: {
      vision: {
        title: 'OUR VISION',
        description: 'To envision a society where all youth and citizens are able to obtain good quality education and use this to transform society ensuring human welfare, sustainability, and progress.'
      },
      mission: {
        title: 'OUR MISSION',
        description: 'To provide good quality and innovative education to all segments of society with high consideration given to providing free education to the poor.'
      }
    },
    registrationSection: {
      heading: 'Registration',
      description: 'NEIEA was officially registered on April 18, 2022, as a Section 8a non-profit educational organization in India, after two years of active educational discussions and planning during the Pandemic. NEIEA has 12a and 80g approvals from the Government of India and also Darpan ID.',
      image: '/assets/images/vision2 (1).jpg'
    }
  });

  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Load introduction data
  useEffect(() => {
    console.log('Introduction component mounted, loading data...');
    loadIntroductionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadIntroductionData = async () => {
    try {
      console.log('Loading introduction data...');
      setLoading(true);
      
      const response = await axiosInstance.get('/admin/introduction-page');
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        
        // Ensure registrationSection exists with default values
        if (!data.registrationSection) {
          data.registrationSection = {
            heading: 'Registration',
            description: 'NEIEA was officially registered on April 18, 2022, as a Section 8a non-profit educational organization in India, after two years of active educational discussions and planning during the Pandemic. NEIEA has 12a and 80g approvals from the Government of India and also Darpan ID.',
            image: '/assets/images/vision2 (1).jpg'
          };
        }
        
        setIntroductionData(data);
        setImagePreview(data.registrationSection.image || '/assets/images/vision2 (1).jpg');
        console.log('Introduction data loaded successfully');
      } else {
        console.log('No introduction page data found');
      }
    } catch (err: any) {
      console.error('Error loading introduction data:', err);
      if (err.response?.status === 404) {
        console.log('No introduction page found - will be created on first save');
      } else {
        toast.error(err.response?.data?.message || 'Failed to load introduction page data');
      }
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      console.log('Saving introduction page data:', introductionData);
      
      // Validate the data using Zod schema
      const validationResult = introductionPageSchema.safeParse(introductionData);
      
      if (!validationResult.success) {
        const errors = validationResult.error.errors;
        console.error('Validation errors:', errors);
        
        // Display the first validation error
        const firstError = errors[0];
        const errorPath = firstError.path.join(' → ');
        toast.error(`Validation Error: ${errorPath ? errorPath + ': ' : ''}${firstError.message}`);
        
        // Log all errors for debugging
        errors.forEach((error) => {
          console.error(`${error.path.join('.')}: ${error.message}`);
        });
        
        return;
      }
      
      let response;
      
      try {
        // Try to update first
        response = await axiosInstance.put('/admin/introduction-page', introductionData);
      } catch (updateErr: any) {
        // If introduction page doesn't exist (404), create it instead
        if (updateErr.response?.status === 404) {
          console.log('Introduction page not found, creating new one...');
          response = await axiosInstance.post('/admin/introduction-page', introductionData);
        } else {
          throw updateErr; // Re-throw if it's a different error
        }
      }
      
      if (response.data.success) {
        toast.success('Introduction page saved successfully!');
        loadIntroductionData(); // Reload to get updated data with IDs
      } else {
        toast.error('Failed to save changes');
      }
    } catch (err: any) {
      console.error('Error saving introduction data:', err);
      toast.error(err.response?.data?.message || 'Failed to save changes');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, we'll just show a preview of the file name
      // In a real implementation, you'd upload to S3 and get the URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setIntroductionData(prev => ({
          ...prev,
          registrationSection: {
            heading: prev.registrationSection?.heading || 'Registration',
            description: prev.registrationSection?.description || '',
            image: result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-700 text-lg">Loading Introduction Page Management...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <ImageIcon className="w-8 h-8" />
            Manage Introduction Page
          </h1>
          <p className="text-gray-600">Update all content for the introduction page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {['vision-mission', 'registration'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeSection === section
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section === 'vision-mission' ? 'Vision & Mission' : 'Registration'}
          </button>
        ))}
      </div>

      {/* Vision & Mission Section */}
      {activeSection === 'vision-mission' && (
        <div className="space-y-6">
          {/* Vision Section */}
          <Card>
            <CardHeader>
              <CardTitle>Vision Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vision Title
                </label>
                <Input
                  value={introductionData.visionMissionSection.vision.title}
                  onChange={(e) => setIntroductionData(prev => ({
                    ...prev,
                    visionMissionSection: {
                      ...prev.visionMissionSection,
                      vision: { ...prev.visionMissionSection.vision, title: e.target.value }
                    }
                  }))}
                  placeholder="Enter vision title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vision Description
                </label>
                <Textarea
                  value={introductionData.visionMissionSection.vision.description}
                  onChange={(e) => setIntroductionData(prev => ({
                    ...prev,
                    visionMissionSection: {
                      ...prev.visionMissionSection,
                      vision: { ...prev.visionMissionSection.vision, description: e.target.value }
                    }
                  }))}
                  placeholder="Enter vision description"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Mission Section */}
          <Card>
            <CardHeader>
              <CardTitle>Mission Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mission Title
                </label>
                <Input
                  value={introductionData.visionMissionSection.mission.title}
                  onChange={(e) => setIntroductionData(prev => ({
                    ...prev,
                    visionMissionSection: {
                      ...prev.visionMissionSection,
                      mission: { ...prev.visionMissionSection.mission, title: e.target.value }
                    }
                  }))}
                  placeholder="Enter mission title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mission Description
                </label>
                <Textarea
                  value={introductionData.visionMissionSection.mission.description}
                  onChange={(e) => setIntroductionData(prev => ({
                    ...prev,
                    visionMissionSection: {
                      ...prev.visionMissionSection,
                      mission: { ...prev.visionMissionSection.mission, description: e.target.value }
                    }
                  }))}
                  placeholder="Enter mission description"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Registration Section */}
      {activeSection === 'registration' && (
        <Card>
          <CardHeader>
            <CardTitle>Registration Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading
              </label>
              <Input
                value={introductionData.registrationSection?.heading || ''}
                onChange={(e) => setIntroductionData(prev => ({
                  ...prev,
                  registrationSection: {
                    heading: e.target.value,
                    description: prev.registrationSection?.description || '',
                    image: prev.registrationSection?.image || ''
                  }
                }))}
                placeholder="Enter section heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={introductionData.registrationSection?.description || ''}
                onChange={(e) => setIntroductionData(prev => ({
                  ...prev,
                  registrationSection: {
                    heading: prev.registrationSection?.heading || 'Registration',
                    description: e.target.value,
                    image: prev.registrationSection?.image || ''
                  }
                }))}
                placeholder="Enter section description"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Upload
              </label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowImagePreview(!showImagePreview)}
                >
                  {showImagePreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showImagePreview ? 'Hide Image' : 'Show Image'}
                </Button>
              </div>
              {showImagePreview && imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto max-h-64 rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      toast.error('Failed to load image preview');
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Introduction;
