import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ZEmail = ({ name, label }) => {
  const { control } = useFormContext();

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
