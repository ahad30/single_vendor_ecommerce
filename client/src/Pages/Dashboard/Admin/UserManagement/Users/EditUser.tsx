import { FieldValues, SubmitHandler } from "react-hook-form";
import ZForm from "../../../../../Component/Form/ZForm";
import { setIsEditModalOpen } from "../../../../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../../../../Redux/hook";
import { useGetAllRolesListQuery } from "../../../../../Redux/Feature/Admin/UserManagement/rolesApi";
import { TError } from "../../../../../types/globalTypes";
import ZInput from "../../../../../Component/Form/ZInput";
import ZSelect from "../../../../../Component/Form/ZSelect";
import { OptionsGenerator } from "../../../../../utils/OptionsGenerator";
import ZEmail from "../../../../../Component/Form/ZEmail";
import ZPhone from "../../../../../Component/Form/ZPhone";
import ZImageInput from "../../../../../Component/Form/ZImageInput";

import { TUser } from "../../../../../types";
import { Image } from "antd";
import { useEditUserMutation } from "../../../../../Redux/Feature/Admin/UserManagement/usersApi";

const EditUser = ({ itemData }: { itemData: TUser }) => {
  const dispatch = useAppDispatch();
  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  const { data: RolesListData, isLoading: roleIsloading } =
    useGetAllRolesListQuery(undefined);

  const [
    editUser,
    {
      data: uData,
      isLoading: uIsLoading,
      isError: uIsError,
      error: uError,
      isSuccess: uIsSuccess,
    },
  ] = useEditUserMutation();

  if (roleIsloading) {
    return (
      <div className="text-lg flex justify-center items-center">
        <p>loading ...</p>
      </div>
    );
  }
  if (!Array.isArray(RolesListData?.data) || RolesListData?.data.length === 0) {
    return <p>No role available</p>;
  }

  const handleSubmit: SubmitHandler<FieldValues> = (formData) => {
    const remainData = { ...formData };
    delete remainData.image;
    const formD = new FormData();
    for (const key in remainData) {
      formD.append(key, formData[key]);
    }
    if (formData.image) {
      formD.append("image", formData.image);
    }
    formD.append("_method", "PUT");
    editUser({ data: formD, id: itemData.id });
  };

  return (
    itemData && (
      <div>
        <ZForm
          formType="edit"
          data={uData}
          closeModal={handleCloseAndOpen}
          isError={uIsError}
          isLoading={uIsLoading}
          isSuccess={uIsSuccess}
          error={uError as TError}
          submit={handleSubmit}
          // resolver={zodResolver(userSchema)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ZInput
              value={itemData?.name}
              label="Name"
              name="name"
              type="text"
            />
            <ZSelect
              options={OptionsGenerator(RolesListData!.data)}
              isLoading={roleIsloading}
              mode={undefined}
              label={"Role"}
              name={"role"}
              value={itemData?.role[0]}
            ></ZSelect>
            <ZEmail
              value={itemData?.email}
              name={"email"}
              label={"Email"}
            ></ZEmail>
            <ZPhone
              value={itemData?.phone}
              name={"phone"}
              label={"Phone"}
            ></ZPhone>
            <ZInput
              value={itemData?.address}
              label="Address"
              name="address"
              type="text"
            />
          </div>
          <ZImageInput label="Image" name="image"></ZImageInput>
        </ZForm>
        <div>
          <p className="text-lg mt-10 mb-3">Previous Picture</p>
          <Image
            width={100}
            src={`${import.meta.env.VITE_IMAGE_URL}${itemData?.image}`}
          />
        </div>
      </div>
    )
  );
};

export default EditUser;
