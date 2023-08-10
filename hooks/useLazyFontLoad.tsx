import React, { useEffect } from 'react';

const useLazyFontLoad = ({ font }) => {
  useEffect(() => {
    if(font) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
  
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [font]);

};

export default useLazyFontLoad;