/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
        forest: {
          800: '#2A352C',
          900: '#1C251E',
          950: '#141B16',
        },
        wood: {
          DEFAULT: '#7B5E43',
          dark: '#4A3525',
          light: '#A6896F',
        },
        terracotta: {
          DEFAULT: '#B86B49',
          light: '#CF8463',
          dark: '#934F31',
        },
        charcoal: {
          800: '#262624',
          900: '#1A1A18',
          950: '#111110',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        script: ['"Caveat"', '"Playfair Display"', 'cursive'],
      },
      letterSpacing: {
        'widest-luxury': '0.22em',
      }
    },
  },
  plugins: [],
}
