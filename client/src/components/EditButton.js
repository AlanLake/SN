import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Form, Popup } from "semantic-ui-react";

export default function EditButton({postId, body }) {
   const [editedPost,setEditedPost] = useState('')
  const [editPost, { loading, error }] = useMutation(EDIT_POST_MUTATION, {
    variables: {postId: postId, body: editedPost},
  });
    function handleEditPost(e){
    e.preventDefault()
    editPost(setEditedPost)
    console.log(body)
  }

  return (
    <>
      <Popup
        content={"Edit Post"}
        inverted
        trigger={
          <Form
            onSubmit={e => handleEditPost(e)}
          >
            <h2>Edit your post</h2>
            <Form.Field>
              <Form.Input
                placeholder="Edit your post"
                onChange={e => {setEditedPost(e.target.value)
                console.log(e.target.value);}}
                name="body"
                type="text"
              />
              <Button type="submit" color="teal">
                Submit
              </Button>
            </Form.Field>
          </Form>
        }
      />
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
