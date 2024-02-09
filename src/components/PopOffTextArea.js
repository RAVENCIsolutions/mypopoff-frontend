import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const POBase = styled.div``;

const POWrapper = styled.div`
  padding: 0;

  position: relative;
  display: inline-block;

  width: 100%;

  &:before {
    pointer-events: none;
    content: "";

    position: absolute;

    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 1px;

    background-color: rgba(0, 0, 0, 0.5);

    z-index: 1;

    transition: height 0.1s ease;
  }

  &:hover:not(.when-focused)::before {
    height: 2px;
    background-color: rgb(32, 34, 36, 1);
  }

  &.when-focused::after {
    pointer-events: none;
    content: "";

    position: absolute;

    left: 50%;
    bottom: -1px;

    width: 0;
    height: 3px;

    background-color: ${(props) => props.shade || "rgb(198, 138, 78)"};
    transform: translateX(-50%);

    z-index: 2;

    transition: all 0.2s ease;
  }

  &.when-focused.is-focused::after {
    width: 100%;
    transition: all 0s ease;
  }
`;

const POTextArea = styled.textarea`
  padding: 2px 0;

  width: 100%;
  outline: none;

  color: #c68a4e;
  font-size: 1rem;
  font-weight: 600;

  background-color: transparent;

  resize: none;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const POLabel = styled.label`
  top: 0;

  width: 100%;

  font-size: 1rem;
  font-weight: 300;
  white-space: nowrap;
  text-overflow: ellipsis;

  overflow: hidden;

  transition: all 0.3s ease;

  &.is-focused {
    top: -12%;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PopOffTextArea = (props) => {
  const [focused, setFocused] = useState(false);

  const ref = useRef(null);

  const handleOnFocus = (event) => {
    setFocused(true);
  };

  const handleOnBlur = (event) => {
    setFocused(false);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setFocused(false);
    }
  };

  useEffect(() => {
    console.log("Value:", props.value);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <POBase className={`relative ${props.className}`}>
      <POLabel
        htmlFor=":pota:"
        className={`absolute z-50 ${
          focused || props.value.length > 0
            ? "is-focused"
            : "pointer-events-none"
        } ${
          focused
            ? "text-action"
            : "text-primary-dark/70 dark:text-primary-light/40"
        }`}
      >
        {props.label}
      </POLabel>
      <POWrapper
        ref={ref}
        className={`when-focused ${focused ? "is-focused" : ""}`}
        shade={props.shade}
      >
        <POTextArea
          id=":pota:"
          rows={4}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          {...props.inputProps}
          {...props}
        />
      </POWrapper>
    </POBase>
  );
};

export default PopOffTextArea;
