"use client";

import styled from "@emotion/styled";
import { MdOutlineLock } from "react-icons/md";
import { useEffect, useState } from "react";

const FormField = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FormInput = styled.input`
  padding: 0.5rem 0.5rem 0.5rem 1.75rem;
  border-radius: 0.375rem;

  outline: none;

  transition: all 0.3s ease;
`;

const AuthPassword = ({
  label = "Password",
  name = "",
  value,
  onChange,
  error = {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLongEnough, setIsLongEnough] = useState(false);
  const [hasCases, setHasCases] = useState(false);
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasSymbols, setHasSymbols] = useState(false);

  return (
    <FormField className={`group w-full`}>
      <label
        htmlFor="password"
        className={`text-sm font-light text-primary-dark`}
      >
        {label}
      </label>
      <section className={`relative w-full`}>
        <FormInput
          id={name}
          name={name}
          type="password"
          value={value}
          onChange={(event) => {
            onChange(event);

            const newValue = event.target.value;

            let strength = 0;
            if (newValue.length < 8) {
              setPasswordStrength(0);
            }

            const hasUppercase = /[A-Z]/.test(newValue);
            const hasLowercase = /[a-z]/.test(newValue);
            const hasNumber = /\d/.test(newValue);
            const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
              newValue
            );

            if (newValue.length > 7) {
              setIsLongEnough(true);
              strength += 1;
            } else setIsLongEnough(false);

            if (hasUppercase && hasLowercase) {
              setHasCases(true);
              strength += 1;
            } else setHasCases(false);

            if (hasNumber) {
              setHasNumbers(true);
              strength += 1;
            } else setHasNumbers(false);

            if (hasSymbol) {
              setHasSymbols(true);
              strength += 1;
            } else setHasSymbols(false);

            setPasswordStrength(strength);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full border-[1px] focus:shadow-xl shadow-primary-dark/30 ${
            error.level > 1
              ? "border-danger"
              : value.length > 0
              ? "border-action"
              : "border-black/15 hover:border-action focus:border-action"
          } transition-all duration-300`}
        />
        <MdOutlineLock
          className={`absolute top-1/2 left-2 -translate-y-1/2 ${
            value.length > 0
              ? "text-primary-dark dark:text-primary-light"
              : "text-primary-dark/50 dark:text-primary-light/50 group-hover:text-primary-dark group-hover:dark:text-primary-light"
          } transition-all duration-300`}
        />
      </section>
      <section className={`my-1 flex gap-1`}>
        {[1, 2, 3, 4].map((level) => (
          <div
            key={`password-strength-${level}`}
            className={`flex-grow h-1 rounded-full ${
              passwordStrength >= level ? "bg-action" : "bg-primary-dark/10"
            } transition-all duration-300`}
          ></div>
        ))}
      </section>
      <section
        className={`${
          isFocused ? "h-28" : "h-0"
        } overflow-hidden transition-all duration-300`}
      >
        <p className={`mt-2 mb-1 text-xs text-primary-dark/50`}>
          A strong password:
        </p>
        <ul className={`flex flex-col gap-1 text-xs`}>
          <li
            className={
              isLongEnough ? "text-primary-dark" : "text-primary-dark/50"
            }
          >
            - Is at least 8 characters long
          </li>
          <li
            className={hasCases ? "text-primary-dark" : "text-primary-dark/50"}
          >
            - Have uppercase and lowercase letters
          </li>
          <li
            className={
              hasNumbers ? "text-primary-dark" : "text-primary-dark/50"
            }
          >
            - Have at least 1 number
          </li>
          <li
            className={
              hasSymbols ? "text-primary-dark" : "text-primary-dark/50"
            }
          >
            - Have at least 1 special character
          </li>
        </ul>
      </section>
    </FormField>
  );
};

export default AuthPassword;
