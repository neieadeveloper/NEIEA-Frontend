import React from "react";
import { Link } from "react-router-dom";

const BeAPartner = () => {
  return (
    <div className="be-a-partner-page">
      {/* Breadcrumb */}
      <div
        className="container-fluid"
        style={{ backgroundColor: "#f8f9fa", padding: "10px 0" }}
      >
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol
              className="breadcrumb mb-0"
              style={{ backgroundColor: "transparent" }}
            >
              <li className="breadcrumb-item">
                <a
                  href="/"
                  style={{ color: "#6c757d", textDecoration: "none" }}
                >
                  🏠 Home
                </a>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                style={{ color: "#495057" }}
              >
                Be a Partner
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content Section */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Hero Title */}
              <div className="text-center mb-5">
                <h1
                  style={{
                    color: "#06038F",
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    marginBottom: "30px",
                    lineHeight: "1.3"
                  }}
                >
                  "Turn Dreams Into Reality—Give the Gift of Education."
                </h1>
              </div>

              {/* Main Content */}
              <div style={{ lineHeight: "1.8", fontSize: "18px", color: "#4a5568" }}>
                <p style={{ marginBottom: "30px" }}>
                  Every child deserves the chance to dream, to learn, and to build a brighter future. 
                  Yet for millions of children living in slums and marginalized communities, education 
                  remains out of reach. At NEIEA, we are changing this reality—making quality education 
                  accessible, affordable, and life-changing.
                </p>

                <p style={{ marginBottom: "50px" }}>
                  By becoming a Supporter of NEIEA, you are not just giving; you are opening doors of 
                  opportunity and hope for children who need it the most.
                </p>

                {/* Why Your Support Matters Section */}
                <div style={{ marginBottom: "50px" }}>
                  <h2
                    style={{
                      color: "#06038F",
                      fontSize: "2rem",
                      fontWeight: "600",
                      marginBottom: "30px"
                    }}
                  >
                    Why Your Support Matters
                  </h2>
                  
                  <div style={{ paddingLeft: "20px" }}>
                    <div style={{ marginBottom: "20px" }}>
                      <strong style={{ color: "#2c3e50" }}>Give the Gift of Learning:</strong> 
                      <span style={{ marginLeft: "8px" }}>
                        Your contribution helps a child discover the joy of education.
                      </span>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <strong style={{ color: "#2c3e50" }}>Strengthen Families & Communities:</strong> 
                      <span style={{ marginLeft: "8px" }}>
                        Knowledge empowers families, creates dignity, and builds stronger communities.
                      </span>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <strong style={{ color: "#2c3e50" }}>Shape a Better Tomorrow:</strong> 
                      <span style={{ marginLeft: "8px" }}>
                        Sustained support ensures that the impact of today lasts for generations.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ways to Make a Difference Section */}
                <div style={{ marginBottom: "50px" }}>
                  <h2
                    style={{
                      color: "#06038F",
                      fontSize: "2rem",
                      fontWeight: "600",
                      marginBottom: "30px"
                    }}
                  >
                    Ways to Make a Difference
                  </h2>
                  
                  <div style={{ paddingLeft: "20px" }}>
                    <div style={{ marginBottom: "20px" }}>
                      <strong style={{ color: "#2c3e50" }}>Sponsor a Child:</strong> 
                      <span style={{ marginLeft: "8px" }}>
                        Provide learning materials, classes, and mentorship that can change a child's life.
                      </span>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <strong style={{ color: "#2c3e50" }}>Sponsor a Program:</strong> 
                      <span style={{ marginLeft: "8px" }}>
                        Support targeted educational initiatives that uplift entire communities.
                      </span>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <strong style={{ color: "#2c3e50" }}>General Support:</strong> 
                      <span style={{ marginLeft: "8px" }}>
                        Help us expand our reach and continue building a movement for inclusive education.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "40px",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginTop: "50px"
                  }}
                >
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#2c3e50",
                      marginBottom: "30px"
                    }}
                  >
                    Together, we can turn education into a right for every child—not a privilege for a few.
                  </p>

                  <div style={{ marginBottom: "20px" }}>
                    <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                      📩 Ready to transform a life today?
                    </p>
                    <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                      👉 <Link
                        to="/donate" 
                        style={{ 
                          color: "#fd7e14", 
                          textDecoration: "none",
                          fontWeight: "600"
                        }}
                      >
                        Click here to become a Supporter
                      </Link>
                    </p>
                    <p style={{ fontSize: "18px" }}>
                      📧 Contact us at{" "}
                      <a
                        href="mailto:info@neiea.org"
                        style={{
                          color: "#fd7e14",
                          textDecoration: "none",
                          fontWeight: "600"
                        }}
                      >
                        info@neiea.org
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BeAPartner;
