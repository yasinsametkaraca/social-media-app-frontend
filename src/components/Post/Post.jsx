import React, {useState} from 'react';
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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import {Link} from "react-router-dom";

const Post = (props) => {

    const {title,text,userId,username} = props;
    const classes = useStyles();
    const [like, setLike] = useState(false);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLikeClick = () => {
        setLike(!like)
    }

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
                        <FavoriteIcon style={like ? {color:"red"} : null}/>
                    </IconButton>
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
                    <CardContent>
                    </CardContent>
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
