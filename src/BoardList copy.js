import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Board from './Board';

export default class BoardList extends Component {
  state = {
    boardList : [],
    checkList :[],
    borderId:0
  }
  
  getList = () =>{
    Axios.get('http://localhost:8000/list')
    .then( res => {
      const data = res.data;
      //const {data} = res;
      this.setState({
        boardList:data
      })
      this.props.renderComplete();//목록 출력 완료
    })
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    });
  }
  componentDidMount(){
    this.getList(); //최초한번 실행, 결과가 나오면 실행
  }
  onCheckboxChange = (checked, id)=>{
    let list = this.state.checkList;
    if(checked){
      if(list.indexOf(id) === -1){
        list.push(id);
      }
    } else{
      // id 2, false
      let idx = list.indexOf(id);
      list.splice(idx, 1);
    }
    this.setState({
      checkList:list
    });
  }
  handleModify = ()=>{
    let checklist = this.state.checkList;
    if(checklist.length === 0){
       alert('최소 하나를 체크해주세요');
    } else if(checklist.length > 1) {
      alert('하나만 체크해주세요');
    }
    this.setState({
      borderId : checklist[0]
    });   
  }
  componentDidUpdate = (prevProps)=>{
    if(this.state.checkList.length === 1 && this.state.borderId !== prevProps.boardId){
      this.props.handleModify(this.state.borderId);
    }
    if(!this.props.isComplete){
      this.getList();
    }
  }


  render() {
    return (
        <>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">선택</th>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
                <th scope="col">작성자</th>
                <th scope="col">작성일</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.boardList.map(item=>{
                  return(
                    <Board key={item.id} data={item} onCheckboxChange={this.onCheckboxChange}/>                    
                  )
                })
                //map return(<tr></tr>)
              }
             
              
            </tbody>
          </table>
          <div className="d-flex justify-content-between gap-3">
            <div className="d-flex gap-1">
              <Button variant="info" onClick={()=>{
                this.handleModify();
              }}>수정</Button>
              <Button variant="danger">삭제</Button>
            </div>
            <Button variant="primary">글쓰기</Button>
          </div>
        </>
    )
  }
}
