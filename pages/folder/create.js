import React from "react";
import axios from "axios";
import Router from "next/router";
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
        console.log(res);
        Router.back();
      })
      .catch(function(error) {
        console.log(error);
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
              value={this.state.icon}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Layout>
    );
  }
}
