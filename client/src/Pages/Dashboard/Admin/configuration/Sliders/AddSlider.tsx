import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateSlideMutation } from "../../../../../Redux/Feature/Admin/configuration/slidersApi";
import { useAppDispatch } from "../../../../../Redux/hook";
import { setIsAddModalOpen } from "../../../../../Redux/Feature/Modal/modalSlice";
import ZForm from "../../../../../Component/Form/ZForm";
import { TError } from "../../../../../types/globalTypes";
import ZInput from "../../../../../Component/Form/ZInput";
import ZImageInput from "../../../../../Component/Form/ZImageInput";
import ZRadio from "../../../../../Component/Form/ZRadio";

const AddSlider = () => {
  const dispatch = useAppDispatch();
  const [
    createSlider,
    {
      isLoading: cIsloading,
      isError: cIsError,
      error: cError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useCreateSlideMutation();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    //   const formData = new FormData();
    //   formData.append("name", data.name);
    //   formData.append("image", data.image);
    //   createSlider(formData);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };
  return (
    <div>
      <ZForm
        isLoading={cIsloading}
        isSuccess={CIsSuccess}
        isError={cIsError}
        error={cError as TError}
        data={data}
        submit={handleSubmit}
        //   resolver={zodResolver(categorySchema)}
        closeModal={handleCloseAndOpen}
        formType="create"
      >
        <ZInput label={"Category name"} name={"name"} type={"text"}></ZInput>
        <ZImageInput label="Picture" name="image"></ZImageInput>
        <ZRadio name={"status"} label={"Active"}></ZRadio>
        <ZRadio name={"status"} label={"Inactive"}></ZRadio>
      </ZForm>
    </div>
  );
};

export default AddSlider;
