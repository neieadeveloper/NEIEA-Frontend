import React, { useEffect, useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import { Link } from 'react-router-dom';
import axiosInstance from '@/lib/axiosInstance';

const GirlsEducation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/girls-education-page');
        if (res.data?.success) setData(res.data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="container py-5"><div className="text-center text-muted">Loading...</div></div>;
  }
  if (!data) {
    return <div className="container py-5"><div className="text-center text-danger">No content available</div></div>;
  }

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Education", link: null },
        { name: "Girl's Education", link: null }
      ]}
      title={data.heroSection?.title}
      subtitle={data.heroSection?.subtitle}
      description={data.heroSection?.description}
      heroImage={data.heroSection?.heroImage || '/assets/images/GirlsEducation/image1.png'}
      videoLink={data.heroSection?.videoLink || null}
    >
      {/* Vision and Philosophy */}
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
              {data.visionAndPhilosophySection?.heading}
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#00000"
              }}
            >
              {data.visionAndPhilosophySection?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      {(data.visionAndPhilosophySection?.philosophyHeading || data.visionAndPhilosophySection?.philosophyDescription) && (
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div 
              className="card border-0"
              style={{ 
                borderRadius: "8px", 
                padding: "40px",
                backgroundColor: "white",
                border: "1px solid #e9ecef"
              }}
            >
              <div className="text-center">
                {data.visionAndPhilosophySection?.philosophyHeading && (
                  <h4 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "700", 
                      marginBottom: "20px",
                      fontSize: "24px"
                    }}
                  >
                    {data.visionAndPhilosophySection.philosophyHeading}
                  </h4>
                )}
                {data.visionAndPhilosophySection?.philosophyDescription && (
                  <p 
                    style={{ 
                      fontSize: "18px", 
                      lineHeight: "1.8", 
                      color: "#6c757d",
                      marginBottom: "0",
                      fontStyle: "italic"
                    }}
                  >
                    {data.visionAndPhilosophySection.philosophyDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* On-the-Ground Initiatives */}
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
              OUR INITIATIVES
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
              {data.initiativesSection?.heading}
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#00000", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              {data.initiativesSection?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {(data.initiativesSection?.initiatives || []).map((initiative, idx) => (
          <div key={initiative.id} className="col-lg-6">
            <div 
              className="card h-100 border-0"
              style={{ 
                borderRadius: "8px",
                backgroundColor: "white",
                border: "1px solid #e9ecef"
              }}
            >
              <div 
                style={{ 
                  backgroundColor: "#f8f9fa",
                  padding: "25px 30px",
                  color: "#00000",
                  borderBottom: "1px solid #e9ecef"
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div 
                    style={{ 
                      fontSize: "40px"
                    }}
                  >
                    {initiative.icon}
                  </div>
                  <div className="text-end">
                    <div style={{ color: "#00000", fontSize: "12px" }}>
                      Started: {initiative.startDate}
                    </div>
                  </div>
                </div>
                <h4 
                  style={{ 
                    color: "#00000", 
                    fontWeight: "700", 
                    marginBottom: "10px"
                  }}
                >
                  {initiative.title}
                </h4>
                <p 
                  style={{ 
                    color: "#00000", 
                    fontSize: "14px",
                    marginBottom: "5px"
                  }}
                >
                  <strong>Partner:</strong> {initiative.partner}
                </p>
                <p 
                  style={{ 
                    color: "#00000", 
                    fontSize: "14px",
                    marginBottom: "0"
                  }}
                >
                  <strong>Location:</strong> {initiative.location}
                </p>
              </div>
              
              <div className="card-body p-4">
                <p style={{ color: "#00000", lineHeight: "1.6", marginBottom: "20px" }}>
                  {initiative.description}
                </p>
                <div className="mb-3">
                  <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "15px" }}>
                    Key Achievements:
                  </h6>
                  <ul style={{ color: "#00000", paddingLeft: "20px", margin: "0", lineHeight: "1.6" }}>
                    {(initiative.achievements || []).map((achievement, index) => (
                      <li key={index} style={{ marginBottom: "8px", fontSize: "14px", color:"#00000" }}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Our Impact */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-5">
            <h6 
              style={{
                color: "#00000",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "15px"
              }}
            >
              OUR IMPACT
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
              {data.impactSection?.heading}
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
              <img 
                src={data.impactSection?.totalImpact?.image || '/assets/images/GirlsEducation/image2.jpg'} 
                alt="NEIEA Girls Education Impact"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "20px"
                }}
              />
            </div>
            <div className="card-body p-4">
              <h4 
                style={{ 
                  color: "#00000", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "20px",
                  textAlign: "center"
                }}
              >
                {data.impactSection?.totalImpact?.title}
              </h4>
              <div className="text-center mb-3">
                <div 
                  style={{ 
                    backgroundColor: "#f8f9fa", 
                    color: "#00000", 
                    padding: "12px 20px", 
                    borderRadius: "6px", 
                    fontSize: "18px", 
                    fontWeight: "700",
                    display: "inline-block",
                    marginBottom: "15px",
                    border: "1px solid #e9ecef"
                  }}
                >
                  {data.impactSection?.totalImpact?.stats}
                </div>
              </div>
              <p 
                style={{ 
                  color: "#00000", 
                  fontSize: "15px", 
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center"
                }}
              >
                {data.impactSection?.totalImpact?.description}
              </p>
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
                color: "#00000", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              🌟 Our Partner Organizations
            </h5>
            
            {(data.impactSection?.partnerOrganizationsByState || []).map((st, idx) => (
              <div className="mb-4" key={st._id || idx}>
                <h6 style={{ color: "#00000", fontWeight: "600", marginBottom: "10px", fontSize: "14px" }}>
                  📍 {st.state}:
                </h6>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {(st.partners || []).map((partner, pidx) => (
                    <span 
                      key={partner._id || pidx}
                      style={{ 
                        backgroundColor: "#f8f9fa", 
                        color: "#00000", 
                        padding: "4px 8px", 
                        borderRadius: "6px", 
                        fontSize: "11px",
                        fontWeight: "500",
                        border: "1px solid #e9ecef"
                      }}
                    >
                      {partner.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* legacy static partner sections removed in favor of dynamic mapping above */}

            {/* <div className="mb-4">
              <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "10px", fontSize: "14px" }}>
                📍 Other States:
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {[...partners.uttarPradesh, ...partners.haryana, ...partners.gujarat].map((partner, index) => (
                  <span 
                    key={index}
                    style={{ 
                      backgroundColor: "#f8f9fa", 
                      color: "#212529", 
                      padding: "4px 8px", 
                      borderRadius: "6px", 
                      fontSize: "11px",
                      fontWeight: "500",
                      border: "1px solid #e9ecef"
                    }}
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Looking Forward */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-5">
            <h6 
              style={{
                color: "#00000",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "15px"
              }}
            >
              FUTURE VISION
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
              {data.lookingForwardSection?.heading}
            </h2>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {(data.lookingForwardSection?.futureVisionCards || []).map((card, idx) => (
          <div className="col-lg-4" key={card._id || idx}>
            <div className="card h-100 border-0 text-center" style={{ borderRadius: "8px", padding: "30px", backgroundColor: "white", border: "1px solid #e9ecef" }}>
              <div style={{ fontSize: "50px", marginBottom: "20px" }}>{card.icon}</div>
              <h5 style={{ color: "#00000", fontWeight: "700", marginBottom: "15px", fontSize: "18px" }}>{card.title}</h5>
              <p style={{ color: "#00000", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scalable Model */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto">
          <div 
            className="card border-0"
            style={{ 
              borderRadius: "8px", 
              padding: "30px",
              backgroundColor: "white",
              border: "1px solid #e9ecef"
            }}
          >
            <div className="text-center">
              <h5 
                style={{ 
                  color: "#00000", 
                  fontWeight: "700", 
                  marginBottom: "15px"
                }}
              >
                🚀 Scalable & Sustainable Model
              </h5>
              <p 
                style={{ 
                  color: "#00000", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  margin: "0"
                }}
              >
                Our model is <strong>scalable, sustainable, and deeply rooted in community participation</strong>, ensuring long-term impact and growth in girls' education initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Join the Movement */}
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div 
            className="card border-0 text-center"
            style={{ 
              borderRadius: "8px", 
              backgroundColor: "white",
              color: "#00000",
              padding: "50px 40px",
              border: "1px solid #e9ecef"
            }}
          >
            <h3 
              style={{ 
                fontSize: "28px", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              {data.joinMovementSection?.heading}
            </h3>
            <p 
              style={{ 
                fontSize: "18px", 
                marginBottom: "25px",
                color: "#00000",
                maxWidth: "700px",
                margin: "0 auto 25px"
              }}
            >
              {data.joinMovementSection?.description}
            </p>
            <p 
              style={{ 
                fontSize: "16px", 
                marginBottom: "30px",
                color: "#00000",
                fontWeight: "600"
              }}
            >
              {/* Optional supporting text can be handled in CMS if needed */}
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link 
                to={data.joinMovementSection?.supportButtonLink || '/donate'}
                className="btn btn-lg"
                style={{
                  borderRadius: "6px",
                  padding: "12px 30px",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "#212529",
                  border: "1px solid #212529"
                }}
              >
                {data.joinMovementSection?.supportButtonText || "💝 Support Girls' Education"}
              </Link>
              <Link 
                to={data.joinMovementSection?.getInvolvedButtonLink || '/about-us/contact'}
                className="btn btn-outline-secondary btn-lg"
                style={{
                  borderRadius: "6px",
                  padding: "12px 30px",
                  fontWeight: "600",
                  fontSize: "16px",
                  borderColor: "#00000",
                  color: "#00000",
                  
              
                }}
              >
                {data.joinMovementSection?.getInvolvedButtonText || '📞 Get Involved'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default GirlsEducation;