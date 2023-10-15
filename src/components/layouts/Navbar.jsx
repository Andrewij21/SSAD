import { BiMenu, BiSolidUser, BiBell } from "react-icons/bi";
import PropTypes from "prop-types";

const Navbar = ({ action }) => {
  return (
    <nav className="bg-white shadow-md text-slate-800 dark:bg-slate-800 dark:text-slate-200 h-[8vh] flex items-center justify-between px-4">
      <button className="text-2xl" onClick={action}>
        <BiMenu />
      </button>
      <ul className="flex gap-6 text-xl">
        <li className="">
          {/* <span>Notification</span> */}
          <BiBell />
        </li>
        <li>
          {/* <span>Account</span> */}
          <BiSolidUser />
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  action: PropTypes.func,
};

export default Navbar;
