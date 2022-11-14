/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{js,ts,jsx,tsx}", // New
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      'transparent': 'transparent',
      'white': '#ffffff',
      'black': '#000000',
      'grey': '#716e67',
      'header-divider-color': '#cc0c1f',
      'bg-color': '#fff',
      'text-color': '#233867',
      'content-text-color': '#373a36',

      'menu-items-text-color': '#373a36',
      'header-bg-color': '#fff',
      'header-cta-bg-color': '#CC0C1F',
      'header-cta-bg-hover-color': '#233867',
      'header-text-color': '#f7edd9',
      'header-cta-text-color': '#fff',

      'footer-bg-color': '#001F46',
      'footer-text-color': '#fff',
      'footer-link-color': '#fff',
      'footer-link-hover-color': '#00A9D5',
      
      'nav-button-text-color': '#f7edd9',
      'nav-button-bg-color': '#373a36',
      'title-text-color': '#233867',
      'coloured-text-color': '#CC0C1F',

      'button-border-color': '#cc0c1f',
      'primary-btn-bg-color': '#fff',
      'primary-btn-bg-hover-color': '#233867',
      'primary-btn-text-color': '#233867',
      'primary-btn-text-hover-color': '#fff',
      'boxed-primary-btn-text-color': '#001F46',
      'boxed-primary-btn-bg-color': '#fff',
      'boxed-primary-btn-border-color': '#001F46',

      'full-bleed-bg-color': '#89a84f',
      'dividing-line-color': '',
      'dietary-requirements-bg-color': '#89a84f',
      'additional-toppings-border-color': '#cc0c1f',
      'link-text-color': '#89a84f',

      'search-bg': '#001F46',
      'search-text-color': '#fff',
      'search-btn-bg': '#CC0C1F',
      'search-btn-bg-hover': '#CC0C1F',

      'location-card-bg': '#fff',
      'location-card-bg-hover': '#f5f5f7',

      'scroll-bar': '#F5F5F7',
      'scroll-thumb': '#001F46',


    },
    fontFamily: {
      'main-text-font': ['"avenir_lt_std55_roman", Georgia, Arial, sans-serif'],
      'title-text-font': ['"avenir_lt_std95_black", Georgia, Arial, sans-serif'],
      'regular-font': ['"avenir_lt_std45_book", Georgia, Arial, sans-serif'],
    },
    extend: {
      backgroundImage: {
        'closeIcon': "url('images/close.svg')",
      }
    },
  },
  plugins: [],
};