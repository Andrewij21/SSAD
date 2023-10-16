import Table from "../components/ui/Table";
import { BsPlus } from "react-icons/bs";

const Devices = () => {
  return (
    <div>
      <h1 className="text-2xl text-sky-800 font-bold capitalize">Devices</h1>
      <div className="flex w-full justify-end items-center my-4">
        <button className="flex gap-1 flex-row items-center bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-500 hover:ring-sky-400 hover:ring-2 ">
          <BsPlus className="font-bold text-xl" />
          <span className="capitalize text-sm font-semibold">add Device</span>
        </button>
      </div>
      <Table />
    </div>
  );
};

export default Devices;
