/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreatePackageMutation } from "../../../../Redux/Feature/Admin/package/packageApi";
import { useAppDispatch } from "../../../../Redux/hook";
import { setIsAddModalOpen } from "../../../../Redux/Feature/Modal/modalSlice";
import ZForm from "../../../../Component/Form/ZForm";
import { TError } from "../../../../types/globalTypes";
import ZInput from "../../../../Component/Form/ZInput";
import ZImageInput from "../../../../Component/Form/ZImageInput";
import ZNumber from "../../../../Component/Form/ZNumber";
import ZRadio from "../../../../Component/Form/ZRadio";
import ZCkEditor from "../../../../Component/Form/ZCkEditor";
import { useState } from "react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { GoPlus } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { packageSchema } from "../../../../shcema/packageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
const CreatePackage = () => {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState("");
  // const []
  const [itemsField, setItemField] = useState<number[]>([1]);

  const handleAddInputField = () => {
    setItemField([...itemsField, itemsField.length + 1]);
  };
  const handleDeleteInputField = (itemValue: number) => {
    const filterData = itemsField.filter((item) => item !== itemValue);
    setItemField([...filterData]);
  };
  const [
    createPackage,
    {
      isLoading: cIsloading,
      isError: cIsError,
      error: cError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useCreatePackageMutation();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (description === "" || !description) {
      return toast.error("Please provide a description");
    }
    const formData = new FormData();
    const remainData: any = {
      ...data,
      status: Number(data.status),
      price: Number(data.price),
      quantity: Number(data.quantity),
    };
    delete remainData?.items;
    for (const key in remainData) {
      formData.append(key, remainData[key]);
    }
    console.log(remainData);
    formData.append("is_existing_product_package", "0");
    formData.append("description", description);
    const modifiedData = data?.items?.map(
      (item: { product_name: string; price: number; quantity: number }) => ({
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity),
      })
    );

    // modifiedData.for
    modifiedData.forEach(
      (
        el: { product_name: string; price: number; quantity: number },
        index: number
      ) => {
        formData.append(`items[${index}][quantity]`, `${el.quantity}`);
        formData.append(`items[${index}][price]`, `${el.price}`);
        formData.append(`items[${index}][product_name]`, el.product_name);
      }
    );
    createPackage(formData);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };
  return (
    <div>
      <div>
        <ZForm
          isLoading={cIsloading}
          isSuccess={CIsSuccess}
          isError={cIsError}
          error={cError as TError}
          data={data}
          submit={handleSubmit}
          resolver={zodResolver(packageSchema)}
          closeModal={handleCloseAndOpen}
          formType="create"
          buttonName="Create"
        >
          <div className="lg:col-span-3 grid gap-x-2 lg:grid-cols-3">
            <ZInput label={"Package name"} name={"name"} type={"text"}></ZInput>
            <ZNumber name="quantity" label="Quantity"></ZNumber>
            <ZNumber name="price" label="Price"></ZNumber>
          </div>
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
            label={"Package Status"}
          ></ZRadio>
          <ZImageInput
            label="Upload Package Picture"
            name="image"
          ></ZImageInput>

          <div>
            <h1 className="text-xl mb-5 mt-12">Add package item</h1>
            <div className="max-h-[400px] overflow-y-scroll thin-scrollbar">
              {itemsField.map((item, index) => {
                return (
                  <div
                    key={item}
                    className="flex gap-x-2 justify-between lg:items-center"
                  >
                    <div className="w-[85%] grid gap-x-2 lg:grid-cols-3">
                      <ZInput
                        label={`Product ${index + 1}`}
                        name={`items.${index}.product_name`}
                        type={"text"}
                      ></ZInput>
                      <ZNumber
                        name={`items.${index}.price`}
                        label="Price"
                      ></ZNumber>
                      <ZNumber
                        name={`items.${index}.quantity`}
                        label="Quantity"
                      ></ZNumber>
                    </div>
                    <div className="w-[15%] mt-6 lg:mt-0 text-end">
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
          </div>

          <ZCkEditor setDescription={setDescription}></ZCkEditor>
        </ZForm>
      </div>
    </div>
  );
};

export default CreatePackage;
