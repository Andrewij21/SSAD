import PropTypes from "prop-types";
import { useState } from "react";
import { AiFillDelete, AiOutlineMore, AiFillCheckCircle } from "react-icons/ai";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";

// const datas = [
//   { name: "Apple MacBook Pro 17", user: "user1" },
//   { name: "device2", user: "user2" },
//   { name: "device3", user: "user3" },
// ];

const Table = ({
  data,
  removeHandler,
  editHandler,
  verifiedHandler,
  tHead,
  actions,
  title,
}) => {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const toggleEdit = (id) => {
    setEdit(!edit);
    setId(id);
  };
  const editAction = (payload) => {
    editHandler(payload, id);
    setEdit();
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tHead.map((head, i) => {
              return (
                <th scope="col" className="px-6 py-3" key={i}>
                  {head.head}
                </th>
              );
            })}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr
                className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-900 even:dark:bg-gray-800 dark:border-gray-700"
                key={i}
              >
                {tHead.map((head, i) => {
                  return (
                    <td
                      scope="row"
                      key={i}
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {Array.isArray(item[head.prop])
                        ? item[head.prop].map((item, i) => {
                            return (
                              <li key={i} className="list-disc">
                                {item}
                              </li>
                            );
                          })
                        : item[head.prop] + ""}
                    </td>
                  );
                })}
                <td className="px-6 py-4 space-x-2">
                  <button
                    className={`font-medium text-xl text-rose-600 ${
                      actions.delete ? "" : "hidden"
                    }`}
                    onClick={() => removeHandler(item._id)}
                  >
                    <AiFillDelete />
                  </button>
                  <button
                    className={`font-medium text-xl text-gray-600 ${
                      actions.edit.value ? "" : "hidden"
                    }`}
                    onClick={() => toggleEdit(item._id)}
                  >
                    <AiOutlineMore />
                    {/* {edit && (
                      <div className="z-10 absolute right-20 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                        <div className="bg-gray-100 border-gray-200 rounded-lg dark:border-gray-600 dark:bg-gray-700">
                          <ul
                            className="py-2 text-xs text-gray-600 dark:text-gray-200"
                            aria-labelledby="dropdownUserAvatarButton"
                          >
                            <li>
                              <button className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                                Edit Password
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )} */}
                  </button>
                  {item.verified == true ? null : (
                    <button
                      className={`font-medium text-xl text-teal-400 dark:text-slate-200 ${
                        actions.verified ? "" : "hidden"
                      }`}
                      onClick={() => verifiedHandler(item._id, true)}
                    >
                      <AiFillCheckCircle />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AnimatePresence initial={true} mode="wait">
        {edit && (
          <Modal
            toggleModel={toggleEdit}
            submitHandler={editAction}
            title={title}
            fields={actions.edit.props}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  tHead: PropTypes.array,
  actions: PropTypes.object,
  removeHandler: PropTypes.func,
  editHandler: PropTypes.func,
  verifiedHandler: PropTypes.func,
  title: PropTypes.string,
};

export default Table;
