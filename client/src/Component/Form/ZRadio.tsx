import { Form, Radio } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const ZRadio = ({ name, label }) => {
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
          <Radio {...field} value={1}>
            A
          </Radio>
        </Form.Item>
      )}
    />
  );
};

export default ZRadio;
