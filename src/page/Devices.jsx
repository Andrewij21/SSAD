import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
import { BsPlus } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Spinners from "../components/ui/Spinners";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import Alert from "../components/ui/Alert";
import { tHead, actions, fields } from "../utils/_devices";

const Devices = () => {
  const [showModal, setShowModal] = useState(false);
  const [device, setDevice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ status: false, payload: null });
  const [reRender, setReRender] = useState(false);
  const [modalType, setModalType] = useState({
    title: "",
    type: "",
    detail: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {
    register,
    // handleSubmit,
    watch,
    // formState: { errors },
  } = useForm({ defaultValues: { search: "" } });
  const search = watch("search");

  // Start of devices API
  const axiosPrivate = useAxiosPrivate();
  const deleteApi = async (id) => await axiosPrivate.delete("/device/" + id);
  const createApi = async (payload) =>
    await axiosPrivate.post("/device", payload);
  const updateApi = async (payload) => {
    return await axiosPrivate.patch(
      "/device/" + payload._id,
      { ...payload, area: { location: payload.location } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  };
  const verifiedApi = async ({ payload, id }) =>
    await axiosPrivate.patch("/device/" + id, { verified: payload });
  const findDeviceApi = async (id) => await axiosPrivate.get(`/device/${id}`);
  // End of devices API

  const toggleModel = (type, title, id) => {
    if (type === "add") {
      setModalType({
        title: title,
        type: type,
      });
      setShowModal(!showModal);
    } else if (type === "edit" || type === "details") {
      let detail = {};
      findDeviceApi(id)
        .then((res) => {
          console.log("device finded", res.data.data);
          const findDevice = res.data.data;
          detail = {
            ...findDevice,
            location: findDevice.area.location,
            user: findDevice.user?._id || null,
          };

          setModalType({
            title: title,
            type: type,
            detail,
          });
          setShowModal(!showModal);
        })
        .catch((e) => {
          console.error("Device no found", e.toString());
        });
    } else {
      setShowModal(!showModal);
    }
  };

  const confrimHandler = (payload) => {
    setAlert({ status: true, payload: { id: payload } });
  };
  const removeHandler = (confirm, payload) => {
    // Set confirm model
    setAlert({ status: false });
    if (!confirm) {
      return;
    }

    // Rest of delete code
    setIsLoading(true);
    deleteApi(payload.id)
      .then((res) => {
        console.log("data dihapus", res);
        setIsLoading(false);
        setDevice((prev) => {
          return prev.filter((data) => data._id !== payload.id);
        });
      })
      .catch((e) => {
        setIsLoading(false);
        console.error(e.toString());
      });
  };
  const addHandler = (payload) => {
    setIsLoadingForm(true);
    setIsLoading(true);
    createApi(payload)
      .then((res) => {
        console.log("data ditambah", res);
        setError(null);
        setIsLoadingForm(false);
        setIsLoading(false);
        setReRender(!reRender);
        setShowModal(!showModal);
      })
      .catch((e) => {
        setIsLoadingForm(false);
        setError(e.response.data.message);
        console.error("Data gagal di tambah:", e.toString());
      });
  };
  const editHandler = (payload) => {
    setIsLoadingForm(true);
    updateApi(payload)
      .then((res) => {
        console.log("data diedit:", res);
        const data = res.data.data;
        setIsLoadingForm(false);
        setDevice((prev) => {
          const prevDataFilter = prev.filter(
            (device) => device._id !== payload._id
          );
          return [
            ...prevDataFilter,
            {
              ...data,
              verified: payload.verified,
              status: { message: "offline" },
              area: { location: payload.location },
            },
          ];
        });
        setShowModal(false);
      })
      .catch((e) => {
        setIsLoadingForm(false);
        setShowModal(false);
        console.error("Data gagal di edit:", e.toString());
      });
  };
  const verifiedHandler = (id, payload) => {
    setIsLoading(true);
    verifiedApi({ id, payload })
      .then((res) => {
        console.log("data di verified", res);
        setIsLoading(false);
        setDevice((prev) => {
          return prev.map((prev) => {
            if (prev._id === id) {
              return { ...prev, verified: payload };
            }
            return prev;
          });
        });
      })
      .catch((e) => {
        isLoading(false);
        console.error("Data gagal di verified:", e.toString());
      });
  };
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    axiosPrivate
      .get(`/device?q=${search}&page=${currentPage}&perpage=5`)
      .then((res) => {
        if (isMounted) {
          console.log("device", res);
          setIsLoading(false);
          setDevice(res.data.data);
          setTotalPages(res.data.totalPages);
        }
      })
      .catch((e) => {
        if (isMounted) {
          console.error(e.toString());
        }
      });
    return () => {
      isMounted = false;
    };
  }, [search, axiosPrivate, currentPage, reRender]);

  return (
    <div>
      <AnimatePresence initial={false} mode="wait">
        {alert.status && (
          <Alert
            type="confirm"
            msg="This action can't be undone"
            title="Are you sure?"
            handler={removeHandler}
            data={alert.payload}
          />
        )}
      </AnimatePresence>
      <h1 className="text-2xl text-sky-600 font-bold capitalize">Devices</h1>
      <div className="md:flex md:w-full w-1/2 justify-between items-center my-4 space-y-4">
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
                    message: "Entered value cant start/end with white spacing",
                  },
                })}
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                placeholder="Search by area"
              />
            </div>
          </form>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleModel("add", "add device")}
          className="flex gap-1 flex-row items-center bg-teal-400 px-4 py-2 rounded-lg hover:bg-teal-500 hover:ring-teal-400 hover:ring-2 text-white"
        >
          <BsPlus className="font-bold text-xl" />
          <span className="capitalize text-sm font-semibold">add Device</span>
        </motion.button>
      </div>
      <Table
        data={device}
        tHead={tHead}
        removeHandler={confrimHandler}
        verifiedHandler={verifiedHandler}
        infoHandler={toggleModel}
        editHandler={toggleModel}
        actions={actions}
        totalPages={totalPages}
        currentPage={currentPage}
        pageHandler={setCurrentPage}
      />
      {isLoading && (
        <div className="text-center mt-2">
          <span className="inline-block">
            <Spinners />
          </span>
        </div>
      )}
      <AnimatePresence initial={true} mode="wait">
        {showModal && (
          <Modal
            toggleModel={toggleModel}
            submitHandler={modalType.type == "add" ? addHandler : editHandler}
            title={modalType.title}
            fields={fields}
            isLoading={isLoadingForm}
            error={error}
            type={modalType.type}
            data={modalType.detail}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Devices;
