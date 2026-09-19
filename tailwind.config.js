/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        showroom: {
          bg: '#F5F0E8',
          secondary: '#EAE0D2',
          cream: '#F8F4EC',
          dark: '#241A14',
          walnut: '#3A261B',
          wood: '#70482D',
          teak: '#A66A3A',
          brass: '#B18A52',
          gold: '#C5A059',
          border: '#DFD5C6',
          sand: '#E3D7C7',
          charcoal: '#1A1410',
        },
        ivory: {
          50: '#FDFCFB',
          100: '#FAF7F2',
          200: '#F4EFEB',
          300: '#EAE2D9',
          400: '#D8CDC1',
        },
        sand: {
          100: '#EFEAE4',
          200: '#E5DED6',
          300: '#D5C9BD',
          400: '#B8A695',
        },
        wood: {
          DEFAULT: '#70482D',
          dark: '#3A261B',
          light: '#A66A3A',
          honey: '#C48A49',
          deep: '#241A14',
        },
        charcoal: {
          800: '#241A14',
          900: '#1B130E',
          950: '#120C09',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
      },
      letterSpacing: {
        'widest-luxury': '0.22em',
      }
    },
  },
  plugins: [],
}
