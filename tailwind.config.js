/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        russo: ['"Russo One"', 'cursive'],
        stalinist: ['"Stalinist One"', 'cursive'],
        inter: ['"Inter"', 'sans-serif'],
        sairaStencil: ['"Saira Stencil One"', 'cursive'],
      },
    },
  },
  plugins: [],
}

