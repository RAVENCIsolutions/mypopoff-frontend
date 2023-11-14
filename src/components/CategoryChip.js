"use client";

import { Chip } from "@mui/material";
import { useState } from "react";

const CategoryChip = (props) => {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(false);
  console.log(props.icon);
  const handleSelect = () => {
    setSelected(!selected);

    console.log(selected);
  };

  return (
    <Chip
      key={props.name}
      icon={props.icon}
      label={props.name}
      variant="outlined"
      className={`text-primary-dark shadow-primary-dark/10 transition-all duration-300
        ${
          selected
            ? props.selected + " border-transparent shadow-none"
            : props.background + " shadow-md"
        }`}
      onClick={handleSelect}
    />
  );
};

export default CategoryChip;
