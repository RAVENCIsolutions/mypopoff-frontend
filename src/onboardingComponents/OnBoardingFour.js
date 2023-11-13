"use client";

import { useEffect, useRef, useState } from "react";
import { Chip, CircularProgress, TextField } from "@mui/material";
import { TwitterPicker } from "react-color";
import ColourPickerBlock from "@/components/ColourPickerBlock";
import { observer } from "mobx-react";
import onBoardingStore from "@/stores/OnBoardingStore";
import { onBoardingButtons } from "@/data/OnBoardingButtons";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { TiPencil } from "react-icons/ti";
import {
  PiAirplaneTilt,
  PiBarbell,
  PiBriefcase,
  PiDevices,
  PiGraduationCap,
  PiMaskHappy,
  PiNewspaperClipping,
  PiPaintBrushBroad,
  PiPaintBrushHousehold,
  PiPencilLineLight,
  PiSword,
} from "react-icons/pi";
import { IoFitnessOutline } from "react-icons/io5";

const OnBoardingFour = observer(() => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    profile: "",
    categories: {},
    tags: [],
    bio: "",
  });

  const avatarOverlay = useRef(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setLoading(true);

    setLoading(false);
  }, []);

  return (
    <>
      <section className="relative mt-5 mb-10 self-start flex flex-col md:flex-row items-stretch justify-between">
        <article className="pt-5 px-5 pb-10 flex flex-col items-center gap-8 rounded-none md:rounded-3xl w-full bg-white shadow-lg shadow-dashboard-primary-dark/10">
          <div className="relative flex flex-col items-center gap-2 h-32 w-32 rounded-full shadow-xl shadow-primary-dark/10 overflow-hidden">
            <img src="/images/avatar-placeholder.jpg" className="" />

            <div
              ref={avatarOverlay}
              className="absolute flex items-center justify-center w-full h-full bg-primary-dark rounded-full opacity-0 transition-all duration-500"
            >
              <p className="text-white text-base">Change Avatar</p>
            </div>

            <button
              className="avatar absolute top-2.5 right-2.5 p-2 hover:p-2.5 bg-white rounded-full shadow-md hover:shadow-xl shadow-primary-dark/10 hover:shadow-primary-dark/20 transition-all duration-300 z-20"
              onMouseOver={() => {
                avatarOverlay.current.style.opacity = "0.2";
              }}
              onMouseLeave={() => {
                avatarOverlay.current.style.opacity = "0";
              }}
            >
              <PiPencilLineLight
                className="text-primary-dark avatar-hover:text-primary-light"
                size={20}
              />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <h4 className="mt-2 text-2xl font-bold">mypopoff.com/</h4>
            <TextField
              label="Choose your username"
              name="username"
              value={formData.username}
              variant="standard"
              onChange={handleChange}
            />
          </div>

          <article className="flex flex-col items-center gap-3 w-full max-w-md">
            <h4 className="mt-2 text-base font-bold">
              Which category best suits your PopOff?
            </h4>
            <div className="flex flex-row justify-center flex-wrap gap-2">
              <Chip
                icon={<PiBriefcase />}
                label="Business and Corporate"
                variant="outlined"
              />

              <Chip
                icon={<PiPaintBrushHousehold />}
                label="Creative"
                variant="outlined"
              />

              <Chip
                icon={<PiGraduationCap />}
                label="Education"
                variant="outlined"
              />

              <Chip
                icon={<PiMaskHappy />}
                label="Entertainment"
                variant="outlined"
              />

              <Chip
                icon={<PiNewspaperClipping />}
                label="News and Media"
                variant="outlined"
              />

              <Chip
                icon={<PiAirplaneTilt />}
                label="Travel"
                variant="outlined"
              />

              <Chip
                icon={<PiBarbell />}
                label="Health and Fitness"
                variant="outlined"
              />

              <Chip
                icon={<PiDevices />}
                label="Technology"
                variant="outlined"
              />

              <Chip
                className="pl-1 bg-action text-white border-0"
                icon={<PiSword color="white" />}
                label="Gaming"
                variant="outlined"
              />

              <Chip
                icon={<PiDevices />}
                label="Technology"
                variant="outlined"
              />
            </div>
          </article>
        </article>
      </section>
    </>
  );
});

export default OnBoardingFour;
