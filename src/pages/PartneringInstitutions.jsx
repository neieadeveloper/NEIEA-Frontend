import React from 'react';
import PageTemplate from '../components/PageTemplate';
import { Link } from 'react-router-dom';

const PartneringInstitutions = () => {
  const partnershipPrinciples = [
    {
      id: 1,
      title: "Partnership Relationship",
      description: "Clear division of work between NEIEA and Partners. Partner institutions help enroll students, ensure safety, establish building infrastructure and IT-enabled classrooms.",
      icon: "🤝"
    },
    {
      id: 2,
      title: "NEIEA's Role",
      description: "Develop course content for multiple subjects using Discourse Oriented Pedagogy, create worksheets, and deliver LIVE classes on a regular basis.",
      icon: "📚"
    },
    {
      id: 3,
      title: "Nominal Service Charges",
      description: "NEIEA charges a very nominal amount for its services from the Partner, making quality education accessible and affordable.",
      icon: "💰"
    },
    {
      id: 4,
      title: "Parental Involvement",
      description: "Coordinates with Partnering institutions to reach out to Parents, show monthly progress reports, and build Parental involvement in the teaching process.",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      id: 5,
      title: "Teacher Support",
      description: "Utilizes a teacher provided by the Partner as class monitor/coordinator, entrusted with maintaining class decorum and following Mentor Teacher instructions.",
      icon: "👨‍🏫"
    },
    {
      id: 6,
      title: "Institutional Capacity Building",
      description: "NEIEA builds institutional capacity by Training Partner Teachers in Pedagogy, Technology, Classroom Management, and English Proficiency.",
      icon: "🎓"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Our Working Model", link: null },
        { name: "Partnering with Educational Institutions", link: null }
      ]}
      title="Partnering with Educational Institutions"
      subtitle="Collective Working Through Partnerships"
      description="NEIEA adheres to the notion that transformative progression is only possible through collective, not singular, effort."
      heroImage="/assets/images/partnering2.png"
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
              Overview
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
            >
              NEIEA adheres to the notion that <strong style={{ color: "#06038F" }}>transformative progression is only possible through a collective, and not a singular, effort</strong>. It implements the policy of collective working through multiple strategic approaches:
            </p>
          </div>

          <div className="row g-3" style={{ marginTop: "20px" }}>
            {/* Partnership Relationship */}
            <div className="col-12">
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
                    1
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
                      Partnership Relationship with Educational Institutions
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
                    >
                      NEIEA builds partnerships with educational institutions that seek to provide good quality education for their youth. There is a <strong style={{ color: "#06038F" }}>clear-cut division of work</strong> between NEIEA and its Partners. The Partnering institution helps enroll the students and takes care of their safety, establishing the building infrastructure and IT enabled classroom. NEIEA's role is to develop course content for multiple subjects, using Discourse Oriented Pedagogy, develop worksheets and deliver LIVE classes on a regular basis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nominal Service Charges */}
            <div className="col-12">
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
                    2
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
                      Affordable Service Model
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
                    >
                      NEIEA charges a <strong style={{ color: "#06038F" }}>very nominal amount</strong> for its services from the Partner, making quality education accessible and affordable for institutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parental Involvement */}
            <div className="col-12">
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
                    3
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
                      Parental Engagement and Progress Monitoring
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
                    >
                      NEIEA coordinates with the Partnering institution in reaching out to the Parents of its students, showing them <strong style={{ color: "#06038F" }}>monthly progress reports</strong> and building Parental involvement and support in the teaching process. It also takes the help of a teacher provided by the Partner. This teacher is the class monitor or class coordinator who is entrusted with the tasks of maintaining class decorum and following the instructions of the Mentor Teacher.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Institutional Capacity Building */}
            <div className="col-12">
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
                    4
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
                      Institutional Capacity Building
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
                    >
                      NEIEA builds institutional capacity of the Partnering institution by <strong style={{ color: "#06038F" }}>Training its Teachers</strong> in Pedagogy, Technology, Classroom Management and English Proficiency.
          </p>
        </div>
      </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {/* <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <img 
              src="/assets/images/partnering.png" 
              alt="NEIEA Partnership Model" 
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
      </div> */}

      {/* Partnership Principles */}
      {/* <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "40px",
              textAlign: "center"
            }}
          >
            How Our Partnership Model Works
          </h2>
        </div>
      </div> */}

      {/* Partnership Principles Grid */}
      {/* <div className="row g-4 mb-5">
        {partnershipPrinciples.map((principle) => (
          <div key={principle.id} className="col-lg-6">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px", padding: "25px" }}
            >
              <div className="d-flex align-items-start">
                <div 
                  style={{
                    backgroundColor: "#06038F",
                    color: "white",
                    borderRadius: "12px",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    marginRight: "20px",
                    flexShrink: 0
                  }}
                >
                  {principle.icon}
                </div>
                <div>
                  <h5 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "600", 
                    marginBottom: "15px" 
                  }}
                >
                    {principle.title}
                  </h5>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    lineHeight: "1.6", 
                      margin: "0",
                      textAlign: "justify"
                  }}
                >
                    {principle.description}
                </p>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Three Main Sections */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "30px", 
              fontWeight: "700", 
              color: "#212529", 
              marginTop: "25px",
              textAlign: "center"
            }}
          >
            Explore Our Partnership Network
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

      {/* Three Partnership Links */}
      <div className="row g-3 mb-4">
        {/* Join NEIEA as a Partner */}
        <div className="col-lg-4">
          <Link 
            to="/partners/join" 
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <div 
              className="card h-100 border-0 shadow-sm hover-card"
              style={{ 
                borderRadius: "12px", 
                padding: "20px",
                transition: "all 0.3s ease",
                cursor: "pointer"
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
              <div className="text-center">
                <div 
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
                  🤝
                </div>
                <h4 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "600", 
                    marginBottom: "15px" 
                  }}
                >
                  Join NEIEA as a Partner
                </h4>
                  <p 
                    style={{ 
                      color: "#6c757d", 
                    lineHeight: "1.6", 
                    margin: "0"
                  }}
                >
                  Become part of our educational transformation network and help us reach more students with quality education.
                </p>
                <div 
                  style={{ 
                    marginTop: "20px",
                    color: "#06038F",
                    fontWeight: "600"
                  }}
                >
                  Learn More →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Partnering Institutions */}
        <div className="col-lg-4">
          <Link 
            to="/partners/institutions" 
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <div 
              className="card h-100 border-0 shadow-sm hover-card"
              style={{ 
                borderRadius: "12px", 
                padding: "20px",
                transition: "all 0.3s ease",
                cursor: "pointer"
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
              <div className="text-center">
                <div 
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
                  🏫
                </div>
                <h4 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "600", 
                    marginBottom: "15px" 
                  }}
                >
                  Partnering Institutions
                </h4>
                  <p 
                    style={{ 
                      color: "#6c757d", 
                    lineHeight: "1.6", 
                    margin: "0"
                    }}
                  >
                  Discover the educational institutions that are already part of our partnership network and their success stories.
                  </p>
                <div 
                  style={{ 
                    marginTop: "20px",
                    color: "#06038F",
                    fontWeight: "600"
                  }}
                >
                  Explore →
              </div>
            </div>
          </div>
          </Link>
      </div>

        {/* Global Partners */}
        <div className="col-lg-4">
          <Link 
            to="/partners/global" 
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <div 
              className="card h-100 border-0 shadow-sm hover-card"
            style={{ 
                borderRadius: "12px", 
                padding: "20px",
                transition: "all 0.3s ease",
                cursor: "pointer"
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
              <div className="text-center">
              <div 
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
                  🌍
              </div>
                <h4 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "600", 
                    marginBottom: "15px" 
                  }}
                >
                  Global Partners
                </h4>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    lineHeight: "1.6", 
                    margin: "0" 
                  }}
                >
                  Meet our international partners who are helping us expand quality education across borders and cultures.
                </p>
                <div 
                  style={{ 
                    marginTop: "20px",
                    color: "#06038F",
                    fontWeight: "600"
                  }}
                >
                  View Partners →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Collective Impact Statement */}
      {/* <div className="row mb-5">
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
            <h3 
              style={{ 
                fontSize: "28px", 
                fontWeight: "700", 
                marginBottom: "20px",
                color: "white"
              }}
            >
              Transformative Progression Through Collective Effort
            </h3>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                maxWidth: "800px",
                margin: "0 auto",
                opacity: "0.95"
              }}
            >
              At NEIEA, we believe that meaningful change in education happens when institutions work together, sharing resources, expertise, and commitment to student success. Our partnership model ensures sustainable, scalable, and impactful educational transformation.
            </p>
          </div>
        </div>
      </div> */}

      {/* Call to Action */}
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
              Ready to Transform Education Together?
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
              Join our network of educational partners and be part of the collective effort to provide quality education to students across India and beyond.
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
              <Link 
                to="/partners/join"
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
                Become a Partner
              </Link>
              <Link 
                to="/about-us/contact"
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
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PartneringInstitutions;
