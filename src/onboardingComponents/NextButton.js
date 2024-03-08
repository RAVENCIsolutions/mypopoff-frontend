import { FaAngleRight } from "react-icons/fa";
import { CircularProgress, Stack } from "@mui/material";

const NextButton = ({ saving = false, ...props }) => {
  return (
    <button
      className={`sm:pl-8 sm:pr-7 py-2 sm:self-end flex items-center justify-center gap-1 border-2 border-action bg-transparent w-11/12 sm:w-auto sm:rounded-full text-action font-bold transition-all duration-300 ${
        saving ? "" : "hover:gap-3 hover:bg-action hover:text-primary-light"
      }`}
      disabled={saving}
      {...props}
    >
      {saving ? (
        <>
          Saving
          <Stack sx={{ color: "#c68a4e" }} spacing={2}>
            <CircularProgress color="inherit" size={15} />
          </Stack>
        </>
      ) : (
        <>
          Next
          <FaAngleRight className="mt-[1px] hidden md:block" />
        </>
      )}
    </button>
  );
};

export default NextButton;
