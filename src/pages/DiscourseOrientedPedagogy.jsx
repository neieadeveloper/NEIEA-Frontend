import React from 'react';
import PageTemplate from '../components/PageTemplate';

const DiscourseOrientedPedagogy = () => {
  const keyFeatures = [
    {
      id: 1,
      title: "Real-World Triggers",
      description: "DOP uses images, videos, texts, situations, or objects related to the real world to spark curiosity and initiate discussion related to the curriculum. These triggers help students connect learning to everyday life, making classroom interaction more meaningful and engaging.",
      subtitle: "Lessons begin with relatable prompts—images, videos, questions, headlines—that stimulate thinking.",
      icon: "🌍",
      image: "/assets/images/DOP_Images/Picture1.png"
    },
    {
      id: 2,
      title: "Critical Thinking",
      description: "DOP promotes critical thinking by encouraging students to analyse and express their ideas rather than just memorise and regurgitate textbook answers. Students are provided with real-life scenarios and open-ended questions to think critically and express their viewpoints.",
      subtitle: "Here is an example demonstrating how students engage in debates sparked by the mentor teacher, encouraging critical thinking rather than rote memorisation of answers.",
      icon: "🧠",
      image: "/assets/images/DOP_Images/Picture2.png"
    },
    {
      id: 3,
      title: "Collaborative Learning",
      description: "In DOP, students learn by thinking, speaking, and problem-solving together. Through group discussions, pair work, and shared tasks, learners co-construct answers, listen to diverse viewpoints, and strengthen both communication and critical thinking skills.",
      subtitle: "",
      icon: "🤝",
      image: "/assets/images/DOP_Images/Picture3.png"
    },
    {
      id: 4,
      title: "Integrated Skills",
      description: "DOP promotes the natural integration of listening, speaking, reading, and writing. Rather than teaching these skills in isolation, DOP engages learners in real-life tasks that develop language holistically, supporting deeper understanding and long-term retention.",
      subtitle: "Listening, speaking, reading, and writing are taught together for deeper learning.",
      icon: "🔗",
      image: "/assets/images/DOP_Images/Picture4.png"
    },
    {
      id: 5,
      title: "Multilingual Scaffolding",
      description: "DOP recognises learners' home languages as a valuable resource. By allowing strategic use of mother tongues alongside English, teachers create a supportive bridge that helps students grasp complex ideas and gain confidence in expressing themselves in a new language.",
      subtitle: "",
      icon: "🌐",
      image: "/assets/images/DOP_Images/Picture5.png"
    },
    {
      id: 6,
      title: "Critical Reflection",
      description: "DOP creates space for learners to reflect on their thought processes, learning choices, and peer interactions through classroom feedback, mentor guidance, and peer suggestions. This encourages them to develop self-awareness, take ownership of their learning, and grow into independent, reflective thinkers.",
      subtitle: "",
      icon: "🪞",
      image: "/assets/images/DOP_Images/Picture6.png"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Our Working Model", link: null },
        { name: "Blended Learning Model", link: null },
        { name: "Discourse Oriented Pedagogy", link: null }
      ]}
      title="Discourse-Oriented Pedagogy (DOP)"
      subtitle="By Syed Danish Ali"
      description="A transformative approach to learning developed by Dr. K. N. Anandan - Empowering learners through communication, creativity, and critical thinking."
      heroImage="/assets/images/DOP_Images/Picture7.png"
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
              Introduction to Discourse-Oriented Pedagogy (DOP)
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
            <div className="row align-items-center">
              <div className="col-lg-8">
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
                  <strong style={{ color: "#06038F" }}>DOP is a progressive, learner-centred teaching model</strong> aimed at enhancing the educational experience by emphasising the importance of discourse as a dynamic tool for critical thinking and self-expression across all subjects.
                </p>
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
                  Unlike traditional methods that often prioritise rote memorisation of facts or formulas, DOP encourages students to engage with the subject matter in meaningful ways. This engagement includes expressing their ideas and opinions clearly, engaging in scientific argumentation, participating in mathematical problem-solving discussions, and debating historical themes.
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
                  Ultimately, DOP equips learners with essential communication skills that are vital for success both in academic settings and in everyday interactions. <strong style={{ color: "#06038F" }}>Developed by Dr. K. N. Anandan</strong>, one of the co-founders of NEIEA, this transformative approach to learning fosters deeper understanding, critical thinking and collaboration among students.
                </p>
              </div>
              <div className="col-lg-4">
                <div className="text-center">
                  <img 
                    src="/assets/images/DOP_Images/Picture8.png" 
                    alt="DOP Introduction" 
                    className="img-fluid rounded shadow-sm"
                    style={{ 
                      maxHeight: "250px", 
                      width: "auto",
                      objectFit: "cover"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dr. K.N. Anandan's Quote */}
      <div className="row mb-4">
        <div className="col-12">
          <div 
            className="card border-0 shadow-sm"
            style={{ 
              backgroundColor: "#06038F", 
              borderRadius: "12px", 
              padding: "25px",
              color: "white"
            }}
          >
            <div className="row align-items-center">
              <div className="col-lg-3 text-center flex-column align-items-center d-flex mb-3 mb-lg-0">
                <img
                  src="/assets/images/DOP_Images/Picture2.png"
                  alt="Dr. K.N. Anandan"
                  className="rounded-circle shadow-lg"
                  style={{ 
                    width: "120px", 
                    height: "120px", 
                    objectFit: "cover",
                    border: "3px solid rgba(255,255,255,0.3)"
                  }}
                />
                <h5 
                  style={{ 
                    color: "#ffffff", 
                    fontWeight: "600", 
                    marginTop: "15px",
                    marginBottom: "5px"
                  }}
                >
                  Dr. K.N. Anandan
                </h5>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", margin: "0" }}>
                  Co-Founder & Educational Visionary
                </p>
              </div>
              <div className="col-lg-9">
                <blockquote 
                  style={{ 
                    fontSize: "18px", 
                    lineHeight: "1.6", 
                    color: "#ffffff",
                    fontStyle: "italic",
                    marginBottom: "0",
                    borderLeft: "4px solid rgba(255,255,255,0.3)",
                    paddingLeft: "20px",
                    opacity: "0.95"
                  }}
                >
                  "I feel sad and even annoyed when I hear teachers and parents complaining about the poor performance standards of students in English. 'This is unfair,' I would say to myself. 'Have we ever asked those kids to communicate their ideas? 'No. All that we have done is teach them bits and fragments of English in terms of discrete sounds, words and sentences"."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
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
            Key Features of DOP
          </h2>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="row g-3 mb-4">
        {keyFeatures.map((feature, index) => (
          <div key={feature.id} className="col-12">
            <div 
              className="card border-0 shadow-sm"
              style={{ 
                borderRadius: "12px", 
                padding: "20px",
                backgroundColor: "#ffffff",
                border: "1px solid #e9ecef",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
            >
              <div className={`row align-items-center ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="col-lg-8">
                  <div className="d-flex align-items-start mb-3">
                    <div 
                      style={{
                        backgroundColor: "#06038F",
                        color: "white",
                        borderRadius: "8px",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        marginRight: "15px",
                        flexShrink: 0
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h4 
                        style={{ 
                          color: "#212529", 
                          fontWeight: "700", 
                          marginBottom: "10px",
                          fontSize: "22px",
                          lineHeight: "1.3"
                        }}
                      >
                        {feature.title}
                      </h4>
                    </div>
                  </div>
                  <p 
                    style={{ 
                      color: "#2c3e50", 
                      lineHeight: "1.6", 
                      marginBottom: feature.subtitle ? "15px" : "0",
                      textAlign: "left",
                      fontSize: "16px",
                      fontWeight: "400"
                    }}
                  >
                    {feature.description}
                  </p>
                  {feature.subtitle && (
                    <div 
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderRadius: "8px",
                        borderLeft: "4px solid #06038F"
                      }}
                    >
                      <p 
                        style={{ 
                          color: "#495057", 
                          lineHeight: "1.5", 
                          margin: "0",
                          fontSize: "15px",
                          fontStyle: "italic"
                        }}
                      >
                        {feature.subtitle}
                      </p>
                    </div>
                  )}
                </div>
                <div className="col-lg-4">
                  <div className="text-center">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="img-fluid rounded shadow-sm"
                      style={{ 
                        maxHeight: "200px", 
                        width: "auto",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Links Section */}
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
            Additional Resources
          </h2>
        </div>
      </div>

      {/* Additional Links Cards */}
      <div className="row g-3 mb-4">
        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ 
              borderRadius: "12px", 
              padding: "20px",
              backgroundColor: "#ffffff",
              border: "1px solid #e9ecef",
              textAlign: "center",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }}
          >
            <div 
              style={{
                backgroundColor: "#06038F",
                color: "white",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                margin: "0 auto 15px"
              }}
            >
              🚀
            </div>
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "10px" 
              }}
            >
              Why DOP is Disruptive
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                lineHeight: "1.5", 
                fontSize: "14px",
                marginBottom: "15px"
              }}
            >
              Discover how DOP transforms traditional education through innovative, transformative, and futuristic approaches.
            </p>
            <a 
              href="#" 
              style={{
                color: "#06038F",
                fontWeight: "600",
                textDecoration: "none",
                fontSize: "14px"
              }}
            >
              Learn More →
            </a>
          </div>
        </div>

        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ 
              borderRadius: "12px", 
              padding: "20px",
              backgroundColor: "#ffffff",
              border: "1px solid #e9ecef",
              textAlign: "center",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }}
          >
            <div 
              style={{
                backgroundColor: "#28a745",
                color: "white",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                margin: "0 auto 15px"
              }}
            >
              💬
            </div>
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "10px" 
              }}
            >
              Generating Discourse
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                lineHeight: "1.5", 
                fontSize: "14px",
                marginBottom: "15px"
              }}
            >
              Learn practical strategies for generating meaningful discourse in English courses and language learning.
            </p>
            <a 
              href="#" 
              style={{
                color: "#28a745",
                fontWeight: "600",
                textDecoration: "none",
                fontSize: "14px"
              }}
            >
              Explore Methods →
            </a>
          </div>
        </div>

        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ 
              borderRadius: "12px", 
              padding: "20px",
              backgroundColor: "#ffffff",
              border: "1px solid #e9ecef",
              textAlign: "center",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }}
          >
            <div 
              style={{
                backgroundColor: "#fd7e14",
                color: "white",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                margin: "0 auto 15px"
              }}
            >
              📚
            </div>
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "10px" 
              }}
            >
              Modular Transaction
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                lineHeight: "1.5", 
                fontSize: "14px",
                marginBottom: "15px"
              }}
            >
              Access comprehensive modular transaction modules designed for effective DOP implementation.
            </p>
            <a 
              href="#" 
              style={{
                color: "#fd7e14",
                fontWeight: "600",
                textDecoration: "none",
                fontSize: "14px"
              }}
            >
              View Modules →
            </a>
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
              Ready to Transform Education with DOP?
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
              Discover how Discourse-Oriented Pedagogy can revolutionize your teaching approach and empower students with critical thinking and communication skills.
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
                Get Started with DOP
              </a>
              <a 
                href="#"
                className="btn btn-outline-primary"
                style={{
                  borderColor: "#06038F",
                  color: "#06038F",
                  padding: "12px 25px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "25px",
                  textDecoration: "none"
                }}
              >
                Watch Demo Videos
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DiscourseOrientedPedagogy;