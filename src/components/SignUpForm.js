"use client";

import MPOLetterMark from "@/components/MPOLetterMark";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Stack } from "@mui/material";

import { usernameExists } from "@/utility/dbUtils";

import AuthText from "@/components/AuthText";
import AuthPassword from "@/components/AuthPassword";
import AuthUsername from "@/components/AuthUsername";
import { supabase } from "@/config/Supbase";

const SignUpForm = () => {
  // States
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameTimeout, setUsernameTimeout] = useState(null);

  const [readyToSignUp, setReadyToSignUp] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    username: {
      level: 0,
      message: "",
    },
    email: {
      level: 0,
      message: "",
    },
    password: {
      level: 0,
      message: "",
    },
  });

  const errorCode = {
    1: "text-warning",
    2: "text-danger",
  };

  const router = useRouter();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.log(error);
      }

      router.refresh();

      if (data) {
        // Ask to check email for verification
      }
      console.log(data);
    } catch (error) {
      setError({
        level: error.code,
        message: error.message,
      });
    }
  };

  useEffect(() => {
    if (usernameTimeout) {
      clearTimeout(usernameTimeout);
    }

    const newTimeout = setTimeout(async () => {
      if (formData.username.length > 0 && formData.username.length < 4) {
        setError({
          ...error,
          username: {
            level: 5,
            message: "Usernames should be at least 4 characters long",
          },
        });
      } else if (formData.username.length > 3) {
        usernameExists(formData.username).then((found) =>
          setError({
            ...error,
            username: {
              level: found ? 5 : 1,
              message: found
                ? "Username already taken"
                : "Username is available",
            },
          })
        );
      }
    }, 1000);

    setUsernameTimeout(newTimeout);

    return () => {
      clearTimeout(newTimeout);
    };
  }, [formData.username]);

  useEffect(() => {
    if (
      formData.password.length < 8 ||
      formData.username.length < 4 ||
      formData.email.length < 6 ||
      error.username.level > 0 ||
      error.email.level > 0
    ) {
      setReadyToSignUp(false);
    }
  }, [formData]);

  const isDisabled =
    formData.password.length < 8 ||
    formData.username.length < 4 ||
    formData.email.length < 6 ||
    error.username.level > 1 ||
    error.email.level > 1;

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
          Welcome!
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

      <form action="" className={`mt-6 flex flex-col gap-4 w-full`}>
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
            <Stack className={`mt-2`} sx={{ color: "grey.500" }} spacing={2}>
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
          onChange={handleChange}
        />

        <button
          className={`cursor-pointer disabled:cursor-auto p-3 bg-action hover:bg-action/80 disabled:bg-gray-400 rounded-md focus:shadow-xl shadow-primary-dark/30 outline-none text-xs font-bold uppercase text-white disabled:text-white/70 transition-all duration-300`}
          onClick={handleSignUp}
          disabled={isDisabled}
        >
          Register
        </button>
      </form>
      <p className={`mt-8 text-sm font-light text-center text-primary-dark/70`}>
        Already have an account?{" "}
        <Link
          href={"/auth/login"}
          className={`font-normal text-primary-dark hover:text-action transition-all duration-300`}
        >
          Login
        </Link>
      </p>
    </div>
  );
};
export default SignUpForm;
