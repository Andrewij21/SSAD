import { BiMenu, BiSolidUser, BiBell } from "react-icons/bi";
import PropTypes from "prop-types";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const Navbar = ({ action }) => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md text-slate-800 dark:bg-slate-800 dark:text-slate-200 h-[8vh] flex items-center justify-between px-4">
      <button className="text-2xl" onClick={action}>
        <BiMenu />
      </button>
      <ul className="flex text-xl">
        <li className="">
          <div className="cursor-pointer hover:bg-gray-400 hover:bg-opacity-25 rounded-full p-2">
            <BiBell />
          </div>
        </li>
        <li className="">
          <div className="p-2 text-sm text-gray-900 dark:text-white">
            <div className="font-medium truncate">{auth.username}</div>
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
              className="z-10 absolute right-0 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                {/* <li>
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
                </li> */}
              </ul>
              <div className="py-2 px-4 text-center">
                <button
                  className="block px-4 py-2 text-sm rounded-lg w-full bg-rose-600 text-white hover:bg-rose-700 dark:hover:bg-rose-700 dark:text-white dark:bg-rose-600"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
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
