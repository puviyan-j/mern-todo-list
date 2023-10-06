import React, { useEffect, useState } from 'react'
import "./App.css"
import Login from './auth/Login'
import Signup from './auth/Signup'
import Todoinput from './todo_list/Todoinput';
import Todolist from './todo_list/todolist';

function App() {

  const [auth, setauth] = useState(true);
  const [logged, setlogged] = useState("")

  const login = (f) => {
    setauth(f)
  }
  const logedin = (log) => {
    setlogged(log)
  }
  useEffect(() => {
    setlogged(localStorage.getItem("token"))
  }, [])

  return (

    logged ?
      <>
        <Todoinput logedin={logedin} />
        
      </> :
      auth ? <Login login={login} logedin={logedin} /> : <Signup login={login} />



  )
}

export default App