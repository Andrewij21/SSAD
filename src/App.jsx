import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./page/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
