import React from "react";
import Router from "next/router";
import Layout from "../../components/Layout";

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.folderOnChange = this.folderOnChange.bind(this);
    this.titleOnChange = this.titleOnChange.bind(this);
    this.notesOnChange = this.notesOnChange.bind(this);
    this.dateOnChange = this.dateOnChange.bind(this);
    this.dueDateOnChange = this.dueDateOnChange.bind(this);
    this.priorityOnChange = this.priorityOnChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      folder: {},
      title: "",
      notes: "",
      date: "",
      dueDate: "",
      priority: ""
    };
  }

  folderOnChange(e) {
    this.setState({
      folder: e.target.value
    });
  }
  titleOnChange(e) {
    this.setState({
      title: e.target.value
    });
  }
  notesOnChange(e) {
    this.setState({
      notes: e.target.value
    });
  }
  dateOnChange(e) {
    this.setState({
      date: e.target.value
    });
  }
  dueDateOnChange(e) {
    this.setState({
      dueDate: e.target.value
    });
  }
  priorityOnChange(e) {
    this.setState({
      priority: e.target.value
    });
  }

  onSubmit() {
    console.debug(this.state);
    alert("saved");
    Router.push("/");
  }

  render() {
    return (
      <Layout>
        <form autoComplete="off">
          <div className="form-group">
            <label htmlFor="folder">Folder</label>
            <select
              className="form-control"
              id="folder"
              value={this.state.folder}
              onChange={this.folderOnChange}
            ></select>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              id="title"
              value={this.state.title}
              onChange={this.titleOnChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              className="form-control"
              id="notes"
              value={this.state.notes}
              onChange={this.notesOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="input-type">Priority</label>
            <div id="input-type">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priority"
                  id="priorityHigh"
                  value="High"
                  onChange={this.priorityOnChange}
                />
                <label className="form-check-label" htmlFor="priorityHigh">
                  High
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priority"
                  id="priorityMedium"
                  value="Medium"
                  onChange={this.priorityOnChange}
                />
                <label className="form-check-label" htmlFor="priorityMedium">
                  Medium
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priority"
                  id="priorityLow"
                  value="Low"
                  onChange={this.priorityOnChange}
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
                    value={this.state.date}
                    onChange={this.dateOnChange}
                  />
                </div>
                <div className="col">
                  <input
                    type="time"
                    className="form-control"
                    id="dateTime"
                    name="dateTime"
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
                    value={this.state.dueDate}
                    onChange={this.dueDateOnChange}
                  />
                </div>
                <div className="col">
                  <input
                    type="time"
                    className="form-control"
                    id="dueDateTime"
                    name="dueDateTime"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={this.onSubmit}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </Layout>
    );
  }
}
