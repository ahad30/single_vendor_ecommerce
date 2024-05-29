import { setIsAddModalOpen } from "../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../Redux/hook";
import { FaPlus } from "react-icons/fa";
const ButtonWithModal = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => dispatch(setIsAddModalOpen())}
        className="bg-[#24354C] flex justify-center items-center gap-2  text-center text-white w-full lg:w-[200px] h-[45px] rounded-md"
      >
        <FaPlus /> {title}
      </button>
      <p></p>
    </div>
  );
};

export default ButtonWithModal;
