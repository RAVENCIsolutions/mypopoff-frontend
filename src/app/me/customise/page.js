"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

import { observer } from "mobx-react";
import { CircularProgress, LinearProgress, Stack } from "@mui/material";

import userStore from "@/stores/UserStore";
import { uploadImage } from "@/utility/dbUtils";

import { LayoutsLookup } from "@/data/LayoutsLookup";
import { ButtonsLookup } from "@/data/ButtonsLookup";

import ColourPickerBlock from "@/components/ColourPickerBlock";

const CustomisePage = observer(() => {
  const [selectedLayout, setSelectedLayout] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const [saving, setSaving] = useState(false);

  const [chosenImage, setChosenImage] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  const { loaded } = userStore;

  const completeSave = (dataToSave) => {
    userStore.setUserData({
      ...userStore.userData,
      ...dataToSave,
    });

    userStore.saveUserData(user.id).then((r) => {
      setTimeout(() => {
        setSaving(false);
      }, 500);
    });
  };

  useEffect(() => {
    if (loaded) {
      const selectedLayoutIndex = Math.max(
        0,
        LayoutsLookup.findIndex(
          (layout) => layout.id === userStore.userData.page_layout
        )
      );

      const selectedButtonIndex = Math.max(
        0,
        ButtonsLookup.findIndex(
          (button) => button.id === userStore.userData.button_style
        )
      );

      setSelectedLayout(selectedLayoutIndex);
      setSelectedButton(selectedButtonIndex);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [loaded]);

  return (
    <section className="w-full max-h-full overflow-hidden sm:rounded-lg">
      <div className="flex flex-col w-full max-h-full text-primary-dark dark:text-primary-light">
        <section
          className={`px-2 xs:px-3 py-5 sm:p-6 flex justify-between items-center w-full border-b-2 border-secondary-dark/20`}
        >
          <h1 className="text-xl font-bold">Customise</h1>
          {saving ? (
            <Stack sx={{ color: "grey.500" }} spacing={2}>
              <CircularProgress color="inherit" size={15} />
            </Stack>
          ) : (
            <button
              className={`px-4 py-1 bg-action rounded-full text-primary-light transition-all duration-300`}
              onClick={async () => {
                setSaving(true);

                const toSave = {};

                toSave.page_layout = LayoutsLookup[selectedLayout].id;
                toSave.button_style = ButtonsLookup[selectedButton].id;

                // cleanPalette();

                if (chosenImage) {
                  uploadImage(user.id, chosenFile).then((data) => {
                    toSave.images =
                      process.env.NEXT_PUBLIC_SUPABASE_IMAGES_LINK + data.path;

                    completeSave(toSave);
                  });

                  setChosenImage(null);
                } else {
                  completeSave(toSave);
                }
              }}
            >
              Save<span className={`hidden xs:inline-block ml-1`}>Changes</span>
            </button>
          )}
        </section>

        {loaded && !isLoading ? (
          <section className="p-3 sm:p-6 pb-6 sm:pb-10 w-full h-full bg-dashboard-secondary-light dark:bg-dashboard-secondary-dark overflow-y-auto">
            <h2 className={`text-lg`}>Choose a layout:</h2>
            <article
              className={`mt-2 mb-10 px-2 pt-6 pb-8 xs:px-4 grid grid-cols-2 2xs:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-lg xs:rounded-xl shadow-md shadow-dashboard-primary-dark/10`}
            >
              {LayoutsLookup.map((item, index) => (
                <div
                  key={`layout-selector-${index}`}
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
                          (item) => item.id === "button-04"
                        )
                      );
                    } else {
                      selectedButton ===
                        ButtonsLookup.findIndex(
                          (item) => item.id === "button-04"
                        ) && setSelectedButton(0);
                    }
                  }}
                >
                  <Image
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
                  key={`button-selector-${index}`}
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
              className={`mt-2 px-2 pt-6 pb-8 xs:px-4 flex flex-col gap-4 bg-primary-light/80 dark:bg-dashboard-secondary-light/20 rounded-lg xs:rounded-xl shadow-md shadow-dashboard-primary-dark/10`}
            >
              <div className={`flex flex-col justify-start gap-2`}>
                <h4 className={`text-sm font-bold`}>Landing Page Image:</h4>
                <div className={`flex items-center gap-2`}>
                  {(chosenImage || userStore.userData.images) && (
                    <img
                      src={chosenImage || userStore.userData.images}
                      alt={"Landing Page Image"}
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

                      setChosenFile(file);

                      reader.readAsDataURL(file);
                    }}
                  />
                </div>
              </div>

              {/* Colours from Layout */}
              {Object.keys(LayoutsLookup[selectedLayout].colours).map(
                (customisation, index) => {
                  return (
                    <div
                      key={`layout-customisation-${customisation}-${index}`}
                      className={`flex flex-col justify-start gap-2`}
                    >
                      {customisation !== "image" && (
                        <>
                          <h4 className={`text-sm font-bold`}>
                            {
                              LayoutsLookup[selectedLayout].colours[
                                customisation
                              ][1]
                            }
                            :
                          </h4>
                          <ColourPickerBlock
                            label={userStore.userData.palette[customisation]}
                            customisation={customisation}
                          />
                        </>
                      )}
                    </div>
                  );
                }
              )}

              {/* Colours from Button Style */}
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
                      label={userStore.userData.palette[customisation]}
                      customisation={customisation}
                    />
                  </div>
                )
              )}
            </article>
          </section>
        ) : (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        )}
      </div>
    </section>
  );
});

export default CustomisePage;
