# MatterHubs - Astro with Shopify

A modern, high-performance e-commerce website built with Astro and integrated with Shopify. This project uses Tailwind CSS for styling, React for interactive components, and offers several deployment options.

![MatterHubs](public/images/logo.png)

## Features

- 🚀 **Built with Astro**: Leveraging Astro's server-side rendering for optimal performance
- 🛒 **Shopify Integration**: Full integration with Shopify for product management, cart, and checkout
- 🎨 **Tailwind CSS**: Modern, responsive UI with Tailwind CSS
- ⚛️ **React Components**: Interactive UI components built with React
- 🌙 **Dark Mode Support**: Integrated dark/light theme switching
- 📱 **Fully Responsive**: Optimized for all device sizes
- 🔍 **SEO Optimized**: Built-in SEO best practices
- 🚤 **Fast Page Load**: Optimized for core web vitals
- 🌐 **Multiple Deployment Options**: Docker, VPS, Vercel, or Netlify deployment options

## Prerequisites

- Node.js (v18 or later)
- Yarn or npm
- Shopify store with API access

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/astrofront-astro.git
cd astrofront-astro
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Set up environment variables:
   
Create a `.env` file in the root directory with the following variables:

```env
PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN=your_storefront_api_token
```

4. Start the development server:

```bash
yarn dev
# or
npm run dev
```

## Project Structure

```
├── public/             # Static files
├── src/
│   ├── components/     # UI components
│   ├── config/         # Site configuration
│   ├── content/        # Markdown content for pages
│   ├── layouts/        # Page layouts
│   ├── lib/            # Utility functions and Shopify API
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   └── types/          # TypeScript type definitions
├── astro.config.mjs    # Astro configuration
├── tailwind.config.cjs # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

## Configuration

### Site Configuration

Edit the site configuration in `src/config/config.json`:

```json
{
  "site": {
    "title": "Your Site Title",
    "base_url": "https://yourdomain.com",
    "base_path": "/",
    "trailing_slash": false
  },
  "shopify": {
    "collections": {
      "featured_products": "gid://shopify/Collection/your-collection-id",
      "best_selling_products": "gid://shopify/Collection/your-collection-id",
      "hero_slider": "gid://shopify/Collection/your-collection-id"
    }
  }
}
```

### Menu Configuration

Edit the menu configuration in `src/config/menu.json`.

## Deployment Options

### Option 1: Deploy on a VPS with Node.js

Follow the detailed guide on [Serving an SSR Astro App on a VPS](https://jimmysweeney.page/blog/serve-ssr-astro-app-vps/) for step-by-step instructions.

1. SSH into your VPS
2. Clone the repository
3. Install dependencies with `yarn install`
4. Build the project with `yarn build`
5. Set up a process manager like PM2:

```bash
npm install -g pm2
pm2 start dist/server/entry.mjs --name "astro-app"
pm2 startup
pm2 save
```

6. Set up Nginx as a reverse proxy (sample configuration provided in the article)

### Option 2: Deploy with Docker

The project includes a Dockerfile for containerized deployment:

1. Build the Docker image:

```bash
docker build -t astrofront-astro .
```

2. Run the container:

```bash
docker run -p 80:80 astrofront-astro
```

### Option 3: Deploy on Vercel

1. Install the Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy to Vercel:

```bash
vercel
```

### Option 4: Deploy on Netlify

1. Install the Netlify CLI:

```bash
npm install -g netlify-cli
```

2. Deploy to Netlify:

```bash
netlify deploy
```

## Customization

### Adding New Pages

1. Create a new `.astro` file in the `src/pages/` directory
2. Or create a new markdown file in `src/content/` for content-based pages

### Modifying the Theme

Edit the Tailwind configuration in `tailwind.config.cjs` and theme colors in `src/config/theme.json`.

### Adding Custom Fonts

Edit the font configuration in the Astro configuration file (`astro.config.mjs`).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
