"use client";

import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { LayoutsLookup } from "@/data/LayoutsLookup";
import ColourPickerBlock from "@/components/ColourPickerBlock";
import onBoardingStore from "@/stores/OnboardingStore";
import { ButtonsLookup } from "@/data/ButtonsLookup";

const OnBoardingFour = observer((props) => {
  const [selectedLayout, setSelectedLayout] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);

  const [chosenImage, setChosenImage] = useState(null);

  const fileRef = useRef(null);

  useEffect(() => {
    console.log(onBoardingStore.userData);

    const selectedLayoutIndex = Math.max(
      0,
      LayoutsLookup.findIndex(
        (layout) => layout.id === onBoardingStore.userData.page_layout
      )
    );

    const selectedButtonIndex = Math.max(
      0,
      ButtonsLookup.findIndex(
        (button) => button.id === onBoardingStore.userData.button_style
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
            onBoardingStore.userData.images ||
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

            onBoardingStore.setImage(file);

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
                    label={onBoardingStore.userData.palette[customisation]}
                    customisation={customisation}
                    store={"onBoardingStore"}
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
              label={onBoardingStore.userData.palette[customisation]}
              customisation={customisation}
              store={"onBoardingStore"}
            />
          </div>
        )
      )}
    </section>
  );
});

export default OnBoardingFour;
