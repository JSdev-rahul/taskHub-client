import React from "react"

interface ButtonProps {
  label: string
  disabled: boolean
}

const Button: React.FC<ButtonProps> = ({ label, disabled }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="w-full shadow-2xl py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      {disabled ? (
        <span
          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading"
        ></span>
      ) : null}

      {label}
    </button>
  )
}

export default Button
