import React from 'react';
import PageTemplate from '../components/PageTemplate';

const GlobalPartners = () => {
  const globalPartners = [
    {
      id: 1,
      name: "UNESCO Education Sector",
      region: "Global",
      type: "International Organization",
      collaboration: "Sustainable Development Goals in Education",
      focus: ["Quality Education", "Inclusive Learning", "Educational Innovation", "Teacher Development"],
      impact: "Policy development and global education standards implementation",
      established: "2022",
      flag: "🇺🇳"
    },
    {
      id: 2,
      name: "British Council India",
      region: "United Kingdom",
      type: "Cultural Organization",
      collaboration: "English Language Teaching and Cultural Exchange",
      focus: ["Language Learning", "Cultural Programs", "Teacher Training", "International Partnerships"],
      impact: "Enhanced English language programs reaching 5,000+ students",
      established: "2022",
      flag: "🇬🇧"
    },
    {
      id: 3,
      name: "USAID Education Office",
      region: "United States",
      type: "Development Agency",
      collaboration: "Educational Technology and Innovation",
      focus: ["EdTech Integration", "Digital Literacy", "Teacher Capacity", "System Strengthening"],
      impact: "Technology integration in 100+ rural schools",
      established: "2023",
      flag: "🇺🇸"
    },
    {
      id: 4,
      name: "Singapore Ministry of Education",
      region: "Singapore",
      type: "Government Partnership",
      collaboration: "Teacher Training and Curriculum Development",
      focus: ["Pedagogical Innovation", "Assessment Methods", "Leadership Development", "Best Practices"],
      impact: "Professional development for 500+ teachers",
      established: "2023",
      flag: "🇸🇬"
    },
    {
      id: 5,
      name: "Australian High Commission",
      region: "Australia",
      type: "Diplomatic Mission",
      collaboration: "Higher Education and Research Partnerships",
      focus: ["Research Collaboration", "Student Exchange", "Academic Partnerships", "Innovation Labs"],
      impact: "Student scholarship and research opportunities",
      established: "2023",
      flag: "🇦🇺"
    },
    {
      id: 6,
      name: "German Academic Exchange (DAAD)",
      region: "Germany",
      type: "Academic Institution",
      collaboration: "Research Collaboration and Student Mobility",
      focus: ["Academic Exchange", "Research Projects", "Scholarship Programs", "Innovation Transfer"],
      impact: "Academic exchange programs and research funding",
      established: "2022",
      flag: "🇩🇪"
    }
  ];

  const collaborationTypes = [
    {
      type: "Educational Exchange",
      description: "Student and faculty exchange programs fostering international understanding and knowledge sharing.",
      benefits: ["Cultural immersion", "Academic diversity", "Global networking", "Language skills"],
      icon: "🔄"
    },
    {
      type: "Research Partnerships",
      description: "Joint research initiatives addressing global educational challenges and developing innovative solutions.",
      benefits: ["Shared expertise", "Resource pooling", "Publication opportunities", "Innovation development"],
      icon: "🔬"
    },
    {
      type: "Technology Collaboration",
      description: "Sharing and developing educational technologies for improved learning outcomes worldwide.",
      benefits: ["Tech transfer", "Digital innovation", "Platform development", "Best practice sharing"],
      icon: "💻"
    },
    {
      type: "Capacity Building",
      description: "Supporting educational development in emerging economies through knowledge transfer and training.",
      benefits: ["Skill development", "Infrastructure support", "Training programs", "Sustainable impact"],
      icon: "🏗️"
    }
  ];

  const globalImpact = [
    {
      region: "North America",
      countries: ["USA", "Canada"],
      programs: "Student Exchange & Research Collaboration",
      participants: "800+ students & researchers",
      icon: "🇺🇸"
    },
    {
      region: "Europe",
      countries: ["UK", "Germany", "France", "Netherlands"],
      programs: "Academic Partnerships & Cultural Exchange",
      participants: "1,200+ participants",
      icon: "🇪🇺"
    },
    {
      region: "Asia-Pacific",
      countries: ["Singapore", "Australia", "Japan", "South Korea"],
      programs: "Technology Transfer & Innovation Labs",
      participants: "2,000+ beneficiaries",
      icon: "🌏"
    },
    {
      region: "Middle East & Africa",
      countries: ["UAE", "Saudi Arabia", "South Africa", "Kenya"],
      programs: "Educational Development & Capacity Building",
      participants: "1,500+ educators & students",
      icon: "🌍"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Partners", link: null },
        { name: "Global Partners", link: null }
      ]}
      title="Global Partners"
      subtitle="International Collaboration for Educational Excellence"
      description="NEIEA's global partnerships span across continents, connecting with international organizations, governments, and institutions to advance education worldwide."
      heroImage="/assets/images/global-map.png"
    >
      {/* Global Partnership Overview */}
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
            Our global partnerships represent NEIEA's commitment to international collaboration in education. 
            Through strategic alliances with organizations worldwide, we share knowledge, resources, and 
            best practices to create a more connected and equitable global education ecosystem.
          </p>
        </div>
      </div>

      {/* Major Global Partners */}
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
            Major Global Partners
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {globalPartners.map((partner) => (
          <div key={partner.id} className="col-lg-6">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px", padding: "25px" }}
            >
              <div className="d-flex align-items-start mb-3">
                <div 
                  style={{ 
                    fontSize: "30px", 
                    marginRight: "15px",
                    flexShrink: 0
                  }}
                >
                  {partner.flag}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 
                      style={{ 
                        color: "#212529", 
                        fontWeight: "600", 
                        marginBottom: "0",
                        fontSize: "18px"
                      }}
                    >
                      {partner.name}
                    </h4>
                    <span style={{ color: "#6c757d", fontSize: "11px" }}>
                      Since {partner.established}
                    </span>
                  </div>
                  <div className="d-flex gap-2 mb-2">
                    <span 
                      style={{ 
                        backgroundColor: "#06038F", 
                        color: "white", 
                        padding: "2px 8px", 
                        borderRadius: "10px", 
                        fontSize: "10px", 
                        fontWeight: "600" 
                      }}
                    >
                      {partner.type}
                    </span>
                    <span 
                      style={{ 
                        backgroundColor: "#f8f9fa", 
                        color: "#495057", 
                        padding: "2px 8px", 
                        borderRadius: "10px", 
                        fontSize: "10px",
                        border: "1px solid #e9ecef"
                      }}
                    >
                      {partner.region}
                    </span>
                  </div>
                </div>
              </div>
              
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6", 
                  marginBottom: "15px" 
                }}
              >
                <strong>Collaboration:</strong> {partner.collaboration}
              </p>
              
              <div className="mb-3">
                <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "8px", fontSize: "14px" }}>
                  Focus Areas:
                </h6>
                <div className="d-flex flex-wrap gap-1">
                  {partner.focus.map((area, index) => (
                    <span 
                      key={index}
                      style={{ 
                        backgroundColor: "#f8f9fa", 
                        color: "#495057", 
                        padding: "2px 6px", 
                        borderRadius: "8px", 
                        fontSize: "11px",
                        border: "1px solid #e9ecef"
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              
              <div 
                style={{ 
                  backgroundColor: "#f8f9fa", 
                  padding: "12px", 
                  borderRadius: "8px"
                }}
              >
                <p style={{ color: "#495057", fontSize: "12px", margin: "0", fontStyle: "italic" }}>
                  <strong>Impact:</strong> {partner.impact}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collaboration Types */}
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
            Types of Global Collaboration
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {collaborationTypes.map((collab, index) => (
          <div key={index} className="col-lg-6">
            <div 
              className="card h-100 border-0"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "15px", padding: "25px" }}
            >
              <div className="d-flex align-items-start">
                <div 
                  style={{ 
                    fontSize: "40px", 
                    marginRight: "20px",
                    flexShrink: 0
                  }}
                >
                  {collab.icon}
                </div>
                <div>
                  <h5 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "600", 
                      marginBottom: "12px" 
                    }}
                  >
                    {collab.type}
                  </h5>
                  <p 
                    style={{ 
                      color: "#6c757d", 
                      lineHeight: "1.6", 
                      marginBottom: "15px",
                      fontSize: "14px"
                    }}
                  >
                    {collab.description}
                  </p>
                  <div>
                    <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "8px", fontSize: "14px" }}>
                      Key Benefits:
                    </h6>
                    <ul style={{ color: "#6c757d", paddingLeft: "20px", margin: "0" }}>
                      {collab.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} style={{ marginBottom: "4px", fontSize: "13px" }}>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Impact */}
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
            Regional Impact
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {globalImpact.map((region, index) => (
          <div key={index} className="col-lg-6">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px", padding: "25px" }}
            >
              <div className="d-flex align-items-start mb-3">
                <div 
                  style={{ 
                    fontSize: "40px", 
                    marginRight: "20px",
                    flexShrink: 0
                  }}
                >
                  {region.icon}
                </div>
                <div className="flex-grow-1">
                  <h4 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "600", 
                      marginBottom: "8px",
                      fontSize: "20px"
                    }}
                  >
                    {region.region}
                  </h4>
                  <p style={{ color: "#6c757d", fontSize: "13px", marginBottom: "15px" }}>
                    <strong>Countries:</strong> {region.countries.join(", ")}
                  </p>
                </div>
              </div>
              
              <div className="mb-3">
                <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "8px", fontSize: "14px" }}>
                  Programs:
                </h6>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    fontSize: "14px", 
                    lineHeight: "1.5", 
                    marginBottom: "12px" 
                  }}
                >
                  {region.programs}
                </p>
              </div>
              
              <div 
                style={{ 
                  backgroundColor: "#f8f9fa", 
                  padding: "15px", 
                  borderRadius: "10px"
                }}
              >
                <p style={{ color: "#06038F", fontSize: "14px", margin: "0", fontWeight: "600" }}>
                  📊 {region.participants}
                </p>
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
            Benefits of Global Partnerships
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {[
          {
            title: "Knowledge Exchange",
            description: "Access to international best practices, research findings, and innovative educational methodologies.",
            icon: "🧠"
          },
          {
            title: "Resource Sharing",
            description: "Shared access to educational resources, funding opportunities, and technological infrastructure.",
            icon: "🔗"
          },
          {
            title: "Global Recognition",
            description: "Enhanced credibility and recognition through association with prestigious international organizations.",
            icon: "🏆"
          },
          {
            title: "Capacity Building",
            description: "Professional development opportunities and skill enhancement for educators and administrators.",
            icon: "📈"
          },
          {
            title: "Cultural Understanding",
            description: "Promoting cross-cultural awareness and global citizenship among students and educators.",
            icon: "🌍"
          },
          {
            title: "Innovation Acceleration",
            description: "Faster adoption of educational innovations through international collaboration and support.",
            icon: "⚡"
          }
        ].map((benefit, index) => (
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
                {benefit.icon}
              </div>
              <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
                {benefit.title}
              </h5>
              <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* How to Engage */}
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
            How to Engage with Global Partners
          </h3>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          {[
            {
              step: "1",
              title: "Partnership Inquiry",
              description: "Submit an inquiry expressing interest in global collaboration and specify your institution's focus areas."
            },
            {
              step: "2",
              title: "Capability Assessment",
              description: "Evaluation of your institution's capabilities, resources, and potential contribution to global partnerships."
            },
            {
              step: "3",
              title: "Partner Matching",
              description: "We connect you with appropriate international partners based on shared interests and complementary strengths."
            },
            {
              step: "4",
              title: "Collaboration Framework",
              description: "Develop a structured collaboration framework with clear objectives, timelines, and success metrics."
            },
            {
              step: "5",
              title: "Implementation & Support",
              description: "Launch collaborative activities with ongoing support, regular reviews, and continuous improvement."
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
              Join Our Global Education Network
            </h4>
            <p 
              style={{ 
                color: "#6c757d", 
                marginBottom: "25px",
                maxWidth: "600px",
                margin: "0 auto 25px"
              }}
            >
              Connect with educational leaders worldwide and be part of the global movement to transform education. 
              Together, we can create lasting impact across borders and cultures.
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
                Become a Global Partner
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
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default GlobalPartners;
