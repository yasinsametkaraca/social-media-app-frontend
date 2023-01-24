import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";

const Home = () => {

    const [error,setError] = useState(null);
    const [postList,setPostList] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("/posts").then(response => response.json())
            .then((result)=> {
                    setIsLoaded(true)
                    setPostList(result)
                },(error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    },[])

    if(error){
        return <div>Error</div>
    }else if(!isLoaded) {
        return <div>Loading...</div>
    }else {
        return (
            <div className={"container"}>
                {postList.map(post => (
                    <Post title={post.title} text={post.text}></Post>
                ))}
            </div>
        )
    }
};

export default Home;