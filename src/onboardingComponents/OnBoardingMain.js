"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import OnboardingOne from "./OnboardingOne";
import OnboardingTwo from "./OnboardingTwo";
import OnboardingThree from "./OnboardingThree";
import OnBoardingFour from "./OnboardingFour";
import OnboardingFive from "./OnboardingFive";
import OnboardingSteps from "./OnboardingSteps";

import SkipButton from "./SkipButton";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";

import { updateUser } from "@/utility/dbUtils";
import { updateLastModified } from "@/utility/localStorageUtils";

import CompleteButton from "./CompleteButton";

import { FaTimesCircle } from "react-icons/fa";

const OnBoardingMain = ({ session, data }) => {
  // States
  const [activeIndex, setActiveIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [verified, setVerified] = useState(false);

  // Variables
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageContainer = useRef(null);

  const [userData, setUserData] = useState(data);

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
      component: (
        <OnboardingTwo
          session={session}
          data={userData}
          setData={setUserData}
        />
      ),
    },
    {
      id: "page-three",
      index: `03`,
      title: `Styling`,
      component: (
        <OnboardingThree
          session={session}
          data={userData}
          setData={setUserData}
        />
      ),
    },
    {
      id: "page-four",
      index: `04`,
      title: `Colours`,
      component: (
        <OnBoardingFour
          session={session}
          data={userData}
          setData={setUserData}
        />
      ),
    },
    {
      id: "page-five",
      index: `05`,
      title: `That's it!`,
      component: <OnboardingFive />,
    },
  ];

  const endOnboarding = async () => {
    const saveData = userData;
    saveData.onboarding_complete = true;

    updateUser(session.user.id, saveData)
      .then(() => {
        updateLastModified();

        setTimeout(() => {
          setSaving(false);
        }, 500);
      })
      .catch((err) => {
        console.error(`Couldn't update user:`, err.message);
      });

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

    await updateUser(session.user.id, userData)
      .then(() => {
        updateLastModified();

        setTimeout(() => {
          setSaving(false);
        }, 500);
      })
      .catch((err) => {
        console.error(`Couldn't update user:`, err.message);
      });

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
    if (searchParams.get("verification") === "success") {
      // Verification successful
      setVerified(true);
    }
  }, [router]);

  useEffect(() => {
    pageContainer.current.style.left = "0px";
    pageContainer.current.style.opacity = "1";
  }, []);

  return (
    <div className={`mx-auto mt-6 grid grid-cols-1 w-full max-w-2xl`}>
      {verified && (
        <div
          className={`py-3 px-5 fixed top-0 w-full grid place-items-center bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark font-bold italic z-50`}
        >
          Nice! Your email address has been verified! ✅
          <div
            className={`absolute top-1/2 -translate-y-1/2 right-2`}
            onClick={() => setVerified(false)}
          >
            <FaTimesCircle
              className={`cursor-pointer text-primary-light dark:text-primary-dark opacity-50 hover:opacity-100 transition-all duration-300`}
            />
          </div>
        </div>
      )}

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
};

export default OnBoardingMain;
