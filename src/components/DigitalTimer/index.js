// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimit = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timerSeconds} = this.state

    const isButtonDisabled = timerSeconds > 0

    return (
      <div className="limit-controls">
        <p className="limit-caption">Set Timer limit</p>
        <div className="limit-options">
          <button
            className="limit-button"
            disabled={isButtonDisabled}
            type="button"
            onClick={this.onDecreaseTimerLimit}
          >
            -
          </button>
          <p className="limit-count">{timerLimitInMinutes}</p>
          <button
            className="limit-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimit}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimerSeconds = () => {
    const {timerLimitInMinutes, timerSeconds} = this.state
    const isTimerCompleted = timerSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({timerSeconds: prevState.timerSeconds + 1}))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timerLimitInMinutes, timerSeconds} = this.state
    const isTimerCompleted = timerSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timerSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altName = isTimerRunning ? 'pause icon' : 'play icon'
    const displayText = isTimerRunning ? 'Pause' : 'Start'

    return (
      <div className="timer-controls">
        <button
          type="button"
          onClick={this.onStartOrPauseTimer}
          className="controls-button"
        >
          <img src={imageUrl} alt={altName} className="control-icon" />
          {displayText}
        </button>
        <button
          type="button"
          onClick={this.onResetTimer}
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
    )
  }

  getTimerSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timerSeconds} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timerSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="title">Digital Timer</h1>
        <div className="app-details-section">
          <div className="timer-card">
            <div className="timer">
              <h3 className="timer-count">
                {this.getTimerSecondsInTimeFormat()}
              </h3>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="timer-settings">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
