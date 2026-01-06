import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';

// ========================================
// DYNAMIC DATA STRUCTURE
// TODO: Replace this with API call from admin panel
// ========================================
const careerPageData = {
  // Page Header Data
  pageHeader: {
    breadcrumb: [
    //   { name: "Get Involved", link: null },
      { name: "Career", link: null }
    ],
    title: "Join the NEIEA Team",
    subtitle: "Be Part of Something Meaningful",
    description: "Join us in our mission to transform education in underserved communities across India and beyond.",
    // heroImage: "/assets/images/PartnerInstitutions/MVF/Image_3.png"
  },

  // Introduction Section
  introduction: {
    heading: "Join the NEIEA Team",
    description: "At NEIEA, we believe that a healthy work environment and supportive culture empower our team to make a real difference. We are always looking for passionate, committed, and innovative individuals to join us in our mission to transform education in underserved communities."
  },

  // Benefits/Why Work Section
  whyWorkSection: {
    heading: "Why Work with Us?",
    benefits: [
      {
        id: 1,
        icon: "🤝",
        title: "Healthy & Inclusive Workplace",
        description: "A healthy and inclusive workplace that values collaboration and creativity"
      },
      {
        id: 2,
        icon: "📈",
        title: "Growth Opportunities",
        description: "Opportunities for growth, learning, and professional development"
      },
      {
        id: 3,
        icon: "💡",
        title: "Impactful Projects",
        description: "Work on impactful projects that touch thousands of lives every day"
      },
      {
        id: 4,
        icon: "🎯",
        title: "Mission-Driven Organization",
        description: "Be part of a mission-driven organization making education accessible and inclusive"
      }
    ]
  },

  // Current Openings Section
  openingsSection: {
    heading: "Current Openings",
    description: "We welcome applications across roles in teaching, operations, technology, content development, and administration.",
    jobCategories: [
      "Teaching",
      "Operations",
      "Technology",
      "Content Development",
      "Administration"
    ],
    contactInfo: {
      icon: "📧",
      heading: "Send Your CV",
      description: "Ready to make a difference? Send your resume and cover letter to:",
      email: "hrofficial@neiea.org"
    }
  },

  // Closing Section
  closingSection: {
    heading: "Join Us and Be a Part of Change",
    description: "Be part of a team that inspires change, innovation, and empowerment. Together, we can make education accessible to every child who needs it."
  }
};

