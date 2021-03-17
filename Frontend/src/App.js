import React, {useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
 
  } from "react-router-dom" 
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Landing from './components/Projects/Landing'
import NavBar from './components/Core/NavBar'
import CreateProject from './components/Projects/CreateProject'
import UserProfile from './components/Core/UserProfile'
import { useDispatch, useSelector } from 'react-redux'
import { set_user_from_ls, logout } from './reducers/userReducer'
import CustomAlert from './components/Core/CustomAlert'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector( ({user}) => user )
  
  useEffect(()=>{
    const loggedUser = window.localStorage.getItem('user')
    if(loggedUser){
      const userOk = JSON.parse(loggedUser)
      dispatch(set_user_from_ls(userOk))
    }
  },[dispatch])

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    history.push('/login')
  }

  return (
    <div>

    <Router>

      <CustomAlert/>
      <NavBar user={user} handleLogout={handleLogout}/>

      <Switch>

        <Route exact path="/">
          <Landing user={user}/>
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path='/projects/create'>
          <CreateProject />
        </Route>

        <Route exact path="/me">
          <UserProfile/>
        </Route>

      </Switch>
    </Router>
    </div>
  )
}

export default App;