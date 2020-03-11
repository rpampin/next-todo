import React from "react";
import axios from "axios";
import Router from "next/router";
import Layout from "../../components/Layout";

export default class Create extends React.Component {
  static async getInitialProps(ctx) {
    let res = await axios.get("/api/folder");
    return { folders: res.data };
  }

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      folderId: props.folders[0]._id,
      title: "",
      notes: "",
      date: "",
      dateTime: "",
      dueDate: "",
      dueDateTime: "",
      priority: ""
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/todo", this.state)
      .then(res => {
        console.log(res.data);
        Router.back();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { folders } = this.props;

    return (
      <Layout>
        <form onSubmit={this.onSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="folder">Folder</label>
            <select
              className="form-control"
              id="folderId"
              name="folderId"
              required
              value={this.state.folderId}
              onChange={this.handleInputChange}
            >
              {folders.map((folder, index) => (
                <option key={index} value={folder._id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              className="form-control"
              id="notes"
              name="notes"
              value={this.state.notes}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="input-type">Priority</label>
            <div id="input-type">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="priorityHigh"
                  name="priority"
                  value="High"
                  onChange={this.handleInputChange}
                />
                <label className="form-check-label" htmlFor="priorityHigh">
                  High
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="priorityMedium"
                  name="priority"
                  value="Medium"
                  onChange={this.handleInputChange}
                />
                <label className="form-check-label" htmlFor="priorityMedium">
                  Medium
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="priorityLow"
                  name="priority"
                  value="Low"
                  onChange={this.handleInputChange}
                />
                <label className="form-check-label" htmlFor="priorityLow">
                  Low
                </label>
              </div>
            </div>
          </div>
          <div className="custom-control custom-switch">
            <input
              id="addDate"
              type="checkbox"
              className="custom-control-input"
              data-toggle="collapse"
              data-target="#collapseExample"
            />
            <label className="custom-control-label" htmlFor="addDate">
              Add a date?
            </label>
          </div>
          <div className="collapse" id="collapseExample">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <div className="form-row">
                <div className="col">
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col">
                  <input
                    type="time"
                    className="form-control"
                    id="dateTime"
                    name="dateTime"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <div className="form-row">
                <div className="col">
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col">
                  <input
                    type="time"
                    className="form-control"
                    id="dueDateTime"
                    name="dueDateTime"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Layout>
    );
  }
}
