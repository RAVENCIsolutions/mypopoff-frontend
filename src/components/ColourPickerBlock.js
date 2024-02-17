"use client";

import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";

import useOutsideClick from "@/utility/useOutsideClick";
import userStore from "@/stores/UserStore";
import { FaSlackHash } from "react-icons/fa";
import { isValidHex, removeLeadingHash } from "@/utility/colourUtils";

const ColourPickerBlock = observer(({ label, customisation }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [chosenColour, setChosenColour] = useState(null);

  const ref = useRef(null);

  const { userData } = userStore;

  const defaultColours = [
    "#B80000",
    "#DB3E00",
    "#FCCB00",
    "#008B02",
    "#006B76",
    "#1273DE",
    "#004DCF",
    "#5300EB",
    "#FFFFFF",
    "#333333",
    "#000000",
  ];

  useOutsideClick(ref, () => {
    if (isValidHex(chosenColour)) {
      const newPalette = {
        ...userData.palette,
        [customisation]: `#${removeLeadingHash(chosenColour)}`,
      };

      userStore.setPalette(newPalette);
    } else {
      setChosenColour(userData.palette[customisation]);
    }

    setShowPicker(false);
  });

  useEffect(() => {
    if (userData) {
      setChosenColour(userData.palette[customisation]);
    }
  }, []);

  return (
    <article
      ref={ref}
      className="flex flex-col items-start w-fit"
      onFocus={() => setShowPicker(true)}
    >
      <section
        className="mb-1 flex items-center gap-4"
        onClick={() => setShowPicker(!showPicker)}
      >
        <div
          className={`block w-8 h-8 rounded-full border-2 border-dashboard-primary-dark shadow-lg shadow-primary-dark/10`}
          style={{
            backgroundColor: showPicker
              ? `#${removeLeadingHash(chosenColour)}`
              : userData.palette[customisation],
          }}
        ></div>
        <p className={`text-sm font-bold uppercase`}>{label}</p>
      </section>
      {showPicker && (
        <div
          className={`p-2 flex flex-col gap-2 bg-dashboard-primary-dark/45 dark:bg-dashboard-primary-light/30`}
        >
          <div className={`flex flex-wrap gap-1`}>
            {defaultColours.map((colour, index) => (
              <div
                key={`picker-${index}`}
                className={`block w-3 h-3 rounded-sm`}
                style={{
                  backgroundColor: colour,
                }}
                onClick={() => {
                  const newPalette = {
                    ...userData.palette,
                    [customisation]: `#${removeLeadingHash(chosenColour)}`,
                  };

                  userStore.setPalette(newPalette);

                  setChosenColour(colour);
                }}
              ></div>
            ))}
          </div>
          <div className={`flex items-center gap-1`}>
            <div
              className={`block w-2 h-2 rounded-sm`}
              style={{
                backgroundColor: `#${removeLeadingHash(chosenColour)}`,
              }}
            ></div>

            <FaSlackHash size={12} />

            <input
              type="text"
              value={removeLeadingHash(chosenColour.toUpperCase())}
              className={`p-1 w-14 h-4 text-xs font-sans tracking-wider font-bold uppercase bg-transparent border-[1px] border-dashboard-secondary-light/50 dark:bg-dashboard-secondary-dark/50`}
              maxLength={6}
              onChange={(e) => {
                const lastChar = e.target.value[e.target.value.length - 1];

                if (/([a-f\d])$/i.test(lastChar)) {
                  setChosenColour(e.target.value);
                }

                if (e.target.value.length === 6 && isValidHex(e.target.value)) {
                  const newPalette = {
                    ...userData.palette,
                    [customisation]: `#${removeLeadingHash(chosenColour)}`,
                  };

                  userStore.setPalette(newPalette);
                }
              }}
              onBlur={() => {
                if (isValidHex(chosenColour)) {
                  const newPalette = {
                    ...userData.palette,
                    [customisation]: `#${removeLeadingHash(chosenColour)}`,
                  };

                  userStore.setPalette(newPalette);
                } else {
                  setChosenColour(userData.palette[customisation]);
                }
              }}
            />
          </div>
        </div>
        // <CompactPicker
        //   color={userData.palette[customisation]}
        //   onChange={(e) => {
        //     const newPalette = {
        //       ...userData.palette,
        //       [customisation]: e.hex,
        //     };
        //
        //     userStore.setPalette(newPalette);
        //   }}
        // />
      )}
    </article>
  );
});

export default ColourPickerBlock;
