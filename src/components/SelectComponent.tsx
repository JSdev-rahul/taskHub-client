import React from "react"
import { iPriority } from "../utils/constants"
import { iSelectComponentProps } from "../utils/componentProps"

const SelectComponent: React.FC<iSelectComponentProps> = ({
  id,
  name,
  title,
  value,
  onChange,
  error,
  options,
}) => {
  return (
    <>
      <select
        style={{
          outline: "none",
          // border: "0.1px solid gray",
        }}
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        className="py-[24px] sm:py-2 px-4 block w-full border dark:border-gray-700 dark:text-gray-400 dark:bg-slate-900  border-gray-200 rounded-lg text-xs md:text-sm outline-none"
      >
        <option className="text-[10px] md:text-sm" selected disabled>
          {title}
        </option>
        {options?.map((item: iPriority) => {
          return (
            <option className="text-[10px] md:text-sm" value={item.value}>
              {item.value}
            </option>
          )
        })}
      </select>
      {error ? <span className="text-xs text-error">*{error}</span> : null}
    </>
  )
}

export default SelectComponent
