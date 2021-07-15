import { Col, Button, Image } from "react-bootstrap";
import { MyRow } from "./style";

const TypeImage = ({ type }) => {
  switch (type) {
    case "Area":
      return <Image src={process.env.PUBLIC_URL + "/Area.png"} />;
    case "Angle":
      return <Image src={process.env.PUBLIC_URL + "/Angle.png"} />;
    case "Length":
      return <Image src={process.env.PUBLIC_URL + "/Length.png"} />;
    case "POUA":
      return <Image src={process.env.PUBLIC_URL + "/POUA.png"} />;
    case "POCA":
      return <Image src={process.env.PUBLIC_URL + "/POCA.png"} />;
    default:
      return <></>;
  }
};

const RenderResults = ({ results }) => {
  return (
    <>
      <MyRow>
        <Col>More Accurate</Col>
        <Col>Less Accurate</Col>
      </MyRow>

      {results.map((row) => (
        <Col>
          <TypeImage key={row[0]} type={row[0]} />
        </Col>
      ))}
    </>
  );
};

const Information = ({ page, nextPage, exportStudy, results }) => {
  if (page.finish === true) {
    // localStorage.clear();
  }
  return (
    <>
      <MyRow>
        <h1>{page.title}</h1>
      </MyRow>
      {page.text &&
        page.text.map((line, index) => <MyRow key={index}>{line}</MyRow>)}
      <MyRow>
        <br />
      </MyRow>
      {page.finish === true ? (
        <>
          <MyRow>
            <RenderResults results={results} />
          </MyRow>
          <MyRow>
            <Col>
              <Button variant="secondary" onClick={exportStudy}>
                Download File
              </Button>{" "}
            </Col>
          </MyRow>
        </>
      ) : (
        <MyRow>
          <Col>
            <Button variant="secondary" onClick={nextPage}>
              Next
            </Button>{" "}
          </Col>
        </MyRow>
      )}
    </>
  );
};

export default Information;
