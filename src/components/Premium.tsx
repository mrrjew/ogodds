import  { useEffect } from "react";
import { money } from "../assets/assets";
import Vip from "./Vip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { InitializePayment, VerifyPayment } from "../redux/payment/payment.reducer";
import { initializePayment, reset } from "../redux/payment/payment.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Premium: React.FC = () => {
 const dispatch = useDispatch<ThunkDispatch<any,any,any>>();
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


 const { data: user }:any = useSelector((state: RootState) => state.auth);
 const { loading,error, success, url,initializedPayment } = useSelector(
   (state: RootState) => state.payment
 );

 const navigate = useNavigate();
 const registerVip = async () => {
   !user._id && navigate("/signin"); // send user to login page if they haven't signed in

   await dispatch(InitializePayment(user));
   dispatch(initializePayment()); // this is an action in the payment slice that set the initializedPayment state to true
 };

 success ? (initializedPayment ? window.location.href = url : null) : error ? (reset(),toast.error("Error initializing payment. Check if email is valid",toastOptions)) : null; // navigate to payment checkout page

 // Extract the reference from the URL
 const _reference = new URLSearchParams(window.location.href);
 const reference = _reference.get("reference");

 useEffect(() => {
   // Dispatch verification action
   reference && dispatch(VerifyPayment(reference));
 },[reference])

 // check if user is a vip member
 const isVip = user.vip
  return (
    <>
      <div className={`max-w-7xl mx-auto `}>
        {isVip ? (
          <>
            <Vip />
          </>
        ) : (
          <>
            {/*premium option container*/}
            <div className="flex justify-center items-center w-full h-screen">
              {/*money bag image and amount text*/}
              <div className="flex flex-col w-full sm:w-1/3 justify-center items-center p-4 border-[0.1px] border-cyan-400/10 rounded-lg shadow-md">
                <div className="items-center flex flex-col gap-2">
                  <p className="w-full bg-gray-400 text-white p-2 rounded-lg text-white font-semibold mb-4">
                    DAILY VIP SUBSCRIPTION
                  </p>
                  <img
                    src={money}
                    alt="an image of a money container"
                    className="w-40 h-auto"
                  />
                  <p className="text-2xl font-[500] my-2 text-slate-700">
                    GHS 50
                  </p>
                </div>
                <p className="text-center my-2 text-slate-800/70 mb-2 font-[500]">
                  Our daily VIP Package is one of the best. Get premium odds
                  from OGODDS with 100% assurance. All VIP subscriptions are
                  valid until slips are won.
                </p>
                <button
                  onClick={registerVip}
                  className={`bg-cyan-500 animate p-2 rounded-lg text-white font-medium${
                    loading ? "animate-pulse" : ""
                  }`}
                >
                  {loading ? "Please wait..." : "BUY PACKAGE"}
                </button>
              </div>
            </div>
          </>
        )}
       
      </div>
    </>
  );
};

export default Premium;
