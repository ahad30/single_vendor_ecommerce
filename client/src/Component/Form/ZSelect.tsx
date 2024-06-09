import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type TOptions = { label: string; value: string }[] | [] | undefined;

type TSelect = {
  name: string;
  label: string;
  mode: "multiple" | "tags" | undefined;
  options: TOptions;
  isLoading?: boolean;
  value?: string | number | string[];
  setSelectedAttributes?: React.Dispatch<React.SetStateAction<string[]>>;
  setPerSku?: React.Dispatch<React.SetStateAction<string[] | number[]>>;
  defaultKey?: "product";
  selectedAttribute?: string[];
  refresh?: boolean;
};

const ZSelect = ({
  name,
  label,
  mode,
  options,
  isLoading,
  value,
  setSelectedAttributes,
  setPerSku,
  defaultKey,
  selectedAttribute,
  refresh,
}: TSelect) => {
  const { control, setValue, resetField, getValues } = useFormContext();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleChange = () => {
   
  };

  useEffect(() => {
    if (name === "attribute-selected") {
      resetField("attribute-selected");
    }
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);

  useEffect(() => {
    if (defaultKey === "product" && selectedAttribute && setPerSku) {
      const s = selectedAttribute.includes(name);
      const nameVa = getValues(name);
      if (s === false) {
        setPerSku((prev) => {
          const newPrev = [...prev];
          const filtered = newPrev.filter((item) => item !== nameVa);
          return filtered;
        });
        resetField(name);
      }
    }
  }, [selectedAttribute, selectedAttribute?.length]);

  useEffect(() => {
    if (defaultKey === "product") {
      if (setPerSku) {
        setPerSku([]);
      }
      if (setSelectedAttributes) {
        setSelectedAttributes([]);
      }
    }
  }, []);

  useEffect(() => {
    if (defaultKey === "product" && selectedAttribute) {
      selectedAttribute.forEach((item) => resetField(item));
    }
  }, [refresh]);

  const onChange = (value: string | string[]) => {
    if (
      setSelectedAttributes &&
      mode === "multiple" &&
      defaultKey === "product"
    ) {
      setSelectedAttributes([...value]);
    }
    if (mode === undefined && setPerSku && defaultKey === "product") {
      setPerSku((prev) => {
        const newPrev: any = [...prev];
        if (Array.isArray(value)) {
          value.forEach((val) => {
            const [newCategory] = val.split("-");
            const index = newPrev.findIndex((item: any) =>
              item.startsWith(newCategory)
            );
            if (index !== -1) {
              newPrev[index] = val;
            } else {
              newPrev.push(val);
            }
          });
        } else {
          const [newCategory] = value.split("-");
          const index = newPrev.findIndex((item: any) =>
            item.startsWith(newCategory)
          );
          if (index !== -1) {
            newPrev[index] = value;
          } else {
            newPrev.push(value);
          }
        }
        return newPrev;
      });
    }
  };

  const onSearch = (value: string) => {
    // console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Controller
      key={refreshKey} // Add key to force re-render on refreshKey change
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
