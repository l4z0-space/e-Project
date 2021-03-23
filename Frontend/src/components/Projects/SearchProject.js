import '../style.css'
import React, { useState, useEffect } from 'react'
import userService from '../../services/user'


const parse_date = (date) => {
    return date.substring(0,10)
}


const SearchProject = () => {

    const [filter, setFilter] = useState("")
    const [allProjects, set_allProjects] = useState([])

    useEffect(()=>{
        
        userService.getAllProjects()
            .then(data=>{
                set_allProjects(data)
            })
            .catch("Error")

    },[])

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

                 </tr>)}
              
                </tbody>
                </table>
        </div>

    )
}



export default SearchProject;






