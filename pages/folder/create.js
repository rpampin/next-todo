import React from "react";
import Router from "next/router";
import Layout from "../../components/Layout";

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.nameOnChange = this.nameOnChange.bind(this);
    this.iconOnChange = this.iconOnChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      icon: ""
    };
  }

  nameOnChange(e) {
    this.setState({
      name: e.target.value
    });
  }
  iconOnChange(e) {
    this.setState({
      icon: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.debug(this.state);
    alert("saved");
    Router.push("/");
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
              required
              value={this.state.name}
              onChange={this.nameOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="icon">Icon</label>
            <input
              className="form-control"
              id="icon"
              required
              value={this.state.icon}
              onChange={this.iconOnChange}
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
