import { sendPostEdit } from "./Api";
import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { IoPencilSharp } from "react-icons/io5";
import styled from "styled-components";
import ReactHashtag from "react-hashtag";

export default function EditPost({ info }) {
  const [isEditing, setEditing] = useState(false);
  const [sendingEdit, setSendingEdit] = useState(false);
  const [postText, setPostText] = useState("");

  const history = useHistory();

  const inputRef = useRef();

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setEditing(false);
        }
      });
      return () => {
        window.removeEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            setEditing(false);
          }
        });
      };
    }
  }, [isEditing]);

  function publishEditedPost() {
    console.log(info.id);
    console.log(postText);

    if (postText === "" || postText === null) {
      alert("Por favor preencha o link que queira compartilhar");
      return;
    }

    setSendingEdit(true);

    const promise = sendPostEdit(info.id, { text: postText });
    promise
      .then((res) => {
        setEditing(false);
        setSendingEdit(false);
        history.push("/");
      })
      .catch((err) => {
        setSendingEdit(false);
        alert("Não foi possível salvar as alterações ");
      });
  }

  return (
    <>
      <EditPostIcon
        onClick={() => {
          setEditing(!isEditing);
          setPostText(info.text);
        }}
      >
        <IoPencilSharp size="1em" />
      </EditPostIcon>
      {isEditing ? (
        <form onSubmit={publishEditedPost}>
          <PostTextInput
            type="text"
            ref={inputRef}
            name="postText"
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
            wrap="soft"
            disabled={sendingEdit}
            onKeyPress={(e) => {
              if (e.key === "Enter") publishEditedPost();
            }}
          />
        </form>
      ) : null}
    </>
  );
}

const EditPostIcon = styled.div`
  position: absolute;
  top: 0;
  right: 45px;
  cursor: pointer;
`;

const PostTextInput = styled.textarea`
  margin: 5px 0 5px 0;
  height: 66px;
  resize: none;
  font-family: Lato;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 28px;
  width: 100%;
  background: #efefef;
  resize: none;
  border-radius: 5px;
  border: none;
  padding-left: 10px;
  font-size: 15px;
  line-height: 18px;
  word-break: break-all;
  :disabled {
    background-color: grey;
  }
`;
