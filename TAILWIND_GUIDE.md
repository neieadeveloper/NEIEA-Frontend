# Tailwind CSS Configuration Guide for NEIEA Frontend

## Overview
This project now includes a comprehensive Tailwind CSS configuration with custom colors, components, and utilities specifically designed for the NEIEA (Non-Formal Education Initiative for Educational Advancement) project.

## 🎨 Custom Color Palette

### NEIEA Brand Colors
- `ngo-color1`: `#06038F` - Primary blue (main brand color)
- `ngo-color2`: `#FF671F` - Orange accent (call-to-action color)
- `ngo-color3`: `#1E40AF` - Dark blue (secondary brand color)
- `ngo-color4`: `#3B82F6` - Light blue (highlight color)
- `ngo-color5`: `#1D4ED8` - Medium blue (hover states)
- `ngo-color6`: `#1F2937` - Dark gray (text color)
- `ngo-color7`: `#6B7280` - Medium gray (muted text)
- `ngo-color8`: `#F3F4F6` - Light gray (background)

### Usage Examples
```html
<!-- Primary button -->
<button class="bg-ngo-color1 hover:bg-ngo-color5 text-white px-6 py-3 rounded-lg">
  Primary Action
</button>

<!-- Orange accent button -->
<button class="bg-ngo-color2 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
  Secondary Action
</button>

<!-- Text with brand colors -->
<h1 class="text-ngo-color1">Main Heading</h1>
<p class="text-ngo-color6">Body text</p>
```

## 🧩 Custom Components

### Buttons
- `.btn-primary` - Primary button with NEIEA styling
- `.btn-secondary` - Secondary button with orange accent
- `.btn-outline` - Outline button with brand colors

### Cards
- `.card-neiea` - Standard NEIEA card with soft shadow
- `.stats-card` - Statistics card with hover effects
- `.course-card` - Course card with lift animation
- `.testimonial-card` - Testimonial card styling

### Form Elements
- `.input-neiea` - Styled input field with focus states

### Layout
- `.section-padding` - Standard section padding
- `.container-neiea` - NEIEA container with max-width
- `.hero-section` - Full-height hero section with gradient

### Navigation
- `.nav-link` - Navigation link with hover effects
- `.nav-link.active` - Active navigation state

### Gradients
- `.text-gradient` - Gradient text effect
- `.bg-gradient-neiea` - NEIEA brand gradient background

## 🎭 Custom Animations

### Built-in Animations
- `animate-fade-in-up` - Fade in from bottom
- `animate-fade-in-down` - Fade in from top
- `animate-fade-in-left` - Fade in from left
- `animate-fade-in-right` - Fade in from right
- `animate-scale-in` - Scale in animation
- `animate-bounce-in` - Bounce in animation

### Usage Examples
```html
<!-- Animated card -->
<div class="course-card animate-fade-in-up">
  <h3>Course Title</h3>
  <p>Course description</p>
</div>

<!-- Bouncing button -->
<button class="btn-primary animate-bounce-in">
  Get Started
</button>
```

## 🛠️ Custom Utilities

### Text Effects
- `.text-shadow` - Soft text shadow
- `.text-shadow-lg` - Large text shadow

### Scrollbar
- `.scrollbar-hide` - Hide scrollbar while maintaining functionality

### Backdrop
- `.backdrop-blur-xs` - Extra small backdrop blur

## 📱 Responsive Design

The configuration includes responsive breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px

### Usage Examples
```html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="course-card">Course 1</div>
  <div class="course-card">Course 2</div>
  <div class="course-card">Course 3</div>
</div>

<!-- Responsive text -->
<h1 class="text-2xl md:text-4xl lg:text-6xl text-ngo-color1">
  Responsive Heading
</h1>
```

## 🎯 Dark Mode Support

The configuration includes dark mode support with CSS variables:

```html
<!-- Toggle dark mode -->
<html class="dark">
  <!-- Dark mode styles will be applied -->
</html>
```

## 📦 Component Examples

### Hero Section
```html
<section class="hero-section">
  <div class="container-neiea text-center text-white">
    <h1 class="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg">
      Welcome to NEIEA
    </h1>
    <p class="text-xl mb-8 opacity-90">
      Empowering education for all
    </p>
    <button class="btn-primary animate-bounce-in">
      Get Started
    </button>
  </div>
</section>
```

### Statistics Cards
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="stats-card">
    <h3 class="text-3xl font-bold text-ngo-color1 mb-2">1000+</h3>
    <p class="text-ngo-color6">Students Enrolled</p>
  </div>
  <div class="stats-card">
    <h3 class="text-3xl font-bold text-ngo-color1 mb-2">50+</h3>
    <p class="text-ngo-color6">Courses Available</p>
  </div>
  <div class="stats-card">
    <h3 class="text-3xl font-bold text-ngo-color1 mb-2">25+</h3>
    <p class="text-ngo-color6">Expert Teachers</p>
  </div>
</div>
```

### Course Card
```html
<div class="course-card">
  <img src="course-image.jpg" alt="Course" class="w-full h-48 object-cover">
  <div class="p-6">
    <h3 class="text-xl font-semibold text-ngo-color6 mb-2">Course Title</h3>
    <p class="text-ngo-color7 mb-4">Course description goes here...</p>
    <button class="btn-outline w-full">Enroll Now</button>
  </div>
</div>
```

## 🚀 Getting Started

1. **Use the custom classes** in your components
2. **Combine with standard Tailwind** classes for maximum flexibility
3. **Leverage the animations** for engaging user experiences
4. **Follow the color palette** for consistent branding

## 📝 Best Practices

1. **Use semantic class names** - Prefer `.btn-primary` over custom combinations
2. **Combine with utilities** - Add spacing, sizing, and responsive classes
3. **Maintain consistency** - Use the established color palette
4. **Test responsiveness** - Ensure components work across all breakpoints
5. **Optimize animations** - Use animations sparingly for better performance

## 🔧 Customization

To modify the configuration:

1. **Colors**: Edit `tailwind.config.js` → `theme.extend.colors`
2. **Components**: Edit `src/index.css` → `@layer components`
3. **Utilities**: Edit `src/index.css` → `@layer utilities`
4. **Animations**: Edit `tailwind.config.js` → `theme.extend.keyframes`

This configuration provides a solid foundation for building a modern, accessible, and visually appealing NEIEA frontend application.
