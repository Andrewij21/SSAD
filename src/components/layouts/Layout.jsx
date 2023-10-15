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
    <div className="w-full flex">
      <motion.div
        animate={openMenu ? "expanded" : "nonexpanded"}
        variants={variants}
      >
        <Sidebar menu={openMenu} />
      </motion.div>
      <div className="w-screen">
        <Navbar action={menuHandler} />
      </div>
      <main className="min-h-screen ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
