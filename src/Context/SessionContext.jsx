/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const SessionContext = createContext([])

const SessionProvider = ({ children }) => {

  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])
  const [session, setSession] = useState(false)

  useEffect(() => {
    // session
    axios
      .get("http://localhost:8080/api/auth/session", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.email) {
          setSession(true);
        }
      })
      .catch((err) => console.log(err));
  }, [])

  const register = async formData => {
    return await axios
      .post("http://localhost:8080/api/auth/register", formData)
  }

  const login = async formData => {
    return await axios
      .post("http://localhost:8080/api/auth/login", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
  }

  const logout = async () => {
    return await axios
      .post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        setSession(false)
        setUser({})
        window.location.href = "/"
      })
      .catch((err) => console.log(err));
  }

  return (
    <SessionContext.Provider value={{ user, setUser, cart, setCart, session, setSession, register, login, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionContext, SessionProvider }