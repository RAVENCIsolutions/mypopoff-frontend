﻿import styled from "@emotion/styled";
import { FaCheck } from "react-icons/fa";
import { PiWarningBold } from "react-icons/pi";
import { MdOutlineDangerous } from "react-icons/md";

const FormField = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FormInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.375rem;

  outline: none;

  transition: all 0.3s ease;
`;

const AuthText = ({
  label = "label",
  name = "",
  value = "",
  onChange,
  type = "text",
  error = {},
}) => {
  const errorCodes = {
    0: "text-primary-dark",
    1: "bg-action/10 text-action",
    2: "bg-warning/10 text-warning",
    5: "bg-danger/10 text-danger",
  };

  return (
    <FormField className={`w-full`}>
      <label htmlFor={name} className={`text-sm font-light text-primary-dark`}>
        {label}
      </label>
      <FormInput
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`border-[1px] focus:shadow-xl shadow-primary-dark/30 ${
          error && error.level > 1
            ? "border-danger"
            : value.length > 0
            ? "border-action"
            : "border-black/15 hover:border-action focus:border-action"
        } transition-all duration-300`}
      />

      {error.level > 0 && (
        <p
          className={`p-2 flex items-center gap-1 text-xs ${
            errorCodes[error.level]
          } `}
        >
          {error.level === 1 ? (
            <FaCheck size={10} />
          ) : error.level < 5 ? (
            <PiWarningBold size={15} />
          ) : (
            error.level === 5 && <MdOutlineDangerous size={15} />
          )}
          {error.message}
        </p>
      )}
    </FormField>
  );
};

export default AuthText;
