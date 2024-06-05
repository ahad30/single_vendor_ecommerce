import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const { id, slug } = useParams();
  console.log(id, slug);
// const {data} = usegetSi
  return <div>view Product</div>;
};

export default ViewProduct;
