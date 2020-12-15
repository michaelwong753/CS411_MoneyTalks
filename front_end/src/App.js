import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddData from "./components/add-Data.component";
import DeleteData from "./components/delete-Data.component";
import UpdateData from "./components/update-Data.component";
import AppListTwo from "./components/app-list-two.component";
import AppListComment from "./components/comment-list.component";
import appList from "./components/app-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/home" className="navbar-brand">
            Money Talks
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home Page
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/comment"} className="nav-link">
                MetaStocks Page
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/interesting"} className="nav-link">
                2-Stocks Page
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Data
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/update"} className="nav-link">
                Update Data
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/delete"} className="nav-link">
                Delete Data
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={appList} />
            <Route exact path="/add" component={AddData} />
            <Route exact path="/update" component={UpdateData} />
            <Route exact path="/delete" component={DeleteData} />
            <Route exact path="/interesting" component={AppListTwo} />
            <Route exact path="/comment" component={AppListComment} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;