import React from 'react';
import PageTemplate from '../components/PageTemplate';

const SoftSkillTraining = () => {
  const keyBenefits = [
    {
      id: 1,
      title: "Improve Spoken English Fluency",
      description: "Through practice-based sessions",
      icon: "🗣️",
      color: "#4CAF50"
    },
    {
      id: 2,
      title: "Gain Professional Writing Skills",
      description: "For reports, emails, and resumes",
      icon: "✍️",
      color: "#2196F3"
    },
    {
      id: 3,
      title: "Prepare for Interviews",
      description: "And strengthen workplace readiness",
      icon: "💼",
      color: "#FF9800"
    },
    {
      id: 4,
      title: "Master Presentation Skills",
      description: "And public speaking techniques",
      icon: "🎤",
      color: "#9C27B0"
    },
    {
      id: 5,
      title: "Build Teamwork Skills",
      description: "And collaboration skills for career success",
      icon: "🤝",
      color: "#F44336"
    }
  ];

  const programHighlights = [
    {
      id: 1,
      title: "Interactive Online Sessions",
      description: "With role-plays and activities",
      icon: "🎭",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Flexible Learning",
      description: "Anytime, anywhere",
      icon: "⏰",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "Low-cost & Inclusive",
      description: "Ensuring wider access",
      icon: "💰",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      title: "Practical Applications",
      description: "Real-world applications with lasting impact",
      icon: "🌍",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Skills Training", link: null },
        { name: "Soft Skill Training", link: null }
      ]}
      title="Soft Skill Training Program"
      subtitle="Empowering Through Communication Excellence"
      description="Affordable and flexible training designed for students, teachers, job seekers, and marginalized communities"
      heroImage="/assets/images/Skill_Training/softSkillTraining1.png"
    >
      {/* Program Overview */}
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
              Transform Your Communication Skills
            </h2>
            <p 
              style={{ 
                fontSize: "20px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#6c757d",
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              NEIEA offers an affordable and flexible Soft Skills Training Program designed for students, teachers, job seekers, and marginalized communities. The program enhances English communication, workplace readiness, and confidence for academic, professional, and personal growth.
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
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
              KEY BENEFITS
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
              What You'll Gain
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              Comprehensive skill development for personal and professional growth
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {keyBenefits.map((benefit) => (
          <div key={benefit.id} className="col-lg-4 col-md-6">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "50px",
                  marginBottom: "20px"
                }}
              >
                {benefit.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "20px"
                }}
              >
                {benefit.title}
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  marginBottom: "0"
                }}
              >
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Program Highlights Section */}
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
              PROGRAM HIGHLIGHTS
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
              Why Choose Our Program
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              Innovative learning approach designed for maximum impact
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {programHighlights.map((highlight) => (
          <div key={highlight.id} className="col-lg-6 col-md-6">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "60px",
                  marginBottom: "20px"
                }}
              >
                {highlight.icon}
              </div>
              <h4 
                style={{ 
                  color: "#212529",
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "24px"
                }}
              >
                {highlight.title}
              </h4>
              <p 
                style={{ 
                  color: "#6c757d",
                  fontSize: "18px", 
                  lineHeight: "1.6",
                  marginBottom: "0"
                }}
              >
                {highlight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default SoftSkillTraining;
