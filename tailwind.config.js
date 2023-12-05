/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlue: '#0461A3',
        primaryContainer: '#D1E4FF',
        secondaryContainer: '#E5EEFF',
        gray: {
          800: '#444D49',
          700: '#5B6761',
          600: '#79837E',
          400: '#949B98',
          300: '#C8CCCA',
          100: '#E9EBEA',
        },
      },
    },
  },
  plugins: [],
};
