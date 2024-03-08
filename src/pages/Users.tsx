import React, { lazy, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/utilityHooks"
import { usersAsyncThunk } from "../redux/asyncThunk/user.asyns"
import Swal from "sweetalert2"
import deleteConfirmationPopup from "../utils/deleteConfirmationPop"
import { iUserPaginationQuery } from "../utils/interfaces"
import { UserTableColumns, userTableFilterOptions } from "../utils/constants"
import { filterIcon, plusSvgIcon } from "../assets"
import TableCard from "../components/TableCard"
import UserDataTable from "../components/UserDataTable"
import TablePagination from "../components/TablePagination"

const DropdownMenu = lazy(() => import("../components/DropDown"))
const SVGImage = lazy(() => import("../components/SvgRender"))
const SignUp = lazy(() => import("./SignUp"))
const ModelComponent = lazy(() => import("../components/ModelComponent"))
const SearchBoxComponent = lazy(() => import("../components/SearchBox"))

const Users = React.memo(() => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { users, count } = useAppSelector((state) => state.user)
  const [pageData, setPageData] = useState<iUserPaginationQuery>({
    page: 1,
    limit: 5,
    q: "",
    filter: "",
  })

  useEffect(() => {
    dispatch(usersAsyncThunk.getAllUsers(pageData))
  }, [dispatch, pageData])

  const fetchUsersData = () => {
    dispatch(usersAsyncThunk.getAllUsers(pageData))
  }

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
  const ModelTitle: string = "Regisater New user"

  return (
    <TableCard>
      <>
        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <ModelComponent
              {...{
                isModelOpen,
                setIsModelOpen,
                closeModel,
                ModelTitle,
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
                <SVGImage src={filterIcon} title="filterIcon" />
                <DropdownMenu
                  title={"Filter"}
                  setPageData={setPageData}
                  pageData={pageData}
                  option={userTableFilterOptions}
                />
              </div>
              <button
                onClick={() => setIsModelOpen(true)}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <SVGImage src={plusSvgIcon} title="plusIcon" />
                Add user
              </button>
            </div>
          </div>
        </div>
        <UserDataTable
          column={UserTableColumns}
          row={users}
          handleDeleteUser={handleDeleteUser}
        />
        <TablePagination {...{ setPageData, pageData, count }} />
      </>
    </TableCard>
  )
})

export default Users
