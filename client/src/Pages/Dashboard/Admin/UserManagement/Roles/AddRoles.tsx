import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
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
import { NoStyleItemContext } from "antd/es/form/context";

const AddRoles = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } = useGetAllPermissionsQuery(undefined);
  const [
    createRoles,
    { isLoading: rIsLoading, data: rData, isError, isSuccess, error },
  ] = useCreateRolesMutation();

  if (isLoading || isFetching) {
    return <p>loading ...</p>;
  }
  if (!Array.isArray(data?.data) || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    console.log(data);
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("image", data.image);
    // createCategory(formData);
  };
  console.log(data.data);
  return (
    <div>
      <ZForm
        formType="edit"
        data={rData}
        closeModal={handleCloseAndOpen}
        isError={isError}
        isLoading={rIsLoading}
        isSuccess={isSuccess}
        error={error as TError}
        submit={handleSubmit}
      >
        <ZInput label="Role name" name="name" type="text"></ZInput>
        {data?.data.map((item) => (
          <ZCheckbox
            label={item.name}
            name={item.name}
            value={item.name}
          ></ZCheckbox>
        ))}
      </ZForm>
    </div>
  );
};

export default AddRoles;
