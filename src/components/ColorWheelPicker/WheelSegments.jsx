import * as React from "react";
import { useEffect, useState } from "react";
const WheelSegments = ({ ...props }) => {
  const [segments, setSegments] = useState([]);

  const pathArray = [
    "M200,200L299.99,26.82C268.47,8.63,234.07-.01,200.12,0l-.12,200Z",
    "M200,200l173.18-99.99c-18.19-31.51-43.67-56.19-73.07-73.16l-100.11,173.14Z",
    "M200,200h199.97c0-36.39-9.72-70.5-26.7-99.89l-173.27,99.89Z",
    "M200,200l173.18,99.99c18.19-31.51,26.83-65.92,26.82-99.86l-200-.12Z",
    "M200,200l99.99,173.18c31.51-18.19,56.19-43.67,73.16-73.07l-173.14-100.11Z",
    "M200,200v199.97c36.39,0,70.5-9.72,99.89-26.7l-99.89-173.27Z",
    "M200,200l-99.99,173.18c31.51,18.19,65.92,26.83,99.86,26.82l.12-200Z",
    "M200,200L26.82,299.99c18.19,31.51,43.67,56.19,73.07,73.16l100.11-173.14Z",
    "M200,200H.03c0,36.39,9.72,70.5,26.7,99.89l173.27-99.89Z",
    "M200,200L26.82,100.01C8.63,131.53-.01,165.93,0,199.88l200,.12Z",
    "M200,200L100.01,26.82c-31.51,18.19-56.19,43.67-73.16,73.07l173.14,100.11Z",
    "M200,200V.03C163.61.03,129.5,9.75,100.11,26.73l99.89,173.27Z",
  ];
  const resetColours = (forward = true) => {
    const paths = document.querySelectorAll(".rcpw-segment");
    const speed = 25;
    const buffer = 20;

    if (!forward) paths.reverse();

    if (segments.length > 0) {
      paths.forEach((path, index) => {
        setTimeout(() => {
          path.style.opacity = "0";
        }, speed * index);
      });
    }

    setTimeout(
      () => {
        setSegments(props.wheelPalette);
      },
      speed * paths.length + buffer,
    );

    setTimeout(() => {
      paths.forEach((path, index) => {
        setTimeout(() => {
          path.style.opacity = "1";
        }, speed * index);
      });
    }, speed * paths.length);
  };

  useEffect(() => {
    resetColours();
  }, [props.wheelPalette]);

  return (
    <svg viewBox="0 0 400 400">
      {pathArray.map((path, index) => (
        <path
          key={`color-segment-${index}`}
          className="rcpw-segment cursor-pointer"
          style={{
            opacity: 0,
            fill: segments[index],
            strokeWidth: 0,
            transition: "all 0.3s ease",
          }}
          onClick={() => props.handleColorChange(segments[index])}
          d={path}
        />
      ))}
    </svg>
  );
};
export default WheelSegments;
