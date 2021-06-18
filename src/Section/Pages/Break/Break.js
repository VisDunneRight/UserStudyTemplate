import { Row, Button } from "react-bootstrap";

const Break = ({ page, nextPage }) => {
  return (
    <>
      <Row>
        <h1>{page.title}</h1>
      </Row>
      <Row>
        <pre>{page.text}</pre>
      </Row>
      <Button variant="primary" onClick={nextPage}>
        Next
      </Button>{" "}
    </>
  );
};

export default Break;
