import React, { Component } from "react";
import AppDataService from "../services/app.service";
import { Link } from "react-router-dom";

export default class AppListComment extends Component {
  constructor(props) {

    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.searchName = this.searchName.bind(this);
    this.state = { stocks: null, searchName: "" };
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
      var data = {tickerIN: this.state.searchName}
    AppDataService.findMeta(data)
      .then(response => {
        this.setState({
          stocks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  _renderStocks(stocks, index) {
  return <li key={index}>  {stocks.max}  - {stocks.NASDAQ_Symbol} - {stocks.Nasdaq_Traded} - {stocks.Name} - {stocks.Exchange} - {stocks.Market_Category} - {stocks.ETF} - {stocks.Financial_Status} -{stocks.CQS_Symbol} - {stocks.NextShares}</li>
  }

    render() {
    const {searchName, stocks } = this.state;

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
        <h1>LIST OF META STOCKS:</h1>
        <p>Maximum Close - NASDAQ Symbol - Nasdaq Traded - Name - Exchange - Market Category - ETF - Financial Status - CQS Symbol - NextShares</p>
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