import React from "react";

interface Props {
  type: string;
  value: string;
  setValue: (newValue: string) => void;
  placeholder: string;
}

const AuthInput = ({ type, value, setValue, placeholder }: Props) => {
  return (
    <div className="relative w-80 h-14">
      <input
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder=""
        className="auth-input-field w-full h-full px-2 rounded-lg outline outline-1"
      />
      <p className="auth-input-placeholder absolute top-4 left-3 pointer-events-none transition-all">
        {placeholder}
      </p>
    </div>
  );
};

export default AuthInput;
