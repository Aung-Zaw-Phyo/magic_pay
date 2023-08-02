/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      screens: {
        sm: '540px',
        md: '720px',
        lg: '860px',
        xl: '940px',
        '2xl': '1020px',
      },
    },
  },
  plugins: [],
}

