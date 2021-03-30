import React, {useEffect, useState} from 'react'
import '../style.css'
import {Formik, useField, Form} from 'formik'
import * as Yup from 'yup'
import userService from '../../services/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import LoggedOut from '../Core/LoggedOut';
import {errorAlert, successAlert} from '../../reducers/alertReducer'

const styles = {
    editForm:{
        textAlign:'center',
        width:'50%',
        margin:'auto',
        minWidth:'300px'
    },

    actionButton: {
        margin: 20 
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

const EditProject = () => {

    const dispatch = useDispatch()
    const projectId = useParams().slug
    const [data, setData] = useState([])
    const history = useHistory()

    // Perform get request to get project data
    useEffect(() => {
        const fetchData = async () => {
            const results = await userService.getProject(projectId)
            setData(results)
        }

        fetchData()
    }, [])

    // Check if user is not logged in
    const user = useSelector(({user}) => user)
    if(!user){
        return (<LoggedOut/>);
    }

    const handleCancel = ()=>{
        const answer = window.confirm('Discard changes?')
        if(answer){
            history.push('/')
        }
    }

    return (
        <div style={{textAlign:'center', padding:20}} className='CreateProject'>
            <h2>Edit Project</h2>
            <Formik
                enableReinitialize={true}
                initialValues={data}

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
                        id: data.id,
                        author: data.author,
                        title: values.title,
                        description: values.description,
                        programming_language: values.programming_language,
                        status: values.status
                    }
                    
                    // Perform request
                    try{
                        const result = await userService.updateProject(payload)
                        dispatch(successAlert("Project Updated!"))
                        setTimeout(()=>dispatch(successAlert('')), 3000)
                        history.push('/')

                    }catch(exception){
                        dispatch(errorAlert('Something went wrong!'))
                        setTimeout(()=>dispatch(errorAlert('')), 3000);
                    }
                }}
            >
                {props => (
                    <Form className='editForm'  style={styles.editForm}>
                        <CustomTextInput name='title' placeholder='Title'  />
                        <br />
                        <CustomTextArea name='description'/>
                        <CustomTextInput name='programming_language' placeholder='Programming Language'/><br/>
                        <select value={data.status} name='status' className="form-select" aria-label="Default select example">
                            <option value="pending">Pending</option>
                            <option value="complete">Complete</option>
                            <option value="in_progress">In progress</option>
                        </select>
                        <button  style={styles.actionButton} className='btn btn-primary' type='Submit'>
                            {props.isSubmitting ? 'Loading..' : 'Edit'}
                        </button>
                        <button onClick={()=>handleCancel()} style={styles.actionButton} className='btn btn-danger' type='button'>
                            Cancel
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


export default EditProject