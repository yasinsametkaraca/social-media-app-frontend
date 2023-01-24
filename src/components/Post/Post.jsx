import React, {useEffect, useState} from 'react';

const Post = () => {

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
            <ul>
                {postList.map(post => (
                    <li>
                        {post.title} || {post.text}
                    </li>
                ))}
            </ul>
        )
    }
};

export default Post;
