import React, { useEffect, useState } from "react";
import { todosAsyncThunk } from "../redux/asyncThunk/Todos.async";
import { useAppDispatch, useAppSelector } from "../hooks/utilityHooks";
import Tabs from "../components/Tabs";
import { debounce } from "lodash";
import AccordionComponent from "../components/Accordion";
import ModelComponent from "../components/ModelComponent";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import CreateToDoForm from "./CreateToDoForm";
import { SearchSvgIcon } from "../assets";
import SelectComponent from "../components/SelectComponent";
import SignUp from "./SignUp";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
const tabs: string[] = ["Pending", "Completed"];
export interface ToDoListPageData {
  page: number;
  limit: number;
  q: string;
  priority: string;
  completed: boolean;
  id: string;
}

interface Priority {
  id: number;
  priority: string;
}
const priorities: Priority[] = [
  { id: 1, priority: "All" },
  { id: 2, priority: "Low" },
  { id: 3, priority: "Medium" },
  { id: 4, priority: "High" },
];
const Home = () => {

  const [isCreateNewUser, setIsCreateNewUser] = useState<boolean>(false);
  const [editToDoItems, setEditTodoItems] = useState<string | null>(null);
  const { allToDos, count } = useAppSelector((state) => state.todos);
  const { user } = useAppSelector((state) => state.auth);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = React.useState<string>("");
  const [pageData, setPageData] = useState<ToDoListPageData>({
    page: 1,
    limit: 5,
    q: "",
    priority: "",
    completed: false,
    id: user?.id || "",
  });

  const getAllUserTodoshandler = () => {
    dispatch(todosAsyncThunk.getUserAllTodos({ ...pageData }));
  };
  const deleteToDoHandler = (id: string) => {
    dispatch(todosAsyncThunk.deleteTodoAsyncThunk(id))
      .unwrap()
      .then(() => {
        getAllUserTodoshandler();
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAllUserTodoshandler();
  }, [pageData]);

  useEffect(() => {
    if (editToDoItems) {
      setIsModelOpen(true);
    }
  }, [editToDoItems]);

  useEffect(() => {
    const debouncedSearch = debounce((searchQuery) => {
      setPageData({ ...pageData, q: searchQuery });
      // Perform your search logic here, e.g., fetching search results
    }, 1000);

    // Call the debounced function with the updated query whenever it changes
    debouncedSearch(searchText);

    // Cleanup function to cancel debounce on component unmount
    return () => debouncedSearch.cancel();
  }, [searchText]);

  return (
    <>
      <div className="mt-[50px] md:mt-16">
        <div className="flex flex-col md:flex-row w-full md:justify-center items-center ">
          <div className="flex justify-center gap-2 mx-2  mt-4">
            <div className="w-[50%]">
              <label
                htmlFor="search"
                className="block text-sm mb-2 dark:text-slate-50 text-slate-950"
              >
                Filter
              </label>

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
                priorities={priorities}
              />
            </div>
            <div className="w-[50%]">
              <label
                htmlFor="search"
                className="block text-sm mb-2 dark:text-slate-50 text-slate-950 "
              >
                Search
              </label>
              <div className="relative">
                <input
                  style={{
                    outline: "none",
                    border: "0.1px solid gray",
                  }}
                  value={searchText}
                  onChange={(e: any) => setSearchText(e.target.value)}
                  type="search"
                  className="py-2 px-3 ps-11 block w-full rounded-lg md:text-sm text-xs"
                  placeholder="Search ToDo... "
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <img className="text-xs" src={SearchSvgIcon}></img>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 md:mt-3">
            <div className="mt-7">
              {" "}
              <ModelComponent
                {...{
                  isModelOpen,
                  setIsModelOpen,
                  setEditTodoItems,
                  setIsCreateNewUser,
                }}
              >
                {/* */}
                {isCreateNewUser ? (
                  <SignUp isCreateNewUser={isCreateNewUser} />
                ) : (
                  <CreateToDoForm
                    setIsModelOpen={setIsModelOpen}
                    editToDoItems={editToDoItems}
                    setEditTodoItems={setEditTodoItems}
                    getAllUserTodoshandler={getAllUserTodoshandler}
                  />
                )}
              </ModelComponent>
            </div>
            {user?.role == "admin" && (
              <div>
                <button
                  onClick={() => {
                    setIsCreateNewUser(true);
                    setIsModelOpen(true);
                  }}
                  type="button"
                  className="bg-primary shadow-2xl rounded-lg text-sm p-2 mt-7 text-slate-50"
                  data-hs-overlay="#hs-slide-down-animation-modal"
                >
                  + Create User
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Tabs
        tabsHeader={tabs}
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
          total={Math.ceil(count/pageData.limit)}
          onPageChange={(count) => setPageData({ ...pageData, page: count })}
        />
      </div>
    </>
  );
};
export default Home;
