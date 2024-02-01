"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import userStore from "@/stores/UserStore";

const AccountPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    category: "",
    tags: [],

    avatar_url: "",

    email: "",
    password: "",
  });

  const userData = userStore.userData;
  const { user, isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const fillData = async () => {
      if (isSignedIn) {
        const dbData = await userStore.loadUserData(user.id);

        console.log(dbData);

        setFormData({
          ...formData,
          username: dbData.username,
          category: dbData.category,
          tags: dbData.tags,

          avatar_url: dbData.avatar_url,

          email: user.primaryEmailAddress.emailAddress,
        });
      }
    };

    fillData().then(() => {});
  }, [user, isSignedIn]);

  return (
    <article className="relative w-full h-full rounded-none lg:rounded-lg sm:overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="px-3 py-5 sm:p-6 w-full min-h-full bg-dashboard-secondary-light dark:bg-dashboard-secondary-dark sm:overflow-y-auto">
          <h2 className="pb-2 lg:pb-4 mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Account
          </h2>
          <section className={``}></section>
        </section>
      </div>
    </article>
  );
};

export default AccountPage;
