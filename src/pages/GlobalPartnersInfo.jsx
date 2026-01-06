import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';

// Full global partners data
const partnersFullData = {
    "aflatoun-international": {
        id: 1,
        name: "Aflatoun International",
        shortName: "Aflatoun",
        location: "Global Organization",
        website: "https://www.aflatoun.org/",
        images: [
            "/assets/images/GlobalPartners/aflatoun1.jpg",
            "/assets/images/GlobalPartners/aflatoun2.jpg",
        ],
        about: `Through our collaboration with Aflatoun International, NEIEA has adopted their globally
acclaimed social and financial education curriculum. With teacher training conducted in
partnership, we are now delivering Aflatoun’s courses online—empowering students with vital
skills in financial literacy, social responsibility, and active citizenship.`,
    },
    "global-schools-program": {
        id: 2,
        name: "Global Schools Program",
        shortName: "GSP",
        location: "UN SDSN Initiative",
        website: "https://www.globalschoolsprogram.org/",
        images: [
            "/assets/images/GlobalPartners/globalSchool1.jpg",
        ],
        about: `As a partner of the Global Schools Program, an initiative of the UN Sustainable Development
Solutions Network (SDSN), NEIEA is integrating education for sustainable development into our
teaching practices. Through training, resources, and curriculum support, we work together to
build awareness among students and educators, preparing them to be responsible global
citizens and leaders for a sustainable future.`,
    }
};

const GlobalPartnersInfo = () => {
    const { partnerSlug } = useParams();
    const navigate = useNavigate();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Get partner data
    const partner = partnersFullData[partnerSlug];

    // Get related partners (other partners)
    const relatedPartners = Object.entries(partnersFullData)
        .filter(([slug]) => slug !== partnerSlug)
        .map(([slug, data]) => ({ slug, ...data }));

    const goHome = () => {
        navigate("/");
        window.location.reload();
    };

    // If partner not found
    if (!partner) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <h2>Partner Not Found</h2>
                    <p>The requested global partner could not be found.</p>
                    <Link to="/partners/global" className="btn btn-primary">
                        Back to Global Partners
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="partner-info-page">
            {/* Breadcrumb */}
            <div className="container-fluid" style={{ backgroundColor: "#f8f9fa", padding: "10px 0" }}>
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0" style={{ backgroundColor: "transparent" }}>
                            <li className="breadcrumb-item">
                                <Link to="/" onClick={goHome} style={{ color: "#6c757d", textDecoration: "none" }}>
                                    🏠 Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/partners/global" style={{ color: "#6c757d", textDecoration: "none" }}>
                                    Global Partners
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page" style={{ color: "#495057" }}>
                                {partner.shortName}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

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
                  src={partner.detailImages?.[selectedImageIndex] || partner.featuredImage}
                  alt={`${partner.name} - Image ${selectedImageIndex + 1}`}
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
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                gap: "10px"
              }}>
                {partner.detailImages?.map((image, imgIndex) => (
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
                                            alt={`${partner.name} thumbnail ${imgIndex + 1}`}
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
                        </div>

                        {/* Content Section */}
                        <div className="col-lg-7">
                            <div
                                className="partner-details"
                                style={{
                                    paddingLeft: "30px",
                                    height: "500px",
                                    overflowY: "auto",
                                    scrollbarWidth: "thin",
                                    scrollbarColor: "#06038F #f8f9fa"
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
                                            href={partner.website.startsWith('http') ? partner.website : `https://${partner.website}`}
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
                                    </div>
                                )}

                                {/* About Section */}
                                {partner.about && (
                                    <div style={{ marginBottom: "25px" }}>
                                        {/* <h4 style={{
                      color: "#06038F",
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "12px"
                    }}>
                      About
                    </h4> */}
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
                                {partner.programs && (
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
            <style jsx>{`
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

        @media (max-width: 992px) {
          .partner-details {
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

export default GlobalPartnersInfo;

