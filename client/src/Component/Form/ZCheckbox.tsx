import { Checkbox } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TZbox = {
  label: string;
  name: string;
  value: string;
};

const ZCheckbox = ({ value, label, name }: TZbox) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Checkbox
          
            //   checked={field.value?.includes(value)}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [...(field.value || []), value]
                : field.value.filter((v: string) => v !== value);
              field.onChange(newValue);
            }}
          >
            {label}
          </Checkbox>
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </>
      )}
    />
  );
};

export default ZCheckbox;
