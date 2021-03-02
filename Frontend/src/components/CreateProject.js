import React from 'react'
import './style.css'
import {Formik, useField, Form} from 'formik'
import * as Yup from 'yup'
import userService from '../services/user'
import { Button, TextField, TextareaAutosize } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import LoggedOut from './LoggedOut';
import {errorAlert, successAlert} from '../reducers/alertReducer'

const CustomTextInput = ({label, ...props}) => {
  const [field, meta] = useField(props)
  return(
    <>
    <TextField variant='standard' size='medium' label={label}  {...field} {...props} />
    <br/>
    {meta.touched && meta.error ? (
    <div className='error'>{meta.error}</div>
    ): null}
    </>
  );
}

const CreateProject = () => {
    const dispatch = useDispatch()
    const user = useSelector(({user}) => user)

    // If you're not logged in, get the hell out of here!
    if(!user){
        return (<LoggedOut/>);
    }

    return(
        <div className='CreateProject'>
            <h2>Create a Project</h2>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    programming_language: ''
                }}

                validationSchema={
                    Yup.object({
                        title: Yup.string()
                                .min(5, 'Project name must be at least 5 characters!')
                                .required('Required'),
                        description: Yup.string()
                                .min(20, 'Description must be at least 20 characters')
                                .max(300, 'Description can be at most 300 characters.')
                                .required('Required'),
                        programming_language: Yup.string()
                                .required('Required')
                    })
                }

                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    // Reset Form
                    resetForm()
                    setSubmitting(false)

                    // Form paylaod
                    const payload = {
                        title: values.title,
                        description: values.description,
                        programming_language: values.programming_language
                    }

                    // Perform request
                    try{
                        dispatch(successAlert("Project created!"))
                        setTimeout(()=>dispatch(successAlert('')), 3000)
                        // Perform request here

                    }catch(exception){
                        dispatch(errorAlert('Something went wrong!'))
                        setTimeout(()=>dispatch(errorAlert('')), 3000);
                    }
                }}
            >
                {props => (
                    <Form>
                        <CustomTextInput label='Title' name='title' />
                        <br />
                        <TextareaAutosize placeholder='Enter project description..' aria-label='Description' rowsMin={4} name='description' /><br />
                        <CustomTextInput label='Programming Language' name='programming_language' /><br/>
                        <Button variant='contained' color='primary' type='Submit'>{props.isSubmitting ? 'Loading..' : 'Create'}</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );

}

export default CreateProject;