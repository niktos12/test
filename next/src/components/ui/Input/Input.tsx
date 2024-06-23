import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  value,
  onChange,
  type,
  id,
  placeholder,
  label,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="block text-sm text text-zinc-900">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="bg-gray-900 bg-opacity-[0.12] placeholder:text-gray-900 placeholder:text-opacity-40 text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none"
      />
    </div>
  );
};

export default Input;
