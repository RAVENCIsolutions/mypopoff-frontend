import styled from "@emotion/styled";
import {
  PiCheckCircleBold,
  PiInfoBold,
  PiWarningBold,
  PiWarningCircleBold,
  PiXCircleBold,
} from "react-icons/pi";
import { useEffect, useState } from "react";

const POWrapper = styled.article``;
const POAlert = styled.div``;

const PopOffSnackbar = (props) => {
  const [position, setPosition] = useState("0");

  const { text, severity, onClose } = props;

  const severities = {
    success: ["#4C9612", <PiCheckCircleBold size={20} color={"white"} />],
    info: ["#0588FC", <PiInfoBold size={20} color={"white"} />],
    warning: ["#FFA916", <PiWarningBold size={20} color={"white"} />],
    error: ["#DB4454", <PiWarningCircleBold size={20} color={"white"} />],
  };

  const handleClose = () => {
    setPosition("-100%");

    setTimeout(() => {
      onClose();
    }, 350);
  };

  useEffect(() => {
    setPosition("0");
  }, [text, severity]);

  return (
    <POWrapper
      className={`relative my-1 p-2.5 pr-5 block text-white rounded-l-lg w-full transition-all duration-300`}
      style={{
        backgroundColor: severities[severity][0],
        right: position,
        transitions: "all 0.3s ease-in-out",
      }}
    >
      <POAlert className="flex items-center gap-2">
        <div className="mx-2 min-w-fit">{severities[severity][1]}</div>
        <p className="flex-grow text-sm">{text}</p>
        <button
          className="ml-5 flex-end min-w-fit opacity-50 hover:opacity-100 transition-all duration-200"
          onClick={handleClose}
        >
          <PiXCircleBold size={20} color={"white"} />
        </button>
      </POAlert>
    </POWrapper>
  );
};

export default PopOffSnackbar;
