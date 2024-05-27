/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "antd";
import { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import SaveAndCloseButton from "../Button/SaveAndCloseButton";
import ErrorHandling from "../../utils/ErrorHandling";
import { toast } from "sonner";
import { TError } from "../../types/globalTypes";

type defaultAndResolver = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TZForm = {
  children: ReactNode;
  submit: SubmitHandler<FieldValues>;
  isSuccess?: boolean;
  isLoading?: boolean;
  closeModal: () => void;
  isError?: boolean;
  error?: TError;
  data?: any;
  formType: "edit" | "create";
} & defaultAndResolver;

const ZForm = ({
  children,
  submit,
  defaultValues,
  resolver,
  isSuccess,
  isLoading,
  closeModal,
  isError,
  error,
  data,
  formType,
}: TZForm) => {
  const { isAddModalOpen, isEditModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const formConfig: defaultAndResolver = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm({ ...formConfig, mode: "all" });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    submit(data);
  };

  const errors = ErrorHandling(
    error?.data?.errors,
    isAddModalOpen,
    isEditModalOpen
  );
  useEffect(() => {
    if (formType === "create") {
      if (!isAddModalOpen || !isEditModalOpen) {
        methods.reset();
      }
    }
  }, [isAddModalOpen, isEditModalOpen]);

  useEffect(() => {
    if (isSuccess && closeModal) {
      methods.reset();
      closeModal();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      toast.loading("loading ....", { id: 1 });
      if (isSuccess) {
        toast.success(data?.message, { id: 1 });
      }
      if (isError) {
        toast.error(error?.data?.message, { id: 1 });
      }
    }
  }, [isSuccess, isLoading, isError]);

  return (
    <FormProvider {...methods}>
      {/* <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form> */}
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        <div>{children}</div>
        <SaveAndCloseButton
          closeModal={closeModal}
          isLoading={isLoading as boolean}
          isSuccess={isSuccess as boolean}
          title="Save"
        ></SaveAndCloseButton>
        <div className="mt-5">
          {Array.isArray(errors) &&
            errors.length > 0 &&
            errors.map((item) => (
              <div
                className="bg-red-100 my-2 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{item}</span>
              </div>
            ))}
        </div>
      </Form>
    </FormProvider>
  );
};

export default ZForm;
