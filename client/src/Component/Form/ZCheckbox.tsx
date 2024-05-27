import { Checkbox } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const ZCheckbox = ({ value, label, name }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox value={value} onChange={field.onChange}>
          Checkbox
        </Checkbox>
      )}
    />
  );
};

export default ZCheckbox;
