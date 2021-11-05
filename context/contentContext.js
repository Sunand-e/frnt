import { createContext, useState } from 'react'

const ContentContext  = createContext()
const { Provider } = ContentContext;

// class ContentContextProvider extends Component {
const ContentContextProvider = ({initialValue, children}) => {
    const [content, setContent] = useState(initialValue)
    console.log('initialValue')
    console.log(initialValue)
    return (
        <Provider value={{content, setContent}}>
            {children}
        </Provider>
    )
}

export {ContentContextProvider, ContentContext }
