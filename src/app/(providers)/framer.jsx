"use client"
import React from 'react'
import { motion } from "framer-motion"

const Framer = ({ children }) => {
  return (
    <motion.div className="">
      { children }
    </motion.div>
  )
}

export default Framer