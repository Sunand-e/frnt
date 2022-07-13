// See: https://blog.logrocket.com/theming-react-components-tailwind-css/

export function applyTheme(theme) {
  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar]);
  });
}


function hex2RgbVals(color) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  return result
   ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
   : color;
}

export function createTheme({
  main,
  secondary,
  superlight
}) {
  return {
    "--theme-main": hex2RgbVals(main),
    "--theme-secondary": hex2RgbVals(secondary),
    "--theme-superlight": hex2RgbVals(superlight),
  };
}

export const rgbaStringFunction = (colorName) => ({opacityValue}) => {
  return `rgba(var(--theme-${colorName}), ${opacityValue})`
}
