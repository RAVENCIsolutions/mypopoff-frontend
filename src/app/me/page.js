"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { observer } from "mobx-react";
import { LinearProgress, Stack } from "@mui/material";

import userStore from "@/stores/UserStore";
import { getFromLocalStorage } from "@/utility/localStorageUtils";

const Me = observer(() => {
  const [currentUser, setCurrentUser] = useState({});

  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleUserRedirection = async () => {
      if (isSignedIn) {
        userStore.loadUserData(user.id).then(() => {
          const lastPage = getFromLocalStorage("lastPage") || "/me/dashboard";
          router.push(lastPage);
        });
      }
    };

    handleUserRedirection().then(() => {});
  }, [user, isSignedIn, isLoaded]);

  return (
    <main className="w-full h-full rounded-lg">
      <div className="flex flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-5 md:p-6 w-full h-full rounded-sm bg-dashboard-primary-light dark:bg-dashboard-primary-dark">
          <h2 className="mb-2 md:mb-2 pb-2 md:pb-4 text-xl w-full">Welcome!</h2>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        </section>
      </div>
    </main>
  );
});

export default Me;
