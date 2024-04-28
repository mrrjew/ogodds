import { Avatar, Button, Table, Theme } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { images } from "../assets/assets";
import "../styles/home.css";
import { homeStyles } from "../styles/home-styles";
import { telegram } from "../assets/assets";
import TableRow from "./utils/tableRow";
import wonbet from "../assets/wonbet.jpg";
import whatiscashout from "../assets/whatiscashout.png";
import pending from "../assets/pending.jpg"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"; 
import { ThunkDispatch } from "@reduxjs/toolkit";
import { GetAllGroupedSlips, LatestSlip } from "../redux/slip/slip.reducer";
import { ReloadIcon } from "@radix-ui/react-icons";

const Home: React.FC = () => {
  

  const { data }: any = useSelector((state: RootState) => state.auth);

  // latest slip
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    loading,
    latestSlip: pastSlip,
    slips,
  }: any = useSelector((state: RootState) => state.slips);
  const token = localStorage.getItem("token");
  useEffect(() => {
    try {
      dispatch(LatestSlip(token));
      dispatch(GetAllGroupedSlips(token));
    } catch (e) {
      console.log(`error getting latest slip: ${e}`);
    }
  }, [data]);



  //slips
  /**
   * checks if the slips is iterable when destructured
   * the slips was grouped according to the status. _id:"eg. ACTIVE", slips:[...]
   * we pick only active and free bets
   */
const freeSlips = slips && slips
  .filter((item: any) => item._id == "ACTIVE")[0]
  ?.slips.filter((item: any) => item.type != "VIP").reverse();

