import ZForm from "../../../../Component/Form/ZForm"
import ZInput from "../../../../Component/Form/ZInput"
import ReUseableButton from "../../../../Component/UserDashboard/ReUseableButton/ReUseableButton"


const AdminProfileSettings = () => {
  return (
    <div>    
        <ZForm>
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
        <ZInput label={"Old Password :"} name={"name"} type={"text"}></ZInput>
        <ZInput label={"New Password :"} name={"name"} type={"text"}></ZInput>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <ZInput label={"Confirm Password :"} name={"name"} type={"text"}></ZInput>
    </div>   
    <div className="mt-10">
        <ReUseableButton title={"Update Passsword"} />
    </div>
</ZForm>
</div>
  )
}

export default AdminProfileSettings