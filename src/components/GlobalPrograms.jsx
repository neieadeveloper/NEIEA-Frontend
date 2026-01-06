import React from 'react';
import { Link } from 'react-router-dom';

const GlobalPrograms = () => {
  return (
    <section className="global-program">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="gp-cont">
              <h1 className="sec-heading">Collective Working Through Partnerships</h1>
              <p>NEIEA's partnership model is rooted in collective effort. Partner institutions provide infrastructure, student safety, and classroom coordination, while NEIEA delivers high-quality content, innovative pedagogy, and live teaching. Together, they actively involve parents in the learning process, ensuring stronger student outcomes. NEIEA also enhances the capacity of partner institutions by training their teachers in pedagogy, technology, classroom management, and English proficiency.</p>
              <p><strong>Open-Source Approach:</strong> NEIEA makes its content materials freely available to all institutions that wish to adopt and benefit from its model, reinforcing its commitment to equitable and collaborative education.</p>
              <Link className="main-btn" to="/partners/institutions">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 12H18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 6L18 12L12 18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="gp-cont">
              <img src="/assets/images/HomImages/HomePartnership.png" alt="Global Map" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPrograms;