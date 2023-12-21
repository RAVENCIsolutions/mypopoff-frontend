"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import userStore from "@/stores/UserStore";

export default function AuthRedirect() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("We are here!");

    const handleUserRedirection = async () => {
      // Redirect to sign-in page if user is not signed in
      if (isLoaded && !user) {
        console.log("Oops, not signed in!");

        router.push("/login");
        return;
      }

      if (isSignedIn) {
        console.log("Woohoo! We are signed in.");

        // Fetch user data and create if it doesn't exist
        const result = await userStore.fetchUser(user.id);

        if (result.error) {
          console.error(`Error handling user data: ${result.error.message}`);
          return;
        }

        const redirectPath = userStore.userData.onboarding_completed
          ? "/me"
          : "/onboarding";
        router.push(redirectPath);
      }
    };

    handleUserRedirection().then(() => {});
  }, [user, isSignedIn, isLoaded]);

  return <>Loading...</>;
}
