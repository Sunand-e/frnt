// See: https://blog.logrocket.com/theming-react-components-tailwind-css/

export function applyTheme(theme) {
  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar]);
  });
}

export function createTheme({
                              main,
                              dark, //remove this when classnames have been changed
                              secondary,
                              superlight
                            }) {
  return {
    "--theme-main": main,
    "--theme-secondary": secondary,
    "--theme-dark": dark, //remove this when classnames have been changed
    "--theme-superlight": superlight,
  };
}

export const rgbaStringFunction = (colorName) => ({opacityValue}) => {
  return `rgba(var(--theme-${colorName}), ${opacityValue})`
}
