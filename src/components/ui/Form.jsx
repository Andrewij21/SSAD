import { useForm } from "react-hook-form";
import Spinners from "./Spinners";
import propTypes from "prop-types";

const Form = ({ submitHandler, fields, isLoading, error, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { id: data },
  });
  return (
    <form
      className="space-y-4 md:space-y-6 text-left"
      onSubmit={handleSubmit(submitHandler)}
    >
      {fields.map((field, i) => {
        return (
          <div key={i}>
            <label
              htmlFor={field.name}
              className={`mb-2 text-sm font-medium ${
                field.type == "text" ? "block" : ""
              } text-gray-900 dark:text-white`}
            >
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              {...register(`${field.name}`, {
                required: {
                  value: field.required,
                  message: field.label + " is required",
                },
                pattern: {
                  value: /^[^\s]+(?:$|.*[^\s]+$)/,
                  message: "Entered value cant start/end with white spacing",
                },
              })}
              className={`${
                field.type == "text" ? "block w-full" : "align-middle ml-2"
              } bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder={field.placeholder || ""}
            />
            <p className="text-pink-600 lowercase text-sm">
              {errors[field.name]?.message}
            </p>
          </div>
        );
      })}
      <div className="flex items-center justify-center md:justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        {isLoading ? (
          <Spinners />
        ) : error ? (
          <p className="text-pink-600 lowercase text-sm mr-4">{error}</p>
        ) : null}

        <button
          type="submit"
          className="w-28 text-white bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 uppercase dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          submit
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  submitHandler: propTypes.func,
  error: propTypes.string,
  fields: propTypes.array,
  isLoading: propTypes.bool,
  data: propTypes.string,
};

export default Form;
