import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import "./Post.css";

export default class Post extends Component {
  constructor(props) {
    super();
  }
  render() {
    let post = this.props.postData;
    let user = post.user;
    return (
      <div className="post">
        <div className="post__header">
          <div className="post__profile">
            <a
              className="post__profile-picture"
              href="https://www.instagram.com/the_economic_times/"
            >
              <Avatar alt={user.username} src={user.image}></Avatar>
            </a>
            <a
              className="post__profile-name"
              href="https://www.instagram.com/the_economic_times/"
            >
              <span>{user.username}</span>
            </a>
          </div>
          <div className="post__content">
            <img alt={post.imageDescription} src={post.image} />
          </div>
          <section className="post__description">
            <strong>{user.username}:</strong>
            {post.caption}
          </section>
        </div>
      </div>
    );
  }
}
