import React from 'react';
import PageTemplate from '../components/PageTemplate';
import { Link } from 'react-router-dom';

// Content data structure for easy future dynamic integration
const contentData = {
  sections: [
    {
      id: 'introduction',
      title: 'Overview',
      content: [
        'At NEIEA, we believe education is a shared responsibility—and collaboration is the key to making it accessible to all. Our partnership model is built on working hand in hand with educational institutions and community centers that face challenges in delivering quality learning.',
        'Together, we transform existing spaces into centers of excellence that bring affordable, technology-enabled education to those who need it most.'
      ]
    },
    {
      id: 'scalable-model',
      title: 'A Scalable Model for Quality Learning',
      content: [
        'NEIEA signs formal agreements with partner institutions, defining mutual responsibilities to ensure accountability and success. With just a one-time investment of Rs. 1.3 lakhs (~$1500), a standard classroom can be converted into a digital classroom, ready to host NEIEA\'s programs.',
        'The cost of running our model is remarkably low: Rs. 500 ($6) per child per month, or Rs. 5,000 ($60) per class of 25 students per month. For this small investment, NEIEA provides expert-led teaching in English, Math, and Science, helping students pass standardized exams and unlocking opportunities that were once out of reach.'
      ]
    },
    {
      id: 'community-partnerships',
      title: 'Partnerships That Empower Communities',
      content: [
        'Beyond schools, NEIEA partners with marginalized communities—empowering adults, women, and farmers by transforming community centers into digital learning hubs. These hubs provide education, skills training, and opportunities at a very low cost, strengthening communities and fueling growth.',
        'We also work with institutions and centers focused on youth empowerment. Through our Blended Learning Model, using 3D and augmented learning technologies, NEIEA offers technical and vocational training that is job-oriented and industry-relevant. This is complemented with soft skills development, ensuring young learners are well-prepared for meaningful employment and brighter futures.'
      ]
    },
    {
      id: 'global-collaborations',
      title: 'Global Collaborations for Greater Impact',
      content: [
        'Our vision is global, and so are our partnerships. NEIEA collaborates with international organizations that share our mission: Global Schools Initiative advancing Sustainable Development Goals (SDGs) in education, Aflatoun delivering financial literacy programs to learners of all ages, and J-PAL bringing evidence-based learning expertise into our programs.',
        'By building strong relationships with trusts, foundations, and philanthropic families, NEIEA ensures that every rupee or dollar is spent wisely. We commit that 95% of all grants and funds received go directly to program implementation, documented with full transparency and accountability to international standards.'
      ]
    },
    {
      id: 'why-collaborate',
      title: 'Why Collaborate with NEIEA?',
      content: [
        'Transform Access to Education: Open your doors to NEIEA programs and give underserved learners the same opportunities as privileged students.',
        'Multiply Your Impact: Every partnership expands the reach of education—turning one classroom, one center, or one institution into a hub of change.',
        'Empower the Marginalized: From children in slums to women, farmers, and youth, your collaboration ensures access to education and skills that change lives.',
        'Be Part of a Global Movement: Partner with NEIEA and join a worldwide mission for equitable learning, aligned with SDGs and global best practices.',
        'Invest Where It Matters Most: With NEIEA\'s low-cost model, your contribution creates maximum impact—directly reaching learners who need it most.'
      ]
    },
    {
      id: 'how-to-partner',
      title: 'How You Can Partner with NEIEA',
      content: [
        'Host NEIEA Digital Classrooms: Convert existing classrooms or spaces into technology-enabled hubs for core academic and vocational programs.',
        'Co-Design Programs: Collaborate with us to create workshops, teacher training, and community learning activities tailored to your needs.',
        'Empower Communities Together: Transform community centers into spaces for adult literacy, women\'s empowerment, and farmer education.',
        'Strengthen Youth Futures: Partner on technical and vocational training using blended learning, 3D tools, and soft skills for employability.',
        'Build Long-Term Collaborations: Establish sustained partnerships that expand access year after year, positioning your institution as a leader in inclusive education.'
      ]
    },
    {
      id: 'charities-foundations',
      title: 'Partnering with Charities, Trusts, and Foundations',
      content: [
        'Behind every success story in education, there is often a quiet generosity. At NEIEA, we invite charitable trusts, philanthropic families, and foundations to become that hand of hope for thousands of learners waiting for their chance.',
        'Your support does more than fund programming. It changes lives: A single donation can transform a classroom into a digital learning hub, reaching dozens of children every day. A modest grant can cover months of high-quality teaching in English, Math, and Science for entire classes of marginalized students. A sustained partnership can enable youth vocational training and women\'s empowerment programs that ripple across communities for generations.',
        'NEIEA pledges to honor your trust with the highest standards of transparency, accountability, and ethical practice. We commit that 95% of all grants and donations go directly to program delivery—bringing education, skills, and dignity to those who need it most. Charities and trusts have always been the bridge between compassion and change. With your support, NEIEA can take education to the forgotten corners of our world.'
      ]
    }
  ],
  callToAction: {
    title: 'Together, we can take the gift of learning to every corner where it is needed most.',
    contact: {
      email: '/about-us/contact',
      courseLink: '/courses/english'
    }
  }
};

