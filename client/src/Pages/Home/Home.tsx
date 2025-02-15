// import Banner from "./Banner/Banner";
// import ReUseableButton from "../../Component/UserDashboard/ReUseableButton/ReUseableButton";
import BottomHeader from "../../common/Header/BottomHeader";
import BannerSlider from "./BannerSlider/BannerSlider";
// import BusinessSummary from "./BusinessSummary";
import Category from "./Category/Category";
import HomeLeftSidebar from "./HomeLeftSidebar/HomeLeftSidebar";
import InfoCardDetails from "./InfoCardDetails/InfoCardDetails";
import ProductBanner from "./ProductBanner/ProductBanner";
import ProductCard from "./ProductCard/ProductCard";
// import Product from "./Product/Product";
import TopBrands from "./TopBrands/TopBrands";

const Home = () => {
  return (
    <div className="">
      <div className="grid lg:grid-cols-[2fr_5fr]">
        <HomeLeftSidebar />
        <div className="">
          <div className="w-full h-full md:h-[80%]">
            <BottomHeader/>
            <BannerSlider />
          </div>
          <div className="mt-[-64px] md:mt-[-65px]">
            <ProductBanner />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <InfoCardDetails/>
      </div>
      {/* <Banner></Banner> */}
      <Category/>
      <TopBrands></TopBrands>
      <ProductCard/>
       {/* <Product></Product> */}
      {/* <BusinessSummary></BusinessSummary>  */}
    </div>
  );
};

export default Home;
