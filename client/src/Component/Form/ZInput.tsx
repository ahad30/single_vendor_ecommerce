/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RootState } from "../../Redux/store";
import { useAppSelector } from "../../Redux/hook";

const ZInput = ({
  name,
  type,
  label,
  value,
  reset,
}: {
  name: string;
  type: string;
  label: string;
  value?: string;
  reset?: boolean;
}) => {
  const { control, setValue, resetField } = useFormContext();
  const { isEditModalOpen } = useAppSelector((state: RootState) => state.modal);
  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);
  useEffect(() => {
    if (reset === true) {
      if (!isEditModalOpen) {
        resetField(name);
      }
    }
  }, [reset, isEditModalOpen]);
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
          <Input className="" {...field} type={type} placeholder={label} />
        </Form.Item>
      )}
    />
  );
};

export default ZInput;
