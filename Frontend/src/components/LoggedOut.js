import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'

const LoggedOut = () => {

    return (
        <div className='loggedOut'>
            <h1>You logged out!</h1>

            <Link to='/login'>< Button color='primary' variant='contained'>Click here to login</Button></Link>
        </div>
    )
}

export default LoggedOut;