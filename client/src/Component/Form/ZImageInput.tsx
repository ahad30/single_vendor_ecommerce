import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const ZImageInput = () => {
  return (
    <Controller
      name={"image"}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        // <Input {...field} type={type} placeholder="Basic usage" />
        <Form.Item label={"Picture"}>
          <Input
            value={value?.fileName}
            {...field}
            type="file"
            onChange={(e) => onChange(e.target.files![0])}
          ></Input>
          {error && <p style={{ color: "red" }}>{error?.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default ZImageInput;
