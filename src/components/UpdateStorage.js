"use client";

import { useEffect } from "react";

import userStore from "@/stores/UserStore";
import { defaultUser } from "@/data/defaultUser";
import { createUser, fetchUser } from "@/utility/dbUtils";
import { verifyUserData } from "@/utility/generalUtils";
import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/utility/localStorageUtils";
import onboardingStore from "@/stores/OnboardingStore";
import { supabase } from "@/config/Supbase";

const UpdateStorage = ({ session }) => {
  useEffect(() => {
    const runCheck = async () => {
      let currentUserData = null;

      if (session) {
        const userID = session.user.id;

        // 0. Check first if a data exists in Storage
        const fromStorage = getFromStorage("userData");
        const lastFetch = getFromStorage("lastFetch", sessionStorage, false);

        // 0a. Verify storage data
        const verified = verifyUserData(fromStorage, false);

        // 0a. Found in Storage. How long since last fetch?
        const timeSinceLastFetch = new Date().getTime() - lastFetch;
        const maxTime = 1000 * 60 * 5;

        // 0a. Not found in Storage.
        if (!fromStorage || !verified || timeSinceLastFetch > maxTime) {
          // 1. check if a user row exists for account
          const data = await fetchUser(userID);

          if (data) return data;
          return await createUser(userID, defaultUser);
        } else {
          return fromStorage;
        }
      } else {
        removeFromStorage("userData");
        removeFromStorage("lastFetch");

        await supabase.auth.signOut();

        // Return false
        return false;
      }
    };

    // Run check
    runCheck().then((result) => {
      if (result) {
        userStore.setUserData(result);
        if (!result.onboarding_complete) onboardingStore.setUserData(result);
      } else {
        userStore.setUserData(defaultUser);
      }

      userStore.ready = true;
      onboardingStore.readyForOnboarding = true;
    });
  }, [session]);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const handleStorageChange = (event) => {
        if (event.storageArea === localStorage && event.key === "userData") {
          const getData = getFromStorage("userData", localStorage);
          userStore.setUserData(getData);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);
};

export default UpdateStorage;
