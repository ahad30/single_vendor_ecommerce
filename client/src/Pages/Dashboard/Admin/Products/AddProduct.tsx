import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useCreateProductMutation,
  useGetProductAttributeWithValueQuery,
} from "../../../../Redux/Feature/Admin/product/productApi";
import ZForm from "../../../../Component/Form/ZForm";
import { TError } from "../../../../types/globalTypes";
import ZInput from "../../../../Component/Form/ZInput";
import ZImageInput from "../../../../Component/Form/ZImageInput";
import ZSelect from "../../../../Component/Form/ZSelect";
import ZRadio from "../../../../Component/Form/ZRadio";
import { useState } from "react";

const AddProduct = () => {
  const [variantField, setVariantField] = useState([1]);
  const [
    createProduct,
    {
      isLoading: cIsloading,
      isError: cIsError,
      error: cError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useCreateProductMutation();
  const { data: attributeWithValue } =
    useGetProductAttributeWithValueQuery(undefined);
  const [productType, setProductType] = useState("");
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const list_type = [
    { label: "New-arrival", value: "new-arrival" },
    { label: "Top-sales", value: "top-sales" },
    { label: "Feature-product", value: "feature-product" },
  ];

  // handle Add Variant field
  const handleAddVariantField = () => {
    setVariantField([...variantField, variantField?.length + 1]);
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
        // resolver={zodResolver(categorySchema)}
        // closeModal={handleCloseAndOpen}
        formType="create"
        buttonName="Create"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
          {/* name */}
          <ZInput label={"Product name"} name={"name"} type={"text"}></ZInput>
          {/* slug  */}
          <ZInput label={"Slug name"} name={"slug"} type={"text"}></ZInput>
          {/* product code */}
          <ZInput
            label={"Product code"}
            name={"product_uid"}
            type={"text"}
          ></ZInput>
          {/* wight */}
          <ZInput label={"Wight (kg)"} name={"weight"} type={"text"}></ZInput>
          {/* list type */}
          <ZSelect
            options={list_type}
            //   isLoading={roleIsloading}
            mode={undefined}
            label={"List type"}
            name={"list_type"}
          ></ZSelect>
          {/* publish  */}
          <ZRadio
            options={[
              {
                name: "Published",
                value: "1",
              },
              {
                name: "Unpublished",
                value: "0",
              },
            ]}
            name={"is_published"}
            label={"Publish status"}
          ></ZRadio>
        </div>
        <div>
          <h5 className="text-xl  pb-2 mb-2 border-b-2 border-gray-400">
            Type of products
          </h5>
          <ZRadio
            options={[
              {
                name: "Single",
                value: "single",
              },
              {
                name: "Variant",
                value: "variant",
              },
            ]}
            name={"product_type"}
            label={"Product type"}
            setProductType={setProductType}
          ></ZRadio>
        </div>
        {/* single Product type start */}
        {productType === "single" && <div>single Product type</div>}
        {/* single Product type end */}
        {/* variant Product type start */}
        {productType === "variant" && (
          <div>
            {/* per sku  */}
            <div className="grid grid-cols-1 lg:grid-cols-5 border-red-500 border">
              {attributeWithValue?.data?.map((item) => {
                return (
                  <div className="">
                    <h1>{item.name}</h1>
                    <div className="ml-2 bg-red-400 text-white">
                      {item.values.map((value) => (
                        <p>{value.name}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* per sku end */}
          </div>
        )}
        {/* variant Product type end */}

        {/* <ZImageInput label="Picture" name="image"></ZImageInput> */}
      </ZForm>
    </div>
  );
};

export default AddProduct;
