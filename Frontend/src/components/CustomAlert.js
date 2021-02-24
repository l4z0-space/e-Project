import React from 'react'
import { useSelector } from 'react-redux';
import {Alert} from '@material-ui/lab';



const CustomAlert = () => {

    const alert = useSelector(({alert})=>alert)
    if(alert.text){
       return (
        <>
        {
        alert.error 
        ?  
        <Alert severity="error">{alert.text}</Alert>

        : 
        <Alert severity="success">{alert.text}</Alert>
        }
        </>
       )
    }
    return null
}

export default CustomAlert;