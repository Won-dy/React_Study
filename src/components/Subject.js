import React, { Component } from 'react';
// React 에서는 attribute를 props라고 함
class Subject extends Component {
    render() {
      return (
        <header>
          <h1>{this.props.title}</h1>
          {this.props.sub}
        </header>
      );
    }
  }

  // 외부에서 Subject 클래스를 가져다가 쓸 수 있음
  export default Subject;