import Link from "next/link";

const ButtonStyle02 = (props) => {
  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      target={`_blank`}
      className={`py-1.5 px-5 text-base sm:text-lg hover:scale-105 hover:shadow-[3px_3px_5px_rgba(0,0,0,0.15)] transition-all duration-300`}
      style={{
        backgroundColor: palette.buttonMain,
        color: palette.buttonText,
      }}
    >
      {title}
    </Link>
  );
};

export default ButtonStyle02;
