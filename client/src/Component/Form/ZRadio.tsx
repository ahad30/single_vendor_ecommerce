import { defaultValue } from "@material-tailwind/react/types/components/slider";
import { Form, Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";

type TRadio = {
  name: string;
  label: string;
  options: { name: string; value: number | string }[];
  defaultValue?: number | string;
};

const ZRadio = ({ name, label, options, defaultValue }: TRadio) => {
  const { control } = useFormContext();
  const [value, setValue] = useState<string | number | undefined>("");
  const { isEditModalOpen } = useAppSelector((state: RootState) => state.modal);

  const onChange = (value: string) => {
    setValue(value);
  };
  useEffect(() => {
    if (defaultValue || isEditModalOpen) {
      setValue(defaultValue);
    }
  }, [defaultValue, isEditModalOpen]);
 
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
            {...field}
            onChange={(e) => {
              onChange(e.target.value);
              field.onChange(e.target.value);
            }}
            {...(defaultValue ? { value: value } : {})}
          >
            {options.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.name}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      )}
    />
  );
};

export default ZRadio;
