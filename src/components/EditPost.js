import { Container, Content } from "../styles/PagesStyles";
import Trending from "./Trending";
import React from "react";
import { useHistory, useParams } from "react-router";

export default function EditPost() {

    const [isEditing,setEditing]=useState(false);
    const [sendingEdit, setSendingEdit] = useState(false);
    const [postText,setPostText] = useState("");

    const history = useHistory();

    const inputRef = useRef();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus()        
            const handleEsc = (e) => {
                if (e.keyCode === 27) {
                  setCliked(!clicked)
                }
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                window.removeEventListener('keydown', handleEsc);
            };
        }    
    }, [isEditing]);

  return (
    <Container>
      <Content>
        <h1>{hashtagName}</h1>
      </Content>
      <Trending />
    </Container>
  );
}
