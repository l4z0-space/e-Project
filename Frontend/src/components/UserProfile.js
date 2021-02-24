import { Typography, TextField, Button, Paper } from '@material-ui/core';
import React, {useState} from 'react';
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import LoggedOut from './LoggedOut';

const useStyles = makeStyles((theme) => ({
    title:{
        paddingLeft:60,
        paddingTop:10,
        fontFamily:'Roboto',
    },
    input:{
        margin:20,
        width:250
    },
    paper:{
        paddingTop:20,
        paddingLeft:40
    }
}));


const UserProfile = () => {

    const classes = useStyles();
    const user = useSelector( ({user}) => user )
    console.log(user);
    const [password, setPassword] = useState("")

    if(!user){
        return (<LoggedOut/>)
    }
    return (
        <Paper elevation={5} className={classes.paper}>
          <Typography variant="h3" className={classes.title} >My Info</Typography>
          <TextField className={classes.input} value={user.name}  label="Full Name" /><br/>
          <TextField className={classes.input} value={user.email}  label="Email" /><br/>
          <TextField className={classes.input} value={user.phone}  label="Phone Number" /><br/>
          <TextField type='password' className={classes.input} onChange={(e)=>setPassword(e.target.value)} value={password}  label="Type password" /><br/>
          <Button className={classes.input} variant="contained" color="primary">Update info</Button>
        </Paper>  
    )
}

export default UserProfile;