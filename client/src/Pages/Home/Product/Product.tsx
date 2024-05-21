import { Link, useParams } from "react-router-dom";
import img1 from "../../../assets/Product/product-01.png";
import img2 from "../../../assets/Product/product-02.png";
import img3 from "../../../assets/Product/product-03.png";
import img4 from "../../../assets/Product/product-04.png";
// import img5 from "../../../assets/Product/product-05.png";
import img6 from "../../../assets/Product/product-06.png";
import img7 from "../../../assets/Product/product-07.png";
import img8 from "../../../assets/Product/product-08.png";
import img9 from "../../../assets/Product/product-09.png";
import img10 from "../../../assets/Product/product-10.png";
import img11 from "../../../assets/Product/product-11.png";
import img12 from "../../../assets/Product/product-12.png";
import { Button } from "@material-tailwind/react";
import HomeTile from "../../../Component/Home/HomeTile";

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
    <div className="mt-16 ">
        <HomeTile text="Popular Products"></HomeTile>
   
      {/* product card */}

      <div className="grid lg:grid-cols-6  gap-y-12 gap-x-14 mt-16">
        {productCard.map((item, index) => (
          <div className={`min-h-[100px] w-full relative `} key={index}>
            <img
              src={item.img}
              alt={item.img}
              className={`size-44 object-cover`}
            />
            <p className="mt-2 text-[14px] font-normal text-[#222222]">
              {item?.title}
            </p>
            <p className="text-[#222222] font-bold text-lg">${item?.price}</p>
            {item?.discount && (
              <span className="absolute top-2 left-2 bg-[#FF0202] text-white px-2 py-1">
                -{item?.discount}%
              </span>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
