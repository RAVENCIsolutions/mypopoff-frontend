import * as React from "react";
import { useEffect } from "react";
const WheelSegments = ({ ...props }) => {
  useEffect(() => {
    const paths = document.querySelectorAll("path");

    paths.forEach((path, index) => {
      setTimeout(() => {
        path.style.opacity = "1";
      }, 50 * index);
    });
  }, []);

  return (
    <svg viewBox="0 0 400 400">
      <path
        style={{
          opacity: 0,
          fill: props.segments[0],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[0])}
        d="M200,200L299.99,26.82C268.47,8.63,234.07-.01,200.12,0l-.12,200Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[1],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[1])}
        d="M200,200l173.18-99.99c-18.19-31.51-43.67-56.19-73.07-73.16l-100.11,173.14Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[2],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[2])}
        d="M200,200h199.97c0-36.39-9.72-70.5-26.7-99.89l-173.27,99.89Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[3],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[3])}
        d="M200,200l173.18,99.99c18.19-31.51,26.83-65.92,26.82-99.86l-200-.12Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[4],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[4])}
        d="M200,200l99.99,173.18c31.51-18.19,56.19-43.67,73.16-73.07l-173.14-100.11Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[5],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[5])}
        d="M200,200v199.97c36.39,0,70.5-9.72,99.89-26.7l-99.89-173.27Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[6],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[6])}
        d="M200,200l-99.99,173.18c31.51,18.19,65.92,26.83,99.86,26.82l.12-200Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[7],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[7])}
        d="M200,200L26.82,299.99c18.19,31.51,43.67,56.19,73.07,73.16l100.11-173.14Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[8],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[8])}
        d="M200,200H.03c0,36.39,9.72,70.5,26.7,99.89l173.27-99.89Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[9],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[9])}
        d="M200,200L26.82,100.01C8.63,131.53-.01,165.93,0,199.88l200,.12Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[10],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[10])}
        d="M200,200L100.01,26.82c-31.51,18.19-56.19,43.67-73.16,73.07l173.14,100.11Z"
      />
      <path
        style={{
          opacity: 0,
          fill: props.segments[11],
          strokeWidth: 0,
          transition: "all 0.3s ease",
        }}
        onClick={() => props.setColor(props.segments[11])}
        d="M200,200V.03C163.61.03,129.5,9.75,100.11,26.73l99.89,173.27Z"
      />
    </svg>
  );
};
export default WheelSegments;
