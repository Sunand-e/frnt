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
        },
        grey: {
          // DEFAULT: '#ebedf4',
          // light: '#ebedf4',
          DEFAULT: '#f1f4f8',
          light: '#f1f4f8',
          dark: '#333333',
          semitransparent: '#E5EBF175'
        },
        white: {
          DEFAULT: '#fbfbfd',
        }

      },
      spacing: {
        '1/2': '50%',
        '3/12': '25%'
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
       }
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
    },
  },
  plugins: [],
}
