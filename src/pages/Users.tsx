import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/utilityHooks"
import { usersAsyncThunk } from "../redux/asyncThunk/user.asyns"
import moment from "moment"
import SearchBoxComponent from "../components/SearchBox"
import ResponsivePagination from "react-responsive-pagination"
import "react-responsive-pagination/themes/classic.css"
import Swal from "sweetalert2"
import ModelComponent from "../components/ModelComponent"
import SignUp from "./SignUp"
import deleteConfirmationPopup from "../utils/deleteConfirmationPop"
import DropdownMenu from "../components/DropDown"

export interface PageDataProps {
  page: number
  limit: number
  q: string
  filter: ""
}
const Users = () => {
  const [isModelOpen, setIsModelOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { users, count } = useAppSelector((state) => state.user)
  const [pageData, setPageData] = useState<PageDataProps>({
    page: 1,
    limit: 5,
    q: "",
    filter: "",
  })

  const tableColums: string[] = [
    "Name",
    "Role",
    "Gender",
    "Status",
    "Created",
    "Action",
  ]

  const fetchUsersData = () => {
    dispatch(usersAsyncThunk.getAllUsers(pageData))
  }

  useEffect(() => {
    fetchUsersData()
  }, [pageData])

  const handleDeleteUser = async (id: string) => {
    deleteConfirmationPopup().then((result) => {
      if (result.isConfirmed) {
        dispatch(usersAsyncThunk.deleteUserAsyncThunk(id))
          .unwrap()
          .then()
          .catch()
          .finally(() => {
            fetchUsersData()
          })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        })
      }
    })
  }

  const closeModel = () => {
    setIsModelOpen(false)
  }
  const title = "Regisater New user"
  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-5">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <ModelComponent
                      {...{
                        isModelOpen,
                        setIsModelOpen,
                        closeModel,
                        title,
                      }}
                    >
                      <SignUp isCreateNewUser={true} />
                    </ModelComponent>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Users
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add users, edit and more.
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <div className="sm:col-span-1">
                        <SearchBoxComponent
                          pageData={pageData}
                          setPageData={setPageData}
                        />
                      </div>
                      <div className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <svg
                          className="flex-shrink-0 size-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M7 12h10" />
                          <path d="M10 18h4" />
                        </svg>

                        <DropdownMenu
                          title={"Filter"}
                          setPageData={setPageData}
                          pageData={pageData}
                        />
                      </div>
                      <button
                        onClick={() => setIsModelOpen(true)}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        <svg
                          className="flex-shrink-0 size-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        Add user
                      </button>
                    </div>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      {tableColums?.map((item) => {
                        return (
                          <th
                            scope="col"
                            className="px-14 py-3 xl:ps-24 text-start"
                          >
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                {item}
                              </span>
                            </div>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users?.map((item: any) => {
                      return (
                        <tr className="">
                          <td className="size-px whitespace-nowrap pl-4">
                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                              <div className="flex items-center gap-x-3">
                                <img
                                  className="inline-block size-[38px] rounded-full"
                                  src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=facearea&facepad=2&w=300&h=300&q=80"
                                  alt="Image Description"
                                />
                                <div className="grow">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {item?.name}
                                  </span>
                                  <span className="block text-sm text-gray-500">
                                    {item?.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {item?.role}
                              </span>
                              <span className="block text-sm text-gray-500">
                                Human resources
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap text-center">
                            <div className="px-6 py-1.5 cursor-auto">
                              <span className="block text-sm text-gray-800 dark:text-gray-200">
                                {item?.gender}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap text-center">
                            <div className="px-6 py-3">
                              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                <svg
                                  className="size-2.5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                                Active
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap text-end">
                            <div className="px-6 py-1.5">
                              <span className="block text-sm text-gray-800 dark:text-gray-200">
                                {moment
                                  .utc(item?.createdAt)
                                  .format("MMMM Do YYYY")}
                              </span>
                            </div>
                          </td>

                          <td className="size-px whitespace-nowrap text-center">
                            {item?.role == "admin" ? (
                              <div className="dark:text-white ">--</div>
                            ) : (
                              <div className="px-6 py-1.5">
                                <button
                                  onClick={() => handleDeleteUser(item?._id)}
                                  className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none "
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                <div className="px-6 py-4  gap-3 flex items-center justify-center md:flex md:justify-center md:items-center border-t border-gray-200 dark:border-gray-700">
                  <div className="max-w-sm space-y-3 ">
                    <select
                      onChange={(e) =>
                        setPageData({
                          ...pageData,
                          limit: Number(e.target.value),
                        })
                      }
                      className="py-2 px-3 pe-9 block border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>
                  </div>
                  <div>
                    <ResponsivePagination
                      current={pageData?.page}
                      total={Math.ceil(count / pageData.limit)}
                      onPageChange={(count: number) =>
                        setPageData({ ...pageData, page: count })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Users
