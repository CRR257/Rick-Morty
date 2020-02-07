import React from 'react';

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