import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import "./Header.css";

import { IconButton, InputBase, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Search from "../common-components/Search/Search";

export default function Header(props) {
  return (
    <div className="app__header_wrapper">
      <div className="app__header">
        <img
          className="app__header__image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        />
        <Search className="app__header__search" />
        {props.children}
      </div>
    </div>
  );
}
