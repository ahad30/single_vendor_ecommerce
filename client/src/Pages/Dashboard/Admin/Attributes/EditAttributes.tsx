/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdateAttributeMutation } from "../../../../Redux/Feature/Admin/Attribute/attributeApi";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { setIsEditModalOpen } from "../../../../Redux/Feature/Modal/modalSlice";
import ZForm from "../../../../Component/Form/ZForm";
import { TError } from "../../../../types/globalTypes";
import ZInput from "../../../../Component/Form/ZInput";
import { useEffect, useState } from "react";
import { Alert, Tooltip } from "antd";
import { IconButton } from "@material-tailwind/react";
import { GoPlus } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { TAttributes, TValue } from "../../../../types/attribute.types";
import { RootState } from "../../../../Redux/store";
import { CiTrash } from "react-icons/ci";

const EditAttributes = <T extends { id: string | number; [key: string]: any }>({
  itemData,
}: {
  itemData: T | TAttributes;
}) => {
  const [
    editAttribute,
    {
      isLoading: cIsLoading,
      isError: cIsError,
      error: cError,
      isSuccess: cIsSuccess,
      data,
    },
  ] = useUpdateAttributeMutation();

  const [attributeValues, setAttributes] = useState<number[]>([1]);
  const [previousValues, setPreviousValues] = useState<TValue[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const { isEditModalOpen } = useAppSelector((state: RootState) => state.modal);
  useEffect(() => {
    if (itemData?.values || !isEditModalOpen || cIsSuccess) {
      setPreviousValues(itemData?.values);
    }
  }, [itemData?.values, itemData, cIsSuccess, isEditModalOpen]);

  useEffect(() => {
    if (!isEditModalOpen || cIsSuccess) {
      setDeletedIds([]);
    }
  }, [isEditModalOpen, cIsSuccess]);

  useEffect(() => {
    if (!isEditModalOpen || cIsSuccess) {
      setAttributes([1]);
    }
  }, [isEditModalOpen, cIsSuccess]);
  const dispatch = useAppDispatch();

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  const handleAddInputField = () => {
    setAttributes([...attributeValues, attributeValues.length + 1]);
  };

  const handleDeleteInputField = (itemValue: number) => {
    const filterData = attributeValues.filter((item) => item !== itemValue);
    setAttributes([...filterData]);
  };

  const handlePreviousItemDelete = (id: number) => {
    setDeletedIds([...deletedIds, id]);
    const filterData = previousValues.filter((item) => item.id !== id);
    setPreviousValues([...filterData]);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const valuesData = data?.values?.filter(
      (item: any) => item !== undefined && item !== ""
    );
    const formData = new FormData();
    formData.append("name", data.name);
    if (Array.isArray(valuesData) && valuesData.length > 0) {
      valuesData.forEach((value: string) => formData.append("values[]", value));
    }
    if (Array.isArray(deletedIds) && deletedIds.length > 0) {
      deletedIds.forEach((id: number) =>
        formData.append("value_ids[]", id.toString())
      );
    }
    formData.append("_method", "PUT");

    editAttribute({ data: formData, id: itemData.id });
  };

  return (
    <div>
      {/* previous values */}
      <div>
        <h3 className="border-b mb-2 font-bold border-black ">
          Previous values
        </h3>
        <div className="grid mb-12 pt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {previousValues.length > 0
            ? previousValues?.map((item) => (
                <div key={item?.id} className="relative">
                  <Alert message={item?.name} type="info" />
                  <span
                    onClick={() => handlePreviousItemDelete(item?.id)}
                    className="cursor-pointer absolute bg-red-500 p-1 rounded-full -top-2 -right-2 text-white"
                  >
                    <CiTrash size={20}></CiTrash>
                  </span>
                </div>
              ))
            : "There are no previous values"}
        </div>
      </div>
      {/* previous values end*/}
      <ZForm
        isLoading={cIsLoading}
        isSuccess={cIsSuccess}
        isError={cIsError}
        error={cError as TError}
        data={data}
        submit={handleSubmit}
        // resolver={zodResolver(attributesSchema)}
        closeModal={handleCloseAndOpen}
        formType="edit"
      >
        <ZInput
          value={itemData?.name}
          label={"Attribute name"}
          name={"name"}
          type={"text"}
        ></ZInput>

        {/* new Value Add */}
        <h3 className="border-b mb-2 font-bold border-black ">Add new value</h3>
        <div className="max-h-[400px] overflow-y-scroll thin-scrollbar">
          {attributeValues.map((item, index) => (
            <div
              key={item}
              className="flex gap-x-2 justify-between items-center"
            >
              <div className="w-[85%]">
                <ZInput
                  reset={true}
                  label={`Attribute Value ${index + 1}`}
                  name={`values.${index}`}
                  type={"text"}
                ></ZInput>
              </div>
              <div className="w-[15%] text-end">
                {index === 0 && (
                  <Tooltip placement="top">
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
                  <Tooltip placement="top">
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
          ))}
        </div>
      </ZForm>
    </div>
  );
};

export default EditAttributes;
