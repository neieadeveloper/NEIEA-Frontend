import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from '@/lib/axiosInstance';

const BeAPartner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const load = async ()=>{ try { const r = await axiosInstance.get('/be-a-partner-page'); if (r.data?.success) setData(r.data.data); } finally { setLoading(false); } };
    load();
  }, []);

  if (loading) return <div className="container py-5"><div className="text-center text-muted">Loading...</div></div>;
  if (!data) return <div className="container py-5"><div className="text-center text-danger">No content available</div></div>;

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
                  {data.heroSection?.title}
                </h1>
              </div>

              {/* Main Content */}
              <div style={{ lineHeight: "1.8", fontSize: "18px", color: "#4a5568" }}>
                <p style={{ marginBottom: "30px" }}>{data.introSection?.paragraph1}</p>

                <p style={{ marginBottom: "50px" }}>{data.introSection?.paragraph2}</p>

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
                    {data.whySupportSection?.heading}
                  </h2>
                  
                    <div style={{ paddingLeft: "20px" }}>
                      {(data.whySupportSection?.points||[]).map((p, i)=> (
                        <div key={p._id||i} style={{ marginBottom: "20px" }}>
                          <strong style={{ color: "#2c3e50" }}>{p.title}:</strong>
                          <span style={{ marginLeft: "8px" }}>{p.description}</span>
                        </div>
                      ))}
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
                    {data.waysToHelpSection?.heading}
                  </h2>
                  
                    <div style={{ paddingLeft: "20px" }}>
                      {(data.waysToHelpSection?.points||[]).map((p, i)=> (
                        <div key={p._id||i} style={{ marginBottom: "20px" }}>
                          <strong style={{ color: "#2c3e50" }}>{p.title}:</strong>
                          <span style={{ marginLeft: "8px" }}>{p.description}</span>
                        </div>
                      ))}
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
                    {data.ctaSection?.statement}
                  </p>

                  <div style={{ marginBottom: "20px" }}>
                    <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                      📩 Ready to transform a life today?
                    </p>
                    <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                      👉 <Link
                        to={data.ctaSection?.donateLink || '/donate'} 
                        style={{ 
                          color: "#fd7e14", 
                          textDecoration: "none",
                          fontWeight: "600"
                        }}
                      >
                        {data.ctaSection?.donateLinkText || 'Click here to become a Supporter'}
                      </Link>
                    </p>
                    <p style={{ fontSize: "18px" }}>
                      📧 Contact us at{" "}
                      <a
                        href={`mailto:${data.ctaSection?.contactEmail || 'info@neiea.org'}`}
                        style={{
                          color: "#fd7e14",
                          textDecoration: "none",
                          fontWeight: "600"
                        }}
                      >
                        {data.ctaSection?.contactEmail || 'info@neiea.org'}
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
