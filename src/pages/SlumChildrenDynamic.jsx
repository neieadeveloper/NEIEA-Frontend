import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';
import { LoadingSpinner } from '../components/LoadingSpinner';

const SlumChildrenDynamic = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/slum-children-page');
        
        if (response.data.success && response.data.data) {
          setPageData(response.data.data);
        } else {
          setError('Page data not found');
        }
      } catch (err) {
        console.error('Error fetching slum children page:', err);
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
          { name: "Slum Children", link: null }
        ]}
        title="Education for Slum Children"
        subtitle="Breaking the Cycle of Poverty Through Education"
        description="NEIEA's specialized programs for slum children focus on making education accessible, relevant, and transformative for children living in urban slums and marginalized communities."
        heroImage="/assets/images/resized_classroom_image2.png"
      >
        <div className="text-center py-12">
          <p className="text-gray-600">Content will be available soon.</p>
        </div>
      </PageTemplate>
    );
  }

  // Extract data with fallbacks
  const introduction = pageData.introduction || { title: '', subtitle: '', description: '', heroImage: '' };
  const programFeatures = pageData.programFeaturesSection?.features || [];
  const challenges = pageData.challengesSection?.challenges || [];
  const partnerships = pageData.partnershipSection?.partnerships || [];
  const outcomes = pageData.successOutcomesSection?.outcomes || [];
  const approachItems = pageData.approachSection?.items || [];
  const missionStatement = pageData.missionStatement || { text: '' };
  const callToAction = pageData.callToActionSection || { heading: '', description: '', contactLink: '', donateLink: '' };

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Education", link: null },
        { name: "Slum Children", link: null }
      ]}
      title={introduction.title || "Education for Slum Children"}
      subtitle={introduction.subtitle || "Breaking the Cycle of Poverty Through Education"}
      description={introduction.subtitle || "NEIEA's specialized programs for slum children focus on making education accessible, relevant, and transformative for children living in urban slums and marginalized communities."}
      heroImage={introduction.heroImage || "/assets/images/resized_classroom_image2.png"}
    >
      {/* Introduction */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#00000",
              marginBottom: "0",
              fontWeight: "600"
            }}
          >
            {introduction.description || 'Every child deserves the right to education, regardless of their living conditions. Our programs are specifically designed to reach and support children in slum communities, breaking barriers and creating pathways to a better future.'}
          </p>
        </div>
      </div>

      {/* Program Features */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 
            style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "40px",
              textAlign: "center"
            }}
          >
            {pageData.programFeaturesSection?.heading || 'Our Slum Children Education Programs'}
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
  {programFeatures.map((feature, index) => (
    <div key={feature._id || index} className="col-lg-6">
      <div
        className="card h-100 border-0 shadow-sm"
        style={{
          borderRadius: "18px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          overflow: "hidden"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <span
              style={{
                background: "linear-gradient(135deg, #06038F, #4a00e0)",
                color: "white",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                boxShadow: "0 4px 6px rgba(6, 3, 143, 0.2)"
              }}
            >
              {feature.level}
            </span>
          </div>
          <h4
            style={{
              color: "#212529",
              fontWeight: "700",
              marginBottom: "15px",
              fontSize: "1.5rem"
            }}
          >
            {feature.title}
          </h4>
          <p
            style={{
              color: "#000000",
              lineHeight: "1.7",
              marginBottom: "20px",
              fontSize: "1rem"
            }}
          >
            {feature.description}
          </p>
          <div className="mb-3">
            <h6
              style={{
                color: "#343a40",
                fontWeight: "600",
                marginBottom: "12px",
                fontSize: "1.1rem"
              }}
            >
              Key Components:
            </h6>
            <ul
              style={{
                color: "#000000",
                paddingLeft: "20px",
                margin: "0"
              }}
            >
              {feature.modules.map((module, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}
                >
                  {module}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              backgroundColor: "#f1f3f5",
              padding: "12px 16px",
              borderRadius: "10px",
              fontSize: "13px",
              color: "#06038F",
              fontWeight: "600",
              borderLeft: "4px solid #06038F"
            }}
          >
            <strong>Outcome:</strong> {feature.outcome}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Challenges We Address */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 
            style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "40px",
              textAlign: "center"
            }}
          >
            {pageData.challengesSection?.heading || 'Challenges We Address'}
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {challenges.map((challenge, index) => (
          <div key={challenge._id || index} className="col-lg-4">
            <div 
              className="card h-100 border-0 shadow-sm text-center"
              style={{ borderRadius: "15px", padding: "30px" }}
            >
              <div style={{ fontSize: "50px", marginBottom: "20px" }}>{challenge.icon}</div>
              <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
                {challenge.title}
              </h5>
              <p style={{ color: "#00000", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
                {challenge.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Partnership Impact */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 
            style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#00000", 
              marginBottom: "40px",
              textAlign: "center"
            }}
          >
            {pageData.partnershipSection?.heading || 'Partnership Impact'}
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {partnerships.map((partnership, index) => (
          <div key={partnership._id || index} className="col-lg-6">
            <div 
              className="card h-100 border-0"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "15px", padding: "25px" }}
            >
              <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
                {partnership.icon || ''} {partnership.title}
              </h5>
              <p style={{ color: "#00000", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
                {partnership.description}
              </p>
              {partnership.tags && partnership.tags.length > 0 && (
                <div className="d-flex flex-wrap gap-2">
                  {partnership.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      style={{ backgroundColor: "#06038F", color: "white", padding: "3px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "500" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 
            style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#00000", 
              marginBottom: "40px",
              textAlign: "center"
            }}
          >
            {pageData.successOutcomesSection?.heading || 'Success Outcomes'}
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {outcomes.map((outcome, index) => (
          <div key={outcome._id || index} className="col-lg-6">
            <div 
              className="d-flex align-items-start p-4"
              style={{ 
                backgroundColor: "#f8f9fa", 
                borderRadius: "15px",
                height: "100%"
              }}
            >
              <div style={{ fontSize: "30px", marginRight: "15px", color: "#28a745" }}>{outcome.icon}</div>
              <div>
                <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "8px" }}>
                  {outcome.title}
                </h6>
                <p style={{ color: "#00000", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
                  {outcome.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Our Approach Works */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 
            style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "40px",
              textAlign: "center"
            }}
          >
            {pageData.approachSection?.heading || 'Why Our Approach Works'}
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {approachItems.map((item, index) => (
          <div key={item._id || index} className="col-lg-3 col-md-6">
            <div className="text-center">
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>{item.icon}</div>
              <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "10px" }}>
                {item.title}
              </h6>
              <p style={{ color: "#00000", fontSize: "13px", lineHeight: "1.6", margin: "0" }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mission Statement */}
      <div className="row mb-5">
        <div className="col-12">
          <div 
            className="card border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "30px", backgroundColor: "#f8f9fa" }}
          >
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
              {missionStatement.text || 'We believe that no child should be denied education because of their economic circumstances. Every child in every slum deserves the opportunity to learn, grow, and transform their future.'}
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row mt-5">
        <div className="col-12">
          <div 
            style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "40px", 
              borderRadius: "15px",
              textAlign: "center"
            }}
          >
            <h4 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
              {callToAction.heading || '✨ Support Education for Slum Children'}
            </h4>
            <p style={{ color: "#00000", marginBottom: "25px", maxWidth: "600px", margin: "0 auto 25px", lineHeight: "1.6" }}>
              {callToAction.description || 'Join us in breaking the cycle of poverty through education. Your support can transform the lives of children in slum communities and give them hope for a better future.'}
            </p>
            <div>
              <a 
                href={callToAction.contactLink || "/about-us/contact"}
                className="btn btn-primary me-3"
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
                📩 Get Involved
              </a>
              <a 
                href={callToAction.donateLink || "/donate"}
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
                💝 Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SlumChildrenDynamic;
