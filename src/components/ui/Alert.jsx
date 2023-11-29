import { motion } from "framer-motion";
import PropTypes from "prop-types";

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
      duration: 2,
    },
  },
};

const types = {
  succeed: { name: "success", color: "bg-green-50 text-green-800" },
  error: { name: "error", color: "bg-pink-50 text-red-800" },
  confirm: { name: "confirm", color: "bg-slate-50 text-black" },
};

const Alert = ({ type, msg, title, handler, data }) => {
  // const [btnValue, setBtnValue] = useState(false);
  const btnHandler = (payload) => handler(payload, data);
  return (
    <motion.div
      className={`absolute right-1/3 left-1/3 top-12 p-4 mb-4 text-sm ${types[type].color} rounded-lg dark:bg-gray-800 dark:text-red-400 z-10`}
      role="alert"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2 className="font-semibold uppercase">{title}</h2>
      <p className={`${type === "confirm" ? "text-slate-600" : ""} my-2`}>
        {msg}
      </p>
      {type === "confirm" && (
        <div className="text-right space-x-4">
          <button
            className="px-6 py-2 rounded-lg text-sm text-white bg-rose-600 hover:bg-red-500 hover:ring-2 hover:ring-rose-500"
            onClick={() => btnHandler(true)}
          >
            Ok
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm text-white bg-gray-400 hover:bg-gray-300 hover:ring-2 hover:ring-gray-300"
            onClick={() => btnHandler(false)}
          >
            Cancle
          </button>
        </div>
      )}
    </motion.div>
  );
};

Alert.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  handler: PropTypes.func,
  data: PropTypes.object,
};
export default Alert;
