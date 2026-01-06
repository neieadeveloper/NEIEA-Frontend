import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';

// Full institutions data
const institutionsFullData = {
  "mvf-hyderabad": {
    id: 1,
    name: "M. Venkatarangaiya Foundation",
    shortName: "MVF",
    location: "Hyderabad, Telangana",
    address: "18-9-283, Opp. Chennakeshava Temple, Near Police Station, Chandrayangutta, Bandlaguda Mandal, Hyderabad 500005, Telangana",
    website: "https://mvfindia.in/",
    images: [
      "/assets/images/PartnerInstitutions/MVF/mvf-logo.jpg",
      "/assets/images/PartnerInstitutions/MVF/Image_1.jpeg",
      "/assets/images/PartnerInstitutions/MVF/Image_2.png",
      "/assets/images/PartnerInstitutions/MVF/Image_3.png",
      "/assets/images/PartnerInstitutions/MVF/Image_4.png",
      "/assets/images/PartnerInstitutions/MVF/Image_5.png"
    ],
    challenges: "One of the biggest challenges in working with children supported by MVF is addressing the deep-rooted issue of child labour. Many children are withdrawn from work only after persistent community engagement, and they often enter classrooms with little or no prior formal education. This makes it difficult for teachers to balance grade-level curriculum with foundational learning needs. Additionally, resistance from parents who depend on children's income remains a barrier to sustained school attendance.",
    neieaImpact: "NEIEA's work with MVF has gone beyond classroom instruction by creating bridging courses that prepare learners for mainstream schooling. Teachers trained under NEIEA adopt discourse-oriented pedagogy that helps children not only catch up academically but also gain confidence in expressing themselves. This focus on building language and reasoning skills ensures that children can integrate into regular schools more smoothly and are less likely to drop out again.",
    additionalInfo: "Alongside student education, NEIEA has conducted an intensive three-month teacher training program that engaged 194 participants, including 115 male teachers and 79 female teachers. Through multiple completed batches and ongoing sessions, NEIEA is strengthening teaching capacities and improving educational outcomes across its partner institutions."
  },
  "umeed-aligarh": {
    id: 2,
    name: "Umeed Education Welfare Society",
    shortName: "Umeed",
    location: "Aligarh, Uttar Pradesh",
    address: "Locations span Jamalpur, M.A. Nagar, and other areas in Aligarh",
    website: "https://umeededucationwelfare.com",
    images: [
      "/assets/images/PartnerInstitutions/UmeedCenter/Image_1.png",
      "/assets/images/PartnerInstitutions/UmeedCenter/Image_2.png",
      "/assets/images/PartnerInstitutions/UmeedCenter/Image_3.png",
      "/assets/images/PartnerInstitutions/UmeedCenter/Image_4.png",
      "/assets/images/PartnerInstitutions/UmeedCenter/Image_5.png"
    ],
    about: "Umeed Education Welfare Society is a committed non-profit organization dedicated to providing quality education, care, and support to socially and financially challenged children, mostly living in slums across Aligarh. The organization runs multiple centers in the city of Aligarh where children aged 4 to 14 learn basic literacy and numeracy skills, with a focus on nurturing each child's potential and mainstreaming them into formal schools. Over the years, Umeed has empowered hundreds of children through education, coaching, and continuous progress monitoring.",
    foundingStory: "The Society was founded with the vision and encouragement of Dr. Mohsin Raza. The initiative was further supported by family members including Shahab Khan and Sumbul Raza, who encouraged and helped bring the mission to life. Starting from a humble center in a private residence in 2020, Umeed has rapidly expanded to 14 centers across Aligarh and one in Lucknow, helping over 900 children move toward better educational opportunities.",
    challenges: "Teaching children in urban slums poses unique difficulties. Learners often come from overcrowded homes with little space to study, and their daily lives are shaped by irregular routines, lack of nutrition, and financial instability. These factors lead to poor attendance and wide disparities in learning levels within the same class. Teachers must therefore adapt constantly, offering individual attention while managing classrooms where motivation to learn is not always strong.",
    neieaImpact: "NEIEA has strengthened Umeed's centres by introducing structured after-school English and Math sessions tailored to slum children's needs. These sessions use games, storytelling, and activity-based learning to hold students' interest and help them see education as enjoyable rather than burdensome. NEIEA also supports mentoring initiatives that connect learners with role models, inspiring them to aspire for formal schooling and future opportunities beyond their immediate surroundings."
  },
  "rkkt-mewat": {
    id: 3,
    name: "Rasuli Kanwar Khan Trust",
    shortName: "RKKT",
    location: "Mewat (Nuh), Haryana",
    address: "Gaon Nai Nangla teh.f.p.jhirka district Nuh, mewat",
    website: "www.rkkt.in",
    facebook: "https://www.facebook.com/search/top?q=rasuli%20kanwar%20khan%20trust",
    images: [
      "/assets/images/PartnerInstitutions/RKKT/Image_1.png",
      "/assets/images/PartnerInstitutions/RKKT/Image_2.png",
      "/assets/images/PartnerInstitutions/RKKT/Image_3.png",
      "/assets/images/PartnerInstitutions/RKKT/Image_4.png"
    ],
    about: "Mewat, now officially called Nuh district in Haryana, is among the most socio-economically disadvantaged regions in India. It faces high poverty rates, poor infrastructure, and very low literacy levels, particularly among women. The region is predominantly agrarian, with families depending on subsistence farming and daily-wage labour. Social customs, early marriage, and gender norms further restrict educational access for girls. These factors make targeted interventions essential, as quality education can play a transformative role in breaking the cycle of poverty and marginalization in Mewat.",
    foundingStory: "The trust was founded by Mehmood Khan, a seasoned professional with a background in international business and development. After a distinguished career at Unilever, where he held leadership roles across multiple countries, Khan chose to return to his ancestral roots in Mewat. Driven by a commitment to social change, he established RKKT to address the region's developmental challenges. Khan's extensive experience in innovation and community development has been instrumental in shaping the trust's impactful programs.",
    challenges: "In Mewat, educational challenges are deeply intertwined with cultural and socio-economic factors. The district records one of the lowest literacy rates in India, particularly among girls. Early marriage, conservative norms, and economic pressures often pull children away from classrooms. Schools also face teacher shortages and limited infrastructure, making consistent quality education difficult to sustain.",
    neieaImpact: "Through its collaboration with RKKT, NEIEA has designed programmes that not only focus on core subjects like English, Math, and Science, but also actively involve families and communities. Awareness workshops and parental engagement sessions encourage families to support girls' education, while local teacher training ensures sustainability. By aligning classroom teaching with community-based advocacy, NEIEA helps learners in Mewat overcome systemic barriers and develop a stronger path towards higher education and empowerment."
  }
};

