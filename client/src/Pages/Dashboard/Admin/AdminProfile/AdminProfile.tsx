
import ZForm from "../../../../Component/Form/ZForm";
import ZInput from "../../../../Component/Form/ZInput";
import ReUseableButton from "../../../../Component/UserDashboard/ReUseableButton/ReUseableButton";
import { useGetLoggedInUserQuery } from "../../../../Redux/Feature/auth/authApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TError } from "../../../../types/globalTypes";


const AdminProfile = () => {
  const 
   
    { isLoading, 
    isSuccess, 
    data, 
    isError, 
    error } =
    useGetLoggedInUserQuery(undefined);
      // console.log(data?.data);  

      // const handleSubmit: SubmitHandler<FieldValues> = (data) => {
      //   const formData = new FormData();
      //   formData.append("name", data.name );
      //   if (data?.image) {
      //     formData.append("image", data.image);
      //   }
      //   formData.append("_method", "PUT");
      //   adminProfile({ data: formData, id });
      // };
      

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
            {data?.data?.name}
            </h1>
        
            <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
              Email : {data?.data?.email}
            </span>
            <span className="text-[#555555] mt-1 text-sm font-normal font-mono">
              Mobile : {data?.data?.phone}
            </span>
            <span className="text-[#555555] mt-1 text-sm font-normal font-mono">
              Address : {data?.data?.address}
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
          
           formType="edit"
           buttonName="Update"
          
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
              <ZInput
                defaultKey="profile"
                label={"Name :"}
                name={"name"}
                type={"text"}
                value={data?.data?.name}
              ></ZInput>
              <ZInput
                defaultKey="profile"
                label={"Phone :"}
                name={"phone"}
                type={"number"}
                value={data?.data?.phone}
              ></ZInput>
            
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
             
              <ZInput
                defaultKey="profile"
                label={"email :"}
                name={"email"}
                type={"text"}
                value={data?.data?.email}

              ></ZInput>
                <ZInput
                defaultKey="profile"
                label={"Address :"}
                name={"address"}
                type={"text"}
                value={data?.data?.address}
              ></ZInput>
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

export default AdminProfile;
