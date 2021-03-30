import React, { useEffect, useState} from 'react'
import '../style.css'
import {useHistory, Link} from 'react-router-dom'
import userService from '../../services/user'
import {useDispatch} from 'react-redux'
import { successAlert, errorAlert } from '../../reducers/alertReducer'


const styles = {

  lang: {
    textAlign: 'left',
    fontSize: '12px'
  },

  projectStatus: {
    textAlign: 'right',
    fontSize: '12px'
  },

  title:{
    fontSize: '20px',
    marginTop: '-2px',
    textAlign: 'left',
    fontWeight: 'bold',
    padding: '4px'
  }
}


const RecentProjects =  (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [data, setData] = useState([])

  useEffect(()=> {

    const fetchData = async () => {
      const results = await userService.getRecentProjects()
      setData(results)
    }

    fetchData()
  }, [])


  async function handleDelete(id, title) {
    const deleteString = `Are you sure you want to delete ${title}?`
    const answer = window.confirm(deleteString)
    if(answer){
      try {
        await userService.deleteProject(id)
        dispatch(successAlert("Project deleted"))
        setTimeout(()=>dispatch(successAlert('')), 3000)
        window.location.reload(false)
      }catch(exception){
        dispatch(errorAlert("Project deleted"))
        setTimeout(()=>dispatch(errorAlert('')), 3000)
      }
    }
  }
  console.log(data);
  return (

    <div className='projects'>

      <ul>

        {data.map(p=> { return  (

          <li className='card project'  style={styles.project} key={p.id}>
            <div className='card-body'>

              <h3 className='card-title' style={styles.title}>{p.title}</h3>
              <hr className='w-100'/>
              <p className='card-text projectDescription'>{p.description}</p>

              <div className='row'>
                <div className='col-md-8' style={styles.lang}>
                  Language: {p.programming_language}
                </div>
                <div className='col-md-4' style={styles.projectStatus}>
                  <u>{p.status}</u>
                </div>
              </div>

              <div className='row' style={{marginTop: '15px'}} >
                {props.user &&
                 (p.status === 'pending' || p.status === 'complete') ? 
                <> 
                  <div className='col-md-4'>
                    <Link className='btn btn-outline-secondary btn-sm btn-block'
                       to={`/projects/edit/${p.id}`}>Edit</Link>
                  </div>
                  <div className='col-md-4'>
                    <button className='btn btn-danger btn-sm btn-block' 
                      onClick={() => {
                          handleDelete(p.id, p.title)
                      }}
                    >Delete</button>
                  </div>
                <div className='col-md-4'>
                </div>
                </>
                :
                null
                }
              </div>
            </div>
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
          {user && console.log(user.id)}
          <RecentProjects user={user}/> 
         
          <p></p>
        </div>
    )
}

export default Landing;