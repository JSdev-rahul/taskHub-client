import React, { useEffect, useState } from "react"
import { todosAsyncThunk } from "../redux/asyncThunk/Todos.async"
import { useAppDispatch, useAppSelector } from "../hooks/utilityHooks"
import Tabs from "../components/Tabs"
import AccordionComponent from "../components/Accordion"
import ModelComponent from "../components/ModelComponent"
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-calendar/dist/Calendar.css"
import "react-clock/dist/Clock.css"
import CreateToDoForm from "./CreateToDoForm"
import SelectComponent from "../components/SelectComponent"
import ResponsivePagination from "react-responsive-pagination"
import "react-responsive-pagination/themes/classic.css"
import SearchBoxComponent from "../components/SearchBox"
import { FILTER_PRIORITY, TABS } from "../utils"

export interface ToDoListPageData {
  page: number
  limit: number
  q: string
  priority: string
  completed: boolean
  id: string
}

const Home = () => {
  const [editToDoItems, setEditTodoItems] = useState<string | null>(null)
  const { allToDos, count } = useAppSelector((state) => state.todos)
  const { user } = useAppSelector((state) => state.auth)
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<number>(0)
  const dispatch = useAppDispatch()
  const [pageData, setPageData] = useState<ToDoListPageData>({
    page: 1,
    limit: 5,
    q: "",
    priority: "",
    completed: false,
    id: user?.id || "",
  })

  const getAllUserTodoshandler = () => {
    dispatch(todosAsyncThunk.getUserAllTodos({ ...pageData }))
  }
  const deleteToDoHandler = (id: string) => {
    dispatch(todosAsyncThunk.deleteTodoAsyncThunk(id))
      .unwrap()
      .then(() => {
        getAllUserTodoshandler()
      })
      .catch(() => {})
  }

  useEffect(() => {
    getAllUserTodoshandler()
  }, [pageData])

  useEffect(() => {
    if (editToDoItems) {
      setIsModelOpen(true)
    }
  }, [editToDoItems])

  const closeModel = () => {
    setEditTodoItems(null)
    setIsModelOpen(false)
  }
  const ModelTitle: string = "Create New Todo"
  return (
    <>
      <ModelComponent
        {...{
          isModelOpen,
          setIsModelOpen,
          closeModel,
          ModelTitle,
        }}
      >
        <CreateToDoForm
          setIsModelOpen={setIsModelOpen}
          editToDoItems={editToDoItems}
          setEditTodoItems={setEditTodoItems}
          getAllUserTodoshandler={getAllUserTodoshandler}
        />
      </ModelComponent>
      <div className="mt-[50px] md:mt-16">
        <div className="flex flex-col md:flex-row w-full md:justify-center items-center ">
          <div className="flex justify-center gap-2 mx-2  mt-4">
            <div className="w-[50%]">
              <SelectComponent
                value={pageData.priority}
                id="priority"
                name="priority"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setPageData({
                    ...pageData,
                    priority: e.target.value == "All" ? "" : e.target.value,
                  })
                }
                title="Select Priority "
                priorities={FILTER_PRIORITY}
              />
            </div>
            <div className="w-[50%]">
              <SearchBoxComponent
                pageData={pageData}
                setPageData={setPageData}
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 md:mt-3">
            <div className="mt-7">
              {" "}
              <button
                onClick={() => setIsModelOpen(true)}
                type="button"
                className="bg-primary shadow-2xl rounded-lg text-sm p-2 text-slate-50"
                data-hs-overlay="#hs-slide-down-animation-modal"
              >
                + Create ToDo
              </button>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        tabsHeader={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setPageData={setPageData}
        pageData={pageData}
      />
      <div className="mt-0 p-0">
        <div
          id="basic-tabs-1"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-1"
        >
          <AccordionComponent
            todos={allToDos}
            deleteToDoHandler={deleteToDoHandler}
            setEditTodoItems={setEditTodoItems}
            getAllUserTodoshandler={getAllUserTodoshandler}
            pageData={pageData}
          />
        </div>
        <ResponsivePagination
          current={pageData?.page}
          total={Math.ceil(count / pageData.limit)}
          onPageChange={(count) => setPageData({ ...pageData, page: count })}
        />
      </div>
    </>
  )
}
export default Home
