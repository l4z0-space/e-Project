import React from 'react'
import '../style.css'
import {Formik, useField, Form} from 'formik'
import * as Yup from 'yup'
import userService from '../../services/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoggedOut from '../Core/LoggedOut';
import {errorAlert, successAlert} from '../../reducers/alertReducer'

const styles = {
    createForm:{
        textAlign:'center',
        width:'50%',
        margin:'auto',
        minWidth:'300px'
    }
}

const CustomTextInput = ({label, ...props}) => {
  const [field, meta] = useField(props)
  return(
    <>
    <input className="form-control" label={label}  {...field} {...props} />
    <br/>
    {meta.touched && meta.error ? (
    <div className='error'>{meta.error}</div>
    ): null}
    </>
  );
}

const CustomTextArea = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return(
        <>
            <textarea className="form-control" placeholder='Enter project description..'
                rowsmin={4} 
                label={label} {...field} {...props}/>
            <br/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    );
}

const CreateProject = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(({user}) => user)
    let projectStatus = 'in_progress';

    // If you're not logged in, get the hell out of here!
    if(!user){
        return (<LoggedOut/>);
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        projectStatus = e.target.value
    }

    return(
        <div style={{textAlign:'center',width:'60%',margin:'auto', padding:20}} className='CreateProject'>
            <h2>Create a Project</h2>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    programming_language: '',
                    status: 'in_progress',
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
                        programming_language: values.programming_language,
                        status: projectStatus 
                    }
                    
                    console.log('project', payload)
                     
                    // Perform request
                    try{
                        await userService.createProject(payload)
                        dispatch(successAlert("Project created!"))
                        setTimeout(()=>dispatch(successAlert('')), 3000)
                        history.push('/')

                    }catch(exception){
                        dispatch(errorAlert('Something went wrong!'))
                        setTimeout(()=>dispatch(errorAlert('')), 3000);
                    }
                    
                }}
            >
                {props => (
                    <Form className='createForm'  style={styles.createForm}>
                        <CustomTextInput name='title' placeholder='Title'  />
                        <br />
                        <CustomTextArea name='description'/>
                        <CustomTextInput name='programming_language' placeholder='Programming Language'/><br/>
                        <select name='status' className="form-select" onChange={handleChange} aria-label="Default select example">
                            <option value="pending">Pending</option>
                            <option value="complete">Complete</option>
                            <option value="in_progress">In progress</option>
                        </select>
                        <button style={{margin:20}} className='btn btn-primary' variant='contained' color='primary' type='Submit'>{props.isSubmitting ? 'Loading..' : 'Create'}</button>
                    </Form>
                )}
            </Formik>
        </div>
    );

}

export default CreateProject;