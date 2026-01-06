import React from 'react';
import PageTemplate from '../components/PageTemplate';

const TechnicalSkillTraining = () => {
  const targetGroups = [
    {
      id: 1,
      title: "Teachers and Educators",
      description: "Transitioning to digital platforms",
      icon: "👩‍🏫",
      color: "#4CAF50"
    },
    {
      id: 2,
      title: "NIOS Students",
      description: "Preparing under non-mainstream boards",
      icon: "📚",
      color: "#2196F3"
    },
    {
      id: 3,
      title: "Women & Homemakers",
      description: "Seeking digital independence",
      icon: "👩‍💻",
      color: "#FF9800"
    },
    {
      id: 4,
      title: "Community Workers",
      description: "NGO staff enhancing digital skills",
      icon: "🤝",
      color: "#9C27B0"
    },
    {
      id: 5,
      title: "Youth & Volunteers",
      description: "Eager to develop essential skills",
      icon: "🌟",
      color: "#F44336"
    }
  ];

  const learningModes = [
    {
      id: 1,
      title: "Remote Learning using Smart Phone",
      description: "Learners with a smartphone and internet connection can attend live online classes from home.",
      icon: "📱",
      image: "/assets/images/Skill_Training/softSkillTraining1.png",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Community Center Computer Lab",
      description: "NEIEA Works with Community Centers as Partners and provides skills training to students enrolled in the Computer lab.",
      icon: "🏢",
      image: "/assets/images/Skill_Training/softSkillTraining2.png",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "Blended Learning Model",
      description: "Learners attend classes from partnering institutes with IT infrastructure. A local coordinator supports on-site while NEIEA mentors deliver live sessions.",
      icon: "🎓",
      image: "/assets/images/Skill_Training/softSkillTraining3.png",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  const impactAreas = [
    {
      id: 1,
      title: "Women's Digital Empowerment",
      description: "A large number of women gain confidence to use digital tools, manage online classrooms, support children's education, or explore income opportunities.",
      icon: "💪",
      color: "#E91E63"
    },
    {
      id: 2,
      title: "Digital Literacy",
      description: "Learners confidently use tools like MS Word for documentation, Excel for data handling, Google Forms for surveys, and Canva for basic design tasks.",
      icon: "💻",
      color: "#3F51B5"
    },
    {
      id: 3,
      title: "Teacher Training",
      description: "Educators bring digital tools into their teaching, making learning more engaging and efficient.",
      icon: "🎯",
      color: "#FF5722"
    },
    {
      id: 4,
      title: "Community Empowerment",
      description: "Families and communities benefit as trained individuals share their knowledge and digital access improves overall functioning.",
      icon: "🌍",
      color: "#4CAF50"
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "Yes it's good. I have learnt so many new things. This program helped me alot.",
      author: "Hazeera Khanam",
      role: "NEIEA Learner",
      avatar: "👩"
    },
    {
      id: 2,
      text: "Wonderful training center. very useful training. Get many things to learn. Thanks",
      author: "Mohan",
      role: "Program Participant",
      avatar: "👨"
    },
    {
      id: 3,
      text: "I would like to sincerely appreciate and admire the exceptional coaching provided by my mentor. Your guidance, patience, and unwavering support have made a lasting impact on my growth. You possess the rare ability to inspire, challenge, and bring out the best in your students. Your dedication and passion for teaching are truly admirable, and I feel fortunate to have learned under your mentorship. Thank you for being an outstanding coach and role model.",
      author: "Y.MD.HABEEBULLAH ROOMY",
      role: "Mentorship Program Graduate",
      avatar: "👨‍🎓"
    }
  ];

  const tools = [
    "Google Workspace", "Google Docs", "Google Sheets", "Google Slides", 
    "Google Forms", "Google Meet", "Google Classroom", "Microsoft Word", 
    "Microsoft Excel", "Microsoft PowerPoint", "Canva"
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Skills Training", link: null },
        { name: "Technical Skill Training", link: null }
      ]}
      title="Technical Skills Training"
      subtitle="Empowering communities with essential digital skills"
      description="Bridging the digital divide through comprehensive IT literacy programs"
      heroImage="/assets/images/Skill_Training/softSkillTraining1.png"
    >
      {/* Problem Statement */}
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
              The Digital Divide Challenge
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#6c757d"
              }}
            >
              In today's digital world, basic IT literacy is no longer optional—it's essential. Yet, many individuals, especially in underserved communities, lack access to structured digital training. Educators from schools and local learning centers often use traditional teaching methods and need support to integrate tools like Google Classroom, Meet, and Microsoft Office. Students under alternative education systems like NIOS also miss out on formal IT education, making it harder to adapt to digital assessments and academic requirements.
            </p>
          </div>
        </div>
      </div>

      {/* NEIEA Solution */}
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
              OUR SOLUTION
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
              NEIEA IT Skills Training Program
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "800px",
                margin: "0 auto 30px"
              }}
            >
              NEIEA (New Equitable and Innovative Educational Association) has designed multiple IT Skills Courses to bridge this digital divide. Our program offers live online classes with bilingual instruction (Hindi-English) for maximum inclusivity.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Covered */}
      <div className="row mb-5">
        <div className="col-12">
          <div 
            className="card border-0 shadow-sm"
            style={{ 
              borderRadius: "15px", 
              backgroundColor: "#f8f9fa",
              padding: "30px"
            }}
          >
            <h4 
              className="text-center mb-4"
              style={{ 
                color: "#212529", 
                fontWeight: "700"
              }}
            >
              Tools & Technologies Covered
            </h4>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {tools.map((tool, index) => (
                <span 
                  key={index}
                  className="badge"
                  style={{ 
                    backgroundColor: "#06038F", 
                    color: "white", 
                    padding: "8px 16px", 
                    borderRadius: "20px", 
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Target Groups */}
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
              WHO WE SERVE
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
              Our Target Communities
            </h2>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {targetGroups.map((group) => (
          <div key={group.id} className="col-lg-4 col-md-6">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "50px",
                  marginBottom: "20px"
                }}
              >
                {group.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "20px"
                }}
              >
                {group.title}
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  marginBottom: "0"
                }}
              >
                {group.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Modes */}
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
              FLEXIBLE LEARNING OPTIONS
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
              Learn Your Way
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              NEIEA offers flexible learning options so that anyone, anywhere can gain digital skills
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {learningModes.map((mode) => (
          <div key={mode.id} className="col-lg-4">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "80px",
                  marginBottom: "20px"
                }}
              >
                {mode.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "20px"
                }}
              >
                {mode.title}
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  marginBottom: "0"
                }}
              >
                {mode.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Impact Areas */}
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
              TRANSFORMATIVE IMPACT
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
              Areas of Change
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "700px",
                margin: "0 auto"
              }}
            >
              The IT Skills Training Project is reaching diverse regions and social groups across India, creating lasting positive change
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {impactAreas.map((area) => (
          <div key={area.id} className="col-lg-6">
            <div style={{ padding: "20px 0" }}>
              <div className="d-flex align-items-start">
                <div 
                  style={{ 
                    fontSize: "40px",
                    marginRight: "20px"
                  }}
                >
                  {area.icon}
                </div>
                <div>
                  <h5 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "700", 
                      marginBottom: "15px",
                      fontSize: "22px"
                    }}
                  >
                    {area.title}
                  </h5>
                  <p 
                    style={{ 
                      color: "#6c757d", 
                      fontSize: "16px", 
                      lineHeight: "1.6",
                      marginBottom: "0"
                    }}
                  >
                    {area.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
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
              SUCCESS STORIES
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
              What Our Learners Say
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              Real feedback from participants showing conceptual and practical understanding
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="col-lg-4">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{ 
                borderRadius: "15px", 
                padding: "30px",
                backgroundColor: "#f8f9fa",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
              }}
            >
              <div className="text-center mb-4">
                <div 
                  style={{ 
                    fontSize: "50px",
                    marginBottom: "20px"
                  }}
                >
                  {testimonial.avatar}
                </div>
              </div>
              <blockquote 
                className="text-center"
                style={{ 
                  fontSize: "16px", 
                  lineHeight: "1.6", 
                  color: "#495057",
                  marginBottom: "20px",
                  fontStyle: "italic"
                }}
              >
                "{testimonial.text}"
              </blockquote>
              <div className="text-center">
                <h6 
                  style={{ 
                    color: "#06038F", 
                    fontWeight: "700", 
                    marginBottom: "5px"
                  }}
                >
                  {testimonial.author}
                </h6>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    fontSize: "14px",
                    marginBottom: "0"
                  }}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default TechnicalSkillTraining;
