// import Banner from "./Banner/Banner";
import BannerSlider from "./BannerSlider/BannerSlider";
// import BusinessSummary from "./BusinessSummary";
// import Category from "./Category/Category";
import HomeLeftSidebar from "./HomeLeftSidebar/HomeLeftSidebar";
import ProductBanner from "./ProductBanner/ProductBanner";
// import Product from "./Product/Product";
// import TopBrands from "./TopBrands/TopBrands";

const Home = () => {
  return (
    <div className="">
      <div className="grid grid-cols-[2fr_5fr] mt-4">
        <HomeLeftSidebar />
        <div className="h-full">
          <div className="w-full h-[80%]">
            <BannerSlider />
          </div>
          <div className=" mt-[-75px]">
            <ProductBanner />
          </div>
        </div>
      </div>
      {/* <Banner></Banner> */}
      {/* <Category></Category> */}
      {/* <Product></Product>
      <TopBrands></TopBrands> 
      <BusinessSummary></BusinessSummary> */}
    </div>
  );
};

export default Home;
