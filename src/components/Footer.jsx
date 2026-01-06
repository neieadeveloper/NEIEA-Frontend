import React, { useState } from 'react';
import NeiSecondaryLogo from '../assets/images/neia-secondary-logo.svg';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { subscribeToNewsletter } from '../lib/subscriptionApi';
import { subscriptionSchema } from '../lib/subscriptionSchema';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hasConsented, setHasConsented] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email using Zod
    const validation = subscriptionSchema.safeParse({
      firstName,
      lastName,
      email,
    });
    if (!validation.success) {
      const errorMessage = validation.error.errors[0]?.message || 'Invalid email address';
      toast.error(errorMessage);
      return;
    }

    if (!hasConsented) {
      toast.error('Please agree to the privacy policy to subscribe.');
      return;
    }

    setIsLoading(true);
    
    try {
      const payload = validation.data;
      const result = await subscribeToNewsletter(payload);
      
      if (result.success) {
        toast.success(result.message || 'Thank you for subscribing!');
        setIsSubscribed(true);
        setEmail('');
        setFirstName('');
        setLastName('');
        setHasConsented(false);
      } else {
        toast.error(result.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer-top">
          <div className="col-md-6">
            <nav className="footer-navbar">
              {/* <a title="logo" href="#" className="logo">
                <img 
                  src={NeiSecondaryLogo} 
                  height={"80px"} 
                  alt="NEIEA Logo" 
                  style={{
                    height: '80px',
                    maxHeight: '80px',
                    width: 'auto'
                  }}
                  className="footer-logo"
                />
              </a> */}
              <p className="foot-mob-copy">© 2022-2025 NEIEA, Inc. All rights reserved.</p>
              
              <div className="footer-form d-block d-md-none">
                <h4 className="common-heading-24">Subscribe to our newsletter</h4>
                <form className="footer-mob-form" onSubmit={handleNewsletterSubmit}>
                  <div className="newsletter-form">
                    <div className="newsletter-row">
                      <input 
                        type="email" 
                        name="email" 
                        className="form-control newsletter-input" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                      required 
                      autoComplete="email"
                      />
                    </div>
                    <div className="newsletter-row newsletter-row--names">
                      <input 
                        type="text" 
                        name="firstName" 
                        className="form-control newsletter-input" 
                        placeholder="First name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={isLoading}
                        autoComplete="given-name"
                      />
                      <input 
                        type="text" 
                        name="lastName" 
                        className="form-control newsletter-input" 
                        placeholder="Last name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={isLoading}
                        autoComplete="family-name"
                        required
                      />
                    </div>
                    <div className="newsletter-row newsletter-row--consent">
                      <label className="newsletter-consent">
                        <input
                          type="checkbox"
                          className="newsletter-consent__checkbox"
                          checked={hasConsented}
                          onChange={(e) => setHasConsented(e.target.checked)}
                          disabled={isLoading}
                        />
                        <span>
                          I agree to the use of my personal information in accordance with NEIEA's{' '}
                          <Link to="/privacy-policy">privacy policy</Link>.
                        </span>
                      </label>
                    </div>
                    <div className="newsletter-row newsletter-row--submit">
                      <button 
                        type="submit" 
                        className="btn newsletter-btn" 
                        disabled={isLoading || !hasConsented}
                      >
                        {isLoading ? 'Subscribing...' : 'Sign up'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="menu-footer-menu-container">
                <ul className="footer-menu">
                  {/* <li><Link to="/about-us/testimonials">Featured Stories</Link></li> */}
                  <li><Link to="/donation/volunteer">Volunteer</Link></li>
                  <li><Link to="/partners/join">Be a Partner</Link></li>
                  <li><Link to="/about-us/contact">Contact Us</Link></li>
                  <li><Link to="/career">Career</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-md-6">
            <div className="footer-form">
              <h4 className="common-heading-24">Subscribe to our newsletter</h4>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="newsletter-form">
                  <div className="newsletter-row">
                    <input 
                      type="email" 
                      name="email" 
                      className="form-control newsletter-input" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required 
                      autoComplete="email"
                    />
                  </div>
                  <div className="newsletter-row newsletter-row--names">
                    <input 
                      type="text" 
                      name="firstName" 
                      className="form-control newsletter-input" 
                      placeholder="First name" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoading}
                      autoComplete="given-name"
                      required
                    />
                    <input 
                      type="text" 
                      name="lastName" 
                      className="form-control newsletter-input" 
                      placeholder="Last name" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isLoading}
                      autoComplete="family-name"
                      required
                    />
                  </div>
                  <div className="newsletter-row newsletter-row--consent">
                    <label className="newsletter-consent">
                      <input
                        type="checkbox"
                        className="newsletter-consent__checkbox"
                        checked={hasConsented}
                        onChange={(e) => setHasConsented(e.target.checked)}
                        disabled={isLoading}
                        required
                      />
                      <span>
                        I agree to the use of my personal information in accordance with NEIEA's{' '}
                        <Link to="/privacy-policy">privacy policy</Link>.
                      </span>
                    </label>
                  </div>
                  <div className="newsletter-row newsletter-row--submit">
                    <button 
                      type="submit" 
                      className="btn newsletter-btn" 
                      disabled={isLoading || !hasConsented}
                    >
                      {isLoading ? 'Subscribing...' : 'Sign up'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row footer-btm">
          <div className="col-md-6 p-0">
            <div className="copyright">© 2022-2025 NEIEA, Inc. All rights reserved.</div>
            <div className="copyright"><a target='_blank' style={{color: 'white'}} href="https://teinsol.com/">Developed By Teinsol</a></div>
          </div>
          <div className="col-md-6 p-0">
            {/* Social media links temporarily disabled - to revert: uncomment all href attributes below */}
            <ul className="social-links">
              <li><a target="_blank" href="https://www.linkedin.com/company/the-neiea/" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.20508 3.75075C5.20488 4.14858 5.04665 4.53003 4.76521 4.81119C4.48376 5.09236 4.10215 5.2502 3.70433 5.25C3.3065 5.2498 2.92505 5.09158 2.64389 4.81013C2.36272 4.52869 2.20488 4.14708 2.20508 3.74925C2.20528 3.35143 2.3635 2.96997 2.64495 2.68881C2.92639 2.40765 3.308 2.2498 3.70583 2.25C4.10365 2.2502 4.48511 2.40843 4.76627 2.68987C5.04743 2.97132 5.20528 3.35293 5.20508 3.75075ZM5.25008 6.36075H2.25008V15.7508H5.25008V6.36075ZM9.99008 6.36075H7.00508V15.7508H9.96008V10.8233C9.96008 8.07825 13.5376 7.82325 13.5376 10.8233V15.7508H16.5001V9.80325C16.5001 5.17575 11.2051 5.34825 9.96008 7.62075L9.99008 6.36075Z" fill="white"></path>
                </svg>
              </a></li>
              <li><a target="_blank" href="https://www.youtube.com/@neiea_india" rel="noopener noreferrer">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.7821 1.87347C16.6845 1.51105 16.4935 1.1806 16.2281 0.915205C15.9627 0.649811 15.6323 0.458778 15.2699 0.361225C13.9352 1.19209e-07 8.57189 0 8.57189 0C8.57189 0 3.20863 1.19209e-07 1.87393 0.361225C1.51151 0.458778 1.18106 0.649811 0.915666 0.915205C0.650272 1.1806 0.459238 1.51105 0.361685 1.87347C0.112468 3.23465 -0.0084701 4.61622 0.000460675 6C-0.0084701 7.38378 0.112468 8.76535 0.361685 10.1265C0.459238 10.489 0.650272 10.8194 0.915666 11.0848C1.18106 11.3502 1.51151 11.5412 1.87393 11.6388C3.20863 12 8.57189 12 8.57189 12C8.57189 12 13.9352 12 15.2699 11.6388C15.6323 11.5412 15.9627 11.3502 16.2281 11.0848C16.4935 10.8194 16.6845 10.489 16.7821 10.1265C17.0313 8.76535 17.1523 7.38378 17.1433 6C17.1523 4.61622 17.0313 3.23465 16.7821 1.87347ZM6.85761 8.57143V3.42857L11.3086 6L6.85761 8.57143Z" fill="white"></path>
                </svg>
              </a></li>
              <li><a target="_blank" href="https://x.com/neiea_india" rel="noopener noreferrer">
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.1453 5.50523L13.2404 0H12.0334L7.60751 4.77913L4.07516 0H0L5.34277 7.22759L0 13H1.20695L5.87782 7.95195L9.60905 13H13.6842M1.64256 0.846026H3.49677L12.0325 12.1955H10.1779" fill="white"></path>
                </svg>
              </a></li>
              <li><a target="_blank" href="https://www.instagram.com/neiea_india/" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4.25C7.25832 4.25 6.5333 4.46993 5.91661 4.88199C5.29993 5.29404 4.81928 5.87971 4.53545 6.56494C4.25162 7.25016 4.17736 8.00416 4.32206 8.73159C4.46675 9.45902 4.8239 10.1272 5.34835 10.6517C5.8728 11.1761 6.54098 11.5333 7.26841 11.6779C7.99584 11.8226 8.74984 11.7484 9.43506 11.4645C10.1203 11.1807 10.706 10.7001 11.118 10.0834C11.5301 9.4667 11.75 8.74168 11.75 8C11.75 7.00544 11.3549 6.05161 10.6517 5.34835C9.94839 4.64509 8.99456 4.25 8 4.25ZM8 10.5C7.50555 10.5 7.0222 10.3534 6.61107 10.0787C6.19995 9.80397 5.87952 9.41352 5.6903 8.95671C5.50108 8.49989 5.45157 7.99723 5.54804 7.51227C5.6445 7.02732 5.8826 6.58186 6.23223 6.23223C6.58186 5.8826 7.02732 5.6445 7.51227 5.54804C7.99723 5.45157 8.49989 5.50108 8.95671 5.6903C9.41352 5.87952 9.80397 6.19995 10.0787 6.61107C10.3534 7.0222 10.5 7.50555 10.5 8C10.4979 8.66241 10.2339 9.2971 9.76549 9.76549C9.2971 10.2339 8.66241 10.4979 8 10.5ZM11.4375 0.1875H4.5625C3.40218 0.1875 2.28938 0.648436 1.46891 1.46891C0.648436 2.28938 0.1875 3.40218 0.1875 4.5625V11.4375C0.1875 12.5978 0.648436 13.7106 1.46891 14.5311C2.28938 15.3516 3.40218 15.8125 4.5625 15.8125H11.4375C12.5978 15.8125 13.7106 15.3516 14.5311 14.5311C15.3516 13.7106 15.8125 12.5978 15.8125 11.4375V4.5625C15.8125 3.40218 15.3516 2.28938 14.5311 1.46891C13.7106 0.648436 12.5978 0.1875 11.4375 0.1875ZM14.5625 11.4375C14.5625 11.8479 14.4817 12.2542 14.3246 12.6334C14.1676 13.0125 13.9374 13.357 13.6472 13.6472C13.357 13.9374 13.0125 14.1676 12.6334 14.3246C12.2542 14.4817 11.8479 14.5625 11.4375 14.5625H4.5625C4.15212 14.5625 3.74576 14.4817 3.36661 14.3246C2.98747 14.1676 2.64297 13.9374 2.35279 13.6472C2.06261 13.357 1.83242 13.0125 1.67538 12.6334C1.51833 12.2542 1.4375 11.8479 1.4375 11.4375V4.5625C1.4375 3.7337 1.76674 2.93884 2.35279 2.35279C2.93884 1.76674 3.7337 1.4375 4.5625 1.4375H11.4375C11.8479 1.4375 12.2542 1.51833 12.6334 1.67538C13.0125 1.83242 13.357 2.06261 13.6472 2.35279C13.9374 2.64297 14.1676 2.98747 14.3246 3.36661C14.4817 3.74576 14.5625 4.15212 14.5625 4.5625V11.4375ZM13 3.9375C13 4.12292 12.945 4.30418 12.842 4.45835C12.739 4.61252 12.5926 4.73268 12.4213 4.80364C12.25 4.87459 12.0615 4.89316 11.8796 4.85699C11.6977 4.82081 11.5307 4.73152 11.3996 4.60041C11.2685 4.4693 11.1792 4.30225 11.143 4.1204C11.1068 3.93854 11.1254 3.75004 11.1964 3.57873C11.2673 3.40743 11.3875 3.26101 11.5417 3.158C11.6958 3.05498 11.8771 3 12.0625 3C12.3111 3 12.5496 3.09877 12.7254 3.27459C12.9012 3.4504 13 3.68886 13 3.9375Z" fill="white"></path>
                </svg>
              </a></li>
              <li><a target="_blank" href="https://www.facebook.com/people/NEIEA/100093505457474/" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.00033 0.701172C4.41699 0.701172 0.666992 4.44284 0.666992 9.05117C0.666992 13.2178 3.71699 16.6762 7.70033 17.3012V11.4678H5.58366V9.05117H7.70033V7.20951C7.70033 5.11784 8.94199 3.96784 10.8503 3.96784C11.7587 3.96784 12.7087 4.12617 12.7087 4.12617V6.1845H11.6587C10.6253 6.1845 10.3003 6.82617 10.3003 7.48451V9.05117H12.617L12.242 11.4678H10.3003V17.3012C12.264 16.991 14.0522 15.9891 15.3419 14.4762C16.6317 12.9633 17.3381 11.0392 17.3337 9.05117C17.3337 4.44284 13.5837 0.701172 9.00033 0.701172Z" fill="white"></path>
                </svg>
              </a></li>
              <li><a target="_blank" href="https://www.whatsapp.com/channel/0029VaA7jjBLo4hapNUZ1s3B" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 0C4.037 0 0 4.037 0 9c0 1.6.4 3.1 1.1 4.4L0 18l4.6-1.1c1.3.7 2.8 1.1 4.4 1.1 4.963 0 9-4.037 9-9S13.963 0 9 0zm5.1 12.5c-.2.6-1.2 1.1-1.8 1.2-.5.1-1.2.2-3.3-.8-2.6-1.2-4.3-4.2-4.4-4.4-.1-.2-.8-1.1-.8-2.1s.5-1.5.7-1.7c.2-.2.5-.3.7-.3h.4c.2 0 .4 0 .6.1.2.1.4.2.6.4.2.2.3.4.5.7.1.2.2.4.1.6-.1.2-.2.4-.4.6-.2.2-.4.4-.6.6-.2.2-.4.4-.2.7.2.3.9 1.3 1.9 2.1 1.3 1.1 2.4 1.4 2.7 1.6.3.2.5.2.7-.1.2-.3.8-1 1-1.3.2-.3.4-.3.7-.2.3.1 1.9.9 2.2 1.1.3.2.5.3.6.5.1.2.1 1.2-.1 1.8z" fill="white"></path>
                </svg>
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;