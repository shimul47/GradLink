import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const Root = () => {
  return (
    <div className='bg-[#0b111f]'>
      <Header />
      <div className='mt-16'>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Root;