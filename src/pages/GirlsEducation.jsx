import React from 'react';
import PageTemplate from '../components/PageTemplate';
import { Link } from 'react-router-dom';

const GirlsEducation = () => {
  const initiatives = [
    {
      id: 1,
      title: "Education for Homeless & Destitute Girls",
      partner: "Mamidipudi Venkatarangaiya Foundation (MVF)",
      location: "Hyderabad",
      startDate: "February 1, 2024",
      description: "Partnership with MVF, a trust committed to ensuring all children aged 5-14 receive an education.",
      achievements: [
        "Completed two batches for 152 female students",
        "Teacher training for 115 male and 82 female educators",
        "Focus on English and Mathematics classes"
      ],
      icon: "🏠",
      color: "#E91E63"
    },
    {
      id: 2,
      title: "Girl Education in Slums: Umeed Centres",
      partner: "Dr. Mohsin Raza's Umeed Education & Welfare (UEW)",
      location: "Jamalpur, Aligarh",
      startDate: "April 15, 2024",
      description: "Partnership with four Umeed Centres providing educational opportunities to underprivileged children.",
      achievements: [
        "Umeed Centre No. 5 & 14: 134 students (38 male, 96 female)",
        "Umeed Centre No. 15: 27 students (11 male, 16 female)",
        "Umeed Centre No. 13: 55 students (26 male, 29 female)",
        "One batch completed, new batch underway"
      ],
      icon: "🏘️",
      color: "#FF5722"
    }
  ];

  const partners = {
    telangana: ["Ayesha Niswan Madarsa", "Banatul Abrar"],
    bihar: [
      "Jamia fatima lilbanat baswariya",
      "Jamiatus Salehat",
      "Jamia Rabbani Manorwa Sharif",
      "Jamia Kanzul Iman",
      "Jamia Mariya Niswan",
      "Madarsa Jamia Islamia Kariniya Rahimia lilbanat",
      "Madarsa Islamiya Dariyapur",
      "Jamia Umme Kulsoom Lilbanat Hardiya",
      "Jamia Umm Jamia Ummul Qura Lilbanat"
    ],
    uttarPradesh: [
      "Aaghaz Foundation & Hafsa lilbanat (girls)",
      "Jamia Islamia Siddiqa Lilbanat"
    ],
    haryana: ["MDD Bal Bhawan"],
    gujarat: ["Jamiya Kanzul Iman"]
  };

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Education", link: null },
        { name: "Girl's Education", link: null }
      ]}
      title="Empowering Generations: NEIEA's Commitment to Girls' Education"
      subtitle="Educate a girl, empower a generation"
      description="At NEIEA, we firmly believe that educating girls is the bedrock of building a just, inclusive, and progressive society"
      heroImage="/assets/images/GirlsEducation/image1.png"
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
              Our Vision and Approach
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#6c757d"
              }}
            >
              At the New Equitable and Innovative Educational Association (NEIEA), we firmly believe that educating girls is the bedrock of building a just, inclusive, and progressive society. In communities where socio-economic barriers and cultural norms limit access to quality schooling, NEIEA serves as a catalyst for change.
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy */}
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
              <h4 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "20px",
                  fontSize: "24px"
                }}
              >
                💫 Our Philosophy
              </h4>
              <p 
                style={{ 
                  fontSize: "18px", 
                  lineHeight: "1.8", 
                  color: "#6c757d",
                  marginBottom: "0",
                  fontStyle: "italic"
                }}
              >
                Our philosophy is simple yet profound: <strong style={{ color: "#212529" }}>educate a girl, empower a generation</strong>. We are dedicated to ensuring every girl, regardless of her background, has access to high-quality, relevant, and empowering education. Our blended learning model combines live online instruction with on-site facilitation, mentorship, and regular assessments, creating an engaging and inclusive environment.
              </p>
            </div>
          </div>
        </div>
      </div>

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
              On-the-Ground Initiatives
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              Targeted programs addressing specific community needs
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {initiatives.map((initiative) => (
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
                  color: "#212529",
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
                    <div style={{ color: "#6c757d", fontSize: "12px" }}>
                      Started: {initiative.startDate}
                    </div>
                  </div>
                </div>
                <h4 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "700", 
                    marginBottom: "10px"
                  }}
                >
                  {initiative.title}
                </h4>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    fontSize: "14px",
                    marginBottom: "5px"
                  }}
                >
                  <strong>Partner:</strong> {initiative.partner}
                </p>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    fontSize: "14px",
                    marginBottom: "0"
                  }}
                >
                  <strong>Location:</strong> {initiative.location}
                </p>
              </div>
              
              <div className="card-body p-4">
                <p style={{ color: "#6c757d", lineHeight: "1.6", marginBottom: "20px" }}>
                  {initiative.description}
                </p>
                <div className="mb-3">
                  <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "15px" }}>
                    Key Achievements:
                  </h6>
                  <ul style={{ color: "#6c757d", paddingLeft: "20px", margin: "0", lineHeight: "1.6" }}>
                    {initiative.achievements.map((achievement, index) => (
                      <li key={index} style={{ marginBottom: "8px", fontSize: "14px" }}>
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
                color: "#fd7e14",
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
                color: "#212529", 
                marginBottom: "20px",
                lineHeight: "1.3"
              }}
            >
              Nationwide Girls' Education Impact
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
                src="/assets/images/GirlsEducation/image2.jpg" 
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
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "20px",
                  textAlign: "center"
                }}
              >
                Total Impact
              </h4>
              <div className="text-center mb-3">
                <div 
                  style={{ 
                    backgroundColor: "#f8f9fa", 
                    color: "#212529", 
                    padding: "12px 20px", 
                    borderRadius: "6px", 
                    fontSize: "18px", 
                    fontWeight: "700",
                    display: "inline-block",
                    marginBottom: "15px",
                    border: "1px solid #e9ecef"
                  }}
                >
                  9,643 Girls & Women Educated
                </div>
              </div>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "15px", 
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center"
                }}
              >
                Since our inception, NEIEA has created meaningful impact through collaborations with numerous girl-focused organizations across several Indian states.
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
                color: "#212529", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              🌟 Our Partner Organizations
            </h5>
            
            <div className="mb-4">
              <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "10px", fontSize: "14px" }}>
                📍 Telangana:
              </h6>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {partners.telangana.map((partner, index) => (
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
            </div>

            <div className="mb-4">
              <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "10px", fontSize: "14px" }}>
                📍 Bihar:
              </h6>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {partners.bihar.map((partner, index) => (
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
              {/* <p style={{ color: "#6c757d", fontSize: "12px", fontStyle: "italic" }}>
                +5 more partner organizations
              </p> */}
            </div>
            
            <div className="mb-4">
              <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "10px", fontSize: "14px" }}>
                📍 Uttar Pradesh (U.P.):
              </h6>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {partners.uttarPradesh.map((partner, index) => (
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
            </div>

            <div className="mb-4">
              <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "10px", fontSize: "14px" }}>
                📍 Haryana:
              </h6>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {partners.haryana.map((partner, index) => (
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
            </div>

            <div className="mb-4">
              <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "10px", fontSize: "14px" }}>
                📍 Gujarat:
              </h6>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {partners.gujarat.map((partner, index) => (
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
            </div>

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
                color: "#fd7e14",
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
                color: "#212529", 
                marginBottom: "20px",
                lineHeight: "1.3"
              }}
            >
              Looking Forward
            </h2>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 text-center"
            style={{ 
              borderRadius: "8px", 
              padding: "30px",
              backgroundColor: "white",
              border: "1px solid #e9ecef"
            }}
          >
            <div 
              style={{ 
                fontSize: "50px", 
                marginBottom: "20px"
              }}
            >
              🏫
            </div>
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "700", 
                marginBottom: "15px",
                fontSize: "18px"
              }}
            >
              Expanding to More Schools
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                fontSize: "14px", 
                lineHeight: "1.6", 
                margin: "0"
              }}
            >
              Good quality education is a high need for millions of impoverished and neglected 
              girls.. expansion to meet this demand will be our continous effort.
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 text-center"
            style={{ 
              borderRadius: "8px", 
              padding: "30px",
              backgroundColor: "white",
              border: "1px solid #e9ecef"
            }}
          >
            <div 
              style={{ 
                fontSize: "50px", 
                marginBottom: "20px",
              }}
            >
              🕍
            </div>
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "700", 
                marginBottom: "15px",
                fontSize: "18px"
              }}
            >
              Pioneering pathway for the Marginalized
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                fontSize: "14px", 
                lineHeight: "1.6", 
                margin: "0"
              }}
            >
              NEIEA's focus area are the most destitute and the marginalized.. 
