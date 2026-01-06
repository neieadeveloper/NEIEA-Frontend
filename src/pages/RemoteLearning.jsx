import React from 'react';
import PageTemplate from '../components/PageTemplate';

const RemoteLearning = () => {
  const coursesOffered = [
    {
      id: 1,
      title: "English Language Programs",
      description: "from beginner and foundational levels for first-time learners to advanced modules that refine fluency, confidence, and communication skills.",
      icon: "🗣️",
      link: "/courses/english"
    },
    {
      id: 2,
      title: "Mathematics & Science Foundations",
      description: "strengthening conceptual clarity, problem-solving, and critical thinking across different age groups.",
      icon: "🧮",
      link: "/courses/math"
    },
    {
      id: 3,
      title: "Technical & Digital Literacy",
      description: "practical training in Google Workspace, Microsoft Office Suite, and other essential tools for academic, professional, and entrepreneurial growth.",
      icon: "💻",
      link: "/courses/technical"
    }
  ];

  const pedagogicalApproach = [
    {
      id: 1,
      title: "Live Interactive Sessions",
      description: "led by expert mentors, fostering real-time dialogue, collaboration, and personalized support.",
      icon: "🎥"
    },
    {
      id: 2,
      title: "Digital Resources & Assignments",
      description: "available anytime for flexible, self-paced learning.",
      icon: "📚"
    },
    {
      id: 3,
      title: "Assessments & Feedback",
      description: "continuous evaluation ensures measurable progress and tailored guidance.",
      icon: "📋"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Our Working Model", link: null },
        { name: "Remote Individual Learning", link: null }
      ]}
      title="Online education model for individual learners"
      subtitle="Remote Individual Learning"
      description="NEIEA's Online Education Model is a learner-centric framework that empowers individuals to access courses independently using their own digital devices—smartphone, laptop, or tablet."
      heroImage="/assets/images/remoteIndividualLearning.png"
    >
      {/* Introduction Section */}
      <div className="row mb-4">
        <div className="col-lg-11 mx-auto">
          <div 
            style={{ 
              backgroundColor: "#ffffff", 
              padding: "25px", 
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              border: "1px solid #e9ecef"
            }}
          >
            <h2 
              style={{ 
                fontSize: "28px", 
                fontWeight: "700", 
                color: "#212529", 
                marginBottom: "15px",
                textAlign: "center",
                lineHeight: "1.3"
              }}
            >
              Online Education Model for Individual Learners
            </h2>
            <div 
              style={{
                width: "60px",
                height: "3px",
                backgroundColor: "#06038F",
                margin: "0 auto 20px",
                borderRadius: "2px"
              }}
            ></div>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.6", 
                color: "#2c3e50",
                marginBottom: "15px",
                textAlign: "left",
                fontWeight: "400"
              }}
            >
              <strong style={{ color: "#06038F" }}>NEIEA's Online Education Model is a learner-centric framework</strong> that empowers individuals to access courses independently using their own digital devices—smartphone, laptop, or tablet. Designed to transcend geographical boundaries, it enables students to learn anytime, anywhere, with direct access to expert instruction and high-quality resources.
            </p>
          <p 
            style={{ 
              fontSize: "18px", 
                lineHeight: "1.6", 
                color: "#2c3e50",
                marginBottom: "0",
                textAlign: "left",
                fontWeight: "400"
              }}
            >
              By integrating linguistic, academic, and technical education, this model creates a <strong style={{ color: "#06038F" }}>holistic, inclusive, and transformative learning ecosystem</strong>. It equips learners not only with academic excellence but also with the critical skills needed to thrive in today's knowledge-driven global economy.
            </p>
          </div>
        </div>
      </div>

      {/* Pedagogical Approach Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "30px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "25px",
              textAlign: "center"
            }}
          >
            Pedagogical Approach:
          </h2>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {pedagogicalApproach.map((approach) => (
          <div key={approach.id} className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ 
                borderRadius: "12px", 
                padding: "20px",
                backgroundColor: "#ffffff",
                border: "1px solid #e9ecef",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              textAlign: "center"
              }}
            >
              <div 
                style={{ 
                  fontSize: "50px", 
                  marginBottom: "15px"
                }}
              >
                {approach.icon}
              </div>
                <h5 
                  style={{ 
                    color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "20px",
                  lineHeight: "1.3"
                }}
              >
                {approach.title}
                </h5>
                <p 
                  style={{ 
                  color: "#2c3e50", 
                    lineHeight: "1.6", 
                  margin: "0",
                  fontSize: "16px",
                  fontWeight: "400",
                  textAlign: "left"
                  }}
                >
                {approach.description}
                </p>
            </div>
          </div>
        ))}
      </div>

      {/* Courses Offered Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "30px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "25px",
              textAlign: "center"
            }}
          >
            Courses Offered:
          </h2>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {coursesOffered.map((course) => (
          <div key={course.id} className="col-lg-4">
            <a 
              href={course.link}
              className="card h-100 border-0 shadow-sm"
              style={{ 
                borderRadius: "12px", 
                padding: "20px",
                backgroundColor: "#ffffff",
                border: "1px solid #e9ecef",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                textAlign: "center",
                display: "block",
                color: "inherit",
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
            >
              <div 
                style={{ 
                  fontSize: "50px", 
                  marginBottom: "15px"
                }}
              >
                {course.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "20px",
                  lineHeight: "1.3"
                }}
              >
                {course.title}
              </h5>
              <p 
                style={{ 
                  color: "#2c3e50", 
                  lineHeight: "1.6", 
                  margin: "0",
                  fontSize: "16px",
                  fontWeight: "400",
                  textAlign: "left"
                }}
              >
                {course.description}
              </p>
            </a>
          </div>
        ))}
      </div>

      {/* Conclusion Section */}
      <div className="row mb-4">
        <div className="col-lg-11 mx-auto">
          <div 
            style={{ 
              backgroundColor: "#06038F", 
              color: "white",
              padding: "25px", 
              borderRadius: "12px",
              textAlign: "center"
            }}
          >
            <h3 
              style={{ 
                fontSize: "24px", 
                fontWeight: "700", 
                marginBottom: "15px",
                color: "white"
              }}
            >
              Transformative Learning Ecosystem
            </h3>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.6", 
                marginBottom: "0",
                maxWidth: "800px",
                margin: "0 auto",
                opacity: "0.95"
              }}
            >
              By integrating linguistic, academic, and technical education, this model creates a holistic, inclusive, and transformative learning ecosystem. It equips learners not only with academic excellence but also with the critical skills needed to thrive in today's knowledge-driven global economy.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row">
        <div className="col-12">
          <div 
            style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "25px", 
              borderRadius: "12px",
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
              Ready to Start Your Individual Learning Journey?
            </h4>
            <p 
              style={{ 
                color: "#6c757d", 
                marginBottom: "20px",
                fontSize: "16px",
                maxWidth: "600px",
                margin: "0 auto 20px"
              }}
            >
              Join NEIEA's learner-centric online education model and access courses independently using your own digital device. Learn anytime, anywhere with expert instruction.
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
            <a 
              href="/about-us/contact" 
              className="btn btn-primary"
              style={{
                backgroundColor: "#06038F",
                borderColor: "#06038F",
                  padding: "12px 25px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "25px",
                  textDecoration: "none"
                }}
              >
                Start Learning Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default RemoteLearning;
