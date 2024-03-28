"use client";

import styled from "@emotion/styled";
import classNames from "classnames";
import Select from "react-select";
import { CallingCodes } from "@/data/CallingCodes";
import { useState } from "react";

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

const FormInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.375rem;

  outline: none;

  transition: all 0.3s ease;
`;

const AuthPhone = ({
  label = "label",
  name = "",
  value = "",
  onChange,
  type = "text",
  error = {},
}) => {
  const countryCallingCodes = CallingCodes.map((item) => ({
    label: `(${item.dial_code}) ${item.name}`,
    value: item.dial_code,
  }));

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");

  return (
    <FormField className={`w-full`}>
      <label htmlFor={name} className={`text-sm font-light text-primary-dark`}>
        {label}
      </label>
      <section className={`grid grid-cols-2 gap-2`}>
        <Select
          name={name}
          instanceId={`select-${name}`}
          onChange={(event) => {
            const newCode = `(${event.value})`;

            setCountryCode(newCode);
            onChange(`${newCode} ${phoneNumber}`);
          }}
          options={countryCallingCodes}
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
              classNames(`h-48 sm:h-32 dark:text-primary-dark overflow-y-auto`),
          }}
          isSearchable
        />
        <FormInput
          id={name}
          name={name}
          type={type}
          value={phoneNumber}
          onChange={(event) => {
            const newNumber = event.target.value.replace(/[^0-9]/g, "");

            setPhoneNumber(newNumber);
            onChange(`${countryCode} ${newNumber}`);
          }}
          className={`grow border-[1px] focus:shadow-xl shadow-primary-dark/30 ${
            error && error.level > 1
              ? "border-danger"
              : value.length > 0
              ? "border-action"
              : "border-black/15 hover:border-action focus:border-action"
          } transition-all duration-300`}
        />
      </section>
    </FormField>
  );
};

export default AuthPhone;
