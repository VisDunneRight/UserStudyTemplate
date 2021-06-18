import { Button, Form, Col } from "react-bootstrap";
import { useState } from "react";

const Demographics = ({ page, nextPage, grabInformation }) => {
  const [values, setValues] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    grabInformation(values);
    nextPage();
  }
  function onChange(fieldId, value) {
    setValues((currentValues) => {
      currentValues[fieldId] = value;
      return currentValues;
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <h1>{page.title}</h1>
      </Form.Row>
      {page.attributes &&
        page.attributes.map((row, index) => (
          <div key={index}>
            <Form.Row>
              <Form.Group as={Col} controlId={row.label}>
                <Form.Label>{row.label}</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    value={values[row.label]}
                    onChange={(e) => onChange(row.label, e.target.value)}
                    placeholder={row.label}
                  />
                </Col>
              </Form.Group>
            </Form.Row>
          </div>
        ))}
      <Button variant="primary" type="submit">
        Next
      </Button>{" "}
    </Form>
  );
};

export default Demographics;
