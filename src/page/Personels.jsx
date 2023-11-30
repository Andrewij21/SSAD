import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Spinners from "../components/ui/Spinners";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/ui/Modal";

const tHead = [
  { head: "username", prop: "username" },
  { head: "devices", prop: "devices", value: "name" },
  // { head: "area", prop: "area", value: "location" },
  { head: "role", prop: "roles" },
];

const fields = [
  {
    type: "text",
    name: "password",
    label: "Reset password",
    required: false,
    focus: true,
    placeholder: "insert new password",
  },
  {
    type: "text",
    name: "username",
    label: "username",
    required: true,
    placeholder: "insert username",
  },
  {
    type: "text",
    name: "roles",
    label: "user role",
    required: true,
    placeholder: "insert user role",
  },
];

const actions = {
  delete: true,
  edit: { value: true, props: fields },
  verified: false,
};

const Personeles = () => {
  const [personels, setPersonels] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [error, setError] = useState(null);
  const [modalType, setModalType] = useState({
    title: "",
    type: "",
    detail: "",
  });

  const editHandler = (payload) => {
    console.log("data di edit", {
      ...payload,
    });

    // PASSWORD TIDAK BOLEH KOSONG JIKA KOSONG HAPUS PROPS NYA
    if (payload.password === null || payload.password.trim() === "")
      delete payload.password;
    console.log("data di edit sesudah", {
      ...payload,
    });
    setIsLoadingForm(true);
    axiosPrivate
      .patch(
        "/user/" + payload._id,
        { ...payload },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("data diedit", res);
        setIsLoadingForm(false);
        setShowModal(false);
        // const data = res.data.data
      })
      .catch((e) => {
        setIsLoadingForm(false);
        setShowModal(false);
        console.error(e.toString());
      });
  };
  const removeHandler = (id) => {
    console.log(id);
    setIsLoading(true);
    axiosPrivate
      .delete("/user/" + id)
      .then((res) => {
        console.log("data dihapus", res);
        // const data = res.data.data
        setIsLoading(false);
        setPersonels((prev) => {
          return prev.filter((data) => data._id !== id);
        });
      })
      .catch((e) => {
        setIsLoading(false);
        console.error(e.toString());
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axiosPrivate
      .get(`/user`)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setPersonels(res.data.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [axiosPrivate]);

  const toggleModel = (type, title, id) => {
    let detail;
    if (type === "edit") {
      const findPersonel = personels.filter(
        (personel) => personel._id === id
      )[0];
      detail = {
        ...findPersonel,
        // location: findDevice.area.location,
        // user: findDevice.user?._id || null,
      };
    } else {
      detail = { id: id };
    }

    setModalType({
      title: title,
      type: type,
      detail,
    });
    setShowModal(!showModal);
  };

  return (
    <div>
      <h1 className="text-2xl text-sky-600 font-bold capitalize pb-4">
        Personels
      </h1>
      <Table
        data={personels}
        tHead={tHead}
        actions={actions}
        removeHandler={removeHandler}
        editHandler={toggleModel}
        // title={"Edit password"}
        isLoading={isLoadingForm}
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
