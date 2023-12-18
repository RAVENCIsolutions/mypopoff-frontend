import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const POBase = styled.div``;

const POWrapper = styled.div`
  margin-top: 16px;
  padding: 0;

  position: relative;
  display: inline-block;

  min-width: 16rem;

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
    bottom: 0;
    width: 0;
    height: 3px;

    background-color: rgb(198, 138, 78);
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
  padding: 3px 0 4px;

  width: 100%;
  outline: none;

  color: #c68a4e;
  font-size: 1.1rem;
  font-weight: 600;

  resize: none;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`;

const POLabel = styled.label`
  top: 15%;

  width: 100%;

  transform: translateZ(-50%);

  font-size: 1.2rem;
  font-weight: 300;
  white-space: nowrap;
  text-overflow: ellipsis;

  overflow: hidden;

  transition: all 0.3s ease;

  &.is-focused {
    top: 0;
    left: 0;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
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
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <POBase className="relative">
      <POLabel
        htmlFor=":pota:"
        className={`absolute z-50 ${
          focused || props.value.length > 0
            ? "is-focused"
            : "pointer-events-none"
        } ${focused ? "text-action" : "text-primary-dark/70"}`}
      >
        {props.label}
      </POLabel>
      <POWrapper
        ref={ref}
        className={`when-focused ${focused ? "is-focused" : ""}`}
      >
        <POTextArea
          id=":pota:"
          rows={4}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          {...props}
        />
      </POWrapper>
    </POBase>
  );
};

export default PopOffTextArea;
