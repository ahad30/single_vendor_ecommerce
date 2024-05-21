// import React from 'react'

import BottomHeader from "./BottomHeader";
import TopHeader from "./TopHeader";

const Header = () => {
  return (
    <div>
      <TopHeader></TopHeader>
      <div className="max-w-6xl mx-auto">
        <BottomHeader></BottomHeader>
      </div>
    </div>
  );
};

export default Header;
