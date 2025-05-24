/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // slow spin for glowing border
        'spin-slow': 'spin 8s linear infinite',
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        slideInDown: 'slideInDown 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideInDown: {
          from: { opacity: 0, transform: 'translateY(-20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // or 'media' — use 'class' if you're toggling dark mode manually
}
