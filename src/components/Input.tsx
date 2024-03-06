import React from "react"
import { iInputFieldProps } from "../utils/componentProps"

export const InputField: React.FC<iInputFieldProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
  error,
}) => {
  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block text-sm mb-2 dark:text-white text-black"
        >
          {label}
        </label>
        <div className="relative">
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="py-2 px-4 block w-full border border-gray-200 rounded-lg text-sm outline-none"
          />
          {error ? <span className="text-xs text-error">*{error}</span> : null}
        </div>
      </div>
    </>
  )
}
