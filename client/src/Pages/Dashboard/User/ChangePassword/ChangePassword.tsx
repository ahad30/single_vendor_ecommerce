import ZForm from "../../../../Component/Form/ZForm";
import ZInput from "../../../../Component/Form/ZInput";
import ReUseableButton from "../../../../Component/UserDashboard/ReUseableButton/ReUseableButton";


const ChangePassword = () => {
    return (
        <div>
            <div className="bg-white p-6 md:p-10 h-screen">
                <ZForm>

                    <ZInput defaultKey={"changePassword"} label={"Current Password"} name={"current password"} type={"password"}></ZInput>
                    <ZInput defaultKey={"changePassword"} label={"Password"} name={"password"} type={"password"}></ZInput>

                    <ZInput defaultKey={"changePassword"} label={"Confirm Password"} name={"confirm password"} type={"password"}></ZInput>
                    <div className="mt-10">
                        <ReUseableButton title={"Change Password"} />
                    </div>
                </ZForm>
            </div>
        </div>
    );
};

export default ChangePassword;