import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateProductMutation } from "../../../../Redux/Feature/Admin/product/productApi";
import ZForm from "../../../../Component/Form/ZForm";
import { TError } from "../../../../types/globalTypes";
import ZInput from "../../../../Component/Form/ZInput";
import ZImageInput from "../../../../Component/Form/ZImageInput";
import ZSelect from "../../../../Component/Form/ZSelect";
import ZRadio from "../../../../Component/Form/ZRadio";

const AddProduct = () => {
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
  
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    //   const formData = new FormData();
    //   formData.append("name", data.name);
    //   formData.append("image", data.image);
    //   createCategory(formData);
  };

  //   $table->string('list_type')->default('new-arrival')->comment('top-sales | new-arrival | feature-product');
  const list_type = [
    { label: "New-arrival", value: "new-arrival" },
    { label: "Top-sales", value: "top-sales" },
    { label: "Feature-product", value: "feature-product" },
  ];
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
          <ZInput label={"Product name"} name={"name"} type={"text"}></ZInput>
          <ZInput label={"Slug name"} name={"slug"} type={"text"}></ZInput>
          <ZInput
            label={"Product code"}
            name={"product_uid"}
            type={"text"}
          ></ZInput>
          <ZInput label={"Wight (kg)"} name={"weight"} type={"text"}></ZInput>
          <ZSelect
            options={list_type}
            //   isLoading={roleIsloading}
            mode={undefined}
            label={"List type"}
            name={"list_type"}
          ></ZSelect>
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
          ></ZRadio>
        </div>

        {/* <ZImageInput label="Picture" name="image"></ZImageInput> */}
      </ZForm>
    </div>
  );
};

export default AddProduct;
