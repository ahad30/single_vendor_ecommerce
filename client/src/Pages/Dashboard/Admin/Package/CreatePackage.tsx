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
    console.log(data);
    // is_existing_product_package
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("image", data.image);
    // createPackage(formData);
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
          // resolver={zodResolver(categorySchema)}
          closeModal={handleCloseAndOpen}
          formType="create"
          buttonName="Create"
        >
          <ZInput label={"Package name"} name={"name"} type={"text"}></ZInput>
          <ZNumber name="quantity" label="Quantity"></ZNumber>
          <ZNumber name="price" label="Price"></ZNumber>
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

          <div className="max-h-[400px] overflow-y-scroll thin-scrollbar">
            {itemsField.map((item, index) => {
              return (
                <div
                  key={item}
                  className="flex gap-x-2 justify-between items-center"
                >
                  <div className="w-[85%] grid gap-x-2 lg:grid-cols-3">
                    <ZInput
                      label={`Product ${index + 1}`}
                      name={`items.product_name.${index}`}
                      type={"text"}
                    ></ZInput>
                    <ZNumber
                      name={`items.price.${index}`}
                      label="Price"
                    ></ZNumber>
                    <ZNumber
                      name={`items.quantity.${index}`}
                      label="Quantity"
                    ></ZNumber>
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

          <ZCkEditor setDescription={setDescription}></ZCkEditor>
        </ZForm>
      </div>
    </div>
  );
};

export default CreatePackage;
