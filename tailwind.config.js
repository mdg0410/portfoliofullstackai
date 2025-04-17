/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // o 'media' si prefieres detectar automáticamente el modo oscuro del sistema
  theme: {
    extend: {
      colors: {
        'console': {
          dark: 'rgba(0, 0, 0, 0.9)',
          light: '#00ff00',
          gray: '#cccccc',
        },
        // Paleta brutalista principal
        brutal: {
          black: '#0D0D0D',
          orange: '#FF4F00',
          gray: {
            dark: '#1A1A1A',
            DEFAULT: '#333333',
            light: '#4D4D4D',
          },
        },
        // Colores para los componentes interactivos
        interface: {
          success: '#00FF66',
          error: '#FF0033',
          warning: '#FFCC00',
          info: '#00CCFF',
        },
      },
      fontFamily: {
        'mono': ['Fira Code', 'monospace'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'urbanist': ['Urbanist', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'blink': 'blink 1.2s step-end infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'cursor': 'cursor .4s step-end infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        cursor: {
          '50%': { borderColor: 'transparent' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      spacing: {
        '128': '32rem',
      },
      borderWidth: {
        '6': '6px',
      },
    },
  },
  plugins: [
    // Puedes añadir plugins como scrollbar personalizada u otros efectos
    // require('tailwind-scrollbar'),
  ],
}