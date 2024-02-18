import Link from "next/link";

const ButtonStyle10 = (props) => {
  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      className={`group relative ml-6 flex self-start transition-all duration-[0.35s]`}
      style={{
        color: palette.buttonText,
      }}
    >
      <div
        className={`absolute bottom-0 w-0 group-hover:w-full z-10 transition-all duration-300`}
        style={{ height: "2px", backgroundColor: palette.buttonMain }}
      ></div>
      {title}
    </Link>
  );
};

export default ButtonStyle10;
