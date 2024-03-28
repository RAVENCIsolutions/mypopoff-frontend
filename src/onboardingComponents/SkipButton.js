const SkipButton = (props) => {
  return (
    <button
      className={`sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 py-0.5 border-b-[1px] border-transparent hover:border-stone-500 text-sm text-stone-500 transition-all duration-300`}
      {...props}
    >
      Skip Onboarding
    </button>
  );
};

export default SkipButton;
