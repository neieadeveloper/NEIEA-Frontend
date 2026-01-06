import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';
import { CharacterCounter } from '@/components/ui/character-counter';

// Zod Validation Schemas
const benefitSchema = z.object({
  _id: z.string().optional(),
  icon: z.string()
    .min(1, 'Icon is required')
    .max(10, 'Icon should be 1-2 characters (emoji)'),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  display_order: z.number().optional()
});

const contactInfoSchema = z.object({
  icon: z.string().min(1, 'Icon is required'),
  heading: z.string()
    .min(3, 'Heading must be at least 3 characters')
    .max(100, 'Heading must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email is required')
});

const careerPageSchema = z.object({
  introduction: z.object({
    heading: z.string()
      .min(5, 'Introduction heading must be at least 5 characters')
      .max(200, 'Introduction heading must be less than 200 characters'),
    description: z.string()
      .min(20, 'Introduction description must be at least 20 characters')
      .max(1000, 'Introduction description must be less than 1000 characters')
  }),
  whyWorkSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    benefits: z.array(benefitSchema)
      .min(1, 'At least one benefit is required')
      .max(10, 'Maximum 10 benefits allowed')
  }),
  openingsSection: z.object({
    heading: z.string()
      .min(5, 'Section heading must be at least 5 characters')
      .max(200, 'Section heading must be less than 200 characters'),
    description: z.string()
      .min(20, 'Description must be at least 20 characters')
      .max(1000, 'Description must be less than 1000 characters'),
    jobCategories: z.array(z.string())
      .min(1, 'At least one job category is required')
      .max(20, 'Maximum 20 job categories allowed'),
    contactInfo: contactInfoSchema
  }),
  closingSection: z.object({
    heading: z.string()
      .min(5, 'Closing heading must be at least 5 characters')
      .max(200, 'Closing heading must be less than 200 characters'),
    description: z.string()
      .min(20, 'Closing description must be at least 20 characters')
      .max(1000, 'Closing description must be less than 1000 characters')
  })
});

// Career Page Data Interface
interface BenefitItem {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

interface CareerPageData {
  introduction: {
    heading: string;
    description: string;
  };
  whyWorkSection: {
    heading: string;
    benefits: BenefitItem[];
  };
  openingsSection: {
    heading: string;
    description: string;
    jobCategories: string[];
    contactInfo: {
      icon: string;
      heading: string;
      description: string;
      email: string;
    };
  };
  closingSection: {
    heading: string;
    description: string;
  };
}

const Career = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [careerData, setCareerData] = useState<CareerPageData>({
    introduction: {
      heading: 'Join the NEIEA Team',
      description: 'At NEIEA, we believe that a healthy work environment and supportive culture empower our team to make a real difference.'
    },
    whyWorkSection: {
      heading: 'Why Work with Us?',
      benefits: []
    },
    openingsSection: {
      heading: 'Current Openings',
      description: 'We welcome applications across roles in teaching, operations, technology, content development, and administration.',
      jobCategories: [],
      contactInfo: {
        icon: '📧',
        heading: 'Send Your CV',
        description: 'Ready to make a difference? Send your resume and cover letter to:',
        email: 'hrofficial@neiea.org'
      }
    },
    closingSection: {
      heading: 'Join Us and Be a Part of Change',
      description: 'Be part of a team that inspires change, innovation, and empowerment.'
    }
  });

  const [loading, setLoading] = useState(true);
  const [editingBenefit, setEditingBenefit] = useState<string | null>(null);
  const [isAddingBenefit, setIsAddingBenefit] = useState(false);
  const [benefitForm, setBenefitForm] = useState({ icon: '', title: '', description: '' });
  const [newCategory, setNewCategory] = useState('');

