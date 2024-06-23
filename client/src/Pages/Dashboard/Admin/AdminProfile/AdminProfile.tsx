import ZForm from "../../../../Component/Form/ZForm";
import ZInput from "../../../../Component/Form/ZInput";
import {
  useGetLoggedInUserQuery,
  useUpdateMutation,
} from "../../../../Redux/Feature/auth/authApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TError } from "../../../../types/globalTypes";
import { Button } from "antd";

const AdminProfile = () => {
  const { data: profileData } = useGetLoggedInUserQuery(undefined);

  const [updateProfile, { isLoading, isSuccess, data, isError, error }] =
    useUpdateMutation(undefined);

  const handleSubmit: SubmitHandler<FieldValues> = (formValues) => {

    const formData = new FormData();
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }
    // formData.append("name", data?.name);
    // formData.append("email", data?.email);
    // formData.append("address", data?.address);
    // formData.append("phone", data?.phone);
    formData.append("_method", "PUT");
    updateProfile(formData);
  };

 

  return (
    <div className="">
      <div className="bg-white p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10">
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-56 h-[150px] left-5 lg:mt-[-70px]">
            <img
              className="h-[180px] w-[180px] rounded-full  absolute object-cover"
              src="https://ui-avatars.com/api/?name=A"
              alt=""
            />

            {/* <div className="top-[185px] left-[152px] absolute bg-[#265eda] text-white w-8 h-8 flex justify-center items-center rounded-full cursor-pointer">
              <FaEdit onClick={handleImage} />
            </div> */}
          </div>

          <div className="flex flex-col justify-center items-center bg-[#bdcef4] px-6 rounded-t-[30px] w-56 h-[190px] gap-y-2">
            <h1 className="text-[#042656] mt-3 text-[16px] font-sans font-semibold">
              {profileData?.data?.name}
            </h1>

            <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
              Email : {profileData?.data?.email}
            </span>
            <span className="text-[#555555] mt-1 text-sm font-normal font-mono">
              Mobile : {profileData?.data?.phone}
            </span>
            <span className="text-[#555555] mt-1 text-sm font-normal font-mono">
              Address : {profileData?.data?.address}
            </span>
          </div>
        </div>

        <div className="">
          <ZForm
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error as TError}
            data={data}
            submit={handleSubmit}
            formType="edit"
            buttonName="Update"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
              <ZInput
                defaultKey="profile"
                label={"Name:"}
                name={"name"}
                type={"text"}
                value={profileData?.data?.name}
              ></ZInput>
              <ZInput
                defaultKey="profile"
                label={"Phone :"}
                name={"phone"}
                type={"number"}
                value={profileData?.data?.phone}
              ></ZInput>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <ZInput
                defaultKey="profile"
                label={"email :"}
                name={"email"}
                type={"text"}
                value={profileData?.data?.email}
              ></ZInput>
              <ZInput
                defaultKey="profile"
                label={"Address :"}
                name={"address"}
                type={"text"}
                value={profileData?.data?.address}
              ></ZInput>
            </div>

            <div className="mt-5 flex justify-end">
              <Button type="primary" htmlType="" className="">
                Update
              </Button>
            </div>
          </ZForm>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
