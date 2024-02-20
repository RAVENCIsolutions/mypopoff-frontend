"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import userStore from "@/stores/UserStore";
import Image from "next/image";
import { LayoutsLookup } from "@/data/LayoutsLookup";
import { CircularProgress, Stack } from "@mui/material";
import { uploadAvatar, uploadImage } from "@/utility/dbUtils";
import { ButtonsLookup } from "@/data/ButtonsLookup";

export default function SettingsPage() {
  const [changed, setChanged] = useState(true);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  const [saving, setSaving] = useState(false);

  const [chosenImage, setChosenImage] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);

  const { user, isSignedIn, isLoaded } = useUser();
  const { loaded } = userStore;

  return (
    <main className="relative w-full h-full rounded-none lg:rounded-lg">
      <div className="flex flex-col w-full h-full text-primary-dark dark:text-primary-light">
        <section
          className={`px-2 xs:px-3 py-5 sm:p-6 pb-2 lg:pb-4 flex justify-between items-center w-full border-b-2 border-secondary-dark/20`}
        >
          <h2 className="text-xl font-bold">My Settings</h2>
          {saving ? (
            <Stack sx={{ color: "grey.500" }} spacing={2}>
              <CircularProgress color="inherit" size={15} />
            </Stack>
          ) : (
            <button
              className={`px-4 py-1 bg-action rounded-full text-primary-light transition-all duration-300`}
              onClick={async () => {
                setSaving(true);

                if (chosenImage) {
                  uploadAvatar(user.id, chosenFile).then((data) => {
                    userStore.setUserData({
                      ...userStore.userData,
                      avatar_url:
                        process.env.NEXT_PUBLIC_SUPABASE_AVATARS_LINK +
                        data.path,
                    });

                    userStore.saveUserData(user.id).then((r) => {
                      setTimeout(() => {
                        setSaving(false);
                      }, 500);
                    });
                  });
                } else {
                  userStore.setUserData({
                    ...userStore.userData,
                    page_layout: LayoutsLookup[selectedLayout].id,
                    button_style: ButtonsLookup[selectedButton].id,
                  });

                  userStore.saveUserData(user.id).then((r) => {
                    setTimeout(() => {
                      setSaving(false);
                    }, 500);
                  });
                }
              }}
            >
              Save<span className={`hidden xs:inline-block ml-1`}>Changes</span>
            </button>
          )}
        </section>
        <section className="px-3 py-5 sm:p-6 w-full min-h-full sm:overflow-y-auto">
          {/*<section*/}
          {/*  className={`p-4 bg-dashboard-primary-light/70 dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}*/}
          {/*>*/}
          {/*  <h4 className={`text-base font-bold uppercase`}>Privacy</h4>*/}
          {/*  <article className={`mt-4 flex justify-between sm:indent-4`}>*/}
          {/*    <p className={`text-sm`}>Make my landing page public</p>*/}
          {/*    <Switch*/}
          {/*      checked={makePublic}*/}
          {/*      size="small"*/}
          {/*      onClick={() => setMakePublic(!makePublic)}*/}
          {/*    ></Switch>*/}
          {/*  </article>*/}

          {/*  <article className={`mt-4 flex justify-between sm:indent-4`}>*/}
          {/*    <p className={`text-sm`}>Hide my pop off from internal search</p>*/}
          {/*    <Switch*/}
          {/*      checked={hidePopOff}*/}
          {/*      size="small"*/}
          {/*      onClick={() => setHidePopOff(!hidePopOff)}*/}
          {/*    ></Switch>*/}
          {/*  </article>*/}

          {/*  <article className={`mt-4 flex justify-between sm:indent-4`}>*/}
          {/*    <p className={`text-sm`}>*/}
          {/*      Hide my landing page from search engines*/}
          {/*    </p>*/}
          {/*    <Switch*/}
          {/*      checked={hideLandingPage}*/}
          {/*      size="small"*/}
          {/*      onClick={() => setHideLandingPage(!hideLandingPage)}*/}
          {/*    ></Switch>*/}
          {/*  </article>*/}
          {/*</section>*/}

          <section
            className={`mt-0 p-4 bg-dashboard-primary-light/70 dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <h4 className={`text-base font-bold uppercase`}>Avatar</h4>
            {loaded && (
              <div className={`mt-2 mb-5 flex flex-col gap-4`}>
                {(chosenImage || userStore.userData.images) && (
                  <img
                    src={chosenImage || userStore.userData.avatar_url}
                    alt={"Avatar"}
                    className={`w-20 h-20 rounded-full object-cover overflow-hidden transition-all duration-300`}
                  />
                )}
                <input
                  type="file"
                  id={"Your image"}
                  name={"chosen-image"}
                  accept={"image/*"}
                  multiple={false}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    let paletteImage = "";

                    if (!file) {
                      setChosenImage(null);
                      return;
                    }

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setChosenImage(reader.result);
                    };

                    setChosenFile(file);

                    reader.readAsDataURL(file);
                  }}
                />
              </div>
            )}
            {/*<h4 className={`text-base font-bold uppercase`}>Social Media</h4>*/}
            {/*<article className={`mt-4 sm:ml-4 flex flex-col gap-3`}></article>*/}
          </section>
        </section>
      </div>
    </main>
  );
}