const PartnersJoin = () => {
  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Partners", link: null },
        { name: "Join NEIEA as a Partner", link: null }
      ]}
      title="Join NEIEA as an Institutional Partner"
      subtitle="Together We Can Transform Education"
      description="Partner with NEIEA to create lasting impact in education. Join our network of organizations committed to providing equitable and innovative learning opportunities."
      heroImage="/assets/images/JoinNeieaAsPartner/1.png"
    >
      {/* Main Content Section */}
      <section style={{ 
        backgroundColor: "#ffffff", 
        padding: "60px 0",
        minHeight: "100vh",
        fontFamily: 'system-ui, -apple-system, "Roboto", sans-serif;'
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px"
        }}>
          {/* Content Container */}
          <div className="content-container" style={{
            display: "flex",
            flexDirection: "column",
            gap: "60px"
          }}>
            {contentData.sections.map((section, index) => (
              <div key={section.id} className="section-content" style={{
                display: "flex",
                flexDirection: "column",
                gap: "30px"
              }}>
                {/* Section Header */}
                <div className="section-header" style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px"
                }}>
                  <h2 style={{
                    color: "#06038F",
                    fontSize: "28px",
                    fontWeight: "700",
                    margin: "0",
                    lineHeight: "1.2",
                    paddingRight: section.title === 'Overview' ? "20px" : "0"
                  }}>
                    {section.title}
                  </h2>
                  {section.title === 'Overview' && (
                    <div style={{
                      height: "1px",
                      backgroundColor: "#06038F",
                      flex: "1",
                      minWidth: "20px"
                    }}></div>
                  )}
                </div>

                {/* Section Content */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}>
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} style={{
                      fontSize: "22px",
                      // fontWeight: "500",
                      lineHeight: "32px",
                      letterSpacing: "-.02em",
                      paddingBottom:" 14px",
                      color: "#000000",
                  
                      margin: "0",
                      textAlign: "left"
                    }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                    </div>
            ))}

            {/* Call to Action Section */}
            <div className="call-to-action" style={{
              backgroundColor: "#f8f9fa",
              padding: "40px",
              borderRadius: "8px",
              textAlign: "center",
              marginTop: "40px"
            }}>
              <p style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#06038F",
                marginBottom: "30px",
                lineHeight: "1.5"
              }}>
                {contentData.callToAction.title}
              </p>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                alignItems: "center"
              }}>
                <p style={{
                  fontSize: "1.1rem",
                  margin: "0",
                  color: "#333333"
                }}>
                  <strong>Interested in collaboration? Become an NEIEA Partner today!</strong>
                </p>
                <div className="call-to-action-buttons" style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  justifyContent: "center"
                }}>
                  <Link
                    to={contentData.callToAction.contact.courseLink}
                    style={{
                      color: "#06038F",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      padding: "10px 20px",
                      border: "2px solid #06038F",
                      borderRadius: "5px",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#06038F";
                      e.target.style.color = "#ffffff";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#06038F";
                    }}
                      >
                        Join NEIEA Courses
                      </Link>
                  <Link
                    to={`${contentData.callToAction.contact.email}`}
                    style={{
                      color: "#06038F",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      padding: "10px 20px",
                      border: "2px solid #06038F",
                      borderRadius: "5px",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#06038F";
                      e.target.style.color = "#ffffff";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#06038F";
                    }}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            padding: 0 15px !important;
          }
          
          /* Reduce section padding for mobile */
          section {
            padding: 30px 0 !important;
          }
          
          /* Reduce gap between sections */
          .content-container {
            gap: 30px !important;
          }
          
          /* Reduce section internal spacing */
          .section-content {
            gap: 20px !important;
          }
          
          h2 {
            font-size: 1.8rem !important;
            line-height: 1.3 !important;
            word-wrap: break-word !important;
            hyphens: auto !important;
            margin-bottom: 15px !important;
          }
          
          .section-header {
            align-items: center !important;
            margin-bottom: 15px !important;
          }
          
          .section-header h2 {
            padding-right: 0 !important;
          }
          
          .section-header h2:first-child {
            padding-right: 15px !important;
          }
          
          .section-header div {
            min-width: 15px !important;
          }
          
          .call-to-action-buttons {
            flex-direction: column !important;
            gap: 15px !important;
          }
          
          .call-to-action-buttons a {
            width: 100% !important;
            text-align: center !important;
          }
        }
        
        @media (max-width: 480px) {
          /* Further reduce padding for smaller mobile screens */
          section {
            padding: 20px 0 !important;
          }
          
          .content-container {
            gap: 20px !important;
          }
          
          .section-content {
            gap: 15px !important;
          }
          
          h2 {
            font-size: 1.5rem !important;
            line-height: 1.2 !important;
            word-wrap: break-word !important;
            hyphens: auto !important;
            margin-bottom: 10px !important;
          }
          
          .section-header {
            margin-bottom: 10px !important;
          }
          
          .section-header h2 {
            padding-right: 0 !important;
          }
          
          .section-header h2:first-child {
            padding-right: 12px !important;
          }
          
          .section-header div {
            min-width: 12px !important;
          }
          
          p {
            font-size: 1rem !important;
            margin-bottom: 15px !important;
          }
          
          .call-to-action {
            padding: 20px 15px !important;
            margin-top: 20px !important;
          }
        }
        
        @media (max-width: 360px) {
          section {
            padding: 15px 0 !important;
          }
          
          .content-container {
            gap: 15px !important;
          }
          
          h2 {
            font-size: 1.3rem !important;
            line-height: 1.1 !important;
            margin-bottom: 8px !important;
          }
          
          .section-header {
            margin-bottom: 8px !important;
          }
          
          .section-header h2 {
            padding-right: 0 !important;
          }
          
          .section-header h2:first-child {
            padding-right: 10px !important;
          }
          
          .section-header div {
            min-width: 10px !important;
          }
          
          p {
            margin-bottom: 12px !important;
          }
        }
      `}</style>
    </PageTemplate>
  );
};

export default PartnersJoin;
