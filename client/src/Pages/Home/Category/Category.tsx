import { FaChild, FaHandSparkles } from 'react-icons/fa';
import { LuSmartphone, LuGamepad } from "react-icons/lu";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { BsSmartwatch } from "react-icons/bs";
import { CiCamera, CiHeadphones } from "react-icons/ci";
import { GiShirt, GiLipstick } from "react-icons/gi";
import { PiDress, PiSneakerLight  } from "react-icons/pi";
const categories = [
  { name: 'Phones', icon:  <LuSmartphone/> },
  { name: 'Computers', icon: <HiOutlineComputerDesktop />},
  { name: 'SmartWatch', icon: <BsSmartwatch /> },
  { name: 'Camera', icon: <CiCamera /> },
  { name: 'HeadPhones', icon: <CiHeadphones/> },
  { name: 'Gaming', icon: <LuGamepad /> },
  { name: 'Men Fashion', icon: < GiShirt /> },
  { name: 'Women Fashion', icon: <PiDress  /> },
  { name: 'Kids Fashion', icon: <FaChild /> },
  { name: 'Shoes', icon: <PiSneakerLight /> },
  { name: 'Cosmetics', icon: <GiLipstick /> },
  { name: 'Skin Care', icon: <FaHandSparkles /> }
];

const Categories = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <h2 className="text-3xl font-semibold text-center mb-6">TOP CATEGORIES</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div key={index} className={`flex flex-col items-center justify-center px-3 py-6 border border-gray-500 rounded-lg bg-white hover:bg-[#CC2229] transition duration-300  hover:text-white`}>
            <div className="text-5xl mb-3 ">
              {category.icon}
            </div>
            <span className="text-base font-normal mb-2">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
