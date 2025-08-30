/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: '#3758F9',
        accent: '#3B8FEE',
        light: '#E9F5FE',
        'gray-text': '#4D4D4D',
      },
    },
  },
  plugins: [],
};
