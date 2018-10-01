import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      Q: { key: 'Q', file: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', name: 'Heater 1', clickState: 'drum-pad unselectable' },
      W: { key: 'W', file: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', name: 'Heater 2', clickState: 'drum-pad unselectable' },
      E: { key: 'E', file: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', name: 'Heater 3', clickState: 'drum-pad unselectable' },
      A: { key: 'A', file: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', name: 'Heater 4', clickState: 'drum-pad unselectable' },
      S: { key: 'S', file: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', name: 'Clap', clickState: 'drum-pad unselectable' },
      D: { key: 'D', file: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', name: 'Open HH', clickState: 'drum-pad unselectable' },
      Z: { key: 'Z', file: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', name: `Kick n'hat`, clickState: 'drum-pad unselectable' },
      X: { key: 'X', file: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', name: 'Kick', clickState: 'drum-pad unselectable' },
      C: { key: 'C', file: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', name: 'Closed HH', clickState: 'drum-pad unselectable' }
    };
    this.playAudio = this.playAudio.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.buttonRelease = this.buttonRelease.bind(this);
    this.displayMsg = this.displayMsg.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    // Parse key so that it's always uppercase
    let keyPress = e.key.replace(/([a-z])/, c => c.toUpperCase());
    if (this.state[keyPress] != null) {
      this.playAudio(keyPress)();
      this.displayMsg(keyPress)();
    }
  }
  // takes care of all actions that need to take place when a sound is played
  playAudio = (key) => () => {
    this.displayMsg(key)();
    this.buttonClick(key)();
    let audio = document.getElementById(key);
    audio.load();
    audio.play();
    setTimeout(this.buttonRelease(key), 100);
  }
  // Changes the class of the button so that it's blackened
  buttonClick = (key) => () => {
    this.state[key].clickState = 'drum-pad unselectable clicked';
    this.forceUpdate();
  }
  // Restores the class of the button
  buttonRelease = (key) => () => {
    this.state[key].clickState = 'drum-pad unselectable';
    this.forceUpdate();
  }
  // display message on display
  displayMsg = (key) => () => {
    this.setState({
      msg: this.state[key].name
    });
  }
  render() {
    // I did not manage to make element below work for some reason, but since content is static, I'm not going to need it
    // I did use it to generate the html grid elements though, so there must be a way to make it work
    // const gridElements = function () {
    //   let str = '';
    //   let arr = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
    //   for (let key = 0; key < arr.length; key++) {
    //     str += (`<div className='grid-item'><div className={this.state.` + arr[key] + `.clickState} onClick={this.playAudio(this.state.` + arr[key] + `.key)}>` + arr[key] + `</div><audio class='clip' id={this.state.` + arr[key] + `.key}><source src={this.state.` + arr[key] + `.file} type="audio/mpeg"></source></audio></div>`)
    //   }
    //   return str
    // };

    return (
      <div className="App container-center">
        <div id="drum-machine" className='container-center'>
          <div id="display-panel" className='container-center'>
            <div id="display">
              <Display value={this.state.msg} />
            </div>
          </div>
          <div className='grid-container'>
            <div className='grid-item'><div className={this.state.Q.clickState} onClick={this.playAudio(this.state.Q.key)}>Q</div><audio class='clip' id={this.state.Q.key}><source src={this.state.Q.file} type="audio/mpeg"></source></audio></div>
            <div className='grid-item'><div className={this.state.W.clickState} onClick={this.playAudio(this.state.W.key)}>W</div><audio class='clip' id={this.state.W.key}><source src={this.state.W.file} type="audio/mpeg"></source></audio></div><div className='grid-item'><div className={this.state.E.clickState} onClick={this.playAudio(this.state.E.key)}>E</div><audio class='clip' id={this.state.E.key}><source src={this.state.E.file} type="audio/mpeg"></source></audio></div><div className='grid-item'><div className={this.state.A.clickState} onClick={this.playAudio(this.state.A.key)}>A</div><audio class='clip' id={this.state.A.key}><source src={this.state.A.file} type="audio/mpeg"></source></audio></div><div className='grid-item'><div className={this.state.S.clickState} onClick={this.playAudio(this.state.S.key)}>S</div><audio class='clip' id={this.state.S.key}><source src={this.state.S.file} type="audio/mpeg"></source></audio></div><div className='grid-item'><div className={this.state.D.clickState} onClick={this.playAudio(this.state.D.key)}>D</div><audio class='clip' id={this.state.D.key}><source src={this.state.D.file} type="audio/mpeg"></source></audio></div><div className='grid-item'><div className={this.state.Z.clickState} onClick={this.playAudio(this.state.Z.key)}>Z</div><audio class='clip' id={this.state.Z.key}><source src={this.state.Z.file} type="audio/mpeg"></source></audio></div><div className='grid-item'><div className={this.state.X.clickState} onClick={this.playAudio(this.state.X.key)}>X</div><audio class='clip' id={this.state.X.key}><source src={this.state.X.file} type="audio/mpeg"></source></audio></div><div className='grid-item'><div className={this.state.C.clickState} onClick={this.playAudio(this.state.C.key)}>C</div><audio class='clip' id={this.state.C.key}><source src={this.state.C.file} type="audio/mpeg"></source></audio></div>
          </div>
        </div>
      </div>
    );
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p id='display-text'>{this.props.value}</p>
    );
  }
}

export default App;
