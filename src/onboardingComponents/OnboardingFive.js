"use client";

import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { getFromStorage, saveToStorage } from "@/utility/localStorageUtils";
import { updateUser } from "@/utility/dbUtils";

const OnboardingFive = observer((props) => {
  const router = useRouter();

  const endOnboarding = async () => {
    const getUser = getFromStorage("userData");

    const saveData = {
      ...getUser,
      onboarding_complete: true,
    };

    if (getUser) {
      await updateUser(getUser.uid, saveData);
      saveToStorage("userData", saveData);
    }

    router.push("/me/dashboard");
  };

  useEffect(() => {
    setTimeout(async () => {
      await endOnboarding();
    }, 4000);
  }, []);

  return (
    <section className={`my-6 text-center`}>
      <h1 className={`mb-6 text-2xl sm:text-4xl font-bold`}>
        🎉 That's it! 🎉
      </h1>
      <h2 className={`text-base sm:text-xl`}>You're all done for now.</h2>
    </section>
  );
});

export default OnboardingFive;
