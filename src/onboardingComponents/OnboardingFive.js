"use client";

import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const OnboardingFive = observer((props) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/me/dashboard");
    }, 4000);
  }, []);

  return (
    <section className={`my-6 text-center`}>
      <h1 className={`mb-6 text-2xl sm:text-4xl font-bold`}>
        🎉 That's it! 🎉
      </h1>
      <h2 className={`text-base sm:text-xl`}>
        Just adding some finishing touches and you'll be redirected to your new
        dashboard.
      </h2>
    </section>
  );
});

export default OnboardingFive;
