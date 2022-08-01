// See: https://blog.logrocket.com/theming-react-components-tailwind-css/
import chroma from "chroma-js";

export function applyTheme(theme) {
  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar]);
  });
}
// HSL manipulators
const lighten = (color, hslPercent) => color.set("hsl.l", color.get("hsl.l") + hslPercent);
const darken = (color, hslPercent) => lighten(color, -hslPercent);


export function createTheme({
  main,
  secondary
}) {
  return {
    "--theme-main": chroma(main).rgb().join(', '),
    "--theme-secondary": chroma(secondary).rgb().join(', '),
    "--theme-superlight": lighten(chroma(main), 0.68).rgb().join(', '),
  };
}

export const rgbaStringFunction = (colorName) => ({opacityValue}) => {
  return `rgba(var(--theme-${colorName}), ${opacityValue})`
}
