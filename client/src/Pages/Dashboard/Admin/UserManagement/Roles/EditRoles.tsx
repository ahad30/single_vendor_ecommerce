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
import { toast } from "sonner";

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
    const allPermissions: string[] = [];
    if (
      Array.isArray(data?.currentPermissions) &&
      data.currentPermissions.length > 0
    ) {
      allPermissions.push(...data.currentPermissions);
    }
    if (
      Array.isArray(data?.availablePermissions) &&
      data.availablePermissions.length > 0
    ) {
      allPermissions.push(...data.availablePermissions);
    }
    const bodyData = {
      name: data?.name || itemData.name,
      permissions: allPermissions,
      _method: "PUT",
    };

    if (bodyData?.permissions?.length > 0) {
      editRole({ data: bodyData, id: itemData.id });
    } else {
      toast.error("select at least one permission", { id: 1 });
    }
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
                checkedAttributed={true}
                key={item.id}
                label={item.name}
                name="currentPermissions"
                value={item.name}
                checked={true}
                keys={true}
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
