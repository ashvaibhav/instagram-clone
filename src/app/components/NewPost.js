import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { db, auth, storage } from "../../firebase";
import firebase from "firebase";

export default function NewPost(props) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const username = props.username;
  function handleFileUpload(evt) {
    let uploadedFile = evt.currentTarget.files[0];
    if (uploadedFile) {
      setImage(uploadedFile);
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
          });
      }
    );
  }

  return !username ? (
    <strong>Login to Post</strong>
  ) : (
    <div>
      <div>
        Image content
        <img src={image} />
      </div>
      <form>
        <div>
          <progress value={progress} max={100} />
        </div>
        <input
          type="text"
          placeholder="Enter a caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></input>
        <input type="file" onChange={handleFileUpload}></input>
        <Button type="submit" onClick={submitPost}>
          POST
        </Button>
      </form>
    </div>
  );
}
