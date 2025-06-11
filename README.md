# Modern Portfolio Website

A beautiful, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing full-stack development skills with a focus on digital transformation and skills engineering.

## 🚀 Features

### Core Sections
- **Hero Section**: Animated introduction with social links and smooth scroll indicators
- **About Section**: Professional profile with downloadable CV and achievement statistics
- **Skills Section**: Interactive proficiency bars categorized by technology stack
- **Projects Section**: Filterable project showcase with detailed modals
- **Testimonials Section**: User-submitted testimonials with localStorage persistence
- **Contact Section**: Real-time form validation with accessibility support

### Interactive Features
- **Dark/Light Mode**: System preference detection with manual toggle
- **Smooth Animations**: Powered by Framer Motion with scroll-triggered animations
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewports
- **Toast Notifications**: User feedback using Sonner
- **Form Validation**: Schema-based validation with React Hook Form and Zod
- **Accessibility**: WCAG compliant with proper ARIA attributes

### Configuration System
- **JSON-Based Configuration**: Easy customization through `src/lib/portfolio-config.json`
- **Type-Safe**: Full TypeScript support with proper interfaces
- **Modular**: Separate configuration for personal info, skills, projects, testimonials, and contact details

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **shadcn/ui** with Radix UI primitives

### Form & Validation
- **React Hook Form** for efficient form handling
- **Zod** for schema validation
- **Sonner** for toast notifications

### Development Tools
- **ESLint** with TypeScript strict mode
- **Jest** and React Testing Library for testing
- **PostCSS** with Autoprefixer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## ⚙️ Configuration

### Personal Information
Edit `src/lib/portfolio-config.json` to customize your portfolio:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "subtitle": "Your Subtitle",
    "description": "Your description",
    "location": "Your Location",
    "email": "your.email@example.com",
    "phone": "+1 234 567 8900",
    "profileImage": "/your-image.jpg",
    "cv": "/your-cv.pdf",
    "bio": ["Your bio paragraphs..."],
    "socialLinks": {
      "github": "https://github.com/yourusername",
      "linkedin": "https://linkedin.com/in/yourusername",
      "email": "mailto:your.email@example.com",
      "twitter": "https://twitter.com/yourusername"
    }
  }
}
```

### Skills Configuration
Update the skills section with your proficiency levels:

```json
{
  "skills": {
    "frontend": [
      { "name": "React", "level": 95 },
      { "name": "TypeScript", "level": 90 }
    ],
    "backend": [
      { "name": "Node.js", "level": 85 },
      { "name": "Python", "level": 80 }
    ]
  }
}
```

### Projects Configuration
Add your projects with detailed information:

```json
{
  "projects": [
    {
      "id": "1",
      "title": "Project Title",
      "description": "Short description",
      "longDescription": "Detailed description",
      "category": "web",
      "image": "project-image-url",
      "tags": ["React", "TypeScript"],
      "links": {
        "demo": "https://demo-url.com",
        "github": "https://github.com/username/repo"
      },
      "features": ["Feature 1", "Feature 2"]
    }
  ]
}
```

### Assets
Place your assets in the `public` folder:
- Profile image: `public/your-image.jpg`
- CV file: `public/your-cv.pdf`
- Project images: Use external URLs or place in `public` folder

## 🧪 Testing

Run the test suite with:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

Tests include:
- Component rendering and functionality
- Form validation logic
- Accessibility compliance
- User interaction flows

## 🏗 Build & Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify
1. Build your project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure custom domain if needed

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on git push

## 🎨 Customization

### Colors & Theming
Edit `src/index.css` to customize the color palette:
```css
:root {
  --primary: 168 76% 42%;
  --secondary: 210 40% 98%;
  /* Add your custom colors */
}
```

### Content Updates
All content is managed through the configuration file:
- **Personal Info**: Update `personal` section in config
- **Skills**: Modify `skills` section with your technologies
- **Projects**: Add your projects in `projects` array
- **Contact Info**: Update contact details and office hours

### Animation Customization
Framer Motion animations can be customized in each section component. Adjust timing, easing, and effects in the `variants` objects.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Performance Optimizations

- **Code Splitting**: Automatic with Vite
- **Image Optimization**: Responsive images with proper aspect ratios
- **Bundle Analysis**: Use `npm run build -- --analyze`
- **Lighthouse Score**: Optimized for 90+ scores across all metrics

## 🚀 SEO Features

- **Meta Tags**: Proper title, description, and Open Graph tags
- **Structured Data**: Schema.org markup for better search visibility
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Sitemap**: Generate with build process

## 📋 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **JavaScript**: ES2020+ features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Pexels** for high-quality stock images
- **Lucide** for the icon set
- **Framer Motion** for animation capabilities

## 📞 Support

For questions or support:
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub Issues: [Repository Issues Page]

---

Built with ❤️ using React, TypeScript, and modern web technologies.

## 🔧 Configuration Guide

This portfolio uses a JSON-based configuration system that makes it easy to customize without touching the code. Here's how to set up your own portfolio:

### Step 1: Update Personal Information
Edit the `personal` section in `src/lib/portfolio-config.json`:
- Replace all placeholder text with your actual information
- Update social media links
- Add your profile image to the `public` folder
- Add your CV file to the `public` folder

### Step 2: Configure Skills
Update the `skills` section with your actual skill levels:
- Adjust proficiency percentages (0-100)
- Add or remove technologies as needed
- Skills are categorized into frontend, backend, tools, and database

### Step 3: Add Your Projects
Replace the example projects with your actual work:
- Use high-quality project images
- Include detailed descriptions and features
- Add working demo and GitHub links
- Categorize projects (web, mobile, design)

### Step 4: Customize Contact Information
Update the `contact` section:
- Set your office hours
- Customize the contact description
- Ensure contact details match your personal info

### Step 5: SEO Configuration
Update the `seo` section for better search visibility:
- Set appropriate meta title and description
- Add relevant keywords
- Update social media handles

The configuration system ensures type safety and makes the portfolio easily maintainable and shareable with others.