import React from "react"
import SVGImage from "./SvgRender"
import { activeSvgIcon } from "../assets"
import moment from "moment"
import { TableColumnInfo } from "../utils/constants"

interface iDataTableProps {
  column: any
  row: any
  handleDeleteUser: any
}

const UserDataTable: React.FC<iDataTableProps> = ({
  column,
  row,
  handleDeleteUser,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-slate-800">
        <tr>
          {column?.map((item: TableColumnInfo) => {
            return (
              <th scope="col" className="px-14 py-3 xl:ps-24 text-start">
                <div className="flex items-center gap-x-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                    {item.name}
                  </span>
                </div>
              </th>
            )
          })}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {row?.map((item: any) => {
          return (
            <tr className="">
              <td className="size-px whitespace-nowrap pl-4">
                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                  <div className="flex items-center gap-x-3">
                    <img
                      loading="lazy"
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
                    <SVGImage src={activeSvgIcon} title="ActiveIcon" />
                    Active
                  </span>
                </div>
              </td>
              <td className="size-px whitespace-nowrap text-end">
                <div className="px-6 py-1.5">
                  <span className="block text-sm text-gray-800 dark:text-gray-200">
                    {moment.utc(item?.createdAt).format("MMMM Do YYYY")}
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
  )
}

export default UserDataTable
