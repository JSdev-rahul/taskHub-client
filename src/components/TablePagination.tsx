import React from "react"
import ResponsivePagination from "react-responsive-pagination"
import "react-responsive-pagination/themes/classic.css"
import { iUserPaginationQuery } from "../utils/interfaces"
import CustomTableRowSelect from "./CustomTableRowSelect"
import { selectRowOptions } from "../utils/constants"

interface iTablePagination {
  setPageData: React.Dispatch<iUserPaginationQuery>
  pageData: iUserPaginationQuery
  count: number
}

const TablePagination: React.FC<iTablePagination> = React.memo(
  ({ setPageData, pageData, count }) => {
    console.log("TablePagination Running")
    return (
      <>
        <div className="px-6 py-4 gap-3 flex items-center justify-center md:flex md:justify-center md:items-center border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-sm space-y-3 ">
            <CustomTableRowSelect
              options={selectRowOptions}
              onChange={(value) =>
                setPageData({
                  ...pageData,
                  limit: value,
                })
              }
            />
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
      </>
    )
  }
)

export default React.memo(TablePagination)
