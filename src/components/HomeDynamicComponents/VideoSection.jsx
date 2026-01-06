import React from 'react';
import { Link } from 'react-router-dom';

const VideoSection = ({ data }) => {
  // Use dynamic data if available, otherwise fallback to static data
  const innovationData = data || {
    title: "Innovation",
    description: "NEIEA has developed innovative approaches to advance its Vision and Mission. These include: a Blended Learning Model that integrates online teaching with onsite learning through advanced technology and pedagogy; a Partnering Model that fosters collective growth; a Flexible Learning System offering live sessions 16 hours a day, 7 days a week; and a Low-Cost and Free Education Model that makes quality education accessible and affordable for all.",
    image: "/assets/images/innovation__1_-removebg-preview.png",
    buttonText: "Learn more",
    buttonLink: "/about-us/working-model/blended-learning/application-of-technology"
  };

  return (
    <section className="home-video">
      <div className="our-mission">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="om-cont">
                <img src={innovationData.image} alt="Innovation" />
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="om-cont">
                <span>{innovationData.title}</span>
                <p>{innovationData.description}</p>
                <Link className="main-btn" to={innovationData.buttonLink}>
                  {innovationData.buttonText}
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
    </section>
  );
};

export default VideoSection;