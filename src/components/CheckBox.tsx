import React from "react"
import { iCheckBoxProps } from "../utils/componentProps"

const CheckBox: React.FC<iCheckBoxProps> = ({
  id,
  name,
  label,
  type,
  value,
  checked,
  onChange,
  error,
}) => {
  return (
    <>
      <div className="cursor-pointer dark:text-white text-black">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          className="cursor-pointer mt-0.5 border-gray-200 rounded-full text-blue-600 "
          checked={checked} // Check if gender value is 'female'
          onChange={onChange} // Handle input change
        />
        <label htmlFor={id} className="text-sm  ms-2  cursor-pointer">
          {label}
        </label>
      </div>
    </>
  )
}

export default CheckBox
