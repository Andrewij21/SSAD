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
  },
};

const Alert = ({ msg }) => {
  return (
    <motion.div
      className="absolute right-1/3 left-1/3 top-12 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <span className="font-medium">{msg}</span>
    </motion.div>
  );
};

Alert.propTypes = {
  msg: PropTypes.string,
};
export default Alert;
