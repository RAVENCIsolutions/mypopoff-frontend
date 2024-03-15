"use client";

import { useEffect, useState } from "react";

import { CircularProgress, LinearProgress, Stack, Switch } from "@mui/material";

import AuthText from "@/components/AuthText";

import { verifyData } from "@/utility/dataUtils";
import { processLogOut } from "@/utility/userUtils";
import { updateUser, uploadAvatar } from "@/utility/dbUtils";
import { getFromStorage, saveToStorage } from "@/utility/localStorageUtils";

const SettingsBlock = ({ session }) => {
  const [readyToSave, setReadyToSave] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [makePublic, setMakePublic] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    country: "",
    city: "",
    phone: "",
  });

  const [chosenImage, setChosenImage] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);

  useEffect(() => {
    if (session) {
      const storedUserData = getFromStorage("userData");
      const storedLoginSession = getFromStorage("loginSession");

      if (!storedLoginSession || !storedLoginSession.lastModified)
        processLogOut().then();

      if (storedLoginSession) {
        const timeSinceLastModified =
          new Date().getTime() - storedLoginSession.lastModified;
        const timeSinceLastModifiedInHours =
          timeSinceLastModified / (1000 * 60 * 60);

        if (!storedLoginSession.rememberMe) {
          if (timeSinceLastModifiedInHours > 0.5) processLogOut().then();
        }
      }

      if (!storedUserData) {
        console.log("No user data found");
      } else {
        setMakePublic(verifyData("public", storedUserData.public));
        setChosenImage(verifyData("avatar_url", storedUserData.avatar_url));
        setFormData({
          name: storedUserData.extras.name,
          gender: storedUserData.extras.gender,
          country: storedUserData.extras.country,
          city: storedUserData.extras.city,
          phone: storedUserData.extras.phone,
        });

        setIsLoaded(true);
      }
    }
  }, []);

  const checkIfReadyToSave = () => {
    if (
      formData.name &&
      formData.gender &&
      formData.country &&
      formData.name.length > 0 &&
      formData.gender.length > 0 &&
      formData.country.length > 0
    ) {
      setReadyToSave(true);
    } else {
      setReadyToSave(false);
    }
  };

  const completeSave = async () => {
    if (readyToSave) {
      const saveData = {
        ...getFromStorage("userData"),
        extras: {
          name: formData.name,
          gender: formData.gender,
          country: formData.country,
          city: formData.city,
          phone: formData.phone,
        },
        public: makePublic,
      };

      if (chosenFile) {
        await uploadAvatar(session.user.id, chosenFile)
          .then((data) => {
            saveData.avatar_url =
              process.env.NEXT_PUBLIC_SUPABASE_AVATARS_LINK + data.path;

            setChosenFile(null);
          })
          .catch((e) => {
            console.log(e);
          });
      }

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

  return (
    <>
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
            className={`cursor-pointer disabled:cursor-auto px-4 py-1 bg-action hover:bg-action/80 disabled:bg-gray-400 rounded-full disabled: text-primary-light disabled:text-white/70 transition-all duration-300`}
            onClick={async () => {
              setSaving(true);
              await completeSave();
              setSaving(false);
            }}
            disabled={!readyToSave}
          >
            Save<span className={`hidden xs:inline-block ml-1`}>Changes</span>
          </button>
        )}
      </section>
      {!isLoaded ? (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="inherit" />
        </Stack>
      ) : (
        <section className="px-3 py-6 sm:px-6 sm:py-8 flex flex-col gap-4 w-full h-full sm:overflow-y-auto">
          <article
            className={`p-4 bg-primary-light dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <h4 className={`text-base font-bold uppercase`}>Privacy</h4>
            <article className={`mt-4 flex justify-between sm:indent-4`}>
              <p className={`text-sm`}>Make my landing page public</p>
              <Switch
                checked={makePublic}
                size="small"
                onClick={() => {
                  setMakePublic(!makePublic);
                  checkIfReadyToSave();
                }}
              ></Switch>
            </article>
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
          </article>
          <article
            className={`p-4 bg-primary-light dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <h4 className={`text-base font-bold uppercase`}>Avatar</h4>
            <div className={`mt-2 mb-5 flex flex-col gap-4`}>
              {(chosenImage || getFromStorage("userData").avatar_url) && (
                <img
                  src={chosenImage || getFromStorage("userData").avatar_url}
                  alt={"Avatar"}
                  className={`w-20 h-20 rounded-full object-cover shadow-xl shadow-dashboard-primary-dark/20 overflow-hidden transition-all duration-300`}
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
                  if (!file) {
                    setChosenImage(null);
                    setChosenFile(null);
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setChosenImage(reader.result);
                  };

                  setChosenFile(file);
                  reader.readAsDataURL(file);

                  checkIfReadyToSave();
                }}
              />
            </div>
            {/*<h4 className={`text-base font-bold uppercase`}>Social Media</h4>*/}
            {/*<article className={`mt-4 sm:ml-4 flex flex-col gap-3`}></article>*/}
          </article>
          <article
            className={`p-4 bg-primary-light dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <h4 className={`text-base font-bold uppercase`}>Private Details</h4>
            <div className={`mt-2 mb-5 grid grid-cols-1 xs:grid-cols-2 gap-4`}>
              <AuthText
                label={`Name*`}
                name={`name`}
                value={formData.name}
                onChange={(event) => {
                  setFormData({ ...formData, name: event.target.value });
                  checkIfReadyToSave();
                }}
              />
              <AuthText
                label={`Gender*`}
                name={`gender`}
                value={formData.gender}
                onChange={(event) => {
                  setFormData({ ...formData, gender: event.target.value });
                  checkIfReadyToSave();
                }}
              />
              <AuthText
                label={`Country*`}
                name={`country`}
                value={formData.country}
                onChange={(event) => {
                  setFormData({ ...formData, country: event.target.value });
                  checkIfReadyToSave();
                }}
              />
              <AuthText
                label={`City`}
                name={`city`}
                value={formData.city}
                onChange={(event) => {
                  setFormData({ ...formData, city: event.target.value });
                  checkIfReadyToSave();
                }}
              />
              <AuthText
                label={`Phone`}
                name={`phone`}
                type={"tel"}
                value={formData.phone}
                onChange={(event) => {
                  setFormData({ ...formData, phone: event.target.value });
                  checkIfReadyToSave();
                }}
              />
            </div>
          </article>
        </section>
      )}
    </>
  );
};

export default SettingsBlock;
