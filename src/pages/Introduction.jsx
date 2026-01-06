import React from "react";

const Introduction = () => {
  return (
    <div className="introduction-page">
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
              <li className="breadcrumb-item">
                <span style={{ color: "#6c757d" }}>About</span>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                style={{ color: "#495057" }}
              >
                Mission
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Our Mission Section */}
      <section style={{ backgroundColor: "#f8f9fa", padding: "60px 0" }}>
        <div className="container ">
          <div className="text-center">
            <h6
              style={{
                color: "#fd7e14",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "30px",
              }}
            >
              OUR VISION
            </h6>
            <blockquote
              style={{
                fontSize: "28px",
                lineHeight: "1.4",
                color: "#495057",
                maxWidth: "800px",
                margin: "0 auto",
                fontWeight: "400",
              }}
            >
              "To envision a society where all youth and citizens are able to obtain good quality education and use this to transform society ensuring human welfare, sustainability, and progress."
            </blockquote>
          </div>
          
          <div className="text-center mt-5">
            <h6
              style={{
                color: "#fd7e14",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "30px",
              }}
            >
              OUR MISSION
            </h6>
            <blockquote
              style={{
                fontSize: "28px",
                lineHeight: "1.4",
                color: "#495057",
                maxWidth: "800px",
                margin: "0 auto",
                fontWeight: "400",
              }}
            >
              "To provide good quality and innovative education to all segments of society with high consideration given to providing free education to the poor."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Colorful Divider */}
      <div
        style={{
          height: "6px",
          background:
            "linear-gradient(to right, #dc3545, #28a745, #fd7e14, #6f42c1)",
        }}
      ></div>

      {/* Registration Section */}
      <section style={{ backgroundColor: "#fff", padding: "80px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 mb-4 mb-lg-0">
              <div className="text-center text-lg-start">
                <h2
                  style={{
                    fontSize: "48px",
                    fontWeight: "700",
                    color: "#212529",
                    marginBottom: "30px",
                    lineHeight: "1.2",
                  }}
                >
                  Registration
                </h2>
                <p
                  style={{
                    fontSize: "22px",
                    lineHeight: "1.6",
                    color: "#464646",
                    marginBottom: "0",
                  }}
                >
                  NEIEA was officially registered on April 18, 2022, as a Section 8a non-profit educational organization in India, after two years of active educational discussions and planning during the Pandemic. NEIEA has 12a and 80g approvals from the Government of India and also Darpan ID.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="text-center">
                <img
                  src="/assets/images/vision2 (1).jpg"
                  alt="NEIEA Registration"
                  className="img-fluid rounded shadow"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Introduction;