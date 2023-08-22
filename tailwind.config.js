/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        moon: "#8b6ebc",
        'moon-2': "#483898",
        green: "#82E545",
        orange: "#F4AD4A",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(0deg)" },
          "30%": { transform: "rotate(0deg)" },
          "35%": { transform: "rotate(6deg)" },
          "45%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
