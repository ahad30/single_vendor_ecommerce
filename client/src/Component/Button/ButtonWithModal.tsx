import { Link } from "react-router-dom";
import { setIsAddModalOpen } from "../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../Redux/hook";
import { FaPlus } from "react-icons/fa";
const ButtonWithModal = ({
  title,
  defaultKey,
}: {
  title: string;
  defaultKey?: string;
}) => {
  const dispatch = useAppDispatch();
  return defaultKey == "product" ? (
    <Link to={"/admin/add-product"}>
      <button className="bg-[#24354C] flex justify-center items-center gap-2  text-center text-white w-full lg:w-[200px] h-[45px] rounded-md">
        <FaPlus /> {title}
      </button>
    </Link>
  ) : (
    <button
      onClick={() => dispatch(setIsAddModalOpen())}
      className="bg-[#24354C] flex justify-center items-center gap-2  text-center text-white w-full lg:w-[200px] h-[45px] rounded-md"
    >
      <FaPlus /> {title}
    </button>
  );
};

export default ButtonWithModal;
