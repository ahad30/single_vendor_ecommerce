import ZForm from "../../../../Component/Form/ZForm";
import ZInput from "../../../../Component/Form/ZInput";
import { Button } from "antd";
import { usePasswordMutation } from "../../../../Redux/Feature/auth/authApi";
import { FieldValues, SubmitHandler , } from "react-hook-form";
import { TError } from "../../../../types/globalTypes";
import { useNavigate } from "react-router-dom";


const AdminChangePassword = () => {
 
  const [updatePassword, { isLoading, isSuccess, data, isError, error }] =
  usePasswordMutation(undefined);
  // const navigate = useNavigate()

  const handleSubmit: SubmitHandler<FieldValues> = (formValues) => {

    const formData = new FormData();
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }   
    formData.append("_method", "PUT");
    updatePassword(formData);
  
  };


  return (
    <div className="m-3 bg-white p-12 rounded-lg shadow-2xl">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-x-6">
          <ZInput reset={true} label={"Old Password :"} name={"old_password"} type={"password"}></ZInput>
          <ZInput reset={true} label={"New Password :"} name={"password"} type={"password"}></ZInput>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <ZInput
            reset={true}
            label={"Confirm Password :"}
            name={"password_confirmation"}
            type={"password"}
          ></ZInput>
        </div>
        <div className="mt-5 flex justify-end">
              <Button type="primary" htmlType="submit" className="">
                Update Password
              </Button>
            </div>
      </ZForm>
    </div>
  );
};

export default AdminChangePassword;
