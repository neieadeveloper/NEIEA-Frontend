import React from 'react';
import PageTemplate from '../components/PageTemplate';

const SkillsTraining = () => {
  const skillPrograms = [
    {
      id: 1,
      title: "Tailored Online Courses",
      subtitle: "Bilingual live classes for diverse groups",
      description: "Courses are available for teachers, NIOS students, homemakers, and community workers. Tools covered include Google Workspace, Microsoft Office, and Canva with bilingual (Hindi-English) instruction.",
      features: ["Google Workspace", "Microsoft Office", "Canva", "Bilingual Instruction", "Live Classes"],
      icon: "💻"
    },
    {
      id: 2,
      title: "Flexible Learning Modes",
      subtitle: "Learn from home, community centers, or blended classrooms",
      description: "Participants can attend live classes using smartphones, community center labs, or via blended models with a local coordinator and NEIEA mentors providing online sessions.",
      features: ["Smartphone Learning", "Community Centers", "Blended Models", "Local Coordinators", "Online Sessions"],
      icon: "📱"
    },
    {
      id: 3,
      title: "Transformative Impact",
      subtitle: "Empowering individuals and communities",
      description: "Women gain digital independence, teachers integrate tech into classrooms, learners use tools like Excel, Forms, Canva, and communities grow through knowledge sharing.",
      features: ["Digital Independence", "Classroom Integration", "Excel & Forms", "Community Growth", "Knowledge Sharing"],
      icon: "🌟"
    }
  ];


  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Skills Training", link: null }
      ]}
      title="Tailored Online Courses"
      subtitle="Tailored Online Courses"
      description="Bilingual live classes for diverse groups"
      heroImage="/assets/images/innovation.jpeg"
    >
      {/* Program Overview */}
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
            Courses are available for teachers, NIOS students, homemakers, and community workers. Tools covered include Google Workspace, Microsoft Office, and Canva with bilingual (Hindi-English) instruction.
          </p>
        </div>
      </div>

      {/* Course Features */}
      <div className="row g-4 mb-5">
        {skillPrograms.map((program) => (
          <div key={program.id} className="col-lg-4">
            <div 
              className="card h-100 border-0 shadow-sm text-center"
              style={{ borderRadius: "15px", padding: "30px" }}
            >
              <div 
                style={{ 
                  fontSize: "50px", 
                  marginBottom: "20px"
                }}
              >
                {program.icon}
              </div>
              
              <h4 
                style={{ 
                  color: "#212529", 
                  fontWeight: "600", 
                  marginBottom: "10px",
                  fontSize: "22px"
                }}
              >
                {program.title}
              </h4>
              
              <h6 
                style={{ 
                  color: "#06038F", 
                  fontWeight: "600", 
                  marginBottom: "15px",
                  fontSize: "16px"
                }}
              >
                {program.subtitle}
              </h6>
              
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6", 
                  marginBottom: "20px",
                  textAlign: "left"
                }}
              >
                {program.description}
              </p>
              
              <div className="mb-3">
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  {program.features.map((feature, index) => (
                    <span 
                      key={index}
                      style={{ 
                        backgroundColor: "#f8f9fa", 
                        color: "#495057", 
                        padding: "4px 10px", 
                        borderRadius: "12px", 
                        fontSize: "11px",
                        border: "1px solid #e9ecef",
                        fontWeight: "500"
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Videos */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 
            style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "20px",
              textAlign: "center"
            }}
          >
            Featured Videos
          </h3>
          <p 
            style={{ 
              fontSize: "16px", 
              color: "#6c757d", 
              textAlign: "center",
              marginBottom: "40px",
              maxWidth: "600px",
              margin: "0 auto 40px"
            }}
          >
            Highlighted moments that capture the essence of our mission and the transformation happening in communities worldwide.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div 
            className="card border-0 shadow-sm"
            style={{ borderRadius: "15px", overflow: "hidden" }}
          >
            <div 
              style={{ 
                position: "relative", 
                height: "250px", 
                backgroundImage: "url('/assets/images/resized_classroom_image.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div 
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  backgroundColor: "rgba(0, 0, 0, 0.4)"
                }}
              ></div>
              <button 
                style={{
                  position: "relative",
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: "#06038F",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                }}
              >
                ▶️
              </button>
              <div 
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "600"
                }}
              >
                04:12
              </div>
            </div>
            <div className="card-body p-4">
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "600", 
                  marginBottom: "10px" 
                }}
              >
                Transforming Rural Education
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6", 
                  marginBottom: "15px" 
                }}
              >
                How digital classrooms and trained volunteers are transforming education in rural schools.
              </p>
              <button 
                className="btn btn-outline-primary btn-sm"
                style={{
                  borderColor: "#06038F",
                  color: "#06038F",
                  borderRadius: "20px",
                  padding: "6px 16px",
                  fontSize: "13px",
                  fontWeight: "500"
                }}
              >
                Watch Video
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div 
            className="card border-0 shadow-sm"
            style={{ borderRadius: "15px", overflow: "hidden" }}
          >
            <div 
              style={{ 
                position: "relative", 
                height: "250px", 
                backgroundImage: "url('/assets/images/resized_classroom_image2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div 
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  backgroundColor: "rgba(0, 0, 0, 0.4)"
                }}
              ></div>
              <button 
                style={{
                  position: "relative",
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: "#06038F",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                }}
              >
                ▶️
              </button>
              <div 
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "600"
                }}
              >
                03:45
              </div>
            </div>
            <div className="card-body p-4">
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "600", 
                  marginBottom: "10px" 
                }}
              >
                Health Camp Highlights 2025
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6", 
                  marginBottom: "15px" 
                }}
              >
                Snapshots from our medical outreach camps bringing healthcare to remote villages.
              </p>
              <button 
                className="btn btn-outline-primary btn-sm"
                style={{
                  borderColor: "#06038F",
                  color: "#06038F",
                  borderRadius: "20px",
                  padding: "6px 16px",
                  fontSize: "13px",
                  fontWeight: "500"
                }}
              >
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SkillsTraining;
