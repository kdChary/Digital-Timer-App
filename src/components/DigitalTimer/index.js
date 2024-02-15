// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {initialTime: 25}

  initialTime = () => console.log('dude')

  render() {
    const timer = '25:00'

    return (
      <div className="app-container">
        <h1 className="title">Digital Timer</h1>
        <div className="app-details-section">
          <div className="timer-card">
            <div className="timer">
              <h3 className="timer-count">25:00</h3>
              <p className="timer-state">Paused</p>
            </div>
          </div>
          <div className="timer-settings">
            <div className="timer-controls">
              <button
                type="button"
                onClick={this.initialTime}
                className="controls-button"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                  alt="play icon"
                  className="control-icon"
                />
                Start
              </button>
              <button
                type="button"
                onClick={this.initialTime}
                className="controls-button"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt=""
                  className="control-icon"
                />
                Reset
              </button>
            </div>
            <div className="limit-controls">
              <p className="limit-caption">Set Timer limit</p>
              <div className="limit-options">
                <button
                  className="limit-button"
                  type="button"
                  onClick={this.initialTime}
                >
                  -
                </button>
                <p className="limit-count">25:00</p>
                <button
                  className="limit-button"
                  type="button"
                  onClick={this.initialTime}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
