"use client";

import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { observer } from "mobx-react";
import onBoardingStore from "@/stores/OnboardingStore";
import { OnboardingLayouts } from "@/data/OnboardingLayouts";

const OnboardingOne = observer((props) => {
  const [activeLayout, setActiveLayout] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <section className={`my-6 text-center`}>
      <h1 className={`text-2xl sm:text-4xl font-bold`}>
        🎉 Congratulations 🎉
      </h1>
      <h2 className={`text-base sm:text-xl`}>
        Let's get your new landing page popping.
      </h2>
      <p className={`mt-16 text-sm sm:text-base text-action`}>
        (Usually takes about 5 minutes)
      </p>
    </section>
  );
});

export default OnboardingOne;
