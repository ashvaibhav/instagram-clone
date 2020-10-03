import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { db, auth, storage } from "../../firebase";
import firebase from "firebase";
import "./NewPost.css";

export default function NewPost(props) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const username = props.username;
  function handleFileUpload(evt) {
    let uploadedFile = evt.currentTarget.files[0];
    if (uploadedFile) {
      setImage(uploadedFile);
      var fr = new FileReader(uploadedFile);
      fr.onload = (e) => {
        const url = e.target.result;
        setImageUrl(e.target.result);
      };
      fr.readAsDataURL(uploadedFile);
    }
  }

  function submitPost(event) {
    event.preventDefault();
    setProgress(0);
    let upload = storage.ref(`images/${image.name}`).put(image);
    upload.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setProgress(Math.round(progress * 100));
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: username,
              imageUrl: url,
              caption: caption,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            setImageUrl(null);
            document.querySelector("form.new_post__form").reset();
          });
      }
    );
  }

  const newPostClassName = "new_post" + (progress ? " uploading" : "");
  return !username ? (
    <strong>Login to Post</strong>
  ) : (
    <div className={newPostClassName}>
      <div className="new_post__preview">
        <img src={imageUrl} />
      </div>
      <form className="new_post__form">
        <div className="new_post__progress">
          <progress value={progress} max={100} />
        </div>
        <input
          type="text"
          className="new_post__caption"
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></input>
        <div className="new_post__controls">
          <input
            type="file"
            title="Photo/Video"
            onChange={handleFileUpload}
            className="new_post__file_picker"
          ></input>
          <Button
            type="submit"
            onClick={submitPost}
            className="new_post__submit"
          >
            POST
          </Button>
        </div>
      </form>
    </div>
  );
}
