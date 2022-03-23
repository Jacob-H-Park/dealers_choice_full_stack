import React, { Component } from "react";
import { connect } from "react-redux";
import { createGoodie } from "../store/goodiebag";
import { Link } from "react-router-dom";

class CreateGoodie extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.create({ ...this.state });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { name } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <form id="goodie-form" onSubmit={handleSubmit}>
        <label htmlFor="na3me">Goodie Name:</label>
        <input name="name" value={name} onChange={handleChange} />

        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
    );
  }
}
//goodie is an object with the key name of 'name' and the value of user input.
const mapDispatch = (dispatch, ownProps) => {
  return {
    create: (goodie) => {
      dispatch(createGoodie(goodie, ownProps.history));
    },
  };
};
export default connect(null, mapDispatch)(CreateGoodie);

/*
NOTE: The second argument for both mapStateToProps and mapDispatchToProps is the _actual props_ passed down from the parent.

This is usually denoted as `ownProps`, and since CreateTodo is rendered by our Router component in `App.js`, `CreateTodo` receives all of the history, match, and location props.

We can therefore destructure the `history` prop from the 2nd argument of props.

Another way to have written this would be:

const mapDispatchToProps = (dispatch, ownProps) => ({
  createTodo: (todo) => dispatch(createTodo(todo, ownProps.history))
});

*/
