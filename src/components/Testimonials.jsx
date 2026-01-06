import React, { useEffect } from 'react';

const Testimonials = () => {
  useEffect(() => {
    // Initialize Owl Carousel for testimonials
    const initTestimonialCarousel = () => {
      if (window.$ && window.$.fn.owlCarousel) {
        try {
          // Destroy existing carousel if it exists
          const $carousel = $('.testimonial-car');
          if ($carousel.hasClass('owl-carousel')) {
            $carousel.trigger('destroy.owl.carousel');
            $carousel.removeClass('owl-carousel owl-theme');
          }
          
          // Ensure DOM elements exist
          if ($carousel.length > 0) {
            // Reinitialize
            $carousel.addClass('owl-carousel owl-theme').owlCarousel({
              items: 1,
              loop: true,
              autoplay: true,
              autoplayTimeout: 5000,
              autoplayHoverPause: true,
              nav: false,
              dots: true,
              animateOut: 'fadeOut',
              animateIn: 'fadeIn',
              smartSpeed: 600,
              responsive: {
                0: { items: 1 },
                768: { items: 1 },
                1024: { items: 1 }
              }
            });
            console.log('Testimonial carousel initialized successfully');
          } else {
            console.log('Testimonial carousel element not found, retrying...');
            setTimeout(initTestimonialCarousel, 100);
          }
        } catch (error) {
          console.error('Error initializing testimonial carousel:', error);
          setTimeout(initTestimonialCarousel, 100);
        }
      } else {
        // Wait for scripts to load with timeout limit
        const retryCount = (window.owlRetryCount || 0) + 1;
        if (retryCount < 100) { // Max 10 seconds
          window.owlRetryCount = retryCount;
          setTimeout(initTestimonialCarousel, 100);
        } else {
          console.error('Owl Carousel failed to load after 10 seconds');
        }
      }
    };

    // Multiple initialization attempts
    const initWithDelay = () => {
      // Immediate attempt
      initTestimonialCarousel();
      
      // Fallback attempts
      setTimeout(initTestimonialCarousel, 500);
      setTimeout(initTestimonialCarousel, 1000);
      setTimeout(initTestimonialCarousel, 2000);
    };

    // Wait for DOM to be ready
    if (document.readyState === 'complete') {
      initWithDelay();
    } else {
      window.addEventListener('load', initWithDelay);
    }
    
    // Cleanup function
    return () => {
      if (window.$ && window.$.fn.owlCarousel) {
        try {
          $('.testimonial-car').trigger('destroy.owl.carousel');
        } catch (error) {
          console.error('Error destroying carousel:', error);
        }
      }
      window.removeEventListener('load', initWithDelay);
    };
  }, []);

  return (
    <section className="testimonials">
      <div className="container">
        <div className="owl-carousel owl-theme testimonial-car">
          <div className="item">
            <div className="row">
              <div className="col-lg-5">
                <div className="test-cont">
                  <img className="d-block d-md-none" src="/assets/images/Quotes4.png" alt="Quote" />
                  <img src="/assets/images/kaur1.jpeg" alt="Jaswinder Kaur" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="test-cont">
                  <div className="profile-name d-block d-md-none mt-4 mb-4">
                    <h5>Jaswinder Kaur</h5>
                    <p></p>
                  </div>
                  <img className="d-none d-md-block" src="/assets/images/Quotes4.png" alt="Quote" />
                  <p>As a 59-year-old from Nagpur, I'm thrilled to have discovered NEIEA. Thanks to Niloufer Ma'am's excellent teaching and patience, I've been able to overcome my doubts and learn effectively. Online classes have made it easy for me to pursue my education, and I'm so grateful for this opportunity. NEIEA has shown me that age is no barrier to learning, and I can't wait to continue my studies. Thank you, NEIEA!</p>
                  <div className="profile-name d-none d-md-block">
                    <h5>Jaswinder Kaur</h5>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="row">
              <div className="col-lg-5">
                <div className="test-cont">
                  <img className="d-block d-md-none" src="/assets/images/Quotes2.png" alt="Quote" />
                  <img src="/assets/images/HomImages/MohanImageHome.png" alt="Mohan" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="test-cont">
                  <div className="profile-name d-block d-md-none mt-4 mb-4">
                    <h5>Mohan</h5>
                    <p>Hyderabad, Telangana</p>
                  </div>
                  <img className="d-none d-md-block" src="/assets/images/Quotes2.png" alt="Quote" />
                  <p>I had to leave my education earlier due to personal reasons, but thanks to NEIEA's free online classes, I've been able to continue learning in new ways. The Microsoft Office course for beginners has been a huge help, especially for my business. I can now create advertisements, keep records, and manage my tasks much more efficiently. I'm really impressed with the quality of the classes, and I'm grateful for the opportunity to learn and grow again. NEIEA's support has truly made a difference in my life.</p>
                  <div className="profile-name d-none d-md-block">
                    <h5>Mohan</h5>
                    <p>Hyderabad, Telangana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="row">
              <div className="col-lg-5">
                <div className="test-cont">
                  <img className="d-block d-md-none" src="/assets/images/Quotes1.png" alt="Quote" />
                  <img src="/assets/images/waise12.png" alt="Md Wais Raza" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="test-cont">
                  <div className="profile-name d-block d-md-none mt-4 mb-4">
                    <h5>Md Wais Raza</h5>
                    <p>Bihar, India</p>
                  </div>
                  <img className="d-none d-md-block" src="/assets/images/Quotes1.png" alt="Quote" />
                  <p>I am thrilled to share my experience with the NEIEA English proficiency course that is completely free of cost! Actually, I have completed my matriculation from English medium school but even then I used to hesitate before speaking English with others I wanted to speak fluent and flawless English....</p>
                  <div className="profile-name d-none d-md-block">
                    <h5>Md Wais Raza</h5>
                    <p>Bihar, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="row">
              <div className="col-lg-5">
                <div className="test-cont">
                  <img className="d-block d-md-none" src="/assets/images/Quotes3.png" alt="Quote" />
                  <img src="/assets/images/malik khan .png" alt="Malik Khan" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="test-cont">
                  <div className="profile-name d-block d-md-none mt-4 mb-4">
                    <h5>Malik Khan</h5>
                    <p>Karnataka India</p>
                  </div>
                  <img className="d-none d-md-block" src="/assets/images/Quotes3.png" alt="Quote" />
                  <p>I took an online course in NEIEA which is regarding spoken English and I was blown away by how much I learned. The instructor was engaging and knowledgeable, and the course material was presented in a clear and concise way ....</p>
                  <div className="profile-name d-none d-md-block">
                    <h5>Malik Khan</h5>
                    <p>Karnataka India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="row">
              <div className="col-lg-5">
                <div className="test-cont" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "20px" }}>
                  <img className="d-block d-md-none" src="/assets/images/Quotes1.png" alt="Quote" />
                  {/* Video Container */}
                  <div 
                    style={{ 
                      width: "280px", 
                      height: "200px", 
                      borderRadius: "15px", 
                      overflow: "hidden",
                      boxShadow: "0 8px 25px rgba(6, 3, 143, 0.15)",
                      border: "3px solid #06038F",
                      marginLeft: "20px",
                      marginTop: "10px"
                    }}
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/bqnhdq5MqkA"
                      title="NEIEA Student Video Testimonial"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ borderRadius: "12px" }}
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="test-cont">
                  <div className="profile-name d-block d-md-none mt-4 mb-4">
                    <h5>Mr. Kodandram Reddy</h5>
                    <p>MLC, Telangana</p>
                  </div>
                  <img className="d-none d-md-block" src="/assets/images/Quotes1.png" alt="Quote" />
                  <p>A sincere message of gratitude and appreciation from our community members, acknowledging NEIEA's dedication to providing quality education and making a positive impact in people's lives.</p>
                  <div className="profile-name d-none d-md-block">
                    <h5>Mr. Kodandram Reddy</h5>
                    <p>MLC, Telangana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;