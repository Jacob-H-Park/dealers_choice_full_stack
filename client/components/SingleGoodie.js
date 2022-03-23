import React from "react";
import { connect } from "react-redux";
import { deleteGoodie } from "../store/goodiebag";

class SingleGoodie extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { goodie, getRidOf } = this.props;
    return (
      <div>
        <button onClick={() => getRidOf(goodie)}>Delete</button>
        {goodie.name}
        <div className="prompt">
          - Is this an appropriate item for goodiebag?
          {goodie.appropriate ? " yes" : " no"}
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  getRidOf: (goodie) => dispatch(deleteGoodie(goodie, history)),
});

export default connect((state) => state, mapDispatch)(SingleGoodie);
