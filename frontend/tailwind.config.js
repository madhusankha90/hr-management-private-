/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary : ['Montserrat', 'sans-serif'],
        secondary : ['Segoe UI'],
        third: ['Arial', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      fontSize: {
        'primary-size': '15px',
        'secondary-size': '13px',
        'third-size' : '12px',
        'fourth-size' : '10px',
      },
      colors:{
        yellow: {
          500: '#fbbf24',
        }
      }  
    },
  },
  plugins: [],
}