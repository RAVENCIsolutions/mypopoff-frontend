"use client";

import { useState } from "react";
import styled from "@emotion/styled";

const Chip = styled.div``;

const PopOffChip = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <Chip
      className={`cursor-pointer py-1 px-3 flex items-center gap-2 border-[1px] rounded-full transition-all duration-300
        ${
          props.selected
            ? props.selected +
              " mt-2 mb-0 ml-0 mr-2 bg-action border-action shadow-none text-primary-light"
            : props.background +
              " my-1 mx-1 border-primary-dark/70 hover:bg-primary-dark/10 shadow-lg shadow-primary-dark/10 text-primary-dark/70"
        }`}
      {...props}
    >
      {props.icon}
      {props.label}
    </Chip>
  );
};

export default PopOffChip;
