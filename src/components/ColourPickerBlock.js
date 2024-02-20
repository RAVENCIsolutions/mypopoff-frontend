"use client";

import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";

import { FaSlackHash } from "react-icons/fa";

import useOutsideClick from "@/utility/useOutsideClick";
import { isValidHex, removeLeadingHash } from "@/utility/colourUtils";

import userStore from "@/stores/UserStore";

const ColourPickerBlock = observer(({ customisation }) => {
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

  const addToPalette = (key, value) => {
    const newPalette = {
      ...userData.palette,
      [key]: value,
    };

    userStore.setPalette(newPalette);
  };

  useOutsideClick(ref, () => {
    if (isValidHex(chosenColour)) {
      addToPalette(customisation, `#${removeLeadingHash(chosenColour)}`);
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
      className="flex flex-col items-start w-fit text-dashboard-primary-dark dark:text-dashboard-primary-light/80"
      onFocus={() => {
        setShowPicker(true);
      }}
    >
      <section
        className="mb-2 flex items-center gap-2"
        onClick={() => {
          setShowPicker(!showPicker);
        }}
      >
        <div
          className={`block w-8 h-8 rounded-full border-2 border-dashboard-primary-dark shadow-lg shadow-primary-dark/10`}
          style={{
            backgroundColor: showPicker
              ? `#${removeLeadingHash(chosenColour)}`
              : userData.palette[customisation],
          }}
        ></div>
        <p className={`text-sm font-bold uppercase`}>
          {showPicker
            ? `#${removeLeadingHash(chosenColour)}`
            : userStore.userData.palette[customisation]}
        </p>
      </section>
      {showPicker && (
        <div
          className={`p-2 flex flex-col bg-dashboard-primary-dark/20 dark:bg-dashboard-primary-light/30 rounded-lg`}
        >
          <div
            className={`pb-3 flex flex-wrap gap-1 border-b-[1px] border-dashboard-primary-dark/20`}
          >
            {defaultColours.map((colour, index) => (
              <div
                key={`picker-${index}`}
                className={`block w-3 h-3 rounded-sm`}
                style={{
                  backgroundColor: colour,
                }}
                onClick={() => {
                  addToPalette(
                    customisation,
                    `#${removeLeadingHash(chosenColour)}`,
                  );

                  setChosenColour(colour);
                }}
              ></div>
            ))}
          </div>
          <div className={`pt-2 flex items-center`}>
            <div
              className={`mr-2 block w-2 h-2 rounded-sm shadow-sm shadow-primary-dark/10`}
              style={{
                backgroundColor: `#${removeLeadingHash(chosenColour)}`,
              }}
            ></div>

            <FaSlackHash size={12} />

            <input
              type="text"
              value={removeLeadingHash(chosenColour.toUpperCase())}
              className={`p-0.5 w-14 text-xs font-sans tracking-wider font-bold uppercase bg-dashboard-primary-light outline-none`}
              maxLength={6}
              onChange={(e) => {
                const lastChar = e.target.value[e.target.value.length - 1];

                if (/([a-f\d])$/i.test(lastChar)) {
                  setChosenColour(e.target.value);
                }

                if (e.target.value.length === 6 && isValidHex(e.target.value)) {
                  addToPalette(
                    customisation,
                    `#${removeLeadingHash(chosenColour)}`,
                  );
                }
              }}
              onBlur={() => {
                if (isValidHex(chosenColour)) {
                  addToPalette(
                    customisation,
                    `#${removeLeadingHash(chosenColour)}`,
                  );
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
