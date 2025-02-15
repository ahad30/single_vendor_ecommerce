/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../../Redux/hook";
import { setIsEditModalOpen } from "../../../../Redux/Feature/Modal/modalSlice";
import ZForm from "../../../../Component/Form/ZForm";
import ZInput from "../../../../Component/Form/ZInput";
import ZImageInput from "../../../../Component/Form/ZImageInput";
import { Image } from "antd";
import { TError } from "../../../../types/globalTypes";
import { useUpdateBrandMutation } from "../../../../Redux/Feature/Admin/Brand/BrandApi";

const EditBrand = <T extends { id: string | number; [key: string]: any }>({
  itemData,
}: {
  itemData: T;
}) => {
  const dispatch = useAppDispatch();
  const [
    editBrand,
    {
      isLoading: cIsloading,
      isError: cIsError,
      error: cError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useUpdateBrandMutation();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name ? data.name : itemData.name);
    if (data?.image) {
      formData.append("image", data.image);
    }
    formData.append("_method", "PUT");
    editBrand({ data: formData, id: itemData.id });
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    <div>
      <ZForm
      buttonName="Update"
        isLoading={cIsloading}
        isSuccess={CIsSuccess}
        isError={cIsError}
        error={cError as TError}
        data={data}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="edit"
      >
        <ZInput
          value={itemData?.name}
          label={"Brand name"}
          name={"name"}
          type={"text"}
        ></ZInput>
        <ZImageInput label="Picture" name="image"></ZImageInput>
      </ZForm>
      <div>
        <p className="text-lg mt-10 mb-3">Previous Picture</p>
        <Image
          width={100}
          src={`${import.meta.env.VITE_IMAGE_URL}${itemData?.image}`}
        />
      </div>
    </div>
  );
};

export default EditBrand;
