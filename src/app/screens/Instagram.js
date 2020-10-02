import React, { useEffect, useState } from "react";
import "./Instagram.css";
import Post from "../components/Post";
import Feed from "./Feed";
import { db } from "../../firebase";
import Authentication from "../components/Authentication";

function Instagram() {
  let user = {
    url: "https://www.instagram.com/the_economic_times/",
  };
  let post = {
    user: user,
    image: "logo512.png",
    imageDescription: "This is the article about",
    url: "https://www.instagram.com/the_economic_times/",
  };
  const [posts, setPosts] = useState([post, post]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => {
          let d = doc.data();
          user.username = d.username;
          user.image = d.imageUrl;
          post.caption = d.caption;
          return post;
        })
      );
    });
    let p = posts.slice(0);
    p.push(post);
    setPosts(p);
    return () => {
      //cleanup
    };
  }, []);
  return (
    <div className="app">
      <Authentication />
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        />
      </div>
      <Feed posts={posts} />
    </div>
  );
}

export default Instagram;
