import * as Yup from "yup"

export const TodoItemSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string()
    .oneOf(["Low", "Medium", "High"])
    .required("Priority is required"),
  completed: Yup.boolean().required("Completed status is required"),
  dueDateTime: Yup.date().required("Due date is required"),
})
