import React from 'react';
import PageTemplate from '../components/PageTemplate';
import { Link } from 'react-router-dom';

const Madrasa = () => {
  const keyObjectives = [
    {
      id: 1,
      title: "Empowering Students",
      description: "Enable Madrasa graduates to pursue diverse academic and professional paths.",
      icon: "🎓",
      color: "#4CAF50"
    },
    {
      id: 2,
      title: "Holistic Learning",
      description: "Augment religious education with modern subjects for a well-rounded perspective.",
      icon: "📚",
      color: "#2196F3"
    },
    {
      id: 3,
      title: "Mainstream Integration",
      description: "Prepare students for recognized board exams to access higher education and career opportunities.",
      icon: "🎯",
      color: "#FF9800"
    },
    {
      id: 4,
      title: "Community Transformation",
      description: "Foster socio-economic progress through educated, confident individuals.",
      icon: "🌍",
      color: "#9C27B0"
    }
  ];

  const salientFeatures = [
    {
      id: 1,
      title: "NIOS-Aligned Curriculum",
      description: "NEIEA introduces subjects such as math, science, English, and technology, tailored to meet NIOS standards for levels A, B, C, and board exams, ensuring compliance with national educational benchmarks.",
      icon: "📋",
      color: "#4CAF50"
    },
    {
      id: 2,
      title: "Complementary Learning",
      description: "While respecting the religious curriculum of Madaris, NEIEA provides parallel instruction in modern subjects, creating a balanced and enriched educational experience.",
      icon: "⚖️",
      color: "#2196F3"
    },
    {
      id: 3,
      title: "Collaborative Partnerships",
      description: "NEIEA works closely with Madaris to elevate educational standards, fostering trust and shared goals.",
      icon: "🤝",
      color: "#FF5722"
    },
    {
      id: 4,
      title: "Teacher Empowerment",
      description: "Through training in modern pedagogy and technology, NEIEA equips educators with tools to deliver engaging, effective instruction.",
      icon: "👨‍🏫",
      color: "#9C27B0"
    },
    {
      id: 5,
      title: "Board Exam Preparation",
      description: "The program prepares students for NIOS and state board exams, opening doors to mainstream academic and vocational opportunities.",
      icon: "📝",
      color: "#FF9800"
    },
    {
      id: 6,
      title: "Digital Literacy",
      description: "Students gain essential 21st-century skills, including familiarity with digital tools, to navigate a technology-driven world.",
      icon: "💻",
      color: "#607D8B"
    },
    {
      id: 7,
      title: "Inclusive Approach",
      description: "NEIEA prioritizes intellectual, moral, and personal growth, ensuring every student, regardless of background, can succeed.",
      icon: "🌟",
      color: "#E91E63"
    }
  ];

  const transformativeImpact = [
    {
      id: 1,
      title: "Academic Excellence",
      description: "Thousands of students in partnered Madaris now study modern subjects daily, engaging through interactive methods like Discourse-Oriented Pedagogy (DOP). This has boosted comprehension, confidence, and success in NIOS and state board exams, enabling many to pursue higher education.",
      icon: "🏆",
      color: "#4CAF50"
    },
    {
      id: 2,
      title: "Personal Growth",
      description: "Students develop critical thinking, communication, and resilience, equipping them for real-world challenges.",
      icon: "🌱",
      color: "#2196F3"
    },
    {
      id: 3,
      title: "Community Upliftment",
      description: "Improved academic outcomes have reshaped family and community dynamics. Parents, once hesitant about modern education, now champion their children's achievements, contributing to socio-economic progress.",
      icon: "🏘️",
      color: "#FF9800"
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Cultural Sensitivities",
      description: "Some communities may initially resist modern subjects due to concerns about diluting religious education.",
      solution: "NEIEA engages communities to highlight the benefits of holistic education",
      color: "#FF5722"
    },
    {
      id: 2,
      title: "Resource Needs",
      description: "Scaling the program requires significant investment in infrastructure, teacher training, and materials.",
      solution: "NEIEA seeks partnerships for funding and resource mobilization",
      color: "#9C27B0"
    },
    {
      id: 3,
      title: "Balancing Tradition and Modernity",
      description: "Maintaining the religious ethos of Madaris while integrating modern subjects is critical to sustaining trust.",
      solution: "NEIEA tailors curricula to respect local traditions while meeting national standards",
      color: "#FF9800"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Education", link: null },
        { name: "Madrasa", link: null }
      ]}
      title="Madarsa Education: NEIEA's Vision for a Holistic Future"
      subtitle="Bridging Worlds: Tradition with Innovation"
      description="For centuries, Madaris have been pillars of learning in India, nurturing scholars, spiritual leaders, and visionaries"
      heroImage="/assets/images/Madrasa/madarsa2.jpeg"
    >
      {/* Introduction */}
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
              Pillars of Learning, Centers of Knowledge
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#6c757d"
              }}
            >
              For centuries, Madaris have been pillars of learning in India, nurturing scholars, spiritual leaders, and visionaries. With an estimated 100,000 Madaris offering advanced religious education and an equal number of Maktib providing daily Quranic instruction, these institutions have long served as vital centers of knowledge for diverse communities. However, a focus on religious studies, often to the exclusion of modern subjects like English, science, math, and technology, has limited students' opportunities for higher education and integration into broader society.
            </p>
          </div>
        </div>
      </div>

      {/* NEIEA's Commitment */}
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
              OUR COMMITMENT
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
              NEIEA's Commitment to Madarsa Education
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              New Equitable and Innovative Educational Association (NEIEA) is addressing this challenge by pioneering a transformative approach to Madrasa education, blending tradition with modernity to empower students and enrich communities.
            </p>
          </div>
        </div>
      </div>

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
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px"
                }}
              >
                🌟 Our Approach
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  margin: "0"
                }}
              >
                NEIEA is dedicated to modernizing Madrasa education while preserving its cultural and spiritual essence. By introducing subjects like English, science, math, technology, and social studies, NEIEA equips students with the skills needed to thrive in a rapidly evolving world. This initiative aligns with India's National Education Policy (NEP) and leverages the National Institute of Open Schooling (NIOS) framework to ensure academic rigor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Objectives */}
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
              OUR GOALS
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
              Key Objectives
            </h2>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {keyObjectives.map((objective) => (
          <div key={objective.id} className="col-lg-6">
            <div style={{ padding: "20px 0" }}>
              <div className="d-flex align-items-start">
                <div 
                  style={{ 
                    fontSize: "40px", 
                    marginRight: "20px"
                  }}
                >
                  {objective.icon}
                </div>
                <div>
                  <h5 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "700", 
                      marginBottom: "15px",
                      fontSize: "18px"
                    }}
                  >
                    {objective.title}
                  </h5>
                  <p 
                    style={{ 
                      color: "#6c757d", 
                      fontSize: "15px", 
                      lineHeight: "1.6", 
                      margin: "0"
                    }}
                  >
                    {objective.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Salient Features */}
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
              PROGRAM FEATURES
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
              Salient Features of NEIEA's Program
            </h2>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {salientFeatures.map((feature) => (
          <div key={feature.id} className="col-lg-4 col-md-6">
            <div 
              className="card h-100 border-0"
              style={{ 
                borderRadius: "8px", 
                padding: "25px",
                backgroundColor: "white",
                border: "1px solid #e9ecef"
              }}
            >
              <div className="text-center">
                <div 
                  style={{ 
                    fontSize: "45px", 
                    marginBottom: "20px"
                  }}
                >
                  {feature.icon}
                </div>
                <h5 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "700", 
                    marginBottom: "15px",
                    fontSize: "18px"
                  }}
                >
                  {feature.title}
                </h5>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    fontSize: "14px", 
                    lineHeight: "1.6", 
                    margin: "0"
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Section 1 */}
      <div className="row mb-5">
        <div className="col-12">
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
                src="/assets/images/Madrasa/madarsa3.jpeg" 
                alt="NEIEA Madrasa Education Program"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "15px"
                }}
              />
            </div>
            <div className="card-body p-4">
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "10px",
                  textAlign: "center"
                }}
              >
                NEIEA Madrasa Education Program in Action
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center"
                }}
              >
                Students engaging in modern subjects while maintaining their traditional Islamic education foundation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transformative Impact */}
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
              REAL RESULTS
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
              Transformative Impact
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "700px",
                margin: "0 auto"
              }}
            >
              Since its launch, NEIEA's program has delivered measurable outcomes across academic, personal, and community levels
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {transformativeImpact.map((impact) => (
          <div key={impact.id} className="col-lg-4">
            <div 
              className="card h-100 border-0"
              style={{ 
                borderRadius: "8px", 
                padding: "30px",
                backgroundColor: "white",
                border: "1px solid #e9ecef"
              }}
            >
              <div className="text-center">
                <div 
                  style={{ 
                    fontSize: "50px", 
                    marginBottom: "20px"
                  }}
                >
                  {impact.icon}
                </div>
                <h5 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "700", 
                    marginBottom: "15px",
                    fontSize: "20px"
                  }}
                >
                  {impact.title}
                </h5>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    fontSize: "14px", 
                    lineHeight: "1.6", 
                    margin: "0"
                  }}
                >
                  {impact.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Section 2 */}
      <div className="row mb-5">
        <div className="col-12">
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
                src="/assets/images/Madrasa/madarsa5.jpeg" 
                alt="Madrasa Students Learning Modern Subjects"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "15px"
                }}
              />
            </div>
            <div 
              className="card-body"
              style={{ 
                padding: "30px 40px",
                backgroundColor: "white"
              }}
            >
              <h4 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "20px",
                  textAlign: "center"
                }}
              >
                Bridging Traditional and Modern Education
              </h4>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center"
                }}
              >
                Students in Madaris now have access to both traditional Islamic education and modern subjects, creating a holistic educational experience that prepares them for success in all aspects of life.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Addressing Challenges */}
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
              OVERCOMING OBSTACLES
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
              Addressing Challenges
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              While NEIEA's initiative is transformative, it faces challenges that we address proactively
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="col-lg-4">
            <div 
              className="card h-100 border-0"
              style={{ 
                borderRadius: "8px", 
                padding: "25px",
                backgroundColor: "white",
                border: "1px solid #e9ecef"
              }}
            >
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "18px"
                }}
              >
                ⚠️ {challenge.title}
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6",
                  marginBottom: "15px"
                }}
              >
                {challenge.description}
              </p>
              <div 
                style={{ 
                  backgroundColor: "#f8f9fa",
                  padding: "12px 15px", 
                  borderRadius: "6px",
                  border: "1px solid #e9ecef"
                }}
              >
                <p 
                  style={{ 
                    color: "#212529", 
                    fontSize: "13px", 
                    fontWeight: "600",
                    margin: "0"
                  }}
                >
                  <strong>Solution:</strong> {challenge.solution}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Call to Action */}
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
              Join the Movement for Inclusive Education
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
              NEIEA's pioneering work is a testament to what's possible when we unite around education. By modernizing Madaris, we're not just educating individuals—we're building a more cohesive, innovative, and prosperous India for all.
            </p>
            <p 
              style={{ 
                fontSize: "16px", 
                marginBottom: "30px",
                color: "#495057",
                fontWeight: "600"
              }}
            >
              This isn't about one community; it's about our shared future. Support NEIEA today and be part of the change that empowers generations.
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
                🤝 Support Our Mission
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

export default Madrasa;