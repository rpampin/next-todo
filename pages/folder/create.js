import React from "react";
import axios from "axios";
import Router from "next/router";
import * as Icon from "react-bootstrap-icons";
import Layout from "../../components/Layout";

export default class Create extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      name: "",
      icon: ""
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
      .post("/api/folder", this.state)
      .then(res => {
        Router.back();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onIconSelect(icon) {
    this.setState({
      icon: icon
    });
  }

  render() {
    return (
      <Layout>
        <form onSubmit={this.onSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              id="name"
              name="name"
              required
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="icon">Icon</label>
            <input
              className="form-control"
              id="icon"
              name="icon"
              required
              readOnly
              value={this.state.icon}
              onChange={this.handleInputChange}
            />
          </div>
          <div
            className="form-group"
            style={{
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {Object.values(Icon).map((it, index) => {
              return (
                <div
                  className={`card ${
                    it.name === this.state.icon ? "bg-success" : ""
                  }`}
                  key={index}
                  onClick={() => this.onIconSelect(it.name)}
                  style={{
                    padding: ".5rem",
                    margin: ".5rem"
                  }}
                >
                  {React.createElement(it, { size: 32 })}
                </div>
              );
            })}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Layout>
    );
  }
}
