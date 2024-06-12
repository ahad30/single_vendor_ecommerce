/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRegisterMutation } from "../../Redux/Feature/auth/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type TRegisterError = {
  data: {
    message: string;
  };
};
const Register = () => {
  const [Register, { isLoading, isSuccess, data, isError, error: rError }] =
    useRegisterMutation();

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Register(data);
    //  console.log(data)
  };
  const error = rError as TRegisterError;
  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      toast.loading("loading ....", { id: 1 });
      if (isSuccess) {
        reset();
        toast.success(data?.message, { id: 1 });
        navigate("/");
      }
      if (isError) {
        toast.error(error.data.message, { id: 1 });
      }
    }
  }, [isSuccess, isLoading, isError, error]);

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="w-full md:w-1/2 mx-auto py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">
                REGISTER NOW!
              </h1>
              <p>Enter your information to register</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <div>
                <div className="flex flex-col lg:flex-row -mx-3">
                  <div className=" w-full px-3 mb-5">
                    <label
                      htmlFor=""
                      className="text-base font-semibold px-1 text-gray-900"
                    >
                      {" "}
                      name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-900 text-lg"></i>
                      </div>
                      <input
                        {...register("name")}
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="John"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor=""
                      className="text-base font-semibold px-1 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-900 text-lg"></i>
                      </div>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="johnsmith@example.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor=""
                      className="text-base font-semibold px-1 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-phone-outline text-gray-900 text-lg"></i>
                      </div>
                      <input
                        {...register("phone")}
                        type="number"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="00987654321"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor=""
                      className="text-base font-semibold px-1 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-900 text-lg"></i>
                      </div>
                      <input
                        {...register("password")}
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="************"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label
                      htmlFor=""
                      className="text-base font-semibold px-1 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-900 text-lg"></i>
                      </div>
                      <input
                        {...register("password_confirmation")}
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="************"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
