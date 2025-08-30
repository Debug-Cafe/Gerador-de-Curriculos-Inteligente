/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F1DAAE",
        tan: "#D9B9A0",
        copper: "#A05135",
        caramel: "#A56734",
        espresso: "#422718",
      },
    },
  },
  plugins: [],
}
