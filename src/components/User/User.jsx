import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ProfileImage from "./ProfileImage";
import UserActivity from "./UserActivity";
import {makeStyles} from "@material-ui/core/styles";

const User = () => {
    const {userId} = useParams();
    const classes = useStyles()
    const [user, setUser] = useState();

    const getUser = () => {
        fetch("/users/"+userId, {
            method: "GET",
            headers: {"Content-Type": "application/json","Authorization":localStorage.getItem("tokenKey")},
        }).then(r => r.json())
            .then((result) => {
                console.log(result);
                setUser(result)
            }).catch((error) => {console.log(error)})
    }

    useEffect(() => {
        getUser()
    }, []);

    return (
        <div className={classes.root}>
            {user ? <ProfileImage username={user.username} userId={userId} imageId={user.imageId} ></ProfileImage> : ""}
            {localStorage.getItem("currentUser") == userId && <UserActivity userId={userId} className={classes.activity}></UserActivity>}
        </div>
    );
};
const useStyles = makeStyles({
    root : {
        display:"flex",
        justifyContent:"center",
        flexWrap:"wrap"
    },
    activity: {

    }
})

export default User;
