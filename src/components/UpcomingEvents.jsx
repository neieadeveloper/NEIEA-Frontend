import React from 'react';

const UpcomingEvents = () => {
  return (
    <section className="upcoming-events event-page section-padding-60">
      <div className="container">
        <div className="ue-head">
          <h3 className="sec-heading">Upcoming Events</h3>
          <a className="main-btn right-btn d-none d-md-block" href="#">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 12H18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 6L18 12L12 18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="ue-cont">
              <a href="#">
                <div className="img-div">
                  <img src="/assets/images/event1.jpg" alt="Philanthropy Summit 2025" />
                </div>
                <span>Philanthropy</span>
                <h4>NEIEA & IPA Philanthropy Summit 2025</h4>
                <p>Oct 02, 2025</p>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="ue-cont">
              <a href="#">
                <div className="img-div">
                  <img src="/assets/images/event2.jpg" alt="US Forum 2025" />
                </div>
                <span>Civic Engagement & Social Impact</span>
                <h4>NEIEA US Forum 2025</h4>
                <p>Oct 03, 2025</p>
              </a>
            </div>
          </div>
        </div>
        <div className="mob-div text-center d-block d-md-none">
          <a className="main-btn" href="#">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 12H18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 6L18 12L12 18" stroke="#06038F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;