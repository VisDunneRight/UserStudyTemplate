import React from 'react';
import studyData from '../Data/studyData.json'
import studyMeta from '../Data/studyMeta.json'
import Pages from './Pages/Pages';
import {Container} from 'react-bootstrap';

class Section extends React.Component {
  state = {
    data:{},
    meta:{}
  };

  componentDidMount() {
    const data = studyData;
    const meta = studyMeta;  
    this.setState({data:data, meta:meta});
  }

  render() {
    
    return (
      <Container>
      <Pages data={this.state.meta}/>
      </Container>
    );
  }
}

export default Section;
