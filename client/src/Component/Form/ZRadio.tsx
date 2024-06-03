import { defaultValue } from "@material-tailwind/react/types/components/slider";
import { Form, Radio, RadioChangeEvent } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TRadio = {
  name: string;
  label: string;
  value: { name: string; value: number | string }[];
  defaultValue?: number | string;
};

const ZRadio = ({ name, label, value, defaultValue }: TRadio) => {
  const { control } = useFormContext();
  // const [value, setValue] = useState(1);

  // const onChange = (e: RadioChangeEvent) => {
  //   console.log('radio checked', e.target.value);
  //   setValue(e.target.value);
  // };
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
          <Radio.Group
            onChange={field.onChange}
            {...(defaultValue ? { value: defaultValue } : {})}
          >
            {value.map((item) => (
              <Radio value={item.value}>{item.name}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      )}
    />
  );
};

export default ZRadio;
