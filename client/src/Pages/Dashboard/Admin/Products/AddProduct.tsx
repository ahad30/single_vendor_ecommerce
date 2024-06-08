/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useCreateProductMutation,
  useGetBrandForProductQuery,
  useGetCategoryForProductQuery,
  useGetProductAttributeWithValueQuery,
} from "../../../../Redux/Feature/Admin/product/productApi";
import ZForm from "../../../../Component/Form/ZForm";
import { TError } from "../../../../types/globalTypes";
import ZInput from "../../../../Component/Form/ZInput";
import ZImageInput from "../../../../Component/Form/ZImageInput";
import ZSelect, { TOptions } from "../../../../Component/Form/ZSelect";
import ZRadio from "../../../../Component/Form/ZRadio";
import { useEffect, useState } from "react";
import { TAttributes } from "../../../../types/attribute.types";
import ZNumber from "../../../../Component/Form/ZNumber";
import { Button } from "antd";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../../../shcema/productSchema";

const AddProduct = () => {
  // attribute State - 1 from db
  const [attributeValue, setAttributeValue] = useState<TAttributes[]>([]);
  // selected attribute State - 2
  const [selectedAttribute, setSelectedAttribute] = useState<string[]>([]);
  // attribute options for selected options state-3
  const [attributeOptions, setAttributeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  //  product type state - 4
  const [productType, setProductType] = useState("");

  // selectedAttribute UnderTheValue - 5
  const [selectedAttributeUnderTheValue, setSelectedAttributeUnderTheValue] =
    useState<TAttributes[]>([]);

  // per sku - 6
  const [perSku, setPerSku] = useState<string[] | number[]>([]);

  // image file , price , quantity - 7 for vairant product
  const [priceQuantityImage, setPriceQuantityImage] = useState({
    price: "",
    image: "",
    quantity: "",
  });

  // const final skus - 8
  const [skus, setSkus] = useState<any[]>([]);

  //  refresh state for variant
  const [refresh, setRefresh] = useState(false);
  // create product
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

  // attribute withe value from db
  const { data: attributeWithValue, isLoading: attributeIsLoading } =
    useGetProductAttributeWithValueQuery(undefined);
  const { data: categoryData, isLoading: categoryDataIsLoading } =
    useGetCategoryForProductQuery(undefined);
  const { data: brandData, isLoading: brandDataIsLoading } =
    useGetBrandForProductQuery(undefined);

  // this useEffect set attribute options and attributeWithValue - 1
  useEffect(() => {
    if (
      Array.isArray(attributeWithValue?.data) &&
      attributeWithValue?.data?.length > 0
    ) {
      const attributeOptions = attributeWithValue?.data?.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setAttributeOptions([...attributeOptions]);
      setAttributeValue([...attributeWithValue.data]);
    }
  }, [attributeWithValue, attributeWithValue?.data]);

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const list_type = [
    { label: "New-arrival", value: "new-arrival" },
    { label: "Top-sales", value: "top-sales" },
    { label: "Feature-product", value: "feature-product" },
  ];

  useEffect(() => {
    if (selectedAttribute) {
      const arr: TAttributes[] = [];
      for (let index = 0; index < selectedAttribute.length; index++) {
        const element = selectedAttribute[index];
        const findTheAttributeWithValue = attributeValue?.find(
          (item) => item.name == element
        );

        if (findTheAttributeWithValue) {
          arr.push({ ...findTheAttributeWithValue });
        }
      }
      setSelectedAttributeUnderTheValue([...(arr || [])]);
    }
  }, [selectedAttribute.length, selectedAttribute, attributeValue]);

  const handleAddPerSkuInSkus = () => {
    const attributes: { [index: string]: string } = {};
    const valuesName: string[] = [];

    if (perSku.length == 0) {
      // console.log("sayem");
      toast.error("Select minimum an attribute value", {
        id: 2,
        duration: 1000,
        position: "top-right",
      });
    }
    if (priceQuantityImage.image == "") {
      toast.error("select image", { id: 1 });
    }
    if (priceQuantityImage.price == "") {
      toast.error("select price", { id: 3 });
    }
    if (priceQuantityImage.quantity == "") {
      toast.error("select quantity", { id: 4 });
    }
    if (
      perSku.length > 0 &&
      priceQuantityImage.quantity &&
      priceQuantityImage.price &&
      priceQuantityImage
    ) {
      perSku.forEach((element) => {
        const proPertyKey = (element as string).split("-")[0];
        const proPertyValue = (element as string).split("-")[1];
        valuesName.push(proPertyValue);
        attributes[proPertyKey] = proPertyValue;
      });
      const sku = {
        sku: `${valuesName.join("-")}`,
        price: priceQuantityImage.price,
        quantity: priceQuantityImage.quantity,
        image: priceQuantityImage.image,
        attributes,
      };

      // const finTheExistSku = skus.find((item) => item.sku == sku.sku);
      // if (finTheExistSku) {
      //   toast.error("Sku already exists");
      // } else {
      setSkus([...skus, { ...sku }]);
      handleRefreshVariantState();
      // }
    }
  };

  // handle refresh the state for variant
  const handleRefreshVariantState = () => {
    setPerSku([]);
    setPriceQuantityImage({
      price: "",
      image: "",
      quantity: "",
    });
    setRefresh(!refresh);
  };

  if (brandDataIsLoading || categoryDataIsLoading || attributeIsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading ...</p>
      </div>
    );
  }
  return (
    <div>
      <ZForm
        isLoading={cIsloading}
        isSuccess={CIsSuccess}
        isError={cIsError}
        error={cError as TError}
        data={data}
        submit={handleSubmit}
        resolver={zodResolver(productSchema)}
        // closeModal={handleCloseAndOpen}
        formType="create"
        buttonName="Create"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
          {/* name */}
          <ZInput label={"Product name"} name={"name"} type={"text"}></ZInput>
          {/* slug  */}
          <ZInput label={"Slug name"} name={"slug"} type={"text"}></ZInput>
          {/* wight */}
          <ZInput label={"Wight (kg)"} name={"weight"} type={"text"}></ZInput>
          {/* list type */}
          <ZSelect
            options={list_type}
            isLoading={cIsloading}
            mode={undefined}
            label={"List type"}
            name={"list_type"}
          ></ZSelect>
          {/* category options */}
          <ZSelect
            options={
              categoryData?.data?.map((item) => ({
                label: item?.name,
                value: item?.id,
              })) as TOptions
            }
            isLoading={categoryDataIsLoading}
            mode={undefined}
            label={"Select category"}
            name={"category_id"}
          ></ZSelect>
          {/* brand options */}
          <ZSelect
            options={
              brandData?.data?.map((item) => ({
                label: item?.name,
                value: item?.id,
              })) as TOptions
            }
            isLoading={categoryDataIsLoading}
            mode={undefined}
            label={"Select brand"}
            name={"brand_id"}
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

          {/* thumbnail iamge */}
          <ZImageInput label="Thumbnail Image" name="thumbnail"></ZImageInput>
          {/* description */}
          <ZInput
            label={"Description"}
            name={"description"}
            type={"text"}
          ></ZInput>
        </div>
        <div className="mt-7">
          <h5 className="text-xl  pb-2 mb-2  ">Type of products</h5>
          <ZRadio
            options={[
              {
                name: "Single",
                value: "1",
              },
              {
                name: "Variant",
                value: "0",
              },
            ]}
            name={"is_single_product"}
            label={"Product type"}
            setProductType={setProductType}
          ></ZRadio>
        </div>

        {/* single Product type start */}
        {productType === "1" && <div>single Product type</div>}

        {/* variant Product type start */}
        {productType === "0" && (
          <div className="">
            {/* per sku  */}

            {/* multiple attribute */}
            <ZSelect
              setSelectedAttributes={setSelectedAttribute}
              options={attributeOptions}
              isLoading={attributeIsLoading}
              mode={"multiple"}
              label={"Select Attributes"}
              name={"attribute-selected"}
              defaultKey="product"
            ></ZSelect>
            {/* selected attribute underTheValue */}
            <div className="border border-gray-400 p-3">
              {/* attribute value */}
              <div className="mt-12 grid lg:grid-cols-5 gap-5">
                {selectedAttributeUnderTheValue.map((item) => {
                  return (
                    <ZSelect
                      key={item?.id}
                      options={item?.values?.map((option) => ({
                        value: `${item?.name}-${option?.name}`,
                        label: option?.name,
                      }))}
                      isLoading={attributeIsLoading}
                      mode={undefined}
                      label={`Select ${item.name} value`}
                      name={`${item.name}`}
                      setPerSku={setPerSku}
                      defaultKey="product"
                      selectedAttribute={selectedAttribute}
                      refresh={refresh}
                    ></ZSelect>
                  );
                })}
              </div>
              {/* image, quantity, price*/}
              <div className="grid grid-cols-1 items-center gap-x-2 lg:grid-cols-3">
                <ZImageInput
                  defaultKey="product"
                  setPriceQuantityImage={setPriceQuantityImage}
                  label="Picture"
                  name="image"
                  refresh={refresh}
                ></ZImageInput>
                <ZNumber
                  defaultKey="product"
                  setPriceQuantityImage={setPriceQuantityImage}
                  label="Price($)"
                  name="price"
                  refresh={refresh}
                ></ZNumber>
                <ZNumber
                  setPriceQuantityImage={setPriceQuantityImage}
                  defaultKey="product"
                  label="Quantity"
                  name="quantity"
                  refresh={refresh}
                ></ZNumber>
              </div>

              {/* button */}
              <div className="flex justify-end">
                <Button
                  htmlType="button"
                  onClick={() => handleAddPerSkuInSkus()}
                  type="primary"
                  color="primary"
                >
                  Add Variant
                </Button>
              </div>
            </div>
            {/* per sku end */}
          </div>
        )}

        {/* <ZImageInput label="Picture" name="image"></ZImageInput> */}
        {/* submit*/}
        <Button type="primary" htmlType="submit" className="">
          Submit
        </Button>
      </ZForm>
    </div>
  );
};

