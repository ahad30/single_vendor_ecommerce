import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import {
  IoLogIn,
  IoLogInOutline,
  IoPersonOutline,
  IoPersonSharp,
} from "react-icons/io5";
import { useAppDispatch } from "../../Redux/hook";
import { useLogoutMutation } from "../../Redux/Feature/auth/authApi";
import { logout } from "../../Redux/Feature/auth/authSlice";

const Dropdown = () => {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutMutation();
  const handleLogout = () => {
    logoutUser(undefined);
    dispatch(logout());
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <div className="flex justify-center  items-center gap-x-3">
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none
                z-10"
        >
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-green" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <IoPersonSharp className="mx-2  text-green" />
                  ) : (
                    <IoPersonOutline className="mx-2 text-green" />
                  )}
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleLogout()}
                  className={`${
                    active ? "bg-violet-500 text-green" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <IoLogIn className="mx-2  text-green" />
                  ) : (
                    <IoLogInOutline className="mx-2 text-green" />
                  )}
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
