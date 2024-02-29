"use client";

import MPOLetterMark from "@/components/MPOLetterMark";
import { useState } from "react";
import styled from "@emotion/styled";
import { useSignIn } from "@clerk/nextjs";

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
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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

  return isLoaded ? (
    <section
      className={`p-8 w-full max-w-sm bg-white rounded-2xl shadow-xl shadow-primary-dark/5`}
    >
      <article
        className={`pb-4 flex flex-col items-center w-full border-b-[1.25px] border-secondary-dark/20`}
      >
        <MPOLetterMark
          className={`mb-4 w-12 fill-primary-dark dark:fill-primary-light`}
        />

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
            name={`email`}
            type="text"
            value={formData.email}
            onChange={handleChange}
            className={`border-[1px] ${
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
            name={`password`}
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`border-[1px] ${
              error.level > 0
                ? "border-danger"
                : "border-black/15 hover:border-action focus:border-action"
            }`}
          />
        </FormField>
        <button
          className={`p-3 bg-action hover:bg-action/80 rounded-md text-xs font-bold uppercase text-white transition-all duration-300`}
        >
          Login
        </button>
      </form>
    </section>
  ) : null;
};
export default LoginForm;