export default AddProduct;

// Create a new FormData object
// const formData = new FormData();

// Append product information
// formData.append("name", "Product 4");
// formData.append("slug", "product-4");
// formData.append("category_id", 1);
// formData.append("brand_id", 1);
// formData.append("product_uid", "PRD-123456789");
// formData.append("weight", "0.3kg");
// formData.append("description", "Product 2 Description");
// formData.append("is_published", true);
// formData.append("list_type", "new-arrival");

// // Append thumbnail image file
// const thumbnailFile = document.querySelector('input[name="thumbnail"]').files[0];
// formData.append("thumbnail", thumbnailFile);

// // Append SKUs
// const skus = [
//     {
//         "attributes": {
//             "Color": "Black",
//             "Size": "L"
//         },
//         "quantity": 20,
//         "price": 200,
//         "image": document.querySelector('input[name="sku_image_1"]').files[0]
//     },
//     {
//         "attributes": {
//             "Color": "Red",
//             "Size": "XXL"
//         },
//         "quantity": 15,
//         "price": 150,
//         "image": document.querySelector('input[name="sku_image_2"]').files[0]
//     }
// ];

// // Append SKUs to FormData
// skus.forEach((sku, index) => {
//     formData.append(`skus[${index}][attributes][Color]`, sku.attributes.Color);
//     formData.append(`skus[${index}][attributes][Size]`, sku.attributes.Size);
//     formData.append(`skus[${index}][quantity]`, sku.quantity);
//     formData.append(`skus[${index}][price]`, sku.price);
//     formData.append(`skus[${index}][image]`, sku.image);
// });

// Use the formData in a request (e.g., fetch API)
