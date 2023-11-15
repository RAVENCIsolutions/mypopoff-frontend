import { TextField } from "@mui/material";
import { useRef, useState } from "react";
import { Block, Colorful, Compact, Sketch } from "@uiw/react-color";
import { set } from "mobx";
import useOutsideClick from "@/utils/useOutsideClick";
import PopOffInput from "@/components/PopOffInput";

const ColourPickerBlock = ({ label, colorThrough = "#ffffff" }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [colorChosen, setColorChosen] = useState(colorThrough);
  const ref = useRef(null);

  const handleChange = (color) => {
    setColorChosen(color.hex);
  };

  useOutsideClick(ref, () => setShowPicker(false));

  return (
    <article
      ref={ref}
      className="flex flex-col items-center justify-center"
      onFocus={() => setShowPicker(true)}
    >
      <section className="flex items-center gap-4">
        <div
          className="block w-10 h-10 border-[1px] border-secondary-dark rounded-lg"
          style={{ backgroundColor: colorChosen }}
          onClick={() => setShowPicker(true)}
        ></div>
        <div>
          <PopOffInput label={label} value={colorChosen} shade={colorChosen} />
        </div>
      </section>
      {showPicker && (
        <div className="mt-2">
          <Compact
            color={colorChosen}
            onChange={handleChange}
            style={{
              boxShadow:
                "rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px",
            }}
          />
        </div>
      )}
    </article>
  );
};

export default ColourPickerBlock;
