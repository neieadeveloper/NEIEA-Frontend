import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';

// Content data structure for easy future dynamic integration
const institutionsData = [
    {
      id: 1,
    slug: "mvf-hyderabad",
    name: "M. Venkatarangaiya Foundation",
    shortName: "MVF",
    location: "Hyderabad, Telangana",
    shortDescription: "One of the biggest challenges in working with children supported by MVF is addressing the deep-rooted issue of child labour. NEIEA's work has gone beyond classroom instruction by creating bridging courses that prepare learners for mainstream schooling.",
    featuredImage: "/assets/images/PartnerInstitutions/MVF/mvf-logo.jpg",
    totalStudents: "194 Teachers Trained",
    established: "Ongoing Partnership"
    },
    {
      id: 2,
    slug: "umeed-aligarh",
    name: "Umeed Education Welfare Society",
    shortName: "Umeed",
    location: "Aligarh, Uttar Pradesh",
    shortDescription: "A committed non-profit organization providing quality education to socially and financially challenged children in slums across Aligarh. Over 900 children helped across 14 centers in Aligarh and one in Lucknow.",
    featuredImage: "/assets/images/PartnerInstitutions/UmeedCenter/Image_1.png",
    totalStudents: "900+ Students",
    established: "Since 2020"
    },
    {
      id: 3,
    slug: "rkkt-mewat",
    name: "Rasuli Kanwar Khan Trust",
    shortName: "RKKT",
    location: "Mewat (Nuh), Haryana",
    shortDescription: "Working in one of India's most socio-economically disadvantaged regions. NEIEA has designed programmes focusing on core subjects while actively involving families and communities to overcome systemic barriers to education.",
    featuredImage: "/assets/images/PartnerInstitutions/RKKT/Image_1.png",
    totalStudents: "Community Impact",
    established: "Active Partnership"
  }
];

const PartnerInstitutions = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (institution) => {
    navigate(`/partners/institutions/${institution.slug}`);
  };

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Partners", link: null },
        { name: "Partnering Institutions", link: null }
      ]}
      title="Our Partnering Institutions"
      subtitle="Transforming Lives Through Collaborative Education"
      description="Meet the institutions and organizations partnering with NEIEA to bring quality education to underserved communities across India."
      heroImage="/assets/images/PartnerInstitutions/MVF/Image_3.png"
    >
      {/* Introduction Section */}
      <section style={{ 
        backgroundColor: "#ffffff", 
        padding: "60px 0 80px",
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
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            marginBottom: "40px"
          }}>
            {institutionsData.map((institution) => (
              <div
                key={institution.id}
                onClick={() => handleCardClick(institution)}
                onMouseEnter={() => setHoveredCard(institution.id)}
                onMouseLeave={() => setHoveredCard(null)}
            style={{ 
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: hoveredCard === institution.id 
                    ? "0 20px 40px rgba(0,0,0,0.15)" 
                    : "0 5px 15px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  transform: hoveredCard === institution.id ? "translateY(-10px)" : "translateY(0)",
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
                    opacity: hoveredCard === institution.id ? 1 : 0,
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

export default PartnerInstitutions;
