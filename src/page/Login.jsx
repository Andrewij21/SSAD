import { useForm } from "react-hook-form";
import Alert from "../components/ui/Alert";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
  });
  const nav = useNavigate();
  const [alert, isAlert] = useState("");
  const loginHandler = (data) => {
    // const { username, password } = data;
    api
      .post("/auth", data)
      .then((res) => {
        console.log({ res });
        const msg = res.data.message;
        const code = res.data.code;
        isAlert({ msg, code });
        setTimeout(() => {
          isAlert("");
        }, 3000);
        nav("/");
      })
      .catch((e) => {
        console.error(e);
        const msg = e.response.data.message;
        const code = e.response.data.code;
        isAlert({ msg, code });
        setTimeout(() => {
          isAlert("");
        }, 3000);
      });
  };
  return (
    <section className="bg-gradient-to-tl from-sky-600 to-gray-50 dark:bg-gray-900 h-screen">
      <AnimatePresence initial={false} mode="wait">
        {alert ? <Alert msg={alert.msg} code={alert.code} /> : null}
      </AnimatePresence>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          /> */}
          <span className="uppercase text-6xl font-extrabold text-sky-400">
            SSAD
          </span>
        </a>
        <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-sky-600 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(loginHandler)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  {...register("username", {
                    required: "username is required",
                    pattern: {
                      value: /^[^\s]+(?:$|.*[^\s]+$)/,
                      message:
                        "Entered value cant start/end with white spacing",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your username..."
                />
                <p className="text-pink-600 lowercase text-sm">
                  {errors.username?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value: /^[^\s]+(?:$|.*[^\s]+$)/,
                      message:
                        "Entered value cant start/end with white spacing",
                    },
                  })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <p className="text-pink-600 lowercase text-sm">
                  {errors.password?.message}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-sky-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-sky-600 hover:underline dark:text-sky-500"
                >
                  Sign up
                </a>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
