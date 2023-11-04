import { BiSolidMicrochip, BiGroup } from "react-icons/bi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import api from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Spinners from "../components/ui/Spinners";
import Map from "../components/ui/Maps";

const Home = () => {
  const [personelCount, setPersonelCount] = useState(0);
  const [deviceCount, setDeviceCount] = useState(0);
  const [deviceLocation, setDeviceLocation] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const cards = [
    {
      name: "personel",
      amount: personelCount || <Spinners />,
      icon: <BiGroup className="mx-auto fill-sky-400" />,
    },
    {
      name: "device",
      amount: deviceCount || <Spinners />,
      icon: <BiSolidMicrochip className="mx-auto fill-yellow-400" />,
    },
  ];
  useEffect(() => {
    axiosPrivate
      .get(`/device/count`)
      .then((res) => {
        const length = res.data.data.length;
        setDeviceCount(length);
      })
      .catch((e) => {
        const error = e.response;
        console.error({ status: error.status, msg: error.data.error });
      });
    axiosPrivate
      .get(`/user/count`)
      .then((res) => {
        const length = res.data.data.length;
        setPersonelCount(length);
      })
      .catch((e) => {
        const error = e.response;
        console.error({ status: error.status, msg: error.data.error });
      });
    axiosPrivate
      .get(`/location/device`)
      .then((res) => {
        const mark = res.data.data;
        setDeviceLocation(mark);
      })
      .catch((e) => {
        const error = e.response;
        console.error({ status: error.status, msg: error.data.error });
      });
  }, [axiosPrivate]);
  return (
    <div>
      <h1 className="text-2xl text-sky-600 font-bold capitalize mb-4">
        Dashboard
      </h1>
      <div className="container flex gap-8 flex-wrap">
        {cards.map((card, i) => {
          return (
            <motion.div
              // whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl px-16 py-12 shadow-xl text-center text-4xl space-y-2 flex-1"
              key={i}
            >
              {card.icon}
              <div>
                <h4 className="text-2xl">
                  <span className="inline-block">{card.amount}</span>
                </h4>
                <h2 className="text-xl text-slate-500">{card.name}</h2>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4">
        <Map marker={deviceLocation} />
      </div>
    </div>
  );
};

export default Home;
