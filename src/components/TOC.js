import React, { Component } from 'react';
class TOC extends Component {
    render() {
      return (
        <nav>
          <ul>
              <li><a href="1.html">HTML</a></li>
              <li><a href="2.html">CSS</a></li>
              <li><a href="3.html">JavaScript</a></li>
          </ul>
        </nav>
      );
    }
  }

  // 외부에서 TOC 클래스를 가져다가 쓸 수 있음
  export default TOC;