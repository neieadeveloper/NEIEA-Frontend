import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Eye, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import ImageUpload from '@/components/ui/image-upload';
import MultipleImageUpload from '@/components/ui/multiple-image-upload';
import ExistingImagesManager from '@/components/ui/existing-images-manager';
import { GlobalPartner, globalPartnersApi } from '@/lib/globalPartnersApi';
import { globalPartnerSchema } from '@/lib/globalPartnersSchema';
import GlobalPartnersInfoPreview from '../components/GlobalPartnersInfo';
import { CharacterCounter } from '@/components/ui/character-counter';

const GlobalPartners = () => {
  const [partners, setPartners] = useState<GlobalPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPartner, setEditingPartner] = useState<string | null>(null);
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const [viewingInfo, setViewingInfo] = useState<GlobalPartner | null>(null);

  // Form State
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    shortName: '',
    location: '',
    website: '',
    shortDescription: '',
    about: '',
    collaboration: '',
    impact: '',
    programs: '',
    featuredImage: '',
    detailImages: [] as string[]
  });
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [detailImageFiles, setDetailImageFiles] = useState<File[]>([]);
  
  // Track existing images separately for updates
  const [existingDetailImages, setExistingDetailImages] = useState<string[]>([]);
  const [existingDetailImageKeys, setExistingDetailImageKeys] = useState<string[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<{url: string, key: string}[]>([]);

  // Ref for edit form to scroll into view
  const editFormRef = useRef<HTMLDivElement>(null);

  // Load data on component mount
  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await globalPartnersApi.getAll();
      setPartners(data);
    } catch (err) {
      setError('Failed to load global partners');
      console.error('Error loading global partners:', err);
    } finally {
      setLoading(false);
    }
  };

  // Partner Management Functions
  const handleAddPartner = () => {
    setIsAddingPartner(true);
    setPartnerForm({
      name: '',
      shortName: '',
      location: '',
      website: '',
      shortDescription: '',
      about: '',
      collaboration: '',
      impact: '',
      programs: '',
      featuredImage: '',
      detailImages: []
    });
    setFeaturedImageFile(null);
    setDetailImageFiles([]);
    setExistingDetailImages([]);
    setExistingDetailImageKeys([]);
    setImagesToRemove([]);
    
    // Scroll to edit form
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleEditPartner = (partner: GlobalPartner) => {
    setEditingPartner(partner._id!);
    setPartnerForm({
      name: partner.name,
      shortName: partner.shortName,
      location: partner.location,
      website: partner.website || '',
      shortDescription: partner.shortDescription,
      about: partner.about || '',
      collaboration: partner.collaboration || '',
      impact: partner.impact || '',
      programs: partner.programs ? partner.programs.join('\n') : '',
      featuredImage: partner.featuredImage,
      detailImages: partner.detailImages || []
    });
    setFeaturedImageFile(null);
    setDetailImageFiles([]);
    
    // Set existing images for tracking
    setExistingDetailImages(partner.detailImages || []);
    setExistingDetailImageKeys((partner as any).detailImageKeys || []);
    setImagesToRemove([]);
    
    // Scroll to edit form
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const validateForm = () => {
    try {
      globalPartnerSchema.parse(partnerForm);
      
      // Check if featured image is required for new partners
      if (!editingPartner && !featuredImageFile && !partnerForm.featuredImage) {
        toast.error('Featured image is required');
        return false;
      }

      // Check if detail images are required (existing + new combined)
      const totalDetailImages = existingDetailImages.length + detailImageFiles.length;
      if (!editingPartner && totalDetailImages === 0) {
        toast.error('At least one detail image is required');
        return false;
      }

      // For editing, check if at least one detail image remains after removal
      if (editingPartner && totalDetailImages === 0) {
        toast.error('At least one detail image is required');
        return false;
      }

      return true;
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        toast.error(err.errors[0].message);
      } else {
        toast.error('Please fill in all required fields correctly');
      }
      return false;
    }
  };

  const handleSavePartner = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Convert programs string to array
      const programsArray = partnerForm.programs
        ? partnerForm.programs.split('\n').filter(p => p.trim() !== '')
        : [];

      const dataToSubmit = {
        ...partnerForm,
        programs: programsArray
      };

      if (editingPartner) {
        // For update: send existing images, new images, and images to remove
        await globalPartnersApi.update(
          editingPartner,
          {
            ...dataToSubmit,
            existingDetailImages,
            imagesToRemove
          } as any,
          featuredImageFile || undefined,
          detailImageFiles.length > 0 ? detailImageFiles : undefined
        );
        toast.success('Global partner updated successfully');
      } else {
        // For create: just send new data
        await globalPartnersApi.create(
          dataToSubmit as any,
          featuredImageFile || undefined,
          detailImageFiles
        );
        toast.success('Global partner added successfully');
      }
      await loadPartners();
      handleCancelPartner();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save global partner');
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this global partner?')) {
      try {
        await globalPartnersApi.delete(id);
        toast.success('Global partner deleted successfully');
        await loadPartners();
      } catch (err) {
        toast.error('Failed to delete global partner');
      }
    }
  };

  const handleCancelPartner = () => {
    setEditingPartner(null);
    setIsAddingPartner(false);
    setPartnerForm({
      name: '',
      shortName: '',
      location: '',
      website: '',
      shortDescription: '',
      about: '',
      collaboration: '',
      impact: '',
      programs: '',
      featuredImage: '',
      detailImages: []
    });
    setFeaturedImageFile(null);
    setDetailImageFiles([]);
    setExistingDetailImages([]);
    setExistingDetailImageKeys([]);
    setImagesToRemove([]);
  };

  // Handle removal of existing detail images
  const handleRemoveExistingImage = (index: number, imageUrl: string, imageKey?: string) => {
    // Add to removal list
    if (imageKey) {
      setImagesToRemove([...imagesToRemove, { url: imageUrl, key: imageKey }]);
    }
    
    // Remove from existing images
    const newExistingImages = existingDetailImages.filter((_, i) => i !== index);
    const newExistingKeys = existingDetailImageKeys.filter((_, i) => i !== index);
    
    setExistingDetailImages(newExistingImages);
    setExistingDetailImageKeys(newExistingKeys);
  };

  const handleRemoveAllExistingImages = () => {
    // Add all to removal list
    const allToRemove = existingDetailImages.map((url, index) => ({
      url,
      key: existingDetailImageKeys[index] || ''
    })).filter(item => item.key);
    
    setImagesToRemove([...imagesToRemove, ...allToRemove]);
    setExistingDetailImages([]);
    setExistingDetailImageKeys([]);
  };

  const handleViewInfo = (partner: GlobalPartner) => {
    setViewingInfo(partner);
  };

  const handleCloseInfo = () => {
    setViewingInfo(null);
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
      const newArray = [...partners];
      const draggedItem = newArray[dragIndex];
      newArray.splice(dragIndex, 1);
      newArray.splice(dropIndex, 0, draggedItem);
      
      setPartners(newArray);
      
      // Save new order to backend
      try {
        const reorderData = newArray.map((item, index) => ({
          id: item._id!,
          display_order: index + 1
        }));
        
        await globalPartnersApi.reorder({ type: 'global-partner', items: reorderData });
        toast.success('Partner order updated');
      } catch (err) {
        toast.error('Failed to update order');
        await loadPartners();
      }
    }
  };

  // Loading and error states
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
          <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Global Partners</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Global Partners</h1>
        <p className="text-gray-600">Manage global partners displayed on the website</p>
      </div>

      {/* Ordering Instructions */}
      {/* <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <GripVertical className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Easy Reordering</h3>
            <p className="text-sm text-blue-800">
              Simply drag and drop partners to reorder them! The order you set here will be the same order displayed on the website.
            </p>
          </div>
        </div>
      </div> */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Globe className="w-6 h-6" />
          Global Partners ({partners.length})
        </h2>
        <Button onClick={handleAddPartner} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Partner
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingPartner || editingPartner) && (
        <Card ref={editFormRef} className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingPartner ? 'Edit Global Partner' : 'Add New Global Partner'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Partner Name * <span className="text-xs text-gray-500">(3-200 chars)</span>
                  </label>
                  <Input
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm({...partnerForm, name: e.target.value})}
                    placeholder="e.g., Aflatoun International"
                  />
                  <CharacterCounter current={partnerForm.name.length} max={200} min={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Name * <span className="text-xs text-gray-500">(2-50 chars)</span>
                  </label>
                  <Input
                    value={partnerForm.shortName}
                    onChange={(e) => setPartnerForm({...partnerForm, shortName: e.target.value})}
                    placeholder="e.g., Aflatoun"
                  />
                  <CharacterCounter current={partnerForm.shortName.length} max={50} min={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location * <span className="text-xs text-gray-500">(3-200 chars)</span>
                  </label>
                  <Input
                    value={partnerForm.location}
                    onChange={(e) => setPartnerForm({...partnerForm, location: e.target.value})}
                    placeholder="e.g., Global Organization"
                  />
                  <CharacterCounter current={partnerForm.location.length} max={200} min={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <Input
                    type="url"
                    value={partnerForm.website}
                    onChange={(e) => setPartnerForm({...partnerForm, website: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-4">Images</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image * <span className="text-xs text-gray-500">(For card display - Logo)</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px (4:3 ratio), Max 2MB, JPG/PNG/WebP format</p>
                  <ImageUpload
                    value={partnerForm.featuredImage}
                    onChange={(file, previewUrl) => {
                      setFeaturedImageFile(file);
                      setPartnerForm({...partnerForm, featuredImage: previewUrl});
                    }}
                    placeholder="Upload featured image (logo)"
                    required={!editingPartner}
                    previewSize="lg"
                    previewShape="square"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detail Images * <span className="text-xs text-gray-500">(For detail page gallery)</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1200x800px (3:2 ratio), Max 2MB each, Up to 10 images total, JPG/PNG/WebP format</p>
                  
                  {/* Show existing images when editing */}
                  {editingPartner && existingDetailImages.length > 0 && (
                    <div className="mb-4">
                      <ExistingImagesManager
                        existingImages={existingDetailImages}
                        existingImageKeys={existingDetailImageKeys}
                        onRemove={handleRemoveExistingImage}
                        onRemoveAll={handleRemoveAllExistingImages}
                      />
                    </div>
                  )}
                  
                  {/* New images upload */}
                  <div>
                    {editingPartner && (
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add New Images <span className="text-xs text-gray-500">(Optional - to add more images)</span>
                      </label>
                    )}
                    <MultipleImageUpload
                      value={[]}
                      onChange={(files) => {
                        setDetailImageFiles(files);
                      }}
                      maxImages={10 - existingDetailImages.length}
                      placeholder={editingPartner ? "Upload additional images" : "Upload detail images"}
                      required={!editingPartner && existingDetailImages.length === 0}
                    />
                  </div>

                  {/* Summary */}
                  {editingPartner && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Total Images:</strong> {existingDetailImages.length} existing + {detailImageFiles.length} new = {existingDetailImages.length + detailImageFiles.length} total
                        {imagesToRemove.length > 0 && (
                          <span className="text-red-600 ml-2">
                            ({imagesToRemove.length} marked for removal)
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Descriptions */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-4">Descriptions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description * <span className="text-xs text-gray-500">(50-500 chars - for card)</span>
                  </label>
                  <Textarea
                    value={partnerForm.shortDescription}
                    onChange={(e) => setPartnerForm({...partnerForm, shortDescription: e.target.value})}
                    placeholder="Brief description for card display..."
                    rows={3}
                  />
                  <CharacterCounter current={partnerForm.shortDescription.length} max={500} min={50} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About <span className="text-xs text-gray-500">(Min 100 chars)</span>
                  </label>
                  <Textarea
                    value={partnerForm.about}
                    onChange={(e) => setPartnerForm({...partnerForm, about: e.target.value})}
                    placeholder="About the partner organization..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Our Collaboration <span className="text-xs text-gray-500">(Min 100 chars)</span>
                  </label>
                  <Textarea
                    value={partnerForm.collaboration}
                    onChange={(e) => setPartnerForm({...partnerForm, collaboration: e.target.value})}
                    placeholder="Describe the collaboration with NEIEA..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Impact <span className="text-xs text-gray-500">(Min 100 chars)</span>
                  </label>
                  <Textarea
                    value={partnerForm.impact}
                    onChange={(e) => setPartnerForm({...partnerForm, impact: e.target.value})}
                    placeholder="Impact of the partnership..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key Programs <span className="text-xs text-gray-500">(One program per line)</span>
                  </label>
                  <Textarea
                    value={partnerForm.programs}
                    onChange={(e) => setPartnerForm({...partnerForm, programs: e.target.value})}
                    placeholder="Social and Financial Education Curriculum&#10;Teacher Training Programs&#10;Online Course Delivery"
                    rows={5}
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter each program on a new line</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSavePartner} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                {editingPartner ? 'Update' : 'Save'}
              </Button>
              <Button onClick={handleCancelPartner} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Partners List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, index) => (
          <Card 
            key={partner._id} 
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
              <div className="mb-3">
                <img
                  src={partner.featuredImage}
                  alt={partner.name}
                  className="w-full h-32 object-contain bg-gray-50 rounded mb-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/placeholder.png';
                  }}
                />
                <h3 className="font-semibold text-gray-900 text-sm">{partner.name}</h3>
                <p className="text-xs text-gray-600">{partner.location}</p>
              </div>
              <p className="text-xs text-gray-700 mb-4 line-clamp-2">
                {partner.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditPartner(partner)}
                  className="text-xs"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                {/* <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewInfo(partner)}
                  className="text-blue-600 hover:text-blue-700 text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button> */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeletePartner(partner._id!)}
                  className="text-red-600 hover:text-red-700 text-xs"
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
      {partners.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Global Partners Found</h3>
          <p className="text-gray-600 mb-6">Start by adding a new global partner.</p>
          <Button onClick={handleAddPartner} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add First Partner
          </Button>
        </div>
      )}

      {/* Info Preview Modal */}
      {viewingInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2">
          <div className="bg-white rounded-lg w-full h-full max-w-none max-h-none overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800">Preview: {viewingInfo.name}</h3>
              <Button onClick={handleCloseInfo} variant="outline" size="sm" className="hover:bg-gray-100">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-80px)]">
              <GlobalPartnersInfoPreview partner={viewingInfo} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalPartners;

