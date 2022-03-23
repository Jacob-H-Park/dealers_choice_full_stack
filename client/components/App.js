import React, { Component } from "react";
import GoodieBags from "./GoodieBags";
import CreateGoodie from "./CreateGoodie";
import SingleGoodie from "./SingleGoodie";
import { connect } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import { fetchGoodieBag } from "../store/goodiebag";

class App extends Component {
  componentDidMount() {
    this.props.load();
  }
  render() {
    const { goodiebags } = this.props;
    return (
      <div>
        <h1>
          Goodiebag (<Link to="/">{goodiebags.length} Items</Link>)
        </h1>

        <Link to="/goodiebag/create">
          <button>Create Goodie</button>
        </Link>
        <Switch>
          <Route exact path="/" component={GoodieBags} />
          <Route exact path="/goodiebag/create" component={CreateGoodie} />
          <Route path="/goodiebag/:id" component={SingleGoodie} />
        </Switch>
      </div>
    );
  }
}
const mapDispatch = (dispatch) => ({
  load: () => dispatch(fetchGoodieBag()),
});

export default connect((state) => state, mapDispatch)(App);
