import React, { Component } from "react";
import AppDataService from "../services/app.service";
import {Link } from "react-router-dom";
export default class DeleteData extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTicker = this.onChangeTicker.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.newData = this.newData.bind(this);

    this.state = {
      date: "",
      ticker: "",
      submitted :false
    };
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }
  onChangeTicker(e) {
    this.setState({
      ticker: e.target.value
    });
  }

  deleteData() {    
    var data = {
        dateIN: this.state.date,
        tickerIN: this.state.ticker
      };
    AppDataService.deleteStocks(data)
      .then(response => {
        console.log(response.data);
         this.setState({
          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  newData() {
    this.setState({
      date: "",
      ticker: ""
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You deleted successfully!</h4>
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
                <label htmlFor="ticker">Ticker</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.ticker}
                  onChange={this.onChangeTicker}
                />
              </div>

  
              <button onClick={this.deleteData} className="btn btn-danger">
                Delete
              </button>
              <div class="divider"/>
            </div>
          )}
        </div>
      );
  }
}