import ZForm from "../../../../Component/Form/ZForm"
import ZInput from "../../../../Component/Form/ZInput"
import ReUseableButton from "../../../../Component/UserDashboard/ReUseableButton/ReUseableButton"
import { useGetLoggedInUserQuery } from "../../../../Redux/Feature/auth/authApi";

const AdminProfile = () => {
    const { isLoading, isSuccess, data, isError, error } = useGetLoggedInUserQuery();

    console.log(data)
    return (
        <div>    
        <ZForm 
          isLoading={isLoading}
          isError={isError}
          error={error}
          data={data}
        >
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
        <ZInput label={"Name :"} name={"name"} value={data?.data?.name}  type={"text"}></ZInput>
        <ZInput label={"Email :"} name={"email"} value={data?.data?.email} ></ZInput>
    </div>

    
    <div className="mt-10">
        <ReUseableButton title={"Update Profile"} />
    </div>
</ZForm>
</div>
    );
};

export default AdminProfile;