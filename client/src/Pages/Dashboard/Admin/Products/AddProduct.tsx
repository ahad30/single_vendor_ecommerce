/* eslint-disable react-hooks/exhaustive-deps */
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
import ZMultipleImage from "../../../../Component/Form/ZMultipleImage";
import { useNavigate } from "react-router-dom";
import { VariantProductTable } from "../../../../Component/Dashborad/VariantProductTable";
import { variantExists } from "../../../../helper/SameVariantExist";
import ZCkEditor from "../../../../Component/Form/ZCkEditor";

function generateUniqueId(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export type TPerSkus = {
  id: number;
  sku: string;
  price: number;
  quantity: number;
  attributes: {
    [index: string]: string;
  };
};

const AddProduct = () => {
  const navigate = useNavigate();
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
  // single -----> image file , price , quantity - 9
  const [singlePriceQuantityImage, singleSetPriceQuantityImage] = useState({
    singlePrice: "",
    images: "",
    singleQuantity: "",
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

  const [description, setDescription] = useState("");

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

  useEffect(() => {
    if (CIsSuccess) {
      navigate("/admin/products");
    }
  }, [CIsSuccess]);

  // sku deleted when switch another variant
  useEffect(() => {
    setSkus([]);
  }, [productType]);

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
      priceQuantityImage.image
    ) {
      perSku.forEach((element) => {
        const proPertyKey = (element as string).split("-")[0];
        const proPertyValue = (element as string).split("-")[1];
        valuesName.push(proPertyValue);
        attributes[proPertyKey] = proPertyValue;
      });
      const sku = {
        id: generateUniqueId(),
        sku: `${valuesName.join("-")}`,
        price: priceQuantityImage.price,
        quantity: priceQuantityImage.quantity,
        image: priceQuantityImage.image,
        attributes,
      };

      if (skus.length == 0) {
        // setVariants([...vairants, sku.attributes]);
        setSkus([...skus, { ...sku }]);
        handleRefreshVariantState();
      } else if (skus.length > 0) {
        const skusAttributes = skus.map((sku) => sku.attributes);
        const exist = variantExists(skusAttributes, sku.attributes);
        if (!exist) {
          // setVariants([...vairants, sku.attributes]);
          setSkus([...skus, { ...sku }]);
          handleRefreshVariantState();
        } else {
          toast.error("Already exists the variant of the product", {
            duration: 2000,
          });
        }
      }
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

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const modifiedData: any = {
      ...data,
      is_published: Number(data.is_published),
      is_single_product: Number(data.is_single_product),
      weight: `${data.weight}kg`,
    };

    if (description === "") {
      return toast.error("Please enter a description", { id: 12 });
    }
    // check if the product is single product
    if (modifiedData.is_single_product == 1) {
      if (singlePriceQuantityImage.singlePrice == "") {
        toast.error("single product price required", {
          id: 10,
          duration: 1000,
          position: "top-right",
        });
      }
      if (singlePriceQuantityImage.singleQuantity == "") {
        toast.error("single product quantity required", {
          id: 2,
          duration: 1000,
          position: "top-right",
        });
      }

      if (
        singlePriceQuantityImage.singlePrice &&
        singlePriceQuantityImage.singleQuantity
      ) {
        const formData = new FormData();
        for (const key in modifiedData) {
          formData.append(key, modifiedData[key]);
        }
        formData.append("unit_price", singlePriceQuantityImage.singlePrice);
        formData.append(
          "unit_quantity",
          singlePriceQuantityImage.singleQuantity
        );
        formData.append("description", description);
        if (
          Array.isArray(singlePriceQuantityImage.images) &&
          singlePriceQuantityImage.images.length > 0
        ) {
          singlePriceQuantityImage.images.forEach((element) => {
            formData.append("images[]", element);
          });
        }
        createProduct(formData);
      }
    }
    // check if product is variant product
    else if (modifiedData.is_single_product == 0) {
      if (skus.length > 0) {
        const formData = new FormData();
        for (const key in modifiedData) {
          formData.append(key, modifiedData[key]);
        }
        formData.append("description", description);
        skus.forEach((sku, index) => {
          formData.append(`skus[${index}][quantity]`, sku.quantity);
          formData.append(`skus[${index}][price]`, sku.price);
          formData.append(`skus[${index}][image]`, sku.image);
          for (const attr in sku.attributes) {
            formData.append(
              `skus[${index}][attributes][${attr}]`,
              sku.attributes[attr]
            );
          }
        });
        createProduct(formData);
      } else {
        toast.error("Missing variant attribute", {
          id: 1,
          duration: 1000,
          position: "top-right",
        });
      }
    }
  };

  // console.log(perSku);
  if (brandDataIsLoading || categoryDataIsLoading || attributeIsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading ...</p>
      </div>
    );
  }
  // console.log({ perSku, name: "persku" });
  // console.log({ skus, name: "skus" });
  // console.log({ priceQuantityImage, name: "priceQuantityImage" });
  // console.log({ singlePriceQuantityImage, name: "SinglepriceQuantityImage" });
  // console.log(description);
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

          {/* wight */}
          <ZInput
            label={"Weight(kg) (optional)"}
            name={"weight"}
            type={"text"}
          ></ZInput>
          {/* list type */}
          <ZSelect
            options={list_type}
            isLoading={cIsloading}
            mode={undefined}
            label={"List type"}
            name={"list_type"}
          ></ZSelect>
          {/* category and brand */}
          <div className="md:col-span-3 grid gap-x-4 lg:grid-cols-2">
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
          </div>
          {/* published and thumbnail image */}
          <div>
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
          </div>
          {/* description */}
          <div className="md:col-span-3">
            <p className="mb-2">Description</p>
            <ZCkEditor setDescription={setDescription}></ZCkEditor>
          </div>
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
        {productType === "1" && (
          <div>
            <ZMultipleImage
              singleSetPriceQuantityImage={singleSetPriceQuantityImage}
              name="s"
              label="multiple image"
            ></ZMultipleImage>

            <ZNumber
              defaultKey="singleProduct"
              setPriceQuantityImage={singleSetPriceQuantityImage}
              label="Price($)"
              name="singlePrice"
            ></ZNumber>
            <ZNumber
              setPriceQuantityImage={singleSetPriceQuantityImage}
              defaultKey="singleProduct"
              label="Quantity"
              name="singleQuantity"
            ></ZNumber>
          </div>
        )}

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
              refresh={refresh}
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
                  // type="primary"
                  style={{ backgroundColor: "#162447", color: "white" }}
                  // color="primary"
                >
                  + Add Variant
                </Button>
              </div>
            </div>
            {/* per sku end */}
          </div>
        )}

        {/* <ZImageInput label="Picture" name="image"></ZImageInput> */}
        {/* submit*/}
        <div className="mt-5">
          <Button type="primary" htmlType="submit" className="">
            Submit
          </Button>
        </div>
      </ZForm>

      <VariantProductTable skus={skus} setSkus={setSkus}></VariantProductTable>
    </div>
  );
};

export default AddProduct;
