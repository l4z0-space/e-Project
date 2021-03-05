import { Typography, TextField, Button, Paper } from '@material-ui/core';
import React, {useState} from 'react';
import { useSelector } from 'react-redux'

import LoggedOut from './LoggedOut';

const styles = {
    title:{
        paddingLeft:60,
        paddingTop:10,
        fontFamily:'Roboto',
    },
    input:{
        // margin:20q,
        width:250
    },
    paper:{
        // paddingTop:20,
        // paddingLeft:40,
        textAlign:'center',
        width:'80%'
    }
}


const UserProfile = () => {

    const user = useSelector( ({user}) => user )
    console.log(user);
    const [password, setPassword] = useState("")

    if(!user){
        return (<LoggedOut/>)
    }
    return (
        <div style={{textAlign:'center', padding:20}} >
          <Typography variant="h3" className={styles.title} >My Info</Typography>
          <div class="input-group">

            <input  className="form-control" style={styles.input} value={user.name}  label="Full Name" /><br/>
            <input className="form-control" style={styles.input} value={user.email}  label="Email" /><br/>
            <input className="form-control" style={styles.input} value={user.phone}  label="Phone Number" /><br/>
            <input className="form-control" type='password' placeholder='Password' style={styles.input} onChange={(e)=>setPassword(e.target.value)} value={password}  label="Type password" /><br/>
            <button className='btn btn-primary' >Update info</button>
          </div>
        </div>  
    )
}

export default UserProfile;