import { Fragment, useEffect} from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { logo } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store"; 
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { GetUser } from "../../redux/auth/auth.reducer";


export default function Navbar() {
  const { data }: any = useSelector((state: RootState) => state.auth);

  // check if user is logged in

  //user
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          await dispatch(GetUser(token));
        }
      } catch (e) {
        console.log(e);
        throw new Error("error creating session");
      }
    };

    fetchData();
  }, []);

  const user = {
    name: data && data?.username,
    email: data && data?.email,
  };

  // navigation
  const path = useLocation().pathname;
  const navigation = [
    { name: "HOME", href: "/", current: path == "/" ? true : false },
    { name: "VIP", href: "/vip", current: path == "/vip" ? true : false },
    { name: "ABOUT", href: "/about", current: path == "/about" ? true : false },
    {
      name: "CONTACT",
      href: "/contact",
      current: path == "/contact" ? true : false,
    },
  ];
  const userNavigation: { name: string; href: string }[] = [];
  if (data && data?.isAdmin) {
    userNavigation.push({ name: "Admin dashboard", href: "/admin" });
  }
  userNavigation.push({ name: "Sign out", href: "/signin" });

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-slate-100 p-1 font-rubik">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center justify-center">
                  <img
                    className="h-14 w-auto rounded-full"
                    src={logo}
                    alt="Your Company"
                  />
                  <p
                    className={classNames(
                      "block text-gray-900 ml-2 text-lg sm:text-xl font-[500]"
                    )}
                  >
                    OGSOO
                  </p>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-200 text-white"
                          : "text-gray-900/70 hover:bg-gray-200 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  {data && data._id ? (
                    <>
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex p-1 rounded-full bg-gray-800/60 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <div className="h-8 w-8 rounded-full pt-[0.8px] text-lg text-center font-[500] text-white capitalize">
                              {data && data?.username?.charAt(0)}
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-300" : "",
                                      "block px-4 py-2 text-sm text-gray-900/70"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-4 items-center">
                        <Link
                          to={"/signin"}
                          className="rounded-md p-1 font-[500] text-white bg-gray-200 px-4"
                        >
                          LOG IN
                        </Link>
                        <Link
                          to={"/register"}
                          className="rounded-md p-1 font-[500] text-slate-50 bg-cyan-500 px-4"
                        >
                          SIGN UP
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-200 text-gray-900/70"
                      : "text-gray-900/70 hover:bg-gray-200 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-800/5 pb-3 pt-4">
              {/* checking to see if user is logged in or not */}

              {data && data._id ? (
                <>
                  <div className="flex items-center px-5 sm:px-6">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 pt-[4.9px] rounded-full bg-gray-400 text-xl text-center font-[500] text-white capitalize">
                        {data && data?.username?.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-900/70">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-900/70">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2 sm:px-3">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900/70 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4 items-center">
                    <a
                      href={"/signin"}
                      className="rounded-md p-1 font-[500] text-white bg-gray-200 px-4"
                    >
                      LOG IN
                    </a>
                    <a
                      href={"/register"}
                      className="rounded-md p-1 font-[500] text-slate-50 bg-cyan-500 px-4"
                    >
                      SIGN UP
                    </a>
                  </div>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}


