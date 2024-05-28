import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllRolesQuery } from "../../../../../Redux/Feature/Admin/UserManagement/rolesApi";
import { useCreateUserMutation } from "../../../../../Redux/Feature/Admin/UserManagement/usersApi";
import { useAppDispatch } from "../../../../../Redux/hook";
import { setIsAddModalOpen } from "../../../../../Redux/Feature/Modal/modalSlice";
import ZForm from "../../../../../Component/Form/ZForm";
import { TError } from "../../../../../types/globalTypes";
import ZInput from "../../../../../Component/Form/ZInput";
import ZSelect from "../../../../../Component/Form/ZSelect";
import ZEmail from "../../../../../Component/Form/ZEmail";
import ZPhone from "../../../../../Component/Form/ZPhone";
import ZImageInput from "../../../../../Component/Form/ZImageInput";

const AddUser = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } = useGetAllRolesQuery(undefined);
  const [
    createUser,
    { isLoading: rIsLoading, data: rData, isError, isSuccess, error },
  ] = useCreateUserMutation();

  if (isLoading || isFetching) {
    return (
      <div className="text-lg flex justify-center items-center">
        <p>loading ...</p>
      </div>
    );
  }
  if (!Array.isArray(data?.data) || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  const handleSubmit: SubmitHandler<FieldValues> = (formData) => {
    // const data = {
    //   ...formData,
    //   name: formData.name.toLowerCase(),
    // };
    // createRoles(data);
    console.log(formData);
  };

  return (
    <div>
      <ZForm
        formType="create"
        data={rData}
        closeModal={handleCloseAndOpen}
        isError={isError}
        isLoading={rIsLoading}
        isSuccess={isSuccess}
        error={error as TError}
        submit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <ZInput label="Name" name="name" type="text" />
          <ZSelect mode={false} label={"Role"} name={"role"}></ZSelect>
          <ZEmail name={"email"} label={"Email"}></ZEmail>
          <ZPhone name={"phone"} label={"Phone"}></ZPhone>
          <ZInput label="Address" name="address" type="text" />
          <ZInput label="Password" name="password" type="password" />
          <ZInput
            label="Confirm Password"
            name="password_confirmation"
            type="password"
          />
        </div>
        <ZImageInput label="Image" name="image"></ZImageInput>
      </ZForm>
    </div>
  );
};

export default AddUser;
