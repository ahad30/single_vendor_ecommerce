// import React from 'react'

import BottomHeader from "./BottomHeader"
import TopHeader from "./TopHeader"

const Header = () => {
  return (
    <div className="lg:px-7 max-w-7xl mx-auto">
    <TopHeader></TopHeader>
    <BottomHeader></BottomHeader>
    </div>
  )
}

export default Header