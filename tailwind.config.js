/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [
    // 添加对 SCSS 的支持
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

