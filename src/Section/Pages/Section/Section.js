import { Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Poca from "../../../Components/Poca/Poca";
import Area from "../../../Components/Area/Area";
import Angle from "../../../Components/Angle/Angle";
import Length from "../../../Components/Length/Length";
import Poua from "../../../Components/Poua/Poua";

const Section = ({ page, data, nextPage }) => {
  const [index, setIndex] = useState(0);
  const [array, setArray] = useState([]);

  useEffect(() => {
    let lengths = [];
    let array = [];
    for (let used of page.valuesUsed) {
      let usedLength = 0;
      if (Array.isArray(data[used])) {
        usedLength = data[used].length;
      } else {
        usedLength = 1;
      }

      lengths.push(usedLength);
    }
    const maxLength = Math.max(...lengths);
    for (var i = 0; i < maxLength; i++) {
      let row = {};
      let index = 0;
      for (let used of page.valuesUsed) {
        const usedLength = lengths[index];
        index++;
        if (usedLength === 1) {
          row[used] = data[used];
        } else if (usedLength === maxLength) {
          row[used] = data[used][i];
        } else {
          console.log(
            "Something went wrong with number entries don't match max:",
            maxLength,
            "or 1:",
            used
          );
        }
      }
      array.push(row);
    }
    setArray(array);
  }, [data, page]);

  const typeRendering = (data, array, index, domain) => {
    console.log(data.type);
    switch (data.type) {
      case "POCA":
        return <Poca question={array[index]} domain={domain} />;
      case "Angle":
        return <Angle question={array[index]} domain={domain} />;
      case "Area":
        return <Area question={array[index]} domain={domain} />;
      case "Length":
        return <Length question={array[index]} domain={domain} />;
      case "POUA":
        return <Poua question={array[index]} domain={domain} />;
      default:
        throw new Error("Missing type of testing Section.");
    }
  };
  const nextQuestion = () => {
    if (index + 1 === array.length) {
      nextPage();
      return;
    }
    setIndex((currIndex) => {
      return currIndex + 1;
    });
  };
  return (
    <>
      {typeRendering(data, array, index, data.Domain)}
      <Row>{array[index] && array[index].Question}</Row>
      <Button variant="primary" onClick={nextQuestion}>
        Next
      </Button>{" "}
    </>
  );
};

export default Section;
