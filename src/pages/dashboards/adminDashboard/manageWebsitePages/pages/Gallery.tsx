import { useState, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, GripVertical, Image as ImageIcon, Eye, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ImageUpload from '@/components/ui/image-upload';
import { galleryApi, GalleryItem, CreateGalleryItemData } from '@/lib/galleryApi';
import { useAdminGallery } from '@/hooks/useGallery';

// Types for Gallery Categories
interface GalleryCategory {
  id: string;
  name: string;
  count: number;
}

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [viewingItem, setViewingItem] = useState<GalleryItem | null>(null);
  
  // Use the custom hook for admin gallery data
  const { galleryItems, loading, error, refetch } = useAdminGallery();

  const [itemForm, setItemForm] = useState<CreateGalleryItemData>({
    title: '',
    description: '',
    category: 'events',
    year: new Date().getFullYear().toString()
  });
  const [itemImageFile, setItemImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Ref for edit form to scroll into view
  const editFormRef = useRef<HTMLDivElement>(null);

  // Category totals (computed from all items)
  const totalByCategory = galleryItems.reduce<Record<string, number>>((acc, item) => {
    const key = item.category;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const categories: GalleryCategory[] = [
    { id: 'all', name: 'All Images', count: galleryItems.length },
    { id: 'events', name: 'Events', count: totalByCategory.events || 0 },
    { id: 'leadership', name: 'Leadership', count: totalByCategory.leadership || 0 },
    { id: 'partnerships', name: 'Partnerships', count: totalByCategory.partnerships || 0 },
    { id: 'workshops', name: 'Workshops', count: totalByCategory.workshops || 0 },
    { id: 'digital', name: 'Digital', count: totalByCategory.digital || 0 }
  ];

  const parseObjectIdTimestamp = (id?: string) => {
    if (!id || id.length < 8) return 0;
    const timestampHex = id.substring(0, 8);
    return parseInt(timestampHex, 16) * 1000;
  };

  const getItemTimestamp = (item: GalleryItem) => {
    const created = item.created_at ? new Date(item.created_at).getTime() : 0;
    if (created) return created;
    const updated = item.updated_at ? new Date(item.updated_at).getTime() : 0;
    if (updated) return updated;
    return parseObjectIdTimestamp(item._id);
  };

  const getCurrentItems = () => {
    if (!galleryItems || !Array.isArray(galleryItems)) {
      return [];
    }

    const itemsForCategory = activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === activeCategory);

    return [...itemsForCategory]
      .sort((a, b) => {
        const timeA = getItemTimestamp(a);
        const timeB = getItemTimestamp(b);
        if (timeA !== timeB) {
          return timeB - timeA;
        }

        const hasOrderA = typeof a.display_order === 'number' && a.display_order > 0;
        const hasOrderB = typeof b.display_order === 'number' && b.display_order > 0;

        if (hasOrderA && hasOrderB && a.display_order !== b.display_order) {
          return (a.display_order ?? 0) - (b.display_order ?? 0);
        }

        if (hasOrderA && !hasOrderB) return -1;
        if (!hasOrderA && hasOrderB) return 1;

        const yearA = parseInt(a.year) || 0;
        const yearB = parseInt(b.year) || 0;
        return yearB - yearA;
      });
  };

  // Item Management Functions
  const handleAddItem = () => {
    setIsAddingItem(true);
    setItemForm({
      title: '',
      description: '',
      category: activeCategory === 'all' ? 'events' : activeCategory,
      year: new Date().getFullYear().toString()
    });
    setItemImageFile(null);
    
    // Scroll to edit form
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleEditItem = (item: GalleryItem) => {
    setEditingItem(item._id!);
    setItemForm({
      title: item.title,
      description: item.description,
      category: item.category,
      year: item.year
    });
    setItemImageFile(null);
    
    // Scroll to edit form
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSaveItem = async () => {
    if (!itemForm.title || !itemForm.description) {
      toast.error('Title and description are required');
      return;
    }

    if (!itemImageFile && !editingItem) {
      toast.error('Image file is required');
      return;
    }

    try {
      setSaving(true);
      if (editingItem) {
        await galleryApi.admin.update(editingItem, itemForm, itemImageFile || undefined);
        toast.success('Gallery item updated successfully');
      } else {
        if (!itemImageFile) {
          toast.error('Image file is required');
          return;
        }
        await galleryApi.admin.create(itemForm, itemImageFile);
        toast.success('Gallery item added successfully');
      }
      await refetch();
      handleCancelItem();
    } catch (err) {
      toast.error('Failed to save gallery item');
      console.error('Error saving gallery item:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await galleryApi.admin.delete(id);
        toast.success('Gallery item deleted successfully');
        await refetch(); // Reload data
      } catch (err) {
        toast.error('Failed to delete gallery item');
        console.error('Error deleting gallery item:', err);
      }
    }
  };

  const handleCancelItem = () => {
    setEditingItem(null);
    setIsAddingItem(false);
    setItemForm({
      title: '',
      description: '',
      category: activeCategory === 'all' ? 'events' : activeCategory,
      year: new Date().getFullYear().toString()
    });
    setItemImageFile(null);
  };

  const handleViewItem = (item: GalleryItem) => {
    setViewingItem(item);
  };

  const handleCloseView = () => {
    setViewingItem(null);
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
      const currentItems = getCurrentItems();
      const newArray = [...currentItems];
      const draggedItem = newArray[dragIndex];
      newArray.splice(dragIndex, 1);
      newArray.splice(dropIndex, 0, draggedItem);
      
      // Save new order to backend - use the actual sorted order
      try {
        const reorderData = newArray.map((item, index) => ({
          id: item._id!,
          display_order: index + 1
        }));
        
        await galleryApi.admin.reorder({ items: reorderData });
        toast.success('Gallery item order updated');
        await refetch(); // Reload data
      } catch (err) {
        toast.error('Failed to update order');
        console.error('Error reordering gallery items:', err);
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'events':
        return <Calendar className="w-4 h-4" />;
      case 'leadership':
        return <ImageIcon className="w-4 h-4" />;
      case 'partnerships':
        return <Tag className="w-4 h-4" />;
      case 'workshops':
        return <ImageIcon className="w-4 h-4" />;
      case 'digital':
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    const categoryObj = categories.find(cat => cat.id === category);
    return categoryObj ? categoryObj.name : category;
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
          <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Gallery Items</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Gallery</h1>
        <p className="text-gray-600">Manage gallery items and categories for the website</p>
      </div>

      {/* Ordering Instructions */}
      {/* <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <GripVertical className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Easy Reordering</h3>
            <p className="text-sm text-blue-800">
              Simply drag and drop gallery items to reorder them! Click and hold the grip handle (⋮⋮) on the left, 
              then drag the item to your desired position. The order you set here will be the same order displayed on the website.
            </p>
          </div>
        </div>
      </div> */}

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                activeCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getCategoryIcon(category.id)}
              {category.name}
              <span className="text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Category Content */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {getCategoryLabel(activeCategory)}
          </h2>
          <Button onClick={handleAddItem} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(isAddingItem || editingItem) && (
          <Card ref={editFormRef} className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <Input
                    value={itemForm.title}
                    onChange={(e) => setItemForm({...itemForm, title: e.target.value})}
                    placeholder="Enter item title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={itemForm.category}
                    onChange={(e) => setItemForm({...itemForm, category: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="events">Events</option>
                    <option value="leadership">Leadership</option>
                    <option value="partnerships">Partnerships</option>
                    <option value="workshops">Workshops</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <Input
                    value={itemForm.year}
                    onChange={(e) => setItemForm({...itemForm, year: e.target.value})}
                    placeholder="e.g., 2023"
                    type="number"
                    min="2000"
                    max="2030"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Upload instructions: Recommended size 1200x800px, Max 2MB, JPG/PNG/WebP format</p>
                  <ImageUpload
                    value={editingItem ? galleryItems.find(item => item._id === editingItem)?.image || '' : ''}
                    onChange={(file) => {
                      setItemImageFile(file);
                    }}
                    placeholder="Upload gallery image"
                    required={!editingItem}
                    previewSize="lg"
                    previewShape="square"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <Textarea
                  value={itemForm.description}
                  onChange={(e) => setItemForm({...itemForm, description: e.target.value})}
                  placeholder="Enter item description..."
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSaveItem} className="bg-green-600 hover:bg-green-700" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : editingItem ? 'Update' : 'Save'}
                </Button>
                <Button onClick={handleCancelItem} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gallery Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentItems().map((item, index) => (
            <Card 
              key={item._id} 
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
              
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/default-gallery.jpg';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="flex items-center gap-1 bg-white/90">
                      {getCategoryIcon(item.category)}
                      {getCategoryLabel(item.category)}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500 font-medium">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    {/* <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewItem(item)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button> */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteItem(item._id!)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {getCurrentItems().length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No gallery items found</h3>
            <p className="text-gray-600 mb-6">
              {activeCategory === 'all' 
                ? 'Start by adding gallery items to showcase your work.'
                : `No items found in the ${getCategoryLabel(activeCategory)} category.`
              }
            </p>
            <Button onClick={handleAddItem} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add First Item
            </Button>
          </div>
        )}
      </div>

      {/* Item Preview Modal */}
      {viewingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800">Gallery Item Preview</h3>
              <Button onClick={handleCloseView} variant="outline" size="sm" className="hover:bg-gray-100">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={viewingItem.image}
                      alt={viewingItem.title}
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/default-gallery.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getCategoryIcon(viewingItem.category)}
                        {getCategoryLabel(viewingItem.category)}
                      </Badge>
                      <span className="text-sm text-gray-500">{viewingItem.year}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {viewingItem.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {viewingItem.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
