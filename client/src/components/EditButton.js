import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Form, Icon, Popup } from "semantic-ui-react";

export default function EditButton({postId }) {
  const [openEdit, setOpenEdit] = useState(false);
   const [editedPost,setEditedPost] = useState('')
  const [editPost, { loading, error }] = useMutation(EDIT_POST_MUTATION, {
    variables: {postId: postId, body: editedPost},
  });
    function handleEditPost(e){
    e.preventDefault()
    editPost(setEditedPost)
  }

  return (
    <>
      <Popup
        content={"Edit Post"}
        inverted
        trigger={
          <Button
            basic
            color="blue"
            onClick={() => {
              setOpenEdit(!openEdit);
            }}
          >
            <Icon name="edit" />
          </Button>
        }
      />
      {openEdit ? (
        <Form onSubmit={(e) => handleEditPost(e)}>
          <Form.Field>
            <Form.Input
              placeholder="Edit your post"
              onChange={(e) => {
                setEditedPost(e.target.value);
                console.log(e.target.value);
              }}
              name="body"
              type="text"
              style={{ "margin-top": "20px" }}
            />
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Form.Field>
        </Form>
      ) : null}
    </>
  );
}

const EDIT_POST_MUTATION = gql`
  mutation editPost($postId: ID!, $body: String!) {
    editPost(postId: $postId, body: $body) {
      id
      body
    }
  }
`;
