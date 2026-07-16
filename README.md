# Maria Kovalenko Photography

A responsive one-page portfolio website for a wedding photographer. The site
introduces the photographer and services, displays client feedback and a
filterable photo portfolio, answers frequently asked questions, and lets
visitors submit a booking enquiry.

## Features

- Responsive mobile, tablet, and desktop layout
- Mobile navigation menu
- Feedback slider with navigation and pagination
- Portfolio categories, pagination, loading states, and lazy-loaded images
- FAQ accordion
- Validated contact form connected to an external API
- Success and error notifications
- Accessible navigation, controls, labels, and semantic HTML
- Optimized production build for GitHub Pages

## Technologies and tools

- HTML5 with reusable partials
- CSS3, responsive media queries, CSS custom properties, and SVG sprites
- JavaScript (ES modules, async/await, and the DOM API)
- [Vite](https://vite.dev/) for development and production builds
- [Axios](https://axios-http.com/) for API requests
- [Swiper](https://swiperjs.com/) for the feedback slider
- [Accordion.js](https://github.com/michu2k/Accordion) for the FAQ section
- [SweetAlert2](https://sweetalert2.github.io/) for notifications and the
  success dialog
- `vite-plugin-html-inject` for HTML partial injection
- `vite-plugin-full-reload` for automatic HTML reloads during development
- PostCSS and `postcss-sort-media-queries` for media-query processing
- Glob for discovering HTML build entry points
- Modern Normalize for consistent browser styles
- Google Fonts: Cormorant and Mulish
- Prettier for consistent formatting

The portfolio, feedback, category, and order data use the GoIT Wedding
Photographer API:
`https://wedding-photographer.b.goit.study/api`.

## Project structure

```text
src/
├── css/        # Shared and section-specific styles
├── img/        # Images and SVG sprite
├── js/         # UI logic, API requests, sliders, forms, and notifications
├── partials/   # Reusable HTML sections
├── index.html  # Main page
└── main.js     # JavaScript entry point
```

## Getting started

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```
