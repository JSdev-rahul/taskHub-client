import React, { useState } from "react"
import { ToDoListPageData } from "../pages/Home"

interface TabsProps {
  tabsHeader: any
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
  setPageData: React.Dispatch<React.SetStateAction<ToDoListPageData>>
  pageData: ToDoListPageData
}

const Tabs: React.FunctionComponent<TabsProps> = ({
  tabsHeader,
  activeTab,
  setActiveTab,
  setPageData,
  pageData,
}) => {
  const handleTabClick = (tabIndex: number, item: string) => {
    setActiveTab(tabIndex)
    // Create a new object representing the updated page data based on the clicked tab
    const updatedPageData: ToDoListPageData = {
      ...pageData,
      completed: item === "Pending" ? false : true,
    }
    setPageData(updatedPageData)
  }
  return (
    <>
      <div className="flex justify-center mt-1">
        {tabsHeader?.map((item: string, index: number) => {
          return (
            <div
              className={`border-b  ${activeTab === index ? "border-blue-700" : "border-gray-200"} border-gray-200 px-4 `}
            >
              <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
                <button
                  type="button"
                  className={`hs-tab-active:font-semibold py-4 px-1 inline-flex items-center gap-x-2   text-sm whitespace-nowrap ${
                    activeTab === index
                      ? "text-blue-700 text-lg text-opacity-100 font-bold"
                      : " dark:text-slate-50 text-slate-950"
                  }`}
                  onClick={() => handleTabClick(index, item)}
                  id="basic-tabs-item-1"
                  role="tab"
                >
                  {item}
                </button>
              </nav>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Tabs
