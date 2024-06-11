import Banner from "./Banner/Banner";
import BusinessSummary from "./BusinessSummary";
import Category from "./Category/Category";
import HomeLeftSidebar from "./HomeLeftSidebar/HomeLeftSidebar";
import Product from "./Product/Product";
import TopBrands from "./TopBrands/TopBrands";

const Home = () => {
  return (
    <div className="bg-[#f1f4f6]">
      <div className="grid grid-cols-[2fr_5fr]">
        <HomeLeftSidebar />
        <span></span>
      </div>
      <Banner></Banner>
      <Category></Category>
      <Product></Product>
      <TopBrands></TopBrands>
      <BusinessSummary></BusinessSummary>
    </div>
  );
};

export default Home;
