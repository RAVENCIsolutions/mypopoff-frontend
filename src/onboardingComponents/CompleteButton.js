import { FaAngleRight } from "react-icons/fa";
import { CircularProgress, Stack } from "@mui/material";

const CompleteButton = (props) => {
  return (
    <button
      className={`sm:pl-8 sm:pr-7 py-2 sm:self-end flex items-center justify-center border-2 border-action bg-transparent hover:bg-action w-11/12 sm:w-auto sm:rounded-full text-action hover:text-primary-light font-bold transition-all duration-300`}
      {...props}
    >
      Finish!
    </button>
  );
};

export default CompleteButton;
