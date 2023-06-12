import {Route, Routes} from "react-router-dom";
import {Home} from "../pages/home";
import {Login} from "../pages/login";
import {Profile} from "../pages/profile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "../services/action";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(checkUserAuth());
    }, []);

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </div>
    );
}

export default App;
