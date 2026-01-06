import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [location.search]);

  // Define searchable content structure
  const searchableContent = [
    // About NEIEA
    { title: "Introduction", path: "/about-us/introduction", keywords: "about introduction neiea mission vision organization", category: "About NEIEA" },
    { title: "Leadership", path: "/about-us/leadership", keywords: "leadership team board directors javeed mirza", category: "About NEIEA" },
    { title: "Testimonials & Featured Stories", path: "/about-us/testimonials", keywords: "testimonials stories success feedback", category: "About NEIEA" },
    { title: "Gallery", path: "/about-us/media-events/gallery", keywords: "gallery images photos media events", category: "About NEIEA" },
    { title: "Reports and Financials", path: "/about-us/reports-financials", keywords: "reports financials annual documents", category: "About NEIEA" },
    { title: "Contact Us", path: "/about-us/contact", keywords: "contact address email phone location", category: "About NEIEA" },

    // Our Working Model
    { title: "Blended Learning", path: "/about-us/working-model/blended-learning", keywords: "blended learning hybrid education methodology", category: "Our Working Model" },
    { title: "Discourse-Oriented Pedagogy", path: "/about-us/working-model/blended-learning/discourse-oriented-pedagogy", keywords: "discourse pedagogy teaching methodology", category: "Our Working Model" },
    { title: "Application of Technology", path: "/about-us/working-model/blended-learning/application-of-technology", keywords: "technology digital tools innovation", category: "Our Working Model" },
    { title: "Remote Learning", path: "/about-us/working-model/remote-learning", keywords: "remote online distance learning", category: "Our Working Model" },
    { title: "Partnering Institutions", path: "/about-us/working-model/partnering-institutions", keywords: "partnering institutions organizations partners", category: "Our Working Model" },

    // Our Work
    { title: "Adult Education", path: "/our-works/adult-education", keywords: "adult education literacy skills", category: "Our Work - Education" },
    { title: "Elementary & Middle School", path: "/our-works/education/elementary-middle-school", keywords: "elementary middle school primary education children", category: "Our Work - Education" },
    { title: "Public & Government Schools", path: "/our-works/education/public-government-schools", keywords: "public government schools state education", category: "Our Work - Education" },
    { title: "Out of School & Dropout Children", path: "/our-works/education/out-of-school-dropout", keywords: "dropout out school children education", category: "Our Work - Education" },
    { title: "Slum & Marginalized Children", path: "/our-works/education/slum-children", keywords: "slum marginalized children poverty education", category: "Our Work - Education" },
    { title: "Girls Education", path: "/our-works/education/girls-education", keywords: "girls women female education empowerment", category: "Our Work - Education" },
    { title: "Madrasa Education", path: "/our-works/education/madrasa", keywords: "madrasa madarsa religious islamic education", category: "Our Work - Education" },
    { title: "Teachers Training", path: "/our-works/teachers-training", keywords: "teachers training professional development pedagogy", category: "Our Work" },
    { title: "Technical Skill Training", path: "/our-works/skill-training/technical-skill-training", keywords: "technical skill training vocational career", category: "Our Work - Skills Training" },
    { title: "Soft Skill Training", path: "/our-works/skill-training/soft-skill-training", keywords: "soft skills communication personality development", category: "Our Work - Skills Training" },
    { title: "Career Counseling & Placement", path: "/our-works/skill-training/career", keywords: "career counseling placement jobs employment", category: "Our Work - Skills Training" },

    // Courses

    // Partners
    { title: "Global Partners", path: "/partners/global", keywords: "global international partners collaboration", category: "Partners" },
    { title: "Partnering Institutions", path: "/partners/institutions", keywords: "partnering institutions organizations partners", category: "Partners" },
    { title: "Be a Partner", path: "/partners/join", keywords: "partner join collaborate partnership become partner ", category: "Partners" },


    // Donation
    { title: "Donate", path: "/donate", keywords: "donate donation contribute support fund", category: "Donation" },

    // Courses
    { title: "Courses", path: "/courses", keywords: "courses education training programs", category: "Courses" },
    { title: "English", path: "/courses/english", keywords: "courses education training programs english", category: "Courses" },
    { title: "Math", path: "/courses/math", keywords: "courses education training programs math", category: "Courses" },
    { title: "Science", path: "/courses/science", keywords: "courses education training programs science", category: "Courses" },
    { title: "Social Science", path: "/courses/social-science", keywords: "courses education training programs social science", category: "Courses" },
    { title: "Teachers Training", path: "/courses/teachers-training", keywords: "courses education training programs teachers training", category: "Courses" },
    { title: "Technical Skill Training", path: "/courses/technical", keywords: "courses education training programs technical skill training", category: "Courses" },
    { title: "Financial Literacy", path: "/courses/financial-literacy", keywords: "courses education training programs financial literacy", category: "Courses" },
    { title: "Nios", path: "/courses/nios", keywords: "courses education training programs nios", category: "Courses" },
    { title: "CBSE", path: "/courses/cbse", keywords: "courses education training programs cbse", category: "Courses" },

    //volunteer

    { title: "Volunteer", path: "/donation/volunteer", keywords: "volunteer volunteering volunteerism donation volunteerism", category: "Volunteer" },

    //news 

    { title: "News", path: "/news", keywords: "news updates information news updates news updates news updates", category: "News" },





  ];

  const performSearch = (query) => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate search delay for better UX
    setTimeout(() => {
      const searchTerms = query.toLowerCase().trim().split(' ');

      const searchResults = searchableContent
        .map(item => {
          let score = 0;
          const titleLower = item.title.toLowerCase();
          const keywordsLower = item.keywords.toLowerCase();
          const categoryLower = item.category.toLowerCase();

          // Check for exact title match (highest priority)
          if (titleLower === query.toLowerCase()) {
            score += 100;
          }

          // Check for partial title match
          if (titleLower.includes(query.toLowerCase())) {
            score += 50;
          }

          // Check each search term
          searchTerms.forEach(term => {
            if (term.length < 2) return; // Skip very short terms

            // Title matches
            if (titleLower.includes(term)) {
              score += 30;
            }

            // Category matches
            if (categoryLower.includes(term)) {
              score += 20;
            }

            // Keyword matches
            if (keywordsLower.includes(term)) {
              score += 10;
            }
          });

          return { ...item, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

      setResults(searchResults);
      setIsSearching(false);
    }, 300);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={index} style={{ backgroundColor: '#FFE082', padding: '2px 4px', borderRadius: '3px' }}>{part}</mark>
        : part
    );
  };

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Search Results", link: null }
      ]}
      title="Search Results"
      subtitle={searchQuery ? `Results for "${searchQuery}"` : "Search our website"}
      description="Find information across our website"
      heroImage="/assets/images/gallary/exhibition.jpg"
    >
      {/* Search Box */}
      <div className="row mb-5">
        <div className="col-12">
          <form onSubmit={handleSearchSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="input-group" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '50px', overflow: 'hidden' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  padding: '18px 25px',
                  fontSize: '16px',
                  outline: 'none',
                  boxShadow: 'none'
                }}
              />
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: '#06038F',
                  color: 'white',
                  border: 'none',
                  padding: '0 30px',
                  fontWeight: '600'
                }}
              >
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="row">
        <div className="col-12">
          {isSearching ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ color: '#06038F' }}>
                <span className="visually-hidden">Searching...</span>
              </div>
              <p className="mt-3" style={{ color: '#6c757d' }}>Searching...</p>
            </div>
          ) : !searchQuery ? (
            <div className="text-center py-5">
              <i className="fas fa-search" style={{ fontSize: '3rem', color: '#dee2e6', marginBottom: '1rem' }}></i>
              <h4 style={{ color: '#6c757d' }}>Enter a search term to find content</h4>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-search" style={{ fontSize: '3rem', color: '#dee2e6', marginBottom: '1rem' }}></i>
              <h4 style={{ color: '#6c757d' }}>No results found for "{searchQuery}"</h4>
              <p style={{ color: '#6c757d' }}>Try different keywords or browse our menu</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h5 style={{ color: '#212529', fontWeight: '600' }}>
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
                </h5>
              </div>

              <div className="row g-4">
                {results.map((result, index) => (
                  <div key={index} className="col-12">
                    <Link
                      to={result.path}
                      style={{ textDecoration: 'none' }}
                      className="search-result-item"
                    >
                      <div
                        className="card h-100 border-0 shadow-sm"
                        style={{
                          padding: '20px',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 style={{ color: '#06038F', fontWeight: '600', marginBottom: '8px', fontSize: '18px' }}>
                            {highlightText(result.title, searchQuery)}
                          </h5>
                          <span
                            style={{
                              backgroundColor: '#E3F2FD',
                              color: '#06038F',
                              padding: '4px 12px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '600',
                              whiteSpace: 'nowrap',
                              marginLeft: '10px'
                            }}
                          >
                            {result.category}
                          </span>
                        </div>
                        <p style={{ color: '#6c757d', fontSize: '14px', marginBottom: '8px' }}>
                          {result.path}
                        </p>
                        <div className="d-flex align-items-center" style={{ color: '#06038F', fontSize: '14px', fontWeight: '500' }}>
                          <span>View page</span>
                          <i className="fas fa-arrow-right ms-2" style={{ fontSize: '12px' }}></i>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Popular Searches */}
      {!searchQuery && (
        <div className="row mt-5">
          <div className="col-12">
            <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
              <h5 style={{ color: '#212529', fontWeight: '600', marginBottom: '20px' }}>Popular Searches</h5>
              <div className="d-flex flex-wrap gap-2">
                {['Education', 'Training', 'Courses', 'Leadership', 'Partners', 'Donate', 'Contact'].map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(tag);
                      navigate(`/search?q=${encodeURIComponent(tag)}`);
                    }}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #dee2e6',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#06038F';
                      e.target.style.color = 'white';
                      e.target.style.borderColor = '#06038F';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = '#212529';
                      e.target.style.borderColor = '#dee2e6';
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTemplate>
  );
};

export default SearchResults;
