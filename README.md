# NEIEA React Website

A modern React application built with Vite, recreating the NEIEA website with enhanced functionality and performance.

## 🚀 Features

- **Modern React Architecture**: Built with React 19 and Vite for optimal performance
- **Responsive Design**: Fully responsive layout that works on all devices
- **Interactive Components**: 
  - Dynamic banner carousel
  - Animated statistics counters
  - YouTube video integration
  - Interactive testimonials slider
  - Dropdown navigation menus
- **Bootstrap Integration**: Using React Bootstrap for consistent UI components
- **Custom Hooks**: Reusable hooks for YouTube player and other functionality
- **Optimized Assets**: Properly organized images, CSS, and JavaScript files

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite
- **UI Framework**: React Bootstrap, Bootstrap 5
- **Routing**: React Router DOM
- **Styling**: Custom CSS with Bootstrap integration
- **Icons**: SVG icons and custom graphics
- **Video**: YouTube API integration

## 📁 Project Structure

```
neiea-react/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Banner.jsx          # Hero banner carousel
│   │   ├── OurMission.jsx      # Mission section
│   │   ├── VideoSection.jsx    # YouTube video section
│   │   ├── GlobalPrograms.jsx  # Programs showcase
│   │   ├── Statistics.jsx      # Animated statistics
│   │   ├── UpcomingEvents.jsx  # Events listing
│   │   └── Testimonials.jsx    # Testimonials carousel
│   ├── pages/
│   │   └── Home.jsx            # Main home page
│   ├── hooks/
│   │   └── useYouTubePlayer.js # YouTube player hook
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── assets/
│   │   ├── images/             # All website images
│   │   ├── css/
│   │   │   └── style.css       # Main stylesheet
│   │   └── js/                 # Original JS files
│   ├── App.jsx                 # Main app component
│   └── main.jsx               # App entry point
├── index.html                 # HTML template
└── package.json              # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd neiea-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Components Overview

### Header Component
- Responsive navigation with dropdown menus
- Mobile-friendly offcanvas navigation
- Search functionality
- Logo integration

### Banner Component
- Image carousel with smooth transitions
- Custom indicators
- Responsive design
- Call-to-action buttons

### Video Section
- YouTube API integration
- Custom play/pause controls
- Responsive video player
- Feature highlights

### Statistics Component
- Animated number counters
- Intersection Observer for trigger
- Responsive grid layout
- Impact highlights

### Testimonials Component
- Carousel with custom indicators
- Star ratings
- Author information
- Smooth transitions

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add route in `App.jsx`
3. Update navigation in `Header.jsx`

### Styling
- Main styles: `src/assets/css/style.css`
- Bootstrap classes for responsive design
- Custom CSS variables for theming

### Images
- All images stored in `src/assets/images/`
- Optimized for web performance
- SVG icons for scalability

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 991px
- Desktop: > 992px

## 🚀 Performance Features

- **Vite**: Fast development and optimized builds
- **React 19**: Latest React features and performance improvements
- **Code Splitting**: Automatic route-based code splitting
- **Optimized Assets**: Compressed images and minified CSS/JS
- **Lazy Loading**: Components loaded as needed

## 🔗 External Integrations

- **YouTube API**: For video playback
- **Google Fonts**: Roboto font family
- **Bootstrap CDN**: For additional styling

## 📄 License

This project is created for NEIEA organization. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please contact the development team.

---

Built with ❤️ for the NEIEA community