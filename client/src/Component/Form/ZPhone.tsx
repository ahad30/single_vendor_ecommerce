import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d-.\s]{7,10}$/;

const ZPhone = ({ name, label }) => {
  const { control } = useFormContext();

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
