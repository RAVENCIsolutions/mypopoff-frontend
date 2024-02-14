"use client";

import { useState } from "react";
import Switch from "@mui/material/Switch";
import PopOffInput from "@/components/PopOffInput";

export default function SettingsPage() {
  const [makePublic, setMakePublic] = useState(false);
  const [hidePopOff, setHidePopOff] = useState(false);
  const [hideLandingPage, setHideLandingPage] = useState(false);
  const [changed, setChanged] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",

    // email: user.primaryEmailAddress.emailAddress,
  });

  return (
    <main className="relative w-full h-full rounded-none lg:rounded-lg">
      <div className="flex flex-col w-full h-full text-primary-dark dark:text-primary-light">
        <section
          className={`px-2 xs:px-3 py-5 sm:p-6 pb-2 lg:pb-4 flex justify-between items-center w-full border-b-2 border-secondary-dark/20`}
        >
          <h2 className="text-xl font-bold">My Settings</h2>
          <button
            className={`px-4 py-1 bg-action rounded-full text-primary-light transition-all duration-300 ${
              changed ? "opacity-100" : "opacity-50"
            }`}
          >
            Save Changes
          </button>
        </section>
        <section className="px-3 py-5 sm:p-6 w-full min-h-full sm:overflow-y-auto">
          <section
            className={`p-4 bg-dashboard-primary-light/70 dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <h4 className={`text-base font-bold uppercase`}>Privacy</h4>
            <article className={`mt-4 flex justify-between sm:indent-4`}>
              <p className={`text-sm`}>Make my landing page public</p>
              <Switch
                checked={makePublic}
                size="small"
                onClick={() => setMakePublic(!makePublic)}
              ></Switch>
            </article>

            <article className={`mt-4 flex justify-between sm:indent-4`}>
              <p className={`text-sm`}>Hide my pop off from internal search</p>
              <Switch
                checked={hidePopOff}
                size="small"
                onClick={() => setHidePopOff(!hidePopOff)}
              ></Switch>
            </article>

            <article className={`mt-4 flex justify-between sm:indent-4`}>
              <p className={`text-sm`}>
                Hide my landing page from search engines
              </p>
              <Switch
                checked={hideLandingPage}
                size="small"
                onClick={() => setHideLandingPage(!hideLandingPage)}
              ></Switch>
            </article>
          </section>

          <section
            className={`mt-6 p-4 bg-dashboard-primary-light/70 dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <h4 className={`text-base font-bold uppercase`}>Security</h4>
            <article className={`mt-4 sm:ml-4 flex flex-col gap-3`}>
              <p className={`mb-2 text-sm`}>Change Password</p>
              <PopOffInput
                name="oldPassword"
                label="what's your old password"
                className={`mb-2`}
                value={formData.oldPassword}
                type={"password"}
                onChange={(e) =>
                  setFormData({ ...formData, oldPassword: e.target.value })
                }
              />
              <PopOffInput
                name="newPassword"
                label="what's your your new password"
                className={`mb-2`}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />
              <PopOffInput
                name="confirmPassword"
                label="let's confirm your new password"
                className={`mb-2`}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </article>
            <p
              className={`mt-4 flex-grow text-xs opacity-50 hover:opacity-100 transition-all duration-300`}
            >
              <span className={`font-bold uppercase`}>Note:</span> You only need
              to fill this section out when changing your password.
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}
