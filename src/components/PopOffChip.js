"use client";

import { useState } from "react";
import styled from "@emotion/styled";

const Chip = styled.div``;

const PopOffChip = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <Chip
      className={`cursor-pointer my-1.5 mx-1 py-1 px-3 flex items-center gap-2 border-[1px] rounded-full transition-all duration-300
        ${
          props.selected
            ? props.selected +
              " bg-action border-action shadow-none text-primary-light"
            : props.background +
              " border-primary-dark/70 bg-primary-light hover:bg-primary-dark/10 hover:dark:bg-primary-light/60 text-primary-dark/70"
        }`}
      {...props}
    >
      {props.icon && <div className={`hidden 3xs:block`}>{props.icon}</div>}
      <p className={`flex-grow text-sm xs:text-base text-center 3xs:text-left`}>
        {props.label}
      </p>
    </Chip>
  );
};

export default PopOffChip;
