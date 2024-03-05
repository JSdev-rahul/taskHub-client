import { debounce } from "lodash"
import React, { useEffect, useState } from "react"

const SearchBoxComponent = ({ setPageData, pageData }) => {
  const [searchText, setSearchText] = useState("")

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
          id="hs-as-table-product-review-search"
          name="hs-as-table-product-review-search"
          className="py-2 px-3 ps-11 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
          <svg
            className="size-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>
    </>
  )
}

export default SearchBoxComponent
