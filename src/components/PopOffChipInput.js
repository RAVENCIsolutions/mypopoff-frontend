import styled from "@emotion/styled";
import { PiCheck, PiTrashSimpleFill, PiX } from "react-icons/pi";
import { useState } from "react";
import { event } from "next/dist/build/output/log";
import PopOffInput from "@/components/PopOffInput";

const POWrapper = styled.div``;
const POInput = styled.input``;
const POChips = styled.div``;
const Chip = styled.div``;

const PopOffChipInput = (props) => {
  const [value, setValue] = useState("");
  const [chips, setChips] = useState([]);
  const [feedback, setFeedback] = useState("");

  const totalChips = 3;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleInput = (event) => {
    if (event.target.value.length < 3) {
      setFeedback("Please enter at least 3 characters");
      return;
    }

    if (event.key === "Enter") {
      if (
        !chips.some(
          (element) =>
            element.toLowerCase() === event.target.value.toLowerCase()
        )
      )
        setChips([...chips, value.trim()]);
      setValue("");
      event.preventDefault();
    }
  };

  const handleDeleteChip = (index) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  };

  return (
    <POWrapper className="flex flex-col items-center justify-center gap-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {chips.map((chip, index) => (
          <Chip
            key={index}
            className={`py-1 px-3 flex items-center gap-2 bg-primary-dark/30 border-[1px] rounded-full hover:shadow-lg hover:shadow-primary-dark/10 transition-all duration-300`}
          >
            {chip}
            <button className="" onClick={handleDeleteChip}>
              <PiX />
            </button>
          </Chip>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <PopOffInput
          className="text-center transition-all duration-300"
          name="tags"
          label=""
          value={value}
          onChange={handleChange}
          onKeyDown={handleInput}
        />
        <p
          className={`flex items-center gap-1 text-xs font-bold text-center uppercase ${
            chips.length < totalChips
              ? "text-primary-dark/40"
              : "text-[#49A432]"
          }`}
        >
          {chips.length >= totalChips && <PiCheck />}
          At least {totalChips} Tags recommended
          <br />
          {chips.length} added so far
        </p>
      </div>
    </POWrapper>
  );
};

export default PopOffChipInput;
