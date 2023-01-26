import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import {Link} from "react-router-dom";
import {Container} from "@material-ui/core";
import comment from "../Comment/Comment";
import Comment from "../Comment/Comment";
import CommentCrud from "../Comment/CommentCrud";

const Post = (props) => {

    const {title,text,userId,username,likes,postId} = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [error,setError] = useState(null);
    const [commentList,setCommentList] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        fetchComments();
        console.log(commentList)
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        if(!isLiked) {
            setLikeCount(likeCount+1)
            saveLike();
        }
        else{
            setLikeCount(likeCount-1)
            deleteLike();
        }

    }
    const fetchComments = () => {
        fetch("/comments?postId="+postId).then(response => response.json())
            .then((result)=> {
                    setIsLoaded(true)
                    setCommentList(result)
                },(error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const saveLike = () => {
        fetch("/likes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId: userId, postId:postId}),
        }).then(r => r.json()).catch((error) => {console.log(error)})
    }
    const deleteLike = () => {
        fetch("/likes/"+likeId, {
            method: "DELETE",
        }).catch((error) => {console.log(error)})
    }

    const checkLikes = () => {
        let likeControl = likes.find(like => like.userId===userId)
        if(likeControl!=null){
            setLikeId(likeControl.id);
            setIsLiked(true)
        }
    }
    useEffect(() => {
        if(isInitialMount.current)  //biz commentlerin ilk component yüklendiğinde değil comment ikonuna tıklandığında açılmasını istiyoruz.
            isInitialMount.current=false;
        else
            fetchComments()
    },[commentList])

    useEffect(() => {
       checkLikes()
    }, []);


    return (
        <div>
            <Card className={classes.root}>
                <CardHeader className={classes.header}
                    avatar={
                        <Link className={classes.routerLink} to={"/users/"+userId}>
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites"  onClick={handleLikeClick}>
                        <FavoriteIcon style={isLiked ? {color:"red"} : null}/>
                    </IconButton>{likeCount}
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <InsertCommentIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Container fixed className={classes.container}>
                            {
                                error ? "error": isLoaded ? commentList.map(comment => (
                                    <Comment userId={1} username={"username"} text={comment.text}></Comment>
                                )) : "Loading"
                            }
                            <CommentCrud userId={1} username={"username"} postId={postId}></CommentCrud>
                        </Container>
                </Collapse>
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
