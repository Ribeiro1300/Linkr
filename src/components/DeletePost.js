import { FaTrash } from "react-icons/fa";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";

export default function DeletePost({ info }) {
  const history = useHistory();
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#333333",
      borderRadius: "10px",
      color: "white",
    },
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalWrapper>
          <h2>Tem certeza que deseja excluir essa publicação?</h2>
          <Btn
            color="#1877f2"
            backgroundColor="white"
            onClick={() => setIsOpen(false)}
          >
            Não, voltar
          </Btn>
          <Btn
            color="white"
            backgroundColor="#1877f2"
            onClick={() => deletePost(info, setIsOpen, history)}
          >
            Sim, excluir
          </Btn>
        </ModalWrapper>
      </Modal>
      <FaTrash
        style={{
          position: "absolute",
          top: "0",
          right: "15px",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(true)}
      />
    </>
  );
}

function deletePost(info, setIsOpen, history) {
  console.log(info, setIsOpen, history);
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
      window.location.reload(false);
    })
    .catch(() => alert("Não foi possível excluir o post, tente novamente!"));
}

const ModalWrapper = styled.div`
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 19px;
  width: 300px;
  text-align: center;
  background-color: #333333;
  margin-top: 20px;
`;

const Btn = styled.button`
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 13px;
  width: 100px;
  height: 25px;
  margin: 15px;
  border: 0px;
  border-radius: 5px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;
