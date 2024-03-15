"use client";

import { useEffect, useRef, useState } from "react";

import { LayoutsLookup } from "@/data/LayoutsLookup";
import { ButtonsLookup } from "@/data/ButtonsLookup";

import { uploadImage } from "@/utility/dbUtils";
import ColourPickerBlock from "@/components/ColourPickerBlock";
import { getFromStorage, saveToStorage } from "@/utility/localStorageUtils";

const OnBoardingFour = ({ session }) => {
  const [selectedLayout, setSelectedLayout] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);

  const [chosenImage, setChosenImage] = useState(null);

  const fileRef = useRef(null);

  useEffect(() => {
    const storedUserData = getFromStorage("userData");

    const selectedLayoutIndex = Math.max(
      0,
      LayoutsLookup.findIndex(
        (layout) => layout.id === storedUserData.page_layout
      )
    );

    const selectedButtonIndex = Math.max(
      0,
      ButtonsLookup.findIndex(
        (button) => button.id === storedUserData.button_style
      )
    );

    setSelectedLayout(selectedLayoutIndex);
    setSelectedButton(selectedButtonIndex);
  }, []);

  return (
    <section className={`p-6 flex flex-col gap-6 bg-white rounded-3xl w-full`}>
      <div className={`flex flex-col items-center justify-start gap-2`}>
        <h4 className={`text-sm font-bold`}>Pick an image for your layout:</h4>
        <img
          src={
            chosenImage ||
            getFromStorage("userData").images ||
            "/images/avatar-placeholder.jpg"
          }
          alt={"Landing Page Image"}
          className={`w-20 h-20 border border-primary-dark/20 rounded-full object-cover shadow-xl shadow-primary-dark/10 overflow-hidden transition-all duration-300`}
          onClick={() => fileRef.current.click()}
        />

        <input
          ref={fileRef}
          type="file"
          id={"Your image"}
          name={"chosen-image"}
          className={`hidden`}
          accept={"image/*"}
          multiple={false}
          onChange={async (e) => {
            const file = e.target.files[0];

            if (!file) {
              setChosenImage(null);
              return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
              setChosenImage(reader.result);
            };

            const userData = getFromStorage("userData");

            await uploadImage(session.user.id, file)
              .then((data) => {
                userData.images =
                  process.env.NEXT_PUBLIC_SUPABASE_IMAGES_LINK + data.path;

                saveToStorage("userData", userData);
              })
              .catch((e) => {
                console.log(e);
              });

            reader.readAsDataURL(file);
          }}
        />
      </div>

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
                    {LayoutsLookup[selectedLayout].colours[customisation][1]}:
                  </h4>
                  <ColourPickerBlock
                    customisation={
                      LayoutsLookup[selectedLayout].colours[customisation]
                    }
                    onChange={(newColour) => {
                      const userData = getFromStorage("userData");

                      const newPalette = {
                        ...userData.palette,
                        [customisation]: newColour,
                      };

                      saveToStorage("userData", {
                        ...userData,
                        palette: newPalette,
                      });
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
              {ButtonsLookup[selectedButton].colours[customisation][1]} Colour:
            </h4>

            <ColourPickerBlock
              customisation={
                ButtonsLookup[selectedLayout].colours[customisation]
              }
              onChange={(newColour) => {
                const userData = getFromStorage("userData");

                const newPalette = {
                  ...userData.palette,
                  [customisation]: newColour,
                };

                saveToStorage("userData", {
                  ...userData,
                  palette: newPalette,
                });
              }}
            />
          </div>
        )
      )}
    </section>
  );
};

export default OnBoardingFour;
