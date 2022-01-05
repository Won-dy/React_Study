import React, { Component } from 'react';
class TOC extends Component {
    // shouldComponentUpdate 호출 후 render 호출
    // return true면 render 호출, false면 X
    // 새로 바뀐 props, state와 이전 값에 접근 가능
    shouldComponentUpdate(newProps, newState){
      console.log("TOC===>shouldComponentUpdate")
      if(this.props.data === newProps.data){
        return false;
      }
      return true;
    }
    render() {
      console.log("TOC===>render")
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length) {
        // React에서는 여러 개의 element 자동 생성할 때 콘솔에 에러가 발생 > 각 element들은 key라는 props를 가져 구분 해야함
        lists.push(
            <li key={data[i].id}>
                <a 
                    href={"/content/"+data[i].id}
                    // #1. 속성을 이용하는 방식 -> onChangePage의 매개변수로 넘겨주기
                    data-id={data[i].id}
                    onClick={function(e){
                        e.preventDefault();
                        // e.taget -> e가 들어있는 <a> 태그 나타냄
                        // dataset -> data-(id) 하면 dataset안에 (id)에 {data[i].id}값 들어감
                        this.props.onChangePage(e.target.dataset.id);
                    }.bind(this)}
                    
                    // #2. bind 함수의 인자에 넣기
                    // bind의 2번째 인자 부터 function의 1번째 매개변수와 대응, e는 밀림
                    // onClick={function(id, e){
                    //     e.preventDefault();
                    //     // e.taget -> e가 들어있는 <a> 태그 나타냄
                    //     // dataset -> data-(id) 하면 dataset안에 (id)에 {data[i].id}값 들어감
                    //     this.props.onChangePage(id);
                    // }.bind(this, data[i].id)}
                >{data[i].title}</a>
            </li>);
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