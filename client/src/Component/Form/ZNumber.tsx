/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const numberRegex = /^[1-9]+$/;

type TNumber = {
  name: string;
  label: string;
  value?: string;
  defaultKey?: "product";
  setPriceQuantityImage?: React.Dispatch<React.SetStateAction<any>>;
};

const ZNumber = ({
  name,
  label,
  value,
  setPriceQuantityImage,
  defaultKey,
}: TNumber) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!numberRegex.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (val: any) => {
    if (defaultKey === "product" && setPriceQuantityImage) {
      setPriceQuantityImage((prev: any) => ({
        ...prev,
        [name]: Number(val),
      }));
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "Number is required",
        pattern: {
          value: numberRegex,
          message: "Only digits 1 to 9 are allowed",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value);
              handleChange(e.target.value);
            }}
            placeholder={label}
            onKeyPress={handleKeyPress}
          />
        </Form.Item>
      )}
    />
  );
};

export default ZNumber;
