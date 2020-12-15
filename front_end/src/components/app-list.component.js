import React, { Component } from "react";
import AppDataService from "../services/app.service";
import { Link } from "react-router-dom";

export default class AppList extends Component {
  constructor(props) {

    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.searchName = this.searchName.bind(this);
    this.state = { stocks: null, stocksLink: false, searchName: "" };
  }

  componentDidMount() {
    //this.retrieveData();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  searchName() {
    AppDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          stocks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

      var data = {
        tickerIN: this.state.searchName
      };
      AppDataService.findStocks(data)
      .then(response => {
        this.setState({
          stocksLink: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  _renderStocks(stocks, index) {
  return <li key={index}>{stocks.ticker} - {stocks.date} - {stocks.high} - {stocks.low} - {stocks.open} - {stocks.close} - {stocks.volume} - {stocks.adjClose}</li>
  }

    render() {
    const { stocks, searchName, stocksLink } = this.state;

    return (
      <div>
        <div className="input-group mb-3">
      <input
               type="text"
               className="form-control"
               placeholder="Search by name"
               value={searchName}
               onChange={this.onChangeSearchName} />
               <div className="input-group-append">
               <button
                className="btn btn-outline-secondary"
                 type="button"
                 onClick={this.searchName}
               >
                 Search
               </button>
               </div>
        </div>
        <h1>LIST OF STOCKS:</h1>
        <p>ticker - date - high - low - open - close- volume - adjClose</p>
        {stocksLink ? <a href = "http://backendtest.moneytalk.web.illinois.edu/graphFile">Graph is found! Click here to see the graph</a> : <h5>No Link</h5>}
          <ul>
            {
            stocks ?
            stocks.map(this._renderStocks)
            :
            <h3>no data to display yet</h3>
          }
          </ul>
        </div>
    );
  }
}