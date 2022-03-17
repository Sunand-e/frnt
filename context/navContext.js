import React, {useState} from "react"

const NavContext = React.createContext()

function NavContextProvider(props) {
    const [location, setLocation] = useState([0,0])
    
    function toggleLocation() {
        setLocation('location')
    }
    
    return (
        <NavContext.Provider value={{location, toggleLocation}}>
            {props.children}
        </NavContext.Provider>
    )
}

export {NavContextProvider, NavContext}
