import React, { Component } from 'react';
class Content extends Component {
    render() {
      console.log('Content render');
      return (
        <article>
          <h2>{this.props.title}</h2>
          {this.props.desc}
        </article>
      );
    }
  }

  // 외부에서 Content 클래스를 가져다가 쓸 수 있음
  export default Content;