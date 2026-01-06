import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
// Using public path for consistency with other components
const slider1 = '/assets/images/newSliderImage.png';
const slider2 = '/assets/images/resized_classroom_image.png';
const slider3 = '/assets/images/resized_classroom_image2.png';
const slider4 = '/assets/images/slider5 (1).jpg';
const slider5 = '/assets/images/slider6 (1).jpeg';
const slider6 = '/assets/images/homesider6image.jpg';

// Mobile Carousel Component
const MobileCarousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayPlugin] = useState(() => Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false }, [autoplayPlugin]);

  // Embla carousel slide change handler
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Debug: Log slides count
  useEffect(() => {
    if (slides && slides.length > 0) {
      console.log('Mobile Carousel: Slides count:', slides.length, 'Current slide:', currentSlide);
    }
  }, [slides, currentSlide]);

  return (
    <div 
      key="mobile-carousel"
      className="mobile-swiper-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '300px',
        margin: 0,
        padding: 0,
        marginBottom: 0,
        overflow: 'hidden'
      }}
    >
      <div className="embla" ref={emblaRef} style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
        <div className="embla__container" style={{ display: 'flex', height: '100%' }}>
          {slides.map((slide, index) => (
            <div 
              key={`mobile-slide-${index}`}
              className="embla__slide"
              style={{
                flex: '0 0 100%',
                minWidth: 0,
                position: 'relative',
                height: '100%'
              }}
            >
              <img 
                src={slide.img} 
                alt={slide.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                  margin: 0,
                  padding: 0,
                  border: 'none'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              
              {/* Hero Text Overlay */}
              {slide.textOverlayActive && (slide.headingText || slide.subHeadingText) && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      slide.textPosition === 'left'
                        ? 'flex-start'
                        : slide.textPosition === 'right'
                          ? 'flex-end'
                          : 'center',
                    padding: '14px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      color: slide.textColor || '#ffffff',
                      textAlign: slide.textPosition || 'center',
                      maxWidth: '92%',
                      maxHeight: '100%',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      overflow: 'hidden',
                      backgroundColor: slide.backgroundOverlay || 'rgba(0, 0, 0, 0.4)',
                      padding: '12px',
                      borderRadius: '10px',
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.35)'
                    }}
                  >
                    {slide.headingText && (
                      <h1
                        style={{
                          fontSize: 'clamp(1rem, 5vw, 1.5rem)',
                          fontWeight: '700',
                          margin: 0,
                          marginBottom: '0.3rem',
                          textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                          animation: 'fadeInDown 0.8s ease-out',
                          lineHeight: '1.2',
                          wordWrap: 'break-word',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {slide.headingText}
                      </h1>
                    )}
                    {slide.subHeadingText && (
                      <h2
                        style={{
                          fontSize: 'clamp(0.7rem, 3vw, 0.9rem)',
                          fontWeight: '400',
                          margin: 0,
                          textShadow: '0 2px 6px rgba(0, 0, 0, 0.7)',
                          animation: 'fadeInUp 0.8s ease-out 0.2s both',
                          lineHeight: '1.3',
                          wordWrap: 'break-word',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {slide.subHeadingText}
                      </h2>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination Dots */}
      {slides && slides.length > 0 && (
        <div 
          className="mobile-carousel-pagination"
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            zIndex: 10,
            padding: '6px 10px',
            pointerEvents: 'auto',
            width: 'auto',
            minWidth: 'fit-content',
            visibility: 'visible',
            opacity: 1
          }}
        >
           {slides.map((_, index) => (
             <button
               key={`dot-${index}`}
               className={currentSlide === index ? 'pagination-active' : 'pagination-inactive'}
               onClick={() => {
                 if (emblaApi) {
                   emblaApi.scrollTo(index);
                 }
               }}
               style={{
                 width: currentSlide === index ? '16px' : '5px',
                 height: '5px',
                 borderRadius: '0px',
                 border: 'none',
                 backgroundColor: currentSlide === index ? '#E0E0E0' : '#ffffff',
                 transition: 'all 0.3s ease',
                 cursor: 'pointer',
                 padding: 0,
                 outline: 'none',
                 flexShrink: 0,
                 display: 'block',
                 minWidth: currentSlide === index ? '16px' : '5px',
                 minHeight: '5px',
                 visibility: 'visible',
                 opacity: 1,
                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
               }}
               aria-label={`Go to slide ${index + 1}`}
             />
           ))}
        </div>
      )}
    </div>
  );
};

const Banner = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Use dynamic data if available, otherwise fallback to static data
  const slides = data?.slides?.length > 0 ? data.slides.map(slide => ({
    img: slide.image,
    alt: slide.alt,
    headingText: slide.headingText,
    subHeadingText: slide.subHeadingText,
    textPosition: slide.textPosition || 'center',
    textColor: slide.textColor || '#ffffff',
    backgroundOverlay: slide.backgroundOverlay || 'rgba(0, 0, 0, 0.4)',
    textOverlayActive: slide.textOverlayActive !== false // default true if not specified
  })) : [
    { 
      img: slider1, 
      alt: "Philanthropy Summit",
      headingText: '',
      subHeadingText: '',
      textPosition: 'center',
      textColor: '#ffffff',
      backgroundOverlay: 'rgba(0, 0, 0, 0.4)',
      textOverlayActive: false
    },
    { 
      img: slider2, 
      alt: "US Forum",
      headingText: '',
      subHeadingText: '',
      textPosition: 'center',
      textColor: '#ffffff',
      backgroundOverlay: 'rgba(0, 0, 0, 0.4)',
      textOverlayActive: false
    },
    { 
      img: slider3, 
      alt: "Impact Report",
      headingText: '',
      subHeadingText: '',
      textPosition: 'center',
      textColor: '#ffffff',
      backgroundOverlay: 'rgba(0, 0, 0, 0.4)',
      textOverlayActive: false
    },
    { 
      img: slider4, 
      alt: "New Event",
      headingText: '',
      subHeadingText: '',
      textPosition: 'center',
      textColor: '#ffffff',
      backgroundOverlay: 'rgba(0, 0, 0, 0.4)',
      textOverlayActive: false
    },
    { 
      img: slider5, 
      alt: "Home Slider 6",
      headingText: '',
      subHeadingText: '',
      textPosition: 'center',
      textColor: '#ffffff',
      backgroundOverlay: 'rgba(0, 0, 0, 0.4)',
      textOverlayActive: false
    },
    { 
      img: slider6, 
      alt: "Home Slider 7",
      headingText: '',
      subHeadingText: '',
      textPosition: 'center',
      textColor: '#ffffff',
      backgroundOverlay: 'rgba(0, 0, 0, 0.4)',
      textOverlayActive: false
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth <= 767;
      setIsMobile(newIsMobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Separate effect for desktop Owl Carousel
  useEffect(() => {
    if (isMobile) return;

    const initOwlCarousel = () => {
      try {
        if (window.$ && window.$.fn.owlCarousel) {
          const $carousel = $('.banner-car');
          
          // Destroy existing carousel first
          if ($carousel.hasClass('owl-loaded')) {
            $carousel.trigger('destroy.owl.carousel');
            $carousel.removeClass('owl-carousel owl-theme owl-loaded');
          }
          
          // Initialize fresh carousel
          if ($carousel.length) {
            $carousel.addClass('owl-carousel owl-theme').owlCarousel({
              items: 1,
              loop: true,
              autoplay: true,
              autoplayTimeout: 3000,
              autoplayHoverPause: false, // Disable pause on hover to ensure continuous autoplay
              autoplaySpeed: 800,
              smartSpeed: 800,
              nav: false,
              dots: true,
              // animateOut: 'fadeOut',
              // animateIn: 'fadeIn',
              mouseDrag: true,
              touchDrag: true,
              pullDrag: true,
              freeDrag: false,
              margin: 0,
              stagePadding: 0,
              merge: false,
              mergeFit: true,
              autoWidth: false,
              startPosition: 0,
              rtl: false,
              center: false,
              onInitialized: (event) => {
                // Force start autoplay
                setTimeout(() => {
                  if (event.target && event.target.owlCarousel) {
                    $(event.target).trigger('play.owl.autoplay', [3000]);
                  }
                }, 1000);
              }
            });
            
            // Force enable autoplay after initialization
            setTimeout(() => {
              $carousel.trigger('play.owl.autoplay', [3000]);
            }, 500);
          }
        } else {
          // Wait for scripts to load for desktop
          const retryCount = (window.bannerRetryCount || 0) + 1;
          if (retryCount < 30) {
            window.bannerRetryCount = retryCount;
            setTimeout(initOwlCarousel, 200);
          }
        }
      } catch (error) {
        // Silent error handling for carousel initialization
      }
    };

    const timeoutId = setTimeout(initOwlCarousel, 500);

    return () => {
      clearTimeout(timeoutId);
      try {
        if (window.$ && window.$.fn.owlCarousel) {
          const $carousel = $('.banner-car');
          if ($carousel.length && $carousel.hasClass('owl-loaded')) {
            $carousel.trigger('stop.owl.autoplay');
            $carousel.trigger('destroy.owl.carousel');
            $carousel.removeClass('owl-carousel owl-theme owl-loaded');
          }
        }
      } catch (error) {
        // Silent error handling for carousel cleanup
      }
    };
  }, [isMobile]);


  // Error boundary component
  const ErrorBoundary = ({ children, fallback = null }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setHasError(false);
    }, [isMobile]);

    if (hasError) {
      return fallback;
    }

    return children;
  };

  return (
    <section className="banner" style={{ position: 'relative' }}>
      <div className="banner-body" style={{ position: 'relative', overflow: 'visible' }}>
        <ErrorBoundary fallback={<div>Loading carousel...</div>}>
          {isMobile ? (
            // Mobile Swiper Carousel using Embla
            <MobileCarousel slides={slides} />
          ) : (
            // Desktop Owl Carousel
            <div key="desktop-carousel" className="owl-carousel owl-theme banner-car">
              {slides.map((slide, index) => (
                <div key={`desktop-slide-${index}`} className="item" style={{ position: 'relative' }}>
                  <img 
                    className="main-img home-banner-desk" 
                    src={slide.img} 
                    alt={slide.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      console.warn('Desktop image load error:', slide.img);
                    }}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  <img 
                    className="main-img home-banner-mob" 
                    src={slide.img} 
                    alt={slide.alt}
                    loading="lazy"
                    onError={(e) => {
                      console.warn('Mobile image load error:', slide.img);
                    }}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  
                  {/* Hero Text Overlay */}
                  {slide.textOverlayActive && (slide.headingText || slide.subHeadingText) && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          slide.textPosition === 'left'
                            ? 'flex-start'
                            : slide.textPosition === 'right'
                              ? 'flex-end'
                              : 'center',
                        padding: '40px',
                        zIndex: 10
                      }}
                    >
                      <div
                        style={{
                          color: slide.textColor || '#ffffff',
                          textAlign: slide.textPosition || 'center',
                          maxWidth: '70%',
                          animation: 'fadeIn 0.8s ease-out',
                          backgroundColor: slide.backgroundOverlay || 'rgba(0, 0, 0, 0.4)',
                          padding: '20px',
                          borderRadius: '12px',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
                        }}
                      >
                        {slide.headingText && (
                          <h1
                            style={{
                              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                              fontWeight: 'bold',
                              marginBottom: '1rem',
                              textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                              lineHeight: '1.2'
                            }}
                          >
                            {slide.headingText}
                          </h1>
                        )}
                        {slide.subHeadingText && (
                          <h2
                            style={{
                              fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
                              fontWeight: '500',
                              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                              lineHeight: '1.4'
                            }}
                          >
                            {slide.subHeadingText}
                          </h2>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="container">
                    {/* Content can be added here if needed */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ErrorBoundary>
      </div>

      {/* Scroll Mouse Indicator */}
      <div className="mouse-indi-wrap d-flex flex-column align-items-center">
        <div className="mouse-wrap position-relative">
          <svg className="rect-outer" xmlns="http://www.w3.org/2000/svg" width="26" height="40" viewBox="0 0 26 40" fill="none">
            <rect x="1" y="1" width="24" height="37.7143" rx="12" fill="black" fillOpacity="0.15" stroke="white" strokeWidth="2"></rect>
          </svg>
          <svg className="rect-line" xmlns="http://www.w3.org/2000/svg" width="2" height="7" viewBox="0 0 2 7" fill="none">
            <path d="M1 0L1 6.42857" stroke="white" strokeWidth="2"></path>
          </svg>
        </div>
        <div className="scroll-indicator">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
            <path d="M1 1L6.5 6L12 1" stroke="white" strokeWidth="2"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Banner;
