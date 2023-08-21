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
  return {
    "--theme-main": chroma(main).rgb().join(', '),
    "--theme-secondary": chroma(secondary).rgb().join(', '),
    "--theme-superlight": lighten(chroma(main), 0.68).rgb().join(', '),
    "--theme-dark-05": darken(chroma(main), 0.05).rgb().join(', '),
    "--theme-font-body": font_body,
    "--theme-font-headings": font_headings
  };
}

export const rgbaStringFunction = (colorName) => ({opacityValue}) => {
  return `rgba(var(--theme-${colorName}), ${opacityValue})`
}

export const lazyLoadFont = (font, custom_fonts) => {
  console.log('font')
  console.log(font)
  console.log('custom_fonts')
  console.log(custom_fonts)
  if(font && custom_fonts) {
    if(font.type === 'google') {
      const stylesheetId = `google-font-${font.value.replace(' ', '_')}`
      var existingStylesheet = document.getElementById(stylesheetId);
      if (!existingStylesheet) {
        const link = document.createElement('link');
        link.id = stylesheetId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${font.value.replace(' ', '+')}&display=swap`;
        document.head.appendChild(link);
      }
    }
    if(font.type === 'custom') {

      let isfontFaceInDocument = false;
      for (const fontFace of document.fonts.values()) {
        if (fontFace.family === font.value) {
          isfontFaceInDocument = true;
          break;
        }
      }

      if(!isfontFaceInDocument) {
        alert('dooo')
        const fontStyles = custom_fonts.find(f => f.name === font.value).fonts
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
