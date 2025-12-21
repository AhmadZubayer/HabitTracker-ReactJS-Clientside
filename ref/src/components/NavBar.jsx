import React from 'react';
import { NavLink, Link } from 'react-router';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo/logo.png';

const NavBar = () => {
    const { user, signOutUser } = use(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('User signed out');
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className="navbar fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <NavLink to="/" className={({ isActive }) => isActive ? "py-2 px-4 text-green-600 font-semibold" : "py-2 px-4"}>Home</NavLink>
                        <NavLink to="/allPlants" className={({ isActive }) => isActive ? "py-2 px-4 text-green-600 font-semibold" : "py-2 px-4"}>Plants</NavLink>
                        <NavLink to="/userProfile" className={({ isActive }) => isActive ? "py-2 px-4 text-green-600 font-semibold" : "py-2 px-4"}>My Profile</NavLink>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
                    <img src={logo} alt="GreenNest Logo" className="w-10 h-10" />
                    <span>GreenNest</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-10 text-lg font-medium">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-green-600 font-bold border-b-2 border-green-600" : ""}>Home</NavLink>
                    <NavLink to="/allPlants" className={({ isActive }) => isActive ? "text-green-600 font-bold border-b-2 border-green-600" : ""}>Plants</NavLink>
                    <NavLink to="/userProfile" className={({ isActive }) => isActive ? "text-green-600 font-bold border-b-2 border-green-600" : ""}>My Profile</NavLink>
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || 'https://via.placeholder.com/150'} alt="User Avatar" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-56 p-4 shadow card-bg">
                            <li className="px-4 py-3">
                                <Link to="/userProfile" className="font-semibold text-lg hover:text-green-600">{user.displayName || 'User'}</Link>
                            </li>
                            <li className="px-2 py-2">
                                <button onClick={handleSignOut} className="btn-red w-full text-center flex items-center justify-center">Sign Out</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-2">
                        <Link to="/login" className="btn-secondary">Sign In</Link>
                        <Link to="/signup" className="btn-primary">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;