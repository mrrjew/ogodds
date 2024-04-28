import { UserGroupIcon } from "@heroicons/react/20/solid";
import { BarChartIcon, Pencil1Icon, PlusIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { Table} from "@radix-ui/themes";
import TableRow from "../utils/tableRow";
import React, { useEffect } from "react";
import wonbet from "../../assets/wonbet.jpg";
import whatiscashout from "../../assets/whatiscashout.png";
import pending from "../../assets/pending.jpg";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit";
import { DeleteSlip, DeleteSlips, GetAllSlips} from "../../redux/slip/slip.reducer";
import { PaymentsSum } from "../../redux/payment/payment.reducer";
import { GetUsers } from "../../redux/auth/auth.reducer";
import { ArrowLeftEndOnRectangleIcon, DocumentChartBarIcon } from "@heroicons/react/24/outline";

const AdminPage: React.FC = () => {
  const { data: user }: any = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { allSlips, loading, success, error }: any = useSelector(
    (state: RootState) => state.slips
  );
  const { sum, loading: sum_loading }: any = useSelector(
    (state: RootState) => state.payment
  );
  const { users, loading: users_loading }: any = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(PaymentsSum(token)); // gets sum of payments
    dispatch(GetUsers(token)); // gets all users
    dispatch(GetAllSlips(token)); // gets all slips
  }, [dispatch, success]);


  const vip_users =
    users && users.filter((user: any) => user.vip == true)?.length;
  const casual_users =
    users && users.filter((user: any) => user.vip != true)?.length;

    const token = localStorage.getItem("token");
  const deleteSlip = async (_id: any) => {
    const confirm = window.confirm("Do you want to delete this slip?");
    const data = { token, _id };
    confirm && await dispatch(DeleteSlip(data));
    confirm && await dispatch(GetAllSlips(token)); // gets all slips
  };

  const deleteAllSlips = async () => {
    const confirm = window.confirm("Do you want to delete all slips?");
    confirm && (await dispatch(DeleteSlips(token)));
    confirm && (await dispatch(GetAllSlips(token))); // gets all slips
  }
  return (
    <>
    {user && user.admin ? (
      <div className={`max-w-7xl mx-auto w-full`}>
              <Link to="/" className="mx-4 mt-6 text-gray-900/70 font-normal flex items-center hover:underline"><ArrowLeftEndOnRectangleIcon className="w-6 h-4"/> Back Home</Link>
        {/* amount gained and current users */}
        <div className="grid grid-cols-2 sm:grid-cols-4 w-full gap-2 sm:gap-8 p-4 justify-around">
          <div className="w-full space-y-4 flex justify-between bg-yellow-100/85 items-center gap-4  rounded-2xl ring-1 ring-gray-900/5 shadow-md p-4">
            <div className="space-y-4">
              <p className="text-xl sm:text-2xl text-yellow-800/90 font-bold">
                GHS{" "}
                {sum_loading ? (
                  <p className="animate animate-pulse">Loading...</p>
                ) : sum ? (
                  sum / 100
                ) : null}
              </p>
              <h2 className="text-xl leading-7 tracking-tight text-yellow-700/80">
                Amount gained
              </h2>
            </div>

            <BarChartIcon className="w-28 h-28 text-yellow-200/10" />
          </div>

          <div className="w-full space-y-4 flex justify-between bg-cyan-100/85 items-center gap-4 rounded-2xl ring-1 ring-gray-900/5 shadow-md p-4">
            <div className="space-y-4">
              <p className="text-2xl sm:text-3xl text-cyan-800/80 font-bold">
                {users_loading ? (
                  <p className="animate animate-pulse">Loading...</p>
                ) : users && vip_users ? (
                  vip_users
                ) : 0}
              </p>
              <h2 className="text-xl leading-7 tracking-tight text-cyan-700/80">
                Vip user<span>{vip_users && vip_users == 1 ? "" : "s"}</span>
              </h2>
            </div>

            <UserGroupIcon className="w-28 h-28 text-gray-900/10" />
          </div>

          <div className="w-full space-y-4 flex justify-between bg-red-100/80 items-center gap-4 rounded-2xl ring-1 ring-gray-900/5 shadow-md p-4">
            <div className="space-y-4">
              <p className="text-2xl sm:text-3xl text-red-800/80 font-bold">
                {users_loading ? (
                  <p className="animate animate-pulse">Loading...</p>
                ) : users && casual_users ? (
                  casual_users
                ) : 0}
              </p>
              <h2 className="text-xl leading-7 tracking-tight text-red-700/80">
                Casual user
                <span>{casual_users && casual_users == 1 ? "" : "s"}</span>
              </h2>
            </div>

            <UserGroupIcon className="w-28 h-28 text-red-900/10" />
          </div>

          <div className="w-full space-y-4 flex justify-between bg-green-100/80 items-center gap-4 rounded-2xl ring-1 ring-gray-900/5 shadow-md p-4">
            <div className="space-y-4">
              <p className="text-2xl sm:text-3xl text-green-800/80 font-bold">
                {loading ? (
                  <p className="animate animate-pulse">Loading...</p>
                ) : allSlips ? (
                  allSlips?.length
                ) : 0}
              </p>
              <h2 className="text-xl leading-7 tracking-tight text-green-700/80">
                Slip
                <span>{allSlips && allSlips?.length == 1 ? "" : "s"}</span>
              </h2>
            </div>

            <DocumentChartBarIcon className="w-28 h-28 text-gray-900/10" />
          </div>
        </div>

        {/* slips */}

        <div className="">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 mb-4sm:-mb-8 mt-8">
            <h2 className="text-center sm:m-10 text-small sm:text-2xl font-bold text-gray-700/80">
              All Betting Slips
            </h2>

            <Link
              to="#"
              onClick={() => window.location.href = "/adminCreate"}
              className="flex items-center gap-2 mx-8 p-2 rounded-2xl bg-purple-100 text-purple-900/70 text-small font-semibold px-4"
            >
              Create Slip <PlusIcon className="w-4 h-auto" />{" "}
            </Link>

          </div>
          {/*container for the table */}
          <div className="flex flex-col gap-8 m-2 sm:m-4">
            <button
              onClick={() => window.location.reload()}
              className="text-gray-900/70 font-bold"
            >
              <ReloadIcon />
            </button>
            <Link
              to="#"
              onClick={deleteAllSlips}
              className={`${allSlips?.length == 0 ? "pointer-events-none opacity-[0.2]" : ""} flex items-center gap-2 mx-8 p-2 w-max rounded-2xl bg-red-100 text-red-900/70 text-small font-semibold px-4`}
            >
              Delete all <TrashIcon className="w-4 h-auto" />{" "}
            </Link>
            {success ? (
              allSlips?.map((slip: any) => {
                return (
                  <>
                    <div className={`mt-5 h-full`}>
                      <div className="w-full bg-slate-50 shadow-md rounded-md mb-8">
                        <div className={`flex`}>
                          <p className="w-full rounded-t-md  flex flex-wrap justify-between items-center bg-slate-200 text-gray-800/80 p-2 text:lg sm:text-xl font-semibold">
                            {slip.slip_title}

                            <span className="flex items-center gap-2">
                              <span>{slip.status}</span>
                              {slip.status == "WON" ? (
                                <img
                                  src={wonbet}
                                  className="w-10 h-auto rounded-lg"
                                />
                              ) : slip.status == "LOST" ? (
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
                              {/* icons */}
                              <div className="flex gap-2 ml-4">
                                <Link
                                  to={`/adminEdit?id=${slip._id}`}
                                  className="bg-red-100/10 p-2 rounded-lg flex items-center"
                                >
                                  <Pencil1Icon className="w-4 sm:w-4 h-auto" />
                                </Link>
                                <Link
                                  to=""
                                  className="bg-red-300/50 p-2 rounded-lg flex items-center"
                                >
                                  {loading ? (
                                    <p className="animate animate-pulse text-white font-medium -pt-1">
                                      ...
                                    </p>
                                  ) : (
                                    <TrashIcon
                                      className="w-4 sm:w-4 h-auto"
                                      onClick={() => deleteSlip(slip._id)}
                                    />
                                  )}
                                </Link>
                              </div>
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
                          {slip?.odds?.map((item: any) => {
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
                              {slip.booking_codes?.sporty_bet}
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <p className="text-blue-600 text-lg font-bold">
                              1XBet
                            </p>
                            <p className="bg-white rounded-md p-1 px-2 font-bold border-[1px] border-slate-300">
                              {slip.booking_codes?.onexbet}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : loading ? (
              <p className="animate animate-pulse text-lg text-red-500/80 font-medium text-center m-20">
                Loading...
              </p>
            ) : error ? (
              <p className="animate animate-pulse text-lg text-red-500/80 font-medium text-center m-20">
                Error loading slips. Refresh page
              </p>
            ) : allSlips?.length == 0 ? (
              <p className="animate animate-pulse text-lg text-red-500/80 font-medium text-center m-20">
                NO SLIPS YET
              </p>
            ) : null}
          </div>
        </div>
      </div>
      ) : <p>You are not authorized to this page</p>}
    </>
  );
};

export default AdminPage;
