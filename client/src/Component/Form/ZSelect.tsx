import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TSelect = {
  name: string;
  label: string;
  mode: "multiple" | "tags" | undefined;
  options: { label: string; value: string }[] | [];
  isLoading: boolean;
};

const ZSelect = ({ name, label, mode, options, isLoading }: TSelect) => {
  const { control } = useFormContext();
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
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
            onChange={field.onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options || []}
            mode={mode ? mode : undefined}
            loading={isLoading}
            disabled={isLoading}
          />
        </Form.Item>
      )}
    />
  );
};

export default ZSelect;
