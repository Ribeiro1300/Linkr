import { Container, PageTitle, Content, NewPost } from "../styles/PagesStyles";
import Posts from "./Posts";
import Loader from "react-loader-spinner";
import Trending from "./Trending";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getLikedPosts } from "./Api";

export default function MyLikes() {

    const [isLoading, setIsLoading] = useState(true);
    const [allPosts, setAllPosts] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("auth")) {
        alert("Faça login antes!");
        history.push("/");
        return;
        }

        getLikedPosts()
        .then((res) => setAllPosts(res.data.posts))
        .catch((err) =>
        alert("Houve uma falha ao obter os posts, por favor atualize a página")
        );
        setIsLoading(false);
    }, []);

    function CheckPosts() {
        return allPosts.length === 0 ? (
        <h2>Nenhum post encontrado</h2>
        ) : (
        <Posts postsList={allPosts} />
        );
    }

    return (
        <Container>
            <Content>
                <PageTitle>my likes</PageTitle>
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
