"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Switch } from "@mui/material";

import userStore from "@/stores/UserStore";
import AuthText from "@/components/AuthText";

const SettingsBlock = observer(({ setReady }) => {
  const [makePublic, setMakePublic] = useState(false);
  const [loadOnce, setLoadOnce] = useState(false);

  const [chosenImage, setChosenImage] = useState(null);

  const [formData, setFormData] = useState({
    name: userStore.userData.name || "",
    gender: userStore.userData.gender || "",
    country: userStore.userData.country || "",
    city: userStore.userData.city || "",
    phone: userStore.userData.phone || "",
  });

  useEffect(() => {
    if (!loadOnce && userStore.userData && userStore.userData.extras) {
      setFormData({
        ...formData,
        name: userStore.userData.extras.name,
        gender: userStore.userData.extras.gender,
        country: userStore.userData.extras.country,
        city: userStore.userData.extras.city,
        phone: userStore.userData.extras.phone,
      });

      setMakePublic(userStore.userData.public);

      setLoadOnce(true);
    }
  }, [userStore.userData]);

  useEffect(() => {
    if (
      formData.name.length > 0 &&
      formData.country.length > 0 &&
      formData.gender.length > 0
    ) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [formData]);

  return (
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
              userStore.updateUserData({ public: !makePublic });
              setMakePublic(!makePublic);
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
          {(chosenImage || userStore.userData.images) && (
            <img
              src={chosenImage || userStore.userData.avatar_url}
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
                return;
              }
              const reader = new FileReader();
              reader.onloadend = () => {
                setChosenImage(reader.result);
              };
              userStore.setAvatar(file);
              reader.readAsDataURL(file);
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
        {userStore.userData && userStore.userData.extras && (
          <div className={`mt-2 mb-5 grid grid-cols-1 xs:grid-cols-2 gap-4`}>
            <AuthText
              label={`Name*`}
              name={`name`}
              value={userStore.userData.extras.name || formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
                userStore.updateExtras({
                  name: event.target.value,
                });
              }}
            />
            <AuthText
              label={`Gender*`}
              name={`gender`}
              value={userStore.userData.extras.gender || formData.gender}
              onChange={(event) => {
                setFormData({ ...formData, gender: event.target.value });
                userStore.updateExtras({
                  gender: event.target.value,
                });
              }}
            />
            <AuthText
              label={`Country*`}
              name={`country`}
              value={userStore.userData.extras.country || formData.country}
              onChange={(event) => {
                setFormData({ ...formData, country: event.target.value });
                userStore.updateExtras({
                  country: event.target.value,
                });
              }}
            />
            <AuthText
              label={`City`}
              name={`city`}
              value={userStore.userData.extras.city || formData.city}
              onChange={(event) => {
                setFormData({ ...formData, city: event.target.value });
                userStore.updateExtras({
                  city: event.target.value,
                });
              }}
            />
            <AuthText
              label={`Phone`}
              name={`phone`}
              type={"tel"}
              value={userStore.userData.extras.phone || formData.phone}
              onChange={(event) => {
                setFormData({ ...formData, phone: event.target.value });
                userStore.updateExtras({
                  phone: event.target.value,
                });
              }}
            />
          </div>
        )}
      </article>
    </section>
  );
});

export default SettingsBlock;
