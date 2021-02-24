import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Typography, Toolbar, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

import PersonIcon from '@material-ui/icons/Person';
 
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      padding: 5,
      textDecoration:'none',
      color:'white'
    }
}));


const NavBar = ({user, handleLogout}) => {

    const classes = useStyles();
    
    return(
        <div className={classes.root}>
        <AppBar position="static" color='primary'>
        <Toolbar>
            <Typography variant="h5" className={classes.title}> <Link className={classes.link} to='/'>e-Project</Link> </Typography>
            { 
            user
            ?
            [<Link key='1' className={classes.link} to="/me"><PersonIcon/></Link>,
             <Button key='2' color="inherit" onClick={handleLogout}>Logout</Button>
            ]
            : 
            [
            <Link key='1' className={classes.link} to="/register"><Button color="inherit">Register</Button></Link>,
            <Link key='2' className={classes.link} to="/login"><Button color="inherit">login</Button></Link>
            ]
          }
           </Toolbar>
        </AppBar>
        </div>
    )
}

export default NavBar;