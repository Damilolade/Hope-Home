import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'   
import Footer from '../components/Footer'

const RootLayOut = () => {
  return (
    <div>
        <Navbar />
        {/*<Sidebar />*/}
        <Outlet />
        <Footer />
    </div>
  )
}

export default RootLayOut