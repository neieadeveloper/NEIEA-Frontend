import { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

interface NavigationProps {
  onPageSelect: (pagePath: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onPageSelect }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [activeSubSubDropdown, setActiveSubSubDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Home',
      dropdown: [
        { label: 'Manage Homepage', path: '/admin/dashboard/manage-website-pages/home' }
      ]
    },
    {
      label: 'About NEIEA',
      dropdown: [
        { label: 'Introduction', path: '/about-us/introduction' },
        { label: 'Leadership', path: '/about-us/leadership' },
        {
          label: 'Our Working Model',
          subDropdown: [
            {
              label: 'Blended Learning Model',
              subDropdown: [
                { label: 'Blended Learning', path: '/about-us/working-model/blended-learning' },
                { label: 'Discourse Oriented Pedagogy', path: '/about-us/working-model/blended-learning/discourse-oriented-pedagogy' },
                { label: 'Application Of Technology', path: '/about-us/working-model/blended-learning/application-of-technology' }
              ]
            },
            { label: 'Partnering with Educational Institutions', path: '/about-us/working-model/partnering-institutions' },
            { label: 'Remote Individual Learning', path: '/about-us/working-model/remote-learning' }
          ]
        },
        { label: 'Testimonials & Featured stories', path: '/about-us/testimonials' },
        { label: 'Gallery', path: '/about-us/media-events/gallery' },
        { label: 'Reports and Financials', path: '/about-us/reports-financials' },
        { label: 'Contact us', path: '/about-us/contact' }
      ]
    },
    {
      label: 'Our Work',
      dropdown: [
        {
          label: 'Education',
          subDropdown: [
            { label: 'Elementary & Middle School', path: '/our-works/education/elementary-middle-school' },
            
            { label: 'Slum children', path: '/our-works/education/slum-children' },
            { label: 'Public (Government) School', path: '/our-works/education/public-government-school' },
            { label: 'Girl\'s Education', path: '/our-works/education/girls-education' },
            { label: 'Out of school / School Dropout', path: '/our-works/education/out-of-school-dropout' },
            { label: 'Madrasa', path: '/our-works/education/madrasa' }
          ]
        },
        { label: 'Teachers Training', path: '/our-works/teachers-training' },
        {
          label: 'Skills Training',
          subDropdown: [
            { label: 'Soft Skill Training', path: '/our-works/skills-training/soft-skills' },
            { label: 'Technical Skill Training', path: '/our-works/skills-training/technical-skills' }
          ]
        },
        { label: 'Adult Education', path: '/our-works/education/adult-education' },
        { label: 'Global Education', path: '/our-works/global-education' }
      ]
    },
    {
      label: 'Partners',
      dropdown: [
        { label: 'Join NEIEA as a Partner', path: '/partners/join' },
        { label: 'Partner Institutions', path: '/partners/institutions' },
        { label: 'Global Partners', path: '/partners/global' }
      ]
    },
    {
      label: 'Donation',
      dropdown: [
        { label: 'Be a Partner', path: '/donation/be-partner' },
        // { label: 'Volunteer', path: '/donation/volunteer' },
        // { label: 'Donate', path: '/donate' }
      ]
    },
    // {
    //   label: 'NEI USA',
    //   dropdown: [
    //     { label: 'Introduction', path: '/admin/dashboard/manage-website-pages/nei-usa-introduction' }
    //   ]
    // },
    {
      label: 'Other Pages',
      dropdown: [
        { label: 'Career', path: '/career' },
        { label: 'Privacy Policy', path: '/other/privacy-policy' }
      ]
    }
  ];

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
    setActiveSubDropdown(null);
    setActiveSubSubDropdown(null);
  };

  const handleSubDropdownToggle = (label: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveSubDropdown(activeSubDropdown === label ? null : label);
    setActiveSubSubDropdown(null);
  };

  const handleSubSubDropdownToggle = (label: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveSubSubDropdown(activeSubSubDropdown === label ? null : label);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handlePageSelect = (pagePath: string) => {
    // Handle page selection logic here
    console.log('Selected page:', pagePath);
    onPageSelect(pagePath);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setActiveSubSubDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group">
                  <button
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={() => handleDropdownToggle(item.label)}
                  >
                    <span>{item.label}</span>
                    {activeDropdown === item.label ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {item.dropdown.map((dropdownItem, index) => (
                          <div key={index}>
                            {dropdownItem.subDropdown ? (
                              <div className="relative">
                                <button
                                  className="flex items-center justify-between w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                                  onClick={(e) => handleSubDropdownToggle(dropdownItem.label, e)}
                                >
                                  <span>{dropdownItem.label}</span>
                                  <ChevronDown className="w-3 h-3" />
                                </button>
                                {activeSubDropdown === dropdownItem.label && (
                                  <div className="absolute left-full top-0 ml-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <div className="py-1">
                                      {dropdownItem.subDropdown.map((subItem, subIndex) => (
                                        <div key={subIndex}>
                                          {subItem.subDropdown ? (
                                            <div className="relative">
                                              <button
                                                className="flex items-center justify-between w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                                                onClick={(e) => handleSubSubDropdownToggle(subItem.label, e)}
                                              >
                                                <span>{subItem.label}</span>
                                                <ChevronDown className="w-3 h-3" />
                                              </button>
                                              {activeSubSubDropdown === subItem.label && (
                                                <div className="absolute left-full top-0 ml-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                                  <div className="py-1">
                                                    {subItem.subDropdown.map((subSubItem, subSubIndex) => (
                                                      <button
                                                        key={subSubIndex}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                                                        onClick={() => handlePageSelect(subSubItem.path)}
                                                      >
                                                        {subSubItem.label}
                                                      </button>
                                                    ))}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          ) : (
                                            <button
                                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                                              onClick={() => handlePageSelect(subItem.path)}
                                            >
                                              {subItem.label}
                                            </button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                                onClick={() => handlePageSelect(dropdownItem.path)}
                              >
                                {dropdownItem.label}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Manage Website Pages</h2>
            <button
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              onClick={handleMobileMenuToggle}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <button
                    className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    onClick={() => handleDropdownToggle(item.label)}
                  >
                    <span className="font-medium">{item.label}</span>
                    {activeDropdown === item.label ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {/* Mobile Dropdown */}
                  {activeDropdown === item.label && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdown.map((dropdownItem, index) => (
                        <div key={index}>
                          {dropdownItem.subDropdown ? (
                            <div>
                              <button
                                className="flex items-center justify-between w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                                onClick={() => handleSubDropdownToggle(dropdownItem.label, {} as React.MouseEvent)}
                              >
                                <span>{dropdownItem.label}</span>
                                {activeSubDropdown === dropdownItem.label ? (
                                  <ChevronUp className="w-3 h-3" />
                                ) : (
                                  <ChevronDown className="w-3 h-3" />
                                )}
                              </button>
                              {activeSubDropdown === dropdownItem.label && (
                                <div className="ml-4 mt-1 space-y-1">
                                  {dropdownItem.subDropdown.map((subItem, subIndex) => (
                                    <div key={subIndex}>
                                      {subItem.subDropdown ? (
                                        <div>
                                          <button
                                            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                                            onClick={() => handleSubSubDropdownToggle(subItem.label, {} as React.MouseEvent)}
                                          >
                                            <span>{subItem.label}</span>
                                            {activeSubSubDropdown === subItem.label ? (
                                              <ChevronUp className="w-3 h-3" />
                                            ) : (
                                              <ChevronDown className="w-3 h-3" />
                                            )}
                                          </button>
                                          {activeSubSubDropdown === subItem.label && (
                                            <div className="ml-4 mt-1 space-y-1">
                                              {subItem.subDropdown.map((subSubItem, subSubIndex) => (
                                                <button
                                                  key={subSubIndex}
                                                  className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                                                  onClick={() => handlePageSelect(subSubItem.path)}
                                                >
                                                  {subSubItem.label}
                                                </button>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <button
                                          className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                                          onClick={() => handlePageSelect(subItem.path)}
                                        >
                                          {subItem.label}
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <button
                              className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                              onClick={() => handlePageSelect(dropdownItem.path)}
                            >
                              {dropdownItem.label}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Click outside to close dropdown */}
      {(activeDropdown || activeSubDropdown || activeSubSubDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setActiveDropdown(null);
            setActiveSubDropdown(null);
            setActiveSubSubDropdown(null);
          }}
        />
      )}
    </div>
  );
};

export default Navigation;
