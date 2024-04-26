import { useEffect, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { GetAllSlips } from "../../redux/slip/slip.reducer";
import { DropdownMenu } from "@radix-ui/themes";

const AdminEdit = () => {
  const result = [
    { id: "pending", value: "pending" },
    { id: "won", value: "won" },
    { id: "lost", value: "lost" },
  ];
  const type = [
    { id: "free", title: "FREE" },
    { id: "midnight", title: "MIDNIGHT" },
    { id: "vip", title: "VIP" },
  ];

  const status = [
    { id: "active", title: "ACTIVE" },
    { id: "won", title: "WON" },
    { id: "lost", title: "LOST" },
  ];

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const query = searchQuery.get("id"); //getting slip id from url

  const { data: user }: any = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { allSlips }: any = useSelector((state: RootState) => state.slips);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(GetAllSlips(token));
  }, []);

  // getting the slip that we want to edit and saving it in localstorage
  let currentSlip: any, slip_token: any;

  let _currentSlip = allSlips.filter((slip: any) => slip._id == query)[0];

  _currentSlip &&
    localStorage.setItem("currentSlip", JSON.stringify(_currentSlip));
  slip_token = _currentSlip && localStorage.getItem("currentSlip");
  currentSlip = slip_token && JSON.parse(slip_token);

  const navigate = useNavigate();
  user.admin == false || !user._id ? navigate("/") : null; // block non admin users from here

  const [formData, setFormData] = useState({
    slip_title: currentSlip?.slip_title,
    booking_codes: {
      sporty_bet: currentSlip?.booking_codes?.sporty_bet,
      onexbet: currentSlip?.booking_codes?.onexbet,
    },
    type: currentSlip?.type,
    status: currentSlip?.status,
  });

  const handleOnchange = (e: any) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      // For radio inputs, update the formData directly
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (
      name === "booking_codes.sporty_bet" ||
      name === "booking_codes.onexbet"
    ) {
      // If it's a booking code, don't update the formData directly
      setFormData((prev) => ({
        ...prev,
        booking_codes: {
          ...prev.booking_codes,
          [name.split(".").pop()]: value,
        },
      }));
    } else {
      // For other fields, update the formData directly
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    console.log(formData);
  };

  // const handleOddsOnchange = (e: any) => {

  // };

  // adds a new record field
  const [records, setRecords] = useState<JSX.Element[]>([]);
  const addNewRecord = () => {
    setRecords([
      ...records,
      <div className="w-full flex flex-wrap gap-2 items-center">
        <input
          type="text"
          name="league"
          placeholder="league"
          className="p-2 ring-1 ring-gray-900/5 bg-slate-50 bg-red-800 shadow-sm"
          onChange={handleOnchange}
        />
        <input
          type="text"
          name="teams"
          placeholder="teams"
          className="p-2 ring-1 ring-gray-900/5 bg-slate-50 bg-red-800 shadow-sm"
          onChange={handleOnchange}
        />
        <input
          type="text"
          name="tips"
          className="p-2 ring-1 ring-gray-900/5 bg-slate-50 bg-red-800 shadow-sm"
          onChange={handleOnchange}
        />
        {
          <>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button className="text-base font-medium text-gray-900/80 ring-1 p-2 px-2 rounded-lg ring-gray-900/10">
                  Result
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                {result.map((option) => {
                  return (
                    <DropdownMenu.Item>
                      <input
                        id={option.id}
                        type="radio"
                        name="result"
                        value={option.value}
                      />
                      <label
                        htmlFor={option.id}
                        className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                      >
                        {option.value}
                      </label>
                    </DropdownMenu.Item>
                  );
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </>
        }
      </div>,
    ]);
  };

  // submit all data
  const submitData = (e: any) => {
    e.preventDefault();
    const { slip_title, type, status, booking_codes } = formData;

    const data = {
      slip_title,
      odds: [],
      booking_codes,
      type,
      status,
    };

    console.log(data);
  };
  return (
    <div className="max-w-7xl h-max">
      <div className=" px-4 py-8 mx-auto flex flex-col sm:flex-row w-full p-1 sm:p-4 gap-4 sm:gap-8 my-8">
        <div className="flex flex-col gap-2 p-2">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">
            Update Betslip
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Once you submit slip details you will be redirected to your
            dashboard
          </p>
        </div>

        <div className="flex flex-wrap gap-8 space-y-6">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="slip_title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Slip title
            </label>
            <input
              type="text"
              name="slip_title"
              onChange={handleOnchange}
              value={formData.slip_title}
              className="ring-1 ring-gray-900/5 bg-slate-50 shadow-sm rounded-lg bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex flex-col gap-2 space-y-8 w-full">
            <label
              htmlFor="odds"
              className="flex items-center w-full justify-between text-sm font-medium leading-6 text-gray-900"
            >
              Odds
              <div
                className="bg-yellow-500/90 p-2 rounded-lg text-white shadow-sm hover:bg-"
                onClick={addNewRecord}
              >
                <PlusIcon className="cursor-pointer w-6 h-auto" />
              </div>
            </label>
            {
              records.map((_odd: any, index: any) => {
                return (
                  <>
                    <div className="w-full flex flex-wrap gap-2 items-center">
                      <input
                        type="text"
                        name="league"
                        placeholder="league"
                        className="p-2 ring-1 ring-gray-900/5 bg-slate-50 shadow-sm"
                        onChange={handleOnchange}
                      />
                      <input
                        type="text"
                        name="teams"
                        placeholder="teams"
                        className="p-2 ring-1 ring-gray-900/5 bg-slate-50 shadow-sm"
                        onChange={handleOnchange}
                      />
                      <input
                        type="text"
                        name="tips"
                        className="p-2 ring-1 ring-gray-900/5 bg-slate-50 shadow-sm"
                        onChange={handleOnchange}
                      />
                      {
                        <>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                              <button className="text-base font-medium text-gray-900/80 ring-1 p-2 px-2 rounded-lg ring-gray-900/10">
                                Result
                              </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content>
                              {result.map((option) => {
                                return (
                                  <DropdownMenu.Item>
                                    <input
                                      id={option.id}
                                      type="radio"
                                      name="result"
                                      value={option.value}
                                    />
                                    <label
                                      htmlFor={option.id}
                                      className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      {option.value}
                                    </label>
                                  </DropdownMenu.Item>
                                );
                              })}
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                        </>
                      }
                    </div>
                  </>
                );
              })
              // records.map((record, index) => (
              //   <div key={index}>{record}</div>
              // ))}
            }
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="slip_title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Booking codes
            </label>
            <input
              type="text"
              name="booking_codes.sporty_bet"
              placeholder="sportybet"
              onChange={handleOnchange}
              value={formData.booking_codes?.sporty_bet}
              className="ring-1 ring-gray-900/5 bg-slate-50 rounded-lg bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <input
              type="text"
              name="booking_codes.onexbet"
              placeholder="onexbet"
              onChange={handleOnchange}
              value={formData.booking_codes?.onexbet}
              className="ring-1 ring-gray-900/5 bg-slate-50 rounded-lg bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Bet type
            </label>
            <p className="text-sm text-gray-500">
              What type do you prefer this slip to be?
            </p>
            <fieldset className="mt-4">
              <legend className="sr-only">Slip type</legend>
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                {type.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={option.id}
                      name="type"
                      type="radio"
                      value={option.title}
                      onChange={handleOnchange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor={option.id}
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                    >
                      {option.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Bet status
            </label>
            <p className="text-sm text-gray-500">
              What status of this slip right now?
            </p>
            <fieldset className="mt-4">
              <legend className="sr-only">Slip status</legend>
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                {status.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={option.id}
                      name="status"
                      type="radio"
                      value={option.title}
                      onChange={handleOnchange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor={option.id}
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                    >
                      {option.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end px-20 h-max p">
        <button
          type="submit"
          onClick={submitData}
          className="bg-yellow-500/80 p-2 px-4 rounded-lg text-md font-medium tracking-wide text-white my-10 sm:my-20"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminEdit;
