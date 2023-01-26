import React, {useState} from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, InputAdornment, OutlinedInput, Avatar} from "@material-ui/core";
import Button from "@material-ui/core/Button";


const CommentCrud = (props) => {
    const {userId, username,postId} = props;
    const classes = useStyles();
    const [text, setText] = useState("");


    const saveComment = () => {
        fetch("/comments", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId: userId, text: text, postId:postId}),
        }).then(r => r.json()).catch((error) => {console.log(error)})
    }
    const handleCommentClick = () => {
        saveComment();
        setText("");
    }
    const handleCommentChange = (event) => {
        setText(event);
    }

    return(
        <CardContent className = {classes.comment}>
            <OutlinedInput
                multiline id="outlined-adornment-amount" fullWidth inputProps = {{maxLength : 500}} onChange={(event) => handleCommentChange(event.target.value)}
                startAdornment = {
                    <InputAdornment position="start">
                        <Link className={classes.link} to={{pathname : '/users/' + userId}}>
                            <Avatar aria-label="recipe" className={classes.small}>
                                {username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position={"end"}>
                        <Button variant="contained" size="small" color="primary" onClick={handleCommentClick}>
                            Comment
                        </Button>
                    </InputAdornment>
                }
                value={text}
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
export default CommentCrud;