import img1 from "../../../assets/Product/product-01.png";
import img2 from "../../../assets/Product/product-02.png";
import img3 from "../../../assets/Product/product-03.png";
import img4 from "../../../assets/Product/product-04.png";
import img5 from "../../../assets/Product/product-05.png";
import img6 from "../../../assets/Product/product-06.png";
import img7 from "../../../assets/Product/product-07.png";
import img8 from "../../../assets/Product/product-08.png";
import img9 from "../../../assets/Product/product-09.png";
import img10 from "../../../assets/Product/product-10.png";
import img11 from "../../../assets/Product/product-11.png";
import img12 from "../../../assets/Product/product-12.png";

const productCard = [
  { img: img1, title: "Men's Fashion", price: "100", discount: "4" },
  { img: img2, title: "Women's Casual", price: "120" },
  { img: img3, title: "Electronics", price: "80", discount: "6" },
  { img: img4, title: "Kitchen ", price: "90" },
  { img: img4, title: "Home Lamp", price: "110", discount: "3" },
  { img: img6, title: "Fitness Watch", price: "95" },
  { img: img7, title: "Travel Backpack", price: "150" },
  { img: img8, title: "Men's Wallet", price: "70", discount: "5" },
  { img: img9, title: "Women's Designer", price: "130" },
  { img: img10, title: "Smartphone Case", price: "100", discount: "2" },
  { img: img11, title: "Gaming Mouse", price: "85" },
  { img: img12, title: "Portable Bluetooth", price: "110", discount: "7" },
];

const Product = () => {
  return (
    <div className="mt-16 ">
      {/* tabs and title */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">
          Popular <span className="text-primary">Products</span>
        </h2>
        <div className="text-lg font-normal flex gap-x-5">
          <p className="text-[#B70223]">All</p>
          <p className="">Featured</p>
          <p className="">On sale</p>
          <p className="">Trending</p>
          <p className="">Top rated</p>
        </div>
      </div>
      {/* product card */}
      <div className="grid lg:grid-cols-6  gap-y-12 gap-x-14 mt-16">
        {productCard.map((item, index) => (
          <div className={`min-h-[100px] w-full relative`}>
            <img src={item.img} alt={item.img} className={`size-44 object-cover`} />
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
