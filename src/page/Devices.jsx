import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
import { BsPlus } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Spinners from "../components/ui/Spinners";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useForm } from "react-hook-form";

const tHead = [
  { head: "devices", prop: "name" },
  // { head: "macaddress", prop: "user", value: "macaddress" },
  { head: "macaddress", prop: "macaddress" },
  { head: "username", prop: "user", value: "username" },
  { head: "location", prop: "area", value: "location" },
  { head: "status", prop: "status", value: "message" },
  { head: "verified", prop: "verified" },
];

const actions = { delete: true, edit: false, verified: true };

const fields = [
  { type: "text", name: "name", label: "device", required: true },
  { type: "text", name: "user", label: "macaddress", required: false },
];

const Devices = () => {
  const [showModal, setShowModal] = useState(false);
  const [device, setDevice] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    // handleSubmit,
    watch,
    // formState: { errors },
  } = useForm({ defaultValues: { search: "" } });

  const search = watch("search");
  const toggleModel = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    setIsLoading(true);
    axiosPrivate
      .get(`/device?q=${search}`)
      .then((res) => {
        // console.log("device", res);
        setIsLoading(false);
        setDevice(res.data.data);
      })
      .catch((e) => {
        console.error(e.toString());
      });
  }, [search, axiosPrivate]);

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
        setShowModal(!showModal);
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
      <div className="flex w-full justify-between items-center my-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <HiMiniMagnifyingGlass />
              </div>
              <input
                type="text"
                id="simple-search"
                autoComplete="off"
                {...register(`search`, {
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message: "Entered value cant start/end with white spacing",
                  },
                })}
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                placeholder="Search by area"
              />
            </div>
          </form>
        </div>
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
        actions={actions}
      />
      {isLoading && (
        <div className="text-center mt-2">
          <span className="inline-block">
            <Spinners />
          </span>
        </div>
      )}
      <AnimatePresence initial={true} mode="wait">
        {showModal && (
          <Modal
            toggleModel={toggleModel}
            submitHandler={addHandler}
            title={"add device"}
            fields={fields}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Devices;
