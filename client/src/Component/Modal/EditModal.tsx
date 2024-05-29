import { Modal } from "antd";
import { setIsEditModalOpen } from "../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../Redux/hook";
import { ReactNode } from "react";

type TEditModal = {
  children: ReactNode;
  isEditModalOpen: boolean;
  title: string;
  width?: number;
};
const EditModal = ({ children, isEditModalOpen, title, width }: TEditModal) => {
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(setIsEditModalOpen());
  };
  return (
    <>
      <Modal
        title={title}
        centered
        open={isEditModalOpen}
        width={width ? width : 500}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="mt-7">{children}</div>
      </Modal>
    </>
  );
};

export default EditModal;
