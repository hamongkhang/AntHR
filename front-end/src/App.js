import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePages from "./components/home";
import Welcome from "./components/Welcome";
import ThemeProvider from "./theme";

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
      <ThemeProvider>
        <div className="max-w-screen-2xl my-0 mx-auto bg-gray-100">
          <div className="my-0 mx-auto relative">
            <React.Suspense fallback={loading}>
              <Routes>
                {/* <Route path="/admin" exact component={LoginAdmin} />
                            <Route path="/admin/:path" component={Admin} /> */}
                {/* <Route
                                    path="/user-profile"
                                    component={UserProfile}
                                /> */}
                <Route
                  path="/*"
                  element={<HomePages changeRender={changeRender} />}
                />
                <Route path="/" element={<Welcome></Welcome>} />
              </Routes>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
