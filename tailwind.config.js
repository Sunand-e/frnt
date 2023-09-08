const rgbaStringFunction = (colorName) => ({opacityValue}) => {
  const opacity = opacityValue ?? '255'
  return `rgba(var(--theme-${colorName}), ${opacity})`
}

let darkColorFns = {}
let lightnessColorFns = {}
for(let p=5; p<100; p=p+5) {
  let string = "dark-"+String(p).padStart(2, '0')
  darkColorFns[string] = rgbaStringFunction(string)
  string = "lightness-"+String(p).padStart(2, '0')
  lightnessColorFns[string] = rgbaStringFunction(string)
}

string = "lightness-99"
lightnessColorFns[string] = rgbaStringFunction(string)

module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './layouts/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#4D8BF7',
          dark: '#1835B2',
          light: '#E4EEFE',
          superlight: '#EDF3FE'
        },
        main: {
          ...darkColorFns,
          ...lightnessColorFns,
          DEFAULT: rgbaStringFunction('main'),
          dark: rgbaStringFunction('dark'),
          secondary: rgbaStringFunction('secondary'),
          superlight: rgbaStringFunction('superlight'),
          'lighten-test': rgbaStringFunction('lighten-test'),
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
      backgroundOpacity: ['hover', 'active', 'focus'],
      aspectRatio: {
        '4/3': '4 / 3',
      },
      typography: ({ theme }) => ({
        DEFAULT: { // this is for default prose class
          css: {
            '--tw-prose-bullets': rgbaStringFunction('main'), // Not working??
          },
        },
        white: {
          css: {
            '--tw-prose-body': 'white',
            '--tw-prose-headings': 'white',
            '--tw-prose-lead': 'white',
            '--tw-prose-links': 'white',
            '--tw-prose-bold': 'white',
            '--tw-prose-counters': 'white',
            '--tw-prose-bullets': 'white',
            '--tw-prose-hr': 'white',
            '--tw-prose-quotes': 'white',
            '--tw-prose-quote-borders': 'white',
            '--tw-prose-captions': 'white',
            '--tw-prose-code': 'white',
            '--tw-prose-pre-code': 'white',
            '--tw-prose-pre-bg': 'white',
            '--tw-prose-th-borders': 'white',
            '--tw-prose-td-borders': 'white',
            '--tw-prose-invert-body': 'white',
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': 'white',
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': 'white',
            '--tw-prose-invert-bullets': 'white',
            '--tw-prose-invert-hr': 'white',
            '--tw-prose-invert-quotes': 'white',
            '--tw-prose-invert-quote-borders': 'white',
            '--tw-prose-invert-captions': 'white',
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': 'white',
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': 'white',
            '--tw-prose-invert-td-borders': 'white',
          },
        },
      }),
    },
  },
  variants: {
    extend: {
        display: ["group-hover"],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')
  ],
}
