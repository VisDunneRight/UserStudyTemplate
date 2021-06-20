import React from "react";
import studyData from "../Data/studyData.json";
import studyMeta from "../Data/studyMeta.json";
import Pages from "./Pages/Pages";
import { MyContainer, MyDiv } from "./style";

class Section extends React.Component {
  state = {
    data: {},
    siteStructure: {},
    currSession: { currPage: 0, id: 0 },
    answers: [],
  };

  componentDidMount() {
    const data = studyData;
    const siteStructure = studyMeta;
    this.setState({ data: data, siteStructure: siteStructure });
  }

  nextPage = () => {
    const currSession = this.state.currSession;
    currSession.currPage += 1;
    console.log(
      this.state.siteStructure.pages.length,
      currSession.currPage - 1
    );
    if (this.state.siteStructure.pages.length - 1 === currSession.currPage) {
      this.exportStudy();
    }
    this.setState({ currSession: currSession });
  };

  grabInformation = (data) => {
    const currSession = this.state.currSession;
    currSession.demographic = data;
    const sessionID = this.state.siteStructure.meta.sessionID;
    if (sessionID in data) {
      currSession.id = data[sessionID];
    }
    this.setState({ currSession: currSession });
  };

  saveAnswer = (field, answer) => {
    const newAnswers = this.state.answers.slice();
    newAnswers.push([field, answer]);
    this.setState({ answers: newAnswers });
  };

  exportStudy = () => {
    var FileSaver = require("file-saver");

    let jsonFile = {
      session: this.state.currSession,
      answers: this.state.answers,
    };

    var jsonse = JSON.stringify(jsonFile, null, 2);

    var blob = new Blob([jsonse], { type: "application/json" });
    FileSaver.saveAs(blob, "user" + this.state.currSession.id + ".json");
  };

  render() {
    return (
      <MyDiv>
        <MyContainer>
          <Pages
            siteStructure={this.state.siteStructure}
            currPage={this.state.currSession.currPage}
            data={this.state.data}
            sessionID={this.state.currSession.id}
            grabInformation={this.grabInformation}
            saveAnswer={this.saveAnswer}
            nextPage={this.nextPage}
            exportStudy={this.exportStudy}
          />
        </MyContainer>
      </MyDiv>
    );
  }
}

export default Section;
