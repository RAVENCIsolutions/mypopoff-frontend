"use client";

import MPOLetterMark from "@/components/MPOLetterMark";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CircularProgress, Stack } from "@mui/material";

import { usernameExists } from "@/utility/dbUtils";

import AuthText from "@/components/AuthText";
import AuthPassword from "@/components/AuthPassword";
import AuthUsername from "@/components/AuthUsername";
import { supabase } from "@/config/Supbase";

const VerificationForm = () => {
  // States
  const [email, setEmail] = useState("");
  const [sentLink, setSentLink] = useState(false);
  const [error, setError] = useState({});

  const handleResendLink = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError({
          level: 1,
          message:
            "Something went wrong, please try again later. If this keeps happening, please contact support.",
        });
      }

      if (data) {
        setSentLink(true);
      }
    } catch (error) {
      setError({
        level: error.code,
        message: error.message,
      });
    }
  };

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
          Welcome Back!
        </h1>
        <p className={`text-base text-center text-primary-dark/50`}>
          Let's get you signed up.
        </p>
      </article>

      {/* Or */}
      {/*<article className={`flex items-center w-full`}>*/}
      {/*  <div className={`flex-grow h-[1.25px] bg-secondary-dark/20`}></div>*/}
      {/*  <p className={`px-3 text-sm font-bold text-secondary-dark/40`}>OR</p>*/}
      {/*  <div className={`flex-grow h-[1.25px] bg-secondary-dark/20`}></div>*/}
      {/*</article>*/}
      {completeSignUp ? (
        <section className={`mt-6`}>
          <p
            className={`text-sm text-center text-primary-dark/80 font-bold italic`}
          >
            Please check your email to complete sign up.
          </p>
        </section>
      ) : (
        <>
          <section className={`mt-6 flex flex-col gap-4 w-full`}>
            <article className={`relative`}>
              <AuthUsername
                label={`Username`}
                name={`username`}
                value={formData.username}
                error={error.username}
                onChange={(event) => {
                  setError({
                    ...error,
                    username: {
                      level: 0,
                      message: "",
                    },
                  });
                  handleChange(event);
                }}
              />
              {checkingUsername && (
                <Stack
                  className={`mt-2`}
                  sx={{ color: "grey.500" }}
                  spacing={2}
                >
                  <CircularProgress color="inherit" size={15} />
                </Stack>
              )}
            </article>

            <AuthText
              label={`Email address`}
              name={`email`}
              value={formData.email}
              error={error.email}
              onChange={handleChange}
            />
            <AuthPassword
              label={`Password`}
              name={`password`}
              value={formData.password}
              error={error.password}
              onChange={(event) => {
                handleChange(event);

                const newValue = event.target.value;

                const hasUppercase = /[A-Z]/.test(newValue);
                const hasLowercase = /[a-z]/.test(newValue);
                const hasNumber = /\d/.test(newValue);

                if (newValue.length > 7) {
                  setIsLongEnough(true);
                } else setIsLongEnough(false);

                if (hasUppercase && hasLowercase) {
                  setHasCases(true);
                } else setHasCases(false);

                if (hasNumber) {
                  setHasNumbers(true);
                } else setHasNumbers(false);
              }}
            />

            <button
              className={`cursor-pointer disabled:cursor-auto p-3 bg-action hover:bg-action/80 disabled:bg-gray-400 rounded-md focus:shadow-xl shadow-primary-dark/30 outline-none text-xs font-bold uppercase text-white disabled:text-white/70 transition-all duration-300`}
              onClick={handleSignUp}
              disabled={!readyToSignUp}
            >
              Register
            </button>
          </section>

          <p
            className={`mt-8 text-sm font-light text-center text-primary-dark/70`}
          >
            Already have an account?{" "}
            <Link
              href={"/auth/login"}
              className={`font-normal text-primary-dark hover:text-action transition-all duration-300`}
            >
              Login
            </Link>
          </p>
        </>
      )}
    </div>
  );
};
export default VerificationForm;
