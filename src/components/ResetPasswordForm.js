"use client";

import { useState } from "react";
import Link from "next/link";

import styled from "@emotion/styled";

import MPOLetterMark from "@/components/MPOLetterMark";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthPassword from "@/components/AuthPassword";

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

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  return (
    <div
      className={`p-5 sm:p-8 w-full xs:max-w-sm bg-white rounded-none xs:rounded-2xl shadow-xl shadow-primary-dark/5`}
    >
      <article
        className={`pb-4 flex flex-col items-center w-full border-b-[1.25px] border-secondary-dark/20`}
      >
        <Link href={"/"} className={`mb-4`}>
          <MPOLetterMark
            className={`w-12 fill-primary-dark hover:fill-action transition-all duration-300`}
          />
        </Link>

        <h1 className={`text-2xl font-bold text-center text-primary-dark`}>
          Password Reset
        </h1>
        <p className={`text-base text-center text-primary-dark/50`}>
          Choose a new password.
        </p>
      </article>

      <article action="" className={`mt-6 flex flex-col gap-4 w-full`}>
        <AuthPassword
          label={`Password`}
          name={`password`}
          value={formData.password}
          onChange={(event) =>
            setFormData({
              ...formData,
              password: event.target.value,
            })
          }
        />

        <FormField className={`w-full`}>
          <label
            htmlFor="password_confirmation"
            className={`text-sm font-light text-primary-dark`}
          >
            Confirm New Password
          </label>
          <FormInput
            id={`password_confirmation`}
            name={`password_confirmation`}
            type="password_confirmation"
            value={formData.password_confirmation}
            onChange={(event) =>
              setFormData({
                ...formData,
                password_confirmation: event.target.value,
              })
            }
            className={`border-[1px] focus:shadow-xl shadow-primary-dark/30 border-black/15 hover:border-action focus:border-action`}
          />
        </FormField>

        <button
          className={`cursor-pointer disabled:cursor-auto p-3 bg-action hover:bg-action/80 disabled:bg-gray-400 rounded-md focus:shadow-xl shadow-primary-dark/30 outline-none text-xs font-bold uppercase text-white disabled:text-white/70 transition-all duration-300`}
          onClick={async () => {
            if (formData.password !== formData.password_confirmation) {
              console.log("Password does not match");
            }
          }}
        >
          Update Password
        </button>
      </article>
    </div>
  );
};

export default ResetPasswordForm;
