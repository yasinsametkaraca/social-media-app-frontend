import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";

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
    routerLink:{
        display:"flex",
        justifyContent: "space-between",
        textDecoration:"none",
        boxShadow:"none",
        color:"whitesmoke"
    }
}));

const Navbar = () => {
    let userId=1;
    const classes = useStyles();
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
                        <Link className={classes.routerLink} to={"/users/"+userId}>User</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default Navbar;
