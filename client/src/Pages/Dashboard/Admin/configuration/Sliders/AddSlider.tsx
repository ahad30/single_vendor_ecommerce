/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateSlideMutation } from "../../../../../Redux/Feature/Admin/configuration/slidersApi";
import { useAppDispatch } from "../../../../../Redux/hook";
import { setIsAddModalOpen } from "../../../../../Redux/Feature/Modal/modalSlice";
import ZForm from "../../../../../Component/Form/ZForm";
import { TError } from "../../../../../types/globalTypes";
import ZInput from "../../../../../Component/Form/ZInput";
import ZImageInput from "../../../../../Component/Form/ZImageInput";
import ZRadio from "../../../../../Component/Form/ZRadio";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const sliderSchema = z.object({
  name: z.string().nonempty("Name is required"),
  image: z.any().refine((file) => file instanceof File, {
    message: "Image is required",
  }),
  status: z
    .enum(["1", "0"], {
      invalid_type_error: "Status must be '1' or '0'",
    })
    .refine((value) => value === "1" || value === "0", {
      message: "You must select at least one status option",
    }),
});

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
    const bodyData: any = {
      ...data,
      status: Number(data.status),
    };
    const formData = new FormData();
    for (const key in bodyData) {
      formData.append(key, bodyData[key]);
    }
    createSlider(formData);
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
        resolver={zodResolver(sliderSchema)}
        closeModal={handleCloseAndOpen}
        formType="create"
      >
        <ZInput label={"Name"} name={"name"} type={"text"}></ZInput>
        <ZImageInput label="Picture" name="image"></ZImageInput>
        <ZRadio
          options={[
            {
              name: "Active",
              value: "1",
            },
            {
              name: "Inactive",
              value: "0",
            },
          ]}
          name={"status"}
          label={"Status"}
        ></ZRadio>
      </ZForm>
    </div>
  );
};

export default AddSlider;
