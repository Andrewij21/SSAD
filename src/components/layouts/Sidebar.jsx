import { BiSolidDashboard, BiSolidMicrochip, BiGroup } from "react-icons/bi";
import PropTypes from "prop-types";

const menus = [
  { title: "dashboard", icon: <BiSolidDashboard /> },
  { title: "device", icon: <BiSolidMicrochip /> },
  { title: "personel", icon: <BiGroup /> },
];

const Sidebar = ({ menu }) => {
  return (
    <div className="min-h-screen p-6 flex flex-col gap-4 bg-sky-800 text-slate-200 shadow-sm">
      <div
        className={`space-y-2 border-b-4 border-white ${
          menu ? "text-left" : "text-center"
        }`}
      >
        <span className="uppercase text-xl lg:text-2xl font-extrabold text-sky-400 ">
          SSAD
        </span>
        <h1 className={`tracking-wide pb-4 ${menu ? "text-sm" : "text-xs"}`}>
          Admin Panel
        </h1>
      </div>

      {menus.map((page, i) => {
        return (
          <button
            className={`flex flex-row space-x-2 items-center text-xl rounded-r-lg focus:px-2 focus:text-slate-800 focus:bg-slate-200 cursor-pointer font-semibold ${
              menu ? "justify-start" : "justify-center"
            }`}
            key={i}
          >
            {page.icon}
            <span className={`text-sm py-1 ${menu ? "block" : "hidden"}`}>
              {page.title}
            </span>
          </button>
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
