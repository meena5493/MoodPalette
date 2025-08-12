# Mood Mirror - Daily Mood Checker

## Overview

Mood Mirror is a simple web-based mood tracking application that helps users identify and reflect on their daily emotional state. The app provides an interactive interface where users can select their current mood from predefined options (happy, sad, angry, tired, excited) and receive motivational quotes tailored to their emotional state. The application features a clean, responsive design with dynamic color themes that change based on the selected mood, creating an immersive and personalized user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure client-side web application** using vanilla HTML, CSS, and JavaScript
- **Component-based JavaScript class structure** with a central `MoodMirror` class managing application state
- **CSS custom properties (CSS variables)** for theme management and mood-specific styling
- **Responsive design** using CSS Flexbox and Grid for cross-device compatibility
- **No build process required** - runs directly in the browser

### UI/UX Design Patterns
- **Theme switching system** that dynamically changes background colors and visual elements based on selected mood
- **Icon-based mood selection** using Font Awesome icons for intuitive user interaction
- **Quote rotation system** displaying contextually appropriate motivational messages for each mood state
- **Smooth animations and transitions** for enhanced user experience

### Data Management
- **In-memory state management** through JavaScript objects storing mood configurations
- **Static data structure** containing mood definitions, associated colors, icons, and quote collections
- **No persistent storage** - application resets on page refresh (suitable for daily mood checking)

### Styling Architecture
- **CSS custom properties** for centralized theme management
- **Mood-specific color palettes** with primary and accent colors for each emotional state
- **Google Fonts integration** (Poppins) for consistent typography
- **External icon library** (Font Awesome) for scalable mood icons

## External Dependencies

### CDN-hosted Libraries
- **Font Awesome 6.4.0** - Icon library for mood buttons and visual elements
- **Google Fonts (Poppins)** - Typography system for consistent font rendering across devices

### Browser APIs
- **DOM Manipulation APIs** - For dynamic content updates and user interaction handling
- **CSS Transitions/Animations** - For smooth visual state changes

### No Backend Dependencies
- Application runs entirely in the browser without server-side components
- No database connections or external API calls required
- Self-contained design suitable for static hosting platforms
