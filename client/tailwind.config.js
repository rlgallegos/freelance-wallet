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
            primary: '#193A85',
            secondary: '#C8C9CB',
        }
    },
  },
  plugins: [],
}

