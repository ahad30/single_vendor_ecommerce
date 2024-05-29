/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type TEmail = {
  name: string;
  label: string;
  value?: string;
};

const ZEmail = ({ name, label, value }:TEmail) => {
  const { control, setValue } = useFormContext();
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
        required: "Email is required",
        pattern: {
          value: emailRegex,
          message: "Invalid email format",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input {...field} placeholder="Enter your email" />
        </Form.Item>
      )}
    />
  );
};

export default ZEmail;
