import { Row, Button } from "react-bootstrap";

const Information = ({ page, nextPage }) => {
  return (
    <>
      <Row>
        <h1>{page.title}</h1>
      </Row>
      {page.text &&
        page.text.map((line, index) => <Row key={index}>{line}</Row>)}
      <Button variant="primary" onClick={nextPage}>
        Next
      </Button>{" "}
    </>
  );
};

export default Information;
