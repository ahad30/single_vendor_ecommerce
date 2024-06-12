import { zodResolver } from "@hookform/resolvers/zod";
import ZForm from "../../../../Component/Form/ZForm";
import { useCreateBrandMutation } from "../../../../Redux/Feature/Admin/Brand/BrandApi";
import { setIsAddModalOpen } from "../../../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../../../Redux/hook";
import ZInput from "../../../../Component/Form/ZInput";
import ZImageInput from "../../../../Component/Form/ZImageInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { TError } from "../../../../types/globalTypes";

const brandSchema = z.object({
  name: z.string().nonempty("Please fill the name"),
  image: z.any().refine((file) => file instanceof File, {
    message: "Please upload a file",
  }),
});

const AddBrand = () => {
  const dispatch = useAppDispatch();
  const [
    createCategory,
    {
      isLoading: cIsloading,
      isError: cIsError,
      error: cError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useCreateBrandMutation();
  
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    createCategory(formData);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };
  return (
    <div>
      <ZForm
      buttonName="Create"
        isLoading={cIsloading}
        isSuccess={CIsSuccess}
        isError={cIsError}
        error={cError as TError}
        data={data}
        submit={handleSubmit}
        resolver={zodResolver(brandSchema)}
        closeModal={handleCloseAndOpen}
        formType="create"
      >
        <ZInput label={"Brand name"} name={"name"} type={"text"}></ZInput>
        <ZImageInput label="Picture" name="image"></ZImageInput>
      </ZForm>
    </div>
  );
};

export default AddBrand;
