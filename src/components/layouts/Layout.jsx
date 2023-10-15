import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [openMenu, setOpenmenu] = useState(false);
  const menuHandler = () => {
    setOpenmenu(!openMenu);
  };
  useEffect(() => {
    console.log(openMenu);
  }, [openMenu]);
  return (
    <div className="w-full flex">
      <Sidebar menu={openMenu} />
      <Navbar action={menuHandler} />
      <main className="min-h-screen ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
