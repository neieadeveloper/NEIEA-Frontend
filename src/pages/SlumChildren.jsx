import React from 'react';
import PageTemplate from '../components/PageTemplate';

const SlumChildren = () => {
  const programFeatures = [
    {
      id: 1,
      title: "Mobile Learning Centers",
      level: "Community Outreach",
      description: "Bringing education directly to slum communities through mobile classrooms and learning centers that operate within the neighborhoods.",
      modules: ["Mobile Classrooms", "Community Centers", "Door-to-Door Programs", "Local Partnerships"],
      outcome: "Education access within walking distance of homes"
    },
    {
      id: 2,
      title: "Nutritional Support Programs",
      level: "Holistic Care",
      description: "Addressing hunger and malnutrition that often prevents slum children from attending school and focusing on learning.",
      modules: ["Daily Meals", "Nutritional Education", "Health Monitoring", "Family Support"],
      outcome: "Better health and improved learning capacity"
    },
    {
      id: 3,
      title: "Flexible Timing & Scheduling",
      level: "Adaptive Learning",
      description: "Accommodating the irregular schedules of children who may need to work or help their families during traditional school hours.",
      modules: ["Morning Sessions", "Evening Classes", "Weekend Programs", "Holiday Camps"],
      outcome: "Education that fits around family responsibilities"
    },
    {
      id: 4,
      title: "Life Skills & Vocational Training",
      level: "Practical Skills",
      description: "Teaching practical life skills and basic vocational training to help children and families improve their living conditions.",
      modules: ["Basic Life Skills", "Hygiene Education", "Financial Literacy", "Skill Development"],
      outcome: "Empowerment for better life opportunities"
    },
    {
      id: 5,
      title: "Family Engagement Programs",
      level: "Community Integration",
      description: "Working with parents and families to create a supportive environment for children's education and development.",
      modules: ["Parent Education", "Family Counseling", "Community Meetings", "Awareness Campaigns"],
      outcome: "Strong family support for children's education"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Education", link: null },
        { name: "Slum Children", link: null }
      ]}
      title="Education for Slum Children"
      subtitle="Breaking the Cycle of Poverty Through Education"
      description="NEIEA's specialized programs for slum children focus on making education accessible, relevant, and transformative for children living in urban slums and marginalized communities."
      heroImage="/assets/images/resized_classroom_image2.png"
    >
      {/* Introduction */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "0",
              fontWeight: "600"
            }}
          >
            Every child deserves the right to education, regardless of their living conditions. Our programs are specifically designed to reach and support children in slum communities, breaking barriers and creating pathways to a better future.
          </p>
        </div>
      </div>

      {/* Program Features */}
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
            Our Slum Children Education Programs
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {programFeatures.map((feature) => (
          <div key={feature.id} className="col-lg-6">
            <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
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
                    {feature.level}
                  </span>
                </div>
                <h4 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
                  {feature.title}
                </h4>
                <p style={{ color: "#6c757d", lineHeight: "1.6", marginBottom: "20px" }}>
                  {feature.description}
                </p>
                <div className="mb-3">
                  <h6 style={{ color: "#495057", fontWeight: "600", marginBottom: "10px" }}>
                    Key Components:
                  </h6>
                  <ul style={{ color: "#6c757d", paddingLeft: "20px", margin: "0" }}>
                    {feature.modules.map((module, index) => (
                      <li key={index} style={{ marginBottom: "5px", fontSize: "14px" }}>
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>
                <div 
                  style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "10px 15px", 
                    borderRadius: "8px",
                    fontSize: "13px",
                    color: "#06038F",
                    fontWeight: "600"
                  }}
                >
                  <strong>Outcome:</strong> {feature.outcome}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Challenges We Address */}
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
            Challenges We Address
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm text-center"
            style={{ borderRadius: "15px", padding: "30px" }}
          >
            <div style={{ fontSize: "50px", marginBottom: "20px" }}>🏚️</div>
            <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
              Lack of Infrastructure
            </h5>
            <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
              No proper schools or learning spaces in slum areas. We bring education directly to communities through mobile and community-based learning centers.
            </p>
          </div>
        </div>

        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm text-center"
            style={{ borderRadius: "15px", padding: "30px" }}
          >
            <div style={{ fontSize: "50px", marginBottom: "20px" }}>💰</div>
            <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
              Economic Barriers
            </h5>
            <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
              Families cannot afford school fees, uniforms, or books. Our programs are completely free with all materials provided at no cost.
            </p>
          </div>
        </div>

        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm text-center"
            style={{ borderRadius: "15px", padding: "30px" }}
          >
            <div style={{ fontSize: "50px", marginBottom: "20px" }}>⏰</div>
            <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
              Time Constraints
            </h5>
            <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
              Children often work to support families. We offer flexible timing and schedules that accommodate their responsibilities.
            </p>
          </div>
        </div>
      </div>

      {/* Partnership Impact */}
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
            Partnership Impact
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div 
            className="card h-100 border-0"
            style={{ backgroundColor: "#f8f9fa", borderRadius: "15px", padding: "25px" }}
          >
            <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
              🤝 Umeed, Aligarh Partnership
            </h5>
            <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
              Strategic collaboration with Umeed in Aligarh has enabled us to reach over <strong>150+ children</strong> living in slum areas, providing them with quality education and support services.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span style={{ backgroundColor: "#06038F", color: "white", padding: "3px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "500" }}>
                Mobile Learning
              </span>
              <span style={{ backgroundColor: "#06038F", color: "white", padding: "3px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "500" }}>
                Community Centers
              </span>
              <span style={{ backgroundColor: "#06038F", color: "white", padding: "3px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "500" }}>
                Family Support
              </span>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div 
            className="card h-100 border-0"
            style={{ backgroundColor: "#f8f9fa", borderRadius: "15px", padding: "25px" }}
          >
            <h5 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
              🏢 MV Foundation, Hyderabad
            </h5>
            <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
              Partnership with MV Foundation in Hyderabad has helped us reach over <strong>150+ children</strong> in urban slum communities, focusing on child rights and educational access.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span style={{ backgroundColor: "#06038F", color: "white", padding: "3px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "500" }}>
                Child Rights
              </span>
              <span style={{ backgroundColor: "#06038F", color: "white", padding: "3px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "500" }}>
                Education Access
              </span>
              <span style={{ backgroundColor: "#06038F", color: "white", padding: "3px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "500" }}>
                Community Outreach
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
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
            Success Outcomes
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div 
            className="d-flex align-items-start p-4"
            style={{ 
              backgroundColor: "#f8f9fa", 
              borderRadius: "15px",
              height: "100%"
            }}
          >
            <div style={{ fontSize: "30px", marginRight: "15px", color: "#28a745" }}>✅</div>
            <div>
              <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "8px" }}>
                Increased School Enrollment
              </h6>
              <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
                Over 300+ slum children have been successfully enrolled in formal education programs through our initiatives.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div 
            className="d-flex align-items-start p-4"
            style={{ 
              backgroundColor: "#f8f9fa", 
              borderRadius: "15px",
              height: "100%"
            }}
          >
            <div style={{ fontSize: "30px", marginRight: "15px", color: "#28a745" }}>✅</div>
            <div>
              <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "8px" }}>
                Improved Health & Nutrition
              </h6>
              <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
                Daily meal programs and health education have significantly improved children's physical well-being and learning capacity.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div 
            className="d-flex align-items-start p-4"
            style={{ 
              backgroundColor: "#f8f9fa", 
              borderRadius: "15px",
              height: "100%"
            }}
          >
            <div style={{ fontSize: "30px", marginRight: "15px", color: "#28a745" }}>✅</div>
            <div>
              <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "8px" }}>
                Family Empowerment
              </h6>
              <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
                Parent education programs have helped families understand the importance of education and support their children's learning.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div 
            className="d-flex align-items-start p-4"
            style={{ 
              backgroundColor: "#f8f9fa", 
              borderRadius: "15px",
              height: "100%"
            }}
          >
            <div style={{ fontSize: "30px", marginRight: "15px", color: "#28a745" }}>✅</div>
            <div>
              <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "8px" }}>
                Breaking Poverty Cycles
              </h6>
              <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
                Education and skill development programs are helping families improve their economic conditions and break poverty cycles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Our Approach Works */}
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
            Why Our Approach Works
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-3 col-md-6">
          <div className="text-center">
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>🎯</div>
            <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "10px" }}>
              Community-Based
            </h6>
            <p style={{ color: "#6c757d", fontSize: "13px", lineHeight: "1.6", margin: "0" }}>
              Programs designed and implemented within the community context
            </p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="text-center">
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>❤️</div>
            <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "10px" }}>
              Compassionate
            </h6>
            <p style={{ color: "#6c757d", fontSize: "13px", lineHeight: "1.6", margin: "0" }}>
              Understanding and addressing the unique challenges faced by slum children
            </p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="text-center">
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>🔄</div>
            <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "10px" }}>
              Flexible
            </h6>
            <p style={{ color: "#6c757d", fontSize: "13px", lineHeight: "1.6", margin: "0" }}>
              Adaptable programs that work around family and community needs
            </p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="text-center">
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>🌱</div>
            <h6 style={{ color: "#212529", fontWeight: "600", marginBottom: "10px" }}>
              Sustainable
            </h6>
            <p style={{ color: "#6c757d", fontSize: "13px", lineHeight: "1.6", margin: "0" }}>
              Long-term solutions that create lasting change in communities
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="row mb-5">
        <div className="col-12">
          <div 
            className="card border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "30px", backgroundColor: "#f8f9fa" }}
          >
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                color: "#495057",
                marginBottom: "0",
                textAlign: "center",
                fontStyle: "italic"
              }}
            >
              We believe that <strong>no child should be denied education</strong> because of their economic circumstances. Every child in every slum deserves the opportunity to learn, grow, and transform their future.
            </p>
          </div>
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
            <h4 style={{ color: "#212529", fontWeight: "600", marginBottom: "15px" }}>
              ✨ Support Education for Slum Children
            </h4>
            <p style={{ color: "#6c757d", marginBottom: "25px", maxWidth: "600px", margin: "0 auto 25px", lineHeight: "1.6" }}>
              Join us in breaking the cycle of poverty through education. Your support can transform the lives of children in slum communities and give them hope for a better future.
            </p>
            <div>
              <a 
                href="/about-us/contact" 
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
                📩 Get Involved
              </a>
              <a 
                href="/donate" 
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
                💝 Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SlumChildren;
