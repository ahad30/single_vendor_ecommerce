import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import ZForm from "../../../../Component/Form/ZForm";
import ZInput from "../../../../Component/Form/ZInput";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import { Button, Form, Input } from "antd";
import ZImageInput from "../../../../Component/Form/ZImageInput";

const categorySchema = z.object({
  name: z.string().nonempty("Please fill the name"),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Please upload a file",
    })
    .optional(),
});

const AddCategory = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <ZForm submit={handleSubmit} resolver={zodResolver(categorySchema)}>
        <ZInput label={"Category name"} name={"name"} type={"text"}></ZInput>
        <ZImageInput></ZImageInput>
      </ZForm>
    </div>
  );
};

export default AddCategory;
