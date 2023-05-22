/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
        backgroundImage: {
            'desktop': "url('/public/backgrounds/freelance-background-desktop.jpg')",
            'mobile': "url('/public/backgrounds/freelance-background-mobile.jpg')"
          },
        colors: {
            primary_dark: '#121212',
            primary_slate: '#404040',
            secondary_green: '#00FF00',
            secondary_pink: '#FF00FF'
        }
    },
  },
  plugins: [],
}

