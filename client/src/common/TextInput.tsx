import { useState } from "react";

type TextInputProps = {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string;
};

const TextInput = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  error,
  className,
}: TextInputProps) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className={
            `
          px-3 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
          ` + className
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;
