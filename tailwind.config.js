/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        colors: {
          'BASE_BG': '#917fa9',
          'black': '000',
        }
      }
    },
  },
  plugins: [],
}