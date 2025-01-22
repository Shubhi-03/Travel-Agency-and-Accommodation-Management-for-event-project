/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', "serif"], // Define a custom font family
      }
    },
  },
  plugins: [],
}