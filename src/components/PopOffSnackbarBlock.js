import PopOffSnackbar from "@/components/PopOffSnackbar";

const PopOffSnackbarBlock = (props) => {
  const handleClose = (index) => {
    const newValue = [...props.value];
    newValue.splice(index, 1);

    props.changeValue(newValue);
  };

  return props.show ? (
    <section className="fixed top-10 right-0 w-full max-w-sm z-50 overflow-hidden">
      {props.value.map((value, index) => {
        const { id, text, severity } = value;

        return (
          <PopOffSnackbar
            key={id + "-" + text}
            text={text}
            severity={severity}
            onClose={() => handleClose(index)}
          />
        );
      })}
    </section>
  ) : null;
};

export default PopOffSnackbarBlock;
