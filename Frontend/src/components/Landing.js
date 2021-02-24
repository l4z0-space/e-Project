import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'


const WelcomeLinks = () => {
  return (
    <> 
      <Link className='link' to='/register'>< Button color='primary' variant='contained'>Register!</Button></Link>
      <Link className='link' to='/login'>< Button color='primary' variant='contained'>Login!</Button></Link>
    </>
  )
}

const Landing = ({user}) => {
    return ( 
        <div className="welcome">
          <h1>Welcome to e-Project</h1>
          
          {user ? 
          
          <div className='greet'>
            <h3 >Hello {user.name}!</h3>
            
            <p>
              Not much going on for the moment, for now
              you can view your details <Link className='link' to='/me'>here.</Link>
            </p>
            
          </div>
          
          
          : <WelcomeLinks/>}
          
         
          <p></p>
        </div>
    )
}

export default Landing;