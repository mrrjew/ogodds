import { Table } from "@radix-ui/themes";
import TableRow from "./utils/tableRow";
import { images } from "../assets/assets";
import wonbet from "../assets/wonbet.jpg";
import whatiscashout from "../assets/whatiscashout.png";
import pending from "../assets/pending.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { GetAllGroupedSlips } from "../redux/slip/slip.reducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Vip() {

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
  // vip slips
  const { loading, success, error, slips }: any = useSelector(
    (state: RootState) => state.slips
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(GetAllGroupedSlips(token));
  }, [token]);

  const vipSlips = slips
    .filter((item: any) => item._id == "ACTIVE")[0]
    ?.slips.filter((item: any) => item.type == "VIP");


  useEffect(() => {
    if (error) {
      toast.error("Error verifying user.", toastOptions);
      console.log(error)
    } else if (success) {
      toast.success("Vip verification successfully", toastOptions);
    }
  }, [error, success]);
  return (
    <div>
      <div>
        <p
          className={`text-2xl text-red-400 shadow-sm mt-5 mb-4 font-semibold justify-center flex`}
        ></p>
        <div
          className={`flex flex-col sm:flex-row justify-center items-center m-10 sm:m-2 p-2 gap-10 align-middle`}
        >
          {/*container for the table */}
          <div className="flex flex-col">
            <button
              onClick={() => window.location.reload()}
              className="text-gray-900/70 font-bold"
            >
              <ReloadIcon />
            </button>

            {vipSlips?.length != 0 ? (
              success ? (
                vipSlips.map((vipSlip: any) => {
                  return (
                    <>
                      <div className={`mt-5 h-full`}>
                        <div className="w-full bg-slate-50 shadow-md rounded-md mb-8">
                          <div className={`flex`}>
                            <p className="w-full rounded-t-md  flex flex-wrap justify-between items-center bg-cyan-500 text-white p-2 text-xl font-semibold">
                              {vipSlip.slip_title}

                              <span className="flex items-center gap-2">
                                <span>{vipSlip.status}</span>
                                {vipSlip.status == "WON" ? (
                                  <img
                                    src={wonbet}
                                    className="w-10 h-auto rounded-lg"
                                  />
                                ) : vipSlip.status == "LOST" ? (
                                  <img
                                    src={whatiscashout}
                                    className="w-10 h-auto rounded-lg"
                                  />
                                ) : (
                                  <img
                                    src={pending}
                                    className="w-10 h-auto rounded-lg"
                                  />
                                )}{" "}
                              </span>
                            </p>
                          </div>
                          <Table.Root>
                            <Table.Header>
                              <Table.ColumnHeaderCell>
                                League
                              </Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>
                                Teams
                              </Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>
                                Tips
                              </Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>
                                Results
                              </Table.ColumnHeaderCell>
                            </Table.Header>

                            {/* dynamically getting table rows */}
                            {vipSlip.odds.map((item: any) => {
                              return (
                                <TableRow
                                  league={item.league}
                                  teams={item.teams}
                                  tips={item.tips}
                                  result={item.result}
                                />
                              );
                            })}
                          </Table.Root>

                          {/* booking codes */}
                          <div className="flex sm:flex-row flex-col items-center gap-1 justify-around p-2">
                            <div className="flex gap-2 items-center">
                              <p className="text-red-600 text-lg font-bold">
                                SportyBet
                              </p>
                              <p className="bg-white rounded-md p-1 px-2 font-bold border-[1px] border-slate-300">
                                {vipSlip.booking_codes?.sporty_bet}
                              </p>
                            </div>
                            <div className="flex gap-2 items-center">
                              <p className="text-blue-600 text-lg font-bold">
                                1XBet
                              </p>
                              <p className="bg-white rounded-md p-1 px-2 font-bold border-[1px] border-slate-300">
                                {vipSlip.booking_codes?.onexbet}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : loading ? (
                <p className="animate animate-pulse text-lg text-red-500/80 font-medium">
                  Loading...
                </p>
              ) : error ? (
                <p className="animate animate-pulse text-lg text-red-500/80 font-medium">
                  Error loading slips. Refresh page
                </p>
              ) : null
            ) : (
              <p className="animate animate-pulse text-lg text-red-500/80 font-medium">
                NO VIP SLIP POSTED YET!
              </p>
            )}
          </div>
          <>
            <div className="flex gap-1 sm:gap-10 flex-row sm:flex-col max-w-full">
              <img
                src={images[3].src}
                className=" w-1/2 sm:w-[400px] h-auto rounded-md"
              />
              <img
                src={images[4].src}
                className=" w-1/2 sm:w-[400px] h-auto rounded-md"
              />
            </div>
          </>
        </div>
      </div>
    
    </div>
  );
}
