import Banner from "./Banner/Banner";
import BusinessSummary from "./BusinessSummary";
import Category from "./Category/Category";
import Product from "./Product/Product";
import TopBrands from "./TopBrands/TopBrands";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <Product></Product>
      <TopBrands></TopBrands>
      <BusinessSummary></BusinessSummary>
    </div>
  );
};

export default Home;
