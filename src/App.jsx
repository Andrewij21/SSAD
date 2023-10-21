import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./page/Home";
import Devices from "./page/Devices";
import Personeles from "./page/Personels";
import Login from "./page/Login";
import RequireAuth from "./page/RequireAuth";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/personel" element={<Personeles />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
