import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import defaultAvatar from "../img/default-avatar.jpg";

const Container = styled.div``;

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 100%;
`;

const Comments = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/comments/${videoId}`);
                setComments(res.data);
            } catch (err) {}
        }
        fetchComments();
    }, [videoId]);

    return (
        <Container>
            <NewComment>
                <Avatar src={currentUser ? currentUser.image : defaultAvatar} />
                <Input placeholder="Add a comment..." />
            </NewComment>
            { comments.map((comment) => (
                <Comment key={comment._id} comment={comment}/>
            ))}
        </Container>
    );
};

export default Comments;
