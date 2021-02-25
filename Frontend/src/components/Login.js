import React from 'react'
import './style.css'
import {Formik, useField, Form} from 'formik'
import {  Button, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { user_login } from '../reducers/userReducer'
import { Redirect } from 'react-router-dom'

const Login = () => {

  const CustomTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return(
      <>
      <TextField variant='standard' size='medium' label={label}  {...field} {...props} />
      <br/>
      </>
    );
  }

  const dispatch = useDispatch()

  const user = useSelector( ({user}) => user )

  if (user)
    return <Redirect push to="/"/> 

  return(
    <>
    <div className='register'>
      <h2>Login to e-Project</h2>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={ (values, {setSubmitting, resetForm}) => {

          const payload = {email: values.email, password: values.password}
          resetForm();
          setSubmitting(false);

          dispatch(user_login(payload));
        }}

      >
        {props => (
          <Form>
            <CustomTextInput  name='email' label='Email' />
            <CustomTextInput  name='password' type='password' label='Password'/>
            <Button type='submit' variant='contained' color='primary'>{props.isSubmitting ? 'Loading...' : 'Login'}</Button>
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
}

export default Login;