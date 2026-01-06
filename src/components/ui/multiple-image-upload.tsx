import React, { useState, useRef } from 'react';
import { Upload, X, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

interface MultipleImageUploadProps {
  value?: string[];
  onChange: (files: File[], previewUrls: string[]) => void;
  maxImages?: number;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  value = [],
  onChange,
  maxImages = 10,
  placeholder = "Upload images",
  className = "",
  required = false
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>(value);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Check file size (2MB)
        const isValidSize = file.size <= 2 * 1024 * 1024;
        
        if (!isValidSize) {
          toast.error(`${file.name}: Image size must be less than 2MB`);
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => {
        toast.error(`${file.name}: Invalid image file`);
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length === 0) return;

    // Check if adding these files would exceed max images
    if (previews.length + selectedFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);
    
    try {
      const validFiles: File[] = [];
      const validPreviews: string[] = [];

      for (const file of selectedFiles) {
        const isValid = await validateImage(file);
        if (isValid) {
          validFiles.push(file);
          validPreviews.push(URL.createObjectURL(file));
        }
      }

      if (validFiles.length > 0) {
        const newFiles = [...files, ...validFiles];
        const newPreviews = [...previews, ...validPreviews];
        
        setFiles(newFiles);
        setPreviews(newPreviews);
        onChange(newFiles, newPreviews);
        toast.success(`${validFiles.length} image(s) selected successfully`);
      }
    } catch (error) {
      console.error('Error selecting images:', error);
      toast.error('Failed to select images');
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    // Clean up preview URL only if it's a blob URL
    if (previews[index] && previews[index].startsWith('blob:')) {
      URL.revokeObjectURL(previews[index]);
    }

    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
    onChange(newFiles, newPreviews);
    toast.success('Image removed successfully');
  };

  const handleRemoveAllImages = () => {
    // Clean up all blob URLs
    previews.forEach(preview => {
      if (preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    });

    setFiles([]);
    setPreviews([]);
    onChange([], []);
    toast.success('All images removed');
  };

  const handleAddMore = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading || previews.length >= maxImages}
      />

      {/* Upload Button */}
      {previews.length === 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center gap-2"
        >
          {isUploading ? (
            <RefreshCw className="w-6 h-6 animate-spin" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
          <span className="text-sm text-gray-600">
            {isUploading ? 'Uploading...' : placeholder}
          </span>
          <span className="text-xs text-gray-500">
            Max 2MB per image, up to {maxImages} images
          </span>
          <span className="text-xs text-gray-500">
            Recommended: 1200x800px (3:2 ratio)
          </span>
        </Button>
      )}

      {/* Images Preview Grid */}
      {previews.length > 0 && (
        <div className="space-y-4">
          {/* Header with Remove All button */}
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-700">
              Selected Images ({previews.length}/{maxImages})
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveAllImages}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-1" />
              Remove All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-50"
                  />
                </div>
                {/* Remove button - Always visible on mobile, hover on desktop */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full p-0 shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                  title="Remove this image"
                >
                  <X className="w-4 h-4" />
                </Button>
                {/* Image number badge */}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded shadow">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Add More Button */}
          {previews.length < maxImages && (
            <Button
              type="button"
              variant="outline"
              onClick={handleAddMore}
              disabled={isUploading}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Add More Images ({previews.length}/{maxImages})
            </Button>
          )}

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center">
            {previews.length === maxImages 
              ? `Maximum ${maxImages} images reached`
              : `You can add ${maxImages - previews.length} more image(s)`
            }
          </p>
        </div>
      )}

      {/* Hidden input for form validation */}
      {required && (
        <input
          type="hidden"
          value={previews.length > 0 ? 'valid' : ''}
          required={required && previews.length === 0}
        />
      )}
    </div>
  );
};

export default MultipleImageUpload;

