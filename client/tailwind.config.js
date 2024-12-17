/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [  "./src/**/*.{html,js,jsx,ts,tsx}"], // Adjust the path as per your project structure],
  theme: {
    extend: {
      colors: {
        cream: {
          100: "#D8D2C2",
          200:"#EEEDEB"
        },
      },
    },
  },
  plugins: [daisyui],
};
