
import img2 from "../../../assets/Categories/images _05.png";
import img1 from "../../../assets/Categories/images_01.png";
import img3 from "../../../assets/Categories/images_02.png";
import img4 from "../../../assets/Categories/images_03.png";
import img5 from "../../../assets/Categories/images_04.png";
import img6 from "../../../assets/Categories/images_06.png";
import img7 from "../../../assets/Categories/images_07.png";
import img8 from "../../../assets/Categories/images_08.png";
import img9 from "../../../assets/Categories/images_09.png";
import img10 from "../../../assets/Categories/images 10.png";
import img11 from "../../../assets/Categories/images_11.png";
import img12 from "../../../assets/Categories/images_12.png";
import { Button } from "@material-tailwind/react";
import HomeTitle from "../../../Component/Home/HomeTitle";

const imgArr = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

const Category = () => {
  return (
    <div className="mt-16 ">
     <HomeTitle text="Top Categories"/>

      <div className="grid lg:grid-cols-6 gap-x-4 gap-y-12  mt-16">
        {imgArr.map((img, index) => (
          <div key={index}>
            <img src={img} alt={img} className={`size-20`} />
            <p className="mt-8">Mens & Fasion</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12 flex justify-center items-center">  
        <Button className="bg-secondary" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          View all categories
        </Button>
      </div>
    </div>
  );
};

export default Category;
