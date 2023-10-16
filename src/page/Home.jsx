import { BiSolidMicrochip, BiGroup } from "react-icons/bi";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl text-sky-800 font-bold capitalize mb-4">
        Dashboard
      </h1>
      <div className="container flex gap-8 flex-wrap">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="bg-white rounded-xl px-16 py-12 shadow-xl text-center text-4xl space-y-2 flex-1 cursor-pointer"
        >
          <BiGroup className="mx-auto fill-sky-400" />
          <div>
            <h4 className="text-2xl">0</h4>
            <h2 className="text-xl text-slate-500">Personels</h2>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="bg-white rounded-xl px-16 py-12 shadow-xl text-center text-4xl space-y-2 flex-1 cursor-pointer"
        >
          <BiGroup className="mx-auto fill-rose-400" />
          <div>
            <h4 className="text-2xl">0</h4>
            <h2 className="text-xl text-slate-500 ">Unregisted Personels</h2>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="bg-white rounded-xl px-16 py-12 shadow-xl text-center text-4xl space-y-2 flex-1 cursor-pointer"
        >
          <BiSolidMicrochip className="mx-auto fill-yellow-400" />
          <div>
            <h4 className="text-2xl">0</h4>
            <h2 className="text-xl text-slate-500">Devices</h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
