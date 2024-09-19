import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/> {/*Outlet dynamically loads the relevant page content based on the current route.*/}
    {/* <Footer/> */}
    </>
  )
}

export default Layout
