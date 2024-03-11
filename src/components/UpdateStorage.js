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

const UpdateStorage = ({ session }) => {
  useEffect(() => {
    const runCheck = async () => {
      if (session) {
        const userID = session.user.id;
        let currentUserData = null;

        // 0. Check first if a data exists in Storage
        const lastFetch = getFromStorage("lastFetch", sessionStorage, false);

        // 0a. If not, or last fetch is more than 5 minutes old, load data from database
        if (!lastFetch || new Date().getTime() - lastFetch > 1000 * 60 * 5) {
          // 1. check if a user row exists for account
          const data = await fetchUser(userID);

          // 1a. If not, create a new user row
          if (!data) {
            currentUserData = await createUser(userID, defaultUser);

            // 1b. if yes, load data
          } else {
            currentUserData = data;
          }

          // Save data to Storage
          saveToStorage("userData", currentUserData);

          // Update last fetch
          saveToStorage(
            "lastFetch",
            new Date().getTime(),
            sessionStorage,
            false
          );

          // 0b. If yes, load data from Storage
        } else {
          currentUserData = getFromStorage("userData");
        }

        // Return user data
        return currentUserData;
      } else {
        removeFromStorage("userData");
        removeFromStorage("lastFetch");

        // Return false
        return false;
      }
    };

    // Run check
    runCheck().then((result) => {
      if (result) {
        result = verifyUserData(result);
        console.log(result);

        userStore.setUserData(
          typeof result === "string" ? JSON.parse(result) : result
        );
      } else {
        userStore.setUserData({});
      }

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
