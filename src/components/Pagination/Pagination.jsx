import React from "react";

import "./Pagination.scss";

const Pagination = props => {
  return (
    <div>
      <button disabled={props.page === 1} onClick={props.onClickLastPage}>
        Less
      </button>
      {props.page} on {props.pages}
      <button
        disabled={props.page === props.pages}
        onClick={props.onClickNextPage}
      >
        More
      </button>
    </div>
  );
};

export default Pagination;
