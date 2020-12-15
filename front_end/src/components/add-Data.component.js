import React, { Component } from "react";
import AppDataService from "../services/app.service";
import {Link } from "react-router-dom";
export default class AddData extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeHigh = this.onChangeHigh.bind(this);
    this.onChangeLow = this.onChangeLow.bind(this);
    this.onChangeOpen = this.onChangeOpen.bind(this);
    this.onChangeClose = this.onChangeClose.bind(this);
    this.onChangeVolume = this.onChangeVolume.bind(this);
    this.onChangeAdjClose = this.onChangeAdjClose.bind(this);
    this.onChangeTicker = this.onChangeTicker.bind(this);
    this.saveData = this.saveData.bind(this);
    this.newData = this.newData.bind(this);

    this.state = {
      date: "",
      high: null,
      low: null,
      open: null,
      close: null,
      volume: null,
      adjClose: null,
      ticker: "",
      submitted :false
    };
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }
  onChangeHigh(e) {
    this.setState({
      high: e.target.value
    });
  }
  onChangeLow(e) {
    this.setState({
      low: e.target.value
    });
  }
  onChangeOpen(e) {
    this.setState({
      open: e.target.value
    });
  }
  onChangeClose(e) {
    this.setState({
      close: e.target.value
    });
  }
  onChangeVolume(e) {
    this.setState({
      volume: e.target.value
    });
  }
  onChangeAdjClose(e) {
    this.setState({
      adjClose: e.target.value
    });
  }
  onChangeTicker(e) {
    this.setState({
      ticker: e.target.value
    });
  }

  saveData() {
    var data = {
      dateIN: this.state.date,
      highIN: this.state.high,
      lowIN: this.state.low,
      openIN: this.state.open,
      closeIN: this.state.close,
      volumeIN: this.state.volume,
      adjCloseIN: this.state.adjClose,
      tickerIN: this.state.ticker
    };

    AppDataService.create(data)
      .then(response => {
         this.setState({
          submitted: true
         });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newData() {
    this.setState({
      date: "",
      high: null,
      low: null,
      open: null,
      close: null,
      volume: null,
      adjClose: null,
      ticker: ""
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <p>Go back to the home page</p>
              <Link to={"/home"} >
              <button className="btn btn-success" onClick={this.newData}>
              Home Page
              </button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Date</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">High</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.high}
                  onChange={this.onChangeHigh}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Low</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.low}
                  onChange={this.onChangeLow}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Open</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.open}
                  onChange={this.onChangeOpen}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Close</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.close}
                  onChange={this.onChangeClose}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Volume</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.volume}
                  onChange={this.onChangeVolume}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Adj Close</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.adjClose}
                  onChange={this.onChangeAdjClose}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Ticker</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.ticker}
                  onChange={this.onChangeTicker}
                />
              </div>

  
              <button onClick={this.saveData} className="btn btn-success">
                Add
              </button>
            </div>
          )}
        </div>
      );
  }
}