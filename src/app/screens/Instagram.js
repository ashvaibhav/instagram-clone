import React, { useState } from "react";
import "./Instagram.css";
import Post from "../components/Post";

function Instagram() {
  let user = {
    username: "The Economic Times",
    // image: "https://www.instagram.com/the_economic_times/",
    image:
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s150x150/109573702_317604902978499_7416960379987999529_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=RflSZSDlHkcAX9jF-M6&oh=58047538fa4968ef9255964a2ddf3a18&oe=5F963C4B",
    url: "https://www.instagram.com/the_economic_times/",
  };
  let post = {
    user: user,
    image: "logo512.png",
    imageDescription: "This is the article about",
    caption: "Here is the caption.",
    url: "https://www.instagram.com/the_economic_times/",
  };
  const [posts, setPosts] = useState([post, post]);
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        />
      </div>
      <div class="app__content">
        {posts.map((post) => {
          return <Post postData={post} />;
        })}
      </div>
    </div>
  );
}

export default Instagram;
