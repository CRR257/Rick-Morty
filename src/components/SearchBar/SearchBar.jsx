import React from 'react';

import "./SearchBar.scss";

const SearchBar = props => {

  return (
    <form>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChangeHandler}
        className="searchbar"
      />
    </form>
  );
};

export default SearchBar;