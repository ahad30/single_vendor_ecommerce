/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d-.\s]{7,10}$/;

type TPhone = {
  name: string;
  label: string;
  value?: string;
};

const ZPhone = ({ name, label , value}:TPhone) => {
  const { control,setValue} = useFormContext();

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "Phone number is required",
        pattern: {
          value: phoneRegex,
          message: "Invalid phone number format",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input {...field} placeholder="Enter your phone number" />
        </Form.Item>
      )}
    />
  );
};

export default ZPhone;
