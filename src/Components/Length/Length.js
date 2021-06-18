import React, { useRef, useEffect } from "react";
import { Row } from "react-bootstrap";
import * as d3 from "d3";
import useResizeObserver from "../useResizeObserver";
import "./style.css";

const margin = { top: 20, right: 30, bottom: 30, left: 30 };

const Length = ({ question, domain }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!question) return;
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    // if(!properties) return;

    //Grab the svg and set its viewbox
    const svg = d3.select(svgRef.current);
    svg.attr("viewBox", [0, 0, width, height]);
    const g = svg.select("g");
    const axis = [
      [margin.left, domain[0] + margin.top],
      [margin.left, domain[1] + margin.top],
      [width - margin.right, domain[1] + margin.top],
    ];
    const chartHeight = domain[1] + margin.top;
    let data = [];
    if (question.sizes[2] === 0) {
      data.push([
        50,
        chartHeight - question.sizes[3] - question.sizes[0],
        25,
        question.sizes[0],
        "100",
      ]);
      data.push([
        100,
        chartHeight - question.sizes[4] - question.sizes[1],
        25,
        question.sizes[1],
        "?",
      ]);
    } else {
      data.push([
        50,
        chartHeight - question.sizes[4] - question.sizes[1],
        25,
        question.sizes[1],
        "100",
      ]);
      data.push([
        100,
        chartHeight - question.sizes[3] - question.sizes[0],
        25,
        question.sizes[0],
        "?",
      ]);
    }

    //Data rename
    g.selectAll(".rect")
      .data(data)
      .join("rect")
      .attr("class", "rect")
      .attr("stroke", "#000")
      .attr("x", (d) => d[0])
      .attr("y", (d) => d[1])
      .attr("width", (d) => d[2])
      .attr("height", (d) => d[3])
      .attr("fill", "black");

    const axisLine = d3.line();
    g.selectAll("path")
      .data([axis])
      .join("path")
      .attr("d", (value) => axisLine(value))
      .attr("fill", "none")
      .attr("stroke", "black");

    g.selectAll(".mytooltip")
      .data(data)
      .join("text")
      .style("opacity", 1)
      .attr("class", "mytooltip")
      .text((d) => d[4])
      .attr("x", (d) => {
        return d[0] + d[2] / 2;
      })
      .attr("y", (d) => height)
      .attr("text-anchor", "middle");
  }, [dimensions, domain, question]);

  return (
    <Row>
      <div
        ref={wrapperRef}
        style={{
          marginBottom: "2rem",
          width: "400px",
          height: domain[1] + margin.top + margin.bottom,
        }}
      >
        <svg ref={svgRef}>
          <g />
        </svg>
      </div>
    </Row>
  );
};

export default Length;
