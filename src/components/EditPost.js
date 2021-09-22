import { sendPostEdit } from "./Api";
import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { TiPencil } from "react-icons/ti";
import styled from "styled-components";
import ReactHashtag from "react-hashtag";

export default function EditPost({ info, setReload }) {

    const [isEditing, setEditing]=useState(false);
    const [sendingEdit, setSendingEdit] = useState(false);
    const [postText, setPostText] = useState("");

    const history = useHistory();

    const inputRef = useRef();

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();        
            window.addEventListener('keydown', (event) => {
                if (event.key === "Escape") {
                setEditing(false); }
            });
            return () => {
                window.removeEventListener('keydown', (event) => {
                    if (event.key === "Escape") {
                    setEditing(false); }
                });
            }
        }    
    }, [isEditing]);

    function publishEditedPost () {

        setReload(false);

        setSendingEdit(true);

        const promise = sendPostEdit(info.id, {"text": postText})
        promise
            .then(res => { 
                setEditing(false);
                setSendingEdit(false);
                setReload(true);
            })
            .catch(err => {
                setSendingEdit(false)
                alert("Não foi possível salvar as alterações ")
            });
    }

  return (
    <>
        <EditPostIcon onClick={ () => { setEditing(!isEditing); setPostText(info.text);} }>
            <TiPencil size="1.2em"/>
        </EditPostIcon>
        {isEditing ? 
            (<form onSubmit={publishEditedPost}>
                <PostTextInput 
                    type="text" 
                    ref={inputRef} 
                    name="postText" 
                    onChange={(e) => setPostText(e.target.value)} 
                    value={postText} 
                    wrap="soft" 
                    disabled={sendingEdit}
                    onKeyPress={(e) => {if(e.key === "Enter") publishEditedPost()} }
                />
            </form>
            ) : ( <ReactHashtag onHashtagClick={(val) => history.push("/hashtag/:" + val.slice(1)) }>
                    {info.text}
                </ReactHashtag> 
            )
        }
    </>
  );
}

const EditPostIcon = styled.div`
    position: absolute;
    top: 0;
    right: 30px;
    cursor: pointer;
`;

const PostTextInput = styled.textarea`
    margin: 10px 0 5px 0;
    height: 66px;
    resize: none;
    font-family: Lato;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 28px;
    width: 100%;
    background: #EFEFEF;
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