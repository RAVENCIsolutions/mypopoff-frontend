"use client";

import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";

import OnboardingOne from "@/onboardingComponents/OnboardingOne";
import OnboardingTwo from "@/onboardingComponents/OnboardingTwo";
import OnboardingThree from "@/onboardingComponents/OnBoardingThree";
import OnBoardingFour from "@/onboardingComponents/OnBoardingFour";
import OnboardingFive from "@/onboardingComponents/OnboardingFive";

import SkipButton from "@/onboardingComponents/SkipButton";
import NextButton from "@/onboardingComponents/NextButton";
import PrevButton from "@/onboardingComponents/PrevButton";

import OnboardingSteps from "@/onboardingComponents/OnboardingSteps";
import onBoardingStore from "@/stores/OnboardingStore";
import CompleteButton from "@/onboardingComponents/CompleteButton";
import { useRouter } from "next/navigation";
import { getFromStorage } from "@/utility/localStorageUtils";

const OnBoardingMain = observer(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const pageContainer = useRef(null);

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
      component: <OnboardingTwo />,
    },
    {
      id: "page-three",
      index: `03`,
      title: `Styling`,
      component: <OnboardingThree />,
    },
    {
      id: "page-four",
      index: `04`,
      title: `Colours`,
      component: <OnBoardingFour />,
    },
    {
      id: "page-five",
      index: `05`,
      title: `That's it!`,
      component: <OnboardingFive />,
    },
  ];

  const endOnboarding = async () => {
    const getUser = getFromStorage("userData");

    onBoardingStore.updateUserData({ ...getUser, onboarding_complete: true });
    await onBoardingStore.saveProgress().then(() => setSaving(false));

    router.push("/me/dashboard");
  };

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

  const nextPage = async () => {
    setSaving(true);
    await onBoardingStore.saveProgress().then(() => setSaving(false));

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
    <div className={`mx-auto mt-6 flex flex-col items-center w-full max-w-2xl`}>
      <OnboardingSteps pages={onBoardingPages} active={activeIndex} />

      <section
        ref={pageContainer}
        className="relative py-8 flex-grow left-0 w-full transition-all duration-500"
      >
        {onBoardingPages[activeIndex].component}{" "}
      </section>

      <section
        className={`relative mb-6 flex flex-col-reverse sm:flex-row items-center sm:items-start ${
          activeIndex > 0 ? "sm:justify-between" : "justify-center"
        } gap-4 w-full`}
      >
        {activeIndex > 0 && activeIndex < onBoardingPages.length - 1 && (
          <>
            {!saving && (
              <SkipButton onClick={async () => await endOnboarding()} />
            )}
          </>
        )}
        {activeIndex > 0 && (
          <div className={`flex flex-col items-center gap-1 w-full sm:w-auto`}>
            <PrevButton onClick={prevPage} />
          </div>
        )}

        {activeIndex < onBoardingPages.length - 1 ? (
          <div className={`flex flex-col items-center gap-1 w-full sm:w-auto`}>
            <NextButton onClick={nextPage} saving={saving} />
          </div>
        ) : (
          <div className={`flex flex-col items-center gap-1 w-full sm:w-auto`}>
            <CompleteButton onClick={async () => await endOnboarding()} />
          </div>
        )}
      </section>
    </div>
  );
});

export default OnBoardingMain;
