import React, { useState } from 'react';
import { GlobalPartner } from '@/lib/globalPartnersApi';

interface GlobalPartnersInfoPreviewProps {
  partner: GlobalPartner;
}

const GlobalPartnersInfoPreview: React.FC<GlobalPartnersInfoPreviewProps> = ({ partner }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="partner-info-preview">
      {/* Main Content */}
      <section style={{ 
        backgroundColor: "#ffffff", 
        padding: "40px 0 60px",
        fontFamily: 'system-ui, -apple-system, "Roboto", sans-serif;'
      }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Image Gallery Section - 5 columns */}
            <div className="lg:col-span-5">
              {/* Main Image */}
              <div style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "15px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}>
                <img
                  src={partner.detailImages[selectedImageIndex] || partner.featuredImage}
                  alt={`${partner.name} - Image ${selectedImageIndex + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "#ffffff"
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                gap: "10px"
              }}>
                {partner.detailImages.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    onClick={() => setSelectedImageIndex(imgIndex)}
                    style={{
                      width: "100%",
                      height: "80px",
                      backgroundColor: "#ffffff",
                      borderRadius: "4px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: selectedImageIndex === imgIndex ? "3px solid #06038F" : "1px solid #dee2e6",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <img
                      src={image}
                      alt={`${partner.name} thumbnail ${imgIndex + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        backgroundColor: "#ffffff"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Content Section - 7 columns */}
            <div className="lg:col-span-7">
              <div 
                className="partner-details"
                style={{
                  paddingLeft: "30px",
                  height: "500px",
                  overflowY: "auto"
                }}
              >
                {/* Partner Header */}
                <h1 style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#06038F",
                  marginBottom: "10px",
                  lineHeight: "1.2"
                }}>
                  {partner.name}
                </h1>

                <h3 style={{
                  fontSize: "22px",
                  color: "#06038F",
                  fontWeight: "600",
                  marginBottom: "15px"
                }}>
                  🌐 {partner.location}
                </h3>

                {/* Website Link */}
                {partner.website && (
                  <div style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "30px",
                    flexWrap: "wrap"
                  }}>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#06038F",
                        textDecoration: "none",
                        fontSize: "16px",
                        fontWeight: "600",
                        padding: "8px 16px",
                        border: "2px solid #06038F",
                        borderRadius: "5px"
                      }}
                    >
                      🌐 Visit Website
                    </a>
                  </div>
                )}

                {/* About Section */}
                {partner.about && (
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{
                      color: "#06038F",
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "12px"
                    }}>
                      About
                    </h4>
                    <p style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#333333",
                      textAlign: "justify",
                      margin: "0"
                    }}>
                      {partner.about}
                    </p>
                  </div>
                )}

                {/* Collaboration Section */}
                {partner.collaboration && (
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{
                      color: "#06038F",
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "12px"
                    }}>
                      Our Collaboration
                    </h4>
                    <p style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#333333",
                      textAlign: "justify",
                      margin: "0"
                    }}>
                      {partner.collaboration}
                    </p>
                  </div>
                )}

                {/* Programs */}
                {partner.programs && partner.programs.length > 0 && (
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{
                      color: "#06038F",
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "12px"
                    }}>
                      Key Programs
                    </h4>
                    <ul style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#333333",
                      paddingLeft: "20px",
                      margin: "0"
                    }}>
                      {partner.programs.map((program, index) => (
                        <li key={index} style={{ marginBottom: "8px" }}>
                          {program}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Impact */}
                {partner.impact && (
                  <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "20px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #06038F",
                    marginBottom: "25px"
                  }}>
                    <h4 style={{
                      color: "#06038F",
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "12px"
                    }}>
                      Impact
                    </h4>
                    <p style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#333333",
                      textAlign: "justify",
                      margin: "0"
                    }}>
                      {partner.impact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .partner-details::-webkit-scrollbar {
          width: 6px;
        }
        .partner-details::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 10px;
        }
        .partner-details::-webkit-scrollbar-thumb {
          background: #06038F;
          border-radius: 10px;
        }
        .partner-details::-webkit-scrollbar-thumb:hover {
          background: #050277;
        }
      `}</style>
    </div>
  );
};

export default GlobalPartnersInfoPreview;

