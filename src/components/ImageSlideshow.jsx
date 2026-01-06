import React, { useState, useEffect, useCallback } from 'react';
import './ImageSlideshow.css';

const ImageSlideshow = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsZoomed(false);
  }, [images.length]);

  // Navigate to next image
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setIsZoomed(false);
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="slideshow-overlay" onClick={onClose}>
      <div className="slideshow-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="slideshow-close" 
          onClick={onClose}
          aria-label="Close slideshow"
          title="Close (Esc)"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button 
            className="slideshow-nav slideshow-nav-prev" 
            onClick={goToPrevious}
            aria-label="Previous image"
            title="Previous (←)"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        )}

        {/* Image Container */}
        <div className="slideshow-image-wrapper">
          <img
            src={currentImage.image}
            alt={currentImage.title}
            className={`slideshow-image ${isZoomed ? 'zoomed' : ''}`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button 
            className="slideshow-nav slideshow-nav-next" 
            onClick={goToNext}
            aria-label="Next image"
            title="Next (→)"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        )}

        {/* Image Info */}
        <div className="slideshow-info">
          <div className="slideshow-info-content">
            <div className="slideshow-title-section">
              <h3 className="slideshow-title">{currentImage.title}</h3>
              {currentImage.category && (
                <span className="slideshow-category">
                  {currentImage.category}
                </span>
              )}
              {currentImage.year && (
                <span className="slideshow-year">{currentImage.year}</span>
              )}
            </div>
            {currentImage.description && (
              <p className="slideshow-description">{currentImage.description}</p>
            )}
          </div>
          <div className="slideshow-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="slideshow-thumbnails">
            {images.map((img, index) => (
              <div
                key={img.id || index}
                className={`slideshow-thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsZoomed(false);
                }}
              >
                <img src={img.image} alt={img.title} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlideshow;
