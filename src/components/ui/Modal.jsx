import { motion } from "framer-motion";
import propTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import Backdrop from "./Backdrop";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 100,
      stiffness: 500,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

const Modal = ({ toggleModel, title }) => {
  return (
    <Backdrop onClick={toggleModel}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="justify-center items-center flex w-clamp flex-col px-8"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col min-w-[300px] md:w-[500px] bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Device</h3>
              <button className="text-2xl" onClick={() => toggleModel()}>
                <AiOutlineClose />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form>
                <div className="gap-6 mb-6 flex flex-col">
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {title}
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none "
                      placeholder="Shacker"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      User
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none "
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center md:justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-emerald-400 text-white active:bg-emerald-600 font-bold uppercase text-sm md:px-6 md:py-3 py-1 px-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => toggleModel()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

Modal.propTypes = {
  toggleModel: propTypes.func,
  title: propTypes.string,
};

export default Modal;
