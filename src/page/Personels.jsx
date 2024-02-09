import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Spinners from "../components/ui/Spinners";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/ui/Modal";
import Alert from "../components/ui/Alert";
import { actions, fields, tHead } from "../utils/_personels";

const Personeles = () => {
  const [personels, setPersonels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ status: false, payload: null });
  const [modalType, setModalType] = useState({
    title: "",
    type: "",
    detail: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Start of user API
  const axiosPrivate = useAxiosPrivate();
  const deleteApi = async (id) => await axiosPrivate.delete("/user/" + id);
  const updateApi = async (payload) => {
    return await axiosPrivate.patch(
      "/user/" + payload._id,
      { ...payload, roles: payload.roles.toLowerCase() },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  };
  const findUserApi = async (id) => await axiosPrivate.get(`/user/${id}`);
  // End of user API

  const toggleModel = (type, title, id) => {
    if (type === "add") {
      setModalType({
        title: title,
        type: type,
      });
      setShowModal(!showModal);
    } else if (type === "edit" || type === "details") {
      let detail = {};
      findUserApi(id)
        .then((res) => {
          console.log("User finded", res);
          const findUser = res.data.data;
          detail = {
            ...findUser,
            password: "",
            options: ["user", "admin"],
          };

          setModalType({
            title: title,
            type: type,
            detail,
          });
          setShowModal(!showModal);
        })
        .catch((e) => {
          console.error("User not found", e.toString());
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
        console.log("Data berhasil dihapus", res.data.data);
        setIsLoading(false);
        setPersonels((prev) => {
          return prev.filter((data) => data._id !== payload.id);
        });
      })
      .catch((e) => {
        setIsLoading(false);
        console.error("Data gagal dihapus", e.toString());
      });
  };
  const editHandler = (payload) => {
    if (payload.password === null || payload.password.trim() === "")
      delete payload.password;

    setIsLoadingForm(true);
    updateApi(payload)
      .then((res) => {
        console.log("data diedit", res);
        const data = res.data.data;
        setIsLoadingForm(false);
        setPersonels((prev) => {
          const prevDataFilter = prev.filter(
            (personel) => personel._id !== payload._id
          );
          return [
            ...prevDataFilter,
            {
              ...data,
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

  useEffect(() => {
    setIsLoading(true);
    axiosPrivate
      .get(`/user?page=${currentPage}&perpage=5`)
      .then((res) => {
        console.log("users", res);
        setIsLoading(false);
        setPersonels(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [axiosPrivate, currentPage]);

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
      <h1 className="text-2xl text-sky-600 font-bold capitalize pb-4">
        Personels
      </h1>
      <Table
        data={personels}
        tHead={tHead}
        removeHandler={confrimHandler}
        editHandler={toggleModel}
        actions={actions}
        totalPages={totalPages}
        currentPage={currentPage}
        pageHandler={setCurrentPage}
      />
      <div className="flex justify-center mt-2">
        {isLoading && <Spinners />}
      </div>

      <AnimatePresence initial={true} mode="wait">
        {showModal && (
          <Modal
            toggleModel={toggleModel}
            submitHandler={editHandler}
            title={modalType.title}
            fields={fields}
            isLoading={isLoadingForm}
            // error={error}
            type={modalType.type}
            data={modalType.detail}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Personeles;
