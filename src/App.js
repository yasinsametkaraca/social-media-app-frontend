import './App.css';
import Post from "./components/Post/Post";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route exact path={"/"} element={<Home></Home>}></Route>
                <Route exact path={"/users/:userId"} element={<User></User>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