Out of School (drop out) children, Slum children, Madrasa children, Disadvantaged 
children.
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 text-center"
            style={{ 
              borderRadius: "8px", 
              padding: "30px",
              backgroundColor: "white",
              border: "1px solid #e9ecef"
            }}
          >
            <div 
              style={{ 
                fontSize: "50px", 
                marginBottom: "20px"
              }}
            >
              🏘️
            </div>
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "700", 
                marginBottom: "15px",
                fontSize: "18px"
              }}
            >
              Community Centers
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                fontSize: "14px", 
                lineHeight: "1.6", 
                margin: "0"
              }}
            >
              Community and Parental  engagement will be sought to empower  
              youth and adults and provide Literacy and Vocational training.
            </p>
          </div>
        </div>
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
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px"
                }}
              >
                🚀 Scalable & Sustainable Model
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
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
              color: "#212529",
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
              Join the Movement
            </h3>
            <p 
              style={{ 
                fontSize: "18px", 
                marginBottom: "25px",
                color: "#6c757d",
                maxWidth: "700px",
                margin: "0 auto 25px"
              }}
            >
              At NEIEA, we don't just educate girls—we shape futures. Together with our partners and supporters, we envision a world where every girl can dream freely, learn confidently, and lead boldly.
            </p>
            <p 
              style={{ 
                fontSize: "16px", 
                marginBottom: "30px",
                color: "#495057",
                fontWeight: "600"
              }}
            >
              Let's invest in girls' education today for a more equitable tomorrow.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link 
                to={'/donate'}
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
                💝 Support Girls' Education
              </Link>
              <Link 
                to={'/about-us/contact'}
                className="btn btn-outline-secondary btn-lg"
                style={{
                  borderRadius: "6px",
                  padding: "12px 30px",
                  fontWeight: "600",
                  fontSize: "16px",
                  borderColor: "#6c757d",
                  color: "#6c757d",
                  backgroundColor: "transparent"
                }}
              >
                📞 Get Involved
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default GirlsEducation;