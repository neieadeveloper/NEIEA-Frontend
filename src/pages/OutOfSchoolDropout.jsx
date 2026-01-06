import React from 'react';
import PageTemplate from '../components/PageTemplate';

const OutOfSchoolDropout = () => {
  const obePrograms = [
    {
      id: 1,
      level: "Level A",
      equivalent: "Grade 3",
      subjects: ["English", "Mathematics", "Science", "Data Entry"],
      icon: "🔹",
      color: "#4CAF50"
    },
    {
      id: 2,
      level: "Level B", 
      equivalent: "Grade 5",
      subjects: ["English", "Mathematics", "Science", "Data Entry"],
      icon: "🔹",
      color: "#2196F3"
    },
    {
      id: 3,
      level: "Level C",
      equivalent: "Grade 8", 
      subjects: ["English", "Mathematics", "Science", "Data Entry"],
      icon: "🔹",
      color: "#FF9800"
    }
  ];

  const secondarySubjects = [
    "English",
    "Mathematics", 
    "Home Science",
    "Social Science",
    "Data Entry (Skill-Based Subject)"
  ];

  const impactData = [
    {
      id: 1,
      number: "25",
      title: "NIOS Secondary (10th Grade)",
      description: "Learners successfully appeared for the NIOS Secondary (10th Grade) examinations in 2024-2025 through NEIEA's academic support.",
      icon: "🎓",
      color: "#4CAF50"
    },
    {
      id: 2,
      number: "33",
      title: "NIOS Level C (Grade 8)",
      description: "Learners from Karnataka appeared for the NIOS Level C (Grade 8 equivalent) examination in 2024-2025 under the NEIEA program.",
      icon: "📚",
      color: "#2196F3"
    },
    {
      id: 3,
      number: "25",
      title: "Current Learners",
      description: "This year around 25 learners are appearing from Karnataka TUMKUR and HOSKOTE MADARSA.",
      icon: "📖",
      color: "#FF9800"
    },
    {
      id: 4,
      number: "11",
      title: "Bangalore Learners",
      description: "Learners from Thanal MLC Slums of Martahalli, Bangalore Karnataka also preparing for NIOS 10th grade for the year 2025-2026.",
      icon: "🌟",
      color: "#9C27B0"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Education", link: null },
        { name: "Out of School / School Dropout", link: null }
      ]}
      title="Education for OUT OF SCHOOL AND DROPOUT Children through NIOS"
      subtitle="National Institute of Open Schooling"
      description="To provide a second chance at formal education for dropout children through the NIOS Open Basic Education (OBE) and Secondary Education programs, ensuring they are re-integrated into learning and equipped with academic and vocational skills."
      heroImage="/assets/images/OutOfSchools/image1.png"
    >
      {/* Objective */}
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
              🎯 Our Objective
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#6c757d"
              }}
            >
              To provide a second chance at formal education for dropout children through the NIOS Open Basic Education (OBE) and Secondary Education programs, ensuring they are re-integrated into learning and equipped with academic and vocational skills.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Image Section */}
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
                src="/assets/images/OutOfSchools/image1.png" 
                alt="NIOS learners from AL Furqaan Madarsa presenting science projects"
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
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center",
                  fontStyle: "italic"
                }}
              >
                NIOS learners from AL Furqaan Madarsa With Modern Touch, Tumkur Karnataka presenting science projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NIOS Open Basic Education Program */}
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
              OBE PROGRAM
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
              NIOS Open Basic Education (OBE) Program
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              The OBE Program is implemented across three levels, designed to match the mainstream school grades and suit the learning pace of underprivileged and out-of-school children
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {obePrograms.map((program) => (
          <div key={program.id} className="col-lg-4">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "50px", 
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
                  fontSize: "22px"
                }}
              >
                {program.level}
              </h5>
              <div 
                style={{ 
                  backgroundColor: "#06038F", 
                  color: "white", 
                  padding: "8px 16px", 
                  borderRadius: "20px", 
                  fontSize: "14px", 
                  fontWeight: "600", 
                  marginBottom: "20px",
                  display: "inline-block"
                }}
              >
                Equivalent to {program.equivalent}
              </div>
              <div className="mb-3">
                <h6 
                  style={{ 
                    color: "#495057", 
                    fontWeight: "600", 
                    marginBottom: "15px",
                    fontSize: "16px"
                  }}
                >
                  Subjects Offered:
                </h6>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  {program.subjects.map((subject, index) => (
                    <span 
                      key={index}
                      style={{ 
                        backgroundColor: "#f8f9fa", 
                        color: "#495057", 
                        padding: "6px 12px", 
                        borderRadius: "12px", 
                        fontSize: "13px",
                        border: "1px solid #e9ecef",
                        fontWeight: "500"
                      }}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flexibility Note */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto">
          <div 
            className="card border-0"
            style={{ 
              borderRadius: "8px", 
              padding: "30px",
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
                📚 Flexible Learning Approach
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  margin: "0"
                }}
              >
                These courses are designed with flexibility, allowing learners to study at their own pace, supported by our dedicated team of educators and coordinators.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NIOS Secondary Education Program */}
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
              SECONDARY PROGRAM
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
              🎓 NIOS Secondary Education Program
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "700px",
                margin: "0 auto"
              }}
            >
              For learners aiming to complete their 10th Grade (Secondary Level), NEIEA offers the following subjects under the NIOS curriculum
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
              color: "#212529",
              border: "1px solid #e9ecef"
            }}
          >
            <div className="text-center">
              <div 
                style={{ 
                  fontSize: "60px", 
                  marginBottom: "25px"
                }}
              >
                🎓
              </div>
              <h4 
                style={{ 
                  fontWeight: "700", 
                  marginBottom: "20px",
                  fontSize: "24px"
                }}
              >
                10th Grade (Secondary Level) Subjects
              </h4>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {secondarySubjects.map((subject, index) => (
                  <span 
                    key={index}
                    style={{ 
                      backgroundColor: "#f8f9fa", 
                      color: "#212529", 
                      padding: "8px 16px", 
                      borderRadius: "6px", 
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "1px solid #e9ecef"
                    }}
                  >
                    {subject}
                  </span>
                ))}
              </div>
              <p 
                style={{ 
                  fontSize: "16px", 
                  marginTop: "25px",
                  color: "#6c757d",
                  fontStyle: "italic"
                }}
              >
                Through this structured approach, we ensure not only academic development but also skill enhancement to promote employability and self-reliance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Images Gallery */}
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
              NIOS Learning in Action
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              Witness the transformation happening in our NIOS programs across different locations
            </p>
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
                src="/assets/images/OutOfSchools/image3.png" 
                alt="NIOS Program Activities"
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
                NIOS Program Activities
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center"
                }}
              >
                Students actively participating in NIOS educational activities and skill development programs.
              </p>
            </div>
          </div>
        </div>
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
                src="/assets/images/OutOfSchools/image4.png" 
                alt="NIOS Learning Environment"
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
                NIOS Learning Environment
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "14px", 
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center"
                }}
              >
                Creating supportive learning environments for out-of-school children to successfully complete their education.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
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
              OUR ACHIEVEMENTS
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
              🌟 Impact
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              In the last academic year, NEIEA is proud to report the following outcomes
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {impactData.map((impact) => (
          <div key={impact.id} className="col-lg-6">
            <div 
              className="card h-100 border-0"
              style={{ 
                borderRadius: "8px", 
                padding: "25px",
                backgroundColor: "white",
                border: "1px solid #e9ecef"
              }}
            >
              <div className="d-flex align-items-start">
                <div 
                  style={{ 
                    fontSize: "40px", 
                    marginRight: "20px"
                  }}
                >
                  {impact.icon}
                </div>
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <h3 
                      style={{ 
                        color: "#212529", 
                        fontWeight: "700", 
                        marginRight: "15px",
                        fontSize: "36px",
                        marginBottom: "0"
                      }}
                    >
                      {impact.number}
                    </h3>
                    <h5 
                      style={{ 
                        color: "#212529", 
                        fontWeight: "600", 
                        marginBottom: "0",
                        fontSize: "18px"
                      }}
                    >
                      {impact.title}
                    </h5>
                  </div>
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
          </div>
        ))}
      </div>

      {/* Second Image Section */}
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
                src="/assets/images/OutOfSchools/image2.png" 
                alt="NIOS 10th grade learners from Thanal MLC Bangalore"
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
                NIOS 10th grade learners from Thanal MLC Bangalore
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
                Supporting learners from marginalized communities in their journey towards completing their secondary education through NIOS programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default OutOfSchoolDropout;