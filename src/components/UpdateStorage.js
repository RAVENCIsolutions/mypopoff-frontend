"use client";

import { useEffect } from "react";

import userStore from "@/stores/UserStore";
import { defaultUser } from "@/data/defaultUser";
import { createUser, fetchUser } from "@/utility/dbUtils";

const verifyData = (data) => {
  if (typeof data !== "object" || data === null) return false;

  const checks = [
    { key: "uid", type: "string" },
    { key: "username", type: "string" },
    { key: "bio", type: "string" },
    { key: "tagline", type: "string" },
    { key: "category", type: "string" },
    { key: "otherCategory", type: "string" },
    { key: "tags", type: "object" },
    { key: "onboarding_complete", type: "boolean" },
    { key: "page_layout", type: "string" },
    { key: "button_style", type: "string" },
    { key: "palette", type: "object" },
    { key: "avatar_url", type: "string" },
    { key: "images", type: "string" },
    { key: "public", type: "boolean" },
    { key: "links", type: "object" },
  ];

  for (const check of checks) {
    const value = data[check.key];

    if (typeof value !== check.type) return false;
  }

  return true;
};

const UpdateStorage = ({ session }) => {
  useEffect(() => {
    const runCheck = async () => {
      if (session) {
        // 1. check if a user row exists for account
        const userExists = await fetchUser(session.user.id);
        let newUser = null;

        // 1a. if no user, create a new user row
        if (!userExists) {
          newUser = await createUser(session.user.id, {
            ...defaultUser,
          });
        }

        // 1b. if found user, go to 2
        // 2. check if a userData item exists in sessionStorage or localStorage
        let userData =
          sessionStorage.getItem("userData") ||
          localStorage.getItem("userData") ||
          null;

        if (!userData || !verifyData(JSON.parse(userData))) {
          sessionStorage.removeItem("userData");
          localStorage.removeItem("userData");
          userData = null;
        }

        if (userData === null) {
          // 2a. if neither, create a new userData item in sessionStorage
          sessionStorage.setItem(
            "userData",
            JSON.stringify(userExists || newUser || defaultUser)
          );

          userData = JSON.parse(sessionStorage.getItem("userData"));
        }

        // 2b. if yes, go to 3
        // 3. load the user data from sessionStorage or localStorage to MobX Store
        return userData;
      }
    };

    runCheck().then((result) => {
      userStore.setUserData(result);
    });
  }, [session]);
};

export default UpdateStorage;
