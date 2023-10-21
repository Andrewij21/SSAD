import { motion } from "framer-motion";

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

const Alert = () => {
  return (
    <motion.div
      className="absolute left-1/3 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <span className="font-medium">Danger alert!</span> Change a few things up
      and try submitting again.
    </motion.div>
  );
};

export default Alert;
