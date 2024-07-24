/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
};
