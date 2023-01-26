import React from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, InputAdornment, OutlinedInput, Avatar} from "@material-ui/core";


function Comment(props) {
    const {text, userId, username} = props;
    const classes = useStyles();

    return(
        <CardContent className = {classes.comment}>
            <OutlinedInput
                disabled multiline id="outlined-adornment-amount" fullWidth value = {text} inputProps = {{maxLength : 100}}
                startAdornment = {
                    <InputAdornment position="start">
                        <Link className={classes.link} to={{pathname : '/users/' + userId}}>
                            <Avatar aria-label="recipe" className={classes.small}>
                                {username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                style = {{ color : "black",backgroundColor: '#cfe8fc'}}
            ></OutlinedInput>
        </CardContent>
    )
}
const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },comment : {
        display: "flex",
        flexWrap: "wrap",
        justifyContent : "flex-start",
        alignItems : "center",
    }
}));


export default Comment;