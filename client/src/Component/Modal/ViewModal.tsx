import { Modal } from "antd";
import {  setIsViewModalOpen } from "../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../Redux/hook";
import { ReactNode } from "react";

type TViewModal = {
  children: ReactNode;
  isViewModalOpen: boolean;
  title: string;
  width?: number;
};

const ViewModal = ({ children, isViewModalOpen, title, width }: TViewModal) => {
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(setIsViewModalOpen());
  };
  return (
    <>
      <Modal
        title={title}
        centered
        open={isViewModalOpen}
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

export default ViewModal;
