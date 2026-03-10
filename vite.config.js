/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        civic: {
          blue: "#1d4ed8",
          green: "#16a34a",
          orange: "#ea580c",
          red: "#dc2626",
          purple: "#7c3aed",
        },
      },
    },
  },
  plugins: [],
};
