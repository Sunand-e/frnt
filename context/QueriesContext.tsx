import { createContext } from "react";

const QueriesContext = createContext({queries: null});

function QueriesContextProvider({queries, children}) {
  
  return (
    <QueriesContext.Provider value={{queries}}>
        {children}
    </QueriesContext.Provider>
  )
}

export {QueriesContextProvider, QueriesContext}
