import React, { useState } from 'react'
import './style.css'
import userService from '../services/user'
import { Button, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
// import { user_login } from '../reducers/userReducer'
import { Redirect, useHistory } from 'react-router-dom'
import {errorAlert, successAlert} from '../reducers/alertReducer'

const valid = {

  email : (e) => {
    if(e.length===0)
      return true

    const pat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    return pat.test(e)
  }
  ,
  password: (p) => {
    console.log(12);
    if(p.length===0)
      return true
    const pat = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])')
    return pat.test(p) && p.length>5
  }

}


const ErrorField = (props) => {
  return (
    <p className='error'>{props.text}</p>
  )
}


const Register = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [fName, setFname] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [phone, setPhone] = useState("")
    const user = useSelector( ({user}) => user )

    if (user) {
      return <Redirect push to="/"/> 
    } 
  

    const handleRegister = async  (e) => {
      e.preventDefault()
      const payload = {
        name: fName,
        email,
        password:pass,
        phone
      }
      emptyForm()
      try{
        await userService.register(payload);
            dispatch(successAlert("Successfully Registered, now you can log in!"));
            setTimeout(()=>dispatch(errorAlert("")),3000);
            history.push('/login')
            
        }
        catch(exception){
            dispatch(errorAlert("You cannot register with the provided credentials!"));
            setTimeout(()=>dispatch(errorAlert("")),3000);
        }

    }

    const emptyForm = () => {
      setFname('')
      setPass('')
      setEmail('')
      setPhone('')
    }

    

    return(
        <> 
        <div className='register'>
        <h2>Register to e-Project</h2>

          <form onSubmit={handleRegister}>

          <TextField value={fName} onChange={(e)=>{setFname(e.target.value)}} label="Full name" /><br/>
          
          <TextField value={email} onChange={(e)=>{setEmail(e.target.value)}} label="E-mail"/><br/>
          {!valid.email(email) ? <ErrorField text='Please provide a proper email format.'/> :  null }

          <TextField value={pass} onChange={(e)=>{setPass(e.target.value)}} label="Password"/><br/>
          {!valid.password(pass) ? <ErrorField text='Password must have more than 6 chars and contain both numbers and letters.'/> :  null }
          <TextField value={phone} onChange={(e)=>{setPhone(e.target.value)}} label="Phone Number"/><br/>

                 
          <Button type='submit' variant="contained" color="primary">Register</Button>

          </form>
        </div>
        </>
    )
}

export default Register;