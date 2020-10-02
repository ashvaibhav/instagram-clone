import React, { useState } from "react";
import "./Instagram.css";
import Post from "../components/Post";

export default function Feed(props) {
  const posts = props.posts;
  return (
    <div className="app__content">
      {posts.map((post, idx) => {
        return <Post postData={post} key={idx} />;
      })}
    </div>
  );
}
