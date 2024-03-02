import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  onChange: any;
  error: any;
  value: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  name,
  onChange,
  error,
  value,
}) => {
  return (
    <>
      <div>
        <label htmlFor="email" className="block text-sm mb-2 dark:text-white text-black">
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
  );
};
