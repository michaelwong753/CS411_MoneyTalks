import React, { Component } from "react";
import AppDataService from "../services/app.service";

export default class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getData = this.getData.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteData = this.deleteData.bind(this);

    this.state = {
      currentData: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentData: {
          ...prevState.currentData,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentData: {
        ...prevState.currentData,
        description: description
      }
    }));
  }

  getData(id) {
    AppDataService.get(id)
      .then(response => {
        this.setState({
          currentData: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentData.id,
      title: this.state.currentData.title,
      description: this.state.currentData.description,
      published: status
    };

    AppDataService.update(this.state.currentData.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentData: {
            ...prevState.currentData,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateData() {
    AppDataService.update(
      this.state.currentData.id,
      this.state.currentData
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The data was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteData() {    
    AppDataService.delete(this.state.currentData.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/home')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentData } = this.state;

    return (
      <div>
        {currentData ? (
          <div className="edit-form">
            <h4>Data</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentData.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentData.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentData.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentData.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteData}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateData}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click add to add a data...</p>
          </div>
        )}
      </div>
    );
  }
}