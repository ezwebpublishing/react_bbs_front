import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardList from './BoardList';
import Write from './Write';
import View from './view';
import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const[isModifyMode, setMode]=useState(false);
  const[boardId, setBoardId] = useState(0);
  const[isComplete, setComplete] = useState(true);
  
  const handleModify = (id)=>{
    setMode(true);
    setBoardId(id);       
  }
  const handleCancle = ()=>{
    setComplete(false);    
    setMode(false); 
    setBoardId(0);
    clearCheckbox();    
  }
  const renderComplete = ()=>{
    setComplete(true);
  }
  const clearCheckbox = ()=>{
    let checkboxs = document.querySelectorAll('.table input');
    checkboxs.forEach(item=>{
      item.checked = false;
    });
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoardList  boardId = {boardId} isComplete={isComplete} handleModify={handleModify} renderComplete={renderComplete}/>} />

          <Route path="/write" element={<Write 
            handleCancle={handleCancle}
            isModifyMode={isModifyMode}
            boardId = {boardId}
          />} />
          <Route path="/view" element={<View/>} />
        </Routes>     
      </BrowserRouter>
    </div>
  );
}

export default App;
