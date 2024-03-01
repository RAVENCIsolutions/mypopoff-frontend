"use client";

import MPOLetterMark from "@/components/MPOLetterMark";
import { useState } from "react";
import styled from "@emotion/styled";
import { useSignIn } from "@clerk/nextjs";
import { Checkbox, FormControlLabel } from "@mui/material";
import Link from "next/link";

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

const LoginForm = () => {
  const { isLoaded, signIn } = useSignIn();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState({
    level: 0,
    message: "",
  });

  const errorCode = {
    1: "text-warning",
    2: "text-danger",
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });
    } catch (error) {
      setError({
        level: error.code,
        message: error.message,
      });
    }
  };

  const isDisabled = !formData.email || !formData.password;

  return isLoaded ? (
    <div
      className={`p-5 sm:p-8 w-full xs:max-w-sm bg-white rounded-none xs:rounded-2xl shadow-xl shadow-primary-dark/5`}
    >
      <article
        className={`pb-4 flex flex-col items-center w-full border-b-[1.25px] border-secondary-dark/20`}
      >
        <Link href={"/"} className={`mb-4`}>
          <MPOLetterMark
            className={`w-12 fill-primary-dark dark:fill-primary-light hover:fill-action transition-all duration-300`}
          />
        </Link>

        <h1 className={`text-2xl font-bold text-center`}>Welcome Back</h1>
        <p className={`text-base text-center text-primary-dark/50`}>
          Please enter your details to sign in.
        </p>
        <p>{signIn.status}</p>
      </article>

      {/* Or */}
      {/*<article className={`flex items-center w-full`}>*/}
      {/*  <div className={`flex-grow h-[1.25px] bg-secondary-dark/20`}></div>*/}
      {/*  <p className={`px-3 text-sm font-bold text-secondary-dark/40`}>OR</p>*/}
      {/*  <div className={`flex-grow h-[1.25px] bg-secondary-dark/20`}></div>*/}
      {/*</article>*/}

      <form action="" className={`mt-6 flex flex-col gap-4 w-full`}>
        <FormField className={`w-full`}>
          <label htmlFor="email" className={`text-sm font-light`}>
            Email address
          </label>
          <FormInput
            id={`email`}
            name={`email`}
            type="text"
            value={formData.email}
            onChange={handleChange}
            className={`border-[1px] focus:shadow-xl shadow-primary-dark/30 ${
              error.level > 0
                ? "border-danger"
                : "border-black/15 hover:border-action focus:border-action"
            }`}
          />
        </FormField>

        <FormField className={`w-full`}>
          <label htmlFor="password" className={`text-sm font-light`}>
            Password
          </label>
          <FormInput
            id={`password`}
            name={`password`}
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`border-[1px] focus:shadow-xl shadow-primary-dark/30 ${
              error.level > 0
                ? "border-danger"
                : "border-black/15 hover:border-action focus:border-action"
            }`}
          />
        </FormField>
        <article
          className={`flex flex-col-reverse xs:flex-row justify-between gap-4 w-full`}
        >
          <fieldset className={`flex flex-row gap-1`}>
            <input
              id={"remember"}
              name={"remember"}
              type="checkbox"
              className={`cursor-pointer`}
              checked={formData.remember}
              onChange={handleChange}
            />
            <label
              htmlFor="remember"
              className={`cursor-pointer text-sm font-light`}
            >
              Remember me
            </label>
          </fieldset>
          <Link
            href={"/"}
            className={`text-sm text-primary-dark hover:text-action underline transition-all duration-300`}
          >
            Forgot Password?
          </Link>
        </article>

        <p
          className={`${
            formData.remember ? "h-24 2xs:h-16" : "h-0"
          } text-xs font-light text-primary-dark/50 overflow-hidden transition-all duration-300`}
        >
          Note: Remember me will keep you signed in even when you close the
          browser. It is only recommended when using a personal or private
          device.
        </p>
        <button
          className={`cursor-pointer disabled:cursor-auto p-3 bg-action hover:bg-action/80 disabled:bg-gray-400 rounded-md focus:shadow-xl shadow-primary-dark/30 outline-none text-xs font-bold uppercase text-white disabled:text-white/70 transition-all duration-300`}
          onClick={(event) => {
            event.preventDefault();
            console.log("Touch");
          }}
          disabled={isDisabled}
        >
          Login
        </button>
      </form>
      <p className={`mt-8 text-sm font-light text-center`}>
        Don't have an account yet?{" "}
        <Link
          href={"/auth/register"}
          className={`font-normal text-primary-dark hover:text-action transition-all duration-300`}
        >
          Sign Up
        </Link>
      </p>
    </div>
  ) : null;
};
export default LoginForm;
