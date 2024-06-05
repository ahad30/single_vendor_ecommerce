import { FieldValues, SubmitHandler } from "react-hook-form";
import { setIsAddModalOpen } from "../../../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { useCreateAttributeMutation } from "../../../../Redux/Feature/Admin/Attribute/attributeApi";
import { TError } from "../../../../types/globalTypes";
import ZForm from "../../../../Component/Form/ZForm";
import ZInput from "../../../../Component/Form/ZInput";
import { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@material-tailwind/react";

import { GoPlus } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { RootState } from "../../../../Redux/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const attributesSchema = z.object({
    name: z.string().nonempty("Please fill the name"),
    values: z.array(z.string().nonempty("Attribute value cannot be empty")).nonempty("At least one attribute value is required"),
  });

const AddAttributes = () => {
  const [attributeValues, setAttributes] = useState<number[]>([1]);
  const dispatch = useAppDispatch();
  const { isAddModalOpen } = useAppSelector((state: RootState) => state.modal);
  useEffect(() => {
    if (!isAddModalOpen) {
      setAttributes([1]);
    }
  }, [isAddModalOpen]);

  const [
    createAttribute,
    {
      isLoading: cIsloading,
      isError: cIsError,
      error: cError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useCreateAttributeMutation();
  const handleAddInputField = () => {
    setAttributes([...attributeValues, attributeValues.length + 1]);
  };
  const handleDeleteInputField = (itemValue: number) => {
    const filterData = attributeValues.filter((item) => item !== itemValue);
    setAttributes([...filterData]);
  };
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    createAttribute(data);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };
  return (
    <ZForm
     buttonName="Create"
      isLoading={cIsloading}
      isSuccess={CIsSuccess}
      isError={cIsError}
      error={cError as TError}
      data={data}
      submit={handleSubmit}
      resolver={zodResolver(attributesSchema)}
      closeModal={handleCloseAndOpen}
      formType="create"
    >
      <ZInput label={"Attribute name"} name={"name"} type={"text"}></ZInput>
      <div className="max-h-[400px] overflow-y-scroll thin-scrollbar">
        {attributeValues.map((item, index) => {
          return (
            <div key={item} className="flex gap-x-2 justify-between items-center">
              <div className="w-[85%]">
                <ZInput
                  label={`Attribute Value ${index + 1}`}
                  name={`values.${index}`}
                  type={"text"}
                ></ZInput>
              </div>
              <div className="w-[15%] text-end">
                {index === 0 && (
                  <Tooltip content="Add Value" placement="top">
                    <IconButton
                      onClick={() => handleAddInputField()}
                      color="amber"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <GoPlus size={20}></GoPlus>
                    </IconButton>
                  </Tooltip>
                )}
                {index !== 0 && (
                  <Tooltip content="Delete" placement="top">
                    <IconButton
                      onClick={() => handleDeleteInputField(item)}
                      color="red"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <AiOutlineDelete size={20}></AiOutlineDelete>
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ZForm>
  );
};

export default AddAttributes;