const Slips = [
  ...(pastSlip ? [pastSlip] : []),
  ...(Array.isArray(freeSlips) ? freeSlips : []),
];


  return (
    <>
      {/*home page section*/}

      <Theme>
        <div className={`max-w-7xl w-full mx-auto ${homeStyles.defaultBg}`}>
          {/*container for the upper content of the home page.*/}
          <div
            className={`flex flex-col bg-image relative h-[700px] w-full top-98px ${homeStyles.whiteText}`}
          >
            {/*container for the texts in the upper home page section*/}
            <div className={`relative top-60 sm:top-[40%] p-2`}>
              {/*container used to rightly organize the bg image and the texts*/}
              <div className="flex flex-col sm:flex-row">
                {/*wrapper container for the ogodds welcome text and buttons*/}
                <div>
                  <div className={`${homeStyles.textSize}`}>
                    <h1 className={`font-bold ${homeStyles.headingSize}`}>
                      Welcome to OGSOO,
                    </h1>
                    <p
                      className={`${homeStyles.wrapText} font-rubik ${homeStyles.textSize}`}
                    >
                      Your No.1 sports prediction channel, we provide you with
                      amazing and accurate bet tips and predictions.
                    </p>
                  </div>
                  {/*buttons on the upper section of the home page*/}
                  <div
                    className={`flex gap-4 sm:gap-10 relative top-10 max-md:flex max-md:flex-col`}
                  >
                    <Button
                      radius="full"
                      color="cyan"
                      className={`${homeStyles.textSize} px-2 `}
                    >
                      <Link to="/vip">JOIN VIP PAGE</Link>
                    </Button>
                    <Button
                      radius="full"
                      color="cyan"
                      className={`${homeStyles.textSize}`}
                    >
                      <Link to="https://t.me/OGODDS080">
                        <Avatar
                          src={telegram}
                          fallback="TG"
                          alt="Telegram logo"
                          className="h-20 w-auto mr-1"
                        />
                        JOIN TELEGRAM CHANNEL
                      </Link>
                    </Button>
                  </div>
                </div>
                {/*container for the background player images*/}
                <div className="hidden sm:block player-bg"></div>
              </div>
            </div>
          </div>
          {/*mid-section of the homepage*/}
          <div
            className={`flex flex-col justify-center items-center gap-5 mt-5`}
          >
            <p>
              <span
                className={`text-[#F16464] ${homeStyles.headingSize} font-bold`}
              >
                POPULAR
              </span>{" "}
              <span
                className={`font-bold text-gray-900/20 ${homeStyles.headingSize}`}
              >
                LEAGUES
              </span>
            </p>
            {/*scrolling images*/}
            <div
              className={`${homeStyles.rawFlex} flex-wrap justify-center space-x-2 sm:space-x-8 m-2 w-full mb-4`}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="flex justify-center flex-col items-center"
                >
                  <img
                    src={img.src}
                    alt={img.describe}
                    className={`rounded-md w-10 h-10 sm:w-20 sm:h-20`}
                  />
                  <p
                    className={`max-w-[20ch] text-start sm:text-base font-medium text-gray-900/80 mt-2`}
                  >
                    {img.describe}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/*bottom section of the home page*/}

          <div>
            <p
              className={`text-lg font-medium text-gray-600 mt-5 mb-4 p-4 justify-center flex`}
            >
              FREE BETTING SLIPS (LIMITED)
            </p>
            <div
              className={`flex flex-col sm:flex-row justify-center items-center p-4 pb-10 gap-10 align-middle`}
            >
              {/*container for the table in the bottom*/}
              <div className={`mt-5 h-full`}>
                {/*container for the table */}
                <div className="flex flex-col ">
                  {/* reload icon */}
                  <button
                    onClick={() => window.location.reload()}
                    className="text-gray-900/70 font-bold animate animate-pulse"
                  >
                    <ReloadIcon className="w-4 h-auto ml-4" />
                  </button>
                  {/* displaying slips even there is as atleast the pastslip or all the slips */}
                  {pastSlip?._id || slips[0]?._id ? (
                    Slips.map((slip, index:number) => {
                      return (
                        <>
                          {index == 0 ? (
                            <p className="text-red-600/80 bg-red-100/50 px-2 mx-4 sm:mx-0 mt-2 rounded-lg w-max">
                              Past {slip?.type?.toLowerCase()} slip
                            </p>
                          ) : (
                            <p className="text-cyan-600 bg-cyan-100/50 px-2 mx-4 sm:mx-0 mt-1 rounded-lg w-max">
                              Free slip
                            </p>
                          )}
                          <div key={index} className={`mt-5 w-full h-full`}>
                            <div className="w-full bg-slate-50 rounded-md mb-8 shadow-md">
                              <div className={`flex`}>
                                <p className="w-full rounded-t-md  flex-wrap flex justify-between items-center bg-cyan-500 text-white p-2 text-xl font-semibold">
                                  {slip?.slip_title}

                                  <span className="flex items-center gap-2">
                                    <span>{slip?.status}</span>
                                    {slip?.status == "WON" ? (
                                      <img
                                        src={wonbet}
                                        className="w-10 h-auto rounded-lg"
                                      />
                                    ) : slip?.status == "LOST" ? (
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
                                {slip?.odds?.map(
                                  (item: {
                                    league: any;
                                    teams: any;
                                    tips: any;
                                    result: any;
                                  }) => {
                                    return (
                                      <TableRow
                                        key={item.league}
                                        league={item.league}
                                        teams={item.teams}
                                        tips={item.tips}
                                        result={item.result}
                                      />
                                    );
                                  }
                                )}
                              </Table.Root>

                              {!data ? (
                                <div className="w-full text-center py-2 bg-200 hover:bg-cyan-500 hover:text-white rounded-b-lg">
                                  <Link
                                    to={"/signin"}
                                    className="font-medium text-base capitalize"
                                  >
                                    Sign in for more free bets codes
                                  </Link>
                                </div>
                              ) : data && !data.vip ? (
                                <div className="w-full text-center py-2 bg-200 hover:bg-cyan-500 hover:text-white rounded-b-lg">
                                  <Link
                                    to={"/vip"}
                                    className="font-medium text-base capitalize"
                                  >
                                    Become a vip to get booking codes
                                  </Link>
                                </div>
                              ) : index >= 1 ?
                              ( 
                                <div className="flex sm:flex-row flex-col items-center gap-1 justify-around p-2">
                                  <div className="flex gap-2 items-center">
                                    <p className="text-red-600 text-lg font-bold">
                                      SportyBet
                                    </p>
                                    <p className="bg-white rounded-md p-1 px-2 font-bold border-[1px] border-slate-300">
                                      {slip?.booking_codes?.sporty_bet}
                                    </p>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <p className="text-blue-600 text-lg font-bold">
                                      1XBet
                                    </p>
                                    <p className="bg-white rounded-md p-1 px-2 font-bold border-[1px] border-slate-300">
                                      {slip?.booking_codes?.onexbet}
                                    </p>
                                  </div>
                                </div>
                              ):null}
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : loading && data._id ? (
                    <p className="text-xl font-medium text-center text-red-500">
                      Loading...
                    </p>
                  ) : (
                    <p className="text-xl font-medium text-center text-red-500">
                      No slips to display
                    </p>
                  )}
                </div>
              </div>
              {/**
              side data of the home page
              * if user is logged in we display ads if not we display login and sign up buttons
              */}
              {data && data._id ? (
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
              ) : (
                <>
                  <div className={`flex flex-col gap-5`}>
                    <div
                      className={`${homeStyles.rawFlex} gap-5 flex flex-col  justify-center items-center`}
                    >
                      <p className={`max-w-[30ch] text-center`}>
                        Are you ready to make money with our
                        <span className={`text-red-500`}> authentic </span>
                        odds? If you already have an account
                      </p>
                      <div className={`${homeStyles.headerBg} rounded-full`}>
                        <Button>
                          <Link to="/signin">Login</Link>
                        </Button>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col gap-5 text-center justify-center items-center`}
                    >
                      If you are a new user and don't have an account, create
                      one
                      <div className={`${homeStyles.headerBg} rounded-full`}>
                        <Button>
                          <Link to="/register">Sign Up</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Theme>
    </>
  );
};


export default Home 