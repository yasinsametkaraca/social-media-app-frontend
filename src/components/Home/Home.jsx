import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PostCrud from "../Post/PostCrud";

const Home = () => {

    const [error,setError] = useState(null);
    const [postList,setPostList] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    const classes = useStyles();
    const fetchPosts = () => {
        fetch("/posts").then(response => response.json())
            .then((result)=> {
                    setIsLoaded(true)
                    setPostList(result)
                },(error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        fetchPosts()
    },[postList])

    if(error){
        return <div>Error</div>
    }else if(!isLoaded) {
        return <div>Loading...</div>
    }else {
        return (
            <div className={classes.container}>
                {localStorage.getItem("currentUser")==null ? "" : <PostCrud fetchPosts={fetchPosts} userId={localStorage.getItem("currentUser")} username={localStorage.getItem("username")}></PostCrud>}

                {postList.map( post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} username={post.username} title={post.title} text={post.text} ></Post>
                ))}
            </div>
        )
    }
};
const useStyles = makeStyles((theme)=>({
    container:{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#cfe8fc",
        height:"80vh",
        flexWrap:"wrap"
    }
}))

export default Home;
