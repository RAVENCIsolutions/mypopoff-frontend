"use client";

const OnBoardingTwo = (props) => {
  return (
    <section className={`p-6 bg-white rounded-3xl w-full`}>
      {props.pageLayouts &&
        props.pageLayouts.map((layout, index) => (
          <article key={`page-layout-${index}`}>{layout.layoutID}</article>
        ))}
    </section>
  );
};

export default OnBoardingTwo;
