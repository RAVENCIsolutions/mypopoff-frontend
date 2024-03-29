"use client";

import { HexColorPicker } from "react-colorful";
import { useEffect, useRef, useState } from "react";
import { CircularProgress, Stack } from "@mui/material";
import useOutsideClick from "@/utility/useOutsideClick";

import {
  addLeadingHash,
  handleHex,
  isValidHex,
  removeLeadingHash,
} from "@/utility/colourUtils";

import { FaSlackHash } from "react-icons/fa";

const ColourPickerBlock = ({ initialColour, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerColour, setPickerColour] = useState(initialColour);
  const [inputColour, setInputColour] = useState(initialColour);

  const [inputTimeout, setInputTimeout] = useState(null);
  const [checkingInput, setCheckingInput] = useState(false);

  const ref = useRef(null);

  const setColor = (value) => {
    setCheckingInput(true);

    const newHex = addLeadingHash(handleHex(value));

    setTimeout(() => {
      if (isValidHex(newHex)) {
        setInputColour(newHex);
        setPickerColour(newHex);

        onChange(newHex);
      } else {
        setInputColour(initialColour);
        setPickerColour(initialColour);
      }

      setCheckingInput(false);
    }, 1000);
  };

  useOutsideClick(ref, () => {
    if (showPicker) {
      setColor(inputColour);
      setShowPicker(false);
    }
  });

  useEffect(() => {
    return () => clearTimeout(inputTimeout);
  }, []);

  return (
    <article
      className="flex flex-col items-start w-fit text-dashboard-primary-dark dark:text-dashboard-primary-light/80"
      ref={ref}
    >
      <section className={`mb-2 flex items-center gap-2`}>
        <div
          className={`block w-8 h-8 rounded-full border-2 border-dashboard-primary-dark shadow-lg shadow-primary-dark/10`}
          style={{
            backgroundColor: inputColour,
          }}
          onClick={() => {
            setShowPicker(!showPicker);
          }}
        ></div>
        <div className={`relative`}>
          <input
            type={"text"}
            className={`py-1 px-6 rounded-full w-[6.5rem] outline-none text-sm font-bold uppercase`}
            value={removeLeadingHash(inputColour)}
            maxLength={6}
            onChange={(event) => {
              setInputColour(event.target.value.replace("#", ""));

              if (inputTimeout) clearTimeout(inputTimeout);

              const newTimeout = setTimeout(() => {
                setColor(event.target.value);
              }, 1000);

              setInputTimeout(newTimeout);
            }}
            onClick={() => {
              setShowPicker(true);
            }}
          />
          <FaSlackHash
            size={12}
            className={`absolute top-1/2 left-2 -translate-y-1/2 text-primary-dark/50 dark:text-primary-light/50`}
          />
          {checkingInput ? (
            <Stack
              className={`absolute top-1/2 right-2 -translate-y-1/2`}
              sx={{ color: "grey.500" }}
              spacing={2}
            >
              <CircularProgress color="inherit" size={12} />
            </Stack>
          ) : null}
        </div>
      </section>
      {showPicker && (
        <div
          className={`p-2 flex flex-col bg-dashboard-primary-dark/20 dark:bg-dashboard-primary-light/30 rounded-lg`}
        >
          <HexColorPicker
            color={pickerColour}
            onChange={(newColour) => {
              setPickerColour(newColour);
              setInputColour(newColour);
            }}
          />
        </div>
      )}
    </article>
  );
};

export default ColourPickerBlock;
