"use client";

import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { FaAngleLeft, FaAngleRight, FaArrowRight } from "react-icons/fa";

import OnboardingOne from "@/onboardingComponents/OnboardingOne";
import OnboardingTwo from "@/onboardingComponents/OnboardingTwo";
import OnboardingThree from "@/onboardingComponents/OnboardingThree";
import OnBoardingFour from "@/onboardingComponents/OnBoardingFour";
import { Alert, Box, Snackbar } from "@mui/material";
import PopOffSnackbarBlock from "@/components/PopOffSnackbarBlock";
import SkipButton from "@/onboardingComponents/SkipButton";
import NextButton from "@/onboardingComponents/NextButton";
import OnboardingSteps from "@/onboardingComponents/OnboardingSteps";
import PrevButton from "@/onboardingComponents/PrevButton";
import onBoardingStore from "@/stores/OnboardingStore";
import { OnboardingLayouts } from "@/data/OnboardingLayouts";

const OnBoardingMain = observer(() => {
  const [activeIndex, setActiveIndex] = useState(1);

  const pageContainer = useRef(null);
  const snackbar = useRef(null);

  const onBoardingTitle = [
    {
      id: "page-one",
      title: "Step 1: Choose Layout",
    },
    { id: "page-two", title: "Step 2: Choose Buttons" },
    { id: "page-three", title: "Step 3: Choose Colours" },
    { id: "page-four", title: "Step 4: Personalise" },
  ];

  const onBoardingPages = [
    {
      id: "page-one",
      index: `01`,
      title: `Congrats!`,
      component: <OnboardingOne />,
    },
    {
      id: "page-two",
      index: `02`,
      title: `Info`,
      component: <OnboardingTwo pageLayouts={OnboardingLayouts} />,
    },
    {
      id: "page-three",
      index: `03`,
      title: `Page Style`,
      component: <OnboardingThree pageLayouts={OnboardingLayouts} />,
    },
    {
      id: "page-four",
      index: `04`,
      title: `Button Style`,
      component: <OnBoardingFour />,
    },
    { index: `05`, title: `Colours` },
    { index: `06`, title: `That's it!` },
  ];

  const prevPage = () => {
    pageContainer.current.style.left = "200px";
    pageContainer.current.style.opacity = "0";

    setTimeout(() => {
      setActiveIndex(activeIndex - 1);
      pageContainer.current.style.left = "-400px";
    }, 400);

    setTimeout(() => {
      pageContainer.current.style.left = "0px";
      pageContainer.current.style.opacity = "1";
    }, 600);
  };

  const nextPage = () => {
    pageContainer.current.style.left = "-200px";
    pageContainer.current.style.opacity = "0";

    setTimeout(() => {
      setActiveIndex(activeIndex + 1);
      pageContainer.current.style.left = "400px";
    }, 400);

    setTimeout(() => {
      pageContainer.current.style.left = "0px";
      pageContainer.current.style.opacity = "1";
    }, 600);
  };

  useEffect(() => {
    pageContainer.current.style.left = "0px";
    pageContainer.current.style.opacity = "1";
  }, []);

  return (
    <main
      className={`mx-auto mt-6 flex flex-col items-center w-full max-w-2xl`}
    >
      <OnboardingSteps pages={onBoardingPages} active={activeIndex} />

      <section
        ref={pageContainer}
        className="relative py-8 flex-grow left-0 w-full transition-all duration-500"
      >
        {onBoardingPages[activeIndex].component}{" "}
      </section>

      <section
        className={`flex flex-col sm:flex-row items-start ${
          activeIndex > 0 ? "sm:justify-between" : "justify-center"
        } gap-4 w-full`}
      >
        {activeIndex > 0 && <PrevButton onClick={prevPage} />}

        <div className={`flex flex-col items-center gap-1 w-full sm:w-auto`}>
          <NextButton onClick={nextPage} />
          <SkipButton />
        </div>
      </section>
    </main>
  );
});

export default OnBoardingMain;
