import React, { useEffect, useState } from "react";
import SelectComponent from "../components/SelectComponent";
import DateTimePicker from "react-datetime-picker";
import { InputField } from "../components/Input";
import { useFormik } from "formik";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../hooks/utilityHooks";
import { todosAsyncThunk } from "../redux/asyncThunk/Todos.async";
import { createToDoValidationSchema } from "../validator/createToDoValidationSchema";

interface CreateToDoFormProps {
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editToDoItems: string | null;
  setEditTodoItems: any;
  getAllUserTodoshandler: () => void;
}
interface Priority {
  id: number;
  priority: string;
}
export const priorities: Priority[] = [
  { id: 1, priority: "Low" },
  { id: 2, priority: "Medium" },
  { id: 3, priority: "High" },
];
export interface TodoFormData {
  title?: string;
  description?: string;
  priority?: "Low" | "Medium" | "High";
  completed: boolean;
  user?: string | undefined;
  dueDateTime?: Date;
  id?: string;
}

const CreateToDoForm: React.FC<CreateToDoFormProps> = ({
  setIsModelOpen,
  editToDoItems,
  setEditTodoItems,
  getAllUserTodoshandler,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [initialValues, setInitialValues] = useState<any>({
    title: "",
    description: "",
    priority: "Low",
    completed: false,
    user: user?.id,
    dueDateTime: new Date(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: createToDoValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      setIsDisabled(true);

      try {
        if (editToDoItems) {
          await dispatch(todosAsyncThunk.updateTodoAsyncThunk(values)).unwrap();
        } else {
          await dispatch(todosAsyncThunk.createTodoAsyncThunk(values)).unwrap();
        }
        getAllUserTodoshandler();
        setIsModelOpen(false);
      } catch (error) {
        // Handle any errors if needed
      } finally {
        setIsDisabled(false);
        setEditTodoItems(null);
      }
    },
  });

  useEffect(() => {
    if (editToDoItems) {
      setIsModelOpen(true);
      setInitialValues(editToDoItems);
    }
  }, [editToDoItems]);

  return (
   <div className="w-full" >
     <form onSubmit={formik.handleSubmit}>
      <div className="mt-5">
        <InputField
          label="Title"
          type="text"
          id="title"
          name="title"
          error={formik.errors.title}
          onChange={formik.handleChange}
          value={formik.values.title}
        />
      </div>
      <div className="mt-2">
        <label
          htmlFor="description"
          className="block text-sm mb-2 dark:text-white"
        >
          Description
        </label>
        <textarea
          className="py-2 px-4 block w-full border border-gray-200 rounded-lg text-sm outline-none"
          rows={2}
          cols={60}
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description ? (
          <span className="text-xs text-error">* Description required</span>
        ) : null}
      </div>
      <div className="mt-2">
        <SelectComponent
          value={formik.values.priority}
          id="priority"
          name="priority"
          onChange={formik.handleChange}
          title="Select Priority"
          priorities={priorities}
        />
      </div>
      <div className="mt-2">
        <label
          htmlFor="dueDateTime"
          className="block text-sm mb-2 dark:text-white"
        >
          Due Date
        </label>
        <DateTimePicker
          name="dueDateTime"
          onChange={(date) => formik.setFieldValue("dueDateTime", date)}
          value={formik.values.dueDateTime}
          minDate={new Date()} // Set minDate to the current date
          className="py-0 px-0 block w-full border border-gray-200 rounded-lg text-sm outline-none" // Add Tailwind CSS classes here
        />
      </div>
      <div className="flex gap-4 mt-4">
        <button
          type="button"
          onClick={() => setIsModelOpen(false)}
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Cancel
        </button>
        <Button
          label={editToDoItems ? "Update Todo" : "Create ToDo"}
          disabled={isDisabled}
        />
      </div>
    </form>
   </div>
  );
};

export default CreateToDoForm;
