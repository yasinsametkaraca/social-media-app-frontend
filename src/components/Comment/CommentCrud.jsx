import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, InputAdornment, OutlinedInput, Avatar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {PostWithAuth, RefreshToken} from "../../services/api";


const CommentCrud = (props) => {
    const {userId, username,postId,setCommentRefresh} = props;
    const classes = useStyles();
    const [text, setText] = useState("");

    const saveComment = () => {
        PostWithAuth("/comments",{postId: postId, userId : userId, text : text,})
            .then((response) => {
                if(!response.ok) {
                    RefreshToken()  //amacımız eğer accessTokenin süresi dolmuşsa tokeni refreshToken ile refresh edip geçerliyse yeniden comment atabilmektir.
                    .then((response) => { if(!response.ok) {
                        logout();
                    } else {
                        return response.json()
                    }}).then((result) => {
                        console.log(result)
                        if(result != undefined){
                            localStorage.setItem("tokenKey",result.accessToken);
                            saveComment();
                            setCommentRefresh();
                        }}).catch((err) => {
                        console.log(err)
                        })
                } else
                    response.json()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("username")
        navigate("/auth")
    }
    const handleCommentClick = () => {
        saveComment();
        setText("");
        setCommentRefresh();
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