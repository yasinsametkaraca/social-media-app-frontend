import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Post from "../Post/Post";
import {List, ListItem, ListItemSecondaryAction, Modal, Radio} from "@material-ui/core";
import {PutWithAuth} from "../../services/api";

const ProfileImage = (props) => {

    const {imageId} = props
    const [userPost, setUserPost] = useState([]);
    const classes = useStyles();
    const [control, setControl] = useState(false);
    const rootRef = React.useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(imageId);

    const saveImage = () => {
        PutWithAuth("/users/"+localStorage.getItem("currentUser"),{image:selectedValue})
            .then(r => r.json()).catch((error) => {console.log(error)})
    }

    const handleModal = (value) => {
        if(value==="open")
            setOpen(true)
        else{
            setOpen(false)
        }
    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const [error, setError] = useState("");
    const fetchPostsByUserId = () => {
        fetch("/posts?userId="+localStorage.getItem("currentUser")).then(response => response.json())
            .then((result)=> {
                    console.log(result)
                    setUserPost(result)
                    setControl(true)
                },(error) => {
                    setError(error)
                }
            )
    }

    if(error)
        return <div>Error</div>
    if(control){
        return (
            <div className={classes.postContainer}>
                {userPost.map( post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} username={post.username} title={post.title} text={post.text}></Post>
                ))}
            </div>
        )
    }
    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea onClick={fetchPostsByUserId}>
                    <CardMedia
                        className={classes.media}
                        image={`/${selectedValue}.png`}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Username
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.btnCard}>
                    <Button size="medium"  variant="contained" color="primary" onClick={() => handleModal("open")}>
                        Change Image
                    </Button>
                </CardActions>
            </Card>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={open}
                onClose={() => handleModal("close")}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
                >
                <div className={classes.paper}>
                    <List dense>
                        {[0, 1, 2].map((key) => {
                            const labelId = `checkbox-list-secondary-label-${key}`;
                            return (
                                <ListItem key={key} button>
                                    <CardMedia
                                        style = {{maxWidth: 175}}
                                        component="img"
                                        image={`/${key}.png`}
                                        title="User Image"
                                        alt="image"
                                    />
                                    <ListItemSecondaryAction>
                                        <Radio
                                            edge="end"
                                            value= {key}
                                            onChange={handleChange}
                                            checked={""+selectedValue === ""+key}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </Modal>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    rootModal: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        backgroundColor: "light",
        maxWidth: 419,
        margin:30,
        padding:20
    },
    media: {
        height: 380,
    },
    postContainer:{
        margin:50
    },
    btnCard:{
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

export default ProfileImage;




