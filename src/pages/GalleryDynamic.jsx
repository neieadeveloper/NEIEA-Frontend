import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import { useGallery } from '../hooks/useGallery';
import ImageSlideshow from '../components/ImageSlideshow';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [slideshowOpen, setSlideshowOpen] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  // Use the custom hook to fetch gallery data
  const { galleryItems, categories, loading, error } = useGallery(activeCategory === 'all' ? undefined : activeCategory);

  const parseObjectIdTimestamp = (id) => {
    if (!id || id.length < 8) return 0;
    const timestampHex = id.substring(0, 8);
    return parseInt(timestampHex, 16) * 1000;
  };

  const transformedGalleryItems = galleryItems.map(item => ({
    id: item._id,
    title: item.title,
    category: item.category,
    image: item.image,
    description: item.description,
    year: item.year,
    display_order: item.display_order,
    created_at: item.created_at,
    updated_at: item.updated_at
  }));

  const getItemTimestamp = (item) => {
    const created = item.created_at ? new Date(item.created_at).getTime() : 0;
    if (created) return created;
    const updated = item.updated_at ? new Date(item.updated_at).getTime() : 0;
    if (updated) return updated;
    return parseObjectIdTimestamp(item.id);
  };

  const sortedGalleryImages = [...transformedGalleryItems]
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

  const filteredItems = activeCategory === 'all' 
    ? sortedGalleryImages 
    : sortedGalleryImages.filter(item => item.category === activeCategory);

  // Handle image click to open slideshow
  const handleImageClick = (index) => {
    setSlideshowIndex(index);
    setSlideshowOpen(true);
  };

  // Handle slideshow close
  const handleSlideshowClose = () => {
    setSlideshowOpen(false);
  };

  // Show empty state if no data
  if (!loading && !error && filteredItems.length === 0) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "About", link: null },
          { name: "Media and Events", link: null },
          { name: "Gallery", link: null }
        ]}
        title="Our Visual Journey"
        subtitle="NEIEA Gallery"
        description="Explore our journey through education, innovation, and community impact. From leadership meetings to community events, discover the moments that shape our mission."
        heroImage="/assets/images/gallary/exhibition.jpg"
      >
        {/* Empty State */}
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="fas fa-images text-muted" style={{ fontSize: '4rem', opacity: 0.3 }}></i>
              </div>
              <h3 className="text-muted mb-3">No Gallery Items Found</h3>
              <p className="text-muted mb-4">
                We're currently updating our gallery. Please check back soon to see our latest photos and events.
              </p>
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                <a 
                  href="/donate" 
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#06038F",
                    borderColor: "#06038F",
                    padding: "12px 25px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "25px",
                    textDecoration: "none"
                  }}
                >
                  Support Our Mission
                </a>
                <a 
                  href="/about-us/contact" 
                  className="btn btn-outline-primary"
                  style={{
                    borderColor: "#06038F",
                    color: "#06038F",
                    padding: "12px 25px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "25px",
                    textDecoration: "none"
                  }}
                >
                  Get Involved
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "About", link: null },
          { name: "Media and Events", link: null },
          { name: "Gallery", link: null }
        ]}
        title="Our Visual Journey"
        subtitle="NEIEA Gallery"
        description="Explore our journey through education, innovation, and community impact. From leadership meetings to community events, discover the moments that shape our mission."
        heroImage="/assets/images/gallary/exhibition.jpg"
      >
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </PageTemplate>
    );
  }

  // Show error state
  if (error) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "About", link: null },
          { name: "Media and Events", link: null },
          { name: "Gallery", link: null }
        ]}
        title="Our Visual Journey"
        subtitle="NEIEA Gallery"
        description="Explore our journey through education, innovation, and community impact. From leadership meetings to community events, discover the moments that shape our mission."
        heroImage="/assets/images/gallary/exhibition.jpg"
      >
        <div className="alert alert-danger text-center" role="alert">
          <h4 className="alert-heading">Unable to Load Gallery</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Media and Events", link: null },
        { name: "Gallery", link: null }
      ]}
      title="Our Visual Journey"
      subtitle="NEIEA Gallery"
      description="Explore our journey through education, innovation, and community impact. From leadership meetings to community events, discover the moments that shape our mission."
      heroImage="/assets/images/gallary/exhibition.jpg"
    >
      <style>
        {`
          .gallery-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.12) !important;
          }
          
          .gallery-image-wrapper:hover img {
            transform: scale(1.05);
          }
          
          .gallery-image-wrapper:hover .image-overlay {
            opacity: 1;
          }
        `}
      </style>
      {/* Filter Categories */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-center flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`btn ${activeCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                style={{
                  backgroundColor: activeCategory === category.id ? '#06038F' : 'transparent',
                  borderColor: '#06038F',
                  color: activeCategory === category.id ? 'white' : '#06038F',
                  padding: "8px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  borderRadius: "20px",
                  transition: "all 0.2s ease"
                }}
              >
                {category.name}
                <span 
                  style={{ 
                    marginLeft: "8px", 
                    fontSize: "12px",
                    opacity: "0.8"
                  }}
                >
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="row g-3">
        {filteredItems.map((item, index) => (
          <div key={item.id} className="col-lg-4 col-md-6">
            <div 
              className="card h-100 border-0 shadow-sm gallery-card"
              style={{ 
                borderRadius: "12px", 
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer"
              }}
              onClick={() => handleImageClick(index)}
            >
              <div className="gallery-image-wrapper" style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                  }}
                />
                {/* Overlay on hover */}
                <div 
                  className="image-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(6, 3, 143, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none"
                  }}
                >
                  <i className="fas fa-search-plus" style={{ color: "white", fontSize: "2rem" }}></i>
                </div>
              </div>
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span 
                    style={{ 
                      backgroundColor: "#06038F", 
                      color: "white", 
                      padding: "3px 8px", 
                      borderRadius: "10px", 
                      fontSize: "10px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {categories.find(cat => cat.id === item.category)?.name}
                  </span>
                  <span style={{ color: "#6c757d", fontSize: "11px", fontWeight: "500" }}>
                    {item.year}
                  </span>
                </div>
                <h6 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "600", 
                    marginBottom: "8px",
                    fontSize: "15px",
                    lineHeight: "1.3"
                  }}
                >
                  {item.title}
                </h6>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    lineHeight: "1.4", 
                    fontSize: "12px",
                    margin: "0"
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Section */}
      {/* <div className="row mt-5">
        <div className="col-12">
          <div 
            style={{ 
              backgroundColor: "#06038F", 
              color: "white",
              padding: "35px", 
              borderRadius: "12px",
              textAlign: "center"
            }}
          >
            <h3 
              style={{ 
                color: "white", 
                fontWeight: "700", 
                marginBottom: "25px",
                fontSize: "28px"
              }}
            >
              Our Impact in Numbers
            </h3>
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-3">
                <div>
                  <h2 style={{ color: "white", fontWeight: "700", fontSize: "32px", marginBottom: "8px" }}>
                    500+
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.9)", margin: "0", fontWeight: "500", fontSize: "14px" }}>
                    Educational Events
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <div>
                  <h2 style={{ color: "white", fontWeight: "700", fontSize: "32px", marginBottom: "8px" }}>
                    10,000+
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.9)", margin: "0", fontWeight: "500", fontSize: "14px" }}>
                    Students Reached
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <div>
                  <h2 style={{ color: "white", fontWeight: "700", fontSize: "32px", marginBottom: "8px" }}>
                    200+
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.9)", margin: "0", fontWeight: "500", fontSize: "14px" }}>
                    Partner Institutions
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <div>
                  <h2 style={{ color: "white", fontWeight: "700", fontSize: "32px", marginBottom: "8px" }}>
                    59
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.9)", margin: "0", fontWeight: "500", fontSize: "14px" }}>
                    Gallery Images
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Call to Action */}
      <div className="row mt-4">
        <div className="col-12">
          <div 
            style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "25px", 
              borderRadius: "12px",
              textAlign: "center"
            }}
          >
            <h4 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "15px" 
              }}
            >
              Join Our Visual Story
            </h4>
            <p 
              style={{ 
                color: "#6c757d", 
                marginBottom: "20px",
                maxWidth: "600px",
                margin: "0 auto 20px"
              }}
            >
              Be part of our journey in transforming education. Your support helps us create more moments worth capturing.
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
              <a 
                href="/donate" 
                className="btn btn-primary"
                style={{
                  backgroundColor: "#06038F",
                  borderColor: "#06038F",
                  padding: "12px 25px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "25px",
                  textDecoration: "none"
                }}
              >
                Support Our Mission
              </a>
              <a 
                href="/about-us/contact" 
                className="btn btn-outline-primary"
                style={{
                  borderColor: "#06038F",
                  color: "#06038F",
                  padding: "12px 25px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "25px",
                  textDecoration: "none"
                }}
              >
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Slideshow Modal */}
      {slideshowOpen && (
        <ImageSlideshow
          images={filteredItems}
          initialIndex={slideshowIndex}
          onClose={handleSlideshowClose}
        />
      )}
    </PageTemplate>
  );
};

export default Gallery;