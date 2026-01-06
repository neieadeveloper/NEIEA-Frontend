import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

const IntroductionDynamic = () => {
  const [introductionData, setIntroductionData] = useState({
    visionMissionSection: {
      vision: {
        title: "OUR VISION",
        description: "To envision a society where all youth and citizens are able to obtain good quality education and use this to transform society ensuring human welfare, sustainability, and progress."
      },
      mission: {
        title: "OUR MISSION", 
        description: "To provide good quality and innovative education to all segments of society with high consideration given to providing free education to the poor."
      }
    },
    registrationSection: {
      heading: "Registration",
      description: "NEIEA was officially registered on April 18, 2022, as a Section 8a non-profit educational organization in India, after two years of active educational discussions and planning during the Pandemic. NEIEA has 12a and 80g approvals from the Government of India and also Darpan ID.",
      image: "/assets/images/vision2 (1).jpg"
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIntroductionData();
  }, []);

  const loadIntroductionData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/introduction-page');
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        
        // Map the API data to our component structure
        const mappedData = {
          visionMissionSection: data.visionMissionSection || {
            vision: {
              title: "OUR VISION",
              description: "To envision a society where all youth and citizens are able to obtain good quality education and use this to transform society ensuring human welfare, sustainability, and progress."
            },
            mission: {
              title: "OUR MISSION",
              description: "To provide good quality and innovative education to all segments of society with high consideration given to providing free education to the poor."
            }
          },
          registrationSection: data.registrationSection || {
            heading: data.footerNote?.heading || "Registration",
            description: data.footerNote?.description || "NEIEA was officially registered on April 18, 2022, as a Section 8a non-profit educational organization in India, after two years of active educational discussions and planning during the Pandemic. NEIEA has 12a and 80g approvals from the Government of India and also Darpan ID.",
            image: data.registrationSection?.image || "/assets/images/vision2 (1).jpg"
          }
        };
        
        setIntroductionData(mappedData);
      }
    } catch (err) {
      console.error('Error loading introduction data:', err);
      // Keep default data if API fails
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="introduction-page">
        <div className="container-fluid" style={{ backgroundColor: "#f8f9fa", padding: "10px 0" }}>
          <div className="container">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading Introduction Page...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="introduction-page">
      {/* Breadcrumb */}
      {/*
      <div
        className="container-fluid"
        style={{ backgroundColor: "#f8f9fa", padding: "10px 0" }}
      >
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol
              className="breadcrumb mb-0"
              style={{ backgroundColor: "transparent" }}
            >
              <li className="breadcrumb-item">
                <a
                  href="/"
                  style={{ color: "#6c757d", textDecoration: "none" }}
                >
                  🏠 Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <span style={{ color: "#6c757d" }}>About</span>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                style={{ color: "#495057" }}
              >
                Mission
              </li>
            </ol>
          </nav>
        </div>
      </div>
      */}

      {/* Vision Mission Section */}
      <section style={{ backgroundColor: "#CBF3BB", padding: "60px 0" }}>
        <div className="container">
          <div className="row justify-content-center align-items-center gy-5">
            <div className="col-lg-5 col-md-6">
              <div className="text-center mx-auto" style={{ maxWidth: "480px" }}>
                <h1
                  style={{
                    color: "#fd7e14",
                    fontSize: "28px",
                    fontWeight: "700",
                    lineHeight: "1.2",
                    textTransform: "uppercase",
                    marginBottom: "30px",
                  }}
                >
                  {introductionData.visionMissionSection?.vision?.title || "OUR VISION"}
                </h1>
                <blockquote
                  style={{
                    fontSize: "22px",
                    lineHeight: "32px",
                    letterSpacing: "-.02em",
                    color: "#000000",
                    fontWeight: "400",
                    marginBottom: "0",
                  }}
                >
                  "{introductionData.visionMissionSection?.vision?.description || 'To envision a society where all youth and citizens are able to obtain good quality education and use this to transform society ensuring human welfare, sustainability, and progress.'}"
                </blockquote>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="text-center mx-auto" style={{ maxWidth: "480px" }}>
                <h1
                  style={{
                    color: "#fd7e14",
                    fontSize: "28px",
                    fontWeight: "700",
                    lineHeight: "1.2",
                    textTransform: "uppercase",
                    marginBottom: "30px",
                  }}
                >
                  {introductionData.visionMissionSection?.mission?.title || "OUR MISSION"}
                </h1>
                <blockquote
                  style={{
                    fontSize: "22px",
                    lineHeight: "32px",
                    letterSpacing: "-.02em",
                    color: "#000000",
                    fontWeight: "400",
                    marginBottom: "0",
                  }}
                >
                  "{introductionData.visionMissionSection?.mission?.description || 'To provide good quality and innovative education to all segments of society with high consideration given to providing free education to the poor.'}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colorful Divider */}
      <div
        style={{
          height: "6px",
          background:
            "linear-gradient(to right, #dc3545, #28a745, #fd7e14, #6f42c1)",
        }}
      ></div>

      {/* Registration Section */}
      <section style={{ backgroundColor: "#fff", padding: "80px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 mb-4 mb-lg-0">
              <div className="text-center text-lg-start">
                <h2
                  style={{
                    fontSize: "48px",
                    fontWeight: "700",
                    color: "#212529",
                    marginBottom: "30px",
                    lineHeight: "1.2",
                  }}
                >
                  {introductionData.registrationSection?.heading || "Registration"}
                </h2>
                <p
                  style={{
                    fontSize: "22px",
                    lineHeight: "1.6",
                    color: "#464646",
                    marginBottom: "0",
                  }}
                >
                  {introductionData.registrationSection?.description || "NEIEA was officially registered on April 18, 2022, as a Section 8a non-profit educational organization in India, after two years of active educational discussions and planning during the Pandemic. NEIEA has 12a and 80g approvals from the Government of India and also Darpan ID."}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="text-center">
                <img
                  src={introductionData.registrationSection?.image || "/assets/images/vision2 (1).jpg"}
                  alt="NEIEA Registration"
                  className="img-fluid rounded shadow"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroductionDynamic;
