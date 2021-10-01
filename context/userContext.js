import { createContext, useState } from 'react'

const ContentContext = createContext()

// class ContentContextProvider extends Component {
const ContentContextProvider = ({children}) => {
    const [data, setData] = useState("value1")
    
    return (
        <ContentContext.Provider value={{data, setData}}>
            {children}
        </ContentContext.Provider>
    )
}

export {ContentContextProvider, ContentContext}
