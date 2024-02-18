﻿"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { observer } from "mobx-react";
import { CircularProgress, LinearProgress, Stack } from "@mui/material";

import userStore from "@/stores/UserStore";
import { categories } from "@/data/CustomisationData";

import PopOffChip from "@/components/PopOffChip";
import PopOffInput from "@/components/PopOffInput";
import PopOffTextArea from "@/components/PopOffTextArea";

import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { usernameExists } from "@/utility/dbUtils";

const AccountPage = observer(() => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [username, setUsername] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(true);
  const [usernameTimeout, setUsernameTimeout] = useState(null);
  const [usernameError, setUsernameError] = useState({
    status: 0,
    message: "",
  });

  const [otherCategoryValue, setOtherCategoryValue] = useState("");
  const [bioProgressColour, setBioProgressColour] = useState("");
  const [newTag, setNewTag] = useState("");
  const [changed, setChanged] = useState(true);

  const [saving, setSaving] = useState(false);

  const userData = userStore.userData;

  const maxBioLength = 150;

  const progressColours = {
    0: "#c68a4e",
    120: "#2F975A",
    151: "#DB2B20",
  };

  const usernameFeedback = {
    0: null,
    1: <ImCross size={8} color={"#DB2B20"} />,
    2: <FaCheck size={10} color={"#c68a4e"} />,
  };

  const { user, isSignedIn, isLoaded } = useUser();

  const handleAvatarSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedAvatar(file);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    userStore.setUserData({
      ...userData,
      category: categories[category].name,
      otherCategory: category < categories.length - 1 ? "" : otherCategoryValue,
    });
  };

  const verifyUsername = async () => {
    if (username === userData.username) {
      setUsernameError({
        status: 0,
        message: "",
      });

      return true;
    }

    if (username.length < 4) {
      setUsernameError({
        status: 1,
        message: "Username is too short",
      });

      return false;
    }

    usernameExists(username).then((r) => {
      if (r) {
        setUsernameError({
          status: 1,
          message: "Username is already taken",
        });

        return false;
      } else {
        setUsernameError({
          status: 2,
          message: "Username is valid",
        });

        return true;
      }
    });

    setUsernameError({
      status: 0,
      message: "",
    });
  };

  useEffect(() => {
    const loadData = async () => {
      if (user && isSignedIn) {
        return await userStore.loadUserData(user.id);
      }
    };

    loadData().then((data) => {
      setUsername(data ? data.username : "");

      let foundCat;

      if (data && data.category.length > 0) {
        foundCat = categories.findIndex((cat) => cat.name === data.category);

        setSelectedCategory(foundCat);
        setOtherCategoryValue(data ? data.otherCategory : "");
      }
    });
  }, [user, isSignedIn, isLoaded]);

  useEffect(() => {
    setCheckingUsername(true);

    if (usernameTimeout) {
      clearTimeout(usernameTimeout);
    }

    const newTimeout = setTimeout(() => {
      verifyUsername().then(() => setCheckingUsername(false));
    }, 1000);

    setUsernameTimeout(newTimeout);

    return () => {
      clearTimeout(newTimeout);
    };
  }, [username]);

  return (
    <article className="relative w-full h-full rounded-none lg:rounded-lg sm:overflow-hidden">
      <div className="flex flex-col w-full h-full text-primary-dark dark:text-primary-light">
        <section
          className={`px-2 xs:px-3 py-5 sm:p-6 pb-2 lg:pb-4 flex justify-between items-center w-full border-b-2 border-secondary-dark/20`}
        >
          <h1 className="text-xl font-bold">My Account</h1>
          {isLoaded ? (
            saving ? (
              <Stack sx={{ color: "grey.500" }} spacing={2}>
                <CircularProgress color="inherit" size={15} />
              </Stack>
            ) : (
              <button
                className={`px-4 py-1 bg-action rounded-full text-primary-light transition-all duration-300 ${
                  changed ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => {
                  if (usernameError.status === 2) {
                    userStore.setUserData({ ...userData, username: username });
                  }

                  setUsernameError({
                    status: 0,
                    message: "",
                  });

                  setUsername(userData.username);

                  setSaving(true);
                  userStore.saveUserData(user.id).then((r) => {
                    setTimeout(() => {
                      setSaving(false);
                    }, 500);
                  });
                }}
              >
                Save Changes
              </button>
            )
          ) : null}
        </section>
        {isLoaded ? null : (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        )}
        {isLoaded && (
          <section className="px-2 xs:px-3 py-5 sm:p-6 w-full min-h-full bg-dashboard-secondary-light dark:bg-dashboard-secondary-dark sm:overflow-y-auto">
            <section
              className={`relative px-2 pt-6 pb-8 xs:px-4 flex flex-col md:flex-row gap-4 sm:gap-8 w-full bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-lg xs:rounded-xl shadow-md shadow-dashboard-primary-dark/10`}
            >
              <article className="relative xs:min-w-80 max-w-full">
                <div className={`flex gap-0`}>
                  <h4 className="text-sm xs:text-base md:text-xl font-semibold">
                    mypopoff.com/
                  </h4>
                  <PopOffInput
                    name="username"
                    label="choose your username"
                    className="ml-1 flex-grow"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <div className={`absolute -bottom-5 right-0`}>
                    {checkingUsername ? (
                      <Stack sx={{ color: "grey.500" }} spacing={2}>
                        <CircularProgress color="inherit" size={10} />
                      </Stack>
                    ) : (
                      <p
                        className={`flex items-center gap-2 text-xs text-action`}
                        style={{
                          color:
                            usernameError.status === 1 ? "#DB2B20" : "#c68a4e",
                        }}
                      >
                        {usernameFeedback[usernameError.status]}
                        {usernameError.message}
                      </p>
                    )}
                  </div>
                </div>
              </article>
              {/*<p*/}
              {/*  className={`flex-grow text-xs opacity-50 hover:opacity-100 transition-all duration-300`}*/}
              {/*>*/}
              {/*  <span className={`font-bold uppercase`}>Note:</span> Although*/}
              {/*  you can change your username freely, it will take time for your*/}
              {/*  pop off to be found after any new changes.*/}
              {/*</p>*/}
            </section>

            <section
              className={`mt-4 px-2 pt-6 pb-4 xs:px-4 flex flex-col md:flex-row gap-4 sm:gap-8 w-full bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-lg xs:rounded-xl shadow-md shadow-dashboard-primary-dark/10`}
            >
              <article className={`xs:min-w-80 max-w-full`}>
                <PopOffTextArea
                  name="bio"
                  label="your bio description"
                  value={userData.bio}
                  rows={5}
                  onChange={(e) => {
                    const threshold = Object.keys(progressColours).findLast(
                      (key) => e.target.value.length >= key,
                    );

                    setBioProgressColour(
                      progressColours[threshold] || "#5FD378",
                    );

                    userStore.setUserData({ ...userData, bio: e.target.value });
                  }}
                />
                <div
                  className={`py-1 flex justify-end items-center gap-2 transition-all duration-500`}
                >
                  <p className={`text-sm text-right`}>
                    {userData.bio.length} / {maxBioLength}
                  </p>
                  <CircularProgress
                    variant="determinate"
                    size={15}
                    thickness={6}
                    style={{
                      color: bioProgressColour,
                      width: userData.bio.length === 0 ? 0 : "18px",
                      transition: "all 0.3s ease",
                    }}
                    // styles={{ @apply text-action}}
                    value={Math.min(
                      (userData.bio.length * 100) / maxBioLength,
                      100,
                    )}
                  />
                </div>
              </article>
              <article className={`flex-grow`}>
                {[
                  "Google recommends that a bio description be between 120 to 150 characters long",
                  "Let your personality shine through your bio description",
                  "Direct your bio description to your target audience",
                ].map((entry, index) => (
                  <p
                    key={`hints-${index}`}
                    className={`mb-4 text-xs font-light opacity-50 hover:opacity-100 transition-all duration-300`}
                  >
                    <span className={`font-bold uppercase`}>Hint:</span> {entry}
                  </p>
                ))}
              </article>
            </section>
            <section
              className={`mt-4 py-4 px-1 xs:p-4 bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-xl shadow-md shadow-dashboard-primary-dark/10`}
            >
              <article className="mx-auto flex flex-col gap-3 w-full">
                <h4 className="text-base text-center md:text-left">
                  Which category best suits your PopOff?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-stretch flex-wrap">
                  {categories.map((category, index) => (
                    <PopOffChip
                      key={index}
                      label={category.name}
                      icon={category.icon(index, selectedCategory)}
                      selected={selectedCategory === index}
                      onClick={() => handleSelectCategory(index)}
                    />
                  ))}

                  {selectedCategory === categories.length - 1 && (
                    <div className={`my-3`}>
                      <PopOffInput
                        name="otherCategory"
                        label="Other Category*"
                        value={userData.otherCategory}
                        onChange={(event) => {
                          setOtherCategoryValue(event.target.value);
                          userStore.setUserData({
                            ...userData,
                            otherCategory: event.target.value,
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
              </article>
            </section>
            <section
              className={`mt-4 md:mb-20 py-4 px-1 xs:p-4 bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-xl shadow-md shadow-dashboard-primary-dark/10`}
            >
              <article className="mx-auto flex flex-col gap-3 w-full">
                <h4 className="text-base text-center md:text-left">
                  How about adding some tags?
                </h4>
                {userData.tags.length > 0 && (
                  <div className={`mb-2 flex flex-wrap gap-1`}>
                    {userData.tags.map((tag, index) => (
                      <div
                        key={`chip-${index}`}
                        className={`group px-3 py-0.5 flex items-center gap-2 border-[1px] border-dashboard-secondary-dark dark:border-dashboard-secondary-light rounded-full transition-all duration-300`}
                      >
                        <p className={`text-sm`}>{tag}</p>
                        <ImCross
                          size={10}
                          className={`cursor-pointer text-dashboard-secondary-dark dark:text-dashboard-secondary-light hover:text-rose-700`}
                          onClick={() => {
                            userData.tags.splice(index, 1);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className={`flex flex-wrap gap-4`}>
                  <PopOffInput
                    name="newTag"
                    label="add a new tag..."
                    value={newTag}
                    className={`flex-grow`}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                  <button
                    className={`px-4 py-1 bg-action rounded-full text-primary-light`}
                    onClick={() => {
                      if (
                        newTag.length > 2 &&
                        userData.tags.indexOf(newTag) === -1
                      ) {
                        userStore.setUserData({
                          ...userData,
                          tags: [...userData.tags, newTag],
                        });
                        setNewTag("");
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              </article>
            </section>
          </section>
        )}
      </div>
    </article>
  );
});

export default AccountPage;
