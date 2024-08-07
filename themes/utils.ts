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
  secondary,
  font_headings=null,
  font_body=null
}) {
  let darkColorVars = {}
  let mainLightnessColorVars = {}
  let secondaryLightnessColorVars = {}
  for(let p=5; p<100; p=p+5) {
    darkColorVars["--theme-dark-"+String(p).padStart(2, '0')] = darken(chroma(main), p/100).rgb().join(', ')
    mainLightnessColorVars["--theme-main-lightness-"+String(p).padStart(2, '0')] = chroma(main).set("hsl.l", p/100).rgb().join(', ')
    secondaryLightnessColorVars["--theme-secondary-lightness-"+String(p).padStart(2, '0')] = chroma(secondary).set("hsl.l", p/100).rgb().join(', ')
  }
  return {
    ...darkColorVars,
    ...mainLightnessColorVars,
    ...secondaryLightnessColorVars,
    "--theme-lightness-99": chroma(main).set("hsl.l", 99/100).rgb().join(', '),
    "--theme-main": chroma(main).rgb().join(', '),
    "--theme-secondary": chroma(secondary).rgb().join(', '),
    "--theme-superlight": lighten(chroma(main), 0.68).rgb().join(', '),
    "--theme-font-body": font_body,
    "--theme-font-headings": font_headings
  };
}

export const rgbaStringFunction = (colorName) => ({opacityValue}) => {
  return `rgba(var(--theme-${colorName}), ${opacityValue})`
}

export const lazyLoadFont = (font, custom_fonts) => {
  if(font && custom_fonts) {
    const name = font.value || font.name
    if(font.type === 'google') {
      const stylesheetId = `google-font-${name.replace(' ', '_')}`
      var existingStylesheet = document.getElementById(stylesheetId);
      if (!existingStylesheet) {
        const link = document.createElement('link');
        link.id = stylesheetId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${name.replace(' ', '+')}&display=swap`;
        document.head.appendChild(link);
      }
    }
    if(font.type === 'custom') {

      let isfontFaceInDocument = false;
      for (const fontFace of document.fonts.values()) {
        if (fontFace.family === name) {
          isfontFaceInDocument = true;
          break;
        }
      }

      if(!isfontFaceInDocument) {
        const fontStyles = custom_fonts.find(f => f.name === name).fonts
        fontStyles.forEach(font => {
          const fontFace = new FontFace(font.name, `url(${font.file_path})`, {
            ...(font.style === 'italic' && {style: "italic"}),
            ...(font.style === 'bold' && {weight: "bold"})
          });
          document.fonts.add(fontFace);  
        });
      }
    }
  }
}
