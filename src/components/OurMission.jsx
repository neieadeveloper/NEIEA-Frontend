import React from 'react';
import { Link } from 'react-router-dom';
import './OurMission.css';

const OurMission = () => {
  return (
    <>
      {/* First Section - Image Left */}
      <div className="our-mission">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-1 order-lg-1">
              <div className="om-cont">
                <span>Our Mission</span>
                <p>We are dedicated to ensuring that there is no loss of potential and wastage of a child's life, due to inequities in education. Our mission is to create an inclusive educational system that delivers high-quality learning which is affordable, scalable, and transformative.</p>
                <span>Our Vision</span>
                <p>To create a society that upholds the sanctity of every human life, rejects all forms of discrimination, and aspires to build a peaceful, compassionate, and sustainable world.</p>
                <Link className="main-btn" to="/about-us/introduction">
                  Explore more
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 12H18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6L18 12L12 18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 order-2 order-lg-2">
              <div className="om-cont">
                        <img src="/assets/images/homegroup.png" alt="our mission" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Meet Our Leadership */}
      <div className="our-mission leadership-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="om-cont">
                        <img src="/assets/images/leader4.png" alt="Javeed Mirza - Founder & President" />
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="om-cont">
                <span>Meet Our Leadership</span>
                <p>Visionary leaders dedicated to transforming education and empowering communities</p>
                
                <div className="leadership-card">
                  <h3>Javeed Mirza</h3>
                  <h4>Founder & President</h4>
                  <p>Javeed Mirza, Founder and President of NEIEA… A visionary leader with global experience in social and political activism, teaching, business and in research. It was his passionate pursuit for ending inequity and injustice meted out to the marginalized, that made him strive for many decades and build NEIEA…. a low-cost scalable model of education that has the potential to transform global education.</p>
                </div>
                
                <Link className="main-btn" to="/about-us/leadership">
                  Meet Our Full Leadership Team
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 12H18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6L18 12L12 18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurMission;
