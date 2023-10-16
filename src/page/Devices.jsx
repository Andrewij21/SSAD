import { useState } from "react";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
import { BsPlus } from "react-icons/bs";

const Devices = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModel = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <h1 className="text-2xl text-sky-800 font-bold capitalize">Devices</h1>
      <div className="flex w-full justify-end items-center my-4">
        <button
          onClick={toggleModel}
          className="flex gap-1 flex-row items-center bg-teal-400 px-4 py-2 rounded-lg hover:bg-teal-500 hover:ring-teal-400 hover:ring-2 text-white"
        >
          <BsPlus className="font-bold text-xl" />
          <span className="capitalize text-sm font-semibold">add Device</span>
        </button>
      </div>
      {showModal ? (
        <Modal toggleModel={toggleModel} title={"add device"} />
      ) : null}
      <Table />
    </div>
  );
};

export default Devices;
