import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, GraduationCap, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';

// Zod Validation Schemas
const courseItemSchema = z.object({
  _id: z.string().optional(),
  icon: z.string()
    .max(10, 'Icon should be 1-2 characters (emoji)'),
  title: z.string()
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters'),
  display_order: z.number().optional()
});

const pedagogicalApproachSchema = z.object({
  _id: z.string().optional(),
  icon: z.string()
    .max(10, 'Icon should be 1-2 characters (emoji)'),
  title: z.string()
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters'),
  display_order: z.number().optional()
});

const remoteLearningPageSchema = z.object({
  headerSection: z.object({
    title: z.string()
      .max(200, 'Header title must be less than 200 characters'),
    subtitle: z.string()
      .max(200, 'Subtitle must be less than 200 characters'),
    headerImage: z.string().optional()
  }),
  overviewSection: z.object({
    title: z.string()
      .max(200, 'Overview title must be less than 200 characters'),
    description: z.string()
      .max(2000, 'Overview description must be less than 2000 characters')
  }),
  coursesOfferedSection: z.object({
    title: z.string()
      .max(200, 'Courses section title must be less than 200 characters'),
    courses: z.array(courseItemSchema)
      .max(10, 'Maximum 10 courses allowed')
  }),
  pedagogicalApproachSection: z.object({
    title: z.string()
      .max(200, 'Pedagogical approach title must be less than 200 characters'),
    approaches: z.array(pedagogicalApproachSchema)
      .max(10, 'Maximum 10 approaches allowed')
  }),
  transformativeLearningSection: z.object({
    title: z.string()
      .max(200, 'Transformative learning title must be less than 200 characters'),
    description: z.string()
      .max(2000, 'Transformative learning description must be less than 2000 characters')
  }),
  callToActionSection: z.object({
    title: z.string()
      .max(200, 'Call to action title must be less than 200 characters'),
    description: z.string()
      .max(1000, 'Call to action description must be less than 1000 characters'),
    buttonText: z.string()
      .max(50, 'Button text must be less than 50 characters'),
    buttonLink: z.string()
      .max(200, 'Button link must be less than 200 characters')
  })
});

// Remote Learning Page Data Interface
interface CourseItem {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

interface PedagogicalApproach {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

interface RemoteLearningPageData {
  headerSection: {
    title: string;
    subtitle: string;
    shortDescription: string;
    headerImage?: string;
    heroVideoUrl?: string;
  };
  overviewSection: {
    title: string;
    description: string;
  };
  coursesOfferedSection: {
    title: string;
    courses: CourseItem[];
  };
  pedagogicalApproachSection: {
    title: string;
    approaches: PedagogicalApproach[];
  };
  transformativeLearningSection: {
    title: string;
    description: string;
  };
  callToActionSection: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

const RemoteLearning = () => {
  const [activeSection, setActiveSection] = useState('header');
  const [remoteLearningData, setRemoteLearningData] = useState<RemoteLearningPageData>({
    headerSection: {
      title: 'Remote Individual Learning',
      subtitle: 'Online education model for individual learners',
      shortDescription: 'NEIEA\'s Online Education Model is a learner-centric framework that empowers individuals to access courses independently using their own digital devices—smartphone, laptop, or tablet.',
      heroVideoUrl: ''
    },
    overviewSection: {
      title: 'Online Education Model for Individual Learners',
      description: 'NEIEA\'s Online Education Model is a learner-centric framework that empowers individuals to access courses independently using their own digital devices—smartphone, laptop, or tablet. Designed to transcend geographical boundaries, it enables students to learn anytime, anywhere, with direct access to expert instruction and high-quality resources.\n\nBy integrating linguistic, academic, and technical education, this model creates a holistic, inclusive, and transformative learning ecosystem. It equips learners not only with academic excellence but also with the critical skills needed to thrive in today\'s knowledge-driven global economy.'
    },
    coursesOfferedSection: {
      title: 'Courses Offered:',
      courses: [
        {
          icon: '🗣️',
          title: 'English Language Programs',
          description: 'From beginner and foundational levels for first-time learners to advanced modules that refine fluency, confidence, and communication skills.'
        },
        {
          icon: '🧮',
          title: 'Mathematics & Science Foundations',
          description: 'Strengthening conceptual clarity, problem-solving, and critical thinking across different age groups.'
        },
        {
          icon: '💻',
          title: 'Technical & Digital Literacy',
          description: 'Practical training in Google Workspace, Microsoft Office Suite, and other essential tools for academic, professional, and entrepreneurial growth.'
        }
      ]
    },
    pedagogicalApproachSection: {
      title: 'Pedagogical Approach:',
      approaches: [
        {
          icon: '🎥',
          title: 'Live Interactive Sessions',
          description: 'Led by expert mentors, fostering real-time dialogue, collaboration, and personalized support.'
        },
        {
          icon: '📚',
          title: 'Digital Resources & Assignments',
          description: 'Available anytime for flexible, self-paced learning.'
        },
        {
          icon: '📋',
          title: 'Assessments & Feedback',
          description: 'Continuous evaluation ensures measurable progress and tailored guidance.'
        }
      ]
    },
    transformativeLearningSection: {
      title: 'Transformative Learning Ecosystem',
      description: 'By integrating linguistic, academic, and technical education, this model creates a holistic, inclusive, and transformative learning ecosystem. It equips learners not only with academic excellence but also with the critical skills needed to thrive in today\'s knowledge-driven global economy.'
    },
    callToActionSection: {
      title: 'Ready to Start Your Individual Learning Journey?',
      description: 'Join NEIEA\'s learner-centric online education model and access courses independently using your own digital device. Learn anytime, anywhere with expert instruction.',
      buttonText: 'Start Learning Today',
      buttonLink: '/about-us/contact'
    }
  });

  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courseForm, setCourseForm] = useState({ icon: '', title: '', description: '' });
  const [editingApproach, setEditingApproach] = useState<string | null>(null);
  const [isAddingApproach, setIsAddingApproach] = useState(false);
  const [approachForm, setApproachForm] = useState({ icon: '', title: '', description: '' });

