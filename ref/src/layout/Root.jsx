import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const Root = () => {
    return (
       <>
       <NavBar></NavBar>
       <div className="min-h-screen pt-16">
           <Outlet></Outlet>
       </div>
       <Footer></Footer>
       </>
    );
};

export default Root;