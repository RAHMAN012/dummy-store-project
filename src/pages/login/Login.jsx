import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../api/api";
import { useAuth } from "../../hooks/useStore";
import { toast } from "sonner";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reveal, setReveal] = useState(false);
  const { setAccessToken, checkAuth } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const redirect = location.state?.from || "/";
  const togglePAssword = () => {
    setReveal((prev) => !prev);
  };
  const onFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await login(formData);
      setAccessToken(res.data.accessToken);
      toast.success(`Welcome ${res.data.firstName}`);
      navigate(redirect);
      checkAuth();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[80%] md:max-w-[35%] h-[100vh] mx-auto pt-[4rem] md:mt-0">
      <div className="">
        <NavLink to="/" className="font-bold text-xl text-center">
          <h1 className="text-center text-xl">Dummy Store</h1>
        </NavLink>
        <h1 className="mt-6 font-bold text-2xl text-center"> Sign In</h1>
        {error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! {error}</span>
          </div>
        )}
        <form action="" className="mt-12" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              {...register("username", { required: true })}
              type="text"
              placeholder="username"
              className="md:w-[250px] w-full h-[48px] border-2 pl-3 text-white"
              id="username"
              name="username"
              defaultValue="emilys"
            />
            {errors.username && (
              <span className="text-red-500 font-semibold">
                *This field is required
              </span>
            )}
          </div>
          {/*  */}
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: true })}
                type={reveal ? "text" : "password"}
                placeholder="your password"
                className="md:w-[250px] w-full h-[48px] border-2 pl-3 text-white"
                id="password"
                name="password"
                defaultValue="emilyspass"
              />
              <button  className=" text-white absolute inset-y-0 right-2 border-0 font-semibold text-sm " onClick={togglePAssword}type="button">{reveal? <FaRegEye/> : <FaRegEyeSlash/>}</button>
            </div>

            {errors.password && (
              <span className="text-red-500 font-semibold">
                *This field is required
              </span>
            )}
          </div>
          <button
            type="submit"
            className="mt-6 bg-cyan-500 h-[48px] md:w-[250px] w-full text-slate-50 font-bold"
            disabled={isSubmitting}
          >
            {loading ? "Signing In..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
