/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'olive': {
          50: '#f7f8f3',
          100: '#ebeeda',
          200: '#d5dbb7',
          300: '#b7c287',
          400: '#9aa75f',
          500: '#778a3f',
          600: '#5d6c2f', // dark olive
          700: '#4a552a',
          800: '#3d4625',
          900: '#343b21',
        },
        'cream': '#f8f6f0', // off-white/cream
        'gold': {
          100: '#f4ecd0',
          200: '#e9d9a1',
          300: '#ddc672',
          400: '#d2b343', // gold accent
          500: '#c7a014',
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Open Sans', 'sans-serif'],
      },
      backgroundImage: {
        'parchment': "url('https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
      },
    },
  },
  plugins: [],
} 