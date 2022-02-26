import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePages from './components/home';
import UserProfile from './components/user_profile';



const loading = (
    <svg viewBox="25 25 50 50" className="preloader">
        <circle cx="50" cy="50" r="20"></circle>
    </svg>
);

function App() {
    const [render, setRender] = useState(false);
    const changeRender = () => {
        setRender(!render);
    };
    return (
        <>
            <div className="max-w-screen-2xl my-0 mx-auto bg-gray-100">
                <div className="my-0 mx-auto relative">
                    <React.Suspense fallback={loading}>
                        <Router>
                            <Switch>
                            {/* <Route path="/admin" exact component={LoginAdmin} />
                            <Route path="/admin/:path" component={Admin} /> */}
                                <Route
                                    path="/user-profile"
                                    component={UserProfile}
                                />
                                <Route
                                    path="/"
                                    component={() => (
                                        <HomePages
                                            changeRender={changeRender}
                                        />
                                    )}
                                />
                            </Switch>
                        </Router>
                    </React.Suspense>
                </div>
            </div>
        </>
    );
}

export default App;

// import React from 'react';
// import ChangePassword from './components/change_password';
// import { Button } from 'react-bootstrap';

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <ChangePassword
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// export default App;