import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NeiPrimaryLogo from '../assets/images/neia-primary-logo.svg';
import NeiSecondaryLogo from '../assets/images/neia-secondary-logo.svg';
import { ArrowRightCircle, MoveRightIcon, X } from 'lucide-react';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavState, setMobileNavState] = useState({
    about: false,
    ourWork: false,
    courses: false,
    partners: false,
    donation: false,
    neiUsa: false,
    workingModel: false,
    workingModelMain: false,
    blendedLearning: false,
    blendedLearningMain: false,
    mediaEvents: false,
    education: false,
    skillsTraining: false
  });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Handle search functionality
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const goHome = () => {
    navigate("/");
    window.location.reload(); // force refresh
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const closeSearch = () => {
    setShowSearch(false);
  };

  // Toggle mobile navigation sections
  const toggleMobileNav = (section) => {
    setMobileNavState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Close mobile navigation
  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  // Handle link clicks in mobile navigation
  const handleMobileLinkClick = () => {
    closeMobileNav();
  };

  // Toggle mobile navigation
  const handleMobileNavToggle = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
      openDropdowns.forEach((dropdown) => {
        dropdown.classList.remove('show');
      });
    }
  };

  // Handle mobile detection and scroll detection
  useEffect(() => {
    const handleScroll = (mobileOverride) => {
      const mobile = typeof mobileOverride === 'boolean' ? mobileOverride : isMobile;

      if (mobile) {
        setIsScrolled(true);
        return;
      }

      const threshold = isHomePage ? 50 : 10;
      setIsScrolled(window.scrollY > threshold);
    };

    const handleResize = () => {
      const mobile = window.innerWidth <= 991.98;
      setIsMobile(mobile);
      handleScroll(mobile);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage, isMobile]);

  // Handle body scroll lock (unified for mobile nav and search)
  useEffect(() => {
    const shouldLock = isMobileNavOpen || showSearch;

    if (shouldLock) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileNavOpen, showSearch]);

  useEffect(() => {
    const updateOffset = () => {
      if (isMobile && headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight || 0;
        document.body.classList.add('has-mobile-header');
        document.body.style.setProperty('--mobile-header-offset', `${headerHeight}px`);
      } else {
        document.body.classList.remove('has-mobile-header');
        document.body.style.removeProperty('--mobile-header-offset');
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);

    return () => {
      window.removeEventListener('resize', updateOffset);
      document.body.classList.remove('has-mobile-header');
      document.body.style.removeProperty('--mobile-header-offset');
    };
  }, [isMobile, isMobileNavOpen]);

  // Clean up Bootstrap offcanvas remnants
  useEffect(() => {
    const cleanupBootstrapOffcanvas = () => {
      document.body.classList.remove('offcanvas-open', 'modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      const backdrops = document.querySelectorAll('.offcanvas-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());

      const offcanvasElements = document.querySelectorAll('.offcanvas');
      offcanvasElements.forEach(offcanvas => {
        offcanvas.classList.remove('show');
      });
    };

    cleanupBootstrapOffcanvas();

    const handleRouteChange = () => {
      setTimeout(cleanupBootstrapOffcanvas, 100);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      cleanupBootstrapOffcanvas();
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [location.pathname]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Desktop hover intent to reduce flicker on dropdowns and submenus
  useEffect(() => {
    const openDelayMs = 80;
    const closeDelayMs = 120;

    const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;

    const attachHoverHandlers = () => {
      const dropdowns = document.querySelectorAll('.navbar .nav-item.dropdown, .navbar .dropdown-submenu');
      dropdowns.forEach((el) => {
        let openTimer = null;
        let closeTimer = null;

        const handleEnter = () => {
          if (!isDesktop()) return;
          if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
          openTimer = setTimeout(() => {
            el.classList.add('open');
          }, openDelayMs);
        };

        const handleLeave = () => {
          if (!isDesktop()) return;
          if (openTimer) { clearTimeout(openTimer); openTimer = null; }
          closeTimer = setTimeout(() => {
            el.classList.remove('open');
          }, closeDelayMs);
        };

        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);

        // Store listeners for cleanup
        el.__nei_hoverHandlers = { handleEnter, handleLeave };
      });
    };

    const detachHoverHandlers = () => {
      const dropdowns = document.querySelectorAll('.navbar .nav-item.dropdown, .navbar .dropdown-submenu');
      dropdowns.forEach((el) => {
        const h = el.__nei_hoverHandlers;
        if (h) {
          el.removeEventListener('mouseenter', h.handleEnter);
          el.removeEventListener('mouseleave', h.handleLeave);
          delete el.__nei_hoverHandlers;
        }
        el.classList.remove('open');
      });
    };

    attachHoverHandlers();
    window.addEventListener('resize', detachHoverHandlers);
    window.addEventListener('resize', attachHoverHandlers);

    return () => {
      detachHoverHandlers();
      window.removeEventListener('resize', detachHoverHandlers);
      window.removeEventListener('resize', attachHoverHandlers);
    };
  }, []);

  return (
    <>
      <style>
        {`
          /* Header Styles */
          .primary-header {
            position: sticky !important;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 9999;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            overflow: visible !important;
          }

          .primary-header:not(.home-header) {
            background: #fff;
          }

          .home-header {
            position: absolute !important;
            background: transparent;
          }

          .home-header.scrolled {
            position: sticky !important;
            background: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .home-header .navbar {
            background: transparent !important;
          }

          .home-header.scrolled .navbar,
          .primary-header:not(.home-header) .navbar {
            background: #fff !important;
          }

          .home-header .nav-link {
            color: #fff !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }

          .home-header.scrolled .nav-link,
          .primary-header:not(.home-header) .nav-link {
            color: #4A3200 !important;
            text-shadow: none;
            font-weight: 500;
          }

          .primary-header.scrolled .nav-link {
            color: #4A3200 !important;
            font-weight: 500;
          }

          @media (max-width: 991.98px) {
            .primary-header.mobile-header {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              width: 100% !important;
              background: #fff !important;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
              z-index: 1200 !important;
            }

            body.has-mobile-header {
              padding-top: var(--mobile-header-offset, 100px) !important;
            }
          }

          /* Desktop dropdown styling */
          .dropdown-menu {
            background-color: white;
            border: 1px solid rgba(0, 0, 0, 0.15);
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
            border-radius: 0.375rem;
            padding: 0.5rem 0;
            min-width: 220px;
            position: absolute;
            z-index: 1000;
            margin-top: 0; /* remove hover gap */
            top: 100%;
            left: 0;
            opacity: 0;
            visibility: hidden;
            transform: translateY(8px);
            transition: opacity 150ms ease, transform 150ms ease, visibility 150ms ease;
            pointer-events: none;
          }

          .nav-item.dropdown {
            position: relative;
          }

          @media (min-width: 992px) {
            .nav-item.dropdown:hover > .dropdown-menu,
            .nav-item.dropdown:focus-within > .dropdown-menu,
            .nav-item.dropdown.open > .dropdown-menu {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
              pointer-events: auto;
            }
            .dropdown-submenu:hover > .dropdown-menu,
            .dropdown-submenu:focus-within > .dropdown-menu,
            .dropdown-submenu.open > .dropdown-menu {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
              pointer-events: auto;
            }
            
            /* Ensure proper nesting for submenus */
            .dropdown-menu .dropdown-submenu {
              position: relative;
            }
            
            .dropdown-menu .dropdown-submenu > .dropdown-menu {
              top: 0;
              left: 100%;
              margin: 0;
            }
          }

          @media (max-width: 991.98px) {
            .dropdown-menu {
              position: static;
              float: none;
              width: auto;
              margin-top: 0;
              background-color: transparent;
              border: 0;
              box-shadow: none;
              opacity: 1;
              visibility: visible;
              transform: none;
              pointer-events: auto;
              transition: none;
              display: none;
            }
            .dropdown-menu.show {
              display: block;
            }
          }

          .dropdown-submenu {
            position: relative !important;
            z-index: 1102; /* ensure in-between chevron can appear above submenu panel */
          }

          .dropdown-submenu .dropdown-menu {
            background-color: white;
            border: 1px solid rgba(0, 0, 0, 0.15);
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
            border-radius: 0.375rem;
            position: absolute !important;
            top: 0 !important;
            left: 100% !important;
            margin-left: 0 !important;
            margin-top: 0 !important; /* remove hover gap */
            z-index: 1001 !important;
            min-width: 200px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(8px);
            transition: opacity 150ms ease, transform 150ms ease, visibility 150ms ease;
            pointer-events: none;
            overflow: visible; /* allow pseudo arrow to show */
          }

          /* Remove diamond connector nib; use simple chevron only */
          .dropdown-submenu > .dropdown-menu::before { display: none; }

          .dropdown-submenu > .dropdown-item {
            position: relative;
            padding-right: 2.5rem;
            display: block;
            width: 100%;
          }

          /* Force-visible submenu caret element */
          .dropdown-submenu > .dropdown-item .submenu-caret {
            position: absolute !important;
            right: -2px !important; /* overlap boundary */
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 32px !important;
            height: 32px !important;
            background-color: #ffffff !important; /* white square */
            border: 1px solid rgba(0,0,0,0.12) !important;
            border-radius: 2px !important;
            box-shadow: 0 1px 2px rgba(0,0,0,0.06) !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'%3e%3cpath d='M9 18L15 12L9 6' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e") !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
            background-size: 16px 16px !important;
            display: inline-block !important;
            pointer-events: none !important;
            z-index: 1104 !important;
          }

          /* Ensure arrow remains visible; style submenu trigger hover/focus */
          .dropdown-submenu > .dropdown-item:hover,
          .dropdown-submenu > .dropdown-item:focus {
            background-color: #06038F;
            color: #ffffff;
          }

          .dropdown-submenu > .dropdown-item::after {
            /* Visible, fixed chevron like provided rule */
            content: "" !important;
            position: absolute !important;
            right: 4px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 16px !important;
            height: 24px !important;
            margin-left: 8px !important;
            border: unset !important;
            background: url("data:image/svg+xml,%3csvg%20width='12'%20height='7'%20viewBox='0%200%2012%207'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.6436%200.75L5.64355%205.75L0.643555%200.75'%20stroke='%23222222'%20stroke-width='1.5'/%3e%3c/svg%3e") no-repeat center / contain !important;
            display: inline-block !important;
            pointer-events: none !important;
            z-index: 1103 !important;
          }

          /* Keep chevron unchanged on hover; only background/text colors change */
          .dropdown-submenu:hover > .dropdown-item::after,
          .dropdown-submenu:focus-within > .dropdown-item::after {
            transform: translateY(-50%);
          }

          .dropdown-item {
            display: block !important;
            width: 100%;
            padding: 0.5rem 1rem;
            clear: both;
            font-weight: 400;
            color: #212529;
            text-align: inherit;
            text-decoration: none;
            white-space: nowrap;
            background-color: transparent;
            border: 0;
            transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
            position: relative;
          }

          /* Make button triggers look like links */
          .dropdown-item[type="button"] {
            text-align: left;
            width: 100%;
            background: transparent;
            cursor: pointer;
          }

          .dropdown-item:hover,
          .dropdown-item:focus {
            color: #06038F;
            background-color: #f8f9fa;
          }

          /* Prevent submenu items from staying highlighted after click */
          .dropdown-item.active,
          .dropdown-item:active {
            color: inherit;
            background-color: transparent;
          }

          .dropdown-item:focus {
            outline: 2px solid #06038F;
            outline-offset: -2px;
          }

          /* Ensure current route keeps brand color while avoiding default highlights */
          .nav-link.active,
          .nav-link[aria-current="page"] {
            color: #4A3200 !important;
            background-color: transparent !important;
          }

          .dropdown-item.active,
          .dropdown-item[aria-current="page"] {
            color: inherit !important;
            background-color: transparent !important;
          }

          .navbar {
            transition: box-shadow 0.15s ease-in-out, background-color 0.15s ease-in-out;
            padding: 10px;
            overflow: visible !important;
          }

          .navbar .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            max-width: 100%;
            padding: 0 40px;
            overflow: visible !important;
          }

          @media (min-width: 992px) {
            .navbar-collapse {
              display: flex !important;
              align-items: center;
            }
          }

          .nav-link {
            transition: color 0.15s ease-in-out;
            font-weight: 500;
            white-space: nowrap;
            padding: 0.5rem 0.5rem;
            font-size: 0.95rem;
            position: relative; /* allow ::after absolute positioning */
          }

          .nav-link:hover,
          .nav-link:focus {
            color: #06038F !important;
          }

          /* Adjust navbar spacing for better fit */
          @media (min-width: 992px) and (max-width: 1199px) {
            .nav-link {
              font-size: 0.85rem;
              padding: 0.5rem 0.4rem;
            }
          }

          @media (min-width: 1200px) and (max-width: 1399px) {
            .nav-link {
              font-size: 0.9rem;
              padding: 0.5rem 0.45rem;
            }
          }

          @media (min-width: 1400px) {
            .nav-link {
              padding: 0.5rem 0.55rem;
            }
          }

          @media (min-width: 992px) {
            .navbar-nav {
              column-gap: 0 !important;
              gap: 0 !important;
              align-items: center;
              justify-content: center;
              flex-wrap: nowrap;
              padding-left: 10px;
              padding-right: 10px;
            }
            
            .navbar-nav .nav-item {
              display: flex;
              align-items: center;
              position: relative;
              margin: 0 !important;
            }

            .navbar-nav .nav-item:first-child {
              margin-left: 0 !important;
            }

            .navbar-nav .nav-item:last-child {
              margin-right: 0 !important;
            }

            .navbar-collapse {
              overflow: visible !important;
            }
          }

          .navbar .dropdown-toggle::after {
            width: 16px;
            height: 24px;
            margin-left: 8px;
            position: absolute;
            border: unset;
            background: url("data:image/svg+xml,%3csvg%20width='12'%20height='7'%20viewBox='0%200%2012%207'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.6436%200.75L5.64355%205.75L0.643555%200.75'%20stroke='%23222222'%20stroke-width='1.5'/%3e%3c/svg%3e") no-repeat center / contain;
            right: 4px;
            content: "";
            display: inline-block;
            top: 50%;
            transform: translateY(-50%);
          }

          /* Ensure no caret is auto-added to dropdown items; we draw our own for submenus */
          .dropdown-menu .dropdown-item::after { content: none !important; border: 0 !important; }

          /* Remove Bootstrap caret on submenu triggers */
          .dropdown-submenu > .dropdown-item.dropdown-toggle::after,
          .dropdown-submenu > .dropdown-item::after {
            border: 0 !important; /* prevent triangle caret */
          }

          /* Rotate caret up when parent menu is open */
          @media (min-width: 992px) {
            .nav-item.dropdown:hover > .nav-link.dropdown-toggle::after,
            .nav-item.dropdown:focus-within > .nav-link.dropdown-toggle::after {
              transform: translateY(-50%) rotate(180deg);
            }
          }

          /* Desktop-specific arrow color rule (mirrors reference behavior) */
          @media (min-width: 1024px) {
            .primary-header .navbar-nav > .dropdown > .dropdown-toggle::after,
            .primary-header .navbar-nav > .dropdown > .dropdown-toggle.active::after {
              background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7' fill='none'%3e%3cpath d='M10.6436 0.75L5.64355 5.75L0.643555 0.75' stroke='currentColor' stroke-width='1.5'/%3e%3c/svg%3e");
            }
          }

          /* Mobile Navigation Styles */
          .navbar-toggler {
            border: none;
            padding: 0.25rem 0.5rem;
          }
          .navbar-toggler:focus { outline: 2px solid #06038F; }
          .navbar-toggler-icon {
            display: inline-block;
            width: 24px;
            height: 2px;
            background-color: #222;
            position: relative;
          }
          .navbar-toggler-icon::before,
          .navbar-toggler-icon::after {
            content: "";
            position: absolute;
            left: 0;
            width: 24px;
            height: 2px;
            background-color: #222;
            transition: transform 0.2s ease;
          }
          .navbar-toggler-icon::before { top: -6px; }
          .navbar-toggler-icon::after { top: 6px; }
          .mobile-nav-header {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid #eee;
          }

          .mobile-nav-arrow {
            transition: transform 0.3s ease;
            font-size: 0.8rem;
            color: #06038F;
          }

          .mobile-nav-arrow.rotated {
            transform: rotate(180deg);
          }

          .mobile-nav-submenu {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            padding-left: 1rem;
          }

          .mobile-nav-submenu.show {
            max-height: 1000px;
          }

          .mobile-nav-submenu-level2,
          .mobile-nav-submenu-level3 {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            padding-left: 1rem;
          }

          .mobile-nav-submenu-level2.show,
          .mobile-nav-submenu-level3.show {
            max-height: 1000px;
          }

          .mobile-nav-submenu-header {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
          }

          .mobile-nav-submenu-arrow {
            transition: transform 0.3s ease;
            font-size: 0.7rem;
            color: #06038F;
          }

          .mobile-nav-submenu-arrow.rotated {
            transform: rotate(180deg);
          }

          .mobile-nav-link {
            display: block;
            padding: 0.5rem 0;
            color: #333;
            text-decoration: none;
            border-bottom: 1px solid #f0f0f0;
          }

          .mobile-nav-link:hover {
            color: #06038F;
            background-color: #f8f9fa;
          }

          /* Offcanvas styles */
          .offcanvas-start {
            width: 280px;
            transition: transform 0.3s ease-in-out;
          }

          /* Respect reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .dropdown-menu,
            .dropdown-submenu .dropdown-menu,
            .mobile-nav-submenu,
            .mobile-nav-submenu-level2,
            .mobile-nav-submenu-level3 {
              transition: none !important;
            }
          }

          /* Hide specific navigation items - Remove these rules to restore visibility */
          // .hidden-nav-item {
          //   display: none !important;
          // }
        `}
      </style>

      <header
        ref={headerRef}
        className={`primary-header ${isMobile ? 'mobile-header' : ''} ${isHomePage && !isMobile ? 'home-header' : ''
          } ${isScrolled || isMobile ? 'scrolled' : ''}`}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <div className="navbar-brand-wrapper d-flex align-items-center">
              <Link className="navbar-brand primary-logo" onClick={goHome} to="/">
                <img
                  src={NeiPrimaryLogo}
                  alt="NEIEA Logo"
                  height={isMobile ? "50px" : "80px"}
                />
              </Link>
              <Link className="navbar-brand" onClick={goHome} to="/">
                <img
                  src={NeiSecondaryLogo}
                  alt="NEIEA Secondary Logo"
                  height={isMobile ? "50px" : "80px"}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-collapse d-none d-lg-flex" style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
              <ul className="navbar-nav" style={{ flex: 1, justifyContent: 'center', margin: '0 auto' }}>
                {/* About NEIEA Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    aria-haspopup="true" aria-expanded="false"
                    title="About NEIEA"
                  >
                    About NEIEA
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/about-us/introduction" className="dropdown-item" title="Introduction">
                        Introduction
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/leadership" className="dropdown-item" title="Leadership">
                        Leadership
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/testimonials" className="dropdown-item" title="Testimonials & Featured stories">
                        Testimonials & Featured stories
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/media-events/gallery" className="dropdown-item" title="Gallery">
                        Gallery
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/reports-financials" className="dropdown-item" title="Reports and Financials">
                        Reports and Financials
                      </Link>
                    </li>
                    <li>
                      <Link to="/news" className="dropdown-item" title="News & Updates">
                        News & Updates
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/contact" className="dropdown-item" title="Contact us">
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Our Working Model Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    aria-haspopup="true" aria-expanded="false"
                    title="Our Working Model"
                  >
                    Our Working Model
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        to="/about-us/working-model/blended-learning"
                        className="dropdown-item"
                        title="Blended Learning Model"
                      >
                        Blended Learning Model
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-us/working-model/blended-learning/discourse-oriented-pedagogy"
                        className="dropdown-item"
                        title="Discourse Oriented Pedagogy"
                      >
                        Discourse Oriented Pedagogy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-us/working-model/blended-learning/application-of-technology"
                        className="dropdown-item"
                        title="Application Of Technology"
                      >
                        Application Of Technology
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-us/working-model/partnering-institutions"
                        className="dropdown-item"
                        title="Partnering with Educational Institutions"
                      >
                        Partnering with Educational Institutions
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-us/working-model/remote-learning"
                        className="dropdown-item"
                        title="Remote Individual Learning"
                      >
                        Remote Individual Learning
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Our Work Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    aria-haspopup="true" aria-expanded="false"
                    title="Our Work"
                  >
                    Our Work
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-submenu">
                      <button type="button" className="dropdown-item" title="Education" aria-haspopup="true" aria-expanded="false">
                        Education
                        <span className="submenu-caret" aria-hidden="true"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to="/our-works/education/elementary-middle-school"
                            className="dropdown-item"
                            title="Elementary & Middle School"
                          >
                            Elementary & Middle School
                          </Link>
                        </li>
                        <li>
                          <Link to="/our-works/education/slum-children" className="dropdown-item" title="Slum children">
                            Slum children
                          </Link>
                        </li>
                        <li className="hidden-nav-item">
                          <Link
                            to="/our-works/education/public-government-school"
                            className="dropdown-item"
                            title="Public (Government) School"
                          >
                            Public (Government) School
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/our-works/education/girls-education"
                            className="dropdown-item"
                            title="Girl's Education"
                          >
                            Girl's Education
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/our-works/education/out-of-school-dropout"
                            className="dropdown-item"
                            title="Out of school / School Dropout"
                          >
                            Out of school / School Dropout
                          </Link>
                        </li>
                        <li>
                          <Link to="/our-works/education/madrasa" className="dropdown-item" title="Madrasa">
                            Madrasa
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/our-works/teachers-training" className="dropdown-item" title="Teachers Training">
                        Teachers Training
                      </Link>
                    </li>
                    <li className="dropdown-submenu">
                      <button type="button" className="dropdown-item" title="Skills Training" aria-haspopup="true" aria-expanded="false">
                        Skills Training
                        <span className="submenu-caret" aria-hidden="true"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/our-works/skills-training/soft-skills" className="dropdown-item" title="Soft Skill Training">
                            Soft Skill Training
                          </Link>
                        </li>
                        <li>
                          <Link to="/our-works/skills-training/technical-skills" className="dropdown-item" title="Technical Skill Training">
                            Technical Skill Training
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="hidden-nav-item">
                      <Link to="/our-works/adult-education" className="dropdown-item" title="Adult Education">
                        Adult Education
                      </Link>
                    </li>
                    <li>
                      <Link to="/our-works/global-education" className="dropdown-item" title="Global Education">
                        Global Education
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Courses Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    aria-haspopup="true" aria-expanded="false"
                    title="Courses"
                  >
                    Courses
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/courses/english" className="dropdown-item" title="English Courses">
                        English Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/math" className="dropdown-item" title="Math Courses">
                        Math Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/science" className="dropdown-item" title="Science Courses">
                        Science Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/social-science" className="dropdown-item" title="Social Science Courses">
                        Social Science Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/teachers-training" className="dropdown-item" title="Teachers Training Courses">
                        Teachers Training Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/technical" className="dropdown-item" title="Technical Courses">
                        Technical Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/financial-literacy" className="dropdown-item" title="Financial & Literacy Courses">
                        Financial & Literacy Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/nios" className="dropdown-item" title="NIOS Courses">
                        NIOS Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/cbse" className="dropdown-item" title="CBSE Courses">
                        CBSE Courses
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Partners Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    aria-haspopup="true" aria-expanded="false"
                    title="Partners"
                  >
                    Partners
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/partners/join" className="dropdown-item" title="Join NEIEA as a Partner">
                        Join NEIEA as a Partner
                      </Link>
                    </li>
                    <li>
                      <Link to="/partners/institutions" className="dropdown-item" title="Partnering Institutions">
                        Partnering Institutions
                      </Link>
                    </li>
                    <li>
                      <Link to="/partners/global" className="dropdown-item" title="Global Partners">
                        Global Partners
                      </Link>
                    </li>
                  </ul>
                </li>



                {/* Donation Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    aria-haspopup="true" aria-expanded="false"
                    title="Donation"
                  >
                    Donation
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/donation/be-partner" className="dropdown-item" title="Be a Partner">
                        Be a Partner
                      </Link>
                    </li>
                    <li>
                      <Link to="/donation/volunteer" className="dropdown-item" title="Volunteer">
                        Volunteer
                      </Link>
                    </li>
                    <li>
                      <Link to="/donate" className="dropdown-item" title="Donate">
                        Donate
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* NEI USA Dropdown */}
                {/* <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    aria-haspopup="true" aria-expanded="false"
                    title="NEI USA"
                  >
                    NEI USA
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/nei-usa/introduction" className="dropdown-item" title="Introduction">
                        Introduction
                      </Link>
                    </li>
                  </ul>
                </li> */}
              </ul>

              <div className="d-none d-lg-flex align-items-center" style={{ flexShrink: 0, marginLeft: '10px', gap: '10px' }}>
                <button
                  onClick={handleSearchToggle}
                  className="btn btn-link p-0"
                  style={{
                    border: 'none',
                    background: 'none',
                    color: '#222222',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '0 10px'
                  }}
                  title="Search"
                >
                  <i className="fas fa-search"></i>
                </button>
                <Link to="/donate" className="btn donate-btn btn-yellow donate-button">
                  DONATE
                </Link>
              </div>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="d-flex align-items-center d-lg-none">
              <button
                onClick={handleSearchToggle}
                className="btn btn-link p-0"
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#222222',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '0 10px',
                  marginRight: '10px'
                }}
                title="Search"
              >
                <i className="fas fa-search"></i>
              </button>
              <Link to="/donate" className="btn donate-btn btn-yellow donate-button me-2">
                DONATE
              </Link>
              <button
                className="navbar-toggler mob-nav-cta"
                type="button"
                onClick={handleMobileNavToggle}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Backdrop */}
        {isMobileNavOpen && (
          <div
            className="offcanvas-backdrop fade show"
            onClick={handleMobileNavToggle}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 1040,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          ></div>
        )}

        {/* Mobile Offcanvas Navigation */}
        <div
          className={`offcanvas offcanvas-start ${isMobileNavOpen ? 'show' : ''}`}
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1050,
            width: '280px',
            height: '100vh',
            transform: isMobileNavOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
            backgroundColor: '#fff',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="offcanvas-header">
            <div className="navbar-brand-wrapper d-flex align-items-center">
              <Link className="navbar-brand primary-logo" to="/" onClick={closeMobileNav}>
                <img src={NeiPrimaryLogo} alt="NEIEA Logo" height="50px" />
              </Link>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={handleMobileNavToggle}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav mobile-nav-list">
              {/* About NEIEA Section */}
              <li className="nav-item">
                <div className="mobile-nav-section">
                  <div className="mobile-nav-header" onClick={() => toggleMobileNav('about')}>
                    <span className="mobile-nav-title">About NEIEA</span>
                    <span className={`mobile-nav-arrow ${mobileNavState.about ? 'rotated' : ''}`}>▼</span>
                  </div>
                  <ul className={`mobile-nav-submenu ${mobileNavState.about ? 'show' : ''}`}>
                    <li>
                      <Link to="/about-us/introduction" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Introduction
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/leadership" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Leadership
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/testimonials" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Testimonials & Featured stories
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/media-events/gallery" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Gallery
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/reports-financials" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Reports and Financials
                      </Link>
                    </li>
                    <li>
                      <Link to="/news" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        News & Updates
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/contact" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Our Working Model Section */}
              <li className="nav-item">
                <div className="mobile-nav-section">
                  <div className="mobile-nav-header" onClick={() => toggleMobileNav('workingModelMain')}>
                    <span className="mobile-nav-title">Our Working Model</span>
                    <span className={`mobile-nav-arrow ${mobileNavState.workingModelMain ? 'rotated' : ''}`}>▼</span>
                  </div>
                  <ul className={`mobile-nav-submenu ${mobileNavState.workingModelMain ? 'show' : ''}`}>
                    <li>
                      <Link
                        to="/about-us/working-model/blended-learning"
                        className="mobile-nav-link"
                        onClick={handleMobileLinkClick}
                      >
                        Blended Learning Model
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-us/working-model/blended-learning/discourse-oriented-pedagogy"
                        className="mobile-nav-link"
                        onClick={handleMobileLinkClick}
                      >
                        Discourse Oriented Pedagogy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-us/working-model/blended-learning/application-of-technology"
                        className="mobile-nav-link"
                        onClick={handleMobileLinkClick}
                      >
                        Application Of Technology
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/working-model/partnering-institutions" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Partnering with Educational Institutions
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us/working-model/remote-learning" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Remote Individual Learning
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Our Work Section */}
              <li className="nav-item">
                <div className="mobile-nav-section">
                  <div className="mobile-nav-header" onClick={() => toggleMobileNav('ourWork')}>
                    <span className="mobile-nav-title">Our Work</span>
                    <span className={`mobile-nav-arrow ${mobileNavState.ourWork ? 'rotated' : ''}`}>▼</span>
                  </div>
                  <ul className={`mobile-nav-submenu ${mobileNavState.ourWork ? 'show' : ''}`}>
                    <li className="mobile-nav-submenu-item submenu-indintation">
                      <div className="mobile-nav-submenu-header" onClick={() => toggleMobileNav('education')}>
                        <span className="mobile-nav-submenu-title">Education</span>
                        <span className={`mobile-nav-submenu-arrow ${mobileNavState.education ? 'rotated' : ''}`}>▼</span>
                      </div>
                      <ul className={`mobile-nav-submenu-level2 ${mobileNavState.education ? 'show' : ''}`}>
                        <li>
                          <Link to="/our-works/education/elementary-middle-school" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                            Elementary & Middle School
                          </Link>
                        </li>
                        <li>
                          <Link to="/our-works/education/slum-children" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                            Slum children
                          </Link>
                        </li>
                        <li className="hidden-nav-item">
                          <Link to="/our-works/education/public-government-school" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                            Public (Government) School
                          </Link>
                        </li>
                        <li>
                          <Link to="/our-works/education/girls-education" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                            Girl's Education
                          </Link>
                        </li>
                        <li>
                          <Link to="/our-works/education/out-of-school-dropout" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                            Out of school / School Dropout
                          </Link>
                        </li>
                        <li>
                          <Link to="/our-works/education/madrasa" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                            Madrasa
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/our-works/teachers-training" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Teachers Training
                      </Link>
                    </li>
                    <li className="mobile-nav-submenu-item submenu-indintation">
                      <div className="mobile-nav-submenu-header" onClick={() => toggleMobileNav('skillsTraining')}>
                        <span className="mobile-nav-submenu-title">Skills Training</span>
                        <span className={`mobile-nav-submenu-arrow ${mobileNavState.skillsTraining ? 'rotated' : ''}`}>▼</span>
                      </div>
                      <ul className={`mobile-nav-submenu-level2 ${mobileNavState.skillsTraining ? 'show' : ''}`}>
                        <li>
                          <Link to="/our-works/skills-training/soft-skills" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                            Soft Skill Training
                          </Link>
                        </li>
                        <li>
                          <Link to="/our-works/skills-training/technical-skills" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                            Technical Skill Training
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="hidden-nav-item">
                      <Link to="/our-works/adult-education" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Adult Education
                      </Link>
                    </li>
                    <li>
                      <Link to="/our-works/global-education" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Global Education
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Courses Section */}
              <li className="nav-item">
                <div className="mobile-nav-section">
                  <div className="mobile-nav-header" onClick={() => toggleMobileNav('courses')}>
                    <span className="mobile-nav-title">Courses</span>
                    <span className={`mobile-nav-arrow ${mobileNavState.courses ? 'rotated' : ''}`}>▼</span>
                  </div>
                  <ul className={`mobile-nav-submenu ${mobileNavState.courses ? 'show' : ''}`}>
                    <li>
                      <Link to="/courses/english" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        English Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/math" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Math Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/science" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Science Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/social-science" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Social Science Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/teachers-training" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Teachers Training Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/technical" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Technical Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/financial-literacy" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Financial & Literacy Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/nios" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        NIOS Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses/cbse" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        CBSE Courses
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Partners Section */}
              <li className="nav-item">
                <div className="mobile-nav-section">
                  <div className="mobile-nav-header" onClick={() => toggleMobileNav('partners')}>
                    <span className="mobile-nav-title">Partners</span>
                    <span className={`mobile-nav-arrow ${mobileNavState.partners ? 'rotated' : ''}`}>▼</span>
                  </div>
                  <ul className={`mobile-nav-submenu ${mobileNavState.partners ? 'show' : ''}`}>
                    <li>
                      <Link to="/partners/join" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Join NEIEA as a Partner
                      </Link>
                    </li>
                    <li>
                      <Link to="/partners/institutions" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Partnering Institutions
                      </Link>
                    </li>
                    <li>
                      <Link to="/partners/global" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Global Partners
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>



              {/* Donation Section */}
              <li className="nav-item">
                <div className="mobile-nav-section">
                  <div className="mobile-nav-header" onClick={() => toggleMobileNav('donation')}>
                    <span className="mobile-nav-title">Donation</span>
                    <span className={`mobile-nav-arrow ${mobileNavState.donation ? 'rotated' : ''}`}>▼</span>
                  </div>
                  <ul className={`mobile-nav-submenu ${mobileNavState.donation ? 'show' : ''}`}>
                    <li>
                      <Link to="/donation/be-partner" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Be a Partner
                      </Link>
                    </li>
                    <li>
                      <Link to="/donation/volunteer" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Volunteer
                      </Link>
                    </li>
                    <li>
                      <Link to="/donate" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Donate
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* NEI USA Section */}
              {/* <li className="nav-item">
                <div className="mobile-nav-section">
                  <div className="mobile-nav-header" onClick={() => toggleMobileNav('neiUsa')}>
                    <span className="mobile-nav-title">NEI USA</span>
                    <span className={`mobile-nav-arrow ${mobileNavState.neiUsa ? 'rotated' : ''}`}>▼</span>
                  </div>
                  <ul className={`mobile-nav-submenu ${mobileNavState.neiUsa ? 'show' : ''}`}>
                    <li>
                      <Link to="/nei-usa/introduction" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                        Introduction
                      </Link>
                    </li>
                  </ul>
                </div>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Search Form */}
        <div
          className={`header-search-wrp ${showSearch ? 'show active' : ''}`}
          onClick={(e) => {
            if (e.target.classList.contains('header-search-wrp')) {
              closeSearch();
            }
          }}
        >
          <form action="#" className="header-search" role="search" onSubmit={handleSearchSubmit}>
            <div className="container">
              <button type="button" id="close-search" onClick={closeSearch}>

                <X />
              </button>
              <div className="form">
                <p>Search</p>
                <input
                  className="form-control"
                  name="s"
                  type="search"
                  placeholder="Type a keyword"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button title="submit" type="submit">
                 <ArrowRightCircle className='arrowRightIcon'/>
                </button>
              </div>
            </div>
          </form>
        </div>
      </header>
    </>
  );
};

export default Header;
