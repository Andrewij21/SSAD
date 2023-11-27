import { motion } from "framer-motion";
import propTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import Backdrop from "./Backdrop";
import Form from "./Form";
import Details from "./Details";

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

const Modal = ({
  toggleModel,
  title,
  submitHandler,
  fields,
  isLoading,
  error,
  type,
  data,
}) => {
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
            <div className="relative px-6 py-4 flex-auto">
              {type === "form" ? (
                <Form
                  submitHandler={submitHandler}
                  fields={fields}
                  isLoading={isLoading}
                  data={data}
                  error={error}
                />
              ) : (
                <Details data={data} />
              )}
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
  submitHandler: propTypes.func,
  fields: propTypes.array,
  isLoading: propTypes.bool,
  error: propTypes.string,
  type: propTypes.string,
  data: propTypes.any,
};

export default Modal;
