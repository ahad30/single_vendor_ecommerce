/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../Redux/Feature/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import { setUser } from "../../Redux/Feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

type TLoginError = {
  data: {
    message: string;
  };
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [
    Login,
    { isError, isLoading, isSuccess, data: loginData, error: loginError },
  ] = useLoginMutation();
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { data: loginData } = await Login(data);
    if (loginData.status) {
      console.log(loginData.status)
      dispatch(setUser(loginData.data));
      if (loginData.data.user.is_customer == 1) {
        navigate("/user");
      } else if (loginData.data.user.is_staff == 1) {
        localStorage.removeItem("dropDown");
        navigate("/admin");
      }
    }
  };

  const error = loginError as TLoginError;

  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      toast.loading("loading ....", { id: 1 });
      if (isSuccess) {
        toast.success(loginData?.message, { id: 1 });
      }
      if (isError) {
        toast.error(error?.data?.message, { id: 1 });
      }
    }
  }, [isSuccess, isLoading, isError, loginData, error]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white md:m-0 md:rounded-none m-2 rounded-md shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login Here</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative mb-8">
                    <input
                      {...register("email")}
                      defaultValue={"admin@gmail.com"}
                      id="email"
                      name="email"
                      type="text"
                      className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-b-blue-600 focus:borer-rose-600"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="relative">
                    <input
                      {...register("password")}
                      defaultValue={"password"}
                      id="password"
                      name="password"
                      type="password"
                      className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 
                                    focus:outline-none focus:border-b-blue-600"
                      placeholder="Password"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="submit"
                      value="Login"
                      className="bg-blue-500 text-white rounded-md px-3 py-1 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
