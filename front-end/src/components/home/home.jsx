import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from '../login';

const Home = (props) => {
    const { setReRender, checkLoggedIn } = props;

    return (
        <div className="flex items-center space-x-3">
            <div className="text-white space-x-3">
                {checkLoggedIn && (
                    <>
                        <button className="search-open leading-5 left-1 px-3 p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 duration-300">
                            <i className="far fa-search font-medium" />
                        </button>
                        <button
                            type="button"
                            className="relative cart bg-green-700 hover:bg-green-800 pr-3 leading-5 p-2 duration-500 rounded-md"
                        >
                            <i class="far fa-cart-plus font-medium"></i>
                        </button>
                    </>
                )}
            </div>
            {checkLoggedIn ? (
                <div className="hidden sm:block">
                    <Login setReRender={setReRender} />
                </div>
            ) : (
                <div>
                    <Link to="/login">
                        <a className="relative hidden sm:block btn-login duration-300 bg-transparent rounded-md bg-green-700 hover:shadow-2xl hover:bg-green-800 hover:text-white px-4 py-2 text-white font-semibold">
                            Đăng nhập
                        </a>
                    </Link>
                </div>
            )}
            <div className="nav-open w-6 text-2xl flex lg:hidden items-center text-white cursor-pointer hover:opacity-70">
                <i class="far fa-bars"></i>
            </div>
        </div>
    );
}

export default Home;