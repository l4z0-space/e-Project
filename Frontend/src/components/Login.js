import React, { useState } from 'react'
import './style.css'

import {  Button, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { user_login } from '../reducers/userReducer'
import { Redirect } from 'react-router-dom'

const Login = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  

  const dispatch = useDispatch()

  const user = useSelector( ({user}) => user )

  if (user) {

    return <Redirect push to="/"/> 

  } 
  
  const handleLogin = async (e) => {
    e.preventDefault()
    const payload = {email, password}
    emptyForm()
    // Redux action takes care of that
    dispatch(user_login(payload))

}

const emptyForm = () => {
    setEmail("")
    setPassword("")
}
  return(
      <> 
      <div className='register'>
      <h2>Login to e-Project</h2>
        
        <TextField value={email} onChange={(e)=>setEmail(e.target.value)} label="E-mail"/><br/>
        <TextField value={password} onChange={(e)=>setPassword(e.target.value)} label="Password"/><br/>
                
        <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
      </div>
      </>
  )
}

export default Login;