import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import { usePartnerInstitutions } from '../hooks/usePartnerInstitutions';

const PartnerInstitutionsDynamic = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const { institutions, loading, error } = usePartnerInstitutions();

  const handleCardClick = (institution) => {
    navigate(`/partners/institutions/${institution.slug}`);
  };

  // Loading state
  if (loading) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "Partners", link: null },
          { name: "Partnering Institutions", link: null }
        ]}
        title="Our Partnering Institutions"
        subtitle="Transforming Lives Through Collaborative Education"
        description="Loading partner institutions..."
        showHeroSection={false}
      >
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ color: "#06038F" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3" style={{ color: "#06038F" }}>Loading partner institutions...</p>
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
          { name: "Partners", link: null },
          { name: "Partnering Institutions", link: null }
        ]}
        title="Our Partnering Institutions"
        subtitle="Transforming Lives Through Collaborative Education"
        description="Error loading partner institutions"
        showHeroSection={false}
      >
        <div className="container py-5">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Error Loading Partner Institutions</h4>
              <p>{error}</p>
              <hr />
              <p className="mb-0">Please try refreshing the page or contact support if the problem persists.</p>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Partners", link: null },
        { name: "Partnering Institutions", link: null }
      ]}
      title="Our Partnering Institutions"
      subtitle="Transforming Lives Through Collaborative Education"
      description="Meet the institutions and organizations partnering with NEIEA to bring quality education to underserved communities across India."
      heroImage={institutions.length > 0 ? institutions[0].featuredImage : "/assets/images/PartnerInstitutions/MVF/Image_3.png"}
    >
      {/* Introduction Section */}
      <section style={{ 
        backgroundColor: "#F8F8F8", 
        // padding: "60px 0 80px",
        fontFamily: 'system-ui, -apple-system, "Roboto", sans-serif;'
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px"
        }}>
          {/* Intro Text */}
          <div style={{
            textAlign: "center",
            marginBottom: "60px"
          }}>
            <h2 style={{
              color: "#06038F",
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "20px",
              lineHeight: "1.2"
            }}>
              Meet Our Partner Institutions
            </h2>
            <p style={{
              fontSize: "22px",
              lineHeight: "32px",
              letterSpacing: "-.02em",
              color: "#000000",
              maxWidth: "900px",
              margin: "0 auto"
            }}>
              NEIEA works with dedicated organizations across India to deliver quality education to children and communities facing significant challenges. Each partnership represents a commitment to transforming lives through education.
            </p>
          </div>

          {/* Institution Cards Grid */}
          {institutions.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              marginBottom: "40px"
            }}>
              {institutions.map((institution) => (
                <div
                  key={institution._id || institution.id}
                  onClick={() => handleCardClick(institution)}
                  onMouseEnter={() => setHoveredCard(institution._id || institution.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: hoveredCard === (institution._id || institution.id)
                      ? "0 20px 40px rgba(0,0,0,0.15)" 
                      : "0 5px 15px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    transform: hoveredCard === (institution._id || institution.id) ? "translateY(-10px)" : "translateY(0)",
                    border: "1px solid #e9ecef",
                    position: "relative"
                  }}
                >
                  {/* Institution Image */}
                  <div style={{
                    width: "100%",
                    height: "280px",
                    backgroundColor: "#f8f9fa",
                    overflow: "hidden",
                    position: "relative"
                  }}>
                    <img
                      src={institution.featuredImage}
                      alt={institution.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        backgroundColor: "#ffffff"
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #06038F; color: white; font-size: 48px; font-weight: bold;">
                            ${institution.shortName}
                          </div>
                        `;
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(6, 3, 143, 0.7)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: hoveredCard === (institution._id || institution.id) ? 1 : 0,
                      transition: "opacity 0.3s ease",
                      color: "#ffffff",
                      fontSize: "18px",
                      fontWeight: "600",
                      gap: "10px"
                    }}>
                      View Details
                      <svg 
                        width="20" 
                        height="20" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{
                    padding: "25px"
                  }}>
                    {/* Institution Name */}
                    <h3 style={{
                      color: "#06038F",
                      fontSize: "24px",
                      fontWeight: "700",
                      marginBottom: "10px",
                      lineHeight: "1.2"
                    }}>
                      {institution.name}
                    </h3>

                    {/* Location */}
                    <p style={{
                      color: "#06038F",
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "15px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}>
                      📍 {institution.location}
                    </p>

                    {/* Short Description */}
                    <p style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#495057",
                      marginBottom: "20px",
                      minHeight: "96px",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {institution.shortDescription}
                    </p>

                    {/* Footer Info */}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "15px",
                      borderTop: "1px solid #e9ecef"
                    }}>
                      <span style={{
                        fontSize: "14px",
                        color: "#6c757d",
                        fontWeight: "600"
                      }}>
                        {institution.totalStudents}
                      </span>
                      <span style={{
                        fontSize: "14px",
                        color: "#06038F",
                        fontWeight: "600"
                      }}>
                        {institution.established}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6" style={{
                width: "96px",
                height: "96px",
                background: "linear-gradient(to bottom right, #60a5fa, #3b82f6)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px"
              }}>
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" style={{ width: "48px", height: "48px", color: "white" }}>
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: "600", color: "#1f2937", marginBottom: "16px" }}>No partner institutions found</h3>
              <p style={{ color: "#6b7280" }}>Please check back later for updates.</p>
            </div>
          )}

          {/* Call to Action */}
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "40px",
            borderRadius: "8px",
            textAlign: "center",
            marginTop: "40px"
          }}>
            <h3 style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#06038F",
              marginBottom: "20px",
              lineHeight: "1.3"
            }}>
              Join Our Network of Partner Institutions
            </h3>
            <p style={{
              fontSize: "22px",
              lineHeight: "32px",
              color: "#000000",
              marginBottom: "30px",
              maxWidth: "800px",
              margin: "0 auto 30px"
            }}>
              Together, we can take the gift of learning to every corner where it is needed most.
            </p>
            <div style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}>
              <a
                href="/partners/join"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#06038F",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "18px",
                  padding: "12px 30px",
                  border: "2px solid #06038F",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  display: "inline-block"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.color = "#06038F";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#06038F";
                  e.target.style.color = "#ffffff";
                }}
              >
                Become a Partner
              </a>
              <a
                href="/about-us/contact"
                style={{
                  color: "#06038F",
                  backgroundColor: "#ffffff",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "18px",
                  padding: "12px 30px",
                  border: "2px solid #06038F",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  display: "inline-block"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#06038F";
                  e.target.style.color = "#ffffff";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.color = "#06038F";
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding: 40px 0 60px !important;
          }

          h2 {
            font-size: 24px !important;
          }

          h3 {
            font-size: 22px !important;
          }

          p {
            font-size: 18px !important;
            line-height: 28px !important;
          }

          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }

        @media (max-width: 480px) {
          section {
            padding: 30px 0 40px !important;
          }

          h2 {
            font-size: 22px !important;
          }

          h3 {
            font-size: 20px !important;
          }

          p {
            font-size: 16px !important;
            line-height: 24px !important;
          }
        }
      `}</style>
    </PageTemplate>
  );
};

export default PartnerInstitutionsDynamic;
