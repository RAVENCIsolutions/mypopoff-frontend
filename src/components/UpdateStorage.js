"use client";

import { useEffect } from "react";

import { defaultUser } from "@/data/defaultUser";
import { createUser, fetchUser } from "@/utility/dbUtils";
import { verifyUserData } from "@/utility/generalUtils";
import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/utility/localStorageUtils";

import { processLogOut } from "@/utility/userUtils";

const UpdateStorage = ({ session }) => {
  useEffect(() => {
    const runCheck = async () => {
      if (session) {
        const userID = session.user.id;

        // 0. Check first if a data exists in Storage
        const fromStorage = getFromStorage("userData");
        const storedLoginSession = getFromStorage("loginSession");

        // 0a. Verify storage data
        const verified = verifyUserData(fromStorage, false);

        // 0a. Found in Storage. How long since last fetch?
        const timeSinceLastFetch =
          new Date().getTime() - storedLoginSession.lastFetch;
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
        removeFromStorage("loginSession");

        processLogOut().then();

        // Return false
        return false;
      }
    };

    // Run check
    runCheck().then((result) => {
      if (result) {
        saveToStorage("userData", result);

        const storedLoginSession = getFromStorage("loginSession");
        storedLoginSession.lastFetch = new Date().getTime();
        saveToStorage("loginSession", storedLoginSession);
      } else {
        processLogOut().then();
      }
    });
  }, [session]);
};

export default UpdateStorage;
