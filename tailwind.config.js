/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        "slide-in-left": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-in-right": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },

      screens: {
        xs: "480px",
      },
      animation: {
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        first: "#CCE8CC",
        second: "#3B7080",
        light: {
          100: "#F1F1F1",
          200: "#E3E3E3",
        },
        dark: "#0B0C0E",
        third: "#0E1316",
        fourth: "#141b1f",
        fifth: "#8a8a8a",
      },
      spacing: {
        41: "10.25rem",
      },
    },
  },
  plugins: [],
};
