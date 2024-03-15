import { CircularProgress, Stack } from "@mui/material";

const DashHeader = ({ readyToSave = false }) => {
  return (
    <section
      className={`px-2 xs:px-3 py-5 sm:p-6 pb-2 lg:pb-4 flex justify-between items-center w-full border-b-2 border-secondary-dark/20`}
    >
      <h2 className="text-xl font-bold">My Settings</h2>
      {saving ? (
        <Stack sx={{ color: "grey.500" }} spacing={2}>
          <CircularProgress color="inherit" size={15} />
        </Stack>
      ) : (
        <button
          className={`cursor-pointer disabled:cursor-auto px-4 py-1 bg-action hover:bg-action/80 disabled:bg-gray-400 rounded-full disabled: text-primary-light disabled:text-white/70 transition-all duration-300`}
          onClick={async () => {
            setSaving(true);
            await completeSave();
            setSaving(false);
          }}
          disabled={!readyToSave}
        >
          Save<span className={`hidden xs:inline-block ml-1`}>Changes</span>
        </button>
      )}
    </section>
  );
};
