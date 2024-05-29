
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
    const data = {
      ...formData,
      name: formData.name.toLowerCase(),
    };
    createRoles(data);
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
        resolver={zodResolver(rolesSchema)}
      >
        <ZInput label="Role name" name="name" type="text" />
        <p className="mt-4 mb-2">Permissions</p>
        <div className="grid mb-10 h-[400px] thin-scrollbar overflow-scroll grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {data?.data.map((item) => (
            <div
              key={item.id}
              className="bg-[#E6F4FF] rounded px-3 py-1 border border-[#CBDBF3]"
            >
              <ZCheckbox
                isSuccess={isSuccess}
                checkedAttributed={true}
                key={item.id}
                label={item.name}
                name="permissions"
                value={item.name}
              />
            </div>
          ))}
        </div>
      </ZForm>
    </div>
  );
};

export default AddRoles;
