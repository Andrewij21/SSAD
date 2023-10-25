import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
import { BsPlus } from "react-icons/bs";
// import api from "../api/axios";
import { AnimatePresence, motion } from "framer-motion";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// const tHead = ["devices", "macaddress", "verified"];
const tHead = [
  { head: "devices", prop: "name" },
  { head: "macaddress", prop: "user" },
  { head: "status", prop: "status" },
  { head: "verified", prop: "verified" },
];
const Devices = () => {
  const [showModal, setShowModal] = useState(false);
  const [device, setDevice] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const toggleModel = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    axiosPrivate
      .get("/device")
      .then((res) => {
        // console.log(res);
        setDevice(res.data.data);
      })
      .catch((e) => {
        console.error(e.toString());
      });
  }, [axiosPrivate]);

  const removeHandler = (id) => {
    console.log(id);
    axiosPrivate
      .delete("/device/" + id)
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
  const addHandler = (payload) => {
    // console.log("data ditambah", payload);
    axiosPrivate
      .post("/device", payload)
      .then((res) => {
        console.log("data ditambah", res);
        const data = res.data.data;
        console.log(data);
        setDevice((prev) => {
          return [...prev, { ...data, verified: false, status: false }];
        });
      })
      .catch((e) => {
        console.error(e.toString());
      });
  };

  const verifiedHandler = (id, payload) => {
    console.log("pauload", payload);
    axiosPrivate
      .patch("/device/" + id, { verified: payload })
      .then((res) => {
        console.log("data di verified", res);
        setDevice((prev) => {
          return prev.map((prev) => {
            if (prev._id === id) {
              return { ...prev, verified: payload };
            }
            return prev;
          });
        });
      })
      .catch((e) => {
        console.error(e.toString());
      });
  };
  return (
    <div>
      <h1 className="text-2xl text-sky-600 font-bold capitalize">Devices</h1>
      <div className="flex w-full justify-end items-center my-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleModel}
          className="flex gap-1 flex-row items-center bg-teal-400 px-4 py-2 rounded-lg hover:bg-teal-500 hover:ring-teal-400 hover:ring-2 text-white"
        >
          <BsPlus className="font-bold text-xl" />
          <span className="capitalize text-sm font-semibold">add Device</span>
        </motion.button>
      </div>
      <Table
        data={device}
        tHead={tHead}
        removeHandler={removeHandler}
        verifiedHandler={verifiedHandler}
      />
      <AnimatePresence initial={true} mode="wait">
        {showModal && (
          <Modal
            toggleModel={toggleModel}
            submitHandler={addHandler}
            title={"add device"}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Devices;
