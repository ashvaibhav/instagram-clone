import { Avatar, Button, Input, makeStyles, Modal } from "@material-ui/core";
import React, { Component, useEffect, useState } from "react";
import "./Authentication.css";
import { auth } from "../../firebase";

export class Authentication1 extends Component {
  constructor(props) {
    super();
    this.openState = true;
  }
  onClose() {
    this.openState = false;
  }
  render() {
    return (
      <Modal open={this.openState} onClose={this.onClose.bind(this)}>
        <h2>Hola</h2>
      </Modal>
    );
  }
}

function getModalStyle() {
  const top = 50,
    left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: "white" || theme.palette.background,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  };
});

export default function Authentication(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openState, setOpen] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const ubsubscribe = auth.onAuthStateChanged((authUser) => {
      if (props.setAuthUser) {
        props.setAuthUser(authUser);
      }

      if (authUser) {
        // user has logged in
        setOpen(null);
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    });
    return () => {
      ubsubscribe();
    };
  }, [user, username]);

  function signUp(event) {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {})
      .catch((error) => alert(error.message));
  }

  function signIn(event) {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {})
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <>
      {user ? (
        <Button onClick={() => auth.signOut()}>Log Out</Button>
      ) : (
        <>
          <Button onClick={() => setOpen("logIn")}>Log In</Button>
          <Button onClick={() => setOpen("signUp")}>Sign Up</Button>
        </>
      )}
      <Modal open={openState !== null} onClose={() => setOpen(null)}>
        <div style={modalStyle} className={classes.paper}>
          <section>
            <img className="app_headerImage" src="" />
            <form className="app_signup">
              <center>
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" />
              </center>
              {openState !== "signUp" ? null : (
                <Input
                  type="text"
                  value={username}
                  placeholder="username"
                  onChange={(evt) => setUsername(evt.currentTarget.value)}
                />
              )}
              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(evt) => setEmail(evt.currentTarget.value)}
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(evt) => setPassword(evt.currentTarget.value)}
              />
              <Button onClick={openState === "logIn" ? signIn : signUp}>
                {openState === "logIn" ? "Log In" : "Sign Up"}
              </Button>
            </form>
          </section>
        </div>
      </Modal>
    </>
  );
}
