import React, { Component } from 'react';
import TOC from './components/TOC'
import Content from './components/Content'
import Subject from './components/Subject'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // 컴포넌트를 초기화 해주고 싶은 코드
    // 상위 컴포넌트 App의 state 값을 하위 컴포넌트 Subject, TOC, Content의 props 값으로 전달 가능
    this.state = {
      subject:{title:'WEB', sub:'world wide web!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject>
        <Subject title="React" sub="For UI"></Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
        <Content title="CSS" desc="CSS is Cascading Style Sheets."></Content>
      </div>
    );
  }
}

export default App;
