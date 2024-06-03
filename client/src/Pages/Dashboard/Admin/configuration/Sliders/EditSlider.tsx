/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdateSlideMutation } from "../../../../../Redux/Feature/Admin/configuration/slidersApi";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import { setIsEditModalOpen } from "../../../../../Redux/Feature/Modal/modalSlice";
import { TSlider } from "../../../../../types/slider.types";
import ZForm from "../../../../../Component/Form/ZForm";
import ZInput from "../../../../../Component/Form/ZInput";
import ZImageInput from "../../../../../Component/Form/ZImageInput";
import ZRadio from "../../../../../Component/Form/ZRadio";
import { TError } from "../../../../../types/globalTypes";
import { Image } from "antd";
import { RootState } from "../../../../../Redux/store";
import { useEffect, useState } from "react";

const EditSlider = <T extends { id: string | number; [key: string]: any }>({
  itemData,
}: {
  itemData: T | TSlider;
}) => {
  const dispatch = useAppDispatch();
  const [
    editSlider,
    {
      isLoading: cIsloading,
      isError: cIsError,
      error: cError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useUpdateSlideMutation();

  const { isEditModalOpen } = useAppSelector((state: RootState) => state.modal);
  const [defaultValue, setDefaultValue] = useState("");
  useEffect(() => {
    if (itemData?.status || isEditModalOpen) {
      setDefaultValue(itemData?.status);
    }
  }, [itemData?.status, isEditModalOpen]);

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const bodyData: any = {
      ...data,
      status: Number(data.status) || Number(itemData.status),
    };
    const formData = new FormData();
    for (const key in bodyData) {
      if (key !== "image") {
        formData.append(key, bodyData[key]);
      }
    }
    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("_method", "PUT");
    editSlider({ data: formData, id: itemData.id });
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    itemData && (
      <div>
        <ZForm
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
            label={"Name"}
            name={"name"}
            type={"text"}
          ></ZInput>
          <ZImageInput label="Picture" name="image"></ZImageInput>
          <ZRadio
            defaultValue={defaultValue.toString()}
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
        {/* image */}
        <div>
          <p className="text-lg mt-10 mb-3">Previous Picture</p>
          <Image
            width={100}
            src={`${import.meta.env.VITE_IMAGE_URL}${itemData?.image}`}
          />
        </div>
      </div>
    )
  );
};

export default EditSlider;
