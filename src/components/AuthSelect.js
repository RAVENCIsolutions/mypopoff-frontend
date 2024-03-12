"use client";

import styled from "@emotion/styled";
import Select from "react-select";
import classNames from "classnames";

const FormField = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FormSelect = styled.select`
  padding: 0.6rem 0.25rem;
  border-radius: 0.375rem;

  outline: none;

  width: 100%;

  transition: all 0.3s ease;
`;

const AuthSelect = ({
  label = "label",
  name = "",
  value,
  options = [],
  autoComplete = false,
  onChange,
}) => {
  return (
    <FormField className={`w-full`}>
      <label htmlFor={name} className={`text-sm font-light text-primary-dark`}>
        {label}
      </label>
      <Select
        name={name}
        instanceId={`select-${name}`}
        onChange={onChange}
        options={options}
        style={{ boxShadow: "none" }}
        classNames={{
          control: ({ isFocused }) =>
            classNames(
              `py-0.5 border-[1px] ${
                isFocused ? "shadow-xl" : ""
              } shadow-primary-dark/10 border-black/15 hover:border-action ${
                isFocused ? "border-action" : ""
              }`
            ),
          menuList: () =>
            classNames(`h-40 2xs:h-32 dark:text-primary-dark overflow-y-auto`),
        }}
        isSearchable={autoComplete}
      />
    </FormField>
  );
};

export default AuthSelect;
