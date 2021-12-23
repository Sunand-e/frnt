module.exports = {
  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './layouts/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit', // or 'media' or 'class'
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#097BD8',
          dark: '#043877',
          superlight: '#F3F8FD'
        },
        main: {
          DEFAULT: '#097BD8',
          dark: '#043877',
          semitransparent: '#E5EBF175'
        },
        grey: {
          // DEFAULT: '#ebedf4',
          // light: '#ebedf4',
          DEFAULT: '#aaaaaa',
          light: '#f1f4f8',
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
        '3/12': '25%',
        '18': '4.5rem',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '8xl' : '90rem',
        'lg': '1024px'
      },
      borderWidth: {
        '3': '3px',
        '20': '20px',
      },

      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'max-h': 'max-height'
      },
      backgroundOpacity: ['active', 'focus'],
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
      zIndex: ['hover', 'active'],
      flexGrow: ['before', 'after'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
