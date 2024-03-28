"use client";

import { useEffect, useState } from "react";

import { CircularProgress, LinearProgress, Stack } from "@mui/material";

import { defaultUser } from "@/data/defaultUser";
import { LayoutsLookup } from "@/data/LayoutsLookup";
import { ButtonsLookup } from "@/data/ButtonsLookup";

import { processLogOut } from "@/utility/userUtils";

import {
  getLatestModified,
  getLatestSession,
  getRememberMe,
  updateLastModified,
} from "@/utility/localStorageUtils";
import { updateUser, uploadImage } from "@/utility/dbUtils";

import ColourPickerBlock from "@/components/ColourPickerBlock";

const ComponentsBlock = ({ session, data }) => {
  const [saving, setSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedLayout, setSelectedLayout] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);

  const [chosenImage, setChosenImage] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);

  const [layoutCustomisations, setLayoutCustomisations] = useState({});
  const [buttonCustomisations, setButtonCustomisations] = useState({});

  const completeSave = async () => {
    const saveData = {
      page_layout: LayoutsLookup[selectedLayout].id,
      button_style: ButtonsLookup[selectedButton].id,
    };

    const layoutOptions = {};
    const buttonOptions = {};

    Object.entries(layoutCustomisations).forEach(([key, value]) => {
      layoutOptions[key] = value[0];
    });

    Object.entries(buttonCustomisations).forEach(([key, value]) => {
      buttonOptions[key] = value[0];
    });

    saveData.palette = {
      ...layoutOptions,
      ...buttonOptions,
    };

    if (chosenFile) {
      await uploadImage(session.user.id, chosenFile)
        .then((data) => {
          saveData.images =
            process.env.NEXT_PUBLIC_SUPABASE_IMAGES_LINK + data.path;

          setChosenFile(null);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    await updateUser(session.user.id, saveData)
      .then(() => {
        updateLastModified();

        setTimeout(() => {
          setSaving(false);
        }, 500);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (session) {
      const remember = getRememberMe();
      const latestSession = getLatestSession();
      const lastModified = getLatestModified();

      if (!latestSession) processLogOut().then();

      if (latestSession) {
        const timeSinceLastModified = new Date().getTime() - lastModified;
        const timeSinceLastModifiedInHours =
          timeSinceLastModified / (1000 * 60 * 60);

        if (!remember) {
          if (timeSinceLastModifiedInHours > 0.5) processLogOut().then();
        }
      }

      if (!data) {
        console.log("No user data found");
        processLogOut().then();
      } else {
        setChosenImage(data.images);

        const selectedLayoutIndex = Math.max(
          0,
          LayoutsLookup.findIndex((layout) => layout.id === data.page_layout)
        );

        const selectedButtonIndex = Math.max(
          0,
          ButtonsLookup.findIndex((button) => button.id === data.button_style)
        );

        setSelectedLayout(selectedLayoutIndex);
        setSelectedButton(selectedButtonIndex);

        const layoutOptions = {};
        const buttonOptions = {};

        Object.keys(LayoutsLookup[selectedLayoutIndex].colours).map(
          (colour) => {
            const customisation =
              LayoutsLookup[selectedLayoutIndex].colours[colour];

            const thisColour = data.palette[colour];

            if (!thisColour || thisColour === "") {
              customisation[0] = defaultUser.palette[colour];
            } else {
              customisation[0] = thisColour;
            }

            layoutOptions[colour] = customisation;
          }
        );

        Object.keys(ButtonsLookup[selectedButtonIndex].colours).map(
          (colour) => {
            const customisation =
              ButtonsLookup[selectedButtonIndex].colours[colour];

            const thisColour = data.palette[colour];

            if (!thisColour || thisColour === "") {
              customisation[0] = defaultUser.palette[colour];
            } else {
              customisation[0] = thisColour;
            }

            buttonOptions[colour] = customisation;
          }
        );

        setLayoutCustomisations(layoutOptions);
        setButtonCustomisations(buttonOptions);

        setIsLoaded(true);
      }
    }
  }, []);

  return (
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

              await completeSave();

              setSaving(false);
            }}
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
        <section className="p-3 sm:p-6 pb-6 sm:pb-10 w-full h-full bg-dashboard-secondary-light/50 dark:bg-dashboard-secondary-dark overflow-y-auto">
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
                      ButtonsLookup.findIndex((item) => item.id === "button-04")
                    );
                  } else {
                    if (
                      selectedButton ===
                      ButtonsLookup.findIndex((item) => item.id === "button-04")
                    ) {
                      setSelectedButton(0);
                    }
                  }
                }}
              >
                <img
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
                <img
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
                {(chosenImage || data.images) && (
                  <img
                    src={chosenImage || data.images}
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
                          initialColour={data.palette[customisation]}
                          onChange={(newColour) => {
                            const newCustomisation = {
                              ...layoutCustomisations,
                              [customisation]: [
                                newColour,
                                LayoutsLookup[selectedLayout].colours[
                                  customisation
                                ][1],
                              ],
                            };

                            setLayoutCustomisations(newCustomisation);
                          }}
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
                    initialColour={data.palette[customisation]}
                    onChange={(newColour) => {
                      const newCustomisation = {
                        ...buttonCustomisations,
                        [customisation]: [
                          newColour,
                          ButtonsLookup[selectedButton].colours[
                            customisation
                          ][1],
                        ],
                      };

                      setButtonCustomisations(newCustomisation);
                    }}
                  />
                </div>
              )
            )}
          </article>
        </section>
      )}
    </div>
  );
};

export default ComponentsBlock;
