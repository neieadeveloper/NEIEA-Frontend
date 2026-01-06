import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';
import { LoadingSpinner } from '../components/LoadingSpinner';

const ReportsFinancialsDynamic = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/reports-financials-page');
      if (response.data && response.data.success) {
        setPageData(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching reports & financials page:', err);
      // Don't show error if data doesn't exist yet (404) - just show empty state
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || 'Failed to load page data');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Page</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="container py-5">
        <div className="alert alert-info" role="alert">
          No data available for this page.
        </div>
      </div>
    );
  }

  const { 
    headerSection, 
    missionSection, 
    keyHighlightsSection,
    impactReportSection
  } = pageData;

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Reports and Financials", link: null }
      ]}
      title={headerSection?.title || "Reports & Financials"}
      subtitle={headerSection?.subtitle || ""}
      description={headerSection?.description || ""}
      heroImage={headerSection?.heroImage || ""}
    >
      {/* Mission Statement */}
      {missionSection && (missionSection.title || missionSection.description) && (
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <div className="text-center" style={{ padding: "40px 20px" }}>
              {missionSection.title && (
                <h2 
                  style={{ 
                    fontSize: "32px", 
                    fontWeight: "700", 
                    marginBottom: "25px",
                    color: "#212529"
                  }}
                >
                  {missionSection.title}
                </h2>
              )}
              {missionSection.description && (
                <p 
                  style={{ 
                    fontSize: "20px", 
                    lineHeight: "1.8", 
                    marginBottom: "0",
                    color: "#00000"
                  }}
                >
                  {missionSection.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Key Highlights */}
      {/* {keyHighlightsSection && keyHighlightsSection.highlights && keyHighlightsSection.highlights.length > 0 && (
        <>
          <div className="row mb-5">
            <div className="col-12">
              <div className="text-center mb-5">
                {keyHighlightsSection.sectionLabel && (
                  <h6 
                    style={{
                      color: "#fd7e14",
                      fontSize: "14px",
                      fontWeight: "600",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "15px"
                    }}
                  >
                    {keyHighlightsSection.sectionLabel}
                  </h6>
                )}
                {keyHighlightsSection.title && (
                  <h2 
                    style={{ 
                      fontSize: "36px", 
                      fontWeight: "700", 
                      color: "#212529", 
                      marginBottom: "20px",
                      lineHeight: "1.3"
                    }}
                  >
                    {keyHighlightsSection.title}
                  </h2>
                )}
                {keyHighlightsSection.description && (
                  <p 
                    style={{ 
                      fontSize: "18px", 
                      color: "#00000", 
                      maxWidth: "600px",
                      margin: "0 auto"
                    }}
                  >
                    {keyHighlightsSection.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="row g-4 mb-5">
            {keyHighlightsSection.highlights.map((highlight, index) => (
              <div key={highlight._id || index} className="col-lg-4 col-md-6">
                <div style={{ padding: "20px 0", textAlign: "center" }}>
                  {highlight.icon && (
                    <div 
                      style={{ 
                        fontSize: "40px", 
                        marginBottom: "20px"
                      }}
                    >
                      {highlight.icon}
                    </div>
                  )}
                  {highlight.title && (
                    <h5 
                      style={{ 
                        color: "#212529", 
                        fontWeight: "700", 
                        marginBottom: "15px",
                        fontSize: "20px"
                      }}
                    >
                      {highlight.title}
                    </h5>
                  )}
                  {highlight.description && (
                    <p 
                      style={{ 
                        color: "#00000", 
                        fontSize: "16px", 
                        lineHeight: "1.6", 
                        margin: "0"
                      }}
                    >
                      {highlight.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )} */}

      {/* Impact Report Section */}
      {impactReportSection && (impactReportSection.title || impactReportSection.description) && (
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="text-center" style={{ padding: "40px 20px" }}>
              {impactReportSection.title && (
                <h3 
                  style={{ 
                    fontSize: "28px", 
                    fontWeight: "700", 
                    marginBottom: "20px",
                    color: "#212529"
                  }}
                >
                  {impactReportSection.title}
                </h3>
              )}
              {impactReportSection.description && (
                <p 
                  style={{ 
                    fontSize: "18px", 
                    marginBottom: "30px",
                    color: "#00000",
                    maxWidth: "600px",
                    margin: "0 auto 30px"
                  }}
                >
                  {impactReportSection.description}
                </p>
              )}
              {impactReportSection.pdfUrl && impactReportSection.buttonText && (
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <a
                    href={impactReportSection.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                    style={{
                      backgroundColor: "#06038F",
                      borderColor: "#06038F",
                      padding: "12px 30px",
                      fontWeight: "600",
                      fontSize: "16px",
                      textDecoration: "none"
                    }}
                  >
                    {impactReportSection.buttonText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageTemplate>
  );
};

export default ReportsFinancialsDynamic;
