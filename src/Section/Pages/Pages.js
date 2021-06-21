import React from "react";
import Demographics from "./Demographic/Demographic";
import Information from "./Information/Information";
import Break from "./Break/Break";
import Section from "./Section/Section";

const Option = ({
  page,
  data,
  grabInformation,
  saveAnswer,
  setProgressBar,
  nextPage,
}) => {
  if (page.type === "Demographic") {
    return (
      <Demographics
        page={page}
        grabInformation={grabInformation}
        nextPage={nextPage}
      />
    );
  } else if (page.type === "Information") {
    return <Information page={page} nextPage={nextPage} />;
  } else if (page.type === "Section") {
    return (
      <Section
        page={page}
        data={data[page.position]}
        saveAnswer={saveAnswer}
        setProgressBar={setProgressBar}
        nextPage={nextPage}
      />
    );
  } else if (page.type === "Break") {
    return <Break page={page} nextPage={nextPage} />;
  } else {
    console.log("Page missing", page.type);
    return <></>;
  }
};

const Pages = ({
  siteStructure,
  data,
  grabInformation,
  currPage,
  sessionID,
  saveAnswer,
  nextPage,
  setProgressBar,
}) => {
  return (
    <>
      {siteStructure.pages && (
        <Option
          key={currPage}
          page={siteStructure.pages[currPage]}
          data={data[sessionID]}
          grabInformation={grabInformation}
          saveAnswer={saveAnswer}
          nextPage={nextPage}
          setProgressBar={setProgressBar}
        />
      )}
    </>
  );
};

export default Pages;
