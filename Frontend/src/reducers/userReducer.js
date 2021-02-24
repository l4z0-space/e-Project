import userService from '../services/user'
import {errorAlert, successAlert} from './alertReducer'

const userReducer = (state=null, action) => {
    switch (action.type){

        case 'LOGIN':
            return action.data

        case 'SET_USER':
            return action.data

        case 'LOGOUT':
            window.localStorage.clear()
            return null

        default:
            return state
    }
}
export const user_login = (payload) => {

    return async dispatch => {
        try{
            const dataToken = await userService.login(payload)
            tokenizeServices(dataToken.token)
            // console.log('Token/LOGIN ',dataToken);
            
            const data = await userService.getUser()

            const localUser = {
                token:dataToken.token,
                data
            }
            // Save to local storage
            window.localStorage.setItem('user', JSON.stringify(localUser) )

            dispatch({
                type:'LOGIN',
                data
            })

            dispatch(successAlert("Successfully logged in!"));
            setTimeout(()=>dispatch(errorAlert("")),4000);
        }
        catch(exception){
            dispatch(errorAlert("Invalid credentials"));
            setTimeout(()=>dispatch(errorAlert("")),4000);
        }
    }
}

export const set_user_from_ls = (user) => {
    // const token = user.token
    // tokenizeServices(token)
    return({
        type:'SET_USER',
        data:user.data
    })
}

export const logout = () => {
  
    return async dispatch=>{

        dispatch({
            type:'LOGOUT',
        })

        dispatch(successAlert("Successfully logged out!"));
            setTimeout(()=>dispatch(errorAlert("")),4000);
    }
}

const tokenizeServices = (token) => {
    userService.setToken(token)
}

export default userReducer