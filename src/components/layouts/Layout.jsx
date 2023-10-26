import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const variants = {
  expanded: { width: "20%" },
  nonexpanded: { width: "10%" },
};

const Layout = () => {
  const [openMenu, setOpenmenu] = useState(false);
  const menuHandler = () => {
    setOpenmenu(!openMenu);
  };

  return (
    <div className="w-full flex min-h-screen">
      <motion.div
        animate={openMenu ? "expanded" : "nonexpanded"}
        variants={variants}
        className={`${openMenu ? "w-[20%]" : "w-[10%]"} hidden md:block`}
      >
        <Sidebar menu={openMenu} />
      </motion.div>
      <div className="w-screen">
        <Navbar action={menuHandler} />
        <main className="px-6 py-4 bg-slate-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
