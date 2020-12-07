const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  plugins: [],
  purge: ['./**/*.tsx', './assets/global.scss'],
  theme: {
    colors,
    extend: {
      colors: {
        'border-black': 'rgba(255, 255, 255, 0.1)',
        'border-black-two': 'rgba(255, 255, 255, 0.05)',
        'border-white': 'rgba(0, 0, 0, 0.1)',
        'border-white-two': 'rgba(0, 0, 0, 0.05)',
        highlight: 'rgba(0, 0, 0, 0.5)',
        modal: 'rgba(0, 0, 0, 0.8)',
        overlay: 'rgba(255, 255, 255, 0.95)',
        transparent: 'transparent'
      }
    },
    fontFamily: {
      body: ['Inter', 'sans-serif']
    }
  },
  variants: {
    extend: {
      margin: ['first']
    }
  }
}
