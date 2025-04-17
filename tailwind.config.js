/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'console': {
          dark: 'rgba(0, 0, 0, 0.9)',
          light: '#00ff00',
          gray: '#cccccc',
        },
      },
      fontFamily: {
        'mono': ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}