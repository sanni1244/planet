/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],

  theme: {
    extend: {
      scale: {
        '102': '1.02', // Add this for subtle scaling
      },
      animation: {
        "fade-in": "fadeIn 2s ease-out",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "move-stars": "moveStars 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        moveStars: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "1000px 1000px" },
        },
      },
    },
  },
};
