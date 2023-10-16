import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./page/Home";
import Devices from "./page/Devices";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<Devices />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
