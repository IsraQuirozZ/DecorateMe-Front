/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'

const SessionContext = createContext([])

const SessionProvider = ({ children }) => {

  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])

  useEffect(() => {
    // session
    setUser()
  }, [])

  return (
    <SessionContext.Provider value={{user, cart, setCart}}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionContext, SessionProvider }