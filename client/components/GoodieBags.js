import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleGoodie } from "../store/goodiebag";

const GoodieBags = ({ goodiebags, setGoodie }) => {
  return (
    <ul>
      {goodiebags.map((goodiebag) => {
        return (
          <li key={goodiebag.id}>
            <h3 onClick={() => setGoodie(goodiebag)}>
              <Link to={`/goodiebag/${goodiebag.id}`}> {goodiebag.name}</Link>
            </h3>
          </li>
        );
      })}
    </ul>
  );
};

const mapDispatch = (dispatch) => ({
  setGoodie: (goodie) => dispatch(fetchSingleGoodie(goodie)),
});

export default connect((state) => state, mapDispatch)(GoodieBags);
