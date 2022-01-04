import React, { Component } from 'react';
// React 에서는 attribute를 props라고 함
class Subject extends Component {
    render() {
      return (
        <header>
          <h1><a href="/" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    }
  }

  // 외부에서 Subject 클래스를 가져다가 쓸 수 있음
  export default Subject;