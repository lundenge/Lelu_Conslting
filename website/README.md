# Lelu-Consulting Website

A professional, modern website for Lelu-Consulting - a technology consulting company specializing in Software Engineering, Artificial Intelligence, Machine Learning, Data Analytics, and Business Automation.

## 🚀 Features

- **Modern Design**: Clean, professional, and responsive UI built with Tailwind CSS
- **Multiple Pages**: Home, About, Services, Portfolio, and Contact pages
- **Mobile Responsive**: Fully optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Metadata and proper heading structure for search engines
- **Contact Form**: Interactive contact form with validation
- **Performance Optimized**: Built with Next.js 14 for fast performance
- **Professional Branding**: Consistent color scheme and typography throughout

## 📋 Pages

- **Home**: Hero section with service overview and call-to-action
- **About**: Company vision, mission, values, and founder profile
- **Services**: Detailed service offerings including Software Engineering, AI/ML, Data Analytics, Business Automation, AI Consulting, and Cloud Solutions
- **Portfolio**: AI-powered business solutions and use cases
- **Contact**: Contact form, FAQs, and contact information

## 🛠️ Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CSS**: PostCSS
- **Node.js**: 18+

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Setup

1. Navigate to the website directory:
   ```bash
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## 🏗️ Project Structure

```
website/
├── app/
│   ├── layout.tsx           # Root layout with Header and Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── services/
│   │   └── page.tsx        # Services page
│   ├── portfolio/
│   │   └── page.tsx        # Portfolio page
│   └── contact/
│       └── page.tsx        # Contact page
├── components/
│   ├── Header.tsx          # Navigation header
│   └── Footer.tsx          # Footer component
├── public/                 # Static assets
├── package.json            # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── next.config.js         # Next.js configuration
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors
Modify the color scheme in `tailwind.config.ts`:
```typescript
colors: {
  primary: '#1f2937',
  secondary: '#3b82f6',
  accent: '#10b981',
}
```

### Content
Update content in the respective page files:
- Home: `app/page.tsx`
- About: `app/about/page.tsx`
- Services: `app/services/page.tsx`
- Portfolio: `app/portfolio/page.tsx`
- Contact: `app/contact/page.tsx`

### Company Information
- Update company name, email, and phone in footer and contact page
- Modify social media links in Footer component

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile (320px and up)
- Tablet (768px and up)
- Desktop (1024px and up)

## 🔒 Security

- Built with security best practices
- No sensitive data hardcoded
- Environment variables support for configuration

## 📧 Contact Form

The contact form is interactive and provides user feedback. To integrate with an email service:

1. Choose an email service provider (SendGrid, Mailgun, etc.)
2. Update the form submission handler in `app/contact/page.tsx`
3. Add environment variables for API keys

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Docker
```bash
docker build -t lelu-consulting .
docker run -p 3000:3000 lelu-consulting
```

### Traditional Hosting
1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Point your domain to the server

## 📄 License

© 2024 Lelu-Consulting. All rights reserved.

## 👥 Support

For questions or support, contact us at:
- Email: hello@leluconsulting.com
- Phone: +61 (0)4 1234 5678

## 🔄 Updates & Maintenance

To keep the website updated:
1. Pull latest changes
2. Update dependencies: `npm update`
3. Test locally: `npm run dev`
4. Deploy: `npm run build && npm start`

---

Built with ❤️ by Lelu-Consulting