  // Load career data
  useEffect(() => {
    console.log('Career component mounted, loading data...');
    loadCareerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCareerData = async () => {
    try {
      console.log('Loading career data...');
      setLoading(true);
      
      const response = await axiosInstance.get('/admin/career-page');
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        
        // Check if benefits need display_order assignment
        if (data.whyWorkSection?.benefits) {
          const needsOrderFix = data.whyWorkSection.benefits.some(
            (benefit: BenefitItem) => benefit.display_order === undefined || benefit.display_order === 0
          );
          
          if (needsOrderFix) {
            console.log('Benefits need display_order assignment, fixing...');
            // Auto-assign display_order based on current position
            data.whyWorkSection.benefits = data.whyWorkSection.benefits.map((benefit: BenefitItem, index: number) => ({
              ...benefit,
              display_order: index
            }));
            
            // Save the updated data with proper display_order
            try {
              await axiosInstance.put('/admin/career-page', data);
              console.log('Display order fixed and saved');
            } catch (saveError) {
              console.error('Error saving display order fix:', saveError);
            }
          }
        }
        
        setCareerData(data);
        console.log('Career data loaded successfully');
      } else {
        console.log('No career page data found');
      }
    } catch (err: any) {
      console.error('Error loading career data:', err);
      if (err.response?.status === 404) {
        console.log('No career page found - will be created on first save');
      } else {
        toast.error(err.response?.data?.message || 'Failed to load career page data');
      }
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      console.log('Saving career page data:', careerData);
      
      // Add display_order to benefits based on their position in the array
      const dataToSave = {
        ...careerData,
        whyWorkSection: {
          ...careerData.whyWorkSection,
          benefits: careerData.whyWorkSection.benefits.map((benefit, index) => ({
            ...benefit,
            display_order: index
          }))
        }
      };
      
      // Validate the data using Zod schema
      const validationResult = careerPageSchema.safeParse(dataToSave);
      
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
        response = await axiosInstance.put('/admin/career-page', dataToSave);
      } catch (updateErr: any) {
        // If career page doesn't exist (404), create it instead
        if (updateErr.response?.status === 404) {
          console.log('Career page not found, creating new one...');
          response = await axiosInstance.post('/admin/career-page', dataToSave);
        } else {
          throw updateErr; // Re-throw if it's a different error
        }
      }
      
      if (response.data.success) {
        toast.success('Career page saved successfully!');
        loadCareerData(); // Reload to get updated data with IDs
      } else {
        toast.error('Failed to save changes');
      }
    } catch (err: any) {
      console.error('Error saving career data:', err);
      toast.error(err.response?.data?.message || 'Failed to save changes');
    }
  };

  // Benefit Functions
  const handleAddBenefit = () => {
    setIsAddingBenefit(true);
    setBenefitForm({ icon: '', title: '', description: '' });
  };

  const handleEditBenefit = (benefit: BenefitItem) => {
    setEditingBenefit(benefit._id || null);
    setBenefitForm({
      icon: benefit.icon,
      title: benefit.title,
      description: benefit.description
    });
  };

  const handleSaveBenefit = () => {
    // Validate benefit using Zod schema
    const validationResult = benefitSchema.safeParse(benefitForm);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      const firstError = errors[0];
      toast.error(`Validation Error: ${firstError.message}`);
      
      // Log all errors for debugging
      errors.forEach((error) => {
        console.error(`Benefit validation - ${error.path.join('.')}: ${error.message}`);
      });
      
      return;
    }

    if (editingBenefit) {
      // Update existing benefit
      setCareerData(prev => ({
        ...prev,
        whyWorkSection: {
          ...prev.whyWorkSection,
          benefits: prev.whyWorkSection.benefits.map(b =>
            b._id === editingBenefit ? { ...b, ...benefitForm } : b
          )
        }
      }));
      toast.success('Benefit updated locally. Click "Save All Changes" to save to database.');
    } else {
      // Add new benefit (without _id, will be generated by backend)
      setCareerData(prev => ({
        ...prev,
        whyWorkSection: {
          ...prev.whyWorkSection,
          benefits: [...prev.whyWorkSection.benefits, { ...benefitForm }]
        }
      }));
      toast.success('Benefit added locally. Click "Save All Changes" to save to database.');
    }

