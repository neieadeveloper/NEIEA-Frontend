import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';
import {LoadingSpinner} from '../components/LoadingSpinner';

const ElementaryMiddleSchoolDynamic = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/elementary-middle-school-page');
        
        if (response.data.success && response.data.data) {
          setPageData(response.data.data);
        } else {
          setError('Page data not found');
        }
      } catch (err) {
        console.error('Error fetching elementary middle school page:', err);
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
          { name: "Elementary & Middle School", link: null }
        ]}
        title="NEIEA – Elementary & Middle School Initiatives"
        subtitle="By Syed Danish Ali"
        description="Building Strong Foundations"
        heroImage="/assets/images/ElementryEducation/image1.jpg"
      >
        <div className="text-center py-12">
          <p className="text-gray-600">Content will be available soon.</p>
        </div>
      </PageTemplate>
    );
  }

  // Extract data with fallbacks
  const heroSection = pageData.heroSection || {};
  const introduction = pageData.introduction || { heading: '', description: '' };
  const whyThisWorkMatters = pageData.whyThisWorkMattersSection || {};
  const challenges = pageData.structuralChallengesSection?.challenges || [];
  const responses = pageData.neieaResponseSection?.responses || [];
  const programs = pageData.programsSection?.programs || [];
  const reachImpact = pageData.reachImpactSection || {};
  const testimonials = pageData.testimonialsSection?.testimonials || [];
  const modeOfDelivery = pageData.modeOfDeliverySection || {};

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Education", link: null },
        { name: "Elementary & Middle School", link: null }
      ]}
      title={heroSection.title || "NEIEA – Elementary & Middle School Initiatives"}
      subtitle={heroSection.subtitle || "By Syed Danish Ali"}
      description={heroSection.description || "Building Strong Foundations"}
      heroImage={heroSection.heroImage || "/assets/images/ElementryEducation/image1.jpg"}
    >
      {/* Introduction */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <div className="text-center" style={{ padding: "40px 20px" }}>
            <h2 
              style={{ 
                fontSize: "32px", 
                fontWeight: "700", 
                marginBottom: "25px",
                color: "#212529"
              }}
            >
              {introduction.title || 'Building Strong Foundations'}
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#00000"
              }}
            >
              {introduction.description || 'NEIEA gives special emphasis to elementary and middle school education (Grades 1–8), recognising these formative years as the foundation to lifelong learning. By strengthening literacy and numeracy early, we close learning gaps before they widen and nurture creativity, critical thinking, and emotional well-being. Our programs weave value-based education into daily learning so students grow with empathy, curiosity, and social responsibility. Through inclusive classrooms and age-appropriate technology, NEIEA helps children, especially in underserved schools, develop the academic and personal skills needed for future success.'}
            </p>
          </div>
        </div>
      </div>

      {/* Why This Work Matters */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-5">
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
              {whyThisWorkMatters.label || 'THE CHALLENGE'}
            </h6>
            <h2 
              style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#00000", 
                marginBottom: "20px",
                lineHeight: "1.3"
              }}
            >
              {whyThisWorkMatters.heading || 'Why This Work Matters'}
            </h2>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div 
            className="card border-0"
            style={{ 
              borderRadius: "8px", 
              padding: "30px",
              backgroundColor: "white",
              border: "1px solid #e9ecef"
            }}
          >
            <h5 
              style={{ 
                color: "#00000", 
                fontWeight: "700", 
                marginBottom: "15px"
              }}
            >
              {whyThisWorkMatters.nationalAssessmentData?.heading || '📊 National Assessment Data'}
            </h5>
            <ul style={{ color: "#00000", paddingLeft: "20px", fontSize:"19px", margin: "0", lineHeight: "1.8" }}>
              {(whyThisWorkMatters.nationalAssessmentData?.items || []).map((item, index) => (
                <li key={index} style={{ marginBottom: index < (whyThisWorkMatters.nationalAssessmentData?.items?.length - 1) ? "8px" : "0", color:"#00000" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-6">
          <div 
            className="card border-0"
            style={{ 
              borderRadius: "8px", 
              padding: "30px",
              backgroundColor: "white",
              border: "1px solid #e9ecef"
            }}
          >
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "700", 
                marginBottom: "15px"
              }}
            >
              {whyThisWorkMatters.interventionStrategy?.heading || '🎯 Our Intervention Strategy'}
            </h5>
            <p 
              style={{ 
                color: "#00000", 
                fontSize: "16px", 
                lineHeight: "1.6",
                margin: "0"
              }}
            >
              {whyThisWorkMatters.interventionStrategy?.description || 'By intervening in these critical years, NEIEA helps children catch up before the transition to secondary school, preventing dropouts and long-term academic setbacks.'}
            </p>
          </div>
        </div>
      </div>

      {/* Structural Challenges */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-5">
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
              {pageData.structuralChallengesSection?.label || 'BARRIERS TO LEARNING'}
            </h6>
            <h2 
              style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#00000", 
                marginBottom: "20px",
                lineHeight: "1.3"
              }}
            >
              {pageData.structuralChallengesSection?.heading || 'The Structural Challenges Students Face'}
            </h2>
            {pageData.structuralChallengesSection?.description && (
              <p 
                style={{ 
                  fontSize: "18px", 
                  color: "#00000", 
                  maxWidth: "800px",
                  margin: "0 auto"
                }}
              >
                {pageData.structuralChallengesSection.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {challenges.map((challenge, index) => (
          <div key={challenge._id || index} className="col-lg-6">
            <div style={{ padding: "20px 0" }}>
              <div className="d-flex align-items-start">
                <div 
                  style={{ 
                    fontSize: "35px", 
                    marginRight: "20px"
                  }}
                >
                  {challenge.icon}
                </div>
                <div>
                  <h5 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "700", 
                      marginBottom: "15px",
                      fontSize: "18px"
                    }}
                  >
                    {challenge.title}
                  </h5>
                  <p 
                    style={{ 
                      color: "#00000", 
                      fontSize: "15px", 
                      lineHeight: "1.6", 
                      margin: "0"
                    }}
                  >
                    {challenge.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NEIEA's Response */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-5">
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
              {pageData.neieaResponseSection?.label || 'OUR SOLUTION'}
            </h6>
            <h2 
              style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#212529", 
                marginBottom: "20px",
                lineHeight: "1.3"
              }}
            >
              {pageData.neieaResponseSection?.heading || "NEIEA's Response"}
            </h2>
            {pageData.neieaResponseSection?.description && (
              <p 
                style={{ 
                  fontSize: "18px", 
                  color: "#00000", 
                  maxWidth: "600px",
                  margin: "0 auto"
                }}
              >
                {pageData.neieaResponseSection.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {responses.map((response, index) => (
          <div key={response._id || index} className="col-lg-4 col-md-6">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "50px", 
                  marginBottom: "20px"
                }}
              >
                {response.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "18px"
                }}
              >
                {response.title}
              </h5>
              <p 
                style={{ 
                  color: "#00000", 
                  fontSize: "14px", 
                  lineHeight: "1.6", 
                  margin: "0"
                }}
              >
                {response.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Programs & Interventions */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-5">
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
              {pageData.programsSection?.label || 'OUR PROGRAMS'}
            </h6>
            <h2 
              style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#00000", 
                marginBottom: "20px",
                lineHeight: "1.3"
              }}
            >
              {pageData.programsSection?.heading || 'Programs & Interventions'}
            </h2>
            {pageData.programsSection?.description && (
              <p 
                style={{ 
                  fontSize: "18px", 
                  color: "#00000", 
                  maxWidth: "700px",
                  margin: "0 auto"
                }}
              >
                {pageData.programsSection.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {programs.map((program, index) => (
          <div key={program._id || index} className="col-lg-4 col-md-6">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "45px", 
                  marginBottom: "20px"
                }}
              >
                {program.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "18px"
                }}
              >
                {program.title}
              </h5>
              <p 
                style={{ 
                  color: "#00000", 
                  fontSize: "14px", 
                  lineHeight: "1.6", 
                  margin: "0"
                }}
              >
                {program.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Reach & Impact */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-5">
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
              {reachImpact.label || 'OUR IMPACT'}
            </h6>
            <h2 
              style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#00000", 
                marginBottom: "20px",
                lineHeight: "1.3"
              }}
            >
              {reachImpact.heading || 'Reach & Impact in Elementary and Middle Schools'}
            </h2>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div 
            className="card border-0"
            style={{ 
              borderRadius: "8px",
              backgroundColor: "white",
              border: "1px solid #e9ecef"
            }}
          >
            <div 
              style={{ 
                padding: "20px",
                textAlign: "center"
              }}
            >
              {reachImpact.currentReach?.image && (
                <img 
                  src={reachImpact.currentReach.image} 
                  alt="NEIEA Impact"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "8px",
                    marginBottom: "20px"
                  }}
                  onError={(e) => {
                    if (e.target && e.target instanceof HTMLImageElement) {
                      e.target.src = "/assets/images/ElementryEducation/image2.png";
                    }
                  }}
                />
              )}
            </div>
            <div className="card-body p-4">
              <h4 
                style={{ 
                  color: "#00000", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "20px"
                }}
              >
                {reachImpact.currentReach?.title || 'Current Reach'}
              </h4>
              {reachImpact.currentReach?.stats && (
                <div className="mb-3">
                  <div 
                    style={{ 
                      backgroundColor: "#f8f9fa", 
                      color: "#00000", 
                      padding: "8px 16px", 
                      borderRadius: "6px", 
                      fontSize: "16px", 
                      fontWeight: "700",
                      display: "inline-block",
                      marginBottom: "10px",
                      border: "1px solid #e9ecef"
                    }}
                  >
                    {reachImpact.currentReach.stats}
                  </div>
                </div>
              )}
              {reachImpact.currentReach?.description && (
                <p 
                  style={{ 
                    color: "#00000", 
                    fontSize: "14px", 
                    lineHeight: "1.6",
                    margin: "0"
                  }}
                >
                  {reachImpact.currentReach.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div 
            className="card border-0"
            style={{ 
              borderRadius: "8px", 
              padding: "30px",
              backgroundColor: "white",
              border: "1px solid #e9ecef"
            }}
          >
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "700", 
                marginBottom: "15px"
              }}
            >
              {reachImpact.caseStudy?.icon || '🎯'} {reachImpact.caseStudy?.heading || 'Karnataka Case Study'}
            </h5>
            {reachImpact.caseStudy?.description && (
              <p 
                style={{ 
                  color: "#00000", 
                  fontSize: "15px", 
                  lineHeight: "1.6",
                  marginBottom: "15px"
                }}
              >
                {reachImpact.caseStudy.description}
              </p>
            )}
            {reachImpact.caseStudy?.solution && (
              <p 
                style={{ 
                  color: "#00000", 
                  fontSize: "14px", 
                  fontWeight: "600",
                  margin: "0"
                }}
              >
                <strong>Solution:</strong> {reachImpact.caseStudy.solution}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-5">
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
              {pageData.testimonialsSection?.label || 'SUCCESS STORIES'}
            </h6>
            <h2 
              style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#00000", 
                marginBottom: "20px",
                lineHeight: "1.3"
              }}
            >
              {pageData.testimonialsSection?.heading || 'Voices from the Classroom'}
            </h2>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial._id || index} className="col-lg-6">
            <div 
              className="card h-100 border-0"
              style={{ 
                borderRadius: "8px", 
                padding: "30px",
                backgroundColor: "white",
                border: "1px solid #e9ecef"
              }}
            >
              <div className="text-center mb-4">
                <div 
                  style={{ 
                    fontSize: "50px",
                    marginBottom: "20px"
                  }}
                >
                  {testimonial.avatar}
                </div>
              </div>
              <blockquote 
                className="text-center"
                style={{ 
                  fontSize: "20px", 
                  lineHeight: "1.6", 
                  color: "#00000",
                  marginBottom: "20px",
                  fontStyle: "italic"
                }}
              >
                "{testimonial.text}"
              </blockquote>
              <div className="text-center">
                <h6 
                  style={{ 
                    color: "#00000", 
                    fontWeight: "700", 
                    marginBottom: "5px"
                  }}
                >
                  {testimonial.author}
                </h6>
                <p 
                  style={{ 
                    color: "#00000", 
                    fontSize: "18px",
                    marginBottom: "0"
                  }}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mode of Delivery */}
      <div className="row">
        <div className="col-12">
          <div 
            className="card border-0"
            style={{ 
              borderRadius: "8px",
              backgroundColor: "white",
              border: "1px solid #e9ecef"
            }}
          >
            <div 
              style={{ 
                padding: "20px",
                textAlign: "center"
              }}
            >
              {modeOfDelivery.image && (
                <img 
                  src={modeOfDelivery.image} 
                  alt="NEIEA Hybrid Learning"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "8px",
                    marginBottom: "20px"
                  }}
                  onError={(e) => {
                    if (e.target && e.target instanceof HTMLImageElement) {
                      e.target.src = "/assets/images/ElementryEducation/image3.jpg";
                    }
                  }}
                />
              )}
            </div>
            <div 
              className="card-body"
              style={{ 
                padding: "30px 40px",
                backgroundColor: "white"
              }}
            >
              <h3 
                style={{ 
                  color: "#00000", 
                  fontWeight: "700", 
                  marginBottom: "20px",
                  fontSize: "24px",
                  textAlign: "center"
                }}
              >
                {modeOfDelivery.heading || 'Mode of Delivery'}
              </h3>
              <p 
                style={{ 
                  color: "#00000", 
                  fontSize: "16px", 
                  lineHeight: "1.7",
                  marginBottom: "20px",
                  textAlign: "center"
                }}
              >
                {modeOfDelivery.description || 'NEIEA uses a hybrid learning model where live, interactive classes are taught online by NEIEA educators. Students either log in individually from home or join together in IT-enabled classrooms equipped with a large LED screen, a laptop or computer, webcam, microphones and internet.'}
              </p>
              {modeOfDelivery.highlightedText && (
                <div 
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#212529",
                    padding: "20px 25px",
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: "500",
                    textAlign: "center",
                    maxWidth: "600px",
                    margin: "0 auto",
                    border: "1px solid #e9ecef"
                  }}
                >
                  {modeOfDelivery.highlightedText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ElementaryMiddleSchoolDynamic;