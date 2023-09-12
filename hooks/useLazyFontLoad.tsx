import { useContext, useEffect } from 'react';
import { TenantContext } from '../context/TenantContext';
import { lazyLoadFont } from '../themes/utils';

const useLazyFontLoad = (font) => {

  const {custom_fonts} = useContext(TenantContext)
  useEffect(() => {
    lazyLoadFont(font, custom_fonts)
  }, [font, custom_fonts]);

};

export default useLazyFontLoad;