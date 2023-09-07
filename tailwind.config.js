/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: '#a5f3fc',
      secondary: '#fef08a',
      gray: {
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af'
      },
      white: '#ffffff',
      black: '#000000'
    },
    screens: {
      mobile: {},
      tablet: {},
      desktop: {}
    }
  },
  plugins: []
};
