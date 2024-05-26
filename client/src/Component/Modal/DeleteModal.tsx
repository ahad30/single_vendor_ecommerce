/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { setIsDeleteModalOpen } from "../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../Redux/hook";
import { Alert, Button, Flex, Modal } from "antd";
import { TError } from "../../types/globalTypes";
import { useEffect } from "react";
import { toast } from "sonner";

type TDeleteModal = {
  isDeleteModalOpen: boolean;
  title: string;
  width?: number;
  isLoading: boolean;
  isSuccess: boolean;
  data: any;
  isError: boolean;
  error: TError;
  onDelete: () => void;
  description?: string;
};

const DeleteModal = ({
  isDeleteModalOpen,
  title,
  width,
  data,
  error,
  isError,
  isLoading,
  isSuccess,
  description,
  onDelete,
}: TDeleteModal) => {
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(setIsDeleteModalOpen());
  };
  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      console.log(isLoading);
      toast.loading("Deleting ....", { id: 1 });
      if (isSuccess) {
        toast.success(data?.message, { id: 1 });
        handleCancel();
      }
      if (isError) {
        toast.error(error?.data?.message, { id: 1 });
      }
    }
  }, [isSuccess, isLoading, isError]);
  return (
    <>
      <Modal
        title={title}
        centered
        open={isDeleteModalOpen}
        width={width ? width : 500}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="mt-7">
          <Alert
            message="Are you sure you want to delete"
            description={
              description
                ? description
                : "This is a warning notice about copywriting."
            }
            type="warning"
            showIcon
          />
        </div>
        <Flex justify="end" style={{ marginTop: "20px" }} wrap gap="small">
          <Button disabled={isLoading} onClick={handleCancel}>cancel</Button>
          <Button disabled={isLoading} onClick={() => onDelete()} type="primary" danger>
            {isLoading ? "Deleting...": "Delete"}
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default DeleteModal;
