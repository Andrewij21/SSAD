import PropTypes from "prop-types";
import {
  AiFillDelete,
  AiOutlineMore,
  AiFillCheckCircle,
  AiFillInfoCircle,
} from "react-icons/ai";
const Table = ({
  data,
  removeHandler,
  editHandler,
  verifiedHandler,
  infoHandler,
  tHead,
  actions,
}) => {
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
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white max-w-sm"
                    >
                      {
                        Array.isArray(item[head.prop])
                          ? item[head.prop].map((item, i) => {
                              return (
                                <li key={i} className="list-disc">
                                  {item[head.value] || item}
                                </li>
                              );
                            })
                          : typeof item[head.prop] == "object" &&
                            item[head.prop] !== null
                          ? item[head.prop][head.value]
                          : item[head.prop] == null
                          ? "-"
                          : item[head.prop] + ""
                        // ? item[head.prop]
                        // : ""}
                      }
                    </td>
                  );
                })}
                <td className="px-6 py-4">
                  <button
                    className={`font-medium text-xl text-rose-600 ${
                      actions.delete ? "" : "hidden"
                    }`}
                    onClick={() => removeHandler(item._id)}
                  >
                    <AiFillDelete />
                  </button>
                  <button
                    className={`font-medium text-xl text-yellow-400 ${
                      actions.detail ? "" : "hidden"
                    }`}
                    onClick={() => infoHandler("details", "details", item._id)}
                  >
                    <AiFillInfoCircle />
                  </button>
                  <button
                    className={`font-medium text-xl text-gray-600 ${
                      actions.edit.value ? "" : "hidden"
                    }`}
                    onClick={() =>
                      editHandler("form", "Reset password", item._id)
                    }
                  >
                    <AiOutlineMore />
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
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.any,
  tHead: PropTypes.array,
  actions: PropTypes.object,
  removeHandler: PropTypes.func,
  editHandler: PropTypes.func,
  verifiedHandler: PropTypes.func,
  infoHandler: PropTypes.func,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Table;
