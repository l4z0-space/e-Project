import '../style.css'
import React, { useState, useEffect } from 'react'
import userService from '../../services/user'
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {errorAlert, successAlert} from '../../reducers/alertReducer'

const parse_date = (date) => {
    return date.substring(0,10)
}



const SearchProject = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [filter, setFilter] = useState("")
    const [allProjects, set_allProjects] = useState([])
    const user = useSelector(({user}) => user)
    console.log(allProjects);
    console.log(user)

    useEffect(()=>{
        
        userService.getAllProjects()
            .then(data=>{
                set_allProjects(data)
            })
            .catch("Error")

    },[])

    async function handleDelete (id, title) {
        const answer = window.confirm(`Are you sure you want to delete ${title}?`)
        if(answer){
            // Delete Project
            try{
                await userService.deleteProject(id)
                dispatch(successAlert('Deleted Succesfully'))
                setTimeout(()=>dispatch(successAlert('')), 3000)
                history.push('/')
            }catch(exception){
                dispatch(errorAlert('Deleted Succesfully'))
                setTimeout(()=>dispatch(errorAlert('')), 3000)
            }
        }
    }

    return (

        <div style={{width:'80%',margin:'auto'}}>

            <h1 style={{textAlign:'center'}}>Search for Project</h1>


            <input className="form-control" value={filter} onChange={e=>setFilter(e.target.value)} />


            <table className="table">
                <thead>
                  <tr>
                    <th >#</th>
                    <th >Title</th>
                    <th >Status</th>
                    <th >Created</th>
                    <th >Last update</th>
                    <th >Language</th>
                    <th>Options</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                 
                {allProjects.filter(project => 
                    project.title.includes(filter)
                ||  project.programming_language.includes(filter)
                ||  project.description.includes(filter)
                ||  project.author.email.includes(filter)
                ||  project.author.name.includes(filter)

                )
                // Make an array with [c,p] where c=# of occurrences of pattern, and p=project
                .map(project => 
                    [ (project.author.email, project.author.name + project.title + project.description + project.programming_language).split(filter).length , project ]
                )
                // Sort by number of occurences the first element
                .sort( (a, b) => {
                    return b[0] - a[0]
                })

                .map(project =>
                <tr key={project[1].id}>
                    <th>{project[1].id}</th>
                    <td>{project[1].title}</td>
                    <td>{project[1].status}</td>
                    <td>{parse_date(project[1].created_at)}</td>
                    <td>{parse_date(project[1].updated_on)}</td>
                    <td>{project[1].programming_language}</td>
                    {user &&
                        <td>
                            <Link to={`/projects/edit/${project[1].id}`} className='btn btn-outline-secondary btn-sm btn-block'>Edit</Link>
                        </td>
                    }
                    {user &&
                     (project[1].status === 'pending' || project[1].status === 'complete') ? (
                        <>
                        <td><button onClick={()=>handleDelete(project[1].id, project[1].title)} className='btn btn-danger btn-sm'>Delete</button></td>
                        </>
                     ) : (
                         <>
                         <td></td>
                         </>
                     )}
                 </tr>)}
              
                </tbody>
                </table>
        </div>

    )
}



export default SearchProject;






