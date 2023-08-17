import { enableExperimentalFragmentVariables } from '@apollo/client';
import { useContext, useEffect } from 'react';
import { TenantContext } from '../context/TenantContext';

const useLazyFontLoad = (font) => {

  const {fonts} = useContext(TenantContext)
  
  useEffect(() => {
    if(font && fonts) {
      let url;
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

        let fontExists = false;
        let values = []
        for (const fontFace of document.fonts.values()) {
          if (fontFace.family === font.value) {
            fontExists = true;
            break;
          }
        }
        for (const value of document.fonts.values()) {
          values.push(value)
        }

        if(!fontExists) {
          const fontStyles = fonts.find(f => f.name === font.value).fonts
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
  }, [font, fonts]);

};

export default useLazyFontLoad;