/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pokered: '#CC0000',
        pokeyellow: '#FFCC00',
        pokenavy: '#003A70',
        pokegray: '#A8A8A8',
        pokebg: '#0F0F1A',
        pokesurface: '#1A1A2E',
        pokeborder: '#2A2A4A',
      },
      fontFamily: {
        pokemon: ['"Press Start 2P"', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pokeball-shake': 'pokeball-shake 0.8s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,204,0,0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(255,204,0,0.9)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pokeball-shake': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-15deg)' },
          '40%': { transform: 'rotate(15deg)' },
          '60%': { transform: 'rotate(-10deg)' },
          '80%': { transform: 'rotate(10deg)' },
        },
      },
    },
  },
  plugins: [],
}
