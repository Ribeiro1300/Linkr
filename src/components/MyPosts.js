import { Container, PageTitle, Content, NewPost } from "../styles/PagesStyles";
import Posts from "./Posts";
import Loader from "react-loader-spinner";
import Trending from "./Trending";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getMyPosts } from "./Api";

export default function MyPosts() {

    const [isLoading, setIsLoading] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const [reload, setReload] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("auth")) {
        alert("Faça login antes!");
        history.push("/");
        return;
        }

        getMyPosts()
        .then((res) => setAllPosts(res.data.posts))
        .catch((err) =>
        alert("Houve uma falha ao obter os posts, por favor atualize a página")
        );
        setIsLoading(false);
    }, [reload]);

    function CheckPosts() {
        return allPosts.length === 0 ? (
        <h2>Nenhum post encontrado</h2>
        ) : (
        <Posts postsList={allPosts} setReload={setReload}/>
        );
    }

    return (
        <Container>
            <Content>
                <PageTitle>my posts</PageTitle>
                {isLoading ? (
                <Loader type="Bars" color="#00BFFF" height={80} width={80} />
                ) : (
                CheckPosts()
                )}
            </Content>
        <Trending />
        </Container>
    );
}
