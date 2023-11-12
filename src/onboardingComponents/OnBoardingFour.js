"use client";

import { useEffect, useState } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { TwitterPicker } from "react-color";
import ColourPickerBlock from "@/components/ColourPickerBlock";
import { observer } from "mobx-react";
import onBoardingStore from "@/stores/OnBoardingStore";
import { onBoardingButtons } from "@/data/OnBoardingButtons";

const OnBoardingFour = observer(() => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    profile: "",
    categories: {},
    tags: [],
    bio: "",
  });

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
        <article className="pt-5 px-5 pb-10 flex flex-col items-center rounded-none md:rounded-3xl w-full bg-white shadow-lg shadow-dashboard-primary-dark/10">
          <div className="flex items-center gap-1">
            <h4 className="mt-2 font-bold">mypopoff.com/</h4>
            <TextField
              label="Choose your username"
              name="username"
              value={formData.username}
              variant="standard"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-6"></div>
        </article>
      </section>
    </>
  );
});

export default OnBoardingFour;
