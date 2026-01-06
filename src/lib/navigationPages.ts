// Navigation config for all pages
export const navigationPages = [
  {
    label: "About Us",
    key: "about-us",
    submenus: [
      { label: 'Introduction of NEIEA', key: 'introduction' },
      { label: 'Vision and Mission', key: 'vision-mission' },
      { label: 'Leadership and Team', key: 'leadership' },
      { label: 'Management Advisory Board', key: 'advisory-board' },
      { label: 'Blended Learning Model', key: 'blended-learning' },
      { label: 'Our Working Process', key: 'workshops' },
      { label: 'Application of Technologies', key: 'technologies' },
      { label: 'Discourse Oriented Pedagogy (DOP)', key: 'eop' },
      { label: 'Impact', key: 'impact' },
      { label: 'Testimonials', key: 'testimonials' },
    ],
  },
  {
    label: "Our Projects",
    key: "our-projects",
    submenus: [
      { label: 'IT Skills Training', key: 'it-skills-training' },
      {label: "Cluster Education", key: "cluster-education"},
      {label: "Teachers Training", key: "teachers-training"},
      {label: "Slum Children Education", key: "slum-children"},
      {label: "Out Of School Children Education", key: "out-of-school"},
      {label: "Girls Education", key: "girls-education"},
      {label: "Pedagogy Training", key: "pedagogy-training"},
      {label: "Madarsa Education", key: "madarsa-education"},
      {label: "Social And Financial Education", key: "social-financial"},
      {label: "Adult Education", key: "adult-education"},
      {label: "Public (Government) School Education", key: "public-schools"},
    ],
  },
  // Add more main pages here as needed
];

export type NavigationPage = typeof navigationPages[number]; 