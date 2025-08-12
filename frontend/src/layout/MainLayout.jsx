import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <motion.div 
          className='flex-1 mt-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
            <Outlet/>
        </motion.div>
        <Footer />
    </div>
  )
}

export default MainLayout