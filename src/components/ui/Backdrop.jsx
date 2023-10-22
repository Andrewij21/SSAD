import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 h-full w-screen bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

Backdrop.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};
export default Backdrop;