const PartnerInstitutionsInfo = () => {
  const { institutionSlug } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get institution data
  const institution = institutionsFullData[institutionSlug];

  // Get related institutions (other institutions)
  const relatedInstitutions = Object.entries(institutionsFullData)
    .filter(([slug]) => slug !== institutionSlug)
    .map(([slug, data]) => ({ slug, ...data }));

  const goHome = () => {
    navigate("/");
    window.location.reload();
  };

  // If institution not found
  if (!institution) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Institution Not Found</h2>
          <p>The requested institution could not be found.</p>
          <Link to="/partners/institutions" className="btn btn-primary">
            Back to Partner Institutions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="institution-info-page">
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
                   src={institution.images[selectedImageIndex]}
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
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                gap: "10px"
              }}>
                {institution.images.map((image, imgIndex) => (
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

          {/* Related Institutions */}
          {/* {relatedInstitutions.length > 0 && (
            <div style={{
              marginTop: "60px",
              paddingTop: "40px",
              borderTop: "1px solid #dee2e6"
            }}>
              <h3 style={{
                color: "#06038F",
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "30px",
                textAlign: "center"
              }}>
                Other Partner Institutions
              </h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "30px"
              }}>
                {relatedInstitutions.map((inst) => (
                  <div
                    key={inst.slug}
                    onClick={() => navigate(`/partners/institutions/${inst.slug}`)}
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px",
                      padding: "20px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: "1px solid #dee2e6"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
                      e.currentTarget.style.transform = "translateY(-5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <h5 style={{
                      color: "#06038F",
                      fontSize: "18px",
                      fontWeight: "700",
                      marginBottom: "8px"
                    }}>
                      {inst.name}
                    </h5>
                    <p style={{
                      color: "#495057",
                      fontSize: "14px",
                      margin: "0",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}>
                      📍 {inst.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )} */}
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

export default PartnerInstitutionsInfo;

