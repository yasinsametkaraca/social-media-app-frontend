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
import {Container, useMediaQuery, useTheme} from "@material-ui/core";
import Comment from "../Comment/Comment";
import CommentCrud from "../Comment/CommentCrud";
import {DeleteWithAuth, PostWithAuth} from "../../services/api";

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
    const [refresh, setRefresh] = useState(false);

    const setCommentRefresh = () => {
        setRefresh(true);
    }

    const theme = useTheme();

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
        setRefresh(false)
    }

    const saveLike = () => {
        PostWithAuth("/likes",{userId: localStorage.getItem("currentUser"), postId:postId})
            .then(r => r.json()).catch((error) => {console.log(error)})
    }
    const deleteLike = () => {
        DeleteWithAuth("/likes/"+likeId)
            .catch((error) => {console.log(error)})
    }

    const checkLikes = () => {
        var likeControl = likes.find(like => ""+like.userId===localStorage.getItem("currentUser"))
        if(likeControl != null){
            setLikeId(likeControl.id);
            setIsLiked(true)
        }
    }
    useEffect(() => {
        if(isInitialMount.current)  //biz commentlerin ilk component y??klendi??inde de??il comment ikonuna t??kland??????nda a????lmas??n?? istiyoruz.
            isInitialMount.current=false;
        else
            fetchComments()
    },[refresh])

    useEffect(() => {
       checkLikes()
    }, []);


    return (
        <div className={classes.root}>
            <Card className={classes.root}>{username}
                <CardHeader className={classes.header}
                    avatar={
                        <Link className={classes.routerLink} to={"/users/"+userId}>
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {username != null && username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={title}>
                </CardHeader>
                <CardContent>
                    <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions  disableSpacing>
                    <IconButton disabled={!(localStorage.getItem("currentUser"))} aria-label="add to favorites"  onClick={handleLikeClick}>
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
                                    <Comment userId={comment.userId} username={comment.username} text={comment.text}></Comment>
                                )) : "Loading"
                            }
                            {localStorage.getItem("currentUser")!==null && <CommentCrud userId={localStorage.getItem("currentUser")} username={localStorage.getItem("username")} postId={postId} setCommentRefresh={setCommentRefresh}></CommentCrud>}
                        </Container>
                </Collapse>
            </Card>
        </div>
    )
};

const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        flexWrap:"nowrap",
        marginRight:"10px",
        marginTop:"10px",
        width:800,
        [theme.breakpoints.down('sm')]: {
            width:600,
        },
        [theme.breakpoints.down('xs')]: {
            width:400,
        },
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
