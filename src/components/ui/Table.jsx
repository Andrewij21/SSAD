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
  totalPages,
  currentPage,
}) => {
  return (
    <div className="overflow-x-auto">
      <div className=" shadow-md sm:rounded-lg overflow-clip min-w-[600px] mb-2">
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
                            ? item[head.prop].length == 0
                              ? "-"
                              : item[head.prop].map((item, i) => {
                                  return (
                                    <li key={i} className="list-disc">
                                      {item[head.value] || item}
                                    </li>
                                  );
                                })
                            : typeof item[head.prop] == "object" &&
                              item[head.prop] !== null
                            ? item[head.prop][head.value]
                            : item[head.prop]?.length == 0 ||
                              item[head.prop] == null
                            ? "-"
                            : item[head.prop] + ""
                          // ? item[head.prop]
                          // : ""}
                        }
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 w-36">
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

                    <button
                      className={`font-medium text-xl text-yellow-400 ${
                        actions.detail ? "" : "hidden"
                      }`}
                      onClick={() =>
                        infoHandler("details", "details", item._id)
                      }
                    >
                      <AiFillInfoCircle />
                    </button>
                    <button
                      className={`font-medium text-xl text-rose-600 ${
                        actions.delete ? "" : "hidden"
                      }`}
                      onClick={() => removeHandler(item._id)}
                    >
                      <AiFillDelete />
                    </button>
                    <button
                      className={`font-medium text-lg text-white bg-gray-400 rounded-full ${
                        actions.edit.value ? "" : "hidden"
                      }`}
                      onClick={() => editHandler("edit", "Edit", item._id)}
                    >
                      <AiOutlineMore />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example" className="md:flex justify-end">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          {[...Array(totalPages)].map((page, i) => {
            i++;
            return (
              <li key={i}>
                <span
                  className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 ${
                    i === currentPage ? "bg-blue-50 " : "bg-white "
                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {i}
                </span>
              </li>
            );
          })}
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
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
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
};

export default Table;
