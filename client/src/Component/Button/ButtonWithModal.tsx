import { setIsAddModalOpen } from "../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../Redux/hook";

const ButtonWithModal = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(setIsAddModalOpen())}
      className="bg-[#24354C]  text-center text-white w-full lg:w-[200px] h-[45px] rounded-md"
    >
      {title}
    </button>
  );
};

export default ButtonWithModal;
