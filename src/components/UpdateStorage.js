"use client";

import { useEffect } from "react";

import { defaultUser } from "@/data/defaultUser";
import { createUser, fetchUser } from "@/utility/dbUtils";
import { verifyUserData } from "@/utility/generalUtils";
import {
  getFromStorage,
  getLatestModified,
  getLatestSession,
  getRememberMe,
  removeFromStorage,
  saveToStorage,
} from "@/utility/localStorageUtils";

import { processLogOut } from "@/utility/userUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const UpdateStorage = ({ session }) => {
  const supabase = createClientComponentClient();

  useEffect(() => {
    const runCheck = async () => {
      if (session) {
        const userID = session.user.id;

        // 0. Attempt to get user data
        const user = await supabase
          .from("users")
          .select()
          .eq("uid", userID)
          .single();

        // 0a. If user not found, process logout
        if (!user) processLogOut().then();

        // 0b. Verify storage data
        const verifiedUser = verifyUserData(user, true);

        // 1. Found Data. How long since latest login and modification?
        const remember = getRememberMe();
        const latestSession = getLatestSession();
        const lastModified = getLatestModified();

        // 1a. No login session. Process logout
        if (!latestSession) processLogOut().then();

        // 1b. Login session found. How long since latest login and modification?
        if (latestSession) {
          const timeSinceLastLogin = new Date().getTime() - latestSession;
          const timeSinceLastLoginInHours =
            timeSinceLastLogin / (1000 * 60 * 60);

          const timeSinceLastModified = new Date().getTime() - lastModified;
          const timeSinceLastModifiedInHours =
            timeSinceLastModified / (1000 * 60 * 60);

          // 1c. Asked to Remember? Keep. Otherwise, if inactive for over 0.5, logout
          if (!remember) {
            if (
              timeSinceLastLoginInHours > 0.5 &&
              timeSinceLastModifiedInHours > 0.5
            )
              processLogOut().then();
          }
        }

        // 2. All is in order
        return verifiedUser;
      } else {
        processLogOut().then();
        return false;
      }
    };

    // Run check
    runCheck().then((result) => {
      if (!result) {
        processLogOut().then();
      }
    });
  }, [session]);
};

export default UpdateStorage;
