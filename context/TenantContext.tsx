import dayjs from 'dayjs';
import { createContext, useEffect, useState } from 'react'
import baseTheme from '../themes/base';
import { applyTheme, createTheme, lazyLoadFont } from '../themes/utils';


export interface Tenant {
  [key:string]: any
}

const TenantContext = createContext<Tenant>({})

// class TenantContextProvider extends Component {
const TenantContextProvider = ({children}) => {

  const [tenant, setTenant] = useState({})

  // After initial render, apply the theme
  useEffect(() => {
    applyTheme(baseTheme);
    fetch('/api/v1/tenant/setting')
    .then(response => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status code: ' + response.status);
        return;
      }
      const latestClientVersion = response.headers.get('x-latest-client-version')
      const clientVersion = localStorage.getItem('client_version')

      if(latestClientVersion && !clientVersion || dayjs(latestClientVersion).diff(clientVersion) > 0) {
        localStorage.setItem('client_version', latestClientVersion)
        fetch(window.location.href, { cache: "reload" })
        location.reload()
      }
      
      response.json().then(function(data) {
        const theme = createTheme({
          main: data.primaryBrandColor || '#444',
          secondary: data.secondaryBrandColor || '#999',
          font_body: data.styles?.body?.font?.value,
          font_headings: data.styles?.headings?.font?.value
        });
        applyTheme(theme)
        setTenant(data)
        lazyLoadFont(data.styles?.body?.font, data.custom_fonts)
        lazyLoadFont(data.styles?.headings?.font, data.custom_fonts)
      });
    })
    .catch(function(err) {
      console.log('Fetch error', err);
    });
    applyTheme(baseTheme);
  }, []);



  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  )
}

export {TenantContextProvider, TenantContext}