    setEditingBenefit(null);
    setIsAddingBenefit(false);
    setBenefitForm({ icon: '', title: '', description: '' });
  };

  const handleDeleteBenefit = (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this benefit?')) {
      setCareerData(prev => ({
        ...prev,
        whyWorkSection: {
          ...prev.whyWorkSection,
          benefits: prev.whyWorkSection.benefits.filter(b => b._id !== id)
        }
      }));
      toast.success('Benefit deleted locally. Click "Save All Changes" to save to database.');
    }
  };

  const handleCancelBenefit = () => {
    setEditingBenefit(null);
    setIsAddingBenefit(false);
    setBenefitForm({ icon: '', title: '', description: '' });
  };

  // Job Category Functions
  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();
    
    // Validate category
    if (!trimmedCategory) {
      toast.error('Category name is required');
      return;
    }

    if (trimmedCategory.length < 2) {
      toast.error('Category name must be at least 2 characters');
      return;
    }

    if (trimmedCategory.length > 50) {
      toast.error('Category name must be less than 50 characters');
      return;
    }

    if (careerData.openingsSection.jobCategories.includes(trimmedCategory)) {
      toast.error('Category already exists');
      return;
    }

    if (careerData.openingsSection.jobCategories.length >= 20) {
      toast.error('Maximum 20 job categories allowed');
      return;
    }

    setCareerData(prev => ({
      ...prev,
      openingsSection: {
        ...prev.openingsSection,
        jobCategories: [...prev.openingsSection.jobCategories, trimmedCategory]
      }
    }));
    setNewCategory('');
    toast.success('Category added locally. Click "Save All Changes" to save to database.');
  };

  const handleDeleteCategory = (category: string) => {
    setCareerData(prev => ({
      ...prev,
      openingsSection: {
        ...prev.openingsSection,
        jobCategories: prev.openingsSection.jobCategories.filter(c => c !== category)
      }
    }));
    toast.success('Category removed locally. Click "Save All Changes" to save to database.');
  };

  // Drag and Drop for Benefits
  const handleBenefitDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleBenefitDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
  };

  const handleBenefitDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleBenefitDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (dragIndex !== dropIndex) {
      const benefits = [...careerData.whyWorkSection.benefits];
      const draggedItem = benefits[dragIndex];
      benefits.splice(dragIndex, 1);
      benefits.splice(dropIndex, 0, draggedItem);

      setCareerData(prev => ({
        ...prev,
        whyWorkSection: {
          ...prev.whyWorkSection,
          benefits
        }
      }));
      toast.success('Benefit order updated. Click "Save All Changes" to save to database.');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-700 text-lg">Loading Career Page Management...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Briefcase className="w-8 h-8" />
            Manage Career Page
          </h1>
          <p className="text-gray-600">Update all content for the career page</p>
        </div>
        <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {['introduction', 'benefits', 'openings', 'closing'].map((section) => (
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

      {/* Introduction Section */}
      {activeSection === 'introduction' && (
        <Card>
          <CardHeader>
            <CardTitle>Introduction Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading
              </label>
              <Input
                value={careerData.introduction.heading}
                onChange={(e) => setCareerData(prev => ({
                  ...prev,
                  introduction: { ...prev.introduction, heading: e.target.value }
                }))}
                placeholder="Enter introduction heading"
              />
              <CharacterCounter current={careerData.introduction.heading.length} max={200} min={5} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={careerData.introduction.description}
                onChange={(e) => setCareerData(prev => ({
                  ...prev,
                  introduction: { ...prev.introduction, description: e.target.value }
                }))}
                placeholder="Enter introduction description"
                rows={4}
              />
              <CharacterCounter current={careerData.introduction.description.length} max={1000} min={20} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Benefits Section */}
      {activeSection === 'benefits' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Why Work With Us - Benefits</h2>
              <p className="text-gray-600 mt-1">Drag and drop to reorder benefits</p>
            </div>
            <Button onClick={handleAddBenefit} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Benefit
            </Button>
          </div>

          {/* Section Heading */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading
              </label>
              <Input
                value={careerData.whyWorkSection.heading}
                onChange={(e) => setCareerData(prev => ({
                  ...prev,
                  whyWorkSection: { ...prev.whyWorkSection, heading: e.target.value }
                }))}
                placeholder="Enter section heading"
              />
              <CharacterCounter current={careerData.whyWorkSection.heading.length} max={200} min={5} />
            </CardContent>
          </Card>

          {/* Add/Edit Form */}
          {(isAddingBenefit || editingBenefit) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingBenefit ? 'Edit Benefit' : 'Add New Benefit'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji) *
                    </label>
                    <Input
                      value={benefitForm.icon}
                      onChange={(e) => setBenefitForm({...benefitForm, icon: e.target.value})}
                      placeholder="Enter emoji (e.g., 🤝)"
                      maxLength={2}
                    />
                    <CharacterCounter current={benefitForm.icon.length} max={10} min={1} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input
                      value={benefitForm.title}
                      onChange={(e) => setBenefitForm({...benefitForm, title: e.target.value})}
                      placeholder="Enter benefit title"
                    />
                    <CharacterCounter current={benefitForm.title.length} max={100} min={3} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    value={benefitForm.description}
                    onChange={(e) => setBenefitForm({...benefitForm, description: e.target.value})}
                    placeholder="Enter benefit description"
                    rows={3}
                  />
                  <CharacterCounter current={benefitForm.description.length} max={500} min={10} />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveBenefit} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingBenefit ? 'Update' : 'Save'}
                  </Button>
                  <Button onClick={handleCancelBenefit} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerData.whyWorkSection.benefits.map((benefit, index) => (
              <Card
                key={benefit._id || index}
                className="hover:shadow-lg transition-shadow cursor-move relative"
                draggable
                onDragStart={(e) => handleBenefitDragStart(e, index)}
                onDragEnd={handleBenefitDragEnd}
                onDragOver={handleBenefitDragOver}
                onDrop={(e) => handleBenefitDrop(e, index)}
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
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{benefit.description}</p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditBenefit(benefit)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteBenefit(benefit._id)}
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

      {/* Openings Section */}
      {activeSection === 'openings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Openings Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Heading
                </label>
                <Input
                  value={careerData.openingsSection.heading}
                  onChange={(e) => setCareerData(prev => ({
                    ...prev,
                    openingsSection: { ...prev.openingsSection, heading: e.target.value }
                  }))}
                  placeholder="Enter section heading"
                />
                <CharacterCounter current={careerData.openingsSection.heading.length} max={200} min={5} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  value={careerData.openingsSection.description}
                  onChange={(e) => setCareerData(prev => ({
                    ...prev,
                    openingsSection: { ...prev.openingsSection, description: e.target.value }
                  }))}
                  placeholder="Enter section description"
                  rows={3}
                />
                <CharacterCounter current={careerData.openingsSection.description.length} max={1000} min={20} />
              </div>
            </CardContent>
          </Card>

          {/* Job Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Job Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <Button onClick={handleAddCategory} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {careerData.openingsSection.jobCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    <span>{category}</span>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon (Emoji)
                  </label>
                  <Input
                    value={careerData.openingsSection.contactInfo.icon}
                    onChange={(e) => setCareerData(prev => ({
                      ...prev,
                      openingsSection: {
                        ...prev.openingsSection,
                        contactInfo: { ...prev.openingsSection.contactInfo, icon: e.target.value }
                      }
                    }))}
                    placeholder="Enter emoji"
                    maxLength={2}
                  />
                  <CharacterCounter current={careerData.openingsSection.contactInfo.icon.length} max={10} min={1} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Heading
                  </label>
                  <Input
                    value={careerData.openingsSection.contactInfo.heading}
                    onChange={(e) => setCareerData(prev => ({
                      ...prev,
                      openingsSection: {
                        ...prev.openingsSection,
                        contactInfo: { ...prev.openingsSection.contactInfo, heading: e.target.value }
                      }
                    }))}
                    placeholder="Enter contact heading"
                  />
                  <CharacterCounter current={careerData.openingsSection.contactInfo.heading.length} max={100} min={3} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Description
                </label>
                <Textarea
                  value={careerData.openingsSection.contactInfo.description}
                  onChange={(e) => setCareerData(prev => ({
                    ...prev,
                    openingsSection: {
                      ...prev.openingsSection,
                      contactInfo: { ...prev.openingsSection.contactInfo, description: e.target.value }
                    }
                  }))}
                  placeholder="Enter contact description"
                  rows={2}
                />
                <CharacterCounter current={careerData.openingsSection.contactInfo.description.length} max={500} min={10} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={careerData.openingsSection.contactInfo.email}
                  onChange={(e) => setCareerData(prev => ({
                    ...prev,
                    openingsSection: {
                      ...prev.openingsSection,
                      contactInfo: { ...prev.openingsSection.contactInfo, email: e.target.value }
                    }
                  }))}
                  placeholder="Enter email address"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Closing Section */}
      {activeSection === 'closing' && (
        <Card>
          <CardHeader>
            <CardTitle>Closing Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading
              </label>
              <Input
                value={careerData.closingSection.heading}
                onChange={(e) => setCareerData(prev => ({
                  ...prev,
                  closingSection: { ...prev.closingSection, heading: e.target.value }
                }))}
                placeholder="Enter closing heading"
              />
              <CharacterCounter current={careerData.closingSection.heading.length} max={200} min={5} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={careerData.closingSection.description}
                onChange={(e) => setCareerData(prev => ({
                  ...prev,
                  closingSection: { ...prev.closingSection, description: e.target.value }
                }))}
                placeholder="Enter closing message"
                rows={4}
              />
              <CharacterCounter current={careerData.closingSection.description.length} max={1000} min={20} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Career;

