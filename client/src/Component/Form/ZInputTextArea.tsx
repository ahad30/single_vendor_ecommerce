import { useEffect } from "react";
import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { RootState } from "../../Redux/store";
import { useAppSelector } from "../../Redux/hook";

const ZInputTextArea = ({
    name,
    label,
    value,
    reset,
}: {
    name: string;
    label: string;
    value?: string;
    reset?: boolean;
}) => {
    const { control, setValue, resetField } = useFormContext();
    const { isEditModalOpen } = useAppSelector(
        (state: RootState) => state.modal
    );

    useEffect(() => {
        if (value) {
            setValue(name, value);
        }
    }, [value, setValue, name]);

    useEffect(() => {
        if (reset === true) {
            if (!isEditModalOpen) {
                resetField(name);
            }
        }
    }, [reset, isEditModalOpen, resetField, name]);

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
                    <Input.TextArea {...field} placeholder={label} />
                </Form.Item>
            )}
        />
    );
};

export default ZInputTextArea;