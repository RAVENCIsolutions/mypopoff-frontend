"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import userStore from "@/stores/UserStore";
import { categories } from "@/data/CustomisationData";

import PopOffChip from "@/components/PopOffChip";
import PopOffInput from "@/components/PopOffInput";
import PopOffTextArea from "@/components/PopOffTextArea";
import { CircularProgress, makeStyles, Stack } from "@mui/material";

const AccountPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [otherCategoryValue, setOtherCategoryValue] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    category: "",
    bio: "",
    otherCategory: "",
    tags: [],

    avatar_url: "",
  });

  const maxBioLength = 150;

  const userData = userStore.userData;
  const { user, isSignedIn, isLoaded } = useUser();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAvatarSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedAvatar(file);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      ...formData,
      category: categories[category],
    });

    console.log(category, categories.length - 1);

    setFormData({
      ...formData,
      otherCategory: category < categories.length - 1 ? "" : otherCategoryValue,
    });
  };

  useEffect(() => {
    const fillData = async () => {
      if (isSignedIn) {
        userStore.loadUserData(user.id).then((res) => {
          setFormData({
            ...formData,
            username: res.username || "",
            bio: res.bio || "",
            category: res.category,
            tags: res.tags,

            avatar_url: res.avatar_url,

            email: user.primaryEmailAddress.emailAddress,
          });
        });
      }
    };

    fillData().then(() => {});
  }, [user, isSignedIn]);

  return (
    <article className="relative w-full h-full rounded-none lg:rounded-lg sm:overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="px-2 xs:px-3 py-5 sm:p-6 w-full min-h-full bg-dashboard-secondary-light dark:bg-dashboard-secondary-dark sm:overflow-y-auto">
          <h2 className="pb-2 lg:pb-4 mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Account
          </h2>
          <section
            className={`px-2 py-4 xs:p-4 bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-lg xs:rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <div className="flex flex-row gap-0 w-80 max-w-full">
              <h4 className="text-sm xs:text-base md:text-xl font-semibold">
                mypopoff.com/
              </h4>
              <PopOffInput
                name="username"
                label="username"
                className="flex-grow"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </section>
          <section
            className={`mt-6 px-2 py-4 xs:p-4 pt-6 flex flex-col md:flex-row gap-4 w-full bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-lg xs:rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <article className={`w-80 max-w-full`}>
              <PopOffTextArea
                name="bio"
                label="your bio description"
                value={formData.bio}
                onChange={handleChange}
              />
              <div
                className={`py-1 flex justify-end items-center gap-2 border-2`}
              >
                <p className={`text-sm text-right`}>
                  {formData.bio.length} / {maxBioLength}
                </p>
                <CircularProgress
                  variant="determinate"
                  size={15}
                  thickness={6}
                  style={{
                    color:
                      formData.bio.length > maxBioLength
                        ? "#B71E19"
                        : "#c68a4e",
                  }}
                  // styles={{ @apply text-action}}
                  value={Math.min(
                    (formData.bio.length * 100) / maxBioLength,
                    100,
                  )}
                />
              </div>
            </article>
            <article className={`flex-grow`}>
              <p
                className={`text-xs font-semibold italic opacity-70 hover:opacity-100 transition-all duration-300`}
              >
                <span>Hint:</span> Google recommends that a bio description be
                between 120 to 150 characters long
              </p>
            </article>
          </section>
          <section
            className={`mt-6 py-4 px-1 xs:p-4 bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
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
                      value={formData.otherCategory}
                      onChange={(event) => {
                        handleChange(event);
                        setOtherCategoryValue(event.target.value);
                      }}
                    />
                  </div>
                )}
              </div>
            </article>
          </section>
          <section
            className={`mt-6 py-4 px-1 xs:p-4 bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <article className="mx-auto flex flex-col gap-3 w-full">
              <h4 className="text-base text-center md:text-left">
                How about adding some tags?
              </h4>
            </article>
          </section>
        </section>
      </div>
    </article>
  );
};

export default AccountPage;
