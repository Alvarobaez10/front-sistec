/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // si usas App Router
    './pages/**/*.{js,ts,jsx,tsx}', // si usas Pages Router
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // si tienes src/
  ],
  safelist: [
    { pattern: /grid-cols-(\d+)/ }, // todas las columnas (1-12)
    { pattern: /gap-(\d+)/ }, // todos los gaps
    { pattern: /w-(\d+|full)/ }, // widths
    { pattern: /h-(\d+|full)/ }, // heights
  ],
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
