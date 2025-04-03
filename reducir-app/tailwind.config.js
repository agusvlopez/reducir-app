const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: "#005840",  // Este es tu color personalizado
        secondary: "#ff6347",  // Otro color personalizado
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

