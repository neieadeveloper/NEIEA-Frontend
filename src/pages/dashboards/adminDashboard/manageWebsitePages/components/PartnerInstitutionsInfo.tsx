import React, { useState } from 'react';
import { PartnerInstitution } from '@/lib/partnerInstitutionsApi';

interface PartnerInstitutionsInfoPreviewProps {
  institution: PartnerInstitution;
}

const PartnerInstitutionsInfoPreview: React.FC<PartnerInstitutionsInfoPreviewProps> = ({ institution }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="institution-info-preview">
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
                  src={institution.detailImages[selectedImageIndex] || institution.featuredImage}
                  alt={`${institution.name} - Image ${selectedImageIndex + 1}`}
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
                {institution.detailImages.map((image, imgIndex) => (
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
                      alt={`${institution.name} thumbnail ${imgIndex + 1}`}
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
                className="institution-details"
                style={{
                  paddingLeft: "30px",
                  height: "500px",
                  overflowY: "auto"
                }}
              >
                {/* Institution Header */}
                <h1 style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#06038F",
                  marginBottom: "10px",
                  lineHeight: "1.2"
                }}>
                  {institution.name}
                </h1>

                <h3 style={{
                  fontSize: "22px",
                  color: "#06038F",
                  fontWeight: "600",
                  marginBottom: "15px"
                }}>
                  📍 {institution.location}
                </h3>

                {/* Address */}
                {institution.address && (
                  <p style={{
                    fontSize: "16px",
                    color: "#495057",
                    marginBottom: "15px",
                    lineHeight: "1.5"
                  }}>
                    <strong>Address:</strong> {institution.address}
                  </p>
                )}

                {/* Links */}
                <div style={{
                  display: "flex",
                  gap: "15px",
                  marginBottom: "30px",
                  flexWrap: "wrap"
                }}>
                  {institution.website && (
                    <a
                      href={institution.website}
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
                  )}
                  {institution.facebook && (
                    <a
                      href={institution.facebook}
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
                      📘 Social Profile Link
                    </a>
                  )}
                </div>

                {/* About Section */}
                {institution.about && (
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
                      {institution.about}
                    </p>
                  </div>
                )}

                {/* Founding Story */}
                {institution.foundingStory && (
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{
                      color: "#06038F",
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "12px"
                    }}>
                      Founding Story
                    </h4>
                    <p style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#333333",
                      textAlign: "justify",
                      margin: "0"
                    }}>
                      {institution.foundingStory}
                    </p>
                  </div>
                )}

                {/* Challenges Section */}
                {institution.challenges && (
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{
                      color: "#06038F",
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "12px"
                    }}>
                      Challenges
                    </h4>
                    <p style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#333333",
                      textAlign: "justify",
                      margin: "0"
                    }}>
                      {institution.challenges}
                    </p>
                  </div>
                )}

                {/* NEIEA's Impact */}
                {institution.neieaImpact && (
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{
                      color: "#06038F",
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "12px"
                    }}>
                      NEIEA's Impact
                    </h4>
                    <p style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#333333",
                      textAlign: "justify",
                      margin: "0"
                    }}>
                      {institution.neieaImpact}
                    </p>
                  </div>
                )}

                {/* Additional Info */}
                {institution.additionalInfo && (
                  <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "20px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #06038F",
                    marginBottom: "25px"
                  }}>
                    <p style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#333333",
                      textAlign: "justify",
                      margin: "0"
                    }}>
                      {institution.additionalInfo}
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
        .institution-details::-webkit-scrollbar {
          width: 6px;
        }
        .institution-details::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 10px;
        }
        .institution-details::-webkit-scrollbar-thumb {
          background: #06038F;
          border-radius: 10px;
        }
        .institution-details::-webkit-scrollbar-thumb:hover {
          background: #050277;
        }
      `}</style>
    </div>
  );
};

export default PartnerInstitutionsInfoPreview;

