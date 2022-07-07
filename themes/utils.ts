// See: https://blog.logrocket.com/theming-react-components-tailwind-css/

export function applyTheme(theme) {
  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar]);
  });
}

export function createTheme({
  main,
  dark,
  semitransparent,
}) {
  return {
    "--theme-main": main,
    "--theme-dark": dark,
    "--theme-semitransparent": semitransparent,
  };
}