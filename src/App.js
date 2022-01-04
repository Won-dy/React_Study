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
      mode:"read",
      subject:{title:'WEB', sub:'world wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  // React에서는 props나 state 값이 바뀌면 해당되는 컴포넌트의 render함수가 호출되도록 약속
  // props나 state 값이 바뀌면 화면이 다시 그려짐
  render() {  
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read'){
      _title = this.state.contents[2].title;
      _desc = this.state.contents[2].desc;
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject>
        <Subject title="React" sub="For UI"></Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
        <Content title="CSS" desc="CSS is Cascading Style Sheets."></Content>
      </div>
    );
  }
}

export default App;
