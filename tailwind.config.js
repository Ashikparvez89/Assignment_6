/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}", "./js/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
