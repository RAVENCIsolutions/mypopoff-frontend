"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter, useSearchParams } from "next/navigation";

import { supabase } from "@/config/Supbase";
import MPOLetterMark from "@/components/MPOLetterMark";
import { FaCheck, FaEye, FaEyeSlash, FaTimesCircle } from "react-icons/fa";
import { PiWarningBold } from "react-icons/pi";
import { MdOutlineDangerous } from "react-icons/md";
import { defaultUser } from "@/data/defaultUser";
import {
  saveToStorage,
  updateLastModified,
  updateLastSession,
  updateRememberMe,
} from "@/utility/localStorageUtils";
import { processLogin } from "@/utility/userUtils";
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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState({
    level: 0,
    message: "",
  });

  const errorCodes = {
    1: "bg-warning/10 text-warning",
    2: "bg-danger/10 text-danger",
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setError({
      level: 0,
      message: "",
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      processLogin(formData.remember);

      router.refresh();
    } catch (error) {
      setError({
        level: 2,
        message: error.message,
      });
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");
    const verification = searchParams.get("verification");
    const supabase = createClientComponentClient();

    const attemptVerification = async () => {
      const { user, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) console.error(`Error with verification: `, error);

      if (user) setVerified(true);
    };

    if (code) attemptVerification().then();
  }, []);

  const isDisabled = !formData.email || !formData.password;

  return (
    <>
      {verified && (
        <div
          className={`py-3 px-5 fixed top-0 left-0 w-full grid place-items-center bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark text-xs xs:text-sm text-center font-bold italic z-50`}
        >
          Nice! Your email address has been verified! ✅
          <div
            className={`absolute top-1/2 -translate-y-1/2 right-2`}
            onClick={() => setVerified(false)}
          >
            <FaTimesCircle
              className={`cursor-pointer text-primary-light dark:text-primary-dark opacity-50 hover:opacity-100 transition-all duration-300`}
            />
          </div>
        </div>
      )}

      <article
        className={`pb-4 flex flex-col items-center w-full border-b-[1.25px] border-secondary-dark/20`}
      >
        <Link href={"/"} className={`mb-4`}>
          <MPOLetterMark
            className={`w-12 fill-primary-dark hover:fill-action transition-all duration-300`}
          />
        </Link>

        <h1 className={`text-2xl font-bold text-center text-primary-dark`}>
          Welcome Back
        </h1>
        <p className={`text-base text-center text-primary-dark/50`}>
          Please enter your details to sign in.
        </p>
      </article>
      {/* Or */}
      {/*<article className={`flex items-center w-full`}>*/}
      {/*  <div className={`flex-grow h-[1.25px] bg-secondary-dark/20`}></div>*/}
      {/*  <p className={`px-3 text-sm font-bold text-secondary-dark/40`}>OR</p>*/}
      {/*  <div className={`flex-grow h-[1.25px] bg-secondary-dark/20`}></div>*/}
      {/*</article>*/}
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
          <label
            htmlFor="password"
            className={`text-sm font-light text-primary-dark`}
          >
            Password
          </label>
          <div className={`relative w-full`}>
            <FormInput
              id={`password`}
              name={`password`}
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`w-full border-[1px] focus:shadow-xl shadow-primary-dark/30 ${
                error.level > 0
                  ? "border-danger"
                  : "border-black/15 hover:border-action focus:border-action"
              }`}
            />
            <div
              className={`cursor-pointer absolute top-1/2 -translate-y-1/2 right-4`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>
        </FormField>

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
              className={`cursor-pointer text-sm font-light text-primary-dark`}
            >
              Remember me
            </label>
          </fieldset>
          <Link
            href={"/auth/forgot-password"}
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
          onClick={handleLogin}
          disabled={isDisabled}
        >
          Login
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
    </>
  );
};
export default LoginForm;
