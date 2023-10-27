import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
// import { AiFillFilter, AiFillCaretDown } from "react-icons/ai";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";
import Spinners from "../components/ui/Spinners";

// const tHead = ["username", "devices", "area", "role"];
const tHead = [
  { head: "username", prop: "username" },
  { head: "devices", prop: "devices" },
  { head: "area", prop: "area", value: "location" },
  { head: "role", prop: "roles" },
];

const fields = [
  {
    type: "text",
    name: "password",
    label: "Reset password",
    required: true,
    focus: true,
  },
];

const actions = {
  delete: true,
  edit: { value: true, props: fields },
  verified: false,
};

const Personeles = () => {
  const [device, setDevice] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    // handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { search: "" } });

  const search = watch("search");

  const editHandler = (payload, id) => {
    console.log({ payload, id });
    axiosPrivate
      .patch("/user/reset-password/" + id, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log("data diedit", res);
        // const data = res.data.data
      })
      .catch((e) => {
        console.error(e.toString());
      });
  };
  const removeHandler = (id) => {
    console.log(id);
    axiosPrivate
      .delete("/user/" + id)
      .then((res) => {
        console.log("data dihapus", res);
        // const data = res.data.data
        setDevice((prev) => {
          return prev.filter((data) => data._id !== id);
        });
      })
      .catch((e) => {
        console.error(e.toString());
      });
  };

  useEffect(() => {
    console.log(search);
    setIsLoading(true);
    axiosPrivate
      .get(`/search?q=${search}`)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setDevice(res.data.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [search, axiosPrivate]);

  return (
    <div>
      <h1 className="text-2xl text-sky-600 font-bold capitalize">Personels</h1>
      <div className="flex w-full justify-end items-center my-4"></div>
      <div className="dark:bg-gray-800 relative sm:rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-start space-y-3 md:space-y-0 md:space-x-4 py-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <HiMiniMagnifyingGlass />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  autoComplete="off"
                  {...register(`search`, {
                    pattern: {
                      value: /^[^\s]+(?:$|.*[^\s]+$)/,
                      message:
                        "Entered value cant start/end with white spacing",
                    },
                  })}
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                  placeholder="Search by area"
                />
                <p className="text-pink-600 lowercase text-sm">
                  {errors.search?.message}
                </p>
              </div>
            </form>
          </div>
          {isLoading && <Spinners />}
          {/* <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium space-x-3 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                type="button"
                onClick={() => setMenu(!menu)}
              >
                <AiFillFilter />
                Filter
                <AiFillCaretDown />
              </button>
              {menu && (
                <div
                  id="filterDropdown"
                  className="w-48 p-3 absolute right-0 top-16 bg-white rounded-lg shadow"
                >
                  <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Choose brand
                  </h6>
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="filterDropdownButton"
                  >
                    <li className="flex items-center">
                      <input
                        id="apple"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="apple"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Apple (56)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="fitbit"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="fitbit"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Microsoft (16)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="razor"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="razor"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Razor (49)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="nikon"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="nikon"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Nikon (12)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="benq"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="benq"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        BenQ (74)
                      </label>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
      <Table
        data={device}
        tHead={tHead}
        actions={actions}
        removeHandler={removeHandler}
        editHandler={editHandler}
        title={"Edit password"}
      />
    </div>
  );
};

export default Personeles;
