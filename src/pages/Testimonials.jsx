import React from 'react';
import PageTemplate from '../components/PageTemplate';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jaswinder Kaur",
      role: "Student",
      location: "Nagpur, Maharashtra",
      image: "/assets/images/DOP_Images/Testimonials/Jaswinder kaur  (1).jpg",
      content: "As a 59-year-old from Nagpur, I'm thrilled to have discovered NEIEA. Thanks to Niloufer Ma'am's excellent teaching and patience, I've been able to overcome my doubts and learn effectively. Online classes have made it easy for me to pursue my education, and I'm so grateful for this opportunity. NEIEA has shown me that age is no barrier to learning, and I can't wait to continue my studies. Thank you, NEIEA!"
    },
    {
      id: 2,
      name: "Mohan",
      role: "Student",
      location: "Hyderabad, Telangana",
      image: "/assets/images/DOP_Images/Testimonials/Mohan .jpg",
      content: "I had to leave my education earlier due to personal reasons, but thanks to NEIEA's free online classes, I've been able to continue learning in new ways. The Microsoft Office course for beginners has been a huge help, especially for my business. I can now create advertisements, keep records, and manage my tasks much more efficiently. I'm really impressed with the quality of the classes, and I'm grateful for the opportunity to learn and grow again. NEIEA's support has truly made a difference in my life."
    },
    {
      id: 3,
      name: "Palak",
      role: "Student",
      location: "Patiala, Punjab",
      image: "/assets/images/DOP_Images/Testimonials/palak mehta .jpg",
      content: "Hello, my name is Palak from Patiala, Punjab. I want to share my experience with NEIEA, an online platform offering 100% free courses in subjects like English, Maths, and Science. I completed the foundational English course and truly enjoyed the classes. My mother and younger brother were so impressed by the teaching that they joined as well. Now, I'm pursuing the proficiency-level English course, which is also free. The teachers are cooperative, and NEIEA even provides certificates for their courses. I highly recommend NEIEA to everyone—it's a great opportunity for learning! Thank you, NEIEA!"
    },
    {
      id: 4,
      name: "Shilpa Santhosh",
      role: "Student",
      location: "India",
      image: "/assets/images/defaultProfile2.jpg",
      content: "I sincerely thank NEIEA and Shahbuddin Khan Sir for the opportunity. I'm grateful to be part of the drawing activities. I feel happy and motivated to keep improving and contributing."
    },
     {
       id: 5,
      name: "Md Wais Raza",
      role: "Student",
      location: "Bihar",
       image: "/assets/images/DOP_Images/Testimonials/Md-Wais-Raza.png",
      content: "I am thrilled to share my experience with the NEIEA English proficiency course that is completely free of cost! Actually, I have completed my matriculation from English medium school but even then I used to hesitate before speaking English with others I wanted to speak fluent and flawless English...."
    },
    {
      id: 6,
      name: "Misbah Rehman",
      role: "Student",
      location: "India",
      image: "/assets/images/defaultProfile2.jpg",
      content: "I had to leave my education earlier due to personal reasons, but thanks to NEIEA's free online classes, I've been able to continue learning in new ways. The Microsoft Office course for beginners has been a huge help, especially for my business. I can now create advertisements, keep records, and manage my tasks much more efficiently. I'm really impressed with the quality of the classes, and I'm grateful for the opportunity to learn and grow again. NEIEA's support has truly made a difference in my life."
    },
    {
       id: 7,
      name: "Malik Khan",
      role: "Student",
      location: "Karnataka",
       image: "/assets/images/DOP_Images/Testimonials/Malik_khan.png",
      content: "I took an online course in NEIEA which is regarding spoken English and I was blown away by how much I learned. The instructor was engaging and knowledgeable, and the course material was presented in a clear and concise way ...."
    },
    {
      id: 8,
      name: "Asna Shaikh",
      role: "Student",
      location: "Telangana",
      image: "/assets/images/defaultProfile2.jpg",
      content: "I know how to speak in English but I was hesitant to speak in English in front of others. I was confused, about how to take out this fear. Then I got to know about the NEIEA free English course. I have joined this course. After joining this course, I have seen much improvement in my communication skills...."
    },
    {
      id: 9,
      name: "Shagufta Nemath",
      role: "Student",
      location: "India",
      image: "/assets/images/DOP_Images/Testimonials/Shagufta-Nemat.jpg",
      content: "I am filled with immense joy while telling you that, despite the increasing cost of education, some philanthropists have come together to initiate an organization that aims to uplift those sections of society who not only lack financial resources but also access to basic amenities......"
    },
    {
      id: 10,
      name: "Shaista Parveen Begum",
      role: "Student",
      location: "India",
      image: "/assets/images/DOP_Images/Testimonials/Shaista-Parveen-Begum.png",
      content: "In March, I embarked on my NEIEA class journey with excitement. The course offered a chance to learn without cost and gain knowledge. The instructors, Sree Kutty Ma'am, Zeba Ma'am, and Danish Ali Sir, were inspiring, especially Sir's English skills and his signature address, 'GUYS....'"
    },
    {
      id: 11,
      name: "Shaik Azhar Shareef",
      role: "Student",
      location: "Hyderabad",
      image: "/assets/images/DOP_Images/Testimonials/Shaik-Azhar-Shareef.png",
      content: "Kick off with greetings I am Shaik Azhar Shareef, currently dwelling in Hyderabad Rajendra Nagar. I am pursuing B.com (computer) final year from Osmania University. Anyway, I have completed Board of Secondary Education in English medium. However, I wasn't speaking manifestly in front of people, relatives, strangers......"
    },
    {
      id: 12,
      name: "Amena",
      role: "Student",
      location: "Telangana, Hyderabad",
      image: "/assets/images/defaultProfile2.jpg",
      content: "I am writing this to express my gratitude to NEIEA. When I saw this course I thought it must be a fake why would anyone provide a 3 months free course but it was real joining this course was my best decision. Best of all I felt no student will be bored by the syllabus prepared by them...."
    }
  ];

  const featuredVideos = [
    {
      id: 1,
       title: "From Hesitation to Confidence: My English Journey",
       description: "Watch how NEIEA's English course transformed a student's communication skills and boosted their confidence in speaking.",
       image: "https://img.youtube.com/vi/bqnhdq5MqkA/maxresdefault.jpg",
       type: "Success Story",
       duration: "Video",
       videoUrl: "https://youtu.be/bqnhdq5MqkA"
    },
    {
      id: 2,
       title: "Breaking Language Barriers with NEIEA",
       description: "A heartfelt story of overcoming language challenges and achieving fluency through dedicated learning.",
       image: "https://img.youtube.com/vi/S52K-BLtv9Y/maxresdefault.jpg",
       type: "Inspiring Journey",
       duration: "Short",
       videoUrl: "https://youtube.com/shorts/S52K-BLtv9Y"
    },
    {
      id: 3,
       title: "Life-Changing Education: A Student's Perspective",
       description: "Discover how free quality education opened new doors and created opportunities for personal growth.",
       image: "https://img.youtube.com/vi/vCdBt87eRKI/maxresdefault.jpg",
       type: "Impact Story",
       duration: "Short",
       videoUrl: "https://youtube.com/shorts/vCdBt87eRKI"
     },
     {
       id: 4,
       title: "Empowering Dreams Through Online Learning",
       description: "An authentic account of how NEIEA's innovative teaching methods are transforming lives across communities.",
       image: "https://img.youtube.com/vi/Z9adhx-Wv1E/maxresdefault.jpg",
       type: "Transformation",
       duration: "Video",
       videoUrl: "https://youtu.be/Z9adhx-Wv1E?si=ivYLJThgoCL-2bRL"
    }
  ];

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Testimonials & Featured Stories", link: null }
      ]}
      title="Testimonials & Featured Stories"
      subtitle="Voices of Change"
      description="Hear from students, teachers, parents, and communities whose lives have been transformed through NEIEA's educational programs."
      heroImage="/assets/images/testimonialImage.jpg"
    >
      {/* Testimonials Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 
            style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "40px",
              textAlign: "center"
            }}
          >
            What People Say About NEIEA
          </h3>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id} className="col-lg-4 col-md-6 col-12 mb-4">
             <div 
               className="testimonial-card h-100"
               style={{ 
                 background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                 borderRadius: "20px",
                 padding: "30px 25px",
                 boxShadow: "0 10px 30px rgba(6, 3, 143, 0.08)",
                 border: "1px solid rgba(6, 3, 143, 0.1)",
                 position: "relative",
                 overflow: "hidden",
                 transition: "all 0.3s ease",
                 minHeight: "auto",
                 display: "flex",
                 flexDirection: "column"
               }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(6, 3, 143, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(6, 3, 143, 0.08)";
              }}
            >
              {/* Quote Icon */}
              <div 
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #06038F 0%, #4c46ff 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: "0.9"
                }}
              >
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

               {/* Profile Section */}
               <div className="d-flex align-items-center mb-4">
                 <div 
                   style={{
                     width: "80px",
                     height: "80px",
                     borderRadius: "50%",
                     overflow: "hidden",
                     border: "3px solid #06038F",
                     marginRight: "15px",
                     flexShrink: 0
                   }}
                   className="profile-image-container"
                 >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                     style={{ 
                       width: "100%", 
                       height: "100%", 
                       objectFit: "cover",
                       objectPosition: "center top"
                     }}
                   />
                 </div>
                <div>
                   <h5 
                     style={{ 
                       color: "#212529", 
                       fontWeight: "700", 
                       marginBottom: "8px",
                       fontSize: "18px",
                       fontFamily: "inherit"
                     }}
                     className="testimonial-name"
                   >
                    {testimonial.name}
                  </h5>
                   <p 
                     style={{ 
                       color: "#6c757d", 
                       fontSize: "14px", 
                       margin: "0",
                       fontWeight: "500"
                     }}
                   >
                     📍 {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Testimonial Content */}
              <div 
                style={{
                  backgroundColor: "rgba(6, 3, 143, 0.03)",
                  borderRadius: "15px",
                  padding: "20px",
                  marginTop: "20px",
                  position: "relative",
                  minHeight: "auto",
                  display: "flex",
                  alignItems: "flex-start",
                  flex: "1"
                }}
              >
                <p 
                  style={{ 
                    color: "#495057", 
                    lineHeight: "1.6", 
                    fontSize: "14px",
                    fontStyle: "italic",
                    margin: "0",
                    fontFamily: "inherit"
                  }}
                >
                "{testimonial.content}"
              </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Featured Videos Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 
            style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#212529", 
              marginBottom: "40px",
              textAlign: "center"
            }}
          >
            Video Testimonials
          </h3>
          <p 
            style={{ 
              fontSize: "18px", 
              color: "#6c757d", 
              textAlign: "center",
              marginBottom: "40px",
              maxWidth: "600px",
              margin: "0 auto 40px"
            }}
          >
            Watch authentic video testimonials from our students sharing their personal experiences and success stories with NEIEA.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {featuredVideos.map((video) => (
          <div key={video.id} className="col-lg-6 col-md-12">
            <div 
              className="video-testimonial-card h-100"
              style={{ 
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(6, 3, 143, 0.08)",
                border: "1px solid rgba(6, 3, 143, 0.1)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(6, 3, 143, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(6, 3, 143, 0.08)";
              }}
            >
                <div 
                  style={{
                  height: "280px", 
                  position: "relative",
                  borderRadius: "20px 20px 0 0",
                  overflow: "hidden"
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.videoUrl.includes('shorts') 
                    ? video.videoUrl.split('/shorts/')[1] 
                    : video.videoUrl.includes('youtu.be/') 
                      ? video.videoUrl.split('youtu.be/')[1].split('?')[0]
                      : video.videoUrl.split('v=')[1]?.split('&')[0]
                  }`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ 
                    borderRadius: "20px 20px 0 0",
                    border: "none"
                  }}
                ></iframe>
                </div>
              <div 
                style={{
                  padding: "25px",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span 
                    style={{ 
                      background: "linear-gradient(135deg, #06038F 0%, #4c46ff 100%)",
                      color: "white", 
                      padding: "6px 12px", 
                      borderRadius: "20px", 
                      fontSize: "11px", 
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      boxShadow: "0 4px 12px rgba(6, 3, 143, 0.3)"
                    }}
                  >
                    🎥 {video.type}
                  </span>
                  <span 
                    style={{ 
                      color: "#6c757d", 
                      fontSize: "12px",
                      backgroundColor: "rgba(6, 3, 143, 0.1)",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontWeight: "500"
                    }}
                  >
                    {video.duration}
                  </span>
                </div>
                <h5 
                  style={{ 
                    color: "#212529", 
                    fontWeight: "700", 
                    marginBottom: "12px",
                    lineHeight: "1.4",
                    fontSize: "18px",
                    fontFamily: "inherit"
                  }}
                >
                  {video.title}
                </h5>
                <p 
                  style={{ 
                    color: "#6c757d", 
                    lineHeight: "1.6", 
                    fontSize: "14px",
                    marginBottom: "0",
                    fontFamily: "inherit"
                  }}
                >
                  {video.description}
                </p>
                
                {/* Video Stats */}
                <div 
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                    padding: "10px",
                    backgroundColor: "rgba(6, 3, 143, 0.05)",
                    borderRadius: "12px",
                    gap: "15px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <svg width="16" height="16" fill="#06038F" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span style={{ fontSize: "12px", color: "#06038F", fontWeight: "600" }}>
                      Watch Now
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="14" height="14" fill="#FFD700" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      {/* <div className="row mt-5">
        <div className="col-12 text-center">
          <div 
            style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "40px", 
              borderRadius: "15px" 
            }}
          >
            <h4 
              style={{ 
                color: "#212529", 
                fontWeight: "600", 
                marginBottom: "15px" 
              }}
            >
              Share Your Story
            </h4>
            <p 
              style={{ 
                color: "#6c757d", 
                marginBottom: "25px",
                maxWidth: "600px",
                margin: "0 auto 25px"
              }}
            >
              Have you been impacted by NEIEA's programs? We'd love to hear your story and share it with our community.
            </p>
            <a 
              href="/about-us/contact" 
              className="btn btn-primary"
              style={{
                backgroundColor: "#06038F",
                borderColor: "#06038F",
                padding: "12px 30px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "25px",
                textDecoration: "none"
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div> */}
    </PageTemplate>
  );
};

export default Testimonials;
