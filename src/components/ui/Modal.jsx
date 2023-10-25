import { motion } from "framer-motion";
import propTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import Backdrop from "./Backdrop";
import { useForm } from "react-hook-form";

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

const Modal = ({ toggleModel, title, submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", user: "" },
  });
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
            <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t capitalize">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button className="text-2xl" onClick={() => toggleModel()}>
                <AiOutlineClose />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form
                className="space-y-4 md:space-y-6 text-left"
                onSubmit={handleSubmit(submitHandler)}
              >
                <div>
                  <label
                    htmlFor="device"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Device
                  </label>
                  <input
                    type="text"
                    name="device"
                    id="device"
                    {...register("name", {
                      required: "device name is required",
                      pattern: {
                        value: /^[^\s]+(?:$|.*[^\s]+$)/,
                        message:
                          "Entered value cant start/end with white spacing",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="shacker-01"
                  />
                  <p className="text-pink-600 lowercase text-sm">
                    {errors.name?.message}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="macaddress"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    macaddress
                  </label>
                  <input
                    type="text"
                    name="macaddress"
                    id="macaddress"
                    {...register("user", {
                      pattern: {
                        value: /^[^\s]+(?:$|.*[^\s]+$)/,
                        message:
                          "Entered value cant start/end with white spacing",
                      },
                    })}
                    placeholder="00:B0:D0:63:C2:26"
                    className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <p className="text-pink-600 lowercase text-sm">
                    {errors.user?.message}
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    type="submit"
                    className="w-28 text-white bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 uppercase dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    submit
                  </button>
                </div>
              </form>
            </div>
            {/*footer*/}
            {/* <div className="flex items-center justify-center md:justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-emerald-400 text-white active:bg-emerald-600 font-bold uppercase text-sm md:px-6 md:py-3 py-1 px-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => toggleModel()}
              >
                Save Changes
              </button>
            </div> */}
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

Modal.propTypes = {
  toggleModel: propTypes.func,
  submitHandler: propTypes.func,
  title: propTypes.string,
};

export default Modal;
