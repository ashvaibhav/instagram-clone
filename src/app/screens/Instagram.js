import React, { useEffect, useState } from "react";
import "./Instagram.css";
import Feed from "../components/Feed";
import { db } from "../../firebase";
import Authentication, { AUTH_USER } from "../components/Authentication";
import NewPost from "../components/NewPost";
import Header from "../components/Header";

function Instagram() {
  const [authUser, setAuthUser] = useState(null);

  let post = {
    user: {
      url: "",
      image: "",
      username: "",
    },
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
      <Header>
        <Authentication setAuthUser={setAuthUserHandler} />
      </Header>
      <NewPost username={authUser?.email} />
      <Feed posts={posts} />
    </div>
  );
}

export default Instagram;
