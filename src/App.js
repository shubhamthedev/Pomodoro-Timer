import React, { Component } from "react";
import SetTimer from "./SetTimer";
import "./sass/main.scss";

const audio = document.getElementById("beep");

class App extends Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
  }
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 1500,
    currentState: "session",
    isPlaying: false,
  };
  componentWillUnmount() {
    clearInterval(this.loop);
  }
  handlePlayPause = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false,
      });
    } else {
      this.setState({ isPlaying: true });
      this.loop = setInterval(() => {
        const {
          clockCount,
          currentState,
          breakCount,
          sessionCount,
        } = this.state;

        if (clockCount === 0) {
          this.setState({
            currentState: currentState === "session" ? "break" : "session",
            clockCount:
              currentState === "session" ? breakCount * 60 : sessionCount * 60,
          });
          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 1000);
    }
  };
  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 1500,
      currentState: "session",
      isPlaying: false,
    });
    audio.pause();
    audio.currentTime = 0;
    clearInterval(this.loop);
  };
  clockify(count) {
    let minutes = Math.floor(count / 60);
    let seconds = count - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }
  handleBreakDecrease = () => {
    const { breakCount, isPlaying, currentState } = this.state;
    if (breakCount > 1 && !isPlaying) {
      this.setState({
        breakCount: breakCount - 1,
        clockCount: (breakCount - 1) * 60,
      });
      if (currentState === "break") {
        this.setState({
          clockCount: breakCount * 60 - 60,
        });
      }
    }
  };
  handleBreakIncrease = () => {
    const { breakCount, isPlaying, currentState } = this.state;
    if (breakCount < 60 && !isPlaying) {
      this.setState({
        breakCount: breakCount + 1,
      });
      if (currentState === "break") {
        this.setState({ clockCount: breakCount * 60 + 60 });
      }
    }
  };
  handleSessionDecrease = () => {
    const { sessionCount, isPlaying, currentState } = this.state;
    if (sessionCount > 1 && !isPlaying) {
      this.setState({
        sessionCount: sessionCount - 1,
      });
      if (currentState === "session") {
        this.setState({
          clockCount: sessionCount * 60 - 60,
        });
        console.log(this.state.clockCount);
      }
    }
  };
  handleSessionIncrease = () => {
    const { sessionCount, isPlaying, currentState } = this.state;
    if (sessionCount < 60 && !isPlaying) {
      this.setState({
        sessionCount: sessionCount + 1,
      });
      if (currentState === "session") {
        this.setState({
          clockCount: sessionCount * 60 + 60,
        });
      }
    }
  };
  render() {
    const { breakCount, sessionCount, isPlaying, currentState } = this.state;
    const breakProps = {
      title: "Break Length",
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
    };
    const sessionProps = {
      title: "Session Length",
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease,
    };
    return (
      <div>
        <h1 style={{ textAlign: "center", fontSize: "4rem", fontWeight: 900 }}>
          Pomodoro Clock
        </h1>
        <div className="flex-container">
          <SetTimer {...sessionProps} />
          <SetTimer {...breakProps} />
        </div>
        <div className="clock-container">
          <h3 id="timer-label">
            {currentState === "session" ? "Session" : "Break"}
          </h3>
          <span id="time-left">{this.clockify(this.state.clockCount)}</span>
          <div className="flex-container clock">
            <button id="start_stop" onClick={this.handlePlayPause}>
              <i className={`fas fa-${isPlaying ? "pause" : "play"}`}></i>
            </button>
            <button id="reset" onClick={this.handleReset}>
              <i className="fas fa-sync fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
