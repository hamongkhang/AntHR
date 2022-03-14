import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Firstpage from '../components/Account/register/firstpage';
import Secondpage from '../components/Account/register/secondpage';
import Thirdpage from "../components/Account/register/thirdpage";
import Profile from "../components/Views/profile";
import HandleOption from "../components/attendance/handleClick";

const routes = () => {
    return (
        <>
            <Router>
                <Routes>

                    <Route path="/" exact element={<HandleOption />} />
                    <Route path="second-page" exact element={<Secondpage />} />
                    <Route path="third-page" exact element={<Thirdpage />} />
                </Routes>
            </Router>
        </>
    );
}

export default routes;