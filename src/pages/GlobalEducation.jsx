import React from 'react';
import PageTemplate from '../components/PageTemplate';

const GlobalEducation = () => {
  const valuesInEducation = [
    {
      id: 1,
      title: "Holistic Learning Approach",
      description: "NEIEA does not restrict education to academic achievement alone; it emphasizes moral, social, and emotional growth. Learners are encouraged to develop empathy, respect, and responsibility alongside literacy and numeracy.",
      icon: "🌱"
    },
    {
      id: 2,
      title: "Equity and Inclusivity as Core Values",
      description: "By offering low cost/free education to underserved communities and low-budget institutions, NEIEA ensures that education is accessible to all, reflecting the values of justice, equality, and fairness.",
      icon: "⚖️"
    },
    {
      id: 3,
      title: "Discourse-Oriented Pedagogy (DOP)",
      description: "Developed by co-founder Dr. K. N. Anandan, this pedagogy nurtures dialogue, collaboration, and critical thinking, promoting respect for diverse voices and perspectives—a core principle of value-based education.",
      icon: "💬"
    },
    {
      id: 4,
      title: "Teacher Empowerment with Values at the Center",
      description: "NEIEA's teacher training programs focus on building not only academic and technological skills but also values like inclusivity, empathy, and reflective practice. Teachers become role models who can transmit these values to students.",
      icon: "👨‍🏫"
    },
    {
      id: 5,
      title: "Community Building & Social Responsibility",
      description: "NEIEA's initiatives—whether in madrasas, schools, or foundations—emphasize social cohesion, respect for cultural diversity, and active citizenship. Learners are guided to see education as a tool for serving society, not just personal growth.",
      icon: "🤝"
    },
    {
      id: 6,
      title: "Integration of Life Skills & Soft Skills",
      description: "Through English communication, soft skills, and career planning programs, NEIEA equips learners with integrity, confidence, and collaboration skills, helping them lead value-driven personal and professional lives.",
      icon: "💪"
    }
  ];

  const sdgContributions = [
    {
      id: 1,
      title: "Free, high-quality online education",
      description: "Offered through 17 diverse courses in English, mathematics, science, IT skills, financial literacy and NIOS subjects.",
      icon: "📚"
    },
    {
      id: 2,
      title: "Robust reach across India",
      description: "Over 17,500 learners enrolled, with 58% girls, showing NEIEA's strong commitment to gender equity in education.",
      icon: "🇮🇳"
    },
    {
      id: 3,
      title: "Empowering marginalized groups",
      description: "Via collaborations with organizations like Umeed (Aligarh) and MV Foundation (Hyderabad), ensuring education reaches children in slums and homeless/destitute girls.",
      icon: "🌟"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Works", link: "/our-works" },
        { name: "Global Education" }
      ]}
      title="Global Education"
      subtitle="Empowering Communities Through Quality Education"
      description="NEIEA's commitment to providing inclusive, equitable education that transforms lives and builds sustainable communities worldwide."
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
              Transforming Lives Through Global Education
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#6c757d"
              }}
            >
              The New Equitable and Innovative Educational Association (NEIEA) envisions a society where quality education empowers individuals to drive positive changes for human welfare, sustainability, and progress. Our global education mission focuses on breaking barriers, bridging gaps, and building inclusive learning communities that serve marginalized populations worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* NEIEA's Global Mission */}
      <div className="row mb-5">
        <div className="col-lg-6 d-flex align-items-center">
          <div style={{ padding: "20px 0" }}>
            <h4 
              style={{ 
                color: "#212529",
                fontWeight: "700", 
                marginBottom: "20px",
                fontSize: "24px"
              }}
            >
              NEIEA's Global Education Mission
            </h4>
            <p 
              style={{ 
                color: "#6c757d",
                fontSize: "16px", 
                lineHeight: "1.8",
                margin: "0"
              }}
            >
              NEIEA's mission is to provide high-quality, innovative education to all, with a special focus on marginalized communities worldwide. Our inclusive approach ensures that education reaches those typically left behind in mainstream systems—girls, slum-dwelling children, dropouts, Madrasa students, and learners in underserved communities. Through free online courses and modern pedagogies like Discourse Oriented Pedagogy (DOP), we foster critical thinking, collaboration, and problem-solving skills essential for global citizenship.
            </p>
          </div>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <img 
            src="/assets/images/GlobalEducation/image2.jpg" 
            alt="NEIEA's Global Education Mission" 
            style={{ 
              width: "80%", 
              maxHeight: "300px", 
              objectFit: "contain"
            }} 
          />
        </div>
      </div>

      {/* SDG Section */}
      <div className="row mb-5">
        <div className="col-lg-12">
          <div className="text-center mb-4">
            <h3 
              style={{ 
                color: "#212529",
                fontSize: "28px", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              Sustainable Development Goals: NEIEA's Commitment to Quality Education for All
            </h3>
            <p 
              style={{ 
                color: "#6c757d",
                fontSize: "18px", 
                lineHeight: "1.8",
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              The United Nations Sustainable Development Goals (SDGs) provide a global blueprint to create a more equitable, sustainable, and prosperous world by 2030. Among the 17 goals, SDG 4 — to "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all" — resonates deeply with NEIEA's mission and work.
            </p>
          </div>
        </div>
      </div>

      {/* NEIEA's Focus on SDG 4 */}
      <div className="row mb-5">
        <div className="col-lg-12">
          <div className="text-center mb-4">
            <h4 
              style={{ 
                color: "#212529",
                fontSize: "24px", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              NEIEA's Focus on SDG 4
            </h4>
            <p 
              style={{ 
                color: "#6c757d",
                fontSize: "16px", 
                lineHeight: "1.8",
                maxWidth: "900px",
                margin: "0 auto 30px"
              }}
            >
              NEIEA wholeheartedly aligns with SDG 4 by delivering inclusive, quality education, especially to those typically left behind in mainstream education systems—girls, slum-dwelling children, dropouts, Madrasa students, and learners in underserved public and private schools. NEIEA's key contributions include:
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {sdgContributions.map((contribution) => (
          <div key={contribution.id} className="col-lg-4">
            <div 
              className="card border-0 text-center"
              style={{ 
                padding: "30px 20px",
                backgroundColor: "white",
                border: "1px solid #e9ecef",
                borderRadius: "8px"
              }}
            >
              <div 
                style={{ 
                  fontSize: "50px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80px"
                }}
              >
                {contribution.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "18px"
                }}
              >
                {contribution.title}
              </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  fontSize: "15px", 
                  lineHeight: "1.6",
                  marginBottom: "0"
                }}
              >
                {contribution.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Equity and Impact Section */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <div className="text-center" style={{ padding: "30px 20px" }}>
            <h4 
              style={{ 
                color: "#212529",
                fontSize: "24px", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              Equity, Transparency, and Sustainable Impact
            </h4>
            <div style={{ textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
              <p 
                style={{ 
                  color: "#6c757d",
                  fontSize: "16px", 
                  lineHeight: "1.8",
                  marginBottom: "15px"
                }}
              >
                NEIEA ensures equity by making all its educational offerings low-cost/free—removing financial barriers that prevent marginalized children from accessing learning.
              </p>
              <p 
                style={{ 
                  color: "#6c757d",
                  fontSize: "16px", 
                  lineHeight: "1.8",
                  margin: "0"
                }}
              >
                NEIEA practices transparency and accountability, earning certifications like 80G and operating under public accountability frameworks—including the Darpan ID—reinforcing trust and engagement within communities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <img 
            src="/assets/images/GlobalEducation/image4.jpg" 
            alt="Impact and Equity" 
            style={{ 
              width: "100%", 
              maxHeight: "400px", 
              objectFit: "contain"
            }} 
          />
        </div>
        <div className="col-lg-6 d-flex align-items-center">
          <div style={{ padding: "20px 0" }}>
            <h4 
              style={{ 
                color: "#212529",
                fontWeight: "700", 
                marginBottom: "20px",
                fontSize: "24px"
              }}
            >
              Why It Matters
            </h4>
            <p 
              style={{ 
                color: "#6c757d",
                fontSize: "16px", 
                lineHeight: "1.8",
                margin: "0"
              }}
            >
              By operationalizing SDG 4 with purpose and precision, NEIEA is doing more than imparting education, it's creating pathways out of poverty, enabling lifelong growth, and empowering future generations. When marginalized learners get access to high-quality, meaningful education, entire communities transform.
            </p>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <img 
            src="/assets/images/GlobalEducation/imagels.jpg" 
            alt="Global Education Impact" 
            style={{ 
              width: "100%", 
              maxHeight: "500px", 
              objectFit: "contain"
            }} 
          />
        </div>
      </div>

      {/* Integrating Values in Education */}
      <div className="row mb-5">
        <div className="col-lg-12">
          <div className="text-center mb-4">
            <h3 
              style={{ 
                color: "#212529",
                fontSize: "28px", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              Integrating Values in Education
            </h3>
            <p 
              style={{ 
                color: "#6c757d",
                fontSize: "18px", 
                lineHeight: "1.8",
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              NEIEA's approach to global education is rooted in strong values that ensure holistic development and meaningful impact.
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {valuesInEducation.map((value) => (
          <div key={value.id} className="col-lg-6">
            <div 
              className="card border-0"
              style={{ 
                padding: "25px",
                backgroundColor: "white",
                border: "1px solid #e9ecef",
                borderRadius: "8px"
              }}
            >
              <div className="d-flex align-items-start">
                <div 
                  style={{ 
                    fontSize: "40px", 
                    marginRight: "20px",
                    minWidth: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {value.icon}
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
                    {value.title}
                  </h5>
                  <p 
                    style={{ 
                      color: "#6c757d", 
                      fontSize: "15px", 
                      lineHeight: "1.6", 
                      margin: "0"
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Values Summary */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <div className="text-center" style={{ padding: "30px 20px" }}>
            <p 
              style={{ 
                color: "#6c757d",
                fontSize: "18px", 
                lineHeight: "1.8",
                margin: "0",
                fontWeight: "600"
              }}
            >
              ✨ In short, NEIEA is deeply connected with value-based education because it places human values—equity, inclusivity, empathy, respect, and responsibility—at the heart of its mission. It blends modern skills with timeless values, ensuring that learners become not only competent but also compassionate citizens.
            </p>
          </div>
        </div>
      </div>

    </PageTemplate>
  );
};

export default GlobalEducation;