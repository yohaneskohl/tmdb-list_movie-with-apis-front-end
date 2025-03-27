/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          spotify: ["Poppins", "sans-serif"], // Alternatif untuk Spotify Circular
        },
      },
    },
    plugins: [],
  };
  