  // Load remote learning data
  useEffect(() => {
    console.log('Remote Learning component mounted, loading data...');
    loadRemoteLearningData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadRemoteLearningData = async () => {
    try {
      console.log('Loading remote learning data...');
      setLoading(true);
      
      const response = await axiosInstance.get('/admin/remote-learning-page');
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        
        // Check if courses need display_order assignment
        if (data.coursesOfferedSection?.courses) {
          const needsOrderFix = data.coursesOfferedSection.courses.some(
            (course: CourseItem) => course.display_order === undefined || course.display_order === 0
          );
          
          if (needsOrderFix) {
            console.log('Courses need display_order assignment, fixing...');
            data.coursesOfferedSection.courses = data.coursesOfferedSection.courses.map((course: CourseItem, index: number) => ({
              ...course,
              display_order: index
            }));
            
            // Save the updated data with proper display_order
            try {
              await axiosInstance.put('/admin/remote-learning-page', data);
              console.log('Display order fixed and saved');
            } catch (saveError) {
              console.error('Error saving display order fix:', saveError);
            }
          }
        }

        // Check if approaches need display_order assignment
        if (data.pedagogicalApproachSection?.approaches) {
          const needsOrderFix = data.pedagogicalApproachSection.approaches.some(
            (approach: PedagogicalApproach) => approach.display_order === undefined || approach.display_order === 0
          );
          
          if (needsOrderFix) {
            console.log('Approaches need display_order assignment, fixing...');
            data.pedagogicalApproachSection.approaches = data.pedagogicalApproachSection.approaches.map((approach: PedagogicalApproach, index: number) => ({
              ...approach,
              display_order: index
            }));
            
            // Save the updated data with proper display_order
            try {
              await axiosInstance.put('/admin/remote-learning-page', data);
              console.log('Display order fixed and saved');
            } catch (saveError) {
              console.error('Error saving display order fix:', saveError);
            }
          }
        }
        
        setRemoteLearningData(data);
        console.log('Remote learning data loaded successfully from database');
      } else {
        console.log('No remote learning page data found in database - using default data');
      }
    } catch (err: any) {
      console.error('Error loading remote learning data:', err);
      if (err.response?.status === 404) {
        console.log('No remote learning page found - will be created on first save');
      } else {
        toast.error(err.response?.data?.message || 'Failed to load remote learning page data');
      }
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2000000) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    try {
      setUploadingImage(true);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append('headerImage', file);

      const response = await axiosInstance.post('/admin/remote-learning-page/upload-header-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        const imageUrl = response.data.data.imageUrl;
        setRemoteLearningData(prev => ({
          ...prev,
          headerSection: {
            ...prev.headerSection,
            headerImage: imageUrl
          }
        }));
        toast.success('Header image uploaded successfully!');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.response?.data?.message || 'Failed to upload image');
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      console.log('Saving remote learning page data:', remoteLearningData);
      
      // Add display_order to courses based on their position in the array
      const dataToSave = {
        ...remoteLearningData,
        coursesOfferedSection: {
          ...remoteLearningData.coursesOfferedSection,
          courses: remoteLearningData.coursesOfferedSection.courses.map((course, index) => ({
            ...course,
            display_order: index
          }))
        },
        pedagogicalApproachSection: {
          ...remoteLearningData.pedagogicalApproachSection,
          approaches: remoteLearningData.pedagogicalApproachSection.approaches.map((approach, index) => ({
            ...approach,
            display_order: index
          }))
        }
      };
      
      // Validate the data using Zod schema
      const validationResult = remoteLearningPageSchema.safeParse(dataToSave);
      
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
        response = await axiosInstance.put('/admin/remote-learning-page', dataToSave);
      } catch (updateErr: any) {
        // If remote learning page doesn't exist (404), create it instead
        if (updateErr.response?.status === 404) {
          console.log('Remote learning page not found, creating new one...');
          response = await axiosInstance.post('/admin/remote-learning-page', dataToSave);
        } else {
          throw updateErr; // Re-throw if it's a different error
        }
      }
      
      if (response.data.success) {
        toast.success('Remote learning page saved successfully!');
        loadRemoteLearningData(); // Reload to get updated data with IDs
      } else {
        toast.error('Failed to save changes');
      }
    } catch (err: any) {
      console.error('Error saving remote learning data:', err);
      toast.error(err.response?.data?.message || 'Failed to save changes');
    }
  };

