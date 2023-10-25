import { BiMenu, BiSolidUser, BiBell } from "react-icons/bi";
import PropTypes from "prop-types";
import { useState } from "react";

const Navbar = ({ action }) => {
  const [menu, setMenu] = useState(false);
  return (
    <nav className="bg-white shadow-md text-slate-800 dark:bg-slate-800 dark:text-slate-200 h-[8vh] flex items-center justify-between px-4">
      <button className="text-2xl" onClick={action}>
        <BiMenu />
      </button>
      <ul className="flex gap-6 text-xl">
        <li className="">
          <div className="cursor-pointer hover:bg-gray-400 hover:bg-opacity-25 rounded-full p-2">
            <BiBell />
          </div>
        </li>
        <li className="relative">
          <div
            className="cursor-pointer hover:bg-gray-400 hover:bg-opacity-25 rounded-full p-2"
            onClick={() => setMenu(!menu)}
          >
            <BiSolidUser />
          </div>
          {menu && (
            <div
              id="dropdownAvatar"
              className="z-10 absolute right-0 top-22 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
              </ul>
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  action: PropTypes.func,
};

export default Navbar;
