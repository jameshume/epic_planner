import React from 'react';
import './App.css';
import StoryBoard from './containers/StoryBoard/StoryBoard.js';


const s2 = {
  marginRight: '26vw',
  overflow: 'auto'
};

const s3 = {
  position: 'fixed',
  width:'25vw',
  height:'100vh',
  top:0,
  right:0,
  background: 'rgb(211,211,211)',
  borderLeft: '1px solid gray'
};

function App() {
  return (
    <div className="App" style={s2}>
      <StoryBoard />
      <div style={s3}>
        <p>Properties</p>
      </div>
    </div>
  );
}

export default App;
