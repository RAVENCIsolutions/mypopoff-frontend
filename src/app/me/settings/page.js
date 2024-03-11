"use client";

import { useState } from "react";
import { CircularProgress, Stack } from "@mui/material";

import userStore from "@/stores/UserStore";
import SettingsBlock from "@/components/SettingsBlock";
import { observer } from "mobx-react";

const SettingsPage = observer(() => {
  const [saving, setSaving] = useState(false);
  const [readyToSave, setReadyToSave] = useState(false);

  const completeSave = async () => {
    if (readyToSave) {
      await userStore.saveUserData().then(() => {
        setTimeout(() => {
          setSaving(false);
        }, 500);
      });
    }
  };

  return (
    <main className="relative flex flex-col justify-between w-full h-full rounded-none sm:rounded-3xl shadow-xl text-primary-dark dark:text-primary-light sm:overflow-hidden">
      {/* HEADER */}
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
      {/* MAIN CONTENT */}

      {userStore.userData ? (
        <SettingsBlock setReady={setReadyToSave} />
      ) : (
        <Stack sx={{ color: "#c68a4e" }} spacing={2}>
          <CircularProgress color="inherit" size={20} />
        </Stack>
      )}
    </main>
  );
});

export default SettingsPage;
