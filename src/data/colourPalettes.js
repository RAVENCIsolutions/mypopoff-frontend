import { BiRadio } from "react-icons/bi";
import { LuLeaf } from "react-icons/lu";
import { GiWinterGloves } from "react-icons/gi";
import { HiColorSwatch } from "react-icons/hi";
import { FaRegLemon } from "react-icons/fa";

const extraPalettes = [
  {
    label: "Christmas",
    component: (colour) => (
      <i
        className={`fi fi-br-tree-christmas text-2xl`}
        style={{ color: colour }}
      ></i>
    ),
    colors: [
      "#afa695",
      "#9a7549",
      "#c09209",
      "#784333",
      "#c9040b",
      "#a52b2a",
      "#fc1934",
      "#751102",
      "#1e280d",
      "#28560b",
      "#007000",
      "#29a583",
    ],
  },
  {
    label: "Autumn",
    component: (colour) => <LuLeaf size={25} color={colour} />,
    colors: [
      "#870002",
      "#ea3f00",
      "#ea6026",
      "#894f20",
      "#d08d2d",
      "#eaa834",
      "#f1d54f",
      "#9b9b47",
      "#526332",
      "#2d351e",
      "#994c90",
      "#54014f",
    ],
  },
  {
    label: "Retro",
    component: (colour) => <BiRadio size={25} color={colour} />,
    colors: [
      "#001219",
      "#fa3960",
      "#cc033d",
      "#730f33",
      "#0b2b40",
      "#197384",
      "#20ced1",
      "#92d622",
      "#e5570c",
      "#ca6702",
      "#ee9b01",
      "#2bd69d",
    ],
  },
  {
    label: "Watermelon",
    component: (colour) => (
      <i
        className={`fi fi-br-watermelon text-xl`}
        style={{ color: colour }}
      ></i>
    ),
    colors: [
      "#8c0335",
      "#f2003c",
      "#ff6f61",
      "#ffa07a",
      "#ffc0cb",
      "#ffd1c1",
      "#c3f25c",
      "#7fc08a",
      "#2e8b57",
      "#005f39",
      "#053b07",
      "#001601",
    ],
  },
  {
    label: "Nebula",
    component: (colour) => (
      <i
        className={`fi fi-br-galaxy-planet text-xl`}
        style={{ color: colour }}
      ></i>
    ),
    colors: [
      "#981622",
      "#db69ae",
      "#972d55",
      "#5e1742",
      "#7537a2",
      "#4c2775",
      "#142e47",
      "#1f193d",
      "#0094c6",
      "#ea3d00",
      "#e69e3c",
      "#af692e",
    ],
  },
  {
    label: "Winter",
    component: (colour) => <GiWinterGloves size={25} color={colour} />,
    colors: [
      "#462a40",
      "#681c40",
      "#951e48",
      "#7d1b44",
      "#b7687e",
      "#cbc7c8",
      "#49818e",
      "#3b7b87",
      "#2e6371",
      "#1e4457",
      "#10323e",
      "#252339",
    ],
  },
  {
    label: "Pastel",
    component: (colour) => <HiColorSwatch size={25} color={colour} />,
    colors: [
      "#eda4bf",
      "#e0908d",
      "#aba3d4",
      "#3d2259",
      "#9fcbe2",
      "#73d0d8",
      "#78bdaf",
      "#a5d4aa",
      "#f7d999",
      "#e6b95e",
      "#d88650",
      "#eb9f91",
    ],
  },
  {
    label: "Citrus",
    component: (colour) => <FaRegLemon size={25} color={colour} />,
    colors: [
      "#91b472",
      "#6a951f",
      "#0f5809",
      "#76d730",
      "#ccfe00",
      "#faca0e",
      "#fab824",
      "#ff8201",
      "#ff5100",
      "#db2900",
      "#f16b33",
      "#f1dc99",
    ],
  },
];

export { extraPalettes };
