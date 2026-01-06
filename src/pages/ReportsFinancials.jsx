import React from 'react';
import PageTemplate from '../components/PageTemplate';

const ReportsFinancials = () => {
  const keyHighlights = [
    {
      id: 1,
      title: "Girls First",
      description: "Most of our learners are girls, breaking barriers to education.",
      icon: "👩‍🎓",
      color: "#E91E63"
    },
    {
      id: 2,
      title: "Women Leading",
      description: "The majority of our educators are women, inspiring the next generation.",
      icon: "👩‍🏫",
      color: "#9C27B0"
    },
    {
      id: 3,
      title: "Reaching the Margins",
      description: "We support children from slums and marginalized communities to access quality education.",
      icon: "🏘️",
      color: "#FF5722"
    },
    {
      id: 4,
      title: "Future-Ready",
      description: "Training in IT, digital literacy, and communication skills.",
      icon: "💻",
      color: "#2196F3"
    },
    {
      id: 5,
      title: "Nationwide Impact",
      description: "Reaching underserved communities across many states.",
      icon: "🌍",
      color: "#4CAF50"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Reports and Financials", link: null }
      ]}
      title="NEIEA: Transforming Education, Empowering Communities"
      subtitle="Since 2022, reshaping education through inclusive and quality learning opportunities"
      description="Our programs range from English and Math to digital skills, NIOS-based courses, and more - reaching children and youth across India."
      // heroImage="/assets/images/Stats_Background.jpg"
    >
      {/* Mission Statement */}
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
              Transforming Lives Through Education
            </h2>
            <p 
              style={{ 
                fontSize: "20px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#6c757d"
              }}
            >
              Since 2022, NEIEA has been reshaping education by offering inclusive and quality learning opportunities for children and youth across India. Our programs range from English and Math to digital skills, NIOS-based courses, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Key Highlights */}
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
              KEY HIGHLIGHTS
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
              Our Impact Areas
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              Discover how NEIEA is making a difference across communities
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {keyHighlights.map((highlight) => (
          <div key={highlight.id} className="col-lg-4 col-md-6">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "40px", 
                  marginBottom: "20px"
                }}
              >
                {highlight.icon}
              </div>
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
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "16px", 
                  lineHeight: "1.6", 
                  margin: "0"
                }}
              >
                {highlight.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Impact Report Section */}
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="text-center" style={{ padding: "40px 20px" }}>
            <h3 
              style={{ 
                fontSize: "28px", 
                fontWeight: "700", 
                marginBottom: "20px",
                color: "#212529"
              }}
            >
              📊 NEIEA Impact Report
            </h3>
            <p 
              style={{ 
                fontSize: "18px", 
                marginBottom: "30px",
                color: "#6c757d",
                maxWidth: "600px",
                margin: "0 auto 30px"
              }}
            >
              Get detailed insights into our programs, achievements, and the communities we serve. Download our comprehensive impact report to learn more about our educational initiatives.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <a
                href="/assets/pdf/NEIEA-Impact-report.pdf"
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
                📥 Read Complete Report
              </a>
              {/* <a
                href="/about-us/contact"
                className="btn btn-outline-primary btn-lg"
                style={{
                  borderColor: "#06038F",
                  color: "#06038F",
                  padding: "12px 30px",
                  fontWeight: "600",
                  fontSize: "16px",
                  textDecoration: "none"
                }}
              >
                📞 Contact Us
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ReportsFinancials;
