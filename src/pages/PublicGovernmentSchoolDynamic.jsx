import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';
import { LoadingSpinner } from '../components/LoadingSpinner';

const PublicGovernmentSchoolDynamic = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/public-government-school-page');

        if (response.data.success && response.data.data) {
          setPageData(response.data.data);
        } else {
          setError('Page data not found');
        }
      } catch (err) {
        console.error('Error fetching public government school page:', err);
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
          { name: "Our Work", link: null },
          { name: "Education", link: null },
          { name: "Public (Government) School", link: null }
        ]}
        title="Strengthening India's Public School System through NEIEA's Blended Learning Model"
        subtitle="Public (Government) School Support"
        description="NEIEA offers a proven, scalable, and affordable solution that directly addresses systemic challenges in public schools and complements government efforts."
        heroImage="/assets/images/PublicGovSchool/1.png"
      >
        <div className="text-center py-12">
          <p className="text-gray-600">Content will be available soon.</p>
        </div>
      </PageTemplate>
    );
  }

  // Extract data with fallbacks
  const heroSection = pageData.heroSection || {};
  const introduction = pageData.introductionSection || {};
  const blendedLearning = pageData.blendedLearningSection || {};
  const challenges = pageData.challengesSection || {};
  const modelSection = pageData.modelSection || {};
  const caseStudy = pageData.caseStudySection || {};
  const pilotProject = pageData.pilotProjectSection || {};
  const whyPartner = pageData.whyPartnerSection || {};
  const callToAction = pageData.callToActionSection || {};

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Education", link: null },
        { name: "Public (Government) School", link: null }
      ]}
      title={heroSection.title || "Strengthening India's Public School System through NEIEA's Blended Learning Model"}
      subtitle={heroSection.subtitle || "Public (Government) School Support"}
      description={heroSection.description || "NEIEA offers a proven, scalable, and affordable solution that directly addresses systemic challenges in public schools and complements government efforts."}
      heroImage={heroSection.heroImage || "/assets/images/PublicGovSchool/1.png"}
    >
      {/* Main Content Container */}
      <div className="container-fluid px-0">
        
        {/* Introduction Section */}
        <section className="mb-4">
          <div className="row justify-content-center">
            <div className="col-lg-20">
              <div className="text-center mb-4">
                <h2 className="display-6 fw-bold text-dark mb-4">{introduction.heading || 'Introduction'}</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <p className=" fs-5 lh-lg" style={{ fontSize: '20px', lineHeight: '1.8', color:"#00000" }}>
                    {introduction.description || "India's public (government) schools are the backbone of education for millions of children. Yet, systemic challenges—teacher shortages, outdated pedagogy, weak foundations in English and Math, and limited access to modern technology—continue to hold back student learning outcomes. The New Equitable and Innovative Educational Association (NEIEA) offers a proven, scalable, and affordable solution that directly addresses these issues and complements government efforts."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blended Learning Model Section */}
        <section className="mb-5 py-5" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="text-center">
                <img 
                  src={blendedLearning.image || "/assets/images/PublicGovSchool/3.png"} 
                  alt="NEIEA Blended Learning Model" 
                  className="img-fluid rounded shadow" 
                  style={{ 
                    maxHeight: "400px",
                    objectFit: "cover"
                  }} 
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <h3 className="h2 fw-bold text-dark mb-4">{blendedLearning.heading || "Our Blended Learning Model"}</h3>
                <p className=" fs-5 lh-lg">
                  {blendedLearning.description || "NEIEA's innovative Blended Learning Model combines live online teaching with on-site facilitation, ensuring high-quality instruction while strengthening teacher capacity. With successful pilots in Karnataka, NEIEA demonstrates how public–civil society partnerships can transform classrooms, empower teachers, and build confident learners."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h2 className="display-6 fw-bold text-dark mb-4">{challenges.heading || "The Challenge in Public Schools"}</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              <div className="row">
                <div className="col-lg-18 mx-auto">
                  <div className="row g-4">
                    {(challenges.challenges || []).map((challenge, index) => (
                      <div key={challenge._id || index} className="col-md-6">
                        <div className="h-100 p-4 border rounded-3 bg-white shadow-sm">
                          <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>{challenge.title}</h5>
                          <p className=" mb-0" style={{ color:"#00000" }}>{challenge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEIEA's Model Section */}
        <section className="mb-5 py-5" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h2 className="display-6 fw-bold text-dark mb-4">{modelSection.heading || "NEIEA's Model of Working"}</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              {modelSection.introText && (
                <div className="row justify-content-center mb-4">
                  <div className="col-lg-8">
                    <p className="fs-5 lh-lg" style={{ fontSize: 'clamp(16px, 4vw, 20px)', lineHeight: '1.8', color:"#00000" }}>
                      {modelSection.introText}
                    </p>
                  </div>
                </div>
              )}
              <div className="row g-4">
                {(modelSection.models || []).map((model, index) => (
                  <div key={model._id || index} className="col-lg-4 col-md-6">
                    <div className="h-100 p-4 bg-white rounded-3 shadow-sm border border-4" style={{ borderColor: '#06038F' }}>
                      <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>{model.title}</h5>
                      <p className=" mb-0" style={{ color:"#00000" }}>{model.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="mb-5">
          <div className="row align-items-start">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="pe-lg-4">
                <h2 className="display-6 fw-bold text-dark mb-4">{caseStudy.heading || "Case Study: NEIEA & Government Schools in Karnataka"}</h2>
                {caseStudy.description && (
                  <p className="fs-5 mb-4" style={{ color:"#00000" }}>
                    {caseStudy.description}
                  </p>
                )}
                <div className="row g-3">
                  {(caseStudy.results || []).map((result, index) => (
                    <div key={result._id || index} className="col-12">
                      <div className="d-flex align-items-center p-3 bg-opacity-10 rounded-3">
                        {result.icon && (
                          <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '40px', height: '40px', fontSize: '16px', backgroundColor: '#06038F' }}>
                            {result.icon}
                          </div>
                        )}
                        <p style={{ color:"#00000" }}>{result.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <img 
                  src={caseStudy.image || "/assets/images/PublicGovSchool/2.png"} 
                  alt="Karnataka Government Schools Partnership" 
                  className="img-fluid rounded shadow" 
                  style={{ 
                    maxHeight: "600px",
                    width: "100%",
                    objectFit: "cover"
                  }} 
                />
                {caseStudy.pdfUrl && (
                  <div className="mt-3 text-center">
                    <a
                      href={caseStudy.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{
                        backgroundColor: '#06038F',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontWeight: '500',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#05027A'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#06038F'}
                    >
                      Download Case Study PDF
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Pilot Project Section */}
        <section className="mb-3 py-4" style={{ backgroundColor: '#f8f9fa', paddingTop: 'clamp(1.5rem, 3vw, 3rem)', paddingBottom: 'clamp(1.5rem, 3vw, 3rem)' }}>
          <div className="row justify-content-center">
            <div className="col-lg-20">
              <div className="text-center mb-5">
                <h2 className="display-6 fw-bold text-dark mb-4">{pilotProject.heading || "Pilot Project: Maulana Azad Model Schools"}</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              {pilotProject.description && (
                <div className="row justify-content-center mb-4">
                  <div className="col-lg-8">
                    <p className=" fs-5 lh-lg" style={{ fontSize: 'clamp(16px, 4vw, 20px)', lineHeight: '1.8', color:"#00000" }}>
                      {pilotProject.description}
                    </p>
                  </div>
                </div>
              )}
              
              {(pilotProject.proposalHeading || pilotProject.proposalDescription || pilotProject.stats) && (
                <div className="row justify-content-center mb-5">
                  <div className="col-lg-8">
                    <div className="bg-white rounded-3 shadow p-4">
                      {pilotProject.proposalHeading && (
                        <h3 className="h3 fw-bold text-center mb-4" style={{ color: '#06038F' }}>{pilotProject.proposalHeading}</h3>
                      )}
                      {pilotProject.proposalDescription && (
                        <p className="text-start mb-4" style={{ color:"#00000" }}>
                          {pilotProject.proposalDescription}
                        </p>
                      )}
                      
                      {pilotProject.stats && (
                        <div className="row g-4 mb-4">
                          {pilotProject.stats.targetSchools && (
                            <div className="col-md-6">
                              <div className="text-center p-3 border rounded-3">
                                <h5 className="fw-bold mb-2" style={{ color: '#06038F' }}>Target Schools</h5>
                                <p className="mb-0">{pilotProject.stats.targetSchools}</p>
                              </div>
                            </div>
                          )}
                          {pilotProject.stats.studentsBenefiting && (
                            <div className="col-md-6">
                              <div className="text-center p-3 border rounded-3">
                                <h5 className="fw-bold mb-2" style={{ color: '#06038F' }}>Students Benefiting</h5>
                                <p className="mb-0">{pilotProject.stats.studentsBenefiting}</p>
                              </div>
                            </div>
                          )}
                          {pilotProject.stats.classSize && (
                            <div className="col-md-6">
                              <div className="text-center p-3 border rounded-3">
                                <h5 className="fw-bold mb-2" style={{ color: '#06038F' }}>Class Size</h5>
                                <p className="mb-0">{pilotProject.stats.classSize}</p>
                              </div>
                            </div>
                          )}
                          {pilotProject.stats.duration && (
                            <div className="col-md-6">
                              <div className="text-center p-3 border rounded-3">
                                <h5 className="fw-bold mb-2" style={{ color: '#06038F' }}>Duration</h5>
                                <p className="mb-0">{pilotProject.stats.duration}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {pilotProject.coordinatorInfo && (
                        <div className="text-start">
                          <p className=" mb-3" style={{ fontSize: 'clamp(16px, 4vw, 20px)', lineHeight: '1.8', color:"#00000" }}>
                            <strong>{pilotProject.coordinatorInfo}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {(pilotProject.goals || []).length > 0 && (
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <h4 className="h4 fw-bold text-center mb-4">The pilot will:</h4>
                    <div className="row g-3">
                      {pilotProject.goals.map((goal, index) => (
                        <div key={goal._id || index} className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                            <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '45px', height: '45px', fontSize: '14px', backgroundColor: '#06038F' }}>
                              {index + 1}
                            </div>
                            <span style={{ color:"#00000" }}>{goal.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="mb-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-4">
                <h2 className="display-6 fw-bold text-dark mb-4">{whyPartner.heading || "Why Policymakers Should Partner with NEIEA"}</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              <div className="row g-4">
                {(whyPartner.reasons || []).map((reason, index) => (
                  <div key={reason._id || index} className="col-lg-6">
                    <div className="h-100 p-4 bg-white rounded-3 shadow-sm border border-4" style={{ borderColor: '#06038F' }}>
                      <div className="d-flex align-items-center mb-3">
                        {reason.number && (
                          <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', backgroundColor: '#06038F' }}>
                            <span className="fw-bold">{reason.number}</span>
                          </div>
                        )}
                        <h5 className="fw-bold mb-0" style={{ color: '#06038F' }}>{reason.title}</h5>
                      </div>
                      <p className=" mb-0" style={{ color:"#00000" }}>{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-3 py-4" style={{ backgroundColor: '#f8f9fa', paddingTop: 'clamp(1.5rem, 3vw, 3rem)', paddingBottom: 'clamp(1.5rem, 3vw, 3rem)' }}>
          <div className="row justify-content-center">
            <div className="col-lg-20">
              <div className="text-center mb-4">
                <h2 className="display-6 fw-bold text-dark mb-4">{callToAction.heading || "A Call to Action"}</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              {callToAction.description && (
                <div className="row justify-content-center mb-4">
                  <div className="col-lg-8">
                    <p className=" fs-5 lh-lg" style={{ fontSize: '20px', lineHeight: '1.8', color:"#00000" }}>
                      {callToAction.description}
                    </p>
                  </div>
                </div>
              )}
              {(callToAction.actionItems || []).length > 0 && (
                <div className="row justify-content-center mb-5">
                  <div className="col-lg-8">
                    <div className="row g-3">
                      {callToAction.actionItems.map((item, index) => (
                        <div key={item._id || index} className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                            <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '45px', height: '45px', backgroundColor: '#06038F', fontSize: '14px' }}>
                              {index + 1}
                            </div>
                            <span style={{ color:"#00000" }}>{item.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {(callToAction.closingText || callToAction.quote) && (
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="bg-white rounded-3 shadow p-5 text-start">
                      {callToAction.closingText && (
                        <p className="fs-6 fs-md-5 mb-4 fw-medium" style={{ color:"#00000" }}>
                          <strong>{callToAction.closingText}</strong>
                        </p>
                      )}
                      {callToAction.quote && (
                        <p className="fs-5 fs-md-4 fs-lg-3 fw-bold mb-0 text-center" style={{ color: '#06038F' }}>
                          {callToAction.quote}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default PublicGovernmentSchoolDynamic;