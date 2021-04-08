import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { errorAlert,successAlert } from '../../reducers/alertReducer';

import userService from '../../services/user'

const styles= {
  success:{
    textAlign:'center',
    color:'green',
    fontSize:'24px'
  },
  import:{
    textAlign:'center',
    marginTop:'40px'
  },
  div:{
    width:'500px',
    margin:'auto'
  },
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
  },
  project:{
    width:'400px'
  }
}



const Import = () => {
  const [file, setFile] = useState(null);
  const [proper_formatted, set_proper_formatted] = useState([])
  const [wrong_formatted, set_wrong_formatted] = useState([])

  const dispatch = useDispatch()

  const handleChooseFile = (e) => {setFile(e.target.files[0])}

  const  uploadWithJSON = async () =>{
    if(file){
      const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });

      const data = {
        filename: 'projects',
        file: await toBase64(file),
    }

    try{
      set_proper_formatted([])
      set_wrong_formatted([])
      const response_data = await userService.upload_projects("application/json", data)
      set_proper_formatted(response_data.proper_formatted)
      set_wrong_formatted(response_data.wrong_formatted)

    }
    catch(error){
      dispatch(errorAlert("Your file doesn't contain any Proper JSON value!"))
      setTimeout(()=>dispatch(successAlert('')), 3000)
    }
        
    }
    
  }
  return (
      <div style={styles.div}>
      <div style={styles.import}>
      <h2>Upload Form</h2>
  
      
      <input className='btn btn-outline-secondary btn-sm btn-block' type="file" name="file" onChange={handleChooseFile} />

      <br/>
     {file? <input type="button" value="Upload as JSON" onClick={uploadWithJSON}/>:null }
      </div>

      {proper_formatted.length > 1 || wrong_formatted.length > 1 ?
      <div style={{textAlign:'center'}}>
        <p>Added Projects: {proper_formatted.length}</p>
        <p>Wrongly Formatted Projects: {wrong_formatted.length}</p>

        <div style={styles.success}> 
          Following {proper_formatted.length} projects were successfully imported!
        </div> 
        
      </div>
      : null}


      <div>
        {proper_formatted.map(project=>{
          return (
            <div key={project.title}>
              <li className='card project'  style={styles.project} key={project.id}>
            <div className='card-body'>

              <h3 className='card-title' style={styles.title}>{project.title}</h3>
              <hr className='w-100'/>
              <p className='card-text projectDescription'>{project.description}</p>

              <div className='row'>
                <div className='col-md-8' style={styles.lang}>
                  Language: {project.programming_language}
                </div>
                <div className='col-md-4' style={styles.projectStatus}>
                  <u>{project.status}</u>
                </div>
              </div>

          
            </div>
          </li>
            </div>
          )
        })}
      </div>
      </div>
      );
  }

export default Import;