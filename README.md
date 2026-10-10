# Khwaja Iqyan Ali - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite, showcasing my skills, projects, and professional experience as a Full-Stack Web Developer.

## 🌟 Live Demo

[**View Live Portfolio**](https://khwaja-iqyan-ali-portfolio.vercel.app/)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework with hooks and modern patterns
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Wouter** - Lightweight routing solution

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
portfolio/
├── client/
│   ├── public/
│   │   ├── images/          # Project screenshots and profile picture
│   │   ├── favicon-new.svg  # Favicon
│   │   └── Khwaja_Iqyan_Ali_resume.pdf # Resume download
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Reusable UI components
│   │   │   ├── Navigation.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── SkillBar.tsx
│   │   │   └── ExperienceCard.tsx
│   │   ├── pages/
│   │   │   ├── Portfolio.tsx # Main portfolio page
│   │   │   └── not-found.tsx
│   │   ├── hooks/
│   │   │   ├── use-portfolio.ts
│   │   │   └── use-toast.ts
│   │   ├── lib/
│   │   │   ├── data.ts      # Portfolio data
│   │   │   ├── utils.ts     # Utility functions
│   │   │   └── queryClient.ts
│   │   ├── App.tsx          # Root component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html           # HTML template
│   └── requirements.md      # Component requirements
├── package.json             # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.cjs     # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.cjs      # PostCSS configuration
└── vercel.json             # Vercel deployment settings
```

## 🚀 Features

### ✨ Core Features
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - Engaging micro-interactions with Framer Motion
- **Dark Theme** - Modern dark theme with gradient accents
- **Component-Based Architecture** - Reusable and maintainable components
- **TypeScript Support** - Full type safety throughout the application

### 📱 Sections
1. **Hero Section** - Introduction with profile picture and CTA buttons
2. **Tech Stack** - Animated marquee of technologies
3. **About Me** - Personal introduction and skills overview
4. **Technical Proficiency** - Visual skill bars with animations
5. **Featured Projects** - Major full-stack projects showcase
6. **Minor Projects** - Learning and practice projects
7. **Work Experience** - Professional journey and certifications
8. **Contact** - Contact form and information

### 🎨 Design Highlights
- **Glass Morphism** - Modern frosted glass effects
- **Gradient Accents** - Beautiful color gradients throughout
- **Smooth Scrolling** - Section-based navigation with react-scroll
- **Hover Effects** - Interactive elements with transitions
- **Loading States** - Skeleton loaders for better UX

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/iqyanali17/iqyan-Ali-portfolio.git
   cd iqyan-Ali-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript type checking

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```
The build output will be in the `dist/` directory.

### Vercel Deployment
This project is configured for automatic deployment on Vercel:

1. **Automatic Deployment** - Connected to GitHub repository
2. **Build Configuration** - Optimized settings in `vercel.json`
3. **Custom Domain** - Can be configured in Vercel dashboard
4. **Environment Variables** - Configured in Vercel settings

### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

## 🎯 Key Components

### Navigation
- Sticky navigation with smooth scroll
- Mobile-responsive hamburger menu
- Active section highlighting

### Project Cards
- Interactive hover effects
- Technology tags
- Live demo and repository links
- Responsive grid layout

### Contact Form
- Form validation with Zod
- Toast notifications
- Responsive form layout

## 🔧 Customization

### Adding New Projects
1. Update `client/src/lib/data.ts` with project information
2. Add project screenshots to `client/public/images/`
3. Update project metadata in the data file

### Modifying Skills
1. Update skills data in `client/src/lib/data.ts`
2. Adjust skill levels and categories
3. Add new skill icons as needed

### Styling Changes
1. Modify `tailwind.config.cjs` for theme customization
2. Update CSS variables in `client/src/index.css`
3. Adjust component-specific styles

## 🌐 Browser Support

- **Chrome** (Recommended)
- **Firefox**
- **Safari**
- **Edge**
- **Mobile Browsers** (iOS Safari, Chrome Mobile)

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with code splitting
- **Loading Time**: < 2 seconds on 3G network
- **Core Web Vitals**: All metrics in green zone

## 🤝 Contributing

This is a personal portfolio project. For suggestions or improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About Me

I'm Khwaja Iqyan Ali, a passionate Full-Stack Web Developer specializing in the MERN stack. I love building scalable web applications and creating beautiful user interfaces. Currently pursuing Computer Science and actively seeking opportunities to apply my skills in real-world projects.

### 📞 Connect With Me

- **Email**: khwajaiqyanali@gmail.com
- **Phone**: +91 93594 96162
- **Portfolio**: [khwaja-iqyan-ali-portfolio.vercel.app](https://khwaja-iqyan-ali-portfolio.vercel.app/)
- **GitHub**: [github.com/iqyanali17](https://github.com/iqyanali17)

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For the smooth animation library
- **Radix UI** - For accessible component primitives
- **Vercel** - For the amazing hosting platform

---

**Built with ❤️ using React, TypeScript, and modern web technologies**