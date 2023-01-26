import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import OutlinedInput from '@material-ui/core/outlinedInput';
import {Link} from "react-router-dom";
import {InputAdornment, Snackbar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as PropTypes from "prop-types";
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


Alert.propTypes = {
    severity: PropTypes.string,
    onClose: PropTypes.any,
    children: PropTypes.node
};
const Post = (props) => {

    const {userId,username,fetchPosts} = props;
    const classes = useStyles();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/posts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title: title, userId: userId, text: text}),
        }).then(r => r.json()).catch((error) => {console.log(error)})
    }
    const handleSubmitClick = () => {
        savePost();
        fetchPosts();
        setTitle("")
        setText("")
        setIsSent(true)
    }
    const handleText = (value) => {setText(value); setIsSent(false)}
    const handleTitle = (value) => {setTitle(value); setIsSent(false)}

    const handleClick = () => {
        setIsSent(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSent(false);
    };

    return (
        <div>
            <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    your post is sent!
                </Alert>
            </Snackbar>
            <Card className={classes.root}>
                <h4>What do you think?</h4>
                <CardHeader className={classes.header}
                            avatar={
                                <Link className={classes.routerLink} to={"/users/"+userId}>
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {username.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Link>
                            }
                            title={
                            <OutlinedInput fullWidth value={title} onChange={(event) => handleTitle(event.target.value)} placeholder={"Title"} multiline={true} id="outlined-adornment-amount"  inputProps={{maxLength:30}}>

                            </OutlinedInput>}
                />
                <CardContent>
                    <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                        <OutlinedInput value={text} onChange={(event) => handleText(event.target.value)} fullWidth placeholder={"Text"} multiline={true} id="outlined-adornment-amount"  inputProps={{maxLength:300}} endAdornment={
                            <InputAdornment position={"end"}>
                                <Button variant="contained" size="small" color="primary" onClick={handleSubmitClick}>
                                    Post
                                </Button>
                            </InputAdornment>
                        }>
                        </OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
};

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth :"200",
        flexWrap:"wrap",
        marginRight:"10px",
        marginTop:"10px",
        width : 800,
    },
    text:{
        textAlign :"center"
    },
    header:{
        textAlign:"left"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    routerLink:{
        display:"flex",
        justifyContent: "space-between",
        textDecoration:"none",
        boxShadow:"none",
        color:"whitesmoke"
    }
}));

export default Post;
