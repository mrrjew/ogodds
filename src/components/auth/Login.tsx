import { useEffect, useState } from "react";
import logo from "../../assets/logo.png"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { reset } from "../../redux/auth/auth.slice";
import { toast } from "react-toastify";
import { CreateSession, GetUser, LoginUser } from "../../redux/auth/auth.reducer";
import { useNavigate } from "react-router-dom";


export default function Login() {
const navigate = useNavigate();

  const toastOptions: any = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };


  // clear token before signing new one
  localStorage.removeItem("token");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e: any) => {
    dispatch(reset());
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { error, loading, success,data}: any = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (error) {
      toast.error("Error signing in.", toastOptions);
    } else if (success) {
      toast.success("Signed in successfully", toastOptions);


      async function SignInLogic(){
        await dispatch(CreateSession(data.user))
        await dispatch(GetUser(localStorage.getItem("token")))
      }
      SignInLogic()
      !error && navigate("/"); // navigate to home page
    }
  }, [error, loading, success, navigate]);

  //submit data
  const submitData = async(e: any) => {
    e.preventDefault();
    await dispatch(LoginUser(formData))
    setFormData({
      email: "",
      password: "",
    });
    
  };
  
  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="space-y-6" method="POST" onSubmit={submitData}>
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleOnchange}
                  className="bg-slate-50 relative block w-full rounded-t-md border-0 p-1 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleOnchange}
                  className="bg-slate-50 relative block w-full rounded-b-md border-0 p-1 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm leading-6 text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={
                  `flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 animate ${loading ? "animate-pulse" : ""}`
                }
              >
                {loading ? "Please wait..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm leading-6 text-gray-500">
            Not a member?{" "}
            <a
              href="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Start a free trial
            </a>
          </p>
        </div>

      </div>
    </>
  );
}
