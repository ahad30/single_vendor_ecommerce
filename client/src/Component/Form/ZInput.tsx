import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const ZInput = ({
  name,
  type,
  label,
}: {
  name: string;
  type: string;
  label: string;
}) => {
  const { control } = useFormContext();
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
          <Input {...field} type={"type"} placeholder="Basic usage" />
        </Form.Item>
      )}
    />
  );
};

export default ZInput;
