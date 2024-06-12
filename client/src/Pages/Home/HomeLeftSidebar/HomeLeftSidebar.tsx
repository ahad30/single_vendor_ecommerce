import { FaTshirt, FaHeartbeat, FaBook, FaFootballBall, FaPuzzlePiece, FaGem, FaCouch, FaPlane, FaMobileAlt, FaBookReader, FaTicketAlt } from 'react-icons/fa';
import { PiDevicesFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from "react-icons/md";

const HomeLeftSidebar = () => {
    const categories = [
        { "id": 1, "name": "Electronics", "icon": <PiDevicesFill /> },
        { "id": 2, "name": "Clothes and Fashion", "icon": <FaTshirt /> },
        { "id": 3, "name": "Health and Beauty", "icon": <FaHeartbeat /> },
        { "id": 4, "name": "Books and Stationery", "icon": <FaBook /> },
        { "id": 5, "name": "Sports and Fitness", "icon": <FaFootballBall /> },
        { "id": 6, "name": "Toys and Games", "icon": <FaPuzzlePiece /> },
        { "id": 7, "name": "Jewelry and Accessories", "icon": <FaGem /> },
        { "id": 8, "name": "Home and Furniture", "icon": <FaCouch /> },
        { "id": 9, "name": "Travel and Accessories", "icon": <FaPlane /> },
        { "id": 10, "name": "E-Goods", "icon": <FaMobileAlt /> },
        { "id": 11, "name": "Travel and Accessories", "icon": <FaPlane /> },
        { "id": 12, "name": "E-Books", "icon": <FaBookReader /> },
        { "id": 13, "name": "Gift Cards and Tickets", "icon": <FaTicketAlt /> }
    ];

    return (
        <div className="px-4 bg-white ">
            {categories.slice(0,12).map((category, idx) => (
                <div key={idx}>
                    <div className='flex gap-3 items-center py-[2px]'>
                        <span className="text-2xl font-semibold text-[#092635]">{category.icon}</span>
                        <h1 className='text-base'>{category.name}</h1>
                    </div>
                    <div className='border-t-[1px] border-gray-300 mb-1'></div>

                </div>

            ))}
            {categories.length > 12 && (
                <div className=''>
                    <Link to="/" className='text-blue-500 flex items-center gap-2 py-1'>
                        <span>View All</span>
                        <div className='border-[#092635] p-1 border-[1px] rounded-full bg-[#0926351f]'> <MdArrowForwardIos /></div>
                    </Link>
                </div>
            )}

        </div>
    );
};

export default HomeLeftSidebar;