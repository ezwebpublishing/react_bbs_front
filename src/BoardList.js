import React, { Component, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Board from './Board';
import { Link, useNavigate } from 'react-router-dom';

function BoardList(props){
  const [boardList, setBoardList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [boardId, setBoardId] = useState(0);
  const navigate = useNavigate();

  let getList = () => {
    Axios.get('http://localhost:8000/list')
    .then(res => {
      const data = res.data;
      setBoardList(data);
      setCheckList([]);
      setBoardId(0);
      props.renderComplete(); // 목록 출력 완료
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  useEffect(()=>{
    getList(); 
  },[]) // 최초 한번 실행, 결과가 나오면 실행

  let onCheckboxChange = (checked, id) => {
    let list = checkList;
    if (checked) {
      if (list.indexOf(id) === -1) {
        list.push(id);
      }
    } else {
      let idx = list.indexOf(id);
      list.splice(idx, 1);
    }
    setCheckList(list);
  };
  let handleModify = () => {
    let checklist = checkList;
    if (checklist.length === 0) {
      alert('최소 하나를 체크해주세요');
    } else if (checklist.length > 1) {
      alert('하나만 체크해주세요');
    } else {
      setBoardId(checklist[0]); 
      props.handleModify(checklist[0]);
      navigate("/write");
    }    
  };
  let handleDelete = () => {
    //체크 항목이 없으면 '삭제할 게시글을 선택하세요' 경고창 
    if(checkList.length === 0){
      alert('삭제할 게시글을 선택하세요');
    }
    let boardIdList = '';;
    checkList.forEach(item=>{
      boardIdList += `'${item}',`;
    });
    
    Axios.post('http://localhost:8000/delete',{
      boardIdList : boardIdList.substring(0, boardIdList.length -1)
     })
    .then( res => {     
      getList();
    })
    .catch(function (error) {     
      console.log(error);
    });
  };
  useEffect(()=>{
    if(!props.isComplete){
      getList();
    }
  },[props.isComplete])
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
            boardList.map(item => (
              <Board key={item.id} data={item} onCheckboxChange={onCheckboxChange} />
            ))
          }
        </tbody>
      </table>
      <div className="d-flex justify-content-between gap-3">
        <div className="d-flex gap-1">
        
          <Button variant="info" onClick={handleModify}>수정</Button>
        
          <Button variant="danger"  onClick={handleDelete}>삭제</Button>
        </div>
        <Link to="/write">
          <Button variant="primary">글쓰기</Button>
        </Link>          
      </div>
    </>
  );
}

export default BoardList;