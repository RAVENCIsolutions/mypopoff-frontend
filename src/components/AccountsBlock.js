"use client";

import { useEffect, useState } from "react";

import { CircularProgress, LinearProgress, Stack } from "@mui/material";

import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

import { processLogOut } from "@/utility/userUtils";
import { updateUser, usernameExists } from "@/utility/dbUtils";
import { getFromStorage, saveToStorage } from "@/utility/localStorageUtils";

import PopOffChip from "@/components/PopOffChip";
import PopOffInput from "@/components/PopOffInput";
import PopOffTextArea from "@/components/PopOffTextArea";
import { categories } from "@/data/CustomisationData";

const AccountsBlock = ({ session }) => {
  const [readyToSave, setReadyToSave] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const [checkingUsername, setCheckingUsername] = useState(true);
  const [usernameTimeout, setUsernameTimeout] = useState(null);
  const [usernameError, setUsernameError] = useState({
    status: 0,
    message: "",
  });

  const [otherCategoryValue, setOtherCategoryValue] = useState("");
  const [bioProgressColour, setBioProgressColour] = useState("");
  const [changed, setChanged] = useState(true);

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

  useEffect(() => {
    if (session) {
      const storedUserData = getFromStorage("userData");
      const storedLoginSession = getFromStorage("loginSession");

      if (!storedLoginSession) processLogOut().then();

      const timeSinceLastModified =
        new Date().getTime() - storedLoginSession.lastModified;
      const timeSinceLastModifiedInHours =
        timeSinceLastModified / (1000 * 60 * 60);

      if (!storedLoginSession.rememberMe) {
        if (timeSinceLastModifiedInHours > 0.5) processLogOut().then();
      }

      if (!storedUserData) {
        console.log("No user data found");
        processLogOut().then();
      } else {
        setUsername(storedUserData.username);
        setBio(storedUserData.bio);
        setSelectedCategories(storedUserData.categories || []);
        setTags(storedUserData.tags || []);

        if (!storedUserData.categories.includes("Other.."))
          setOtherCategoryValue("");

        const threshold = Object.keys(progressColours).findLast(
          (key) => storedUserData.bio.length >= key
        );

        setBioProgressColour(progressColours[threshold] || "#5FD378");
        setIsLoaded(true);
      }
    }
  }, []);

  const handleSelectCategory = (category) => {
    const activeCategories = selectedCategories;
    const thisCategory = categories[category].name;

    if (activeCategories.includes(thisCategory)) {
      activeCategories.splice(activeCategories.indexOf(thisCategory), 1);
    } else {
      activeCategories.push(thisCategory);
    }

    let thisOtherCategory = "";

    if (!activeCategories.includes("Other..")) {
      thisOtherCategory = "";
    } else {
      thisOtherCategory = otherCategoryValue;
    }

    setOtherCategoryValue(thisOtherCategory);
    setSelectedCategories([...activeCategories]);
  };

  const completeSave = async () => {
    if (readyToSave) {
      const saveData = {
        ...getFromStorage("userData"),
        username: username,
        bio: bio,
        categories: selectedCategories,
        otherCategory: otherCategoryValue,
        tags: tags,
      };

      await updateUser(session.user.id, saveData)
        .then(() => {
          saveToStorage("userData", {
            ...getFromStorage("userData"),
            ...saveData,
          });

          const loginSession = getFromStorage("loginSession");
          loginSession.lastModified = new Date().getTime();

          saveToStorage("loginSession", loginSession);

          setTimeout(() => {
            setSaving(false);
          }, 500);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const verifyUsername = async () => {
    if (username === getFromStorage("userData").username) {
      setUsernameError({
        status: 0,
        message: "",
      });

      setReadyToSave(true);
      return true;
    }

    if (username.length < 4) {
      setUsernameError({
        status: 1,
        message: "Username is too short",
      });

      setReadyToSave(false);
      return false;
    }

    if (username.slice(-1) === "-") {
      setUsernameError({
        status: 1,
        message: "Username cannot end with a dash",
      });

      setReadyToSave(false);
      return false;
    }

    usernameExists(username).then((r) => {
      if (r) {
        setUsernameError({
          status: 1,
          message: "Username is already taken",
        });

        setReadyToSave(false);
        return false;
      } else {
        setUsernameError({
          status: 2,
          message: "Username is valid",
        });

        setReadyToSave(true);
        return true;
      }
    });

    setUsernameError({
      status: 0,
      message: "",
    });
  };

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
    <div className="flex flex-col w-full h-full text-primary-dark dark:text-primary-light">
      <section
        className={`px-2 xs:px-3 py-5 sm:p-6 pb-2 lg:pb-4 flex justify-between items-center w-full border-b-2 border-secondary-dark/20`}
      >
        <h1 className="text-xl font-bold">My Account</h1>
        {saving ? (
          <Stack sx={{ color: "grey.500" }} spacing={2}>
            <CircularProgress color="inherit" size={15} />
          </Stack>
        ) : (
          <button
            className={`px-4 py-1 bg-action rounded-full text-primary-light transition-all duration-300 ${
              changed ? "opacity-100" : "opacity-50"
            }`}
            onClick={async () => {
              if (usernameError.status === 1) {
                setUsername(getFromStorage("userData").username);
              }

              setUsernameError({
                status: 0,
                message: "",
              });

              setSaving(true);
              await completeSave();
              setSaving(false);
            }}
          >
            Save Changes
          </button>
        )}
      </section>
      {!isLoaded ? (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="inherit" />
        </Stack>
      ) : (
        <section className="px-2 xs:px-3 py-5 sm:p-6 w-full min-h-full bg-dashboard-secondary-light dark:bg-dashboard-secondary-dark sm:overflow-y-auto">
          <section
            className={`relative px-2 pt-6 pb-8 xs:px-4 flex flex-col md:flex-row gap-4 sm:gap-8 w-full bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-lg xs:rounded-xl shadow-md shadow-dashboard-primary-dark/10`}
          >
            <article className="relative xs:min-w-80 max-w-full">
              <div className={`flex gap-0`}>
                <h4 className="text-sm xs:text-base md:text-xl font-semibold">
                  {process.env.NEXT_PUBLIC_HOME_ROUTE}
                </h4>

                <PopOffInput
                  name="username"
                  label="choose your username"
                  className="ml-1 flex-grow"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))
                  }
                  onBlur={(e) =>
                    e.target.value[e.target.value.length - 1] === "-"
                      ? setUsername(e.target.value.slice(0, -1))
                      : null
                  }
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
                value={bio}
                rows={5}
                onChange={(e) => {
                  const threshold = Object.keys(progressColours).findLast(
                    (key) => e.target.value.length >= key
                  );

                  setBioProgressColour(progressColours[threshold] || "#5FD378");

                  setBio(e.target.value);
                }}
              />

              <div
                className={`py-1 flex justify-end items-center gap-2 transition-all duration-500`}
              >
                <p className={`text-sm text-right`}>
                  {bio && (bio.length || 0 / maxBioLength)}
                </p>

                <CircularProgress
                  variant="determinate"
                  size={15}
                  thickness={6}
                  style={{
                    color: bioProgressColour,
                    width: bio ? (bio.length === 0 ? 0 : "18px") : 0,
                    transition: "all 0.3s ease",
                  }}
                  value={
                    bio
                      ? Math.min(((bio.length || 0) * 100) / maxBioLength, 100)
                      : 0
                  }
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
                Which categories best suits your PopOff?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-stretch flex-wrap">
                {categories.map((category, index) => (
                  <PopOffChip
                    key={index}
                    label={category.name}
                    icon={category.icon(
                      index,
                      selectedCategories.includes(category.name)
                    )}
                    selected={selectedCategories.includes(category.name)}
                    onClick={() => handleSelectCategory(index)}
                  />
                ))}

                {selectedCategories.includes("Other..") && (
                  <div className={`my-3`}>
                    <PopOffInput
                      name="otherCategory"
                      label="Other Category*"
                      value={otherCategoryValue}
                      onChange={(event) => {
                        setOtherCategoryValue(
                          event.target.value.replace(/[^a-zA-Z]/g, "")
                        );
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
              <div className={`mb-2 flex flex-wrap gap-2`}>
                {tags.map((tag, index) => (
                  <div
                    key={`chip-${index}`}
                    className={`group px-3 py-0.5 flex items-center gap-2 border-[1px] border-dashboard-secondary-dark dark:border-dashboard-secondary-light rounded-full transition-all duration-300`}
                  >
                    <p className={`text-sm`}>{tag}</p>
                    <ImCross
                      size={10}
                      className={`cursor-pointer text-dashboard-secondary-dark dark:text-dashboard-secondary-light hover:text-rose-700`}
                      onClick={() => {
                        tags.splice(index, 1);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className={`flex flex-wrap gap-4`}>
                <PopOffInput
                  name="newTag"
                  label="add a new tag..."
                  value={newTag}
                  className={`flex-grow`}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (newTag.length > 2) {
                        if (tags.indexOf(newTag) === -1) {
                          tags.push(newTag);
                          setNewTag("");
                        } else {
                          setNewTag("");
                        }
                      }
                    }
                  }}
                />
                <button
                  className={`px-4 py-1 bg-action rounded-full text-primary-light`}
                  onClick={() => {
                    if (newTag.length > 2) {
                      if (tags.indexOf(newTag) === -1) {
                        tags.push(newTag);
                        setNewTag("");
                      } else {
                        setNewTag("");
                      }
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
  );
};

export default AccountsBlock;
