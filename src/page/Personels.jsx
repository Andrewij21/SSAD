import { useEffect, useState } from "react";
// import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
// import { BsPlus } from "react-icons/bs";
import api from "../api/axios";
// import { AnimatePresence, motion } from "framer-motion";

const tHead = ["username", "devices", "role"];
const Personeles = () => {
  // const [showModal, setShowModal] = useState(false);
  const [device, setDevice] = useState([]);
  // const toggleModel = () => {
  //   setShowModal(!showModal);
  // };
  useEffect(() => {
    api
      .get("/user")
      .then((res) => {
        console.log(res);
        setDevice(res.data.data);
      })
      .catch((e) => {
        console.error(e.toString());
      });
  }, []);
  const removeHandler = (id) => {
    console.log(id);
    api
      .delete("/user/" + id)
      .then((res) => {
        console.log("data dihapus", res);
        // const data = res.data.data
        setDevice((prev) => {
          return prev.filter((data) => data._id !== id);
        });
      })
      .catch((e) => {
        console.error(e.toString());
      });
  };
  // const addHandler = (payload) => {
  //   console.log("data ditambah", payload);
  //   api
  //   .post("/device",payload)
  //   .then((res) => {
  //     console.log("data ditambah", res);
  //     // const data = res.data.data
  //     // setDevice((prev) => {
  //     //   return prev.filter((data) => data._id !== id);
  //     // });
  //   })
  //   .catch((e) => {
  //     console.error(e.toString());
  //   });
  // };

  return (
    <div>
      <h1 className="text-2xl text-sky-600 font-bold capitalize">Personels</h1>
      <div className="flex w-full justify-end items-center my-4">
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleModel}
          className="flex gap-1 flex-row items-center bg-teal-400 px-4 py-2 rounded-lg hover:bg-teal-500 hover:ring-teal-400 hover:ring-2 text-white"
        >
          <BsPlus className="font-bold text-xl" />
          <span className="capitalize text-sm font-semibold">add Personel</span>
        </motion.button> */}
      </div>
      <Table data={device} tHead={tHead} removeHandler={removeHandler} />
      {/* <AnimatePresence initial={true} mode="wait">
        {showModal && (
          <Modal
            toggleModel={toggleModel}
            addHandler={addHandler}
            title={"add personel"}
          />
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default Personeles;
