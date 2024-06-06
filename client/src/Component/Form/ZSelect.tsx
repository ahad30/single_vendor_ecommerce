/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TSelect = {
  name: string;
  label: string;
  mode: "multiple" | "tags" | undefined;
  options: { label: string; value: string }[] | [];
  isLoading?: boolean;
  value?: string | number | string[];
  setSelectedAttributes?: React.Dispatch<React.SetStateAction<string[]>>;
};

const ZSelect = ({
  name,
  label,
  mode,
  options,
  isLoading,
  value,
  setSelectedAttributes,
}: TSelect) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);

  const onChange = (value: string | string[]) => {
    if (setSelectedAttributes && mode === "multiple") {
      setSelectedAttributes([...value]);
    }
  };

  const onSearch = (value: string) => {
    // console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
          <Select
            {...field}
            virtual={true}
            showSearch
            placeholder={label}
            optionFilterProp="children"
            onChange={(value: string | number) => {
              field.onChange(value);
              onChange(value as string);
            }}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options || []}
            mode={mode ? mode : undefined}
            loading={isLoading ? isLoading : false}
            disabled={isLoading ? isLoading : false}
          />
        </Form.Item>
      )}
    />
  );
};

export default ZSelect;
