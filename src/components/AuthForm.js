"use client";

import AuthText from "@/components/AuthText";
import Link from "next/link";
import MPOLetterMark from "@/components/MPOLetterMark";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [readyToContinue, setReadyToContinue] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const supabase = createClientComponentClient();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCheck = () => {};

  useEffect(() => {
    if (email.length > 5) {
      setReadyToContinue(true);
    } else {
      setReadyToContinue(false);
    }
  }, [email]);

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
          Welcome to My Pop Off
        </h1>
        <p className={`text-base text-center text-primary-dark/50`}>
          Please enter your email to start.
        </p>
      </article>

      <section className={`mt-6 flex flex-col gap-4 w-full`}>
        <AuthText
          label={`Email address*`}
          name={`email`}
          value={email}
          onChange={handleChange}
        />

        <button
          className={`cursor-pointer disabled:cursor-auto p-3 bg-action hover:bg-action/80 disabled:bg-gray-400 rounded-md focus:shadow-xl shadow-primary-dark/30 outline-none text-xs font-bold uppercase text-white disabled:text-white/70 transition-all duration-300`}
          onClick={handleCheck}
          disabled={!readyToContinue || isChecking}
        >
          {isChecking ? "Loading ..." : "Continue"}
        </button>
      </section>
    </>
  );
};

export default AuthForm;
