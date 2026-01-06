import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';

// TypeScript Interfaces
interface KeyHighlight {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  color?: string;
  display_order?: number;
}

interface ReportsFinancialsPageData {
  headerSection: {
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
  };
  missionSection: {
    title: string;
    description: string;
  };
  keyHighlightsSection: {
    sectionLabel: string;
    title: string;
    description: string;
    highlights: KeyHighlight[];
  };
  impactReportSection: {
    title: string;
    description: string;
    pdfUrl: string;
    buttonText: string;
  };
}

const ReportsFinancials = () => {
  const [activeSection, setActiveSection] = useState('header');
  const [reportsData, setReportsData] = useState<ReportsFinancialsPageData>({
    headerSection: {
      title: 'NEIEA: Transforming Education, Empowering Communities',
      subtitle: 'Since 2022, reshaping education through inclusive and quality learning opportunities',
      description: 'Our programs range from English and Math to digital skills, NIOS-based courses, and more - reaching children and youth across India.',
      heroImage: ''
    },
    missionSection: {
      title: 'Transforming Lives Through Education',
      description: 'Since 2022, NEIEA has been reshaping education by offering inclusive and quality learning opportunities for children and youth across India. Our programs range from English and Math to digital skills, NIOS-based courses, and more.'
    },
    keyHighlightsSection: {
      sectionLabel: 'KEY HIGHLIGHTS',
      title: 'Our Impact Areas',
      description: 'Discover how NEIEA is making a difference across communities',
      highlights: [
        {
          _id: 'highlight-1',
          icon: '👩‍🎓',
          title: 'Girls First',
          description: 'Most of our learners are girls, breaking barriers to education.',
          color: '#E91E63',
          display_order: 0
        },
        {
          _id: 'highlight-2',
          icon: '👩‍🏫',
          title: 'Women Leading',
          description: 'The majority of our educators are women, inspiring the next generation.',
          color: '#9C27B0',
          display_order: 1
        },
        {
          _id: 'highlight-3',
          icon: '🏘️',
          title: 'Reaching the Margins',
          description: 'We support children from slums and marginalized communities to access quality education.',
          color: '#FF5722',
          display_order: 2
        },
        {
          _id: 'highlight-4',
          icon: '💻',
          title: 'Future-Ready',
          description: 'Training in IT, digital literacy, and communication skills.',
          color: '#2196F3',
          display_order: 3
        },
        {
          _id: 'highlight-5',
          icon: '🌍',
          title: 'Nationwide Impact',
          description: 'Reaching underserved communities across many states.',
          color: '#4CAF50',
          display_order: 4
        }
      ]
    },
    impactReportSection: {
      title: '📊 NEIEA Impact Report',
      description: 'Get detailed insights into our programs, achievements, and the communities we serve. Download our comprehensive impact report to learn more about our educational initiatives.',
      pdfUrl: '/assets/pdf/NEIEA-Impact-report.pdf',
      buttonText: '📥 Read Complete Report'
    }
  });

  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Edit states for Key Highlights
  const [editingHighlightId, setEditingHighlightId] = useState<string | null>(null);
  const [editHighlightForm, setEditHighlightForm] = useState<KeyHighlight>({
    icon: '',
    title: '',
    description: '',
    color: ''
  });
  const [showAddHighlightForm, setShowAddHighlightForm] = useState(false);
  const [newHighlightForm, setNewHighlightForm] = useState<KeyHighlight>({
    icon: '',
    title: '',
    description: '',
    color: ''
  });

  useEffect(() => {
    loadReportsFinancialsData();
  }, []);

  const loadReportsFinancialsData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/reports-financials-page');
      if (response.data && response.data.success && response.data.data) {
        const loadedData = response.data.data;
        
        // Assign temporary IDs if needed
        if (loadedData.keyHighlightsSection?.highlights) {
          loadedData.keyHighlightsSection.highlights = loadedData.keyHighlightsSection.highlights.map((highlight: KeyHighlight, index: number) => ({
            ...highlight,
            _id: highlight._id || `highlight-${index + 1}`
          }));
        }
        
        setReportsData(loadedData);
        toast.success('Page data loaded successfully');
      }
    } catch (error: any) {
      console.error('Error loading Reports & Financials data:', error);
      toast.error(error.response?.data?.message || 'Failed to load page data');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to clean non-ObjectId _id fields
  const cleanId = (id: string | undefined): string | undefined => {
    if (!id) return undefined;
    // Check if it's a valid MongoDB ObjectId (24 hex characters)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    return isValidObjectId ? id : undefined;
  };

  const handleSaveAll = async () => {
    try {
      setLoading(true);
      
      // Clean temporary IDs before sending
      const cleanedData = {
        ...reportsData,
        keyHighlightsSection: {
          ...reportsData.keyHighlightsSection,
          highlights: reportsData.keyHighlightsSection.highlights.map((highlight: KeyHighlight) => ({
            ...highlight,
            _id: cleanId(highlight._id)
          }))
        }
      };
      
      let response;
      try {
        // Try to update first
        response = await axiosInstance.put('/admin/reports-financials-page', cleanedData);
      } catch (updateErr: any) {
        if (updateErr.response?.status === 404) {
          // If 404, try to create instead
          response = await axiosInstance.post('/admin/reports-financials-page', cleanedData);
        } else {
          throw updateErr;
        }
      }
      
      if (response.data && response.data.success) {
        toast.success('All changes saved successfully!');
        await loadReportsFinancialsData();
      }
    } catch (error: any) {
      console.error('Error saving Reports & Financials page:', error);
      toast.error(error.response?.data?.message || 'Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  // File Upload Handlers
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('heroImage', file);

      const response = await axiosInstance.post('/admin/reports-financials-page/upload-hero-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data && response.data.success) {
        setReportsData(prev => ({
          ...prev,
          headerSection: {
            ...prev.headerSection,
            heroImage: response.data.data.imageUrl
          }
        }));
        toast.success('Hero image uploaded successfully');
      }
    } catch (error: any) {
      console.error('Error uploading hero image:', error);
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    
    // Validate file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      e.target.value = ''; // Reset file input
      return;
    }
    
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await axiosInstance.post('/admin/reports-financials-page/upload-impact-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data && response.data.success) {
        setReportsData(prev => ({
          ...prev,
          impactReportSection: {
            ...prev.impactReportSection,
            pdfUrl: response.data.data.pdfUrl
          }
        }));
        toast.success('PDF uploaded successfully');
      }
    } catch (error: any) {
      console.error('Error uploading PDF:', error);
      toast.error(error.response?.data?.message || 'Failed to upload PDF');
    } finally {
      setIsUploading(false);
    }
  };

  // Key Highlights CRUD Operations
  const handleAddHighlight = () => {
    if (!newHighlightForm.title || !newHighlightForm.description) {
      toast.error('Please provide at least title and description');
      return;
    }

    const newHighlight: KeyHighlight = {
      _id: `highlight-${Date.now()}`,
      ...newHighlightForm,
      display_order: reportsData.keyHighlightsSection.highlights.length
    };

    setReportsData(prev => ({
      ...prev,
      keyHighlightsSection: {
        ...prev.keyHighlightsSection,
        highlights: [...prev.keyHighlightsSection.highlights, newHighlight]
      }
    }));

    setNewHighlightForm({ icon: '', title: '', description: '', color: '' });
    setShowAddHighlightForm(false);
    toast.success('Highlight added! Remember to save all changes.');
  };

  const handleEditHighlight = (highlight: KeyHighlight) => {
    setEditingHighlightId(highlight._id || null);
    setEditHighlightForm({ ...highlight });
  };

  const handleSaveHighlight = () => {
    if (!editHighlightForm.title || !editHighlightForm.description) {
      toast.error('Please provide at least title and description');
      return;
    }

    setReportsData(prev => ({
      ...prev,
      keyHighlightsSection: {
        ...prev.keyHighlightsSection,
        highlights: prev.keyHighlightsSection.highlights.map(highlight =>
          highlight._id === editingHighlightId ? editHighlightForm : highlight
        )
      }
    }));

    setEditingHighlightId(null);
    toast.success('Highlight updated! Remember to save all changes.');
  };

  const handleDeleteHighlight = (highlightId: string) => {
    setReportsData(prev => ({
      ...prev,
      keyHighlightsSection: {
        ...prev.keyHighlightsSection,
        highlights: prev.keyHighlightsSection.highlights.filter(highlight => highlight._id !== highlightId)
      }
    }));
    toast.success('Highlight removed! Remember to save all changes.');
  };

  const tabs = [
    { id: 'header', label: 'Header' },
    { id: 'mission', label: 'Mission' },
    // { id: 'highlights', label: 'Key Highlights' },
    { id: 'impact', label: 'Impact Report' }
  ];

  const renderTabContent = () => {
    switch (activeSection) {
      case 'header':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Header Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={reportsData.headerSection.title}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    headerSection: { ...prev.headerSection, title: e.target.value }
                  }))}
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <Input
                  value={reportsData.headerSection.subtitle}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    headerSection: { ...prev.headerSection, subtitle: e.target.value }
                  }))}
                  placeholder="Enter subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={reportsData.headerSection.description}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    headerSection: { ...prev.headerSection, description: e.target.value }
                  }))}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 'mission':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Mission Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={reportsData.missionSection.title}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    missionSection: { ...prev.missionSection, title: e.target.value }
                  }))}
                  placeholder="Enter section title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={reportsData.missionSection.description}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    missionSection: { ...prev.missionSection, description: e.target.value }
                  }))}
                  placeholder="Enter description"
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 'highlights':
        return (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Key Highlights</CardTitle>
                <Button onClick={() => setShowAddHighlightForm(true)} disabled={showAddHighlightForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Label</label>
                <Input
                  value={reportsData.keyHighlightsSection.sectionLabel}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    keyHighlightsSection: { ...prev.keyHighlightsSection, sectionLabel: e.target.value }
                  }))}
                  placeholder="e.g., KEY HIGHLIGHTS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <Input
                  value={reportsData.keyHighlightsSection.title}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    keyHighlightsSection: { ...prev.keyHighlightsSection, title: e.target.value }
                  }))}
                  placeholder="e.g., Our Impact Areas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Description</label>
                <Textarea
                  value={reportsData.keyHighlightsSection.description}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    keyHighlightsSection: { ...prev.keyHighlightsSection, description: e.target.value }
                  }))}
                  placeholder="Enter description"
                  rows={2}
                />
              </div>

              {/* Add New Highlight Form */}
              {showAddHighlightForm && (
                <Card className="border-2 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Highlight</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      placeholder="Icon (emoji, e.g., 👩‍🎓)"
                      value={newHighlightForm.icon}
                      onChange={(e) => setNewHighlightForm(prev => ({ ...prev, icon: e.target.value }))}
                    />
                    <Input
                      placeholder="Title (e.g., Girls First)"
                      value={newHighlightForm.title}
                      onChange={(e) => setNewHighlightForm(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Textarea
                      placeholder="Description"
                      value={newHighlightForm.description}
                      onChange={(e) => setNewHighlightForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleAddHighlight} size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Add Highlight
                      </Button>
                      <Button
                        onClick={() => {
                          setShowAddHighlightForm(false);
                          setNewHighlightForm({ icon: '', title: '', description: '', color: '' });
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Highlights List */}
              <div className="space-y-3">
                {reportsData.keyHighlightsSection.highlights.map((highlight) => (
                  <Card key={highlight._id}>
                    <CardContent className="pt-4">
                      {editingHighlightId === highlight._id ? (
                        <div className="space-y-3">
                          <Input
                            placeholder="Icon (emoji)"
                            value={editHighlightForm.icon}
                            onChange={(e) => setEditHighlightForm(prev => ({ ...prev, icon: e.target.value }))}
                          />
                          <Input
                            placeholder="Title"
                            value={editHighlightForm.title}
                            onChange={(e) => setEditHighlightForm(prev => ({ ...prev, title: e.target.value }))}
                          />
                          <Textarea
                            placeholder="Description"
                            value={editHighlightForm.description}
                            onChange={(e) => setEditHighlightForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button onClick={handleSaveHighlight} size="sm">
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingHighlightId(null)}
                              variant="outline"
                              size="sm"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{highlight.icon}</span>
                              <h4 className="font-semibold">{highlight.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600">{highlight.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleEditHighlight(highlight)}
                              variant="outline"
                              size="sm"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteHighlight(highlight._id!)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'impact':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Impact Report Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={reportsData.impactReportSection.title}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    impactReportSection: { ...prev.impactReportSection, title: e.target.value }
                  }))}
                  placeholder="Enter section title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={reportsData.impactReportSection.description}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    impactReportSection: { ...prev.impactReportSection, description: e.target.value }
                  }))}
                  placeholder="Enter description"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Upload Impact Report PDF</label>
                <p className="text-xs text-gray-500 mb-2">Maximum file size: 10MB</p>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePDFUpload}
                  disabled={isUploading}
                />
                {reportsData.impactReportSection.pdfUrl && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                    <FileText className="w-4 h-4" />
                    <a href={reportsData.impactReportSection.pdfUrl} target="_blank" rel="noopener noreferrer">
                      View PDF: {reportsData.impactReportSection.pdfUrl}
                    </a>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <Input
                  value={reportsData.impactReportSection.buttonText}
                  onChange={(e) => setReportsData(prev => ({
                    ...prev,
                    impactReportSection: { ...prev.impactReportSection, buttonText: e.target.value }
                  }))}
                  placeholder="e.g., 📥 Read Complete Report"
                />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (loading && !reportsData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading page data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Reports & Financials Page
          </h1>
          <p className="text-gray-600">
            Update content, upload PDFs, and manage financial transparency information
          </p>
        </div>

        {/* Save All Button */}
        <div className="mb-6 flex justify-end">
          <Button
            onClick={handleSaveAll}
            disabled={loading || isUploading}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="w-5 h-5 mr-2" />
            {loading ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              variant={activeSection === tab.id ? 'default' : 'outline'}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ReportsFinancials;
