import { useEffect, useState } from "react";
// import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
// import { BsPlus } from "react-icons/bs";
// import api from "../api/axios";
// import { AnimatePresence, motion } from "framer-motion";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// const tHead = ["username", "devices", "area", "role"];
const tHead = [
  { head: "username", prop: "username" },
  { head: "devices", prop: "devices" },
  { head: "area", prop: "area" },
  { head: "role", prop: "roles" },
];

const fields = [
  {
    type: "text",
    name: "password",
    label: "Reset password",
    required: true,
    focus: true,
  },
];

const actions = {
  delete: true,
  edit: { value: true, props: fields },
  verified: false,
};

const Personeles = () => {
  // const [showModal, setShowModal] = useState(false);
  const [device, setDevice] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const editHandler = (payload) => {
    console.log({ payload });
  };

  // const toggleModel = () => {
  //   setShowModal(!showModal);
  // };
  useEffect(() => {
    axiosPrivate
      .get("/user")
      .then((res) => {
        console.log(res);
        setDevice(res.data.data);
      })
      .catch((e) => {
        console.error(e.toString());
      });
  }, [axiosPrivate]);
  const removeHandler = (id) => {
    console.log(id);
    axiosPrivate
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
      <Table
        data={device}
        tHead={tHead}
        actions={actions}
        removeHandler={removeHandler}
        editHandler={editHandler}
        title={"Edit password"}
      />
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
