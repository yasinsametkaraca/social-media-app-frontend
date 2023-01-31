import React, {useState} from 'react';
import {Grid,Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import {PostWithoutAuth} from "../../services/api";

const Auth = () => {   //register ve login sayfalarında aynı formu kullanıcaz

    const paperStyle={padding :20,height:'40vh',width:280, margin:"20px auto"}
    const btnStyle={margin:'8px 0',top:20}
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError, ] = useState(null);
    const handleUsernameChange = (value) => {
        setUsername(value)
    }
    const handlePasswordChange = (value) => {
        setPassword(value)
    }

    const handleButtonClick = (path) => {
        localStorage.setItem("auth", "")
        sendAuthRequest(path);
        setUsername("");
        setPassword("");
        console.log(localStorage)
        navigate("/");
    }

    const sendAuthRequest =  (path) => {
        PostWithoutAuth("/auth/"+path,{username:username,password:password})
            .then((result)=>result.json())
            .then((result)=> {
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("refreshKey", result.refreshToken);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("username", username);
            })
            .catch((error)=>setError(error))
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Login</h2>
                </Grid>
                <TextField value={username} onChange={(event) => handleUsernameChange(event.target.value)} label='Username' placeholder='Enter username' variant="outlined" fullWidth required/>
                <TextField value={password} onChange={(event) => handlePasswordChange(event.target.value)} style={{top:20}} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/>
                <Button onClick={() => handleButtonClick("login")} type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>Login</Button>
                <br/><br/><br/>
                <Typography > Don't have an account?
                    <Button onClick={() => handleButtonClick("register")} type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>Register</Button>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Auth;
