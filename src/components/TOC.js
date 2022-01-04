import React, { Component } from 'react';
class TOC extends Component {
    render() {
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length) {
        // React에서는 여러 개의 element 자동 생성할 때 콘솔에 에러가 발생 > 각 element들은 key라는 props를 가져 구분 해야함
        lists.push(<li key={data[i].id}><a href={"/content/"+data[i].id}>{data[i].title}</a></li>);
        i = i + 1;
      }
      return (
        <nav>
          <ul>
              {lists}
          </ul>
        </nav>
      );
    }
  }

  // 외부에서 TOC 클래스를 가져다가 쓸 수 있음
  export default TOC;