import React from 'react';
import {useParams} from "react-router-dom";
import ProfileImage from "../ProfileImage";

const User = () => {
    const {userId} = useParams();
    return (
        <div>
            {userId}
            <ProfileImage></ProfileImage>
        </div>
    );
};

export default User;
