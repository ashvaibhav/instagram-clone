import React, { useEffect, useState } from "react";
import "./Instagram.css";
import Post from "../components/Post";
import Feed from "./Feed";
import { db } from "../../firebase";
import Authentication, { AUTH_USER } from "../components/Authentication";
import NewPost from "../components/NewPost";

function Instagram() {
  const [authUser, setAuthUser] = useState(null);

  let user = {
    url: "https://www.instagram.com/the_economic_times/",
  };
  let post = {
    user: user,
    image: "logo512.png",
    imageDescription: "This is the article about",
    url: "https://www.instagram.com/the_economic_times/",
  };
  const [posts, setPosts] = useState([]);
  function setAuthUserHandler(user) {
    setAuthUser(user);
  }

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            let d = doc.data();
            let p = {
              user: {
                url: d.imageUrl,
                image: "logo512.png",
                username: d.username,
              },
              image: d.imageUrl,
              caption: d.caption,
              url: d.imageUrl,
            };

            return p;
          })
        );
      });

    return () => {
      setPosts([]);
    };
  }, []);

  return (
    <div className="app">
      <Authentication setAuthUser={setAuthUserHandler} />
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        />
      </div>
      <NewPost username={authUser?.email} />
      <Feed posts={posts} />
    </div>
  );
}

export default Instagram;
