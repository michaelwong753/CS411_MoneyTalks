import React, { Component } from "react";
import AppDataService from "../services/app.service";

export default class AppListTwo extends Component {
  constructor(props) {

    super(props);
    this.searchName = this.searchName.bind(this);
    this.onChangeFirst = this.onChangeFirst.bind(this);
    this.onChangeSecond = this.onChangeSecond.bind(this);
    this.state = { stocksFirst: "", stocksSecond: "",stocks: null};
  }

  componentDidMount() {
    //this.retrieveData();
  }

  onChangeFirst(e) {
    this.setState({
      stocksFirst: e.target.value
    });
  }

  onChangeSecond(e) {
    this.setState({
      stocksSecond: e.target.value
    });
  }

  searchName() {
    var data = {
      firstStocks: this.state.stocksFirst,
      secondStocks: this.state.stocksSecond
    };
    AppDataService.findTwoStocks(data)
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
  return <li key={index}>{stocks.ticker} - {stocks.date} - {stocks.high} - {stocks.low} - {stocks.open} - {stocks.close} - {stocks.volume} - {stocks.adjClose}</li>
  }

    render() {
    const {stocks} = this.state;

    return (
      <div>
        <div className="submit-form">
        <div className="form-group">
                <label htmlFor="name">First Stock</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.stocksFirst}
                  onChange={this.onChangeFirst}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Second Stock</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.stocksSecond}
                  onChange={this.onChangeSecond}
                />
              </div>
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