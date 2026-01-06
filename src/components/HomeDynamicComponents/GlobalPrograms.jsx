import React from 'react';
import { Link } from 'react-router-dom';

const GlobalPrograms = ({ data }) => {
  // Use dynamic data if available, otherwise fallback to static data
  const globalProgramsData = data || {
    title1: "Collective Working Through Partnerships",
    description1: "NEIEA's partnership model is rooted in collective effort. Partner institutions provide infrastructure, student safety, and classroom coordination, while NEIEA delivers high-quality content, innovative pedagogy, and live teaching. Together, they actively involve parents in the learning process, ensuring stronger student outcomes. NEIEA also enhances the capacity of partner institutions by training their teachers in pedagogy, technology, classroom management, and English proficiency.",
    title2: "Open-Source Approach:",
    description2: "NEIEA makes its content materials freely available to all institutions that wish to adopt and benefit from its model, reinforcing its commitment to equitable and collaborative education.",
    image: "/assets/images/HomImages/HomePartnership.png",
    buttonText: "Learn more",
    buttonLink: "/partners/institutions"
  };

  return (
    <section className="global-program">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="gp-cont">
              <h1 className="sec-heading">{globalProgramsData.title1}</h1>
              <p>{globalProgramsData.description1}</p>
              {/* <h1 className="sec-heading mt-4">{globalProgramsData.title2}</h1> */}
              <p><strong>{globalProgramsData.title2}</strong> {globalProgramsData.description2}</p>
              <Link className="main-btn" to={globalProgramsData.buttonLink}>
                {globalProgramsData.buttonText}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 12H18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 6L18 12L12 18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="gp-cont">
              <img src={globalProgramsData.image} alt="Global Map" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPrograms;