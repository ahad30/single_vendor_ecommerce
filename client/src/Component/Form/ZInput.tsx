import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ZInput = ({
  name,
  type,
  label,
  value,
}: {
  name: string;
  type: string;
  label: string;
  value?: string;
}) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);
  console.log(value);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input {...field} type={type} placeholder="Basic usage" />
        </Form.Item>
      )}
    />
  );
};

export default ZInput;
