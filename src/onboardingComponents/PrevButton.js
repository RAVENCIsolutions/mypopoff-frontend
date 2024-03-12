import { FaAngleLeft } from "react-icons/fa";
import { CircularProgress, Stack } from "@mui/material";

const PrevButton = ({ saving = false, ...props }) => {
  return (
    <button
      className={`sm:pl-5 sm:pr-6 py-2 sm:self-end flex items-center justify-center gap-1 border-2 border-primary-dark/40 bg-transparent w-11/12 sm:w-auto sm:rounded-full text-primary-dark/40 font-bold transition-all duration-300 ${
        saving
          ? ""
          : "hover:gap-3 hover:bg-primary-dark/80 hover:text-primary-light"
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
          <FaAngleLeft className="mt-[1px] hidden md:block" />
          Go Back
        </>
      )}
    </button>
  );
};

export default PrevButton;
