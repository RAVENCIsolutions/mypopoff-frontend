import { TextField } from "@mui/material";
import { TwitterPicker } from "react-color";
import { useRef, useState } from "react";

const ColourPickerBlock = ({ label, colorThrough = "#ffffff" }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [colorChosen, setColorChosen] = useState(colorThrough);
  const pickerRef = useRef();

  const handleChange = (color) => {
    setColorChosen(color.hex);
    setShowPicker(false);
  };

  return (
    <>
      <TextField
        label={label}
        value={colorChosen}
        variant="standard"
        onFocus={() => setShowPicker(true)}
      />
      {showPicker && (
        <div ref={pickerRef}>
          <TwitterPicker color={colorChosen} onChangeComplete={handleChange} />
        </div>
      )}
    </>
  );
};

export default ColourPickerBlock;
