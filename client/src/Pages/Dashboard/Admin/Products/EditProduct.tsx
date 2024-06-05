import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  console.log(id);
  return <div>edit Product</div>;
};

export default EditProduct;
