import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';

const ApplicationOfTechnologyDynamic = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/application-of-technology-page');

        if (response.data.success && response.data.data) {
          setPageData(response.data.data);
        } else {
          setError('No Application of Technology page data available');
        }
      } catch (error) {
        console.error('Error fetching Application of Technology page data:', error);
        setError(error.response?.data?.message || 'Failed to load Application of Technology page data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", fontSize: "18px", color: "#06038F" }}>
        Loading...
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "60vh", padding: "20px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>⚠️</div>
        <h2 style={{ fontSize: "24px", color: "#06038F", marginBottom: "10px", fontWeight: "700" }}>No Data Found</h2>
        <p style={{ fontSize: "16px", color: "#666", maxWidth: "500px", lineHeight: "1.6" }}>
          {error || 'Application of Technology page content is not available at the moment. Please check back later or contact the administrator.'}
        </p>
      </div>
    );
  }

  const {
    headerSection,
    digitalClassroomSection,
    onboardingSection,
    digitalToolboxSection,
    hybridLearningSection,
    powerBackupSection,
    aiIntegrationSection,
    salesforceCRMSection,
    missionSection,
    callToActionSection
  } = pageData;

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Working Model", link: null },
        { name: "Blended Learning Model", link: "/about-us/working-model/blended-learning" },
        { name: "Application of Technology", link: null }
      ]}
      title={headerSection.title}
      subtitle={headerSection.subtitle}
      description={headerSection.description}
      heroImage={headerSection.heroImage}
      heroVideoUrl={headerSection?.heroVideoUrl || ""}
    >
      {/* Digital Classroom Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            {digitalClassroomSection.title}
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            {digitalClassroomSection.description}
          </p>
        </div>
      </div>

      {/* Digital Classroom Image */}
      {/*
      {digitalClassroomSection.image && (
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <img 
                src={digitalClassroomSection.image} 
                alt="NEIEA Digital Classroom Setup" 
                className="img-fluid rounded shadow-sm"
                style={{ 
                  maxHeight: "400px", 
                  width: "auto",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto"
                }}
              />
            </div>
          </div>
        </div>
      )}
      */}

      {/* Digital Classroom Tools Grid */}
      {digitalClassroomSection.tools && digitalClassroomSection.tools.length > 0 && (
        <div className="row g-4 mb-5">
          {digitalClassroomSection.tools.map((tool, index) => (
            <div key={tool._id || index} className="col-lg-6 col-xl-4">
              <div 
                className="card h-100 border-0 shadow-sm"
                style={{ borderRadius: "15px", padding: "25px" }}
              >
                <div className="text-center mb-3">
                  <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                    {tool.icon}
                  </div>
                  <h5 
                    style={{ 
                      color: "#00000", 
                      fontWeight: "600", 
                      marginBottom: "15px" 
                    }}
                  >
                    {tool.title}
                  </h5>
                  <p 
                    style={{ 
                      color: "#00000", 
                      lineHeight: "1.6", 
                      margin: "0",
                      textAlign: "justify"
                    }}
                  >
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Classroom Experience Summary */}
      {digitalClassroomSection.summaryText && (
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <div 
              style={{ 
                backgroundColor: "#f8f9fa", 
                padding: "30px", 
                borderRadius: "15px",
                textAlign: "center"
              }}
            >
              <p 
                style={{ 
                  fontSize: "18px", 
                  lineHeight: "1.8", 
                  color: "#00000",
                  marginBottom: "0",
                  fontStyle: "italic"
                }}
              >
                {digitalClassroomSection.summaryText}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Process Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#00000", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            {onboardingSection.title}
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#00000",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            {onboardingSection.description}
          </p>
        </div>
      </div>

      {/* Onboarding Image */}
      {onboardingSection.image && (
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <img 
                src={onboardingSection.image} 
                alt="NEIEA Onboarding Process" 
                className="img-fluid rounded shadow-sm"
                style={{ 
                  maxHeight: "400px", 
                  width: "auto",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto"
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Steps */}
      {onboardingSection.steps && onboardingSection.steps.length > 0 && (
        <div className="row g-4 mb-5">
          {onboardingSection.steps.map((item, index) => (
            <div key={item._id || index} className="col-lg-6">
              <div 
                className="card h-100 border-0 shadow-sm"
                style={{ borderRadius: "15px", padding: "25px" }}
              >
                <div className="d-flex align-items-start">
                  <div 
                    style={{
                      backgroundColor: "#06038F",
                      color: "white",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginRight: "20px",
                      flexShrink: 0
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h5 
                      style={{ 
                        color: "#212529", 
                        fontWeight: "600", 
                        marginBottom: "10px" 
                      }}
                    >
                      {item.title}
                    </h5>
                    <p 
                      style={{ 
                        color: "#00000", 
                        lineHeight: "1.6", 
                        margin: "0"
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Digital Toolbox Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            {digitalToolboxSection.title}
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#00000",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            {digitalToolboxSection.description}
          </p>
        </div>
      </div>

      {/* Digital Tools Table */}
      {digitalToolboxSection.tools && digitalToolboxSection.tools.length > 0 && (
        <div className="row mb-5">
          <div className="col-12">
            <div 
              className="card border-0 shadow-sm"
              style={{ borderRadius: "15px", overflow: "hidden" }}
            >
              <div className="table-responsive">
                <table className="table table-striped mb-0" style={{ fontSize: "16px" }}>
                  <thead style={{ backgroundColor: "#06038F", color: "white" }}>
                    <tr>
                      <th style={{ padding: "20px", fontWeight: "600", border: "none" }}>Tool</th>
                      <th style={{ padding: "20px", fontWeight: "600", border: "none" }}>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {digitalToolboxSection.tools.map((item, index) => (
                      <tr key={item._id || index}>
                        <td style={{ padding: "15px 20px", fontWeight: "500", color: "#00000" }}>
                          {item.tool}
                        </td>
                        <td style={{ padding: "15px 20px", color: "#00000" }}>
                          {item.purpose}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Digital Toolbox Summary */}
      {digitalToolboxSection.summaryText && (
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                color: "#00000",
                marginBottom: "0",
                textAlign: "center",
                fontStyle: "italic"
              }}
            >
              {digitalToolboxSection.summaryText}
            </p>
          </div>
        </div>
      )}

      {/* Hybrid Learning Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            {hybridLearningSection.title}
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#00000",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            {hybridLearningSection.description}
          </p>
        </div>
      </div>

      {/* Hybrid Learning Formats */}
      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "30px" }}
          >
            <div className="text-center mb-3">
              {/* <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                🏫
              </div> */}
              <h4 
                style={{ 
                  color: "#212529", 
                  fontWeight: "600", 
                  marginBottom: "15px" 
                }}
              >
                {hybridLearningSection.onsiteTitle}
              </h4>
              <p 
                style={{ 
                  color: "#00000", 
                  lineHeight: "1.6", 
                  margin: "0",
                  textAlign: "justify"
                }}
              >
                {hybridLearningSection.onsiteDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "30px" }}
          >
            <div className="text-center mb-3">
              {/* <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                🏠
              </div> */}
              <h4 
                style={{ 
                  color: "#212529", 
                  fontWeight: "600", 
                  marginBottom: "15px" 
                }}
              >
                {hybridLearningSection.remoteTitle}
              </h4>
              <p 
                style={{ 
                  color: "#00000", 
                  lineHeight: "1.6", 
                  margin: "0",
                  textAlign: "justify"
                }}
              >
                {hybridLearningSection.remoteDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Power Backup Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            {powerBackupSection.title}
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#00000",
              marginBottom: "30px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 30px"
            }}
          >
            {powerBackupSection.description}
          </p>
        </div>
      </div>

      {/* Power Backup Solutions */}
      {powerBackupSection.solutions && powerBackupSection.solutions.length > 0 && (
        <div className="row g-4 mb-5">
          {powerBackupSection.solutions.map((solution, index) => (
            <div key={index} className="col-lg-4">
              <div 
                className="card h-100 border-0 shadow-sm"
                style={{ borderRadius: "15px", padding: "25px", textAlign: "center" }}
              >
                {/* <div style={{ fontSize: "48px", marginBottom: "20px" }}>
                  {index === 0 ? '🔋' : index === 1 ? '🔌' : '⚡'}
                </div> */}
                <h5 
                  style={{ 
                    color: "#00000", 
                    fontWeight: "600", 
                    marginBottom: "15px" 
                  }}
                >
                  {solution}
                </h5>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Power Backup Benefits */}
      {powerBackupSection.summaryText && (
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                color: "#00000",
                marginBottom: "0",
                textAlign: "center"
              }}
            >
              {powerBackupSection.summaryText}
            </p>
          </div>
        </div>
      )}

      {/* AI Integration Image */}
      {aiIntegrationSection.image && (
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <img 
                src={aiIntegrationSection.image} 
                alt="NEIEA AI-Powered Learning Tools" 
                className="img-fluid rounded shadow-sm"
                style={{ 
                  maxHeight: "400px", 
                  width: "auto",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto"
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* AI Integration Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#00000", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            {aiIntegrationSection.title}
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#00000",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            {aiIntegrationSection.description}
          </p>
        </div>
      </div>

      {/* AI Tools List */}
      {aiIntegrationSection.tools && aiIntegrationSection.tools.length > 0 && (
        <div className="row g-4 mb-5">
          {aiIntegrationSection.tools.map((item, index) => (
            <div key={item._id || index} className="col-lg-6">
              <div 
                className="card h-100 border-0 shadow-sm"
                style={{ borderRadius: "15px", padding: "25px" }}
              >
                <div className="d-flex align-items-start">
                  {/* <div 
                    style={{
                      backgroundColor: "#06038F",
                      color: "white",
                      borderRadius: "8px",
                      padding: "10px",
                      marginRight: "15px",
                      flexShrink: 0
                    }}
                  >
                    🤖
                  </div> */}
                  <div>
                    <h5 
                      style={{ 
                        color: "#212529", 
                        fontWeight: "600", 
                        marginBottom: "10px" 
                      }}
                    >
                      {item.tool}
                    </h5>
                    <p 
                      style={{ 
                        color: "#00000", 
                        lineHeight: "1.6", 
                        margin: "0"
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Benefits */}
      {aiIntegrationSection.summaryText && (
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                color: "#00000",
                marginBottom: "0",
                textAlign: "center",
                fontStyle: "italic"
              }}
            >
              {aiIntegrationSection.summaryText}
            </p>
          </div>
        </div>
      )}

      {/* Salesforce CRM Section */}
      {/**
       * <div className="row mb-5">
       *   <div className="col-12">
       *     <h2 
       *       style={{ 
       *         fontSize: "36px", 
       *         fontWeight: "700", 
       *         color: "#212529", 
       *         marginBottom: "30px",
       *         textAlign: "center"
       *       }}
       *     >
       *       {salesforceCRMSection.title}
       *     </h2>
       *     <p 
       *       style={{ 
       *         fontSize: "18px", 
       *         lineHeight: "1.8", 
       *         color: "#495057",
       *         marginBottom: "40px",
       *         textAlign: "center",
       *         maxWidth: "900px",
       *         margin: "0 auto 40px"
       *       }}
       *     >
       *       {salesforceCRMSection.description}
       *     </p>
       *   </div>
       * </div>
       */}

      {/* CRM Features */}
      {/**
       * {salesforceCRMSection.features && salesforceCRMSection.features.length > 0 && (
       *   <div className="row g-4 mb-5">
       *     {salesforceCRMSection.features.map((feature, index) => (
       *       <div key={index} className="col-lg-4">
       *         <div 
       *           className="card h-100 border-0 shadow-sm"
       *           style={{ borderRadius: "15px", padding: "25px", textAlign: "center" }}
       *         >
       *           <div style={{ fontSize: "48px", marginBottom: "20px" }}>
       *             {feature.icon}
       *           </div>
       *           <h5 
       *             style={{ 
       *               color: "#212529", 
       *               fontWeight: "600", 
       *               marginBottom: "15px" 
       *             }}
       *           >
       *             {feature.title}
       *           </h5>
       *           <p 
       *             style={{ 
       *               color: "#6c757d", 
       *               lineHeight: "1.6", 
       *               margin: "0",
       *               fontSize: "14px"
       *             }}
       *           >
       *             {feature.description}
       *           </p>
       *         </div>
       *       </div>
       *     ))}
       *   </div>
       * )}
       */}

      {/* CRM Impact */}
      {/**
       * {salesforceCRMSection.summaryText && (
       *   <div className="row mb-5">
       *     <div className="col-lg-10 mx-auto">
       *       <p 
       *         style={{ 
       *           fontSize: "18px", 
       *           lineHeight: "1.8", 
       *           color: "#495057",
       *           marginBottom: "0",
       *           textAlign: "center",
       *           fontStyle: "italic"
       *         }}
       *       >
       *         {salesforceCRMSection.summaryText}
       *       </p>
       *     </div>
       *   </div>
       * )}
       */}

      {/* Mission Statement */}
      <div className="row mb-5">
        <div className="col-12">
          <div 
            style={{ 
              backgroundColor: "#06038F", 
              color: "white",
              padding: "40px", 
              borderRadius: "15px", 
              textAlign: "center"
            }}
          >
            <h2 
              style={{ 
                fontSize: "32px", 
                fontWeight: "700", 
                marginBottom: "20px",
                color: "white"
              }}
            >
              {missionSection.title}
            </h2>
            <p 
              style={{ 
                fontSize: "20px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                maxWidth: "800px",
                margin: "0 auto",
                color:"#00000"
              }}
            >
              {missionSection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row">
        <div className="col-12">
          <div 
            style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "40px", 
              borderRadius: "15px",
              textAlign: "center"
            }}
          >
            <h3 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "20px" 
              }}
            >
              {callToActionSection.title}
            </h3>
            <p 
              style={{ 
                color: "#00000", 
                marginBottom: "30px",
                fontSize: "18px",
                maxWidth: "600px",
                margin: "0 auto 30px"
              }}
            >
              {callToActionSection.description}
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
              <div className="d-flex align-items-center">
                <span style={{ fontSize: "20px", marginRight: "10px" }}>📩</span>
                <span style={{ color: "#06038F", fontWeight: "600" }}>
                  Contact us at {callToActionSection.contactEmail}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ApplicationOfTechnologyDynamic;

