import React, { useRef, useState } from "react";
import "../style/chatApp.css";
import "../style/centralMenu.css";
import { Row, Col } from "react-bootstrap";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  // your config
  apiKey: "AIzaSyCfsyLy4kRml0SmlFAyULhWNH1VEmeiZ68",
  authDomain: "rentable-96b52.firebaseapp.com",
  projectId: "rentable-96b52",
  storageBucket: "rentable-96b52.appspot.com",
  messagingSenderId: "49669802752",
  appId: "1:49669802752:web:50ba12b134712bc93081e5",
  measurementId: "G-9189B3ZRHT",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function ChatApp() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  console.log("Username: " + username);

  return (
    // <div
    //   className="card container mt-S"
    //   style={{ marginTop: "100px", width: "500px" }}
    // >
    <div className="ChatApp">
      <header className="chat-app-header">
        <h3>rentable chat 💬</h3>
        <h5>
          <b>Status:</b> {username} is online
        </h5>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
    // </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div>
      <button
        className="btn btn-primary w-50 menu-buttons"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </div>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        className="sign-out chat-app-button"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="chat-app-main">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy} className="chat-app-span"></span>
      </main>

      <form onSubmit={sendMessage} className="chat-app-form">
        <input
          className="chat-app-input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message..."
        />

        <button type="submit" disabled={!formValue} className="chat-app-button">
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          className="chat-app-img"
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p className="chat-app-p">{text}</p>
      </div>
    </>
  );
}

export default ChatApp;
