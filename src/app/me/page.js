"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { LinearProgress, Stack } from "@mui/material";

import { observer } from "mobx-react";
import userStore from "@/stores/UserStore";
import { getFromLocalStorage } from "@/utility/localStorageUtils";

const Me = observer(() => {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const currentUser = userStore.userData;

  useEffect(() => {
    const handleUserRedirection = async () => {
      if (isSignedIn) {
        userStore.setUser(user.id);

        // Fetch user data and create if it doesn't exist
        await userStore.loadUserData(user.id);

        // redirect to onboarding if not completed yet
        // const redirectPath = currentUser.onboarding_complete
        //   ? "/me/dashboard"
        //   : "/onboarding";
        // router.push(redirectPath);

        const lastPage = getFromLocalStorage("lastPage") || "/me/dashboard";

        router.push(lastPage);
      }
    };

    handleUserRedirection().then(() => {});
  }, [user, isSignedIn, isLoaded]);

  return (
    <main className="w-full h-full rounded-lg">
      <div className="flex flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-5 md:p-6 w-full h-full rounded-sm bg-dashboard-primary-light dark:bg-dashboard-primary-dark">
          <h2 className="mb-2 md:mb-2 pb-2 md:pb-4 text-xl w-full">
            Welcome{currentUser.username ? " " + currentUser.username : ""}!
          </h2>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        </section>
      </div>
    </main>
  );
});

export default Me;
