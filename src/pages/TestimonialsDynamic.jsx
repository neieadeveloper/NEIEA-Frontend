import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import { useTestimonials } from '../hooks/useTestimonials';
import { publicFeaturedStoriesApi } from '../lib/testimonialsApi';

const Testimonials = () => {
  const { cardTestimonials, videoTestimonials, loading, error } = useTestimonials();
  const [featuredStories, setFeaturedStories] = useState([]);
  const [storiesLoading, setStoriesLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedStories = async () => {
      try {
        setStoriesLoading(true);
        const stories = await publicFeaturedStoriesApi.getFeaturedStories();
        setFeaturedStories(stories.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
      } catch (err) {
        console.error('Error loading featured stories:', err);
      } finally {
        setStoriesLoading(false);
      }
    };
    loadFeaturedStories();
  }, []);

  // Loading state
  if (loading) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "About", link: null },
          { name: "Testimonials & Featured Stories", link: null }
        ]}
        title="Testimonials & Featured Stories"
        subtitle="Voices of Change"
        description="Hear from students, teachers, parents, and communities whose lives have been transformed through NEIEA's educational programs."
        heroImage="/assets/images/testimonialImage.jpg"
      >
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading testimonials...</p>
          </div>
        </div>
      </PageTemplate>
    );
  }

  // Error state
  if (error) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "About", link: null },
          { name: "Testimonials & Featured Stories", link: null }
        ]}
        title="Testimonials & Featured Stories"
        subtitle="Voices of Change"
        description="Hear from students, teachers, parents, and communities whose lives have been transformed through NEIEA's educational programs."
        heroImage="/assets/images/testimonialImage.jpg"
      >
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">Unable to Load Testimonials</h4>
              <p>We're experiencing some technical difficulties. Please try again later.</p>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Testimonials & Featured Stories", link: null }
      ]}
      title="Testimonials & Featured Stories"
      subtitle="Voices of Change"
      description="Hear from students, teachers, parents, and communities whose lives have been transformed through NEIEA's educational programs."
      heroImage="/assets/images/testimonialImage.jpg"
    >
      {/* Testimonials Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h1 
            style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "40px",
              textAlign: "center"
            }}
          >
            What People Say About NEIEA
          </h1>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {cardTestimonials.map((testimonial, index) => (
          <div key={testimonial._id} className="col-lg-4 col-md-6 col-12 mb-4">
             <div 
               className="testimonial-card h-100"
               style={{ 
                 background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                 borderRadius: "20px",
                 padding: "30px 25px",
                 boxShadow: "0 10px 30px rgba(6, 3, 143, 0.08)",
                 border: "1px solid rgba(6, 3, 143, 0.1)",
                 position: "relative",
                 overflow: "hidden",
                 transition: "all 0.3s ease",
                 minHeight: "auto",
                 display: "flex",
                 flexDirection: "column"
               }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(6, 3, 143, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(6, 3, 143, 0.08)";
              }}
            >
              {/* Quote Icon */}
              <div 
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #06038F 0%, #4c46ff 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: "0.9"
                }}
              >
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

               {/* Profile Section */}
               <div className="d-flex align-items-center mb-4">
                 <div 
                   style={{
                     width: "80px",
                     height: "80px",
                     borderRadius: "50%",
                     overflow: "hidden",
                     border: "3px solid #06038F",
                     marginRight: "15px",
                     flexShrink: 0
                   }}
                   className="profile-image-container"
                 >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                     style={{ 
                       width: "100%", 
                       height: "100%", 
                       objectFit: "cover",
                       objectPosition: "center top"
                     }}
                   />
                 </div>
                <div>
                   <h5 
                     style={{ 
                       color: "#212529", 
                       fontWeight: "700", 
                       marginBottom: "8px",
                       fontSize: "18px",
                       fontFamily: "inherit"
                     }}
                     className="testimonial-name"
                   >
                    {testimonial.name}
                  </h5>
                   <p 
                     style={{ 
                       color: "#6c757d", 
                       fontSize: "14px", 
                       margin: "0",
                       fontWeight: "500"
                     }}
                   >
                     📍 {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Testimonial Content */}
              <div 
                style={{
                  backgroundColor: "rgba(6, 3, 143, 0.03)",
                  borderRadius: "15px",
                  padding: "20px",
                  marginTop: "20px",
                  position: "relative",
                  minHeight: "auto",
                  display: "flex",
                  alignItems: "flex-start",
                  flex: "1"
                }}
              >
                <p 
                  style={{ 
                    color: "#495057", 
                    lineHeight: "1.6", 
                    fontSize: "14px",
                    fontStyle: "italic",
                    margin: "0",
                    fontFamily: "inherit"
                  }}
                >
                "{testimonial.content}"
              </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Featured Videos Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h1 
            style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "40px",
              textAlign: "center"
            }}
          >
            Video Testimonials
          </h1>
          <p 
            style={{ 
              fontSize: "18px", 
              color: "#6c757d", 
              textAlign: "center",
              marginBottom: "40px",
              maxWidth: "600px",
              margin: "0 auto 40px"
            }}
          >
            Watch authentic video testimonials from our students sharing their personal experiences and success stories with NEIEA.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {videoTestimonials.map((video) => (
          <div key={video._id} className="col-lg-6 col-md-12">
            <div 
              className="video-testimonial-card h-100"
              style={{ 
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(6, 3, 143, 0.08)",
                border: "1px solid rgba(6, 3, 143, 0.1)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(6, 3, 143, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(6, 3, 143, 0.08)";
              }}
            >
                <div 
                  style={{
                  height: "280px", 
                  position: "relative",
                  borderRadius: "20px 20px 0 0",
                  overflow: "hidden"
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.videoUrl.includes('shorts') 
                    ? video.videoUrl.split('/shorts/')[1] 
                    : video.videoUrl.includes('youtu.be/') 
                      ? video.videoUrl.split('youtu.be/')[1].split('?')[0]
                      : video.videoUrl.split('v=')[1]?.split('&')[0]
                  }`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ 
                    borderRadius: "20px 20px 0 0",
                    border: "none"
                  }}
                ></iframe>
                </div>
              <div 
                style={{
                  padding: "25px",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span 
                    style={{ 
                      background: "linear-gradient(135deg, #06038F 0%, #4c46ff 100%)",
                      color: "white", 
                      padding: "6px 12px", 
                      borderRadius: "20px", 
                      fontSize: "11px", 
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      boxShadow: "0 4px 12px rgba(6, 3, 143, 0.3)"
                    }}
                  >
                    🎥 {video.videoTag || video.type}
                  </span>
                  <span 
                    style={{ 
                      color: "#6c757d", 
                      fontSize: "12px",
                      backgroundColor: "rgba(6, 3, 143, 0.1)",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontWeight: "500"
                    }}
                  >
                    {video.videoType || video.duration}
                  </span>
                </div>
                <h5 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "700", 
                    marginBottom: "12px",
                    lineHeight: "1.4",
                    fontSize: "18px",
                    fontFamily: "inherit"
                  }}
                >
                  {video.title}
                </h5>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    lineHeight: "1.6", 
                    fontSize: "14px",
                    marginBottom: "0",
                    fontFamily: "inherit"
                  }}
                >
                  {video.description}
                </p>
                
                {/* Video Stats */}
                <div 
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                    padding: "10px",
                    backgroundColor: "rgba(6, 3, 143, 0.05)",
                    borderRadius: "12px",
                    gap: "15px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <svg width="16" height="16" fill="#06038F" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span style={{ fontSize: "12px", color: "#06038F", fontWeight: "600" }}>
                      Watch Now
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        width="14" 
                        height="14" 
                        fill={video.rating && video.rating >= star ? "#FFD700" : "#E5E5E5"} 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                    {/* {video.rating && video.rating > 0 && (
                      <span style={{ fontSize: "12px", color: "#6c757d", marginLeft: "5px" }}>
                        ({video.rating.toFixed(1)}/5)
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Stories Section */}
      {!storiesLoading && featuredStories.length > 0 && (
        <div className="row mb-5">
          <div className="col-12">
            <h1 
              style={{ 
                fontSize: "32px", 
                fontWeight: "700", 
                color: "#212529", 
                marginBottom: "40px",
                textAlign: "center"
              }}
            >
              Featured Stories
            </h1>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                textAlign: "center",
                marginBottom: "40px",
                maxWidth: "600px",
                margin: "0 auto 40px"
              }}
            >
              Discover inspiring stories of transformation and impact from our community.
            </p>
          </div>
        </div>
      )}

      {!storiesLoading && featuredStories.length > 0 && (
        <div className="row g-4 mb-5">
          {featuredStories.map((story) => (
            <div key={story._id} className="col-lg-4 col-md-6 col-12 mb-4">
              <div 
                className="featured-story-card h-100"
                style={{ 
                  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  borderRadius: "20px",
                  padding: "30px 25px",
                  boxShadow: "0 10px 30px rgba(6, 3, 143, 0.08)",
                  border: "1px solid rgba(6, 3, 143, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  minHeight: "auto",
                  display: "flex",
                  flexDirection: "column"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(6, 3, 143, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(6, 3, 143, 0.08)";
                }}
              >
                {/* Story Icon */}
                <div 
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #06038F 0%, #4c46ff 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: "0.9"
                  }}
                >
                  <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>

                {/* Story Content */}
                <div style={{ flex: "1" }}>
                  <h3 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "700", 
                      marginBottom: "12px",
                      fontSize: "20px",
                      fontFamily: "inherit",
                      lineHeight: "1.3"
                    }}
                  >
                    {story.heading}
                  </h3>
                  <p 
                    style={{ 
                      color: "#6c757d", 
                      fontSize: "15px", 
                      marginBottom: "20px",
                      fontWeight: "500",
                      lineHeight: "1.5"
                    }}
                  >
                    {story.subHeading}
                  </p>
                  <div 
                    style={{
                      backgroundColor: "rgba(6, 3, 143, 0.03)",
                      borderRadius: "15px",
                      padding: "20px",
                      marginTop: "20px",
                      position: "relative"
                    }}
                  >
                    <p 
                      style={{ 
                        color: "#495057", 
                        lineHeight: "1.7", 
                        fontSize: "14px",
                        margin: "0",
                        fontFamily: "inherit"
                      }}
                    >
                      {story.story}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      {/* <div className="row mt-5">
        <div className="col-12 text-center">
          <div 
            style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "40px", 
              borderRadius: "15px" 
            }}
          >
            <h4 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "15px" 
              }}
            >
              Share Your Story
            </h4>
            <p 
              style={{ 
                color: "#6c757d", 
                marginBottom: "25px",
                maxWidth: "600px",
                margin: "0 auto 25px"
              }}
            >
              Have you been impacted by NEIEA's programs? We'd love to hear your story and share it with our community.
            </p>
            <a 
              href="/about-us/contact" 
              className="btn btn-primary"
              style={{
                backgroundColor: "#06038F",
                borderColor: "#06038F",
                padding: "12px 30px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "25px",
                textDecoration: "none"
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div> */}
    </PageTemplate>
  );
};

export default Testimonials;
