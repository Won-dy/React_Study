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
      selected_content_id:2,
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
    } 
    else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }

    // render 내의 this는 해당 컴포넌트 가르킴
    console.log('render', this);

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}  
        >
        </Subject>

        {/* <header>
          <h1><a href="/" onClick={function(e){
            // render 내의 함수 내의 this는 정의 안됨
            console.log('event in', this);

            console.log(e);
            e.preventDefault();

            // this.state.mode = 'welcome';
            // React에서는 state가 바뀔 때 setState로 해야 함
            // 위 처럼 바꾸면 react 몰래 바꾼 거라 모름
            this.setState({
              mode:'welcome'
            })

            // bind this하면 함수 안에서 this는 현재 컴포넌트 App이 됨
            // 즉 bind(this)하면 현재 함수의 this가 App 객체가 됨
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header> */}

        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}>
        </TOC>
        <Content title={_title} desc={_desc}></Content>

        {/*
        <Subject title="React" sub="For UI"></Subject>
        <Content title="CSS" desc="CSS is Cascading Style Sheets."></Content>
        */}
      </div>
    );
  }
}

export default App;
