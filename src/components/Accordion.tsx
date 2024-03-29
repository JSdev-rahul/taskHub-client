import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion"
import { deleteSVGIcon, downSignSVGIcon, editSvgIcon } from "../assets"
import { useAppDispatch } from "../hooks/utilityHooks"
import { todosAsyncThunk } from "../redux/asyncThunk/Todos.async"
import { iToDoPageData } from "../utils/interfaces"
import SVGImage from "./SvgRender"

export interface TodoItem {
  _id: string
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  completed: boolean
  createdAt: string // Assuming it's a string representing a date/time
  dueDateTime: string // Assuming it's a string representing a date/time
}

interface Props {
  todos: TodoItem[] | null
  deleteToDoHandler: (id: string) => void
  setEditTodoItems: any
  getAllUserTodoshandler: () => void
  pageData: iToDoPageData
}

const AccordionComponent: React.FC<Props> = ({
  todos,
  deleteToDoHandler,
  setEditTodoItems,
  getAllUserTodoshandler,
  pageData,
}) => {
  const dispatch = useAppDispatch()

  const AccordionItem = ({ index, header, id, item, ...rest }: any) => (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          <div className="flex justify-between w-full items-center">
            <div className="cursor-pointer">
              {/* <div className="flex"> */}
              <input
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(
                    todosAsyncThunk.updateTodoAsyncThunk({
                      _id: id,
                      completed: item.completed ? false : true,
                    })
                  )
                    .unwrap()
                    .then(() => {
                      getAllUserTodoshandler()
                    })
                    .catch(() => {})
                }}
                type="checkbox"
                className="shrink-0 mt-0.5 mr-2 p-2 cursor-pointer border-gray-200 rounded text-blue-600  "
                id="hs-default-checkbox"
              />
              {/* </div> */}
              {index}. {header}
            </div>
            <div className="flex justify-center items-center mr-4 gap-x-1">
              <span
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="shadow-lg inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-[#3652AD] text-white"
              >
                {item.priority}
              </span>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  deleteToDoHandler(id)
                }}
              >
                <SVGImage src={deleteSVGIcon} title="deleteIcon" />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  setEditTodoItems(item)
                  // Handle edit action here
                }}
              >
                <SVGImage src={editSvgIcon} title="editIcon" />
              </div>

              <img
                loading="lazy"
                className={`text-slate-50 transition-transform duration-200 ease-out ${
                  isEnter && "rotate-180"
                }`}
                src={downSignSVGIcon}
                alt="Chevron"
              />
            </div>
          </div>
        </>
      )}
      className=""
      buttonProps={{
        className: ({ isEnter }) =>
          `flex md:w-full shadow-2xl w-[96%] p-3 m-2 rounded-lg ${
            pageData.completed ? "bg-[#597E52]" : "bg-primary"
          } text-left ${isEnter && ""}`,
      }}
      contentProps={{
        className:
          "transition-height duration-200 bg-[#FFF7F1] m-1 mx-[15px] shadow-lg rounded ease-out",
      }}
      panelProps={{ className: "p-5" }}
    />
  )

  return (
    <div className="md:mx-80 my-4 text-slate-50 ">
      <Accordion>
        {todos ? (
          todos?.map((item: TodoItem, index: number) => (
            <AccordionItem
              key={item._id}
              header={item.title}
              index={index + 1}
              id={item._id}
              item={item}
            >
              <div className="text-sm text-slate-900">{item.description}</div>
            </AccordionItem>
          ))
        ) : (
          <p>No todos to display</p>
        )}
      </Accordion>
    </div>
  )
}

export default AccordionComponent
