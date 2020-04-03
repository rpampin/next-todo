import React from "react";
import axios from "axios";
import Router from "next/router";
import * as Icon from "react-bootstrap-icons";

export default class TodoForm extends React.Component {
  componentDidMount() {
    axios
      .get("/api/folder")
      .then((res) =>
        this.setState({
          folders: res.data,
          folder: res.data.length > 0 ? res.data[0]._id : "",
        })
      )
      .catch((err) => console.log(err));
  }

  constructor(props) {
    super(props);

    this.folderIcon = Icon["Inbox"];
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deadlineChange = this.deadlineChange.bind(this);
    this.allDayChange = this.allDayChange.bind(this);
    this.updateFolderIcon = this.updateFolderIcon.bind(this);

    let todo = { ...props.todo };
    if (todo.date) {
      todo.deadline = true;
      todo.allDay = !todo.dueDate;
      const dateParts = todo.date.split("T");
      todo.date = dateParts[0];
      if (!todo.allDay) {
        todo.startTime = dateParts[1].substring(0, 5);
        todo.endTime = todo.dueDate.split("T")[1].substring(0, 5);
      }
    }

    this.state = {
      folders: [],
      ...todo,
    };
  }

  updateFolderIcon() {
    let iconName = "Inbox";
    if (this.state.folders) {
      const folder =
        this.state.folders.filter((f) => f._id === this.state.folder)[0] ||
        null;
      if (folder) iconName = folder.icon;
    }
    return Icon[iconName];
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  deadlineChange(event) {
    const value = event.target.checked;
    if (value)
      this.setState({
        date: "",
        startTime: "",
        endTime: "",
        allDay: false,
      });
  }

  allDayChange(event) {
    const value = event.target.checked;
    if (value)
      this.setState({
        startTime: "",
        endTime: "",
      });
  }

  onSubmit(e) {
    e.preventDefault();

    let todo = {};
    ({
      _id: todo._id,
      folder: todo.folder,
      title: todo.title,
      notes: todo.notes,
      date: todo.date,
      dueDate: todo.dueDate,
      priority: todo.priority,
    } = this.state);

    if (this.state.deadline && !this.state.allDay) {
      const date = todo.date;
      todo.date = `${date}T${this.state.startTime}:00.000Z`;
      todo.dueDate = `${date}T${this.state.endTime}:00.000Z`;
    } else if (this.state.deadline && this.state.allDay) {
      todo.dueDate = "";
    } else {
      todo.date = "";
      todo.dueDate = "";
    }

    axios
      .post("/api/todo", todo)
      .then((res) => {
        Router.back();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} autoComplete="off">
        <div className="form-group">
          <label htmlFor="folder">Folder</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="folderIcon">
                {React.createElement(this.updateFolderIcon(), { size: 21 })}
              </label>
            </div>
            <select
              className="form-control"
              id="folder"
              name="folder"
              required
              value={this.state.folder}
              onChange={this.handleInputChange}
            >
              {this.state.folders.map((folder, index) => (
                <option key={index} value={folder._id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
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
                checked={this.state.priority === "High"}
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
                checked={this.state.priority === "Medium"}
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
                checked={this.state.priority === "Low"}
                onChange={this.handleInputChange}
              />
              <label className="form-check-label" htmlFor="priorityLow">
                Low
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <div className="form-row">
            <div
              className="col-auto"
              style={{ display: "grid", alignContent: "center" }}
            >
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="deadline"
                  name="deadline"
                  checked={this.state.deadline || false}
                  onChange={function (ev) {
                    this.handleInputChange(ev);
                    this.deadlineChange(ev);
                  }.bind(this)}
                />
                <label className="custom-control-label" htmlFor="deadline">
                  Deadline
                </label>
              </div>
            </div>
            <div
              className="col-auto"
              style={{
                display: "grid",
                alignContent: "center",
                display: !this.state.deadline || false ? "none" : "grid",
              }}
            >
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="allDay"
                  name="allDay"
                  checked={this.state.allDay || false}
                  onChange={function (ev) {
                    this.handleInputChange(ev);
                    this.allDayChange(ev);
                  }.bind(this)}
                />
                <label className="custom-control-label" htmlFor="allDay">
                  All Day
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <div
              className="col"
              style={{
                display: !this.state.deadline || false ? "none" : "block",
              }}
            >
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                required={this.state.deadline || false}
                value={this.state.date || ""}
                onChange={this.handleInputChange}
              />
            </div>
            <div
              className="col"
              style={{
                display:
                  this.state.allDay || !this.state.deadline || false
                    ? "none"
                    : "block",
              }}
            >
              <input
                type="time"
                className="form-control"
                id="startTime"
                name="startTime"
                value={this.state.startTime || ""}
                onChange={this.handleInputChange}
                required={this.state.deadline && !this.state.allDay}
              />
            </div>
            <div
              className="col"
              style={{
                display:
                  this.state.allDay || !this.state.deadline || false
                    ? "none"
                    : "block",
              }}
            >
              <input
                type="time"
                className="form-control"
                id="endTime"
                name="endTime"
                value={this.state.endTime || ""}
                onChange={this.handleInputChange}
                required={this.state.deadline && !this.state.allDay}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
