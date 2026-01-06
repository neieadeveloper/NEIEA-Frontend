import React from 'react';
import { LeadershipMember } from '@/lib/leadershipApi';

interface BioPreviewProps {
  member: LeadershipMember;
}

const BioPreview: React.FC<BioPreviewProps> = ({ member }) => {
  // Function to decode HTML entities
  const decodeHtmlEntities = (text: string) => {
    if (!text) return text;
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Function to render bio text with clickable links and proper formatting
  const renderBioText = (text: string) => {
    if (!text) return 'Biography information will be updated soon.';
    
    // Decode HTML entities first
    const decodedText = decodeHtmlEntities(text);
    
    // Split text by paragraphs (double newlines)
    const paragraphs = decodedText.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Regular expression to find URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      
      // Split paragraph by URLs to create parts
      const parts = paragraph.split(urlRegex);
      
      return (
        <p key={index} style={{ marginBottom: '1.5rem' }}>
          {parts.map((part, partIndex) => {
            // Check if this part is a URL
            if (urlRegex.test(part)) {
              return (
                <a
                  key={partIndex}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#06038F',
                    textDecoration: 'underline',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#050277';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = '#06038F';
                  }}
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="bio-preview" style={{ padding: "40px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <style>
        {`
          .bio-preview::-webkit-scrollbar {
            width: 0px !important;
            height: 0px !important;
            display: none !important;
          }
          .bio-preview::-webkit-scrollbar-track {
            display: none !important;
          }
          .bio-preview::-webkit-scrollbar-thumb {
            display: none !important;
          }
          .bio-preview {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
        `}
      </style>

      {/* Main Content Container */}
      <div style={{
        display: "flex",
        gap: "60px",
        maxWidth: "1400px",
        margin: "0 auto",
        alignItems: "flex-start"
      }}>
        
        {/* Left Column - Profile Image */}
        <div style={{
          flex: "0 0 400px",
          position: "sticky",
          top: "20px"
        }}>
          <div style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f9fa"
          }}>
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  display: "block"
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  ((e.target as HTMLElement).nextSibling as HTMLElement).style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              style={{
                width: "100%",
                height: "500px",
                backgroundColor: "#06038F",
                display: member.image ? "none" : "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "120px",
                fontWeight: "bold"
              }}
            >
              {decodeHtmlEntities(member.name).charAt(0)}
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div style={{
          flex: "1",
          paddingTop: "20px"
        }}>
          
          {/* Name and Title */}
          <div style={{ marginBottom: "30px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px"
            }}>
              <h1 style={{
                fontSize: "48px",
                fontWeight: "700",
                color: "#2c3e50",
                marginBottom: "0",
                lineHeight: "1.2",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                flex: "1"
              }}>
                {decodeHtmlEntities(member.name)}
              </h1>
            </div>
            
            <h2 style={{
              fontSize: "28px",
              fontWeight: "400",
              color: "#5a6c7d",
              marginBottom: "0",
              lineHeight: "1.3"
            }}>
              {decodeHtmlEntities(member.title)}
            </h2>
          </div>

          {/* Biography Section */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{
              fontSize: "18px",
              lineHeight: "1.8",
              color: "#4a5568",
              textAlign: "left",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}>
              {renderBioText(member.fullBio || member.description || 'Biography information will be updated soon.')}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BioPreview;
