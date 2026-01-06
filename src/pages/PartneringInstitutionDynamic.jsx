import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import { Link } from 'react-router-dom';
import axiosInstance from '../lib/axiosInstance';

const PartneringInstitutionDynamic = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await axiosInstance.get('/partnering-institution-page');
        if (response.data.success) {
          setPageData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ padding: '50px 0' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="container" style={{ padding: '50px 0' }}>
        <div className="text-center">
          <p>No content available.</p>
        </div>
      </div>
    );
  }

  const { 
    headerSection, 
    overviewSection, 
    partnershipModelSection, 
    exploreNetworkSection, 
    callToActionSection 
  } = pageData;

  // Use the imageUrl from headerSection if available, otherwise use the default image
  const heroImageUrl = headerSection?.imageUrl || "/assets/images/partnering2.png";

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Working Model", link: null },
        { name: "Partnering with Educational Institutions", link: null }
      ]}
      title={headerSection?.title || "Partnering with Educational Institutions"}
      subtitle={headerSection?.subtitle || "Collective Working Through Partnerships"}
      description={headerSection?.description || ""}
      heroImage={heroImageUrl}
      heroVideoUrl={headerSection?.heroVideoUrl || ""}
    >
      {/* Main Content Introduction */}
      <div className="row mb-4">
        <div className="col-lg-11 mx-auto">
          <div 
            style={{ 
              backgroundColor: "#ffffff", 
              padding: "25px", 
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              border: "1px solid #e9ecef"
            }}
          >
            <h2 
              style={{ 
                fontSize: "28px", 
                fontWeight: "700", 
                color: "#212529", 
                marginBottom: "15px",
                textAlign: "center",
                lineHeight: "1.3"
              }}
            >
              {overviewSection?.title || "Overview"}
            </h2>
            <div 
              style={{
                width: "60px",
                height: "3px",
                backgroundColor: "#06038F",
                margin: "0 auto 20px",
                borderRadius: "2px"
              }}
            ></div>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.6", 
                color: "#2c3e50",
                marginBottom: "0",
                textAlign: "left",
                fontWeight: "400",
                letterSpacing: "0.2px"
              }}
              dangerouslySetInnerHTML={{ 
                __html: (overviewSection?.description || "").replace(
                  /<strong style="color: #06038F">(.*?)<\/strong>/g, 
                  '<strong style="color: #06038F">$1</strong>'
                )
              }}
            />
          </div>

          {/* Partnership Model Content Blocks */}
          <div className="row g-3" style={{ marginTop: "20px" }}>
            {partnershipModelSection?.contentBlocks?.map((block, index) => (
              <div key={block._id || index} className="col-12">
                <div 
                  className="card border-0 shadow-sm"
                  style={{ 
                    borderRadius: "12px", 
                    padding: "20px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e9ecef",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                >
                  <div className="d-flex align-items-start">
                    <div 
                      style={{
                        backgroundColor: "#06038F",
                        color: "white",
                        borderRadius: "8px",
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "16px",
                        marginRight: "15px",
                        flexShrink: 0,
                        marginTop: "2px"
                      }}
                    >
                      {block.order || index + 1}
                    </div>
                    <div>
                      <h5 
                        style={{ 
                          color: "#212529", 
                          fontWeight: "700", 
                          marginBottom: "10px",
                          fontSize: "20px",
                          lineHeight: "1.3"
                        }}
                      >
                        {block.title}
                      </h5>
                      <p 
                        style={{ 
                          color: "#2c3e50", 
                          lineHeight: "1.6", 
                          margin: "0",
                          textAlign: "left",
                          fontSize: "16px",
                          letterSpacing: "0.1px",
                          fontWeight: "400"
                        }}
                        dangerouslySetInnerHTML={{ 
                          __html: (block.description || "").replace(
                            /<strong style="color: #06038F">(.*?)<\/strong>/g, 
                            '<strong style="color: #06038F">$1</strong>'
                          )
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explore Network Section */}
      <div className="row mb-4">
        <div className="col-lg-11 mx-auto">
          <div className="row">
            <div className="col-12 text-center mb-4">
              <h2 
                style={{ 
                  fontSize: "30px", 
                  fontWeight: "700", 
                  color: "#212529", 
                  marginTop: "25px",
                  textAlign: "center"
                }}
              >
                {exploreNetworkSection?.title || "Explore Our Partnership Network"}
              </h2>
              <div 
                style={{
                  width: "60px",
                  height: "3px",
                  backgroundColor: "#06038F",
                  margin: "20px auto 0px",
                  borderRadius: "2px"
                }}
              ></div>
            </div>
          </div>

          {/* Network Items */}
          <div className="row g-3">
            {exploreNetworkSection?.items?.map((item, index) => (
              <div key={item._id || index} className="col-lg-4">
                <Link 
                  to={item.link} 
                  className="text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <div 
                    className="card h-100 border-0 shadow-sm hover-card"
                    style={{ 
                      borderRadius: "12px", 
                      padding: "20px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <div className="text-center" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* <div 
                        style={{ 
                          backgroundColor: "#06038F", 
                          color: "white",
                          borderRadius: "50%",
                          width: "80px",
                          height: "80px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "32px",
                          margin: "0 auto 20px"
                        }}
                      >
                        {item.icon}
                      </div> */}
                      <h4 
                        style={{ 
                          color: "#212529", 
                          fontWeight: "600", 
                          marginBottom: "15px",
                          fontSize: "22px",
                          lineHeight: "1.35"
                        }}
                      >
                        {item.heading}
                      </h4>
                      <p 
                        style={{ 
                          color: "#6c757d", 
                          lineHeight: "1.6", 
                          margin: "0",
                          flexGrow: 1,
                          marginBottom: "20px"
                        }}
                      >
                        {item.description}
                      </p>
                      <div 
                        style={{ 
                          marginTop: "auto",
                          color: "#06038F",
                          fontWeight: "600"
                        }}
                      >
                        {item.buttonText} →
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row">
        <div className="col-lg-11 mx-auto">
          <div 
            style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "25px", 
              borderRadius: "12px",
              textAlign: "center"
            }}
          >
            <h4 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "15px" 
              }}
            >
              {callToActionSection?.text || "Ready to Transform Education Together?"}
            </h4>
            <p 
              style={{ 
                color: "#00000", 
                marginBottom: "20px",
                fontSize: "16px",
                maxWidth: "600px",
                margin: "0 auto 20px"
              }}
            >
              {callToActionSection?.description || ""}
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
              <Link 
                to={callToActionSection?.primaryButtonLink || "/partners/join"}
                className="btn btn-primary"
                style={{
                  backgroundColor: "#06038F",
                  borderColor: "#06038F",
                  padding: "12px 30px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "25px",
                  textDecoration: "none"
                }}
              >
                {callToActionSection?.primaryButtonText || "Become a Partner"}
              </Link>
              {callToActionSection?.secondaryButtonText && (
                <Link 
                  to={callToActionSection?.secondaryButtonLink || "/about-us/contact"}
                  className="btn btn-outline-primary"
                  style={{
                    borderColor: "#06038F",
                    color: "#06038F",
                    padding: "12px 30px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "25px",
                    textDecoration: "none"
                  }}
                >
                  {callToActionSection.secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PartneringInstitutionDynamic;
