import ZForm from "../../../../Component/Form/ZForm";
import ZInput from "../../../../Component/Form/ZInput";
import ZInputTextArea from "../../../../Component/Form/ZInputTextArea";
import { FaEdit } from "react-icons/fa";
import ReUseableButton from "../../../../Component/UserDashboard/ReUseableButton/ReUseableButton";

const UserProfile = () => {
    const handleImage = () => {
        alert('Div clicked!');
    }
    return (
        <div className="">
            <div className="bg-white p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10">

                <div className="flex flex-col justify-center items-center">
                    <div className=" relative w-56 h-48 left-4 lg:mt-[-70px]"
                       >
                        <img className="h-56 w-48  absolute object-cover" src="https://i.ibb.co/NLpp7vt/depositphotos-176214104-stock-illustration-default-avatar-profile-icon.webp" alt="" />
                        <div className="top-[185px] left-[152px] absolute bg-[#265eda] text-white w-8 h-8 flex justify-center items-center rounded-full">
                            <FaEdit  onClick={handleImage} />
                        </div>

                    </div>
                    <div className="flex flex-col justify-center items-center bg-[#bdcef4] px-6 rounded-t-[30px] w-56 h-56">
                        <h1 className="text-[#042656] mt-3 text-[20px] font-sans font-semibold">Sabiha Wasema</h1>
                        <span className="text-[#555555] mt-1 text-sm  font-normal font-mono">UserName: sabiha</span>
                        <span className="text-[#555555] mt-1 text-sm font-normal font-mono">Email: sabihabitm1@gmail.com</span>
                        <span className="text-[#555555] mt-1 text-sm font-normal font-mono">Mobile: +8801852787490</span>
                    </div>
                </div>
                <div className="">
                    <ZForm>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
                            <ZInput defaultKey="profile" label={"First Name :"} name={"name"} type={"text"}></ZInput>
                            <ZInput defaultKey="profile" label={"Last Name :"} name={"name"} type={"text"}></ZInput>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                            <ZInput defaultKey="profile" label={"Country :"} name={"country"} type={"text"}></ZInput>
                            <ZInput defaultKey="profile" label={"State :"} name={"state"} type={"text"}></ZInput>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                            <ZInput defaultKey="profile" label={"City :"} name={"city"} type={"text"}></ZInput>
                            <ZInput  defaultKey="profile" label={"Zip Code :"} name={"zipCode"} type={"text"}></ZInput>
                        </div>
                        <div className=" w-full md:col-span-2">
                            <ZInputTextArea name="address" label="Address" />

                        </div>
                        <div className="mt-10">
                            <ReUseableButton title={"Update Profile"} />
                        </div>
                    </ZForm>
                </div>

            </div>

        </div>


    );
};

export default UserProfile;