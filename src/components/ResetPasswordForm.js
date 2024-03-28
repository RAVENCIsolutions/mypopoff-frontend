"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import styled from "@emotion/styled";

import MPOLetterMark from "@/components/MPOLetterMark";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthPassword from "@/components/AuthPassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDangerous, MdOutlineLock } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

const FormField = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FormInput = styled.input`
  padding: 0.5rem 2.75rem 0.5rem 1.75rem;
  border-radius: 0.375rem;

  outline: none;

  transition: all 0.3s ease;
`;

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  //  States
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });
  const [showError, setShowError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [readyToSignUp, setReadyToSignUp] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(false);
  const [hasCases, setHasCases] = useState(false);
  const [hasNumbers, setHasNumbers] = useState(false);

  const [expired, setExpired] = useState(searchParams.get("error"));
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    // check password, username and email validity
    if (isLongEnough && hasCases && hasNumbers) {
      setReadyToSignUp(true);
    } else {
      setReadyToSignUp(false);
    }
  }, [formData]);

  return (
    <>
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

      {expired ? (
        <section className={`mt-6`}>
          <p
            className={`text-sm text-center text-primary-dark/80 font-bold italic`}
          >
            Oops. It looks like your link has expired.{" "}
            <Link href={"/auth/login"} className={`text-action font-bold`}>
              Click here to try again.
            </Link>
          </p>
        </section>
      ) : resetSuccess ? (
        <section className={`mt-6`}>
          <p className={`text-base text-center text-primary-dark/80`}>
            🎉 Congrats! 🎉
          </p>
          <p className={`text-base text-center text-primary-dark/80`}>
            You can now{" "}
            <Link href={"/auth/login"} className={`text-action font-bold`}>
              login
            </Link>{" "}
            with your new password!
          </p>
        </section>
      ) : (
        <>
          <article className={`mt-6 flex flex-col gap-4 w-full`}>
            <AuthPassword
              label={`Password`}
              name={`password`}
              value={formData.password}
              onChange={(event) => {
                setShowError("");
                setReadyToSignUp(false);

                const newValue = event.target.value;

                setFormData({
                  ...formData,
                  password: newValue,
                });

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

            <FormField className={`w-full`}>
              <label
                htmlFor="password_confirmation"
                className={`text-sm font-light text-primary-dark`}
              >
                Confirm New Password
              </label>
              <section className={`relative w-full`}>
                <FormInput
                  id={`password_confirmation`}
                  name={`password_confirmation`}
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.password_confirmation}
                  onChange={(event) => {
                    setShowError("");

                    setFormData({
                      ...formData,
                      password_confirmation: event.target.value,
                    });
                  }}
                  className={`w-full border-[1px] focus:shadow-xl shadow-primary-dark/30 border-black/15 hover:border-action focus:border-action`}
                />
                <MdOutlineLock
                  className={`absolute top-1/2 left-2 -translate-y-1/2 ${
                    formData.password_confirmation.length > 0
                      ? "text-primary-dark dark:text-primary-light"
                      : "text-primary-dark/50 dark:text-primary-light/50 group-hover:text-primary-dark group-hover:dark:text-primary-light"
                  } transition-all duration-300`}
                />
                <div
                  className={`cursor-pointer absolute top-1/2 -translate-y-1/2 right-4`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </section>
            </FormField>

            {showError && (
              <div
                className={`mb-2 p-1.5 flex items-center gap-2 w-full bg-danger/20 text-danger`}
              >
                <MdDangerous size={17} />
                <p className={`text-xs`}>Oops. Passwords don't match.</p>
              </div>
            )}

            <button
              className={`cursor-pointer disabled:cursor-auto p-3 bg-action hover:bg-action/80 disabled:bg-gray-400 rounded-md focus:shadow-xl shadow-primary-dark/30 outline-none text-xs font-bold uppercase text-white disabled:text-white/70 transition-all duration-300`}
              disabled={!readyToSignUp}
              onClick={async () => {
                if (formData.password !== formData.password_confirmation) {
                  setShowError("Passwords don't match. Try again.");
                } else {
                  const { data, resetData, error } =
                    await supabase.auth.updateUser({
                      password: formData.password,
                    });

                  if (resetData) {
                    setResetSuccess(true);
                  }

                  if (error) setShowError(error.message);
                }
              }}
            >
              Update Password
            </button>

            <p
              className={`mt-2 text-sm font-light text-center text-primary-dark/70`}
            >
              Don't need to reset?{" "}
              <Link
                href={"/auth/login"}
                className={`font-normal text-primary-dark hover:text-action transition-all duration-300`}
              >
                Go back to Login
              </Link>
            </p>
          </article>
        </>
      )}
    </>
  );
};

export default ResetPasswordForm;
