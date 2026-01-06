import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null, previewUrl: string) => void;
  placeholder?: string;
  className?: string;
  showPreview?: boolean;
  previewSize?: 'sm' | 'md' | 'lg' | 'hero';
  previewShape?: 'circle' | 'square' | 'rectangular';
  required?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  placeholder = "Upload image",
  className = "",
  showPreview = true,
  previewSize = 'md',
  previewShape = 'circle',
  required = false
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // TEMPORARILY DISABLED: Dimension validation (square image - same width and height)
        // const isValidDimensions = img.width === img.height;
        
        // Check file size (2MB)
        const isValidSize = file.size <= 2 * 1024 * 1024;
        
        // TEMPORARILY DISABLED: Dimension validation
        // if (!isValidDimensions) {
        //   toast.error(`Image must be square (same width and height). Current: ${img.width}x${img.height}`);
        //   resolve(false);
        // } else 
        if (!isValidSize) {
          toast.error('Image size must be less than 2MB');
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => {
        toast.error('Invalid image file');
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const isValid = await validateImage(file);
      if (!isValid) {
        setIsUploading(false);
        return;
      }

      // Create preview URL and store file
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onChange(file, previewUrl);
      setIsUploading(false);
      toast.success('Image selected successfully');
    } catch (error) {
      console.error('Error selecting image:', error);
      toast.error('Failed to select image');
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    // Clean up preview URL to prevent memory leaks
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onChange(null, '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Image removed');
  };

  const handleReupload = () => {
    fileInputRef.current?.click();
  };

  const getPreviewSize = () => {
    switch (previewSize) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32';
      case 'hero': return 'max-w-full h-auto';
      default: return 'w-24 h-24';
    }
  };

  const getPreviewClasses = () => {
    const sizeClasses = getPreviewSize();
    let shapeClasses = 'rounded-lg';
    if (previewShape === 'circle') {
      shapeClasses = 'rounded-full';
    } else if (previewShape === 'rectangular' || previewSize === 'hero') {
      shapeClasses = 'rounded-lg';
    }
    const objectFit = (previewShape === 'rectangular' || previewSize === 'hero') ? 'object-contain' : 'object-cover';
    return `${sizeClasses} ${shapeClasses} ${objectFit} border-2 border-gray-200`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* Upload Button */}
      {!preview && (
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
            Max 2MB (dimension validation temporarily disabled)
          </span>
        </Button>
      )}

      {/* Image Preview */}
      {preview && showPreview && (
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className={getPreviewClasses()}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
              onClick={handleRemoveImage}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReupload}
              disabled={isUploading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reupload
            </Button>
            <span className="text-xs text-gray-500">
              Click to upload a different image
            </span>
          </div>
        </div>
      )}

      {/* Hidden input for form validation */}
      {required && (
        <input
          type="hidden"
          value={preview || ''}
          required={required && !preview}
        />
      )}
    </div>
  );
};

export default ImageUpload;
