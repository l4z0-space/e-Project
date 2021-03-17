import React from 'react';
import { useSelector } from 'react-redux'

import LoggedOut from './LoggedOut';

const styles = {
    title:{
        paddingLeft:60,
        paddingTop:10,
        fontFamily:'Roboto',
    },
    input:{
        minWidth:250
    },
    myInfo:{
        margin:'auto',
        width:'40%',
        textAlign:'center'
    }
}


const UserProfile = () => {

    const user = useSelector( ({user}) => user )
    // const [password, setPassword] = useState("")


    if(!user){
        return (<LoggedOut/>)
    }
    return (
        <div style={{textAlign:'center', padding:20}} >
          <div style={styles.myInfo}>
            <h2 variant="h3" className={styles.title} >My Info</h2>


            <input className="form-control" style={styles.input} value={user.name} readOnly label="Full Name"  /><br/>
            <input className="form-control" style={styles.input} value={user.email}  readOnly label="Email"  /><br/>
            <input className="form-control" style={styles.input} value={user.phone}  readOnly label="Phone Number"  /><br/>
            {/* <input className="form-control" type='password' placeholder='Password' style={styles.input} onChange={(e)=>setPassword(e.target.value)} value={password}  label="Type password" /><br/> */}
            {/* <button className='btn btn-primary' >Update info</button> */}
          </div>
        </div>  
    )
}

export default UserProfile;