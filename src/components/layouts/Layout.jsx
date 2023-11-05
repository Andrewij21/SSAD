import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const variants = {
  expanded: { width: "20%" },
  nonexpanded: { width: "10%", minWidth: "120px" },
};
const variantsMobile = {
  expanded: { width: "20%" },
  nonexpanded: { width: "0%" },
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
        className={`hidden md:block`}
      >
        <Sidebar menu={openMenu} isMobile={false} />
      </motion.div>
      <motion.div
        // animate={openMenu ? "expanded" : "nonexpanded"}
        variants={variantsMobile}
        className={`${
          openMenu ? "left-0" : " -right-full"
        } fixed top-0 h-screen z-50 md:hidden w-36`}
      >
        <Sidebar menu={openMenu} isMobile={true} toggleMenu={menuHandler} />
      </motion.div>

      <div className="w-screen">
        <Navbar action={menuHandler} />
        <main className="px-6 py-4 min-h-[calc(100vh-64px)] bg-slate-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
