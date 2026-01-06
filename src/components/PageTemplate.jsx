import React from 'react';

const PageTemplate = ({ 
  breadcrumbPath, 
  title, 
  subtitle, 
  description, 
  children,
  heroImage = null,
  heroVideoUrl = null,
  videoLink = null,
  showHeroSection = true 
}) => {
  console.log('PageTemplate received heroVideoUrl:', heroVideoUrl);
  return (
    <div className="page-template">
      {/* Hero Section with Integrated Breadcrumb */}
      {showHeroSection && (
        <section 
          style={{ 
            background: "linear-gradient(96.15deg, rgba(6, 3, 143, 0.8) 13.5%, rgba(255, 103, 31, 0.8) 83.46%)",
            padding: "0",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Optional overlay for better text readability */}
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.1)",
              zIndex: 1
            }}
          ></div>
          
          {/* Breadcrumb integrated in gradient background */}
          {/* <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <nav aria-label="breadcrumb" style={{ paddingTop: "15px", paddingBottom: "0" }}>
              <ol
                className="breadcrumb mb-0"
                style={{ backgroundColor: "transparent" }}
              >
                <li className="breadcrumb-item">
                  <a
                    href="/"
                    style={{ 
                      color: "rgba(255, 255, 255, 0.9)", 
                      textDecoration: "none",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                    }}
                  >
                    🏠 Home
                  </a>
                </li>
                {breadcrumbPath.map((item, index) => (
                  <React.Fragment key={index}>
                    <li className="breadcrumb-item">
                      {item.link ? (
                        <a
                          href={item.link}
                          style={{ 
                            color: "rgba(255, 255, 255, 0.8)", 
                            textDecoration: "none",
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                          }}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span style={{ 
                          color: "rgba(255, 255, 255, 0.9)",
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                        }}>
                          {item.name}
                        </span>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </nav>
          </div> */}
          
          <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "60px", paddingBottom: "80px" }}>
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h1
                  style={{
                    fontSize: "48px",
                    fontWeight: "700",
                    color: "#ffffff",
                    marginBottom: "20px",
                    lineHeight: "1.2",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  {title}
                </h1>
                {subtitle && (
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#ffffff",
                      marginBottom: "20px",
                      opacity: "0.95",
                      textShadow: "0 1px 3px rgba(0,0,0,0.3)"
                    }}
                  >
                    {subtitle}
                  </h2>
                )}
                {description && (
                  <p
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.6",
                      color: "#ffffff",
                      marginBottom: "0",
                      opacity: "0.9",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                    }}
                  >
                    {description}
                  </p>
                )}
              </div>
              {heroVideoUrl && (
                <div className="col-lg-4">
                  <div className="text-center" style={{ position: 'relative' }}>
                    {heroVideoUrl.includes('youtube.com') || heroVideoUrl.includes('youtu.be') ? (
                      <iframe
                        width="100%"
                        height="300"
                        src={heroVideoUrl}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          borderRadius: "12px",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                          border: "3px solid rgba(255,255,255,0.2)"
                        }}
                      ></iframe>
                    ) : heroVideoUrl.includes('vimeo.com') ? (
                      <iframe
                        src={heroVideoUrl}
                        width="100%"
                        height="300"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={title}
                        style={{
                          borderRadius: "12px",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                          border: "3px solid rgba(255,255,255,0.2)"
                        }}
                      ></iframe>
                    ) : (
                      <video
                        width="100%"
                        height="300"
                        controls
                        style={{
                          borderRadius: "12px",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                          border: "3px solid rgba(255,255,255,0.2)",
                          objectFit: "cover"
                        }}
                      >
                        <source src={heroVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              )}
              {heroImage && !heroVideoUrl && (
                <div className="col-lg-4">
                  <div className="text-center" style={{ position: 'relative' }}>
                    <img
                      src={heroImage}
                      alt={title}
                      className="img-fluid rounded-3 shadow-lg"
                      style={{ 
                        maxHeight: "300px", 
                        objectFit: "cover",
                        border: "3px solid rgba(255,255,255,0.2)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                      }}
                    />
                    {videoLink && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          cursor: 'pointer',
                          zIndex: 10
                        }}
                        onClick={() => {
                          // Open video in new tab
                          window.open(videoLink, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 5v14l11-7z"
                              fill="#06038F"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section style={{ backgroundColor: "#F8F8F8", padding: "60px 0" }}>
        <div className="container">
          {children}
        </div>
      </section>
    </div>
  );
};

export default PageTemplate;
