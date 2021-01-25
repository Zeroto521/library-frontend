
import { Link } from "react-router-dom"
import { Switch, Route } from "react-router-dom"
import { useApolloClient } from '@apollo/client'
import React, { useState, useEffect } from 'react'

import Authors from './components/Authors/Authors'
import Books from './components/Books/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/Books/NewBook'
import Notification from "./components/Notification"

const Header = ({ logout, token }) => {
  return (
    <div>
      <Link to="/"><button>authors</button></Link>
      <Link to="/books"><button>books</button></Link>
      {
        !token &&
        <Link to="login"><button>login</button></Link>
      }
      {
        token &&
        <Link to="newbook"><button>add book</button></Link>
      }
      {
        token &&
        <button onClick={() => { logout() }}>logout</button>
      }
    </div>
  )
}

const App = () => {
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = window.localStorage.getItem("user-token")
    if (token) {
      setToken(token)
    }
  }, [])

  const notifyWith = (message, type = "success", timer = 3000) => {
    setNotification({ message, type })
    setTimeout(() => { setNotification(null) }, timer)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

    notifyWith(`succeeded log out`)
  }

  return (
    <div>
      <Header logout={logout} token={token} />
      <Notification notification={notification} />

      <Switch>
        <Route path="/login">
          <LoginForm token={token} setToken={setToken} notifyWith={notifyWith} />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/newbook">
          <NewBook notifyWith={notifyWith} />
        </Route>
        <Route path="/">
          <Authors token={token} notifyWith={notifyWith} />
        </Route>
      </Switch>
    </div >
  )
}

export default App
