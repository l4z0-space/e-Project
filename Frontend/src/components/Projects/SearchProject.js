import '../style.css'
import React, { useState, useEffect } from 'react'
import userService from '../../services/user'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {errorAlert, successAlert} from '../../reducers/alertReducer'

const parse_date = (date) => {
    return date.substring(0,10)
}


const SearchProject = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState("")
    const [allProjects, set_allProjects] = useState([])
    const user = useSelector(({user}) => user)
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
                window.location.reload()
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
                    )


                .map(project =>
                <tr key={project.id}>
                    <th>{project.id}</th>
                    <td>{project.title}</td>
                    <td>{project.status}</td>
                    <td>{parse_date(project.created_at)}</td>
                    <td>{parse_date(project.updated_on)}</td>
                    <td>{project.programming_language}</td>
                    {user.id === project.author &&
                     (project.status === 'pending' || project.status === 'complete') ? (
                        <>
                        <td>
                            <Link to={`/projects/edit/${project.id}`} className='btn btn-outline-secondary btn-sm btn-block'>Edit</Link>
                        </td>
                        <td><button onClick={()=>handleDelete(project.id, project.title)} className='btn btn-danger btn-sm'>Delete</button></td>
                        </>
                     ) : (
                         <>
                         <td></td>
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






