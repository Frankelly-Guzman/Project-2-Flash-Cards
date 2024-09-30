/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-anim": "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
      },
      backgroundSize: {
        400: "400% 400%",
      },
      keyframes: {
        gradient: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        gradient: "gradient 25s ease infinite",
      },
    },
  },
  plugins: [],
};
