import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      <Nav />
      <section id='image'>
        <img
          id="techImg"
          src="https://i0.wp.com/www.ripplesnigeria.com/wp-content/uploads/2023/07/Tech-Skills-1-1.jpg?fit=1000%2C562&ssl=1"
          alt="a visual representation of technology"
        />
      </section>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout