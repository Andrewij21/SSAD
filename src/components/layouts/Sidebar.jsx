import { motion } from "framer-motion";
import { BiSolidDashboard, BiSolidMicrochip, BiGroup } from "react-icons/bi";
import PropTypes from "prop-types";
import { useEffect } from "react";

const variants = {
  expanded: { width: "20%" },
  nonexpanded: { width: "10%" },
};

const Sidebar = ({ menu }) => {
  useEffect(() => {
    console.log("masuk nilai menu", menu);
  }, [menu]);
  return (
    <motion.div
      animate={menu ? "expanded" : "nonexpanded"}
      variants={variants}
      className="max-w-xl min-h-screen p-6 flex flex-col gap-4 bg-sky-800 text-slate-200 shadow-sm"
    >
      <div
        className={`space-y-2 border-b-4 border-white ${
          menu ? "text-left" : "text-center"
        }`}
      >
        <span className="uppercase text-4xl font-extrabold text-sky-400 ">
          SSAD
        </span>
        <h1 className="tracking-wide text-sm pb-4">Admin Panel</h1>
      </div>

      <button
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
      </button>
    </motion.div>
  );
};

Sidebar.propTypes = {
  menu: PropTypes.bool,
};
export default Sidebar;
