import { createContext, useEffect, useState } from 'react'
import baseTheme from '../themes/base';
import { applyTheme, createTheme } from '../themes/utils';


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
      // Examine the text in the response
      response.json().then(function(data) {
        const theme = createTheme({
          main: data.primaryBrandColor || '#444',
          secondary: data.secondaryBrandColor || '#999'
        });
        applyTheme(theme)
        setTenant(data)
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
