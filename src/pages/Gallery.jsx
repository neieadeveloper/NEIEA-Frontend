import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Images', count: 59 },
    { id: 'events', name: 'Events', count: 20 },
    { id: 'leadership', name: 'Leadership', count: 12 },
    { id: 'partnerships', name: 'Partnerships', count: 8 },
    { id: 'workshops', name: 'Workshops', count: 6 },
    { id: 'digital', name: 'Digital', count: 13 }
  ];

  const galleryItems = [
    // Leadership Category
    { id: 1, title: "Dr. K.N. Anandan", category: "leadership", image: "/assets/images/gallary/anandan-sir.png", description: "Educational Visionary and Co-Founder", year: "2023" },
    { id: 2, title: "Meeting with Mr. Jeffrey Sachs", category: "leadership", image: "/assets/images/gallary/With-Mr-Jeffrey-Sachs-chief-strategist-for-the-Sustainable-development-Goals-SDG.jpg", description: "Chief Strategist for Sustainable Development Goals (SDG)", year: "2023" },
    { id: 3, title: "Javeed Mirza Leadership", category: "leadership", image: "/assets/images/gallary/Javeed1.jpg", description: "Community Leadership and Vision", year: "2023" },
    { id: 4, title: "Javeed Mirza with Community", category: "leadership", image: "/assets/images/gallary/Javeed2.jpg", description: "Building Educational Networks", year: "2023" },
    { id: 5, title: "Strategic Leadership", category: "leadership", image: "/assets/images/gallary/Javeed3.jpg", description: "Educational Strategy Development", year: "2023" },
    { id: 6, title: "Esteemed Gathering", category: "leadership", image: "/assets/images/gallary/An-esteemed-moment-Ashraf-Mr.Rashid.png", description: "Notable Educational Leaders", year: "2023" },
    { id: 7, title: "Prof. Asif Rameez Doudi", category: "leadership", image: "/assets/images/gallary/Prof-Asif-Rameez-All-Event-in-Jeddah.png", description: "President of Indo-Arab Helping Hands", year: "2023" },
    { id: 8, title: "Community Leaders in Jeddah", category: "leadership", image: "/assets/images/gallary/Javeed-Mirza-with-Community-Leaders-Gathering-in-Jeddah.png", description: "Educational Leadership Gathering", year: "2023" },
    { id: 9, title: "Educational Growth Discussion", category: "leadership", image: "/assets/images/gallary/Ashraf-Shah-sheds-light-on-the-educational-growth-of-minorities-in-India-during-his-enlightening-discussion-at-Riyad.png", description: "Minorities Education in India", year: "2023" },
    { id: 10, title: "NEIUSA Leadership", category: "leadership", image: "/assets/images/gallary/Pics-for-NEIUSA-7.png", description: "NEIUSA Educational Leadership", year: "2023" },
    { id: 11, title: "NEIUSA Team", category: "leadership", image: "/assets/images/gallary/Pics-for-NEIUSA-10.png", description: "NEIUSA Leadership Team", year: "2023" },
    { id: 12, title: "Educational Innovation", category: "leadership", image: "/assets/images/gallary/12.png", description: "Innovation in Education", year: "2023" },

    // Events Category
    { id: 13, title: "Education For All - Riyadh", category: "events", image: "/assets/images/gallary/the-collaboration-of-community-leaders-at-NEIEAs-impactful-event-in-Riyad.png", description: "Community Leaders Collaboration", year: "2023" },
    { id: 14, title: "Education For All - Jeddah", category: "events", image: "/assets/images/gallary/the-collaboration-of-community-leaders-at-NEIEAs-impactful-event-a-talk-on-Education-For-All-in-Riyad.png", description: "Educational Talk in Jeddah", year: "2023" },
    { id: 15, title: "Mr. Javeed Mirza's Discourse", category: "events", image: "/assets/images/gallary/Mr.-Javeed-Mirzas-Inspiring-Discourse-on-Education-For-All-in-Jeddah.png", description: "Inspiring Educational Discourse", year: "2023" },
    { id: 16, title: "Educational Talk in Dammam", category: "events", image: "/assets/images/gallary/Mr.-Javeed-Mirzas-Impactful-Talk-on-Education-for-All-in-Dammam.png", description: "Education For All in Dammam", year: "2023" },
    { id: 17, title: "Talk with Former MP", category: "events", image: "/assets/images/gallary/Mr.-Javeed-Mirza-with-Former-MP-and-HRD-Minister-Mr.-Mohammad-Ali-Ashraf-Fatmi-at-a-thought-provoking-talk-on-Education-For-All-in-Riyad.png", description: "With Former MP and HRD Minister", year: "2023" },
    { id: 18, title: "Conversations in Riyadh", category: "events", image: "/assets/images/gallary/Mr.-Javeed-Mirza-Engages-in-Conversations-with-Mr.-S-M-Arif-Shah-at-Education-for-All-Event-in-Riyad.png", description: "Educational Conversations", year: "2023" },
    { id: 19, title: "Ms. Tasneem's Mission Talk", category: "events", image: "/assets/images/gallary/Ms.-Tasneem-Unveils-NEIEAs-Mission-in-Educational-Talk-at-Riyadh.png", description: "Mission Explanation in Riyadh", year: "2023" },
    { id: 20, title: "Ms. Tasneem in Jeddah", category: "events", image: "/assets/images/gallary/Ms.-Tasneem-Inspires-at-Education-for-All-Talk-in-Jeddah-Capturing-the-moment-when-Ms.-Tasneem-passionately-explains-NEIEAs-mission.png", description: "Inspiring Talk in Jeddah", year: "2023" },
    { id: 21, title: "Ms. Tasmia's Views", category: "events", image: "/assets/images/gallary/Ms.-Tasmia-passionately-express-her-views-on-the-crucial-need-for-education-during-the-Education-for-All-event-in-Riyad.png", description: "Education Need Discussion", year: "2023" },
    { id: 22, title: "NEIEA Event in Riyadh", category: "events", image: "/assets/images/gallary/NEIEAs-Event-in-Riyad-Brings-Together-Influential-Leaders-in-Jeddah.png", description: "Influential Leaders Gathering", year: "2023" },
    { id: 23, title: "Exhibition Event", category: "events", image: "/assets/images/gallary/exhibition.jpg", description: "NEIEA Educational Exhibition", year: "2023" },
    { id: 24, title: "RIFAH Expo", category: "events", image: "/assets/images/gallary/rifah-expo.jpg", description: "Educational Expo Participation", year: "2023" },
    { id: 25, title: "Community Event 1", category: "events", image: "/assets/images/gallary/WhatsApp-Image-2023-09-21-at-21.35.55.jpg", description: "Community Engagement", year: "2023" },
    { id: 26, title: "Educational Workshop", category: "events", image: "/assets/images/gallary/WhatsApp-Image-2023-09-21-at-11.26.13.jpg", description: "Learning Workshop", year: "2023" },
    { id: 27, title: "Interactive Session", category: "events", image: "/assets/images/gallary/WhatsApp-Image-2023-09-21-at-11.24.28.jpg", description: "Student Interaction", year: "2023" },
    { id: 28, title: "Learning Activities", category: "events", image: "/assets/images/gallary/WhatsApp-Image-2023-09-21-at-11.24.27.jpg", description: "Educational Activities", year: "2023" },
    { id: 29, title: "Group Learning", category: "events", image: "/assets/images/gallary/WhatsApp-Image-2023-09-21-at-11.24.22.jpg", description: "Collaborative Learning", year: "2023" },
    { id: 30, title: "Summer Program", category: "events", image: "/assets/images/gallary/WhatsApp-Image-2023-07-27-at-18.24.020-e1690752966368.jpg", description: "Summer Learning Program", year: "2023" },
    { id: 31, title: "Educational Activities", category: "events", image: "/assets/images/gallary/WhatsApp-Image-2023-07-27-at-18.24.018-e1690753006634.jpg", description: "Interactive Learning", year: "2023" },
    { id: 32, title: "Hyderabad Event 1", category: "events", image: "/assets/images/gallary/hyd1.jpg", description: "Educational Event in Hyderabad", year: "2023" },

    // Partnerships Category
    { id: 33, title: "Partnership with Education Above All", category: "partnerships", image: "/assets/images/gallary/with-Mr-Fahad-Al-Sulaiti-CEO-of-Education-Above-All-EAA-the-global-educational-ageny-of-the-Qatar-government.jpg", description: "CEO of Education Above All (EAA)", year: "2023" },
    { id: 34, title: "Institutional Partnerships", category: "partnerships", image: "/assets/images/gallary/for-institutions.jpg", description: "Educational Institution Partnerships", year: "2023" },
    { id: 35, title: "TMRIES Partnership", category: "partnerships", image: "/assets/images/gallary/tmeris.png", description: "TMRIES Educational Partnership", year: "2023" },
    { id: 36, title: "NEIEA Website Gallery", category: "partnerships", image: "/assets/images/gallary/NEIEA-Website-Gallery-2.0.png", description: "Partnership Showcase", year: "2023" },
    { id: 37, title: "Partnership Gallery 1", category: "partnerships", image: "/assets/images/gallary/NEIEA-Website-Gallery-2.0-1.png", description: "Educational Partnerships", year: "2023" },
    { id: 38, title: "Partnership Gallery 2", category: "partnerships", image: "/assets/images/gallary/NEIEA-Website-Gallery-2.0-2.png", description: "Global Partnerships", year: "2023" },
    { id: 39, title: "Educational Innovation", category: "partnerships", image: "/assets/images/gallary/image.png", description: "Innovation Partnership", year: "2023" },
    { id: 40, title: "Hyderabad Partnership", category: "partnerships", image: "/assets/images/gallary/hyd2.jpg", description: "Local Educational Partnerships", year: "2023" },

    // Workshops Category
    { id: 41, title: "Design Workshop 1", category: "workshops", image: "/assets/images/gallary/Untitled-design-3.jpg", description: "Creative Design Workshop", year: "2023" },
    { id: 42, title: "Design Workshop 2", category: "workshops", image: "/assets/images/gallary/Untitled-design-5.jpg", description: "Educational Design Session", year: "2023" },
    { id: 43, title: "Neon Light Workshop 1", category: "workshops", image: "/assets/images/gallary/neol4.jpg", description: "Creative Learning Workshop", year: "2023" },
    { id: 44, title: "Neon Light Workshop 2", category: "workshops", image: "/assets/images/gallary/neol5.jpg", description: "Innovation Workshop", year: "2023" },
    { id: 45, title: "Creative Workshop", category: "workshops", image: "/assets/images/gallary/neonl3.jpg", description: "Creative Problem Solving", year: "2023" },

    // Digital Category
    { id: 46, title: "Online Learning", category: "digital", image: "/assets/images/gallary/web-1.jpg", description: "Digital Platform Development", year: "2023" },
    { id: 47, title: "Online Learning", category: "digital", image: "/assets/images/gallary/web-2.jpg", description: "Online Learning Platform", year: "2023" },
    { id: 48, title: "Online Learning", category: "digital", image: "/assets/images/gallary/web-3.jpg", description: "Educational Technology", year: "2023" },
    { id: 49, title: "Online Learning", category: "digital", image: "/assets/images/gallary/web-4.jpg", description: "Digital Learning Tools", year: "2023" },
    { id: 50, title: "Online Learning", category: "digital", image: "/assets/images/gallary/web-5.jpg", description: "Web-based Education", year: "2023" },
    { id: 51, title: "Online Learning", category: "digital", image: "/assets/images/gallary/web-6.jpg", description: "Digital Education Platform", year: "2023" },
    { id: 52, title: "Empowering the Future", category: "digital", image: "/assets/images/gallary/web1.jpg", description: "User Interface Design", year: "2023" },
    { id: 53, title: "Voices of Change", category: "digital", image: "/assets/images/gallary/web1-1.jpg", description: "Digital Interface Development", year: "2023" },
    { id: 54, title: "Celebrating Diversity", category: "digital", image: "/assets/images/gallary/web1-2.jpg", description: "Educational Web Design", year: "2023" },
    { id: 55, title: "Celebrating Our Impact", category: "digital", image: "/assets/images/gallary/web1-3.jpg", description: "Learning Platform Interface", year: "2023" },
    { id: 56, title: "Building Bridges", category: "digital", image: "/assets/images/gallary/web2-1.jpg", description: "Educational Web Platform", year: "2023" },
    { id: 57, title: "Inclusive Education for All", category: "digital", image: "/assets/images/gallary/web271.jpg", description: "Digital Learning Environment", year: "2023" },
    { id: 58, title: "Community Engagement", category: "digital", image: "/assets/images/gallary/web272.jpg", description: "Online Education System", year: "2023" },
    { id: 59, title: "Transformative Learning", category: "digital", image: "/assets/images/gallary/web273.jpg", description: "Digital Education Framework", year: "2023" }
  ];

  const reversedGalleryImages = [...galleryItems].reverse();

  const filteredItems = activeCategory === 'all' 
    ? reversedGalleryImages 
    : reversedGalleryImages.filter(item => item.category === activeCategory);

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Media and Events", link: null },
        { name: "Gallery", link: null }
      ]}
      title="Our Visual Journey"
      subtitle="NEIEA Gallery"
      description="Explore our journey through education, innovation, and community impact. From leadership meetings to community events, discover the moments that shape our mission."
      heroImage="/assets/images/gallary/exhibition.jpg"
    >
      {/* Filter Categories */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-center flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`btn ${activeCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                style={{
                  backgroundColor: activeCategory === category.id ? '#06038F' : 'transparent',
                  borderColor: '#06038F',
                  color: activeCategory === category.id ? 'white' : '#06038F',
                  padding: "8px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  borderRadius: "20px",
                  transition: "all 0.2s ease"
                }}
              >
                {category.name}
                <span 
                  style={{ 
                    marginLeft: "8px", 
                    fontSize: "12px",
                    opacity: "0.8"
                  }}
                >
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="row g-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="col-lg-4 col-md-6">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{ 
                borderRadius: "12px", 
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
              }}
            >
              <div style={{ height: "220px", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span 
                    style={{ 
                      backgroundColor: "#06038F", 
                      color: "white", 
                      padding: "3px 8px", 
                      borderRadius: "10px", 
                      fontSize: "10px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {categories.find(cat => cat.id === item.category)?.name}
                  </span>
                  <span style={{ color: "#6c757d", fontSize: "11px", fontWeight: "500" }}>
                    {item.year}
                  </span>
                </div>
                <h6 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "600", 
                    marginBottom: "8px",
                    fontSize: "15px",
                    lineHeight: "1.3"
                  }}
                >
                  {item.title}
                </h6>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    lineHeight: "1.4", 
                    fontSize: "12px",
                    margin: "0"
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Section */}
      {/* <div className="row mt-5">
        <div className="col-12">
          <div 
            style={{ 
              backgroundColor: "#06038F", 
              color: "white",
              padding: "35px", 
              borderRadius: "12px",
              textAlign: "center"
            }}
          >
            <h3 
              style={{ 
                color: "white", 
                fontWeight: "700", 
                marginBottom: "25px",
                fontSize: "28px"
              }}
            >
              Our Impact in Numbers
            </h3>
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-3">
                <div>
                  <h2 style={{ color: "white", fontWeight: "700", fontSize: "32px", marginBottom: "8px" }}>
                    500+
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.9)", margin: "0", fontWeight: "500", fontSize: "14px" }}>
                    Educational Events
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <div>
                  <h2 style={{ color: "white", fontWeight: "700", fontSize: "32px", marginBottom: "8px" }}>
                    10,000+
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.9)", margin: "0", fontWeight: "500", fontSize: "14px" }}>
                    Students Reached
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <div>
                  <h2 style={{ color: "white", fontWeight: "700", fontSize: "32px", marginBottom: "8px" }}>
                    200+
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.9)", margin: "0", fontWeight: "500", fontSize: "14px" }}>
                    Partner Institutions
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <div>
                  <h2 style={{ color: "white", fontWeight: "700", fontSize: "32px", marginBottom: "8px" }}>
                    59
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.9)", margin: "0", fontWeight: "500", fontSize: "14px" }}>
                    Gallery Images
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Call to Action */}
      <div className="row mt-4">
        <div className="col-12">
          <div 
            style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "25px", 
              borderRadius: "12px",
              textAlign: "center"
            }}
          >
            <h4 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "15px" 
              }}
            >
              Join Our Visual Story
            </h4>
            <p 
              style={{ 
                color: "#6c757d", 
                marginBottom: "20px",
                maxWidth: "600px",
                margin: "0 auto 20px"
              }}
            >
              Be part of our journey in transforming education. Your support helps us create more moments worth capturing.
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
              <a 
                href="/donate" 
                className="btn btn-primary"
                style={{
                  backgroundColor: "#06038F",
                  borderColor: "#06038F",
                  padding: "12px 25px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "25px",
                  textDecoration: "none"
                }}
              >
                Support Our Mission
              </a>
              <a 
                href="/about-us/contact" 
                className="btn btn-outline-primary"
                style={{
                  borderColor: "#06038F",
                  color: "#06038F",
                  padding: "12px 25px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "25px",
                  textDecoration: "none"
                }}
              >
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Gallery;