  // Course Functions
  const handleAddCourse = () => {
    setIsAddingCourse(true);
    setCourseForm({ icon: '', title: '', description: '' });
  };

  const handleEditCourse = (course: CourseItem, index: number) => {
    // Use index as identifier when _id is not available (for default data)
    setEditingCourse(course._id || `temp-${index}`);
    setCourseForm({
      icon: course.icon,
      title: course.title,
      description: course.description
    });
  };

  const handleSaveCourse = () => {
    // Validate course using Zod schema
    const validationResult = courseItemSchema.safeParse(courseForm);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      const firstError = errors[0];
      toast.error(`Validation Error: ${firstError.message}`);
      
      // Log all errors for debugging
      errors.forEach((error) => {
        console.error(`Course validation - ${error.path.join('.')}: ${error.message}`);
      });
      
      return;
    }

    if (editingCourse) {
      // Update existing course
      setRemoteLearningData(prev => ({
        ...prev,
        coursesOfferedSection: {
          ...prev.coursesOfferedSection,
          courses: prev.coursesOfferedSection.courses.map((c, index) =>
            (c._id === editingCourse || (editingCourse.startsWith('temp-') && index === parseInt(editingCourse.split('-')[1]))) 
              ? { ...c, ...courseForm } 
              : c
          )
        }
      }));
      toast.success('Course updated locally. Click "Save All Changes" to save to database.');
    } else {
      // Add new course (without _id, will be generated by backend)
      setRemoteLearningData(prev => ({
        ...prev,
        coursesOfferedSection: {
          ...prev.coursesOfferedSection,
          courses: [...prev.coursesOfferedSection.courses, { ...courseForm }]
        }
      }));
      toast.success('Course added locally. Click "Save All Changes" to save to database.');
    }

    setEditingCourse(null);
    setIsAddingCourse(false);
    setCourseForm({ icon: '', title: '', description: '' });
  };

  const handleDeleteCourse = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setRemoteLearningData(prev => ({
        ...prev,
        coursesOfferedSection: {
          ...prev.coursesOfferedSection,
          courses: prev.coursesOfferedSection.courses.filter(c => c._id !== id)
        }
      }));
      toast.success('Course deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  const handleCancelCourse = () => {
    setEditingCourse(null);
    setIsAddingCourse(false);
    setCourseForm({ icon: '', title: '', description: '' });
  };

  // Pedagogical Approach Functions
  const handleAddApproach = () => {
    setIsAddingApproach(true);
    setApproachForm({ icon: '', title: '', description: '' });
  };

  const handleEditApproach = (approach: PedagogicalApproach, index: number) => {
    // Use index as identifier when _id is not available (for default data)
    setEditingApproach(approach._id || `temp-${index}`);
    setApproachForm({
      icon: approach.icon,
      title: approach.title,
      description: approach.description
    });
  };

  const handleSaveApproach = () => {
    // Validate approach using Zod schema
    const validationResult = pedagogicalApproachSchema.safeParse(approachForm);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      const firstError = errors[0];
      toast.error(`Validation Error: ${firstError.message}`);
      
      // Log all errors for debugging
      errors.forEach((error) => {
        console.error(`Approach validation - ${error.path.join('.')}: ${error.message}`);
      });
      
      return;
    }

    if (editingApproach) {
      // Update existing approach
      setRemoteLearningData(prev => ({
        ...prev,
        pedagogicalApproachSection: {
          ...prev.pedagogicalApproachSection,
          approaches: prev.pedagogicalApproachSection.approaches.map((a, index) =>
            (a._id === editingApproach || (editingApproach.startsWith('temp-') && index === parseInt(editingApproach.split('-')[1]))) 
              ? { ...a, ...approachForm } 
              : a
          )
        }
      }));
      toast.success('Approach updated locally. Click "Save All Changes" to save to database.');
    } else {
      // Add new approach (without _id, will be generated by backend)
      setRemoteLearningData(prev => ({
        ...prev,
        pedagogicalApproachSection: {
          ...prev.pedagogicalApproachSection,
          approaches: [...prev.pedagogicalApproachSection.approaches, { ...approachForm }]
        }
      }));
      toast.success('Approach added locally. Click "Save All Changes" to save to database.');
    }

    setEditingApproach(null);
    setIsAddingApproach(false);
    setApproachForm({ icon: '', title: '', description: '' });
  };

  const handleDeleteApproach = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this approach?')) {
      setRemoteLearningData(prev => ({
        ...prev,
        pedagogicalApproachSection: {
          ...prev.pedagogicalApproachSection,
          approaches: prev.pedagogicalApproachSection.approaches.filter(a => a._id !== id)
        }
      }));
      toast.success('Approach deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  const handleCancelApproach = () => {
    setEditingApproach(null);
    setIsAddingApproach(false);
    setApproachForm({ icon: '', title: '', description: '' });
  };

  // Drag and Drop for Courses
  const handleCourseDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleCourseDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
  };

  const handleCourseDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCourseDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const courses = [...remoteLearningData.coursesOfferedSection.courses];
      const draggedItem = courses[dragIndex];
      courses.splice(dragIndex, 1);
      courses.splice(dropIndex, 0, draggedItem);

      setRemoteLearningData(prev => ({
        ...prev,
        coursesOfferedSection: {
          ...prev.coursesOfferedSection,
          courses
        }
      }));
      toast.success('Course order updated. Click "Save All Changes" to save to database.');
    }
  };

  // Drag and Drop for Approaches
  const handleApproachDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleApproachDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
  };

  const handleApproachDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleApproachDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const approaches = [...remoteLearningData.pedagogicalApproachSection.approaches];
      const draggedItem = approaches[dragIndex];
      approaches.splice(dragIndex, 1);
      approaches.splice(dropIndex, 0, draggedItem);

      setRemoteLearningData(prev => ({
        ...prev,
        pedagogicalApproachSection: {
          ...prev.pedagogicalApproachSection,
          approaches
        }
      }));
      toast.success('Approach order updated. Click "Save All Changes" to save to database.');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-700 text-lg">Loading Remote Learning Page Management...</div>
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
            Manage Remote Learning Page
          </h1>
          <p className="text-gray-600">Update all content for the remote learning page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {['header', 'overview', 'courses', 'pedagogical', 'transformative', 'cta'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeSection === section
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Header Section */}
      {activeSection === 'header' && (
        <Card>
          <CardHeader>
            <CardTitle>Header Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                value={remoteLearningData.headerSection.title}
                onChange={(e) => setRemoteLearningData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, title: e.target.value }
                }))}
                placeholder="Enter header title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <Input
                value={remoteLearningData.headerSection.subtitle}
                onChange={(e) => setRemoteLearningData(prev => ({
                  ...prev,
                  headerSection: { ...prev.headerSection, subtitle: e.target.value }
                }))}
                placeholder="Enter subtitle"
              />
            </div>
            
            {/* Header Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Header Image
              </label>
              
              {/* Current/Preview Image */}
              {(remoteLearningData.headerSection.headerImage || imagePreview) && (
                <div className="mb-4 relative">
                  <img
                    src={imagePreview || remoteLearningData.headerSection.headerImage}
                    alt="Header"
                    className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                    <ImageIcon className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              )}
              
              {/* Upload Button */}
              <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1920x800px (wide), Max 2MB, JPG/PNG/WebP format</p>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? 'Uploading...' : remoteLearningData.headerSection.headerImage ? 'Change Image' : 'Upload Image'}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </label>
                <span className="text-sm text-gray-500">Max size: 2MB</span>
              </div>
              
              {uploadingImage && (
                <div className="mt-2 text-sm text-blue-600">
                  Uploading image to S3...
                </div>
              )}
            </div>

            {/* Hero Video URL Section */}
            <div className="border-t pt-6 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Video URL (Optional)</label>
              <p className="text-xs text-gray-500 mb-3">
                If provided, video will replace the hero image. Supports YouTube, Vimeo, and direct video links.
                <br />
                Examples:
                <br />• YouTube: https://www.youtube.com/embed/VIDEO_ID
                <br />• Vimeo: https://vimeo.com/VIDEO_ID
                <br />• Direct: https://example.com/video.mp4
              </p>
              <Input
                type="url"
                value={remoteLearningData.headerSection.heroVideoUrl || ''}
                onChange={(e) =>
                  setRemoteLearningData((prev) => ({
                    ...prev,
                    headerSection: { ...prev.headerSection, heroVideoUrl: e.target.value },
                  }))
                }
                placeholder="e.g., https://www.youtube.com/embed/VIDEO_ID"
                className="mb-2"
              />
              {remoteLearningData.headerSection.heroVideoUrl && (
                <Button
                  type="button"
                  onClick={() =>
                    setRemoteLearningData((prev) => ({
                      ...prev,
                      headerSection: { ...prev.headerSection, heroVideoUrl: '' },
                    }))
                  }
                  variant="outline"
                  size="sm"
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
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                value={remoteLearningData.overviewSection.title}
                onChange={(e) => setRemoteLearningData(prev => ({
                  ...prev,
                  overviewSection: { ...prev.overviewSection, title: e.target.value }
                }))}
                placeholder="Enter overview title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={remoteLearningData.overviewSection.description}
                onChange={(e) => setRemoteLearningData(prev => ({
                  ...prev,
                  overviewSection: { ...prev.overviewSection, description: e.target.value }
                }))}
                placeholder="Enter overview description"
                rows={6}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Courses Section */}
      {activeSection === 'courses' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Courses Offered</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder courses</p>
            </div>
            <Button onClick={handleAddCourse} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </div>

          {/* Section Heading */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading
              </label>
              <Input
                value={remoteLearningData.coursesOfferedSection.title}
                onChange={(e) => setRemoteLearningData(prev => ({
                  ...prev,
                  coursesOfferedSection: { ...prev.coursesOfferedSection, title: e.target.value }
                }))}
                placeholder="Enter section heading"
              />
            </CardContent>
          </Card>

          {/* Add/Edit Form */}
          {(isAddingCourse || editingCourse) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji) *
                    </label>
                    <Input
                      value={courseForm.icon}
                      onChange={(e) => setCourseForm({...courseForm, icon: e.target.value})}
                      placeholder="Enter emoji (e.g., 🗣️)"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input
                      value={courseForm.title}
                      onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                      placeholder="Enter course title"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                    placeholder="Enter course description"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveCourse} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingCourse ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelCourse} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Courses List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {remoteLearningData.coursesOfferedSection.courses.map((course, index) => (
              <Card
                key={course._id || index}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleCourseDragStart(e, index)}
                onDragEnd={handleCourseDragEnd}
                onDragOver={handleCourseDragOver}
                onDrop={(e) => handleCourseDrop(e, index)}
              >
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center">
                    <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
                    <div className="text-xs text-gray-500 font-medium">
                      #{index + 1}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 pt-8">
                  <div className="text-4xl mb-3">{course.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditCourse(course, index)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCourse(course._id)}
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

      {/* Pedagogical Approach Section */}
      {activeSection === 'pedagogical' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Pedagogical Approach</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder approaches</p>
            </div>
            <Button onClick={handleAddApproach} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Approach
            </Button>
          </div>

          {/* Section Heading */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading
              </label>
              <Input
                value={remoteLearningData.pedagogicalApproachSection.title}
                onChange={(e) => setRemoteLearningData(prev => ({
                  ...prev,
                  pedagogicalApproachSection: { ...prev.pedagogicalApproachSection, title: e.target.value }
                }))}
                placeholder="Enter section heading"
              />
            </CardContent>
          </Card>

          {/* Add/Edit Form */}
          {(isAddingApproach || editingApproach) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingApproach ? 'Edit Approach' : 'Add New Approach'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji) *
                    </label>
                    <Input
                      value={approachForm.icon}
                      onChange={(e) => setApproachForm({...approachForm, icon: e.target.value})}
                      placeholder="Enter emoji (e.g., 🎥)"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input
                      value={approachForm.title}
                      onChange={(e) => setApproachForm({...approachForm, title: e.target.value})}
                      placeholder="Enter approach title"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    value={approachForm.description}
                    onChange={(e) => setApproachForm({...approachForm, description: e.target.value})}
                    placeholder="Enter approach description"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveApproach} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingApproach ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelApproach} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Approaches List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {remoteLearningData.pedagogicalApproachSection.approaches.map((approach, index) => (
              <Card
                key={approach._id || index}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleApproachDragStart(e, index)}
                onDragEnd={handleApproachDragEnd}
                onDragOver={handleApproachDragOver}
                onDrop={(e) => handleApproachDrop(e, index)}
              >
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex flex-col items-center">
                    <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
                    <div className="text-xs text-gray-500 font-medium">
                      #{index + 1}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 pt-8">
                  <div className="text-4xl mb-3">{approach.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{approach.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{approach.description}</p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditApproach(approach, index)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteApproach(approach._id)}
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

      {/* Transformative Learning Section */}
      {activeSection === 'transformative' && (
        <Card>
          <CardHeader>
            <CardTitle>Transformative Learning Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                value={remoteLearningData.transformativeLearningSection.title}
                onChange={(e) => setRemoteLearningData(prev => ({
                  ...prev,
                  transformativeLearningSection: { ...prev.transformativeLearningSection, title: e.target.value }
                }))}
                placeholder="Enter transformative learning title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={remoteLearningData.transformativeLearningSection.description}
                onChange={(e) => setRemoteLearningData(prev => ({
                  ...prev,
                  transformativeLearningSection: { ...prev.transformativeLearningSection, description: e.target.value }
                }))}
                placeholder="Enter transformative learning description"
                rows={6}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to Action Section */}
      {activeSection === 'cta' && (
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                value={remoteLearningData.callToActionSection.title}
                onChange={(e) => setRemoteLearningData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, title: e.target.value }
                }))}
                placeholder="Enter call to action title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={remoteLearningData.callToActionSection.description}
                onChange={(e) => setRemoteLearningData(prev => ({
                  ...prev,
                  callToActionSection: { ...prev.callToActionSection, description: e.target.value }
                }))}
                placeholder="Enter call to action description"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <Input
                  value={remoteLearningData.callToActionSection.buttonText}
                  onChange={(e) => setRemoteLearningData(prev => ({
                    ...prev,
                    callToActionSection: { ...prev.callToActionSection, buttonText: e.target.value }
                  }))}
                  placeholder="Enter button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Link
                </label>
                <Input
                  value={remoteLearningData.callToActionSection.buttonLink}
                  onChange={(e) => setRemoteLearningData(prev => ({
                    ...prev,
                    callToActionSection: { ...prev.callToActionSection, buttonLink: e.target.value }
                  }))}
                  placeholder="Enter button link (e.g., /about-us/contact)"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RemoteLearning;
