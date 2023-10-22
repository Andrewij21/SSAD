/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        clamp: "(50%,700px,90%)",
      },
    },
  },
  plugins: [],
};
