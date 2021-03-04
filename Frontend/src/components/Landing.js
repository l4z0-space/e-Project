import React, { useEffect} from 'react'
import './style.css'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import userService from '../services/user'

const WelcomeLinks = () => {
  return (
    <> 
      <Link className='link' to='/register'>< Button color='primary' variant='contained'>Register!</Button></Link>
      <Link className='link' to='/login'>< Button color='primary' variant='contained'>Login!</Button></Link>
    </>
  )
}

const RecentProjects =  () => {

  const [data, setData] = useState({projects: {}})

  useEffect(()=> {

    const fetchData = async () => {
      const results = await userService.getRecentProjects()
      console.log(results)
      setData(results)
    }

    fetchData()
  }, [])


  return (
    <div>
      <ul>
      </ul>
    </div>
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
              View your details <Link className='link' to='/me'>here.</Link>
            </p>
            
          </div>
          
          
          : <WelcomeLinks/>}

          <RecentProjects/> 
         
          <p></p>
        </div>
    )
}

export default Landing;