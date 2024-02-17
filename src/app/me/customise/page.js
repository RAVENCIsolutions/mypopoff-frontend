"use client";

import Image from "next/image";

import { LayoutsLookup } from "@/data/LayoutsLookup";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/utility/localStorageUtils";
import userStore from "@/stores/UserStore";
import { observer } from "mobx-react";
import { CircularProgress, LinearProgress, Stack } from "@mui/material";
import { ButtonsLookup } from "@/data/ButtonsLookup";
import { BlockPicker, ChromePicker } from "react-color";
import ColourPickerBlock from "@/components/ColourPickerBlock";

const CustomisePage = observer(() => {
  const [selectedLayout, setSelectedLayout] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [processing, setProcessing] = useState(true);
  const [saving, setSaving] = useState(false);

  const [chosenImage, setChosenImage] = useState(null);

  const { user, isSignedIn, isLoaded } = useUser();
  const { userData } = userStore;

  useEffect(() => {
    const handleUser = async () => {
      let userData = {};

      if (isSignedIn) {
        const dataFromLocalStorage = getFromLocalStorage("userData");

        if (
          !dataFromLocalStorage ||
          dataFromLocalStorage.clerk_user_id !== user.id
        ) {
          userData = await userStore.loadUserData(user.id);
          saveToLocalStorage("userData", userData);
        } else {
          userData = dataFromLocalStorage;
        }

        userStore.setUserData(userData);
      }
    };

    if (firstLoad) {
      handleUser().then(() => {
        setSelectedLayout(
          LayoutsLookup.findIndex(
            (layout) => layout.id === userData.page_layout,
          ),
        );
        setSelectedButton(
          ButtonsLookup.findIndex(
            (button) => button.id === userData.button_style,
          ),
        );

        setProcessing(false);
        setFirstLoad(false);
      });
    }

    setProcessing(false);
  }, [isSignedIn, firstLoad]);

  return (
    <section className="w-full h-full rounded-lg">
      <div className="flex flex-col w-full h-full text-primary-dark dark:text-primary-light">
        <section
          className={`px-2 xs:px-3 py-5 sm:p-6 pb-2 lg:pb-8 flex justify-between items-center w-full border-b-2 border-secondary-dark/20`}
        >
          <h1 className="text-xl font-bold">Customise</h1>
          {isLoaded && saving ? (
            <Stack sx={{ color: "grey.500" }} spacing={2}>
              <CircularProgress color="inherit" size={15} />
            </Stack>
          ) : (
            <button
              className={`px-4 py-1 bg-action rounded-full text-primary-light transition-all duration-300`}
              onClick={() => {
                setSaving(true);

                if (chosenImage) {
                  // Upload to Supabase
                }

                userStore.setUserData({
                  ...userData,
                  page_layout: LayoutsLookup[selectedLayout].id,
                  button_style: ButtonsLookup[selectedButton].id,
                });
                userStore.saveUserData(user.id).then((r) => setSaving(false));
              }}
            >
              Save<span className={`hidden xs:inline-block ml-1`}>Changes</span>
            </button>
          )}
        </section>

        {isLoaded && processing ? (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        ) : (
          <section className="px-2 xs:px-3 py-5 sm:p-6 w-full min-h-full bg-dashboard-secondary-light dark:bg-dashboard-secondary-dark sm:overflow-y-auto">
            <h2 className={`text-lg`}>Choose a layout:</h2>
            <article
              className={`mt-2 mb-10 px-2 pt-6 pb-8 xs:px-4 grid grid-cols-2 2xs:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-lg xs:rounded-xl shadow-md shadow-dashboard-primary-dark/10`}
            >
              {LayoutsLookup.map((item, index) => (
                <div
                  className={`cursor-pointer mx-auto ${
                    selectedLayout === index
                      ? "opacity-100"
                      : "opacity-30 hover:opacity-100"
                  } transition-all duration-300`}
                  onClick={() => {
                    setSelectedLayout(index);

                    // Layout-10 and Button-04 are exclusive to each other
                    if (LayoutsLookup[index].id === "layout-10") {
                      setSelectedButton(
                        ButtonsLookup.findIndex(
                          (item) => item.id === "button-04",
                        ),
                      );
                    } else {
                      setSelectedButton(0);
                    }
                  }}
                >
                  <Image
                    key={`layout-selector-${index}`}
                    src={item.selector}
                    alt={item.title}
                    width={80}
                    height={(80 * 23) / 12}
                    className={`${
                      selectedLayout === index
                        ? "border-action shadow-xl shadow-primary-dark/10"
                        : "border-dashboard-primary-dark/30"
                    } border-2 rounded-lg overflow-hidden transition-all duration-300`}
                  />
                </div>
              ))}
            </article>

            <h2 className={`text-lg`}>Choose a button style:</h2>
            <article
              className={`mt-2 mb-10 px-2 pt-6 pb-8 xs:px-4 grid grid-cols-2 2xs:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-lg xs:rounded-xl shadow-md shadow-dashboard-primary-dark/10`}
            >
              {ButtonsLookup.map((item, index) => (
                <div
                  className={`cursor-pointer mx-auto ${
                    selectedButton === index
                      ? "opacity-100"
                      : "opacity-30 hover:opacity-100"
                  } ${
                    ((LayoutsLookup[selectedLayout].id === "layout-10" &&
                      item.id !== "button-04") ||
                      (LayoutsLookup[selectedLayout].id !== "layout-10" &&
                        item.id === "button-04")) &&
                    "hidden"
                  } transition-all duration-300`}
                  onClick={() => {
                    setSelectedButton(index);
                  }}
                >
                  <Image
                    key={`button-selector-${index}`}
                    src={item.selector}
                    alt={item.title}
                    width={80}
                    height={(80 * 23) / 12}
                    className={`${
                      selectedButton === index
                        ? "border-action shadow-xl shadow-primary-dark/10"
                        : "border-dashboard-primary-dark/30"
                    }  border-2 rounded-lg overflow-hidden transition-all duration-300`}
                  />
                </div>
              ))}
            </article>

            <h2 className={`text-lg`}>Choose customisations:</h2>
            <article
              className={`mt-2 mb-10 px-2 pt-6 pb-8 xs:px-4 flex flex-col gap-4 bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-lg xs:rounded-xl shadow-md shadow-dashboard-primary-dark/10`}
            >
              {Object.keys(LayoutsLookup[selectedLayout].colours).map(
                (customisation, index) => (
                  <div
                    key={`layout-customisation-${index}`}
                    className={`flex flex-col justify-start gap-2`}
                  >
                    <h4 className={`text-sm font-bold`}>
                      {LayoutsLookup[selectedLayout].colours[customisation][1]}:
                    </h4>
                    {customisation === "image" ? (
                      <div className={`flex items-center gap-2`}>
                        {chosenImage && (
                          <Image
                            key={`customisation-${index}`}
                            src={chosenImage}
                            alt={
                              LayoutsLookup[selectedLayout].colours[
                                customisation
                              ][1]
                            }
                            width={50}
                            height={50}
                            className={`w-8 h-8 border-2 border-dashboard-primary-dark rounded-lg object-cover overflow-hidden transition-all duration-300`}
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

                            reader.readAsDataURL(file);
                          }}
                        />
                      </div>
                    ) : (
                      <ColourPickerBlock
                        label={userData.palette[customisation]}
                        customisation={customisation}
                      />
                    )}
                  </div>
                ),
              )}

              {Object.keys(ButtonsLookup[selectedButton].colours).map(
                (customisation, index) => (
                  <div
                    key={`button-customisation-${index}`}
                    className={`flex flex-col justify-start gap-2`}
                  >
                    <h4 className={`text-sm font-bold`}>
                      {ButtonsLookup[selectedButton].colours[customisation][1]}{" "}
                      Colour:
                    </h4>

                    <ColourPickerBlock
                      label={userData.palette[customisation]}
                      customisation={customisation}
                    />
                  </div>
                ),
              )}
            </article>
            <div className={`hidden md:block mb-24`}></div>
          </section>
        )}
      </div>
    </section>
  );
});

export default CustomisePage;
