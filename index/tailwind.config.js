/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede8ff',
          200: '#dbd0ff',
          300: '#c3afff',
          400: '#a580ff',
          500: '#8a4fff',
          600: '#7828f8',
          700: '#6818dd',
          800: '#5717b3',
          900: '#491991',
          950: '#2c0e61',
        },
        secondary: {
          50: '#f1fcf9',
          100: '#d0f7ef',
          200: '#a1edde',
          300: '#68dec8',
          400: '#38c6af',
          500: '#1ba390',
          600: '#158576',
          700: '#156a62',
          800: '#155550',
          900: '#154642',
          950: '#052f2d',
        },
        accent: {
          50: '#fff8eb',
          100: '#ffecc6',
          200: '#ffd988',
          300: '#ffc14a',
          400: '#ffa71e',
          500: '#ff8800',
          600: '#e06500',
          700: '#ba4a06',
          800: '#963b0c',
          900: '#7c320e',
          950: '#461804',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};