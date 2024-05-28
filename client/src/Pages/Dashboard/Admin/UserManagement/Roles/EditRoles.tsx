import { FieldValues, SubmitHandler } from "react-hook-form";
import { setIsEditModalOpen } from "../../../../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../../../../Redux/hook";
import {
  useEditRoleMutation,
  useGetAllPermissionsQuery,
} from "../../../../../Redux/Feature/Admin/UserManagement/rolesApi";
import { useEffect, useState } from "react";
import ZForm from "../../../../../Component/Form/ZForm";
import ZInput from "../../../../../Component/Form/ZInput";
import ZCheckbox from "../../../../../Component/Form/ZCheckbox";
import { TError } from "../../../../../types/globalTypes";

/* eslint-disable @typescript-eslint/no-explicit-any */
type TPermissions = {
  id: number;
  name: string;
};
const EditRoles = <T extends { id: string | number; [key: string]: any }>({
  itemData,
}: {
  itemData: T;
}) => {
  const [availablePermissions, setAvailablePermissions] = useState<string[]>(
    []
  );
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } = useGetAllPermissionsQuery(undefined);
  const [
    editRole,
    {
      isLoading: rIsloading,
      isError: rIsError,
      error: rError,
      isSuccess: rIsSuccess,
      data: rData,
    },
  ] = useEditRoleMutation();
  const previousPermissions = itemData?.permissions;
  const allPermissions = data?.data;

  useEffect(() => {
    if (
      Array.isArray(allPermissions) &&
      Array.isArray(previousPermissions) &&
      allPermissions?.length > 0 &&
      previousPermissions?.length > 0
    ) {
      const availablePermissions = allPermissions?.reduce(
        (acc: string[], item: TPermissions) => {
          const existPermissions = previousPermissions.some(
            (pItem: TPermissions) => pItem?.id == item?.id
          );
          if (!existPermissions) {
            acc.push(item.name);
          }
          return acc;
        },
        []
      );
      setAvailablePermissions([...(availablePermissions || [])]);
    }
  }, [allPermissions, previousPermissions]);

  if (isLoading || isFetching) {
    return <p>loading ...</p>;
  }
  if (!Array.isArray(data?.data) || data.data.length === 0) {
    return <p>Permission not available</p>;
  }
  if (
    Array.isArray(previousPermissions) == false ||
    previousPermissions.length == 0
  ) {
    return <p>No Previous Permission</p>;
  }

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    //   const formData = new FormData();
    //   formData.append("name", data.name ? data.name : itemData.name);
    //   if (data?.image) {
    //     formData.append("image", data.image);
    //   }
    //   formData.append("_method", "PUT");
    //   editCategory({ data: formData, id: itemData.id });
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };
  const cPermissions = {
    currentPermissions: previousPermissions.map((p: TPermissions) => p.name),
  };
  return (
    <div>
      <ZForm
        defaultValues={cPermissions}
        formType="edit"
        data={rData}
        closeModal={handleCloseAndOpen}
        isError={rIsError}
        isLoading={rIsloading}
        isSuccess={rIsSuccess}
        error={rError as TError}
        submit={handleSubmit}
        // resolver={zodResolver(rolesSchema)}
      >
        <ZInput
          value={itemData.name}
          label="Role name"
          name="name"
          type="text"
        />

        {/* previous permission */}
        <p className="mt-4 mb-2"> Current Permissions</p>
        <div className="grid mb-10 max-h-[400px] thin-scrollbar overflow-scroll grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {previousPermissions?.map((item) => (
            <div className="bg-[#E6F4FF] rounded h-[50px] flex  items-center px-2 border border-[#CBDBF3]">
              <ZCheckbox
                isSuccess={rIsSuccess}
                checkedAttributed={false}
                key={item.id}
                label={item.name}
                name="currentPermissions"
                value={item.name}
                checked={true}
              />
            </div>
          ))}
        </div>
        {/* available permission */}
        <p className="mt-4 mb-2"> Available Permissions</p>
        <div className="grid mb-10 max-h-[400px] thin-scrollbar overflow-scroll grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {availablePermissions?.map((item) => (
            <div className="bg-[#E6F4FF] rounded h-[50px] flex  items-center px-2 border border-[#CBDBF3]">
              <ZCheckbox
                isSuccess={rIsSuccess}
                checkedAttributed={true}
                key={item}
                label={item}
                name="availablePermissions"
                value={item}
              />
            </div>
          ))}
        </div>
      </ZForm>
    </div>
  );
};

export default EditRoles;
