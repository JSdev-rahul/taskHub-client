/* eslint-disable */
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
import { FILTER_PRIORITY, TABS } from "../utils/constants"
import { iToDoPageData } from "../utils/interfaces"

const Home = () => {
  const dispatch = useAppDispatch()
  const { allToDos, count } = useAppSelector((state) => state.todos)
  const { user } = useAppSelector((state) => state.auth)
  const [editToDoItems, setEditTodoItems] = useState<string | null>(null)
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [pageData, setPageData] = useState<iToDoPageData>({
    page: 1,
    limit: 5,
    q: "",
    priority: "",
    completed: false,
    id: user?.id || "",
  })

  const getAllUserTodoshandler = () => {
    dispatch(todosAsyncThunk.getAllTodosAsyncThunk({ ...pageData }))
  }
  const deleteToDoHandler = (id: string) => {
    console.log(id)
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
        <div className="flex flex-col md:flex-row w-full md:justify-center sm:items-center ">
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-end gap-4 sm:gap-2 mt-4">
            <div className="w-full sm:w-[50%] ">
              <SelectComponent
                value={pageData.priority}
                id="priority"
                name="priority"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setPageData({
                    ...pageData,
                    priority: e.target.value === "All" ? "" : e.target.value,
                  })
                }
                title="Select Priority "
                options={FILTER_PRIORITY}
              />
            </div>
            <div className="w-full sm:w-[50%] ">
              <SearchBoxComponent
                pageData={pageData}
                setPageData={setPageData}
              />
            </div>

            <div className="flex justify-center items-center gap-3 md:mt-3 w-full sm:w-[50%] ">
              <button
                onClick={() => setIsModelOpen(true)}
                type="button"
                className="bg-primary shadow-2xl rounded-lg text-sm py-4 sm:p-2 text-slate-50 w-full "
                data-hs-overlay="#hs-slide-down-animation-modal"
              >
                + Create ToDo
              </button>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        tabs={TABS}
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
