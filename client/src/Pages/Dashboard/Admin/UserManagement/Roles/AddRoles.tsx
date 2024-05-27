import { Checkbox } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import {
  useCreateRolesMutation,
  useGetAllPermissionsQuery,
} from "../../../../../Redux/Feature/Admin/UserManagement/rolesApi";
import ZForm from "../../../../../Component/Form/ZForm";
import ZInput from "../../../../../Component/Form/ZInput";
import { useAppDispatch } from "../../../../../Redux/hook";
import { setIsAddModalOpen } from "../../../../../Redux/Feature/Modal/modalSlice";
import { TError } from "../../../../../types/globalTypes";
import { FieldValues, SubmitHandler } from "react-hook-form";
import ZCheckbox from "../../../../../Component/Form/ZCheckbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddRoles = () => {
  const rolesSchema = z.object({
    name: z.string().nonempty("Please fill the name"),
    permissions: z
      .array(z.string())
      .min(1, "Please select at least one permission"),
  });
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } = useGetAllPermissionsQuery(undefined);
  const [
    createRoles,
    { isLoading: rIsLoading, data: rData, isError, isSuccess, error },
  ] = useCreateRolesMutation();

  const methods = useForm();

  if (isLoading || isFetching) {
    return <p>loading ...</p>;
  }
  if (!Array.isArray(data?.data) || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  const handleSubmit: SubmitHandler<FieldValues> = (formData) => {
    console.log(formData);
    // Process formData and submit
  };

  return (
    <div>
      <FormProvider {...methods}>
        <ZForm
          formType="edit"
          data={rData}
          closeModal={handleCloseAndOpen}
          isError={isError}
          isLoading={rIsLoading}
          isSuccess={isSuccess}
          error={error as TError}
          submit={handleSubmit}
          resolver={zodResolver(rolesSchema)}
        >
          <ZInput label="Role name" name="name" type="text" />
          {data?.data.map((item) => (
            <ZCheckbox
              key={item.id}
              label={item.name}
              name="permissions"
              value={item.name}
            />
          ))}
        </ZForm>
      </FormProvider>
    </div>
  );
};

export default AddRoles;
