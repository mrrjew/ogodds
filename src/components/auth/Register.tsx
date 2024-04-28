import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { CreateSession, GetUser, RegisterUser } from "../../redux/auth/auth.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { reset } from "../../redux/auth/auth.slice";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { generate } from "shortid";

export default function Register() {
  // clear token before 
  localStorage.removeItem("token");

const navigate = useNavigate();

  const toastOptions: any = {
    position: "top-right",
    toastId: generate(),
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
});

const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
  dispatch(reset());
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

const { error, loading, success, data }: any = useSelector(
  (state: RootState) => state.auth
);

useEffect(() => {
   if (error) {
     toast.error("Error signing up.", toastOptions);
   } else if (success) {
    async function SignInLogic() {
      await dispatch(CreateSession(data.user));
      await dispatch(GetUser(localStorage.getItem("token")));
    }
    SignInLogic();
     toast.success("Signed up successfully", toastOptions);
     !error && navigate("/"); // navigate to home page
   }
}, [error, loading, success, navigate]);

const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  await dispatch(RegisterUser(formData));
  setFormData({
    username: "",
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
              Create an account
            </h2>
          </div>
          <form className="space-y-6" onSubmit={submitData} method="POST">
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleOnchange}
                  className="bg-slate-50 p-1 px-2 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Username"
                />
              </div>
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
                  value={formData.email}
                  onChange={handleOnchange}
                  className="bg-slate-50 p-1 px-2 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  value={formData.password}
                  onChange={handleOnchange}
                  className="bg-slate-50 p-1 px-2 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 animate ${
                  loading ? "animate-pulse" : ""
                }`}
              >
                {loading ? "Please wait..." : "Sign up"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm leading-6 text-gray-500">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </a>
          </p>
        </div>

     
      </div>
    </>
  );
}
