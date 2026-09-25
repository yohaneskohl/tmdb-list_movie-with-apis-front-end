/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spotify: ["Poppins", "sans-serif"],
      },
      animation: {
        'slide-in-left': 'slideInLeft 0.3s ease-out forwards',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      transitionProperty: {
        transform: 'transform',
      },
    },
  },
  plugins: [],
};
