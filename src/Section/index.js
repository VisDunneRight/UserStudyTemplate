import React from "react";
import studyData from "../Data/studyData.json";
import studyMeta from "../Data/studyMeta.json";
import Pages from "./Pages/Pages";
import { Container } from "react-bootstrap";

class Section extends React.Component {
  state = {
    data: {},
    siteStructure: {},
    currSession: { currPage: 0, id: 0 },
  };

  componentDidMount() {
    const data = studyData;
    const siteStructure = studyMeta;
    this.setState({ data: data, siteStructure: siteStructure });
  }

  nextPage = () => {
    const currSession = this.state.currSession;
    currSession.currPage += 1;
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

  render() {
    return (
      <Container>
        <Pages
          siteStructure={this.state.siteStructure}
          currPage={this.state.currSession.currPage}
          data={this.state.data}
          sessionID={this.state.currSession.id}
          grabInformation={this.grabInformation}
          nextPage={this.nextPage}
        />
      </Container>
    );
  }
}

export default Section;
