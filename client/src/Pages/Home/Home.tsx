import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import NewsSletter from "./NewsSletter/NewsSletter";
import Product from "./Product/Product";
import TopBrands from "./TopBrands/TopBrands";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <Product></Product>
      <TopBrands></TopBrands>
      <NewsSletter></NewsSletter>
    </div>
  );
};

export default Home;
