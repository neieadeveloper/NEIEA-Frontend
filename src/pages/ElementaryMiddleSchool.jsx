import React from 'react';
import PageTemplate from '../components/PageTemplate';

const ElementaryMiddleSchool = () => {
  const challenges = [
    {
      id: 1,
      title: "Family & Poverty",
      description: "Many parents are illiterate or semi-literate and unable to guide or encourage academic work. Daily-wage jobs and financial insecurity often pull children away from consistent study.",
      icon: "👨‍👩‍👧‍👦",
      color: "#E91E63"
    },
    {
      id: 2,
      title: "School Infrastructure & Teacher Quality",
      description: "Numerous government-run and low-budget private schools lack trained teachers, adequate classrooms, and learning materials. Guidance and counselling services are almost absent.",
      icon: "🏫",
      color: "#FF5722"
    },
    {
      id: 3,
      title: "Language & Systemic Barriers",
      description: "Madrasas and regional/Urdu-medium schools teach in a local language until Grade 6, then suddenly shift to English, leaving students struggling to keep up.",
      icon: "🗣️",
      color: "#9C27B0"
    },
    {
      id: 4,
      title: "Exam-Centric Learning",
      description: "Rote memorisation of likely exam questions dominates classroom practice, leaving students without a conceptual grasp of core subjects.",
      icon: "📝",
      color: "#FF9800"
    }
  ];

  const neiaeResponse = [
    {
      id: 1,
      title: "Discourse-Oriented Pedagogy (DOP)",
      description: "Interactive lessons that foster conceptual understanding instead of rote learning, provoking thought process through critical thinking and dialogue.",
      icon: "💭",
      color: "#4CAF50"
    },
    {
      id: 2,
      title: "Bridging Courses",
      description: "Use of NIOS Levels A, B, C and X, alongside CBSE and select state-approved courses, to help students who have fallen behind re-enter mainstream academics.",
      icon: "🌉",
      color: "#2196F3"
    },
    {
      id: 3,
      title: "English & Math Remediation",
      description: "Targeted support in Grades 6 and 7 to prevent dropouts during the critical language-transition stage.",
      icon: "📚",
      color: "#FF5722"
    },
    {
      id: 4,
      title: "Progress Tracking & Counselling",
      description: "Continuous assessment, growth monitoring, and regular counselling sessions for students and families.",
      icon: "📊",
      color: "#9C27B0"
    },
    {
      id: 5,
      title: "Mainstreaming",
      description: "Guiding madrasa and regional-medium learners into broader academic streams while respecting their cultural identity.",
      icon: "🎯",
      color: "#FF9800"
    }
  ];

  const programs = [
    {
      id: 1,
      title: "Core Subjects",
      description: "English, Mathematics, and Science, taught during school hours or through extra-learning sessions using Discourse-Oriented Pedagogy (DOP) to build conceptual understanding and strong foundations.",
      icon: "📖",
      color: "#4CAF50"
    },
    {
      id: 2,
      title: "Teacher Development",
      description: "Elementary teachers receive targeted training in DOP and child-centred methods, ensuring that early-grade classrooms foster inquiry and collaboration.",
      icon: "👩‍🏫",
      color: "#2196F3"
    },
    {
      id: 3,
      title: "Classroom Practices",
      description: "Storytelling circles, group discussions, and picture-description tasks encourage critical thinking, creativity, and confident speaking.",
      icon: "🎭",
      color: "#FF5722"
    },
    {
      id: 4,
      title: "Parental & Community Engagement",
      description: "Regular parent–teacher meetings and local outreach improve attendance and reinforce learning at home.",
      icon: "🤝",
      color: "#9C27B0"
    },
    {
      id: 5,
      title: "Value-Based Education",
      description: "Daily lessons integrate empathy, respect, and social responsibility to nurture holistic growth.",
      icon: "❤️",
      color: "#FF9800"
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "Earlier, I was shy to speak in English, but now I can explain a science experiment to my class without fear. NEIEA classes make learning exciting and give me confidence for my future.",
      author: "Ayesha",
      role: "Grade 7 student, Hyderabad",
      avatar: "👧"
    },
    {
      id: 2,
      text: "Before NEIEA's classes, my students struggled to read with confidence. Today, they not only read but also discuss and question.",
      author: "Teacher",
      role: "Rural Bengaluru, Karnataka",
      avatar: "👩‍🏫"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Education", link: null },
        { name: "Elementary & Middle School", link: null }
      ]}
      title="NEIEA – Elementary & Middle School Initiatives"
      subtitle="By Syed Danish Ali"
      description="Building Strong Foundations"
      heroImage="/assets/images/ElementryEducation/image1.jpg"
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
              Building Strong Foundations
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#6c757d"
              }}
            >
              NEIEA gives special emphasis to elementary and middle school education (Grades 1–8), recognising these formative years as the foundation to lifelong learning. By strengthening literacy and numeracy early, we close learning gaps before they widen and nurture creativity, critical thinking, and emotional well-being. Our programs weave value-based education into daily learning so students grow with empathy, curiosity, and social responsibility. Through inclusive classrooms and age-appropriate technology, NEIEA helps children, especially in underserved schools, develop the academic and personal skills needed for future success.
            </p>
          </div>
        </div>
      </div>

      {/* Why This Work Matters */}
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
              THE CHALLENGE
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
              Why This Work Matters
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
              padding: "30px",
              backgroundColor: "white",
              border: "1px solid #e9ecef"
            }}
          >
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "700", 
                marginBottom: "15px"
              }}
            >
              📊 National Assessment Data
            </h5>
            <ul style={{ color: "#6c757d", paddingLeft: "20px", margin: "0", lineHeight: "1.8" }}>
              <li style={{ marginBottom: "8px" }}>
                Across India, national assessments show that more than half of Grade 5 students struggle with Grade 2-level reading and math.
              </li>
              <li style={{ marginBottom: "8px" }}>
                According to the ASER 2023 Report, only 43% of rural Grade 5 children can read a Grade 2 text, and fewer than 50% can do basic division.
              </li>
              <li style={{ marginBottom: "0" }}>
                The Ministry of Education's National Achievement Survey 2021 highlights similar foundational gaps nationwide.
              </li>
            </ul>
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
                marginBottom: "15px"
              }}
            >
              🎯 Our Intervention Strategy
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                fontSize: "16px", 
                lineHeight: "1.6",
                margin: "0"
              }}
            >
              By intervening in these critical years, NEIEA helps children catch up before the transition to secondary school, preventing dropouts and long-term academic setbacks.
            </p>
          </div>
        </div>
      </div>

      {/* Structural Challenges */}
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
              BARRIERS TO LEARNING
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
              The Structural Challenges Students Face
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              Grades 1–8 constitute the largest segment of NEIEA's student community, yet many learners face entrenched barriers well before reaching higher classes.
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="col-lg-6">
            <div style={{ padding: "20px 0" }}>
              <div className="d-flex align-items-start">
                <div 
                  style={{ 
                    fontSize: "35px", 
                    marginRight: "20px"
                  }}
                >
                  {challenge.icon}
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
                    {challenge.title}
                  </h5>
                  <p 
                    style={{ 
                      color: "#6c757d", 
                      fontSize: "15px", 
                      lineHeight: "1.6", 
                      margin: "0"
                    }}
                  >
                    {challenge.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NEIEA's Response */}
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
              NEIEA's Response
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              NEIEA tackles these systemic handicaps through a multi-layered strategy
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {neiaeResponse.map((response) => (
          <div key={response.id} className="col-lg-4 col-md-6">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "50px", 
                  marginBottom: "20px"
                }}
              >
                {response.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "18px"
                }}
              >
                {response.title}
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6", 
                  margin: "0"
                }}
              >
                {response.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Programs & Interventions */}
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
              OUR PROGRAMS
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
              Programs & Interventions
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "700px",
                margin: "0 auto"
              }}
            >
              NEIEA supports partner schools and learning centres through a blend of classroom innovation and teacher development
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {programs.map((program) => (
          <div key={program.id} className="col-lg-4 col-md-6">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "45px", 
                  marginBottom: "20px"
                }}
              >
                {program.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "18px"
                }}
              >
                {program.title}
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6", 
                  margin: "0"
                }}
              >
                {program.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Reach & Impact */}
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
              Reach & Impact in Elementary and Middle Schools
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
                src="/assets/images/ElementryEducation/image2.png" 
                alt="NEIEA Impact"
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
                  fontSize: "20px"
                }}
              >
                Current Reach
              </h4>
              <div className="mb-3">
                <div 
                  style={{ 
                    backgroundColor: "#f8f9fa", 
                    color: "#212529", 
                    padding: "8px 16px", 
                    borderRadius: "6px", 
                    fontSize: "16px", 
                    fontWeight: "700",
                    display: "inline-block",
                    marginBottom: "10px",
                    border: "1px solid #e9ecef"
                  }}
                >
                  18 Schools • 1,047 Students
                </div>
              </div>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6",
                  margin: "0"
                }}
              >
                Across Hyderabad (Telangana), Bhopal (Madhya Pradesh), rural Bengaluru (Karnataka), Kolkata (West Bengal), Mumbai & Latur (Maharashtra), Bidar (Karnataka), Gaya (Bihar), Deeg (Rajasthan), and Aligarh (Uttar Pradesh).
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
                marginBottom: "15px"
              }}
            >
              🎯 Karnataka Case Study
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                fontSize: "15px", 
                lineHeight: "1.6",
                marginBottom: "15px"
              }}
            >
              In Karnataka, our team identified that low attendance and poor exam scores in a chain of schools were linked to a language transition: children study in Urdu or Kannada medium until Grade 6, then shift to English medium from Grade 7, making the move to upper grades difficult.
            </p>
            <p 
              style={{ 
                color: "#212529", 
                fontSize: "14px", 
                fontWeight: "600",
                margin: "0"
              }}
            >
              <strong>Solution:</strong> NEIEA has proposed remedial English and Mathematics classes for Grades 6, 7, and 10 to strengthen core concepts, ease the transition, and improve overall performance.
            </p>
          </div>
        </div>
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
              Voices from the Classroom
            </h2>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="col-lg-6">
            <div 
              className="card h-100 border-0"
              style={{ 
                borderRadius: "8px", 
                padding: "30px",
                backgroundColor: "white",
                border: "1px solid #e9ecef"
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
                    color: "#212529", 
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

      {/* Mode of Delivery */}
      <div className="row">
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
                src="/assets/images/ElementryEducation/image3.jpg" 
                alt="NEIEA Hybrid Learning"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "20px"
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
              <h3 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "20px",
                  fontSize: "24px",
                  textAlign: "center"
                }}
              >
                Mode of Delivery
              </h3>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "16px", 
                  lineHeight: "1.7",
                  marginBottom: "20px",
                  textAlign: "center"
                }}
              >
                NEIEA uses a hybrid learning model where live, interactive classes are taught online by NEIEA educators. Students either log in individually from home or join together in IT-enabled classrooms equipped with a large LED screen, a laptop or computer, webcam, microphones and internet.
              </p>
              <div 
                style={{
                  backgroundColor: "#f8f9fa",
                  color: "#212529",
                  padding: "20px 25px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "500",
                  textAlign: "center",
                  maxWidth: "600px",
                  margin: "0 auto",
                  border: "1px solid #e9ecef"
                }}
              >
                This blended setup combines real-time teacher interaction with on-site peer learning, ensuring consistent, high-quality instruction even in remote or underserved schools.
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ElementaryMiddleSchool;