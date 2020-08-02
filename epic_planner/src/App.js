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

class App extends React.Component {
  state = {
    title: "select something"
  }

  display_properties = (title)  => {
    this.setState({title: title})
  };

  render() {
    return (
      <div className="App" style={s2}>
        <StoryBoard showProp={this.display_properties}/>
        <div style={s3}>
          <p>Properties</p>
          <input value={this.state.title}/>
        </div>
      </div>
    );
  }
}

export default App;
