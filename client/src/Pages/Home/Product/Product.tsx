import { Button } from "@material-tailwind/react";
import img1 from "../../../assets/Product/product-01.png";
import img2 from "../../../assets/Product/product-02.png";
import img3 from "../../../assets/Product/product-03.png";
import img4 from "../../../assets/Product/product-04.png";
import img6 from "../../../assets/Product/product-06.png";
import img7 from "../../../assets/Product/product-07.png";
import img8 from "../../../assets/Product/product-08.png";
import img9 from "../../../assets/Product/product-09.png";
import img10 from "../../../assets/Product/product-10.png";
import img11 from "../../../assets/Product/product-11.png";
import img12 from "../../../assets/Product/product-12.png";
import HomeTitle from "../../../Component/Home/HomeTitle";
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
const productCard = [
  { id: 1, img: img1, title: "Men's Fashion", price: "100", discount: "4" },
  { id: 2, img: img2, title: "Women's Casual", price: "120" },
  { id: 3, img: img3, title: "Electronics", price: "80", discount: "6" },
  { id: 4, img: img4, title: "Kitchen ", price: "90" },
  { id: 5, img: img4, title: "Home Lamp", price: "110", discount: "3" },
  { id: 6, img: img6, title: "Fitness Watch", price: "95" },
  { id: 7, img: img7, title: "Travel Backpack", price: "150" },
  { id: 8, img: img8, title: "Men's Wallet", price: "70", discount: "5" },
  { id: 9, img: img9, title: "Women's Designer", price: "130" },
  { id: 10, img: img10, title: "Smartphone Case", price: "100", discount: "2" },
  { id: 11, img: img11, title: "Gaming Mouse", price: "85" },
  {
    id: 12,
    img: img12,
    title: "Portable Bluetooth",
    price: "110",
    discount: "7",
  },
];

const Product = () => {
  return (
    <div className="mt-16">
        <HomeTitle text="Popular Products"></HomeTitle>
   
      {/* product card */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-y-12 gap-x-5 mt-16">
        {productCard.map((item, index) => (
             <div className="" key={index}>
              <div className="group h-[300px] relative block bg-black">
  <img
    alt=""
    src={item?.img}
    className="absolute inset-0 h-[300px] w-full object-cover transition-opacity group-hover:opacity-50"
  />

  <div className="relative p-4 sm:p-6 lg:p-8">
    { item?.discount &&
    <p className="text-sm font-medium uppercase rounded-md px-3 py-1 inline-block bg-[#DB4444] text-white">-{item?.discount}%</p>
    }
    <div className="flex justify-end">
      <div
        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 text-white"
      >
       <CiHeart size={30}/>
       <MdOutlineRemoveRedEye size={28}/>
        </div>
    </div>

    <div className="text-center translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 mt-[120px]  flex justify-center items-center">  
        <Button className="bg-secondary font-Poppins font-medium" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Add to Cart
        </Button>
      </div>
    </div>
  </div>
</div> 
      ))}
      </div>
    </div>
  );
};

export default Product;
