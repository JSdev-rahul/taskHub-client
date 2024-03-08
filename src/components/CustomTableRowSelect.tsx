import React, { memo } from "react"

interface iSelectOption {
  value: number
  label: string
}

interface iCustomSelect {
  options: iSelectOption[]
  onChange: (value: number) => void
}

const CustomTableRowSelect: React.FC<iCustomSelect> = ({
  options,
  onChange,
}) => {
  return (
    <select
      onChange={(e) => onChange(Number(e.target.value))}
      className="py-2 px-3 pe-9 block border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default memo(CustomTableRowSelect)
