/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FC4C02',
          gold: '#D4AF37',
          silver: '#C0C0C0',
          dark: '#050505',
        }
      },
    },
  },
  plugins: [],
}
