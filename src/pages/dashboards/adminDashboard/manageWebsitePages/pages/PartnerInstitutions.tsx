import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Eye, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ImageUpload from '@/components/ui/image-upload';
import MultipleImageUpload from '@/components/ui/multiple-image-upload';
import ExistingImagesManager from '@/components/ui/existing-images-manager';
import { PartnerInstitution, partnerInstitutionsApi } from '@/lib/partnerInstitutionsApi';
import { partnerInstitutionSchema } from '@/lib/partnerInstitutionsSchema';
import PartnerInstitutionsInfoPreview from '../components/PartnerInstitutionsInfo';
import { CharacterCounter } from '@/components/ui/character-counter';

const PartnerInstitutions = () => {
  const [institutions, setInstitutions] = useState<PartnerInstitution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingInstitution, setEditingInstitution] = useState<string | null>(null);
  const [isAddingInstitution, setIsAddingInstitution] = useState(false);
  const [viewingInfo, setViewingInfo] = useState<PartnerInstitution | null>(null);

  // Form State
  const [institutionForm, setInstitutionForm] = useState({
    name: '',
    shortName: '',
    location: '',
    address: '',
    website: '',
    facebook: '',
    shortDescription: '',
    about: '',
    foundingStory: '',
    challenges: '',
    neieaImpact: '',
    additionalInfo: '',
    totalStudents: '',
    established: '',
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
    loadInstitutions();
  }, []);

  const loadInstitutions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await partnerInstitutionsApi.getAll();
      setInstitutions(data);
    } catch (err) {
      setError('Failed to load partner institutions');
      console.error('Error loading partner institutions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Institution Management Functions
  const handleAddInstitution = () => {
    setIsAddingInstitution(true);
    setInstitutionForm({
      name: '',
      shortName: '',
      location: '',
      address: '',
      website: '',
      facebook: '',
      shortDescription: '',
      about: '',
      foundingStory: '',
      challenges: '',
      neieaImpact: '',
      additionalInfo: '',
      totalStudents: '',
      established: '',
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

  const handleEditInstitution = (institution: PartnerInstitution) => {
    setEditingInstitution(institution._id!);
    setInstitutionForm({
      name: institution.name,
      shortName: institution.shortName,
      location: institution.location,
      address: institution.address || '',
      website: institution.website || '',
      facebook: institution.facebook || '',
      shortDescription: institution.shortDescription,
      about: institution.about || '',
      foundingStory: institution.foundingStory || '',
      challenges: institution.challenges || '',
      neieaImpact: institution.neieaImpact || '',
      additionalInfo: institution.additionalInfo || '',
      totalStudents: institution.totalStudents,
      established: institution.established,
      featuredImage: institution.featuredImage,
      detailImages: institution.detailImages || []
    });
    setFeaturedImageFile(null);
    setDetailImageFiles([]);
    
    // Set existing images for tracking
    setExistingDetailImages(institution.detailImages || []);
    setExistingDetailImageKeys((institution as any).detailImageKeys || []);
    setImagesToRemove([]);
    
    // Scroll to edit form
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const validateForm = () => {
    try {
      partnerInstitutionSchema.parse(institutionForm);
      
      // Check if featured image is required for new institutions
      if (!editingInstitution && !featuredImageFile && !institutionForm.featuredImage) {
        toast.error('Featured image is required');
        return false;
      }

      // Check if detail images are required (existing + new combined)
      const totalDetailImages = existingDetailImages.length + detailImageFiles.length;
      if (!editingInstitution && totalDetailImages === 0) {
        toast.error('At least one detail image is required');
        return false;
      }

      // For editing, check if at least one detail image remains after removal
      if (editingInstitution && totalDetailImages === 0) {
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

  const handleSaveInstitution = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (editingInstitution) {
        // For update: send existing images, new images, and images to remove
        await partnerInstitutionsApi.update(
          editingInstitution,
          {
            ...institutionForm,
            existingDetailImages,
            imagesToRemove
          } as any,
          featuredImageFile || undefined,
          detailImageFiles.length > 0 ? detailImageFiles : undefined
        );
        toast.success('Partner institution updated successfully');
      } else {
        // For create: just send new data
        await partnerInstitutionsApi.create(
          institutionForm as any,
          featuredImageFile || undefined,
          detailImageFiles
        );
        toast.success('Partner institution added successfully');
      }
      await loadInstitutions();
      handleCancelInstitution();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save partner institution');
    }
  };

  const handleDeleteInstitution = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this partner institution?')) {
      try {
        await partnerInstitutionsApi.delete(id);
        toast.success('Partner institution deleted successfully');
        await loadInstitutions();
      } catch (err) {
        toast.error('Failed to delete partner institution');
      }
    }
  };

  const handleCancelInstitution = () => {
    setEditingInstitution(null);
    setIsAddingInstitution(false);
    setInstitutionForm({
      name: '',
      shortName: '',
      location: '',
      address: '',
      website: '',
      facebook: '',
      shortDescription: '',
      about: '',
      foundingStory: '',
      challenges: '',
      neieaImpact: '',
      additionalInfo: '',
      totalStudents: '',
      established: '',
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

  const handleViewInfo = (institution: PartnerInstitution) => {
    setViewingInfo(institution);
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
      const newArray = [...institutions];
      const draggedItem = newArray[dragIndex];
      newArray.splice(dragIndex, 1);
      newArray.splice(dropIndex, 0, draggedItem);
      
      setInstitutions(newArray);
      
      // Save new order to backend
      try {
        const reorderData = newArray.map((item, index) => ({
          id: item._id!,
          display_order: index + 1
        }));
        
        await partnerInstitutionsApi.reorder({ type: 'partner-institution', items: reorderData });
        toast.success('Institution order updated');
      } catch (err) {
        toast.error('Failed to update order');
        await loadInstitutions();
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
          <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Partner Institutions</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Partner Institutions</h1>
        <p className="text-gray-600">Manage partner institutions displayed on the website</p>
      </div>

      {/* Ordering Instructions */}
      {/* <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <GripVertical className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Easy Reordering</h3>
            <p className="text-sm text-blue-800">
              Simply drag and drop institutions to reorder them! The order you set here will be the same order displayed on the website.
            </p>
          </div>
        </div>
      </div> */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          Partner Institutions ({institutions.length})
        </h2>
        <Button onClick={handleAddInstitution} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Institution
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingInstitution || editingInstitution) && (
        <Card ref={editFormRef} className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingInstitution ? 'Edit Partner Institution' : 'Add New Partner Institution'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution Name * <span className="text-xs text-gray-500">(3-200 chars)</span>
                  </label>
                  <Input
                    value={institutionForm.name}
                    onChange={(e) => setInstitutionForm({...institutionForm, name: e.target.value})}
                    placeholder="e.g., M. Venkatarangaiya Foundation"
                  />
                  <CharacterCounter current={institutionForm.name.length} max={200} min={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Name * <span className="text-xs text-gray-500">(2-50 chars)</span>
                  </label>
                  <Input
                    value={institutionForm.shortName}
                    onChange={(e) => setInstitutionForm({...institutionForm, shortName: e.target.value})}
                    placeholder="e.g., MVF"
                  />
                  <CharacterCounter current={institutionForm.shortName.length} max={50} min={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location * <span className="text-xs text-gray-500">(3-200 chars)</span>
                  </label>
                  <Input
                    value={institutionForm.location}
                    onChange={(e) => setInstitutionForm({...institutionForm, location: e.target.value})}
                    placeholder="e.g., Hyderabad, Telangana"
                  />
                  <CharacterCounter current={institutionForm.location.length} max={200} min={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-xs text-gray-500">(10-500 chars)</span>
                  </label>
                  <Input
                    value={institutionForm.address}
                    onChange={(e) => setInstitutionForm({...institutionForm, address: e.target.value})}
                    placeholder="Full address"
                  />
                  <CharacterCounter current={institutionForm.address.length} max={500} min={10} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <Input
                    type="url"
                    value={institutionForm.website}
                    onChange={(e) => setInstitutionForm({...institutionForm, website: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Social Profile Link
                  </label>
                  <Input
                    type="url"
                    value={institutionForm.facebook}
                    onChange={(e) => setInstitutionForm({...institutionForm, facebook: e.target.value})}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Students/Impact * <span className="text-xs text-gray-500">(2-100 chars)</span>
                  </label>
                  <Input
                    value={institutionForm.totalStudents}
                    onChange={(e) => setInstitutionForm({...institutionForm, totalStudents: e.target.value})}
                    placeholder="e.g., 900+ Students"
                  />
                  <CharacterCounter current={institutionForm.totalStudents.length} max={100} min={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Established/Partnership * <span className="text-xs text-gray-500">(2-100 chars)</span>
                  </label>
                  <Input
                    value={institutionForm.established}
                    onChange={(e) => setInstitutionForm({...institutionForm, established: e.target.value})}
                    placeholder="e.g., Since 2020"
                  />
                  <CharacterCounter current={institutionForm.established.length} max={100} min={2} />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-4">Images</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image * <span className="text-xs text-gray-500">(For card display)</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 800x600px (4:3 ratio), Max 2MB, JPG/PNG/WebP format</p>
                  <ImageUpload
                    value={institutionForm.featuredImage}
                    onChange={(file, previewUrl) => {
                      setFeaturedImageFile(file);
                      setInstitutionForm({...institutionForm, featuredImage: previewUrl});
                    }}
                    placeholder="Upload featured image"
                    required={!editingInstitution}
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
                  {editingInstitution && existingDetailImages.length > 0 && (
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
                    {editingInstitution && (
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
                      placeholder={editingInstitution ? "Upload additional images" : "Upload detail images"}
                      required={!editingInstitution && existingDetailImages.length === 0}
                    />
                  </div>

                  {/* Summary */}
                  {editingInstitution && (
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
                    Short Description * <span className="text-xs text-gray-500">(50-300 chars - for card)</span>
                  </label>
                  <Textarea
                    value={institutionForm.shortDescription}
                    onChange={(e) => setInstitutionForm({...institutionForm, shortDescription: e.target.value})}
                    placeholder="Brief description for card display..."
                    rows={3}
                  />
                  <CharacterCounter current={institutionForm.shortDescription.length} max={300} min={50} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About <span className="text-xs text-gray-500">(Min 100 chars)</span>
                  </label>
                  <Textarea
                    value={institutionForm.about}
                    onChange={(e) => setInstitutionForm({...institutionForm, about: e.target.value})}
                    placeholder="About the institution..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Founding Story <span className="text-xs text-gray-500">(Min 100 chars)</span>
                  </label>
                  <Textarea
                    value={institutionForm.foundingStory}
                    onChange={(e) => setInstitutionForm({...institutionForm, foundingStory: e.target.value})}
                    placeholder="Story about how the institution was founded..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Challenges <span className="text-xs text-gray-500">(Min 100 chars)</span>
                  </label>
                  <Textarea
                    value={institutionForm.challenges}
                    onChange={(e) => setInstitutionForm({...institutionForm, challenges: e.target.value})}
                    placeholder="Challenges faced by the institution..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NEIEA's Impact <span className="text-xs text-gray-500">(Min 100 chars)</span>
                  </label>
                  <Textarea
                    value={institutionForm.neieaImpact}
                    onChange={(e) => setInstitutionForm({...institutionForm, neieaImpact: e.target.value})}
                    placeholder="How NEIEA has made an impact..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information <span className="text-xs text-gray-500">(Min 50 chars)</span>
                  </label>
                  <Textarea
                    value={institutionForm.additionalInfo}
                    onChange={(e) => setInstitutionForm({...institutionForm, additionalInfo: e.target.value})}
                    placeholder="Any additional information..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSaveInstitution} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                {editingInstitution ? 'Update' : 'Save'}
              </Button>
              <Button onClick={handleCancelInstitution} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Institutions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {institutions.map((institution, index) => (
          <Card 
            key={institution._id} 
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
                  src={institution.featuredImage}
                  alt={institution.name}
                  className="w-full h-32 object-contain bg-gray-50 rounded mb-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/placeholder.png';
                  }}
                />
                <h3 className="font-semibold text-gray-900 text-sm">{institution.name}</h3>
                <p className="text-xs text-gray-600">{institution.location}</p>
              </div>
              <p className="text-xs text-gray-700 mb-4 line-clamp-2">
                {institution.shortDescription}
              </p>
              <div className="flex justify-between items-center mb-4">
                <Badge variant="secondary" className="text-xs">
                  {institution.totalStudents}
                </Badge>
                <span className="text-xs text-gray-500">{institution.established}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditInstitution(institution)}
                  className="text-xs"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                {/* <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewInfo(institution)}
                  className="text-blue-600 hover:text-blue-700 text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button> */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteInstitution(institution._id!)}
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
      {institutions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Partner Institutions Found</h3>
          <p className="text-gray-600 mb-6">Start by adding a new partner institution.</p>
          <Button onClick={handleAddInstitution} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add First Institution
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
              <PartnerInstitutionsInfoPreview institution={viewingInfo} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerInstitutions;

