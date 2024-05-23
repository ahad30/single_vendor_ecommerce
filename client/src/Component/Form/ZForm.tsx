/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type defaultAndResolver = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TZForm = {
  children: ReactNode;
  submit: SubmitHandler<FieldValues>;
} & defaultAndResolver;

const ZForm = ({ children, submit, defaultValues, resolver }: TZForm) => {
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
  return (
    <FormProvider {...methods}>
      {/* <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form> */}
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        <div>{children}</div>
        <div>
          <Button htmlType="submit" >Submit</Button>
        </div>
      </Form>
    </FormProvider>
  );
};

export default ZForm;
