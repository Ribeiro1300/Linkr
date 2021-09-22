import { FaTrash } from "react-icons/fa";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

export default function DeletePost({ info }) {
  const history = useHistory();
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      <FaTrash onClick={() => deletePost(info, setIsOpen, history)} />
    </>
  );
}

function deletePost({ info, setIsOpen, history }) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  };
  axios
    .delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${info.id}`,
      config
    )
    .then(() => {
      setIsOpen(false);
      history.push("/timeline");
    })
    .catch(() => alert("Não foi possível excluir o post, tente novamente!"));
}
