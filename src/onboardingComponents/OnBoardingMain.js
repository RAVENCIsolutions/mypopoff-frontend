"use client";

import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { FaAngleLeft, FaAngleRight, FaArrowRight } from "react-icons/fa";

import OnBoardingOne from "@/onboardingComponents/OnBoardingOne";
import OnBoardingTwo from "@/onboardingComponents/OnBoardingTwo";
import OnBoardingThree from "@/onboardingComponents/OnBoardingThree";
import OnBoardingFour from "@/onboardingComponents/OnBoardingFour";
import { Alert, Box, Snackbar } from "@mui/material";
import PopOffSnackbarBlock from "@/components/PopOffSnackbarBlock";

const OnBoardingMain = observer(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [greenLight, setGreenLight] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

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
      component: (
        <OnBoardingOne
          setGreenLight={setGreenLight}
          setFeedback={setFeedback}
        />
      ),
    },
    {
      id: "page-two",
      component: (
        <OnBoardingTwo
          setGreenLight={setGreenLight}
          setFeedback={setFeedback}
        />
      ),
    },
    {
      id: "page-three",
      component: (
        <OnBoardingThree
          setGreenLight={setGreenLight}
          setFeedback={setFeedback}
        />
      ),
    },
    {
      id: "page-four",
      component: (
        <OnBoardingFour
          setGreenLight={setGreenLight}
          setFeedback={setFeedback}
        />
      ),
    },
  ];

  const handleShowFeedback = () => {
    setShowFeedback(true);
  };

  const handleHideFeedback = () => {
    setShowFeedback(false);
  };

  const prevPage = () => {
    if (greenLight) {
      setFeedback([]);
      setGreenLight(false);
      handleHideFeedback();

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
    } else {
      handleShowFeedback();
    }
  };

  const nextPage = () => {
    if (greenLight) {
      setFeedback([]);
      setGreenLight(false);
      handleHideFeedback();

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
    } else {
      handleShowFeedback();
    }
  };

  useEffect(() => {
    pageContainer.current.style.left = "0px";
    pageContainer.current.style.opacity = "1";
  }, []);

  return (
    <main className="pb-6 relative flex-grow flex flex-col items-between justify-between gap-4 md:gap-2 min-h-min">
      <PopOffSnackbarBlock
        value={feedback}
        changeValue={setFeedback}
        show={showFeedback}
      />

      <section className="mt-2 md:mt-4 mb-2 md:my-0 max-w-xs sm:max-w-sm md:max-w-none">
        <h1 className="text-lg sm:text-xl font-sans">
          🎈 Congratulations 🎉🎉 on your new account! Let's get you set up.
        </h1>
        <h3 className="mt-4 text-xl md:text-3xl font-bold font-sans">
          {onBoardingTitle[activeIndex].title}
        </h3>
      </section>

      <section
        ref={pageContainer}
        className="relative flex-grow left-0 transition-all duration-500"
      >
        {onBoardingPages[activeIndex].component}{" "}
      </section>

      <article
        className={`pt-6 flex items-center ${
          activeIndex > 0 ? "justify-between" : "justify-end"
        } gap-4 border-t-2 border-primary-dark/10`}
      >
        {activeIndex > 0 && (
          <button
            className="px-8 pt-2 pb-2 flex items-center justify-center gap-2 hover:gap-4 border-2 border-primary-dark/40 hover:border-action bg-transparent hover:bg-action w-full md:w-auto md:rounded-full text-primary-dark/40 hover:text-primary-light font-bold transition-all duration-300"
            onClick={prevPage}
          >
            <FaAngleLeft className="-mt-0.5" className="hidden md:block" />
            Go Back
          </button>
        )}

        <button
          className="px-8 pt-2 pb-2 md:self-end flex items-center justify-center gap-2 hover:gap-4 border-2 border-action bg-transparent hover:bg-action w-full md:w-auto md:rounded-full text-action hover:text-primary-light font-bold transition-all duration-300"
          onClick={nextPage}
        >
          {activeIndex < onBoardingPages.length - 1
            ? "Next Step"
            : "Start Creating Links"}{" "}
          <FaAngleRight className="-mt-0.5" className="hidden md:block" />
        </button>
      </article>
    </main>
  );
});

export default OnBoardingMain;
