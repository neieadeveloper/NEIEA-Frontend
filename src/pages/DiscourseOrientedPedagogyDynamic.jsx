import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';

const DiscourseOrientedPedagogyDynamic = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDOPData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/discourse-oriented-pedagogy-page');
        
        if (response.data.success && response.data.data) {
          const apiData = response.data.data;
          
          // Sort features and resources by display_order
          const sortedFeatures = apiData.keyFeaturesSection?.features 
            ? [...apiData.keyFeaturesSection.features].sort((a, b) => {
                const orderA = a.display_order ?? 0;
                const orderB = b.display_order ?? 0;
                
                if (orderA === orderB) {
                  return a._id.localeCompare(b._id);
                }
                
                return orderA - orderB;
              })
            : [];

          const sortedResources = apiData.additionalResourcesSection?.resources 
            ? [...apiData.additionalResourcesSection.resources].sort((a, b) => {
                const orderA = a.display_order ?? 0;
                const orderB = b.display_order ?? 0;
                
                if (orderA === orderB) {
                  return a._id.localeCompare(b._id);
                }
                
                return orderA - orderB;
              })
            : [];
          
          const dataWithSortedItems = {
            ...apiData,
            keyFeaturesSection: {
              ...apiData.keyFeaturesSection,
              features: sortedFeatures
            },
            additionalResourcesSection: {
              ...apiData.additionalResourcesSection,
              resources: sortedResources
            }
          };
          
          setPageData(dataWithSortedItems);
        } else {
          setError('No Discourse Oriented Pedagogy page data available');
        }
      } catch (error) {
        console.error('Error fetching DOP page data:', error);
        console.log('Header Video URL:', error.response?.data?.data?.headerSection?.heroVideoUrl);
        setError(error.response?.data?.message || 'Failed to load Discourse Oriented Pedagogy page data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDOPData();
  }, []);

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

  if (error || !pageData) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        padding: "20px",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: "48px",
          marginBottom: "20px"
        }}>
          ⚠️
        </div>
        <h2 style={{
          fontSize: "24px",
          color: "#06038F",
          marginBottom: "10px",
          fontWeight: "700"
        }}>
          {error || 'Page Not Available'}
        </h2>
        <p style={{
          fontSize: "16px",
          color: "#666",
          marginBottom: "20px"
        }}>
          The Discourse Oriented Pedagogy page content is currently unavailable.
        </p>
        <a 
          href="/" 
          className="btn btn-primary"
          style={{
            backgroundColor: "#06038F",
            borderColor: "#06038F",
            padding: "10px 25px",
            fontSize: "16px",
            fontWeight: "600"
          }}
        >
          Return to Home
        </a>
      </div>
    );
  }

  const { headerSection, introductionSection, founderSection, keyFeaturesSection, additionalResourcesSection, callToActionSection } = pageData;

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Working Model", link: null },
        { name: "Blended Learning Model", link: "/about-us/working-model/blended-learning" },
        { name: "Discourse Oriented Pedagogy", link: null }
      ]}  
      title={headerSection?.title || "Discourse-Oriented Pedagogy (DOP)"}
      subtitle={headerSection?.subtitle || ""}
      description={headerSection?.shortDescription || ""}
      heroImage={headerSection?.heroImage || "/assets/images/DOP_Images/Picture7.png"}
      heroVideoUrl={headerSection?.heroVideoUrl || ""}
    >
      {/* Introduction Section */}
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
              {introductionSection?.title || "Introduction to Discourse-Oriented Pedagogy (DOP)"}
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
            <div className="row align-items-center">
              <div className={`${introductionSection?.image ? 'col-lg-8' : 'col-lg-12'}`}>
                <div 
                  style={{ 
                    fontSize: "19px", 
                    lineHeight: "1.6", 
                    color: "#000000",
                    textAlign: "left",
                    fontWeight: "400",
                    whiteSpace: "pre-line"
                  }}
                  dangerouslySetInnerHTML={{ __html: introductionSection?.description || "" }}
                />
              </div>
              {introductionSection?.image && (
                <div className="col-lg-4">
                  <div className="text-center">
                    <img 
                      src={introductionSection.image} 
                      alt="DOP Introduction" 
                      className="img-fluid rounded shadow-sm"
                      style={{ 
                        maxHeight: "250px", 
                        width: "auto",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      {founderSection && (
        <div className="row mb-4">
          <div className="col-12">
            <div 
              className="card border-0 shadow-sm"
              style={{ 
                backgroundColor: "#06038F", 
                borderRadius: "12px", 
                padding: "25px",
                color: "white"
              }}
            >
              <div className="row align-items-center">
                <div className="col-lg-3 text-center flex-column align-items-center d-flex mb-3 mb-lg-0">
                  <img
                    src={founderSection.image || "/assets/images/DOP_Images/Picture2.png"}
                    alt={founderSection.name}
                    className="rounded-circle shadow-lg"
                    style={{ 
                      width: "120px", 
                      height: "120px", 
                      objectFit: "cover",
                      border: "3px solid rgba(255,255,255,0.3)"
                    }}
                  />
                  <h5 
                    style={{ 
                      color: "#ffffff", 
                      fontWeight: "600", 
                      marginTop: "15px",
                      marginBottom: "5px"
                    }}
                  >
                    {founderSection.name}
                  </h5>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", margin: "0" }}>
                    {founderSection.title}
                  </p>
                </div>
                <div className="col-lg-9">
                  <blockquote 
                    style={{ 
                      fontSize: "18px", 
                      lineHeight: "1.6", 
                      color: "#ffffff",
                      fontStyle: "italic",
                      marginBottom: "0",
                      borderLeft: "4px solid rgba(255,255,255,0.3)",
                      paddingLeft: "20px",
                      opacity: "0.95"
                    }}
                  >
                    "{founderSection.quote}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Features Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "30px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "25px",
              textAlign: "center"
            }}
          >
            {keyFeaturesSection?.title || "Key Features of DOP"}
          </h2>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="row g-3 mb-4">
        {keyFeaturesSection?.features?.map((feature, index) => (
          <div key={feature._id || index} className="col-12">
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
              <div className={`row align-items-center ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className={`${feature.image ? 'col-lg-8' : 'col-lg-12'}`}>
                  <div className="d-flex align-items-start mb-3">
                    {/* <div 
                      style={{
                        backgroundColor: "#06038F",
                        color: "white",
                        borderRadius: "8px",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        marginRight: "15px",
                        flexShrink: 0
                      }}
                    >
                      {feature.icon}
                    </div> */}
                    <div>
                      <h4 
                        style={{ 
                          color: "#212529", 
                          fontWeight: "700", 
                          marginBottom: "10px",
                          fontSize: "22px",
                          lineHeight: "1.3"
                        }}
                      >
                        {feature.title}
                      </h4>
                    </div>
                  </div>
                  <p 
                    style={{ 
                      color: "#2c3e50", 
                      lineHeight: "1.6", 
                      marginBottom: feature.subtitle ? "15px" : "0",
                      textAlign: "left",
                      fontSize: "16px",
                      fontWeight: "400"
                    }}
                  >
                    {feature.description}
                  </p>
                  {feature.subtitle && (
                    <div 
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderRadius: "8px",
                        borderLeft: "4px solid #06038F"
                      }}
                    >
                      <p 
                        style={{ 
                          color: "#495057", 
                          lineHeight: "1.5", 
                          margin: "0",
                          fontSize: "15px",
                          fontStyle: "italic"
                        }}
                      >
                        {feature.subtitle}
                      </p>
                    </div>
                  )}
                </div>
                {feature.image && (
                  <div className="col-lg-4">
                    <div className="text-center">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="img-fluid rounded shadow-sm"
                        style={{ 
                          maxHeight: "200px", 
                          width: "auto",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Resources Section */}
      {additionalResourcesSection?.resources?.length > 0 && (
        <>
          <div className="row mb-4">
            <div className="col-12">
              <h2 
                style={{ 
                  fontSize: "30px", 
                  fontWeight: "700", 
                  color: "#212529", 
                  marginBottom: "25px",
                  textAlign: "center"
                }}
              >
                {additionalResourcesSection?.title || "Additional Resources"}
              </h2>
            </div>
          </div>

          <div className="row g-3 mb-4">
            {additionalResourcesSection.resources.map((resource, index) => (
              <div key={resource._id || index} className="col-lg-4">
                <div 
                  className="card h-100 border-0 shadow-sm"
                  style={{ 
                    borderRadius: "12px", 
                    padding: "20px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e9ecef",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                  }}
                >
                  {/* <div 
                    style={{
                      backgroundColor: resource.backgroundColor || "#06038F",
                      color: "white",
                      borderRadius: "50%",
                      width: "60px",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      margin: "0 auto 15px"
                    }}
                  >
                    {resource.icon}
                  </div> */}
                  <h5 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "600", 
                      marginBottom: "10px" 
                    }}
                  >
                    {resource.title}
                  </h5>
                  <p 
                    style={{ 
                      color: "#6c757d", 
                      lineHeight: "1.5", 
                      fontSize: "14px",
                      marginBottom: "15px"
                    }}
                  >
                    {resource.description}
                  </p>
                  <a 
                    href={resource.ctaLink || "#"} 
                    style={{
                      color: resource.backgroundColor || "#06038F",
                      fontWeight: "600",
                      textDecoration: "none",
                      fontSize: "14px"
                    }}
                  >
                    {resource.ctaText} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Call to Action */}
      {callToActionSection && (
        <div className="row">
          <div className="col-12">
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
                {callToActionSection.title}
              </h4>
              <p 
                style={{ 
                  color: "#6c757d", 
                  marginBottom: "20px",
                  fontSize: "16px",
                  maxWidth: "600px",
                  margin: "0 auto 20px"
                }}
              >
                {callToActionSection.description}
              </p>
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                {callToActionSection.primaryButtonText && (
                  <a 
                    href={callToActionSection.primaryButtonLink || "/about-us/contact"}
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#06038F",
                      borderColor: "#06038F",
                      padding: "12px 25px",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "25px",
                      textDecoration: "none"
                    }}
                  >
                    {callToActionSection.primaryButtonText}
                  </a>
                )}
                {callToActionSection.secondaryButtonText && (
                  <a 
                    href={callToActionSection.secondaryButtonLink || "#"}
                    className="btn btn-outline-primary"
                    style={{
                      borderColor: "#06038F",
                      color: "#06038F",
                      padding: "12px 25px",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "25px",
                      textDecoration: "none"
                    }}
                  >
                    {callToActionSection.secondaryButtonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTemplate>
  );
};

export default DiscourseOrientedPedagogyDynamic;

