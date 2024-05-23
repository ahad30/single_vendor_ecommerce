import { Modal } from "antd";
import { ReactNode } from "react";
import { useAppDispatch } from "../../Redux/hook";
import { setIsAddModalOpen } from "../../Redux/Feature/Modal/modalSlice";

type TAddModal = {
  children: ReactNode;
  isAddModalOpen: boolean;
  title: string;
  width?: number;
};

const AddModal = ({ children, isAddModalOpen, title, width }: TAddModal) => {
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(setIsAddModalOpen());
  };
  return (
    <>
      <Modal
        title={title}
        centered
        open={isAddModalOpen}
        width={width ? width : 500}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="mt-7">
        {children}
        </div>
      </Modal>
    </>
  );
};

export default AddModal;
