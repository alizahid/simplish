const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  plugins: [],
  purge: ['./**/*.tsx', './assets/global.scss'],
  theme: {
    colors,
    extend: {
      colors: {
        highlight: 'rgba(0, 0, 0, 0.5)',
        modal: 'rgba(0, 0, 0, 0.8)',
        overlay: 'rgba(255, 255, 255, 0.95)'
      }
    },
    fontFamily: {
      body: ['Inter', 'sans-serif']
    }
  },
  variants: {
    extends: {
      margin: ['first']
    }
  }
}
