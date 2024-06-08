import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom';

function View(){
  let location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  const[form, setForm] = useState( {title: '',content:''})

  let detail = () =>{
    Axios.get(`http://localhost:8000/detail?id=${id}`)
    .then( res => {
      if(res.data.length > 0){
        setForm({
          title:res.data[0].title,
          content:res.data[0].content,
        })
      }
    })
    .catch(function (error) {     
      console.log(error);
    });
  }
  useEffect(()=>{
    detail();
  })
  return (
    <div>
      <h2>글 상세</h2>
      <h3>{form.title}</h3>
      <div>{form.content}</div>
      <hr/>
      <Link to='/'>
        <Button variant="secondary">목록</Button>
      </Link>
    </div>
  )  
}

export default View;