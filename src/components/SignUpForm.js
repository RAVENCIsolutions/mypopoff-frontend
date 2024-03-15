"use client";

import MPOLetterMark from "@/components/MPOLetterMark";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Stack } from "@mui/material";

import { supabase } from "@/config/Supbase";
import { createUser, usernameExists } from "@/utility/dbUtils";

import AuthText from "@/components/AuthText";
import AuthPassword from "@/components/AuthPassword";
import AuthUsername from "@/components/AuthUsername";
import AuthSelect from "@/components/AuthSelect";

import { defaultUser } from "@/data/defaultUser";
import { ageBrackets, genders } from "@/data/PersonalData";

import country from "country-list-js";

const SignUpForm = () => {
  // States
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameTimeout, setUsernameTimeout] = useState(null);

  const [countryData, setCountryData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isLongEnough, setIsLongEnough] = useState(false);
  const [hasCases, setHasCases] = useState(false);
  const [hasNumbers, setHasNumbers] = useState(false);

  const [signingUp, setSigningUp] = useState(false);
  const [completeSignUp, setCompleteSignUp] = useState(false);

  const [readyToSignUp, setReadyToSignUp] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",

    name: "",
    age: "",
    country: "",
    gender: "",
    phone: "",
    city: "",
  });

  const [selectedGender, setSelectedGender] = useState("");

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

    setReadyToSignUp(false);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setSigningUp(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_HOME_ROUTE}/auth/callback`,
        },
      });

      if (error) {
      }

      if (data) {
        const newUser = {
          ...defaultUser,
          uid: data.user.id,
          username: formData.username,
          extras: {
            name: formData.name,
            age: formData.age,
            gender: formData.gender,
            country: formData.country,
            city: formData.city,
            phone: formData.phone,
          },
        };

        await createUser(data.user.id, newUser);

        setSigningUp(false);
        setCompleteSignUp(true);
      }
    } catch (error) {
      setError({
        level: error.code,
        message: error.message,
      });
    }

    router.refresh();
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
        const found = await usernameExists(formData.username);
        setError({
          ...error,
          username: {
            level: found ? 5 : 1,
            message: found ? "Username already taken" : "Username is available",
          },
        });
      }
    }, 1000);

    setUsernameTimeout(newTimeout);

    return () => {
      clearTimeout(newTimeout);
    };
  }, [formData.username]);

  useEffect(() => {
    // check password, username and email validity
    if (
      isLongEnough &&
      hasCases &&
      hasNumbers &&
      formData.username.length > 3 &&
      formData.email.length > 5 &&
      error.username.level < 2 &&
      error.email.level < 1 &&
      formData.name.length > 0 &&
      formData.age.length > 0 &&
      formData.country.length > 0 &&
      formData.gender.length > 0
    ) {
      setReadyToSignUp(true);
    } else {
      setReadyToSignUp(false);
    }
  }, [formData, error]);

  useEffect(() => {
    const getCountries = country
      .names()
      .sort()
      .map((item) => ({
        label: item,
        value: item,
      }));
    setCountryData(getCountries);

    setLoading(false);
  }, []);

  return (
    <div
      className={`px-3 2xs:px-5 py-12 sm:p-8 w-full xs:max-w-md h-fit bg-white rounded-none xs:rounded-2xl shadow-xl shadow-primary-dark/5 overflow-y-auto sm:overflow-y-visible`}
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
          {loading ? (
            <section className={`m-4 flex items-center justify-center`}>
              <Stack sx={{ color: "#c68a4e" }} spacing={2}>
                <CircularProgress color="inherit" size={20} />
              </Stack>
            </section>
          ) : (
            <section className={`mt-6 flex flex-col gap-4 w-full`}>
              <article className={`relative`}>
                <AuthUsername
                  label={`Username*`}
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

                    const sanitisedValue = event.target.value.replace(
                      /[^a-zA-Z0-9-]/g,
                      ""
                    );
                    setReadyToSignUp(false);

                    setFormData({
                      ...formData,
                      username: sanitisedValue,
                    });
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
                label={`Email address*`}
                name={`email`}
                value={formData.email}
                error={error.email}
                onChange={handleChange}
              />
              <AuthPassword
                label={`Password*`}
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
              <AuthText
                label={`Name*`}
                name={`name`}
                value={formData.name}
                error={error.name}
                onChange={handleChange}
              />

              <AuthSelect
                label={"Age*"}
                name={"age"}
                value={countryData.find(
                  (option) => option.value === formData.age
                )}
                onChange={(choice) =>
                  setFormData({ ...formData, age: choice.value })
                }
                options={ageBrackets}
              />
              <AuthSelect
                label={`Gender*`}
                name={`gender`}
                value={genders.find(
                  (option) => option.value === selectedGender
                )}
                options={genders}
                onChange={(choice) => {
                  setSelectedGender(choice.value);

                  if (choice.value === "Other") {
                    setFormData({ ...formData, gender: "" });
                  } else {
                    setFormData({ ...formData, gender: choice.value });
                  }
                }}
                autoComplete={true}
              />
              {selectedGender === "Other" && (
                <AuthText
                  label={`Please specify Other Gender*`}
                  name={`other-gender`}
                  value={formData.gender}
                  onChange={(event) =>
                    setFormData({ ...formData, gender: event.target.value })
                  }
                />
              )}
              <AuthSelect
                label={`Country*`}
                name={`country`}
                value={countryData.find(
                  (option) => option.value === formData.country
                )}
                options={countryData}
                onChange={(choice) =>
                  setFormData({ ...formData, country: choice.value })
                }
                autoComplete={true}
              />
              <AuthText
                label={`City`}
                name={`city`}
                value={formData.city}
                error={error.city}
                onChange={handleChange}
              />
              <AuthText
                label={`Phone`}
                name={`phone`}
                type={"tel"}
                value={formData.phone}
                error={error.phone}
                onChange={handleChange}
              />

              <button
                className={`cursor-pointer disabled:cursor-auto p-3 bg-action hover:bg-action/80 disabled:bg-gray-400 rounded-md focus:shadow-xl shadow-primary-dark/30 outline-none text-xs font-bold uppercase text-white disabled:text-white/70 transition-all duration-300`}
                onClick={handleSignUp}
                disabled={!readyToSignUp || signingUp}
              >
                {signingUp ? "Signing You Up ..." : "Register"}
              </button>
            </section>
          )}

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
export default SignUpForm;
