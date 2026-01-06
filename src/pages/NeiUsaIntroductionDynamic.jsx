import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';
import { LoadingSpinner } from '../components/LoadingSpinner';

const NeiUsaIntroduction = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/nei-usa-introduction-page');
        
        if (response.data.success && response.data.data) {
          setPageData(response.data.data);
        } else {
          setError('Page data not found');
        }
      } catch (err) {
        console.error('Error fetching NEI USA Introduction page:', err);
        setError('Failed to load page data');
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "NEI USA", link: null },
          { name: "About NEIUSA", link: null }
        ]}
        title="New Educational Initiative Corp"
        subtitle="Making Quality Education Accessible to All"
        description="A non-profit organization committed to making quality education accessible to all. We believe every young mind deserves the opportunity to learn and grow, regardless of background, geography, or circumstance."
      >
        <div className="text-center py-12">
          <p className="text-gray-600">{error || 'Content will be available soon.'}</p>
        </div>
      </PageTemplate>
    );
  }

  // Extract data with fallbacks
  const heroSection = pageData.heroSection || { title: 'New Educational Initiative Corp', subtitle: '', description: '' };
  const aboutSection = pageData.aboutSection || { heading: 'About NEIUSA', description: '', image: '' };
  const visionSection = pageData.visionSection || { heading: 'Our Vision', description: '', icon: '👁️' };
  const missionSection = pageData.missionSection || { heading: 'Our Mission', missionItems: [], icon: '🎯' };
  const whoWeServeSection = pageData.whoWeServeSection || { heading: 'Who We Serve', description: '', image: '', items: [] };
  const whatWeOfferSection = pageData.whatWeOfferSection || { heading: 'What We Offer', image: '', items: [] };
  const joinUsSection = pageData.joinUsSection || { heading: 'Join Us', description: '', buttonText: 'Get Involved', buttonLink: '' };

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "NEI USA", link: null },
        { name: "About NEIUSA", link: null }
      ]}
      title={heroSection.title || "New Educational Initiative Corp"}
      subtitle={heroSection.subtitle || ""}
      description={heroSection.description || "A non-profit organization committed to making quality education accessible to all. We believe every young mind deserves the opportunity to learn and grow, regardless of background, geography, or circumstance."}
    >
      {/* About NEIUSA */}
      <div className="row mb-3 mb-md-5">
        <div className="col-lg-12">
          <h2 style={{ color: "#06038F", fontWeight: "700", marginBottom: "30px", textAlign: "center" }}>
            {aboutSection.heading || "About NEIUSA"}
          </h2>
          <div className="row">
            {aboutSection.image && (
              <div className="col-lg-6 mb-4">
                <img 
                  src={aboutSection.image} 
                  alt="NEIUSA Students" 
                  className="img-fluid rounded shadow-sm"
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "/assets/images/NEIStudentImage.png";
                  }}
                />
              </div>
            )}
            <div className={aboutSection.image ? "col-lg-6" : "col-lg-12"}>
              <p 
                style={{ 
                  fontSize: "16px", 
                  lineHeight: "1.8", 
                  color: "#495057",
                  marginBottom: "20px"
                }}
              >
                {aboutSection.description || "New Educational Initiative Corp is a non-profit organization committed to making quality education accessible to all."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Vision */}
      <div className="row mb-3 mb-md-5">
        <div className="col-lg-12">
          <div 
            className="card border-0 shadow-sm px-md-5 py-md-4"
            style={{ borderRadius: "15px", padding: "20px", paddingTop: "30px", paddingBottom: "30px", backgroundColor: "#f8f9fa" }}
          >
            <div className="text-center mb-4">
              <div 
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#06038F",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  marginBottom: "30px"
                }}
              >
                <span style={{ color: "white", fontSize: "36px" }}>{visionSection.icon || "👁️"}</span>
              </div>
              <h3 style={{ color: "#06038F", fontWeight: "700", marginBottom: "25px", fontSize: "32px" }}>
                {visionSection.heading || "Our Vision"}
              </h3>
            </div>
            <p 
              style={{ 
                fontSize: "20px", 
                lineHeight: "1.8", 
                color: "#495057",
                textAlign: "center",
                marginBottom: "0",
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              {visionSection.description || "To create a future where education is a right, not a privilege — empowering students to reach their full potential and contribute meaningfully to society."}
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="row mb-3 mb-md-5">
        <div className="col-lg-12">
          <div 
            className="card border-0 shadow-sm px-md-5 py-md-4"
            style={{ borderRadius: "15px", padding: "20px", paddingTop: "30px", paddingBottom: "30px" }}
          >
            <div className="text-center mb-4">
              <div 
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#06038F",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  marginBottom: "30px"
                }}
              >
                <span style={{ color: "white", fontSize: "36px" }}>{missionSection.icon || "🎯"}</span>
              </div>
              <h3 style={{ color: "#06038F", fontWeight: "700", marginBottom: "30px", fontSize: "32px" }}>
                {missionSection.heading || "Our Mission"}
              </h3>
            </div>
            <div className="row">
              {missionSection.missionItems && missionSection.missionItems.length > 0 ? (
                missionSection.missionItems.map((mission, index) => (
                  <div key={index} className="col-lg-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div 
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "#06038F",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "15px",
                          flexShrink: 0,
                          marginTop: "5px"
                        }}
                      >
                        <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>✓</span>
                      </div>
                      <p 
                        style={{ 
                          fontSize: "16px", 
                          lineHeight: "1.6", 
                          color: "#495057",
                          marginBottom: "0"
                        }}
                      >
                        {mission}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p style={{ color: "#6c757d" }}>No mission items available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Who We Serve */}
      <div className="row mb-3 mb-md-5">
        <div className="col-lg-12">
          <div 
            className="card border-0 shadow-sm px-md-5 py-md-4"
            style={{ borderRadius: "15px", padding: "20px", paddingTop: "30px", paddingBottom: "30px" }}
          >
            <div className="text-center mb-4">
              <h3 style={{ color: "#06038F", fontWeight: "700", marginBottom: "30px", fontSize: "32px" }}>
                {whoWeServeSection.heading || "Who We Serve"}
              </h3>
              {whoWeServeSection.description && (
                <p style={{ color: "#495057", fontSize: "18px", marginBottom: "40px" }}>
                  {whoWeServeSection.description}
                </p>
              )}
            </div>
            <div className="row">
              {whoWeServeSection.image && (
                <div className="col-lg-6 mb-4">
                  <img 
                    src={whoWeServeSection.image} 
                    alt="Diverse Students" 
                    className="img-fluid rounded shadow-sm"
                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "/assets/images/Picture2.png";
                    }}
                  />
                </div>
              )}
              <div className={whoWeServeSection.image ? "col-lg-6" : "col-lg-12"}>
                <div className="row">
                  {whoWeServeSection.items && whoWeServeSection.items.length > 0 ? (
                    whoWeServeSection.items.map((group, index) => (
                      <div key={group._id || index} className="col-12 mb-4">
                        <div className="d-flex align-items-start">
                          <div 
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#06038F",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "20px",
                              flexShrink: 0
                            }}
                          >
                            <span style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>•</span>
                          </div>
                          <div>
                            <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "8px" }}>
                              {group.title}
                            </h5>
                            <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.5", marginBottom: "0" }}>
                              {group.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center">
                      <p style={{ color: "#6c757d" }}>No items available.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="row mb-3 mb-md-5">
        <div className="col-lg-12">
          <div 
            className="card border-0 shadow-sm px-md-5 py-md-4"
            style={{ borderRadius: "15px", padding: "20px", paddingTop: "30px", paddingBottom: "30px" }}
          >
            <div className="text-center mb-4">
              <h3 style={{ color: "#06038F", fontWeight: "700", marginBottom: "30px", fontSize: "32px" }}>
                {whatWeOfferSection.heading || "What We Offer"}
              </h3>
            </div>
            <div className="row">
              {whatWeOfferSection.image && (
                <div className="col-lg-6 mb-4">
                  <img 
                    src={whatWeOfferSection.image} 
                    alt="Native American Youth" 
                    className="img-fluid rounded shadow-sm"
                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "/assets/images/Picture3.png";
                    }}
                  />
                </div>
              )}
              <div className={whatWeOfferSection.image ? "col-lg-6" : "col-lg-12"}>
                <div className="row">
                  {whatWeOfferSection.items && whatWeOfferSection.items.length > 0 ? (
                    whatWeOfferSection.items.map((offer, index) => (
                      <div key={offer._id || index} className="col-12 mb-4">
                        <div className="d-flex align-items-start">
                          <div 
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#06038F",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "20px",
                              flexShrink: 0
                            }}
                          >
                            <span style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>•</span>
                          </div>
                          <div>
                            <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "8px" }}>
                              {offer.title}
                            </h5>
                            <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.5", marginBottom: "0" }}>
                              {offer.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center">
                      <p style={{ color: "#6c757d" }}>No items available.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us */}
      <div className="row mb-3 mb-md-5">
        <div className="col-lg-12">
          <div 
            className="card border-0 shadow-sm px-md-5 py-md-4"
            style={{ borderRadius: "15px", padding: "20px", paddingTop: "30px", paddingBottom: "30px", backgroundColor: "#f8f9fa" }}
          >
            <div className="text-center">
              <h3 style={{ color: "#06038F", fontWeight: "700", marginBottom: "30px", fontSize: "32px" }}>
                {joinUsSection.heading || "Join Us"}
              </h3>
              <p 
                style={{ 
                  fontSize: "18px", 
                  lineHeight: "1.8", 
                  color: "#495057",
                  marginBottom: "30px",
                  maxWidth: "800px",
                  margin: "0 auto 30px"
                }}
              >
                {joinUsSection.description || "Whether as a learner, volunteer, donor, or partner — your support strengthens our mission of building equitable access to education for all."}
              </p>
              {joinUsSection.buttonLink && (
                <div>
                  <a 
                    href={joinUsSection.buttonLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary me-3"
                    style={{
                      backgroundColor: "#06038F",
                      borderColor: "#06038F",
                      padding: "12px 24px",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      textDecoration: "none"
                    }}
                  >
                    {joinUsSection.buttonText || "Get Involved"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default NeiUsaIntroduction;
