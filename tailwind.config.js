/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'button-search': "linear-gradient(98.37deg, #f80000 0.99%, #d61212 100%)",
        'opacity-layer': "linear-gradient(180deg, rgba(3 7 18 / 0%), rgb(3 7 18 / 99.17%))"
      },
      borderRadius: {
        'input-search': "30px 0 0 30px",
        'button-search': "0 30px 30px 0"
      }
    },
  },
  plugins: [],
}

