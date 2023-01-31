import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, useNavigate} from "react-router-dom";
import {LockOpen} from "@material-ui/icons";

const Navbar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("refreshKey");
        localStorage.removeItem("username");
        localStorage.removeItem("auth")
        navigate("/auth");
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.routerLink} to={"/"}>Home</Link>
                    </Typography>
                    <Typography variant="h6">
                        {localStorage.getItem("auth") == null ?  <Link className={classes.routerLink} to={"/auth"}>Login/Signup</Link>
                            : (<div className={classes.navbar}>
                                <Link className={classes.routerLink} to={"/users/"+localStorage.getItem("currentUser")}>Profile</Link>
                                <IconButton onClick={logout}><LockOpen></LockOpen></IconButton>
                            </div>)
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    navbar:{
      display:"flex",
      justifyContent: "center",
      alignItems:"center"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    routerLink:{
        display:"flex",
        justifyContent: "space-between",
        textDecoration:"none",
        boxShadow:"none",
        color:"whitesmoke"
    }
}));
export default Navbar;
