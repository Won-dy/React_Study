import React, { Component } from 'react';
import TOC from './components/TOC'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'
import Subject from './components/Subject'
import Control from './components/Control'
import './App.css';
  
class App extends Component {
  constructor(props) {
    super(props);
    // 컴포넌트를 초기화 해주고 싶은 코드
    // 상위 컴포넌트 App의 state 값을 하위 컴포넌트 Subject, TOC, Content의 props 값으로 전달 가능
    this.max_content_id = 3;  // UI에 영향 없는 애는 state로 안함
    this.state = {
      mode:"welcome",
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
  getReadContent(){
    // 클릭한 목록 정보 얻어오기
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } 
    else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }
    else if(this.state.mode ==='create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        this.max_content_id += 1;
        // #1. push(): 원본 contents의 배열에 값 추가
        // state 값 추가 변경 시 원본 건들지 마 > 추후 성능 개선 시 문제
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
      
        // #1-1. push() 쓰고 싶으면 Array.from 사용해서 복제 후 사용 / 배열일 때만 가능
        // Object.assign -> 객체를 바꾸고 싶을 때 사용
        // Array.frome -> 내용은 같지만 === 결과는 false이므로 shouldComponentUpdate 사용 가능
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:newContents,
          mode:'read',
          selected_content_id:this.max_content_id
        });

        // #2. concat(): 원본 유지, 복제본 리턴
        // state 값 수정시 원본 수정X, 수정 복제본을 setState해라
        // shouldComponentUpdate 위해 불필요한 render 호출 방지
        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        // this.setState({
        //   contents:_contents
        // });
      }.bind(this)}></CreateContent>
    }
    else if(this.state.mode ==='update'){
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          // 내용 복제 해서 반영, 원본 수정 X -> immutable
          var _contents = Array.from(this.state.contents); 
          // id 같은 원소를 수정
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i += 1;
          }
          this.setState({
            contents:_contents,
            mode:'read'
          });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  // React에서는 props나 state 값이 바뀌면 해당되는 컴포넌트의 render함수가 호출되도록 약속
  // props나 state 값이 바뀌면 화면이 다시 그려짐
  render() {  
    console.log('App render');
    
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

          {/* CRU는 특정 페이지로 이동해서 오퍼레이션 실행
              Delete는 버튼 클릭할 때 작동하도록 구현 */}
        <Control 
          onChangeMode={function(_mode){
            if(_mode === 'delete'){
               if(window.confirm('Really Delete?')){
                 var _contents = Array.from(this.state.contents);
                 var i = 0;
                 while(i<_contents.length){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i,1)  // _contents의 원본을 바꿈 -> i부터 1개 지움
                    break;
                  }
                  i += 1;
                 }
                 this.setState({
                  mode:'welcome', 
                  contents:_contents
                });
                alert('Deleted!');
               }
            } else {
              this.setState({
                mode:_mode
              });
            }
        }.bind(this)}
        ></Control>
        {this.getContent()}

        {/*
        <Subject title="React" sub="For UI"></Subject>
        <Content title="CSS" desc="CSS is Cascading Style Sheets."></Content>
        */}
      </div>
    );
  }
}

export default App;
