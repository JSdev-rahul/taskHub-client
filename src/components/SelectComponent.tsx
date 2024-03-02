import React from "react"

interface Priority {
  id: number
  priority: string
}

interface SelectComponentProps {
  priorities: Priority[]
  title: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  id: string
  name: string
  error?: string
  value: string
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  priorities,
  title,
  onChange,
  id,
  name,
  error,
  value,
}) => {
  return (
    <>
      <select
        style={{
          outline: "none",
          border: "0.1px solid gray",
        }}
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        className="py-2 px-4 block w-full border border-gray-200 rounded-lg text-xs md:text-sm outline-none"
      >
        <option className="text-[10px] md:text-sm" selected disabled>
          {title}
        </option>
        {priorities?.map((item: Priority) => {
          return (
            <option className="text-[10px] md:text-sm" value={item.priority}>
              {item.priority}
            </option>
          )
        })}
      </select>
      {error ? <span className="text-xs text-error">*{error}</span> : null}
    </>
  )
}

export default SelectComponent
