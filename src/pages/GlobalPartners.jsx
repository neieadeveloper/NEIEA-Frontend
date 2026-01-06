import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import { useGlobalPartners } from '../hooks/useGlobalPartners';

const GlobalPartners = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const { partners, loading, error } = useGlobalPartners();

  const handleCardClick = (partner) => {
    navigate(`/partners/global/${partner.slug}`);
  };

  // Loading state
  if (loading) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "Partners", link: null },
          { name: "Global Partners", link: null }
        ]}
        title="Global Partners"
        subtitle="Expanding Vision Through International Collaboration"
        description="Loading global partners..."
        showHeroSection={false}
      >
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ color: "#06038F" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3" style={{ color: "#06038F" }}>Loading global partners...</p>
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
          { name: "Global Partners", link: null }
        ]}
        title="Global Partners"
        subtitle="Expanding Vision Through International Collaboration"
        description="Error loading global partners"
        showHeroSection={false}
      >
        <div className="container py-5">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Error Loading Global Partners</h4>
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
        { name: "Global Partners", link: null }
      ]}
      title="Global Partners"
      subtitle="Expanding Vision Through International Collaboration"
      description="Collaborating with international organizations to bring world-class resources and proven educational models to the communities we serve."
      heroImage={partners.length > 0 ? partners[0].featuredImage : "/assets/images/global-map.png"}
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
          {/* Header Text */}
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
              Global Partners
            </h2>
            <p style={{
              fontSize: "22px",
              lineHeight: "32px",
              letterSpacing: "-.02em",
              color: "#000000",
              maxWidth: "900px",
              margin: "0 auto",
              textAlign: "justify"
            }}>
              At NEIEA, we believe that meaningful global partnerships expand our vision, strengthen our capacity, and bring world-class resources to the communities we serve. Collaborating with international organizations allows us to adapt proven educational models, provide quality teacher training, and prepare our students to thrive as confident, responsible global citizens.
            </p>
      </div>

          {/* Our Partners Section Title */}
          <div style={{
            textAlign: "center",
            marginBottom: "40px"
          }}>
            <h3 style={{
              color: "#06038F",
              fontSize: "24px",
              fontWeight: "700", 
              lineHeight: "1.2"
            }}>
              Our Partners
          </h3>
      </div>

          {/* Partner Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            marginBottom: "40px"
          }}>
            {partners.map((partner) => (
              <div
                key={partner._id}
                onClick={() => handleCardClick(partner)}
                onMouseEnter={() => setHoveredCard(partner._id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: hoveredCard === partner._id 
                    ? "0 20px 40px rgba(0,0,0,0.15)" 
                    : "0 5px 15px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  transform: hoveredCard === partner._id ? "translateY(-10px)" : "translateY(0)",
                  border: "1px solid #e9ecef",
                  position: "relative"
                }}
              >
                {/* Partner Image */}
                <div style={{
                  width: "100%",
                  height: "280px",
                        backgroundColor: "#f8f9fa", 
                  overflow: "hidden",
                  position: "relative"
                }}>
                  <img
                    src={partner.featuredImage}
                    alt={partner.name}
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
                          ${partner.shortName}
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
                    opacity: hoveredCard === partner._id ? 1 : 0,
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
                  {/* Partner Name */}
                  <h3 style={{
                    color: "#06038F",
                    fontSize: "24px",
              fontWeight: "700", 
                    marginBottom: "15px",
                    lineHeight: "1.2"
                  }}>
                    {partner.name}
          </h3>

                  {/* Short Description */}
                  <p style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#495057",
                    marginBottom: "0",
                    display: "-webkit-box",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textAlign: "justify"
                  }}>
                    {partner.shortDescription}
              </p>
            </div>
          </div>
        ))}
      </div>

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
              Join Our Global Partnership Network
            </h3>
            <p style={{
              fontSize: "22px",
              lineHeight: "32px",
              color: "#000000",
              marginBottom: "30px",
              maxWidth: "800px",
              margin: "0 auto 30px"
            }}>
              Together, we can expand educational opportunities and create lasting impact across borders.
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

export default GlobalPartners;
