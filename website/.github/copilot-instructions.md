# Lelu-Consulting Website Development Guide

This document provides workspace-specific instructions for developing and maintaining the Lelu-Consulting website.

## Project Overview

This is a professional Next.js website for Lelu-Consulting, a technology consulting company specializing in Software Engineering, AI, Machine Learning, and Data Analytics.

## Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS
- **Package Manager**: npm
- **Node Version**: 18+

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

## Project Structure

```
app/               - Next.js App Router
├── page.tsx      - Home page
├── about/        - About page
├── services/     - Services page
├── portfolio/    - Portfolio/Solutions page
├── contact/      - Contact page
├── layout.tsx    - Root layout
└── globals.css   - Global styles

components/       - Reusable React components
├── Header.tsx   - Navigation header
└── Footer.tsx   - Footer component

public/          - Static assets (images, etc.)
```

## Development Guidelines

### Pages

Each page is a server component in Next.js:
- Use 'use client' for interactive features (forms, state)
- Keep components focused and organized
- Use TypeScript for type safety

### Styling

- Use Tailwind CSS for utility classes
- Custom styles in globals.css for global rules
- Maintain consistent spacing (py-20 md:py-32 pattern)
- Color scheme: primary (#1f2937), secondary (#3b82f6), accent (#10b981)

### Components

- Keep components reusable and modular
- Pass props with TypeScript interfaces
- Use clear, descriptive names

## Common Tasks

### Add a New Page

1. Create `app/newpage/page.tsx`
2. Add route to navigation in Header component
3. Update Footer if needed

### Update Colors

Edit `tailwind.config.ts` and `app/globals.css`

### Modify Content

Edit content directly in the page files (all content is inline for easy management)

### Add Images

1. Place images in `public/` folder
2. Import and use with Next.js Image component

## Building & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Contact Form

The contact form in `app/contact/page.tsx` currently logs data to console. To enable email functionality:

1. Add an email service (SendGrid, Mailgun, Resend)
2. Update form submission handler
3. Add environment variables (.env.local)

## Performance Tips

- Use Next.js Image for images (auto optimization)
- Code splitting is automatic per route
- CSS is scoped to components using Tailwind
- Server components by default for better performance

## Troubleshooting

### Build Errors
- Clear .next folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript: `npm run lint`

### Development Server Issues
- Kill all node processes
- Clear cache: `npm cache clean --force`
- Reinstall: `npm install`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Contributing

- Follow the existing code style
- Use TypeScript for all new code
- Test locally before committing
- Keep commits focused and descriptive

## Maintenance

- Update dependencies regularly: `npm update`
- Test after updates: `npm run dev`
- Check for security vulnerabilities: `npm audit`

---

Last Updated: June 2024
