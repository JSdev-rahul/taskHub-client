import React, { memo } from "react"

interface iTableCardProps {
  children: JSX.Element
}

const TableCard: React.FC<iTableCardProps> = React.memo(({ children }) => {
  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-5">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default memo(TableCard)