const Career = () => {
  // State to store dynamic data (for future API integration)
  const [pageData, setPageData] = useState(careerPageData);
  const [loading, setLoading] = useState(false);

  // TODO: Uncomment and implement this when API is ready
  // useEffect(() => {
  //   const fetchCareerData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch('/api/career-page'); // Replace with actual API endpoint
  //       const data = await response.json();
  //       setPageData(data);
  //     } catch (error) {
  //       console.error('Error fetching career page data:', error);
  //       // Fallback to static data
  //       setPageData(careerPageData);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCareerData();
  // }, []);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        fontSize: "18px",
        color: "#06038F"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <PageTemplate
      breadcrumbPath={pageData.pageHeader.breadcrumb}
      title={pageData.pageHeader.title}
      subtitle={pageData.pageHeader.subtitle}
      description={pageData.pageHeader.description}
      heroImage={pageData.pageHeader.heroImage}
    >
      {/* Main Content Section */}
      <section style={{ 
        backgroundColor: "#F8F8F8", 
        // padding: "60px 0 80px",
        fontFamily: 'system-ui, -apple-system, "Roboto", sans-serif;'
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
        //   padding: "0 20px"
        }}>
          {/* Introduction */}
          <div style={{
            textAlign: "center",
            marginBottom: "60px"
          }}>
            <h2 style={{
              color: "#06038F",
              fontSize: "clamp(22px, 5vw, 28px)",
              fontWeight: "700",
              marginBottom: "20px",
              lineHeight: "1.3"
            }}>
              {pageData.introduction.heading}
            </h2>
            <p style={{
              fontSize: "clamp(16px, 3vw, 18px)",
              lineHeight: "1.6",
              color: "#333333",
              maxWidth: "900px",
              margin: "0 auto",
              padding: "0 15px"
            }}>
              {pageData.introduction.description}
            </p>
          </div>

          {/* Why Work with Us Section */}
          <div style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            padding: "clamp(25px, 5vw, 40px)",
            marginBottom: "50px",
            borderLeft: "5px solid #06038F"
          }}>
            <h3 style={{
              color: "#06038F",
              fontSize: "clamp(20px, 4vw, 24px)",
              fontWeight: "700",
              marginBottom: "30px",
              lineHeight: "1.2"
            }}>
              {pageData.whyWorkSection.heading}
            </h3>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "25px"
            }}>
              {/* Dynamic Benefits - Map through data */}
              {pageData.whyWorkSection.benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "25px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease"
                  }}
                  className="benefit-card"
                >
                  <div style={{
                    fontSize: "clamp(32px, 6vw, 36px)",
                    marginBottom: "15px"
                  }}>
                    {benefit.icon}
                  </div>
                  <h4 style={{
                    color: "#06038F",
                    fontSize: "clamp(16px, 3vw, 18px)",
                    fontWeight: "700",
                    marginBottom: "12px",
                    lineHeight: "1.3"
                  }}>
                    {benefit.title}
                  </h4>
                  <p style={{
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    lineHeight: "1.5",
                    color: "#495057",
                    margin: "0"
                  }}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Openings Section */}
          <div style={{
            textAlign: "center",
            marginBottom: "50px",
            padding: "0 15px"
          }}>
            <h3 style={{
              color: "#06038F",
              fontSize: "clamp(22px, 5vw, 28px)",
              fontWeight: "700",
              marginBottom: "25px",
              lineHeight: "1.2"
            }}>
              {pageData.openingsSection.heading}
            </h3>
            <p style={{
              fontSize: "clamp(16px, 3vw, 18px)",
              lineHeight: "1.6",
              color: "#333333",
              marginBottom: "30px",
              maxWidth: "900px",
              margin: "0 auto 30px"
            }}>
              {pageData.openingsSection.description}
            </p>

            {/* Job Categories - Dynamic */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              justifyContent: "center",
              marginBottom: "40px"
            }}>
              {pageData.openingsSection.jobCategories.map((category, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#06038F",
                    color: "#ffffff",
                    padding: "10px 25px",
                    borderRadius: "25px",
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    fontWeight: "600"
                  }}
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Contact Box - Dynamic */}
            <div style={{
              backgroundColor: "#06038F",
              color: "#ffffff",
              padding: "clamp(25px, 5vw, 40px)",
              borderRadius: "8px",
              maxWidth: "700px",
              margin: "0 auto",
              boxShadow: "0 10px 30px rgba(6,3,143,0.2)"
            }}>
              <div style={{
                fontSize: "clamp(40px, 8vw, 48px)",
                marginBottom: "20px"
              }}>
                {pageData.openingsSection.contactInfo.icon}
              </div>
              <h4 style={{
                fontSize: "clamp(18px, 4vw, 22px)",
                fontWeight: "700",
                marginBottom: "15px",
                color: "#ffffff"
              }}>
                {pageData.openingsSection.contactInfo.heading}
              </h4>
              <p style={{
                fontSize: "clamp(16px, 3vw, 18px)",
                lineHeight: "1.6",
                marginBottom: "20px",
                color: "#ffffff"
              }}>
                {pageData.openingsSection.contactInfo.description}
              </p>
              <a 
                href={`mailto:${pageData.openingsSection.contactInfo.email}`}
                style={{
                  display: "inline-block",
                  backgroundColor: "#ffffff",
                  color: "#06038F",
                  textDecoration: "none",
                  fontSize: "clamp(16px, 3vw, 20px)",
                  fontWeight: "700",
                  padding: "15px 35px",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  border: "2px solid #ffffff",
                  wordBreak: "break-word"
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
                {pageData.openingsSection.contactInfo.email}
              </a>
            </div>
          </div>

          {/* Closing Message - Dynamic */}
          <div style={{
            textAlign: "center",
            padding: "clamp(25px, 5vw, 40px) 20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px"
          }}>
            <h3 style={{
              color: "#06038F",
              fontSize: "clamp(20px, 4vw, 24px)",
              fontWeight: "700",
              marginBottom: "20px",
              lineHeight: "1.3"
            }}>
              {pageData.closingSection.heading}
            </h3>
            <p style={{
              fontSize: "clamp(16px, 3vw, 18px)",
              lineHeight: "1.6",
              color: "#333333",
              maxWidth: "800px",
              margin: "0 auto"
            }}>
              {pageData.closingSection.description}
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Responsive Styles */}
      <style jsx>{`
        /* Hover Effects */
        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15) !important;
        }

        /* Tablet and Below */
        @media (max-width: 992px) {
          section {
            padding: 40px 0 60px !important;
          }
        }

        /* Mobile Large */
        @media (max-width: 768px) {
          section {
            padding: 40px 0 50px !important;
          }

          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          div[style*="maxWidth: 1200px"] {
            padding: 0 15px !important;
          }
        }

        /* Mobile Medium */
        @media (max-width: 576px) {
          section {
            padding: 30px 0 40px !important;
          }

          div[style*="gap: 25px"] {
            gap: 15px !important;
          }

          div[style*="marginBottom: 60px"] {
            margin-bottom: 40px !important;
          }

          div[style*="marginBottom: 50px"] {
            margin-bottom: 35px !important;
          }
        }

        /* Mobile Small */
        @media (max-width: 480px) {
          section {
            padding: 25px 0 35px !important;
          }

          .benefit-card {
            padding: 20px !important;
          }

          div[style*="gap: 15px"] {
            gap: 10px !important;
          }

          a[href^="mailto"] {
            padding: 12px 25px !important;
            word-break: break-all !important;
          }
        }

        /* Extra Small Devices */
        @media (max-width: 360px) {
          section {
            padding: 20px 0 30px !important;
          }

          div[style*="borderRadius"] {
            border-radius: 6px !important;
          }
        }

        /* Print Styles */
        @media print {
          .benefit-card {
            break-inside: avoid;
          }
          
          a[href^="mailto"]:after {
            content: " (" attr(href) ")";
          }
        }
      `}</style>
    </PageTemplate>
  );
};

export default Career;

