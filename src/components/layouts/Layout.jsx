import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const variants = {
  expanded: { width: "20%", minWidth: "150px" },
  nonexpanded: { width: "10%" },
};
const variantsMobile = {
  expanded: { x: 0, opacity: 1 },
  nonexpanded: { x: "-100%" },
};

const Layout = () => {
  const [openMenu, setOpenmenu] = useState(false);
  const menuHandler = () => {
    setOpenmenu(!openMenu);
  };

  return (
    <div className="w-full flex min-h-screen overflow-hidden">
      <motion.div
        animate={openMenu ? "expanded" : "nonexpanded"}
        variants={variants}
        className={`hidden -left-full fixed md:static md:block min-w-[120px]`}
      >
        <Sidebar menu={openMenu} isMobile={false} />
      </motion.div>
      <motion.div
        animate={openMenu ? "expanded" : "nonexpanded"}
        initial={{ x: "-100%", opacity: 0 }}
        variants={variantsMobile}
        transition={{ ease: "easeInOut" }}
        className={`fixed top-0 h-screen z-50 md:hidden w-40`}
      >
        <Sidebar menu={openMenu} isMobile={true} toggleMenu={menuHandler} />
      </motion.div>

      <div className="w-full overflow-x-auto">
        <Navbar action={menuHandler} />
        <main className="px-6 py-4 min-h-[calc(100vh-45px)] bg-slate-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
