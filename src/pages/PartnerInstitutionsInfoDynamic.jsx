import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePartnerInstitutionBySlug } from '../hooks/usePartnerInstitutions';

const PartnerInstitutionsInfoDynamic = () => {
  const { institutionSlug } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { institution, loading, error } = usePartnerInstitutionBySlug(institutionSlug);

  const goHome = () => {
    navigate("/");
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ color: "#06038F" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3" style={{ color: "#06038F" }}>Loading institution details...</p>
        </div>
      </div>
    );
  }

  // Error state or institution not found
  if (error || !institution) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            <h2>Institution Not Found</h2>
            <p>{error || 'The requested institution could not be found.'}</p>
            <hr />
            <Link to="/partners/institutions" className="btn btn-primary" style={{
              backgroundColor: "#06038F",
              borderColor: "#06038F",
              padding: "10px 20px",
              textDecoration: "none",
              color: "white"
            }}>
              Back to Partner Institutions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="institution-info-page">
      {/* Breadcrumb */}
      {/* <div className="container-fluid" style={{ backgroundColor: "#f8f9fa", padding: "10px 0" }}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0" style={{ backgroundColor: "transparent" }}>
              <li className="breadcrumb-item">
                <Link to="/" onClick={goHome} style={{ color: "#6c757d", textDecoration: "none" }}>
                  🏠 Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/partners/institutions" style={{ color: "#6c757d", textDecoration: "none" }}>
                  Partner Institutions
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: "#495057" }}>
                {institution.shortName}
              </li>
            </ol>
          </nav>
        </div>
      </div> */}

      {/* Main Content */}
      <section style={{ 
        backgroundColor: "#ffffff", 
        padding: "40px 0 60px",
        fontFamily: 'system-ui, -apple-system, "Roboto", sans-serif;'
      }}>
        <div className="container">
          <div className="row">
            {/* Image Gallery Section */}
            <div className="col-lg-5 mb-4">
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
                  src={institution.detailImages && institution.detailImages[selectedImageIndex] 
                    ? institution.detailImages[selectedImageIndex] 
                    : institution.featuredImage}
                  alt={`${institution.name} - Image ${selectedImageIndex + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "#ffffff"
                  }}
                  onError={(e) => {
                    e.target.src = "/assets/images/placeholder.png";
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              {institution.detailImages && institution.detailImages.length > 0 && (
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
                      onMouseEnter={(e) => {
                        if (selectedImageIndex !== imgIndex) {
                          e.currentTarget.style.border = "2px solid #06038F";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedImageIndex !== imgIndex) {
                          e.currentTarget.style.border = "1px solid #dee2e6";
                        }
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
                        onError={(e) => {
                          e.target.src = "/assets/images/placeholder.png";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="col-lg-7">
              <div 
                className="institution-details"
                style={{
                  paddingLeft: "30px",
                  height: "500px",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#06038F #f8f9fa"
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
                      href={institution.website.startsWith('http') ? institution.website : `https://${institution.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#06038F",
                        textDecoration: "none",
                        fontSize: "16px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "8px 16px",
                        border: "2px solid #06038F",
                        borderRadius: "5px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#06038F";
                        e.target.style.color = "#ffffff";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#06038F";
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
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "8px 16px",
                        border: "2px solid #06038F",
                        borderRadius: "5px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#06038F";
                        e.target.style.color = "#ffffff";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#06038F";
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
      <style jsx>{`
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

        @media (max-width: 992px) {
          .institution-details {
            padding-left: 0 !important;
            height: auto !important;
            overflow-y: visible !important;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 28px !important;
          }
          h3 {
            font-size: 20px !important;
          }
          h4 {
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PartnerInstitutionsInfoDynamic;
