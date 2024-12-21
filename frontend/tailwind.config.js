/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spaceMono: ['"Space Mono"', "monospace"],
        raleway: ['"Raleway"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
