/* eslint-disable @typescript-eslint/no-explicit-any */

import { Checkbox } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";

type TZbox = {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  checkedAttributed: boolean;
  isSuccess: boolean;
  keys?: boolean;
};

const ZCheckbox = ({
  value,
  label,
  name,
  checked,
  checkedAttributed,
  isSuccess,
  keys,
}: TZbox) => {
  const { control, resetField } = useFormContext();
  const { isEditModalOpen, isAddModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );

  const [sChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (!isAddModalOpen || !isEditModalOpen || isSuccess) {
      setIsChecked(false);
      if (checkedAttributed) {
        resetField(name);
      }
    }
    if (keys === true && (isAddModalOpen || isEditModalOpen)) {
      setIsChecked(true);
    }
  }, [isAddModalOpen, isEditModalOpen, isSuccess, checkedAttributed, keys]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (e: any) => {
          sChecked ? setIsChecked(false) : setIsChecked(true);
          const isChecked = e.target.checked;
          const currentValue = Array.isArray(field.value) ? field.value : [];
          const newValue = isChecked
            ? [...currentValue, value]
            : currentValue.filter((v: string) => v !== value);
          field.onChange(newValue);
        };
        return (
          <>
            <Checkbox
              defaultChecked={checked ? checked : false}
              onChange={handleChange}
              {...(checkedAttributed ? { checked: sChecked } : {})}
            >
              {label}
            </Checkbox>
            {error && <small style={{ color: "red" }}>{error?.message}</small>}
          </>
        );
      }}
    />
  );
};

export default ZCheckbox;
