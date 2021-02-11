module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#097BD8',
          dark: '#043877',
        },
        main: {
          DEFAULT: '#097BD8',
          dark: '#043877',
          semitransparent: '#E5EBF175'
        }
      },
      spacing: {
        '1/2': '50%',
        '3/12': '25%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
