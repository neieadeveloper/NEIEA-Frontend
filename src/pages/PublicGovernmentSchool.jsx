import React from 'react';
import PageTemplate from '../components/PageTemplate';

const PublicGovernmentSchool = () => {
  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Education", link: null },
        { name: "Public (Government) School", link: null }
      ]}
      title="Strengthening India's Public School System through NEIEA's Blended Learning Model"
      subtitle="Public (Government) School Support"
      description="NEIEA offers a proven, scalable, and affordable solution that directly addresses systemic challenges in public schools and complements government efforts."
      heroImage="/assets/images/PublicGovSchool/1.png"
    >
      {/* Main Content Container */}
      <div className="container-fluid px-0">
        
      {/* Introduction Section */}
        <section className="mb-4">
          <div className="row justify-content-center">
            <div className="col-lg-20">
              <div className="text-center mb-4">
                <h2 className="display-6 fw-bold text-dark mb-4">Introduction</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <p className="text-muted fs-5 lh-lg" style={{ fontSize: '20px', lineHeight: '1.8' }}>
                    India's public (government) schools are the backbone of education for millions of children. Yet, systemic challenges—teacher shortages, outdated pedagogy, weak foundations in English and Math, and limited access to modern technology—continue to hold back student learning outcomes. The <strong>New Equitable and Innovative Educational Association (NEIEA)</strong> offers a proven, scalable, and affordable solution that directly addresses these issues and complements government efforts.
          </p>
        </div>
      </div>
            </div>
          </div>
        </section>

        {/* Blended Learning Model Section */}
        <section className="mb-5 py-5" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="text-center">
                <img 
                  src="/assets/images/PublicGovSchool/3.png" 
            alt="NEIEA Blended Learning Model" 
                  className="img-fluid rounded shadow" 
            style={{ 
                    maxHeight: "400px",
                    objectFit: "cover"
                  }} 
                />
              </div>
        </div>
        <div className="col-lg-6">
              <div className="ps-lg-4">
                <h3 className="h2 fw-bold text-dark mb-4">Our Blended Learning Model</h3>
                <p className="text-muted fs-5 lh-lg">
                  NEIEA's innovative <strong>Blended Learning Model</strong> combines live online teaching with on-site facilitation, ensuring high-quality instruction while strengthening teacher capacity. With successful pilots in Karnataka, NEIEA demonstrates how public–civil society partnerships can transform classrooms, empower teachers, and build confident learners.
          </p>
        </div>
      </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h2 className="display-6 fw-bold text-dark mb-4">The Challenge in Public Schools</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              <div className="row">
                <div className="col-lg-18 mx-auto">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="h-100 p-4 border rounded-3 bg-white shadow-sm">
                        <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Sudden Language Transitions</h5>
                        <p className="text-muted mb-0">Many schools, including Maulana Azad Model Schools, shift students abruptly from regional languages to English medium, leaving learners unable to cope.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="h-100 p-4 border rounded-3 bg-white shadow-sm">
                        <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Weak Foundations</h5>
                        <p className="text-muted mb-0">Students are promoted regardless of academic performance, creating compounding learning gaps.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="h-100 p-4 border rounded-3 bg-white shadow-sm">
                        <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Teacher Shortages & Low Motivation</h5>
                        <p className="text-muted mb-0">With 25% of posts vacant and reliance on underpaid contract teachers, consistent quality teaching remains a challenge.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="h-100 p-4 border rounded-3 bg-white shadow-sm">
                        <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Outdated Pedagogy</h5>
                        <p className="text-muted mb-0">Rote memorization dominates, limiting conceptual understanding and critical thinking.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="h-100 p-4 border rounded-3 bg-white shadow-sm">
                        <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Lack of Support Systems</h5>
                        <p className="text-muted mb-0">Parents often cannot assist with learning; schools lack counseling, libraries, labs, and play facilities.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="h-100 p-4 border rounded-3 bg-white shadow-sm">
                        <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Dropouts & Low Performance</h5>
                        <p className="text-muted mb-0">Students struggle with exams, and even those who pass often lack conceptual depth, confidence, or pathways to higher education.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
        </section>

        {/* NEIEA's Model Section */}
        <section className="mb-5 py-5" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h2 className="display-6 fw-bold text-dark mb-4">NEIEA's Model of Working</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              <div className="row justify-content-center mb-4">
                <div className="col-lg-8">
                  <p className="text-muted fs-5 lh-lg" style={{ fontSize: 'clamp(16px, 4vw, 20px)', lineHeight: '1.8' }}>
                    NEIEA has built a model that aligns directly with the priorities of <strong>NEP 2020</strong> and the needs of government schools:
                  </p>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                    <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Blended Learning</h5>
                    <p className="text-muted mb-0">Live online teaching delivered into classrooms with the support of on-site coordinators.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Discourse-Oriented Pedagogy (DOP)</h5>
                    <p className="text-muted mb-0">Moves beyond rote learning to foster critical thinking, interaction, and problem-solving.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Teacher Training</h5>
                    <p className="text-muted mb-0">Continuous professional development in pedagogy, technology, classroom management, and English proficiency.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Regular Assessments</h5>
                    <p className="text-muted mb-0">Frequent short-cycle assessments identify gaps and enable targeted interventions.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Flexible Scheduling</h5>
                    <p className="text-muted mb-0">Classes offered between 6 am and 9 pm, accommodating school timetables.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Student Guidance & Counseling</h5>
                    <p className="text-muted mb-0">Addressing socio-economic challenges and motivating learners.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <h5 className="fw-bold mb-3" style={{ color: '#06038F' }}>Community Engagement</h5>
                    <p className="text-muted mb-0">Actively involving parents and community leaders in supporting children's education.</p>
                  </div>
                </div>
              </div>
        </div>
      </div>
        </section>

        {/* Case Study Section */}
        <section className="mb-5">
          <div className="row align-items-start">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="pe-lg-4">
                <h2 className="display-6 fw-bold text-dark mb-4">Case Study: NEIEA & Government Schools in Karnataka</h2>
                <p className="text-muted fs-5 mb-4">
                  NEIEA has already partnered with government schools in Karnataka, focusing on <strong>English and Math</strong>. Results show:
                </p>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 bg-opacity-10 rounded-3">
                      <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '40px', height: '40px', fontSize: '16px', backgroundColor: '#06038F' }}>
                        <i className="fas fa-users">1</i>
                      </div>
                      <div>
                        <strong>250+ students and teachers</strong> benefited from improved foundational skills.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 bg-opacity-10 rounded-3">
                      <div className=" text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '40px', height: '40px', fontSize: '16px', backgroundColor: '#06038F' }}>
                        <i className="fas fa-chalkboard-teacher">2</i>
                      </div>
                      <div>
              Teachers reported stronger pedagogical practices and greater classroom engagement.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 bg-opacity-10 rounded-3">
                      <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '40px', height: '40px', fontSize: '16px', backgroundColor: '#06038F' }}>
                        <i className="fas fa-graduation-cap">3</i>
                      </div>
                      <div>
              Students demonstrated measurable improvements in comprehension, problem-solving, and confidence.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        <div className="col-lg-6">
              <div className="ps-lg-4">
          <img 
                  src="/assets/images/PublicGovSchool/2.png" 
            alt="Karnataka Government Schools Partnership" 
                  className="img-fluid rounded shadow" 
            style={{ 
                    maxHeight: "600px",
              width: "100%",
                    objectFit: "cover"
            }} 
          />
        </div>
      </div>
          </div>
        </section>

        {/* Pilot Project Section */}
        <section className="mb-3 py-4" style={{ backgroundColor: '#f8f9fa', paddingTop: 'clamp(1.5rem, 3vw, 3rem)', paddingBottom: 'clamp(1.5rem, 3vw, 3rem)' }}>
          <div className="row justify-content-center">
            <div className="col-lg-20">
              <div className="text-center mb-5">
                <h2 className="display-6 fw-bold text-dark mb-4">Pilot Project: Maulana Azad Model Schools</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              <div className="row justify-content-center mb-4">
                <div className="col-lg-8">
                  <p className="text-muted fs-5 lh-lg" style={{ fontSize: 'clamp(16px, 4vw, 20px)', lineHeight: '1.8' }}>
            The Department of Minority Welfare established 250 Maulana Azad Model Schools across Karnataka to provide English-medium education for minority students. Despite a progressive vision, systemic handicaps—including abrupt language transitions, rote pedagogy, and teacher shortages—have limited success.
          </p>
                </div>
              </div>
              
              <div className="row justify-content-center mb-5">
                <div className="col-lg-8">
                  <div className="bg-white rounded-3 shadow p-4">
                    <h3 className="h3 fw-bold text-center mb-4" style={{ color: '#06038F' }}>NEIEA's Proposal</h3>
                    <p className="text-start text-muted mb-4">
                      NEIEA proposes a <strong>three-month pilot program in 12 Maulana Azad Schools</strong> (Grades 6, 7, and 10), focusing on <strong>English and Mathematics</strong>.
                    </p>
                    
                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <div className="text-center p-3 border rounded-3">
                          <h5 className="fw-bold mb-2" style={{ color: '#06038F' }}>Target Schools</h5>
                          <p className="mb-0">12 (4 per grade level)</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-center p-3 border rounded-3">
                          <h5 className="fw-bold mb-2" style={{ color: '#06038F' }}>Students Benefiting</h5>
                          <p className="mb-0">720</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-center p-3 border rounded-3">
                          <h5 className="fw-bold mb-2" style={{ color: '#06038F' }}>Class Size</h5>
                          <p className="mb-0">60 students per class</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-center p-3 border rounded-3">
                          <h5 className="fw-bold mb-2" style={{ color: '#06038F' }}>Duration</h5>
                          <p className="mb-0">12 weeks</p>
            </div>
            </div>
          </div>
          
                    <div className="text-start">
                      <p className="text-muted mb-3" style={{ fontSize: 'clamp(16px, 4vw, 20px)', lineHeight: '1.8' }}>
                        <strong>On-site Coordinators:</strong> Each school to nominate 2 coordinators, trained for 15 days prior to launch
                      </p>
                    </div>
                  </div>
        </div>
      </div>

              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h4 className="h4 fw-bold text-center mb-4">The pilot will:</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '35px', height: '35px', fontSize: '14px', backgroundColor: '#06038F' }}>
                          <i className="fas fa-check">1</i>
                        </div>
                        <span className="text-muted">Bridge gaps in English and Math through live online teaching.</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '35px', height: '35px', fontSize: '14px', backgroundColor: '#06038F' }}>
                          <i className="fas fa-check">2</i>
                        </div>
                        <span className="text-muted">Train teachers in modern pedagogy.</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '35px', height: '35px', fontSize: '14px', backgroundColor: '#06038F' }}>
                          <i className="fas fa-check">3</i>
                        </div>
                        <span className="text-muted">Use short-cycle assessments for continuous feedback.</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '35px', height: '35px', fontSize: '14px', backgroundColor: '#06038F' }}>
                          <i className="fas fa-check">4</i>
                        </div>
                        <span className="text-muted">Provide student counseling and guidance.</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '35px', height: '35px', fontSize: '14px', backgroundColor: '#06038F' }}>
                          <i className="fas fa-check">5</i>
                        </div>
                        <span className="text-muted">Build a scalable model for wider rollout.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="mb-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-4">
                <h2 className="display-6 fw-bold text-dark mb-4">Why Policymakers Should Partner with NEIEA</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', backgroundColor: '#06038F' }}>
                        <span className="fw-bold">1</span>
                      </div>
                      <h5 className="fw-bold mb-0" style={{ color: '#06038F' }}>Proven Impact</h5>
                    </div>
                    <p className="text-muted mb-0">Demonstrated success in Karnataka government schools.</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', backgroundColor: '#06038F' }}>
                        <span className="fw-bold">2</span>
                      </div>
                      <h5 className="fw-bold mb-0" style={{ color: '#06038F' }}>Affordable & Scalable</h5>
                    </div>
                    <p className="text-muted mb-0">Uses existing school infrastructure with minimal additional cost.</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', backgroundColor: '#06038F' }}>
                        <span className="fw-bold">3</span>
                      </div>
                      <h5 className="fw-bold mb-0" style={{ color: '#06038F' }}>Dual Focus</h5>
                    </div>
                    <p className="text-muted mb-0">Improves student outcomes while strengthening teacher capacity.</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', backgroundColor: '#06038F' }}>
                        <span className="fw-bold">4</span>
                      </div>
                      <h5 className="fw-bold mb-0" style={{ color: '#06038F' }}>Policy Alignment</h5>
                    </div>
                    <p className="text-muted mb-0">Directly supports NEP 2020 goals of equity, technology integration, and foundational learning.</p>
                  </div>
            </div>
            <div className="col-lg-6">
                  <div className="h-100 p-4 bg-white rounded-3 shadow-sm border-start style={{ borderColor: '#06038F' }} border-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', backgroundColor: '#06038F' }}>
                        <span className="fw-bold">5</span>
                      </div>
                      <h5 className="fw-bold mb-0" style={{ color: '#06038F' }}>Sustainability</h5>
                    </div>
                    <p className="text-muted mb-0">Builds local capacity for long-term transformation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-3 py-4" style={{ backgroundColor: '#f8f9fa', paddingTop: 'clamp(1.5rem, 3vw, 3rem)', paddingBottom: 'clamp(1.5rem, 3vw, 3rem)' }}>
          <div className="row justify-content-center">
            <div className="col-lg-20">
              <div className="text-center mb-4">
                <h2 className="display-6 fw-bold text-dark mb-4">A Call to Action</h2>
                <div className="border-top border-3 mx-auto" style={{ width: '80px', borderColor: '#06038F' }}></div>
              </div>
              <div className="row justify-content-center mb-4">
                <div className="col-lg-8">
                  <p className="text-muted fs-5 lh-lg" style={{ fontSize: '20px', lineHeight: '1.8' }}>
                    The challenges facing India's government schools are immense, but they are not insurmountable. NEIEA has developed a model that is both <strong>practical</strong> and transformative, already showing measurable results. By partnering with NEIEA, policymakers can:
                  </p>
                </div>
              </div>
              <div className="row justify-content-center mb-5">
                <div className="col-lg-8">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '35px', height: '35px', backgroundColor: '#06038F', fontSize: '14px' }}>
                          <i className="fas fa-check"> 1</i>
                        </div>
                        <span className="text-muted">Strengthen English, Math, and Science outcomes.</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '35px', height: '35px', backgroundColor: '#06038F', fontSize: '14px' }}>
                          <i className="fas fa-check">2</i>
                        </div>
                        <span className="text-muted">Equip teachers with 21st-century skills.</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '35px', height: '35px', backgroundColor: '#06038F', fontSize: '14px' }}>
                          <i className="fas fa-check">3</i>
                        </div>
                        <span className="text-muted">Ensure that marginalized children are not left behind.</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '35px', height: '35px', backgroundColor: '#06038F', fontSize: '14px' }}>
                          <i className="fas fa-check">4</i>
                        </div>
                        <span className="text-muted">Build pathways to higher education and employability.</span>
                      </div>
                    </div>
                  </div>
        </div>
      </div>

              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="bg-white rounded-3 shadow p-5 text-start">
                    <p className="fs-6 fs-md-5 text-muted mb-4 fw-medium">
                      <strong>We invite the Department of Education and State Governments to collaborate with NEIEA in scaling this model across India's public school system.</strong> Together, we can ensure that every child learns, grows, and succeeds.
                    </p>
                    <p className="fs-5 fs-md-4 fs-lg-3 fw-bold mb-0 text-center" style={{ color: '#06038F' }} fst-italic>
              When a child learns, a community rises.
            </p>
          </div>
        </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default PublicGovernmentSchool;