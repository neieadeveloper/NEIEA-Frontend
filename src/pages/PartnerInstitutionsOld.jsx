import React from 'react';
import PageTemplate from '../components/PageTemplate';

const PartnerInstitutions = () => {
  const institutionCategories = [
    {
      id: 1,
      category: "Government Schools",
      count: "150+",
      description: "Public schools across India implementing NEIEA's innovative teaching methodologies and digital learning solutions.",
      examples: [
        {
          name: "Kendriya Vidyalaya Network",
          location: "Pan India",
          students: "1,200,000+",
          collaboration: "Digital infrastructure and teacher training programs"
        },
        {
          name: "Delhi Government Schools",
          location: "New Delhi",
          students: "50,000+",
          collaboration: "Blended learning model implementation"
        },
        {
          name: "Maharashtra State Board Schools",
          location: "Maharashtra",
          students: "75,000+",
          collaboration: "Curriculum enhancement and assessment tools"
        }
      ],
      icon: "🏛️"
    },
    {
      id: 2,
      category: "Private Schools",
      count: "85+",
      description: "Leading private educational institutions partnering with NEIEA for curriculum enhancement and innovative teaching practices.",
      examples: [
        {
          name: "Delhi Public School Network",
          location: "Multiple Cities",
          students: "200,000+",
          collaboration: "Advanced pedagogy and international curriculum"
        },
        {
          name: "Ryan International Group",
          location: "Pan India",
          students: "150,000+",
          collaboration: "Technology integration and teacher development"
        },
        {
          name: "DAV Schools Network",
          location: "North India",
          students: "100,000+",
          collaboration: "Value-based education and skill development"
        }
      ],
      icon: "🏫"
    },
    {
      id: 3,
      category: "Higher Education",
      count: "40+",
      description: "Universities and colleges collaborating on research, curriculum development, and student exchange programs.",
      examples: [
        {
          name: "Jamia Millia Islamia",
          location: "New Delhi",
          students: "15,000+",
          collaboration: "Research partnerships and higher education programs"
        },
        {
          name: "Ashoka University",
          location: "Haryana",
          students: "3,000+",
          collaboration: "Liberal arts education and innovation programs"
        },
        {
          name: "IIT Delhi",
          location: "New Delhi",
          students: "8,000+",
          collaboration: "EdTech research and development initiatives"
        }
      ],
      icon: "🎓"
    },
    {
      id: 4,
      category: "Vocational Institutes",
      count: "60+",
      description: "Technical and vocational training institutes offering skill-based education and professional development programs.",
      examples: [
        {
          name: "Industrial Training Institutes (ITI)",
          location: "Multiple States",
          students: "80,000+",
          collaboration: "Skills training and employment preparation"
        },
        {
          name: "Polytechnic Colleges",
          location: "Pan India",
          students: "120,000+",
          collaboration: "Technical education and industry partnerships"
        },
        {
          name: "Community Colleges",
          location: "Rural Areas",
          students: "25,000+",
          collaboration: "Local skill development and community education"
        }
      ],
      icon: "🔧"
    }
  ];

  const partnershipBenefits = [
    {
      title: "Curriculum Enhancement",
      description: "Access to NEIEA's innovative curriculum designs and educational methodologies.",
      features: ["Updated course content", "Interactive learning materials", "Assessment tools", "Progress tracking systems"]
    },
    {
      title: "Teacher Development",
      description: "Comprehensive professional development programs for faculty and teaching staff.",
      features: ["Training workshops", "Certification programs", "Mentorship support", "Continuous learning opportunities"]
    },
    {
      title: "Technology Integration",
      description: "Implementation of cutting-edge educational technology and digital learning platforms.",
      features: ["Learning management systems", "Digital content libraries", "Online assessment tools", "Virtual classrooms"]
    },
    {
      title: "Quality Assurance",
      description: "Standardized quality measures and continuous improvement frameworks.",
      features: ["Performance metrics", "Regular evaluations", "Best practice sharing", "Accreditation support"]
    }
  ];

  const collaborationAreas = [
    {
      area: "Academic Programs",
      description: "Joint development of academic curricula and educational programs",
      icon: "📚"
    },
    {
      area: "Research Initiatives",
      description: "Collaborative research projects on educational innovation and effectiveness",
      icon: "🔬"
    },
    {
      area: "Faculty Exchange",
      description: "Teacher and faculty exchange programs for knowledge sharing",
      icon: "👥"
    },
    {
      area: "Student Mobility",
      description: "Student exchange and transfer programs between partner institutions",
      icon: "🎒"
    },
    {
      area: "Resource Sharing",
      description: "Shared access to educational resources, libraries, and facilities",
      icon: "📖"
    },
    {
      area: "Joint Events",
      description: "Collaborative conferences, workshops, and educational events",
      icon: "🎪"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Partners", link: null },
        { name: "Partnering Institutions", link: null }
      ]}
      title="Partnering Institutions"
      subtitle="Building Educational Excellence Together"
      description="NEIEA collaborates with educational institutions across India to enhance learning outcomes, improve teaching quality, and expand access to innovative education."
      // heroImage="/assets/images/waise12.png"
    >
      {/* Partnership Overview */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "0"
            }}
          >
            Our institutional partnerships form the backbone of educational transformation in India. 
            By working closely with schools, colleges, and universities, we create sustainable impact 
            that reaches millions of students and thousands of educators across the country.
          </p>
        </div>
      </div>

      {/* Institution Categories */}
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
            Our Partner Institution Categories
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {institutionCategories.map((category) => (
          <div key={category.id} className="col-lg-6">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px", padding: "25px" }}
            >
              <div className="d-flex align-items-center mb-3">
                <div 
                  style={{ 
                    fontSize: "40px", 
                    marginRight: "20px",
                    flexShrink: 0
                  }}
                >
                  {category.icon}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 
                      style={{ 
                        color: "#212529", 
                        fontWeight: "600", 
                        marginBottom: "0",
                        fontSize: "22px"
                      }}
                    >
                      {category.category}
                    </h4>
                    <span 
                      style={{ 
                        backgroundColor: "#06038F", 
                        color: "white", 
                        padding: "4px 12px", 
                        borderRadius: "15px", 
                        fontSize: "12px", 
                        fontWeight: "600" 
                      }}
                    >
                      {category.count}
                    </span>
                  </div>
                </div>
              </div>
              
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6", 
                  marginBottom: "20px" 
                }}
              >
                {category.description}
              </p>
              
              <div>
                <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "15px" }}>
                  Notable Partners:
                </h6>
                {category.examples.map((example, index) => (
                  <div key={index} className="mb-3 p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "0", fontSize: "14px" }}>
                        {example.name}
                      </h6>
                      <span style={{ color: "#6c757d", fontSize: "12px" }}>
                        {example.students} students
                      </span>
                    </div>
                    <p style={{ color: "#6c757d", fontSize: "12px", marginBottom: "5px" }}>
                      📍 {example.location}
                    </p>
                    <p style={{ color: "#495057", fontSize: "12px", margin: "0", fontStyle: "italic" }}>
                      {example.collaboration}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Partnership Benefits */}
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
            Partnership Benefits
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {partnershipBenefits.map((benefit, index) => (
          <div key={index} className="col-lg-6">
            <div 
              className="card h-100 border-0"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "15px", padding: "25px" }}
            >
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "600", 
                  marginBottom: "15px" 
                }}
              >
                {benefit.title}
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  lineHeight: "1.6", 
                  marginBottom: "15px",
                  fontSize: "14px"
                }}
              >
                {benefit.description}
              </p>
              <div>
                <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "10px", fontSize: "14px" }}>
                  Includes:
                </h6>
                <ul style={{ color: "#6c757d", paddingLeft: "20px", margin: "0" }}>
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{ marginBottom: "4px", fontSize: "13px" }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collaboration Areas */}
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
            Areas of Collaboration
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {collaborationAreas.map((area, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <div 
              className="card h-100 border-0 text-center"
              style={{ 
                backgroundColor: "#f8f9fa", 
                borderRadius: "15px", 
                padding: "25px 20px" 
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "15px" }}>
                {area.icon}
              </div>
              <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
                {area.area}
              </h5>
              <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
                {area.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Partnership Process */}
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
            How to Become a Partner Institution
          </h3>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          {[
            {
              step: "1",
              title: "Initial Contact & Interest",
              description: "Reach out to NEIEA through our contact form or email expressing your institution's interest in partnership."
            },
            {
              step: "2",
              title: "Institution Assessment",
              description: "We conduct a comprehensive assessment of your institution's needs, goals, and current educational practices."
            },
            {
              step: "3",
              title: "Partnership Proposal",
              description: "Our team develops a customized partnership proposal outlining collaboration areas and expected outcomes."
            },
            {
              step: "4",
              title: "Pilot Program Implementation",
              description: "Begin with a small-scale pilot program to test effectiveness and gather feedback from all stakeholders."
            },
            {
              step: "5",
              title: "Full Partnership Launch",
              description: "Scale successful programs across the institution with ongoing support, training, and continuous improvement."
            }
          ].map((step, index) => (
            <div key={index} className="d-flex mb-4">
              <div 
                style={{ 
                  backgroundColor: "#06038F", 
                  color: "white", 
                  borderRadius: "50%", 
                  width: "40px", 
                  height: "40px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontWeight: "600",
                  marginRight: "20px",
                  flexShrink: 0
                }}
              >
                {step.step}
              </div>
              <div>
                <h5 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "600", 
                    marginBottom: "8px" 
                  }}
                >
                  {step.title}
                </h5>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    lineHeight: "1.6", 
                    margin: "0" 
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
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
            <h4 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "15px" 
              }}
            >
              Partner with NEIEA Today
            </h4>
            <p 
              style={{ 
                color: "#6c757d", 
                marginBottom: "25px",
                maxWidth: "600px",
                margin: "0 auto 25px"
              }}
            >
              Join our network of partner institutions and help us transform education for millions of students. 
              Together, we can create lasting impact and build a better future through quality education.
            </p>
            <div>
              <a 
                href="/partners/join" 
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
                Become a Partner
              </a>
              <a 
                href="/about-us/contact" 
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PartnerInstitutions;
