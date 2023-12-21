"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import ColourPickerBlock from "@/components/ColourPickerBlock";

import onBoardingStore from "@/stores/OnBoardingStore";

import Layout01 from "@/templates/layout-01";
import Layout02 from "@/templates/layout-02";
import Layout03 from "@/templates/layout-03";
import Layout04 from "@/templates/layout-04";
import Layout05 from "@/templates/layout-05";
import Layout06 from "@/templates/layout-06";
import Layout07 from "@/templates/layout-07";
import Layout08 from "@/templates/layout-08";
import Layout09 from "@/templates/layout-09";
import Layout10 from "@/templates/layout-10";

const OnBoardingThree = observer((props) => {
  const [loading, setLoading] = useState(false);

  const PreviewWindow = styled.div``;

  const layoutIndex = {
    "layout-01": <Layout01 previewWindow={true} />,
    "layout-02": <Layout02 previewWindow={true} />,
    "layout-03": <Layout03 previewWindow={true} />,
    "layout-04": <Layout04 previewWindow={true} />,
    "layout-05": <Layout05 previewWindow={true} />,
    "layout-06": <Layout06 previewWindow={true} />,
    "layout-07": <Layout07 previewWindow={true} />,
    "layout-08": <Layout08 previewWindow={true} />,
    "layout-09": <Layout09 previewWindow={true} />,
    "layout-10": <Layout10 previewWindow={true} />,
  };

  useEffect(() => {
    setLoading(true);

    props.setGreenLight(true);
    onBoardingStore.resetColours();

    setLoading(false);
  }, []);

  return (
    <>
      <section className="relative mb-10 md:pt-6 flex flex-col md:flex-row items-stretch justify-between">
        <section className="md:pt-3 md:pr-6 relative flex items-start w-full md:w-1/2 md:border-r-2">
          <h3 className="hidden md:block absolute top-0 font-bold text-base md:text-lg italic opacity-50">
            Options
          </h3>
          <article className="mt-10 p-3 md:p-5 rounded-none md:rounded-3xl w-full bg-white shadow-lg shadow-dashboard-primary-dark/10">
            <div className="flex flex-col items-start gap-6">
              {Object.keys(onBoardingStore.onBoardingCurrent.palette).map(
                (key, index) => (
                  <ColourPickerBlock
                    key={key}
                    label={onBoardingStore.colourLabels[key]}
                    colorKey={key}
                  />
                ),
              )}
            </div>
          </article>
        </section>

        <section className="hidden md:block relative pt-3 pl-6 w-1/2">
          <h3 className="absolute top-0 left-6 self-center font-bold text-lg italic opacity-50">
            Preview
          </h3>
          <div className="mt-5 relative h-full w-full">
            {loading ? (
              <CircularProgress />
            ) : (
              // Preview Window
              <PreviewWindow>
                <article className="pointer-events-none absolute left-[50%] -translate-x-2/4 h-[600px] w-[300px] z-50">
                  <img
                    src="/images/onboarding/mobile-frame.png"
                    className="pointer-events-none absolute w-full h-full object-contain z-50"
                    alt={"Mobile frame"}
                  />
                </article>

                <article
                  className={
                    "mx-auto relative h-[600px] w-[300px] rounded-[40px] overflow-hidden"
                  }
                >
                  <section className="preview-window w-full h-full overflow-x-hidden overflow-y-auto">
                    {layoutIndex[onBoardingStore.onBoardingCurrent.pageLayout]}
                  </section>
                  {/*{onBoardingStore.onBoardingCurrent.buttonStyle}*/}
                </article>
              </PreviewWindow>
            )}
          </div>
        </section>
      </section>
    </>
  );
});

export default OnBoardingThree;
