import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: { base: '#59473C', darken: '#311B0E', lighten: '#8C6F5E' },
        active: {
          base: '#FF7A00',
          darken: '#D76700',
          lighten: '#FFC998',
          lightest: '#FFE6CE'
        },
        sub: {
          blue: '#487DAD',
          sky: '#CCF7FA',
          red: '#FF3D00',
          lime: '#40DF32',
          green: '#349E2C'
        },
        gray: {
          100: '#F1F1F1',
          200: '#DCDDDE',
          300: '#8A8A8A',
          400: '#5F5F5F',
          500: '#313131',
          600: '#B1B1B1'
        },
        white: '#ffffff',
        black: '#000000'
      },
      fontFamily: { OAGothic: ['OAGothic'] },
      screens: {
        mobile: {},
        tablet: {},
        desktop: {},
        cs: '0px'
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none'
        },
        '.no-scrollbar': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none'
        }
      });
    })
  ]
};
