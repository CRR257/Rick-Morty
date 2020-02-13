import React from "react";

import SearchBar from "../SearchBar/SearchBar";
import "./Header.scss";

const Header = props => {
  return (
    <div>
      <div className="header">
        <span className="header-title">RICK AND MORTY</span>
      </div>
      <SearchBar
        onChangeHandler={props.searchUserHandler}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Header;
