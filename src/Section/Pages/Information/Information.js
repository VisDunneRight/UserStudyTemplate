import { Col, Button } from "react-bootstrap";
import { MyRow } from "./style";

const Information = ({ page, nextPage }) => {
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
        <></>
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
