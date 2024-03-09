"use client";

import { useState } from "react";
import Link from "next/link";

import styled from "@emotion/styled";

import MPOLetterMark from "@/components/MPOLetterMark";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

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
          Forgot Your Password?
        </h1>
        <p className={`text-base text-center text-primary-dark/50`}>
          Let's get you back in.
        </p>
      </article>

      <form action="" className={`mt-6 flex flex-col gap-4 w-full`}>
        <FormField className={`w-full`}>
          <label
            htmlFor="email"
            className={`text-sm font-light text-primary-dark`}
          >
            Email address
          </label>
          <FormInput
            id={`email`}
            name={`email`}
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={`border-[1px] focus:shadow-xl shadow-primary-dark/30 border-black/15 hover:border-action focus:border-action`}
          />
        </FormField>

        <button
          className={`cursor-pointer disabled:cursor-auto p-3 bg-action hover:bg-action/80 disabled:bg-gray-400 rounded-md focus:shadow-xl shadow-primary-dark/30 outline-none text-xs font-bold uppercase text-white disabled:text-white/70 transition-all duration-300`}
          onClick={async () => {
            if (email.length > 6) {
              const supabase = createClientComponentClient();
              await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: "/auth/reset-password",
              });
            }
          }}
        >
          Reset Password
        </button>
      </form>
      <p className={`mt-8 text-sm font-light text-center text-primary-dark/70`}>
        Don't have an account yet?{" "}
        <Link
          href={"/auth/register"}
          className={`font-normal text-primary-dark hover:text-action transition-all duration-300`}
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
