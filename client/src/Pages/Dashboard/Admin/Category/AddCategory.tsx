import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import ZForm from "../../../../Component/Form/ZForm";
import ZInput from "../../../../Component/Form/ZInput";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import { Button, Form, Input } from "antd";
import ZImageInput from "../../../../Component/Form/ZImageInput";
import SaveAndCloseButton from "../../../../Component/Button/SaveAndCloseButton";
import { useCreateCategoryMutation } from "../../../../Redux/Feature/Admin/category/categoryApi";
import { setIsAddModalOpen } from "../../../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../../../Redux/hook";

const categorySchema = z.object({
  name: z.string().nonempty("Please fill the name"),
  image: z.any().refine((file) => file instanceof File, {
    message: "Please upload a file",
  }),
});

const AddCategory = () => {
  const dispatch = useAppDispatch()
  const [
    createCategory,
    {
      isLoading: cIsloading,
      isError: cIsError,
      error: cError,
      isSuccess: CIsSuccess,
    },
  ] = useCreateCategoryMutation();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    createCategory(formData);
  };
  
  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen())
  }

  return (
    <div>
      <ZForm
        isLoading={cIsloading}
        isSuccess={CIsSuccess}
        submit={handleSubmit}
        resolver={zodResolver(categorySchema)}
        closeModal ={handleCloseAndOpen}
      >
        <ZInput label={"Category name"} name={"name"} type={"text"}></ZInput>
        <ZImageInput></ZImageInput>
      </ZForm>
    </div>
  );
};

export default AddCategory;
