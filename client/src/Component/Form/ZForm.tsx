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
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import SaveAndCloseButton from "../Button/SaveAndCloseButton";

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
} & defaultAndResolver;

const ZForm = ({
  children,
  submit,
  defaultValues,
  resolver,
  isSuccess,
  isLoading,
  closeModal,
}: TZForm) => {
  const { isAddModalOpen, isEditModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const formConfig: defaultAndResolver = {};
  // formConfig["mode"] = "onChange";

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

  useEffect(() => {
    if (!isAddModalOpen || !isEditModalOpen) {
      methods.reset();
    }
  }, [isAddModalOpen, isEditModalOpen]);

  useEffect(() => {
    if (isSuccess && closeModal) {
      methods.reset();
      closeModal();
    }
  }, [isSuccess]);

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
      </Form>
    </FormProvider>
  );
};

export default ZForm;
