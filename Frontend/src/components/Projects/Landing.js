import React, { useEffect} from 'react'
import '../style.css'
import {useState} from 'react'
import userService from '../../services/user'


const styles = {
  lang:{
    width: '120px',
    backgroundColor:'#0366d6',
    color: 'white',
    padding: 5,
    marginBottom:5,
    fontSize:12,
    margin:'auto'
  },
  
  
  title:{
    color: 'white',
    fontSize: '20px',
    marginTop: '-2px',
    backgroundColor: 'rgb(13, 110, 253)'
  }
}

const RecentProjects =  () => {

  const [data, setData] = useState([])

  useEffect(()=> {

    const fetchData = async () => {
      const results = await userService.getRecentProjects()
      setData(results)
    }

    fetchData()
  }, [])


  return (
    <div className='projects'>
      <ul>

        {data.map(p=> { return  (

          <li className='project'  style={styles.project} key={p.id}>
            <h3 style={styles.title}>{p.title}</h3>
            <p className='projectDescription'>{p.description}</p>
            <p style={styles.lang}>{p.programming_language}</p>
          </li>)  
        })}


      </ul>
    </div>
  )
}

const Landing = ({user}) => {
    return ( 
        <div className="welcome">
          <h1 >Welcome to e-Project</h1>
          {/* {user ? null : <WelcomeLinks/>} */}
          <h2>Recent Completed projects</h2>

          <RecentProjects/> 
         
          <p></p>
        </div>
    )
}

export default Landing;