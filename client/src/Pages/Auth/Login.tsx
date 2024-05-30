import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { useLoginMutation } from "../../Redux/Feature/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import { setUser } from "../../Redux/Feature/auth/authSlice";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const user = useAppSelector((state: RootState) => state.auth)
    // console.log(user)
    const [Login , {isError , isLoading , isSuccess}] = useLoginMutation()
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { data: loginData } = await Login(data)
        if (loginData.status) {
            console.log(loginData.data)
            dispatch(setUser(loginData.data))
            navigate('/')
        }
      
    }


    return (

        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">

            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Login Here</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative mb-8">
                                        <input

                                            {...register("email")}
                                             id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-b-blue-600 focus:borer-rose-600" placeholder="Email address" />
                                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>

                                    </div>
                                    <div className="relative">
                                        <input
                                            {...register("password")}
                                             id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 
                                    focus:outline-none focus:border-b-blue-600" placeholder="Password" />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className="relative">

                                        <button
                                            className="bg-blue-500 text-white rounded-md px-2 py-1"><input type="submit" value="Submit" className="bg-blue-500 text-white rounded-md px-2 py-1" /></button>
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