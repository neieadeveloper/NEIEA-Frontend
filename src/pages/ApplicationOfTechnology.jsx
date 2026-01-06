import React from 'react';
import PageTemplate from '../components/PageTemplate';

const ApplicationOfTechnology = () => {
  const digitalClassroomTools = [
    {
      id: 1,
      title: "Laptops for teachers",
      description: "to access resources, attend classes, and collaborate.",
      icon: "💻"
    },
    {
      id: 2,
      title: "Printers",
      description: "to support offline learning through worksheets and handouts.",
      icon: "🖨️"
    },
    {
      id: 3,
      title: "LCD Screens",
      description: "connected via HDMI Cable through Laptop's or via CPU for students that make Teaching facilitation, presentations and videos vibrant and engaging for large groups.",
      icon: "📺"
    },
    {
      id: 4,
      title: "Web Cameras & Microphones",
      description: "to enable two-way interaction in live sessions.",
      icon: "📹"
    },
    {
      id: 5,
      title: "Speakers",
      description: "for crystal-clear audio in group or hybrid environments.",
      icon: "🔊"
    },
    {
      id: 6,
      title: "Power Backup (UPS, Inverters)",
      description: "to protect classes from power outages and data loss.",
      icon: "🔋"
    },
    {
      id: 7,
      title: "High-Speed Internet",
      description: "for uninterrupted video conferencing, assessments, and live engagement.",
      icon: "🌐"
    }
  ];

  const onboardingSteps = [
    {
      step: 1,
      title: "Outreach Team Contact",
      description: "Reaches out to madrasas, NGOs, orphanages, and under-resourced schools."
    },
    {
      step: 2,
      title: "Explaining the Program",
      description: "The NEIEA coordinator shares our digital learning model, resources, and support structure."
    },
    {
      step: 3,
      title: "IT Infrastructure Check",
      description: "Our IT team inspects the institution's readiness and recommends necessary upgrades."
    },
    {
      step: 4,
      title: "Infrastructure Installation",
      description: "Devices, internet, and power backups are set up based on NEIEA guidelines."
    },
    {
      step: 5,
      title: "Student List Shared",
      description: "The institution submits participating students to NEIEA's deputy supervisor."
    },
    {
      step: 6,
      title: "Class Scheduling",
      description: "Timetables are planned to align with the institution's existing schedule."
    },
    {
      step: 7,
      title: "Baseline Assessment & Classes Begin",
      description: "We assess student levels and launch full-fledged live online sessions."
    }
  ];

  const digitalTools = [
    {
      tool: "Google Classroom",
      purpose: "Class assignments, announcements, and feedback"
    },
    {
      tool: "Google Docs/Slides",
      purpose: "Real-time collaboration and visual teaching"
    },
    {
      tool: "Google Forms",
      purpose: "Assessments and progress tracking"
    },
    {
      tool: "ChatGPT",
      purpose: "AI-generated MCQs and content support"
    },
    {
      tool: "Google Gemini",
      purpose: "Natural language-based teaching assistance"
    },
    {
      tool: "Canva",
      purpose: "Visual content creation and worksheets"
    },
    {
      tool: "Gamma AI",
      purpose: "Fast, beautiful slide decks and documents"
    },
    {
      tool: "AI Image/Video Generators",
      purpose: "Creating custom visuals and multimedia content"
    }
  ];

  const aiTools = [
    {
      tool: "ChatGPT",
      description: "for generating customized question papers and exercises."
    },
    {
      tool: "Google Gemini",
      description: "for explaining concepts or solving doubts."
    },
    {
      tool: "AI Image Generators",
      description: "to create illustrations for concepts like math shapes or science experiments."
    },
    {
      tool: "AI Video Creators",
      description: "to produce explainer videos and visual storytelling."
    },
    {
      tool: "Gamma AI",
      description: "for quick content generation (presentations, documents, proposals)."
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Our Working Model", link: null },
        { name: "Blended Learning Model", link: null },
        { name: "Application of Technology", link: null }
      ]}
      title="Application Of Technology"
      subtitle="Transforming Education Through Digital Innovation"
      description="Every NEIEA-powered classroom is carefully set up with the essentials for seamless online learning, ensuring every learner gets a consistent and enriching classroom experience."
      heroImage="/assets/images/applicationOfTech.png"
    >
      {/* What Powers a NEIEA Digital Classroom */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            What Powers a NEIEA Digital Classroom?
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            Every NEIEA-powered classroom—whether onsite or remote—is carefully set up with the essentials for seamless online learning:
          </p>
        </div>
      </div>

      {/* Featured Image 1 */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <img 
              src="/assets/images/applicationOfTech1.png" 
              alt="NEIEA Digital Classroom Setup" 
              className="img-fluid rounded shadow-sm"
              style={{ 
                maxHeight: "400px", 
                width: "auto",
                objectFit: "cover",
                display: "block",
                margin: "0 auto"
              }}
            />
          </div>
        </div>
      </div>

      {/* Digital Classroom Tools Grid */}
      <div className="row g-4 mb-5">
        {digitalClassroomTools.map((tool) => (
          <div key={tool.id} className="col-lg-6 col-xl-4">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px", padding: "25px" }}
            >
              <div className="text-center mb-3">
                <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                  {tool.icon}
                </div>
                <h5 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "600", 
                    marginBottom: "15px" 
                  }}
                >
                  {tool.title}
                </h5>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    lineHeight: "1.6", 
                    margin: "0",
              textAlign: "justify"
            }}
          >
                  {tool.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Classroom Experience Summary */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <div 
            style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "30px", 
              borderRadius: "15px",
              textAlign: "center"
            }}
          >
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                color: "#495057",
                marginBottom: "0",
                fontStyle: "italic"
              }}
            >
              These tools ensure every learner, whether in a madrasa, an orphanage, or a remote rural center, gets a consistent and enriching classroom experience.
            </p>
          </div>
        </div>
      </div>

      {/* The NEIEA Onboarding & Enrollment Process */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            The NEIEA Onboarding & Enrollment Process
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            Our outreach and implementation teams follow a structured 7-step process to bring new institutions into the NEIEA fold:
          </p>
        </div>
      </div>

      {/* Featured Image 2 */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <img 
              src="/assets/images/applicationOfTech2.png" 
              alt="NEIEA Onboarding Process" 
              className="img-fluid rounded shadow-sm"
              style={{ 
                maxHeight: "400px", 
                width: "auto",
                objectFit: "cover",
                display: "block",
                margin: "0 auto"
              }}
            />
          </div>
        </div>
      </div>

      {/* Onboarding Steps */}
      <div className="row g-4 mb-5">
        {onboardingSteps.map((item, index) => (
          <div key={item.step} className="col-lg-6">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px", padding: "25px" }}
            >
              <div className="d-flex align-items-start">
                <div 
                  style={{
                    backgroundColor: "#06038F",
                    color: "white",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginRight: "20px",
                    flexShrink: 0
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h5 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "600", 
                      marginBottom: "10px" 
                    }}
                  >
                    {item.title}
                  </h5>
                  <p 
                    style={{ 
                      color: "#6c757d", 
                      lineHeight: "1.6", 
                      margin: "0"
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NEIEA's Digital Toolbox */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            🧰 NEIEA's Digital Toolbox
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            We use a combination of free, open-source, and cutting-edge digital tools to create an interactive and personalized learning experience:
          </p>
        </div>
      </div>

      {/* Digital Tools Table */}
      <div className="row mb-5">
        <div className="col-12">
          <div 
            className="card border-0 shadow-sm"
            style={{ borderRadius: "15px", overflow: "hidden" }}
          >
            <div className="table-responsive">
              <table className="table table-striped mb-0" style={{ fontSize: "16px" }}>
                <thead style={{ backgroundColor: "#06038F", color: "white" }}>
                  <tr>
                    <th style={{ padding: "20px", fontWeight: "600", border: "none" }}>Tool</th>
                    <th style={{ padding: "20px", fontWeight: "600", border: "none" }}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {digitalTools.map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: "15px 20px", fontWeight: "500", color: "#212529" }}>
                        {item.tool}
                      </td>
                      <td style={{ padding: "15px 20px", color: "#6c757d" }}>
                        {item.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Toolbox Summary */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "0",
              textAlign: "center",
              fontStyle: "italic"
            }}
          >
            This blended suite helps us bridge gaps between student needs and mentor delivery, especially in low-resource environments.
          </p>
        </div>
      </div>

      {/* Hybrid Classrooms */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            🔁 Hybrid Classrooms: Onsite + Online Learning
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            NEIEA's classrooms come in two formats:
          </p>
        </div>
      </div>

      {/* Hybrid Learning Formats */}
      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "30px" }}
          >
            <div className="text-center mb-3">
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                🏫
              </div>
              <h4 
                style={{ 
                  color: "#212529", 
                  fontWeight: "600", 
                  marginBottom: "15px" 
                }}
              >
                Onsite Classrooms
              </h4>
              <p 
                style={{ 
                  color: "#6c757d", 
                  lineHeight: "1.6", 
                  margin: "0",
                  textAlign: "justify"
                }}
              >
                We set up tech-enabled classrooms inside partner institutions. Students gather together, and mentors deliver live classes via LCD screen and webcam, supported by in-person facilitators.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "30px" }}
          >
            <div className="text-center mb-3">
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                🏠
              </div>
              <h4 
                style={{ 
                  color: "#212529", 
                  fontWeight: "600", 
                  marginBottom: "15px" 
                }}
              >
                Individual Students via Google Meet
              </h4>
              <p 
                style={{ 
                  color: "#6c757d", 
                  lineHeight: "1.6", 
                  margin: "0",
                  textAlign: "justify"
                }}
              >
                Students in remote locations join directly from their homes or nearby centers. NEIEA ensures devices and internet support are provided, enabling smooth integration into the learning network.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Power Backup Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            ⚡ Always On: Power Backup for Continuity
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "30px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 30px"
            }}
          >
            Many of our centers face power outages. To ensure uninterrupted learning, NEIEA deploys:
          </p>
          </div>
        </div>

      {/* Power Backup Solutions */}
      <div className="row g-4 mb-5">
        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "25px", textAlign: "center" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>
              🔋
              </div>
            <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "600", 
                  marginBottom: "15px" 
                }}
              >
              Uninterruptible Power Supplies (UPS)
            </h5>
          </div>
        </div>

        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "25px", textAlign: "center" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>
              🔌
            </div>
            <h5 
                style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "15px" 
              }}
            >
              Inverters
            </h5>
          </div>
        </div>

        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "25px", textAlign: "center" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>
              ⚡
              </div>
            <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "600", 
                  marginBottom: "15px" 
                }}
              >
              Generators (where needed)
            </h5>
          </div>
        </div>
      </div>

      {/* Power Backup Benefits */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "0",
              textAlign: "center"
            }}
          >
            This system protects our students from missing lessons, our mentors from disruptions, and our data from loss or corruption.
          </p>
        </div>
      </div>

      {/* Featured Image 3 */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <img 
              src="/assets/images/applicationOfTech3.png" 
              alt="NEIEA AI-Powered Learning Tools" 
              className="img-fluid rounded shadow-sm"
              style={{ 
                maxHeight: "400px", 
                width: "auto",
                objectFit: "cover",
                display: "block",
                margin: "0 auto"
              }}
            />
          </div>
        </div>
      </div>

      {/* AI Integration */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            🤖 Using AI to Elevate Learning
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            NEIEA has integrated Artificial Intelligence into both teaching and administration, using tools like:
          </p>
        </div>
      </div>

      {/* AI Tools List */}
      <div className="row g-4 mb-5">
        {aiTools.map((item, index) => (
          <div key={index} className="col-lg-6">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px", padding: "25px" }}
            >
              <div className="d-flex align-items-start">
                <div 
                  style={{
                    backgroundColor: "#06038F",
                    color: "white",
                    borderRadius: "8px",
                    padding: "10px",
                    marginRight: "15px",
                    flexShrink: 0
                  }}
                >
                  🤖
                </div>
                <div>
                  <h5 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "600", 
                      marginBottom: "10px" 
                    }}
                  >
                    {item.tool}
                  </h5>
              <p 
                style={{ 
                  color: "#6c757d", 
                  lineHeight: "1.6", 
                      margin: "0"
                }}
              >
                    {item.description}
              </p>
            </div>
          </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Benefits */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "0",
              textAlign: "center",
              fontStyle: "italic"
            }}
          >
            These tools save time, personalize content, and empower teachers to work smarter, not harder.
          </p>
        </div>
      </div>

      {/* Salesforce CRM Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 
            style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            🔗 Transparent Impact with Salesforce CRM
          </h2>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "30px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 30px"
            }}
          >
            At NEIEA, we don't just teach—we build trust and community.
          </p>
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 40px"
            }}
          >
            We use Salesforce CRM to:
          </p>
        </div>
      </div>

      {/* CRM Features */}
      <div className="row g-4 mb-5">
        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "25px", textAlign: "center" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>
              📊
            </div>
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "15px" 
              }}
            >
              Track Contributions
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                lineHeight: "1.6", 
                margin: "0",
                fontSize: "14px"
              }}
            >
              Track donor contributions and map them directly to student outcomes
            </p>
          </div>
        </div>

        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "25px", textAlign: "center" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>
              🔄
            </div>
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "15px" 
              }}
            >
              Real-time Updates
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                lineHeight: "1.6", 
                margin: "0",
                fontSize: "14px"
              }}
            >
              Enable real-time updates for donors and parents
            </p>
          </div>
        </div>

        <div className="col-lg-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: "15px", padding: "25px", textAlign: "center" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>
              💬
            </div>
            <h5 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "15px" 
              }}
            >
              Direct Communication
            </h5>
            <p 
              style={{ 
                color: "#6c757d", 
                lineHeight: "1.6", 
                margin: "0",
                fontSize: "14px"
              }}
            >
              Foster direct communication (when needed) to keep all parties informed and involved
            </p>
          </div>
        </div>
      </div>

      {/* CRM Impact */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <p 
            style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              color: "#495057",
              marginBottom: "0",
              textAlign: "center",
              fontStyle: "italic"
            }}
          >
            This transparency turns donors into lifelong supporters and parents into partners in their child's journey.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="row mb-5">
        <div className="col-12">
          <div 
            style={{ 
              backgroundColor: "#06038F", 
              color: "white",
              padding: "40px", 
              borderRadius: "15px", 
              textAlign: "center"
            }}
          >
            <h2 
              style={{ 
                fontSize: "32px", 
                fontWeight: "700", 
                marginBottom: "20px",
                color: "white"
              }}
            >
              🌍 Our Mission: Empower Through Access
            </h2>
            <p 
              style={{ 
                fontSize: "20px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              The future of education is not just digital—it's inclusive, adaptable, and rooted in real relationships. At NEIEA, we're not just bringing tech into the classroom—we're making sure that no child is left out of the digital revolution.
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
              padding: "40px", 
              borderRadius: "15px",
              textAlign: "center"
            }}
          >
            <h3 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "20px" 
              }}
            >
              💬 Want to Partner with Us?
            </h3>
            <p 
              style={{ 
                color: "#6c757d", 
                marginBottom: "30px",
                fontSize: "18px",
                maxWidth: "600px",
                margin: "0 auto 30px"
              }}
            >
              Are you an NGO, madrasa, or donor interested in supporting tech-enabled education?
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
              <div className="d-flex align-items-center">
                <span style={{ fontSize: "20px", marginRight: "10px" }}>📩</span>
                <span style={{ color: "#06038F", fontWeight: "600" }}>Contact us at info@neiea.org</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ApplicationOfTechnology;
