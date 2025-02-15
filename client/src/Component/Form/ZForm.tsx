/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
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
  closeModal?: () => void;
  isError?: boolean;
  error?: TError;
  data?: any;
  formType: "edit" | "create";
  buttonName: "Create" | "Update";
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
  buttonName,
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
    if (formType === "edit") {
      if (!isEditModalOpen) {
        methods.clearErrors();
      }
    }
  }, [isAddModalOpen, isEditModalOpen, methods]);

  useEffect(() => {
    if (isSuccess && closeModal) {
      closeModal();
      if (formType === "create") {
        methods.reset();
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    toast.dismiss(1);
  }, []);

  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      if (isLoading) {
        toast.loading("loading...", { id: 1 });
      }
      if (isSuccess) {
        toast.success(data?.message, { id: 1 });
      }
      if (isError) {
        toast.error(error?.data?.message, { id: 1, duration: 3000 });
      }
    }
  }, [isSuccess, isLoading, isError]);

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        <div>{children}</div>
        {closeModal && (
          <SaveAndCloseButton
            closeModal={closeModal}
            isLoading={isLoading as boolean}
            isSuccess={isSuccess as boolean}
            title={buttonName}
          />
        )}
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
