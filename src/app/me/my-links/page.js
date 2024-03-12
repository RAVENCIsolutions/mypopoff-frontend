"use client";

import { useState } from "react";

import { observer } from "mobx-react";

import NewLinkBlock from "@/components/NewLinkBlock";
import LinksList from "@/components/LinksList";

import userStore from "@/stores/UserStore";
import { CircularProgress, Skeleton, Stack } from "@mui/material";

const MyLinks = observer(() => {
  const [processing, setProcessing] = useState(true);

  const skeletonList = [];

  for (let x = 0; x < 4; x++) {
    skeletonList.push(x);
  }

  return (
    <article className="relative w-full max-h-full overflow-hidden sm:rounded-lg">
      {processing ? (
        <div className={`absolute top-3 right-4`}>
          <Stack sx={{ color: "grey.500" }} spacing={2}>
            <CircularProgress color="inherit" size={25} />
          </Stack>
        </div>
      ) : null}

      <div className="flex flex-col md:flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="px-3 py-5 sm:p-6 w-full min-h-full sm:overflow-y-auto">
          <h2 className="pb-2 lg:pb-4 mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            My Links
          </h2>
          <section className="flex flex-col gap-4">
            <NewLinkBlock
              processing={processing}
              setProcessing={setProcessing}
            />

            <h3 className="mt-2 text-lg w-full">Existing Links</h3>

            {processing &&
              skeletonList.map((item, index) => (
                <section
                  key={`list-${item}-${index}`}
                  className="pl-6 flex-grow flex flex-col overflow-x-clip"
                >
                  <div
                    className={`pl-3 pr-2 py-2 pb-0 sm:p-5 sm:pb-2 flex flex-col items-stretch justify-between border-2 border-transparent bg-dashboard-primary-light/30 dark:bg-dashboard-secondary-light/5 rounded-lg`}
                  >
                    <div className="flex flex-col gap-4 w-full">
                      {/* Title */}
                      <div className="flex items-center justify-between gap-1 lg:gap-2">
                        <div className="flex-grow flex gap-4 w-6">
                          <div className={`hidden sm:block`}>
                            <Skeleton
                              variant="circular"
                              width={20}
                              height={20}
                            />
                          </div>
                          <div
                            className={`max-w-[40%] sm:max-w-full overflow-hidden`}
                          >
                            <Skeleton
                              variant="rectangular"
                              width={150}
                              height={15}
                            />
                          </div>
                        </div>
                        <Skeleton variant="circular" width={20} height={20} />
                      </div>

                      {/* Link */}
                      <div className="flex items-center justify-between gap-1 lg:gap-2">
                        <div className="flex-grow flex gap-4 w-6">
                          <div className={`hidden sm:block`}>
                            <Skeleton
                              variant="circular"
                              width={20}
                              height={20}
                            />
                          </div>
                          <div
                            className={`max-w-[70%] sm:max-w-full overflow-hidden`}
                          >
                            <Skeleton
                              variant="rectangular"
                              width={200}
                              height={15}
                            />
                          </div>
                        </div>
                        <Skeleton variant="circular" width={20} height={20} />
                      </div>
                    </div>

                    <section className="mt-3 py-3 flex justify-between items-center border-t-2 border-dashboard-primary-light/50 dark:border-primary-light/10">
                      <article className="flex items-center gap-1">
                        <Skeleton variant="circular" width={20} height={20} />
                      </article>

                      <article className="flex items-center gap-2">
                        <Skeleton variant="text" width={50} height={15} />
                        <Skeleton variant="rounded" width={35} height={15} />
                      </article>
                    </section>
                  </div>
                </section>
              ))}

            <LinksList processing={processing} setProcessing={setProcessing} />
          </section>
        </section>
      </div>
    </article>
  );
});

export default MyLinks;
