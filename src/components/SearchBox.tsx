import { debounce } from "lodash"
import React, { useEffect, useState } from "react"
import SVGImage from "./SvgRender"
import { searchSvgGray, searchSvgWhite } from "../assets"
import { useAppSelector } from "../hooks/utilityHooks"

interface iSearchBoxComponent {
  setPageData: React.Dispatch<any>
  pageData: Record<string, any>
}

const SearchBoxComponent: React.FC<iSearchBoxComponent> = ({
  setPageData,
  pageData,
}) => {
  const [searchText, setSearchText] = useState("")
  const { darkMode } = useAppSelector((state) => state.uimode)
  useEffect(() => {
    const debouncedSearch = debounce((searchQuery) => {
      setPageData({ ...pageData, q: searchQuery })
      // Perform your search logic here, e.g., fetching search results
    }, 1000)

    // Call the debounced function with the updated query whenever it changes
    debouncedSearch(searchText)

    // Cleanup function to cancel debounce on component unmount
    return () => debouncedSearch.cancel()
  }, [searchText])

  return (
    <>
      <label htmlFor="hs-as-table-product-review-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          // id="hs-as-table-product-review-search"
          name="hs-as-table-product-review-search"
          className="py-[24px] sm:py-2 px-3 ps-11 block w-full border border-gray-200 rounded-lg text-sm  dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
          <SVGImage
            src={darkMode ? searchSvgWhite : searchSvgGray}
            title="searchIcon"
          />
        </div>
      </div>
    </>
  )
}

export default SearchBoxComponent
