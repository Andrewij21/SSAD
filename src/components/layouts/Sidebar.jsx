import { BiSolidDashboard, BiSolidMicrochip, BiGroup } from "react-icons/bi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const menus = [
  { title: "home", icon: <BiSolidDashboard />, path: "/" },
  { title: "devices", icon: <BiSolidMicrochip />, path: "/devices" },
  { title: "personel", icon: <BiGroup />, path: "/personel" },
];

const Sidebar = ({ menu }) => {
  return (
    <div className="min-h-screen p-6 flex flex-col gap-4 bg-sky-600 text-slate-200 shadow-sm">
      <div
        className={`space-y-2 border-b-4 border-white ${
          menu ? "text-left" : "text-center"
        }`}
      >
        <span className="uppercase text-xl lg:text-2xl font-extrabold text-white ">
          SSAD
        </span>
        <h1 className={`tracking-wide pb-4 ${menu ? "text-sm" : "text-xs"}`}>
          Admin Panel
        </h1>
      </div>

      {menus.map((page, i) => {
        return (
          <Link to={page.path} key={i} className={`w-full `}>
            <motion.button
              className={`flex flex-row space-x-2 items-center text-xl rounded-r-lg focus:px-2 focus:text-slate-800 focus:bg-white cursor-pointer font-semibold w-full
              ${menu ? "justify-start" : "justify-center"} 
              `}
              whileHover={{ scale: 1.1 }}
            >
              {page.icon}
              <span className={`text-sm py-1 ${menu ? "block" : "hidden"}`}>
                {page.title}
              </span>
            </motion.button>
          </Link>
        );
      })}

      {/* <button
        className={`flex flex-row space-x-2 items-center text-xl rounded-r-lg focus:px-2 focus:text-slate-800 focus:bg-slate-200 cursor-pointer font-semibold ${
          menu ? "justify-start" : "justify-center"
        }`}
      >
        <BiSolidDashboard />
        <span className={`text-sm py-1 ${menu ? "block" : "hidden"}`}>
          Dashboard
        </span>
      </button>
      <button
        className={`flex flex-row space-x-2 items-center text-xl rounded-r-lg focus:px-2 focus:text-slate-800 focus:bg-slate-200 cursor-pointer font-semibold ${
          menu ? "justify-start" : "justify-center"
        }`}
      >
        <BiSolidMicrochip />
        <span className={`text-sm py-1 ${menu ? "block" : "hidden"}`}>
          Device
        </span>
      </button>
      <button
        className={`flex flex-row space-x-2 items-center text-xl rounded-r-lg focus:px-2 focus:text-slate-800 focus:bg-slate-200 cursor-pointer font-semibold ${
          menu ? "justify-start" : "justify-center"
        }`}
      >
        <BiGroup />
        <span className={`text-sm py-1 ${menu ? "block" : "hidden"}`}>
          Personel
        </span>
      </button>  */}
    </div>
  );
};

Sidebar.propTypes = {
  menu: PropTypes.bool,
};
export default Sidebar;
