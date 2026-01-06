import React from 'react';
import PageTemplate from '../components/PageTemplate';

const NeiUsaIntroduction = () => {
  const whoWeServe = [
    {
      id: 1,
      title: "Immigrant Youth",
      description: "Supporting immigrant youth in overcoming language barriers and integrating into American society."
    },
    {
      id: 2,
      title: "Native American Youth", 
      description: "Dedicated to uplifting through education, mentorship, and cultural preservation."
    },
    {
      id: 3,
      title: "Youth in or coming out of incarceration",
      description: "Empowering through tailored educational programs and personalized support."
    },
    {
      id: 4,
      title: "Youth from disadvantaged urban and rural communities",
      description: "Providing accessible education to underserved communities regardless of location."
    }
  ];

  const whatWeOffer = [
    {
      id: 1,
      title: "Blended Learning Models",
      description: "Combining online and offline teaching for flexible and effective learning."
    },
    {
      id: 2,
      title: "Counseling and Mentorship",
      description: "Providing holistic growth support through dedicated guidance and mentorship."
    },
    {
      id: 3,
      title: "Foundational Education and Skill-based Training",
      description: "Building strong educational foundations with practical skill development."
    },
    {
      id: 4,
      title: "Volunteer and Community Engagement Opportunities",
      description: "Creating meaningful connections and community involvement programs."
    }
  ];

  const ourMission = [
    "Provide accessible and low cost education to underserved learners",
    "Develop innovative and relevant learning programs", 
    "Promote equity, diversity, and inclusion in education",
    "Foster leadership, critical thinking, and empowerment among youth"
  ];

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
      {/* About NEIUSA */}
      <div className="row mb-3 mb-md-5">
        <div className="col-lg-12">
          <h2 style={{ color: "#06038F", fontWeight: "700", marginBottom: "30px", textAlign: "center" }}>
            About NEIUSA
          </h2>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <img 
                src="/assets/images/NEIStudentImage.png" 
                alt="NEIUSA Students" 
                className="img-fluid rounded shadow-sm"
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
            </div>
            <div className="col-lg-6">
              <p 
                style={{ 
                  fontSize: "16px", 
                  lineHeight: "1.8", 
                  color: "#495057",
                  marginBottom: "20px"
                }}
              >
                New Educational Initiative Corp is a non-profit organization committed to making quality education accessible to all. We believe every young mind deserves the opportunity to learn and grow, regardless of background, geography, or circumstance. Our mission is to bring inclusive and transformative learning to underserved communities — including underprivileged youth, immigrants, Native American youth, and those affected by socio-economic or systemic barriers.
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
                <span style={{ color: "white", fontSize: "36px" }}>👁️</span>
              </div>
              <h3 style={{ color: "#06038F", fontWeight: "700", marginBottom: "25px", fontSize: "32px" }}>
                Our Vision
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
              To create a future where education is a right, not a privilege — empowering students to reach their full potential and contribute meaningfully to society.
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
                <span style={{ color: "white", fontSize: "36px" }}>🎯</span>
              </div>
              <h3 style={{ color: "#06038F", fontWeight: "700", marginBottom: "30px", fontSize: "32px" }}>
                Our Mission
              </h3>
            </div>
            <div className="row">
              {ourMission.map((mission, index) => (
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
              ))}
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
                Who We Serve
              </h3>
              <p style={{ color: "#495057", fontSize: "18px", marginBottom: "40px" }}>
                NEIUSA focuses on marginalized and underserved groups, including:
              </p>
            </div>
            <div className="row">
              <div className="col-lg-6 mb-4">
                <img 
                  src="/assets/images/Picture2.png" 
                  alt="Diverse Students" 
                  className="img-fluid rounded shadow-sm"
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
              </div>
              <div className="col-lg-6">
                <div className="row">
                  {whoWeServe.map((group, index) => (
                    <div key={index} className="col-12 mb-4">
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
                  ))}
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
                What We Offer
              </h3>
            </div>
            <div className="row">
              <div className="col-lg-6 mb-4">
                <img 
                  src="/assets/images/Picture3.png" 
                  alt="Native American Youth" 
                  className="img-fluid rounded shadow-sm"
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
              </div>
              <div className="col-lg-6">
                <div className="row">
                  {whatWeOffer.map((offer, index) => (
                    <div key={index} className="col-12 mb-4">
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
                  ))}
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
                Join Us
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
                Whether as a learner, volunteer, donor, or partner — your support strengthens our mission of building equitable access to education for all.
              </p>
              <div>
                <a 
                  href="https://neiusa.org/" 
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
                  Get Involved
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default NeiUsaIntroduction;
