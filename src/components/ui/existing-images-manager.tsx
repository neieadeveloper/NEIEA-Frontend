import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

interface ExistingImagesManagerProps {
  existingImages: string[];
  existingImageKeys?: string[];
  onRemove: (index: number, imageUrl: string, imageKey?: string) => void;
  onRemoveAll?: () => void;
  className?: string;
}

const ExistingImagesManager: React.FC<ExistingImagesManagerProps> = ({
  existingImages = [],
  existingImageKeys = [],
  onRemove,
  onRemoveAll,
  className = ""
}) => {
  const [images, setImages] = useState<string[]>(existingImages);

  useEffect(() => {
    setImages(existingImages);
  }, [existingImages]);

  const handleRemove = (index: number) => {
    const imageUrl = images[index];
    const imageKey = existingImageKeys[index];
    onRemove(index, imageUrl, imageKey);
    toast.success('Existing image marked for removal');
  };

  const handleRemoveAll = () => {
    if (onRemoveAll) {
      onRemoveAll();
      toast.success('All existing images marked for removal');
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-700">
          Existing Images ({images.length})
        </p>
        {onRemoveAll && images.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemoveAll}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            Remove All Existing
          </Button>
        )}
      </div>

      {/* Existing Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-yellow-300 bg-yellow-50">
              <img
                src={image}
                alt={`Existing ${index + 1}`}
                className="w-full h-full object-contain bg-white"
              />
            </div>
            {/* Remove button */}
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full p-0 shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(index)}
              title="Remove this existing image"
            >
              <X className="w-4 h-4" />
            </Button>
            {/* Existing badge */}
            <div className="absolute bottom-2 left-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded shadow font-medium">
              Existing #{index + 1}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
        ℹ️ Yellow border indicates existing images. Remove unwanted images before saving.
      </p>
    </div>
  );
};

export default ExistingImagesManager;

