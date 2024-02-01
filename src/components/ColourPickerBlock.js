import { useRef, useState } from "react";
import Compact from "@uiw/react-color-compact";
import { observer } from "mobx-react";

import PopOffInput from "@/components/PopOffInput";
import useOutsideClick from "@/utility/useOutsideClick";
import onBoardingStore from "@/stores/OnboardingStore";

const ColourPickerBlock = observer(({ label, colorKey }) => {
  const [showPicker, setShowPicker] = useState(false);

  const color = onBoardingStore.onBoardingCurrent.palette[colorKey];

  const ref = useRef(null);

  const handleChange = (color) => {
    console.log(colorKey);
    onBoardingStore.updateColour(colorKey, color.hex);
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
          style={{ backgroundColor: color }}
          onClick={() => setShowPicker(true)}
        ></div>
        <div>
          <PopOffInput
            label={label}
            value={color}
            shade={color}
            onChange={(e) => e.preventDefault()}
          />
        </div>
      </section>
      {showPicker && (
        <div className="mt-2">
          <Compact
            color={color}
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
});

export default ColourPickerBlock